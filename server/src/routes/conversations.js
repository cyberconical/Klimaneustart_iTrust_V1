import { Router } from 'express';
import Joi from 'joi';
import Conversation from '../models/Conversation.js';
import PIIContact from '../models/PIIContact.js';
import { encrypt, hash } from '../utils/crypto.js';
import { authenticateAccessToken } from "../utils/token.js";

const router = Router();

// Validation schema derived from frontend types
const conversationSchema = Joi.object({
    uuid: Joi.string().required(),
    status: Joi.string().valid('in_progress', 'completed').default('in_progress'),
    mainInterest: Joi.string().allow(''),
    livableCity: Joi.string().allow(''),
    notes: Joi.string().allow(''),
    topicDetails: Joi.object().unknown(true).default({}),
    districts: Joi.array().items(Joi.string()).default([]),
    selectedInitiatives: Joi.array().items(Joi.string()).default([]),
    interestAreas: Joi.array().items(Joi.string()).default([]),
    interestDistricts: Joi.array().items(Joi.string()).default([]),
    shareContact: Joi.boolean().default(false),
    contactInfo: Joi.string().email().allow(''), // legacy single email field
    isAnonymous: Joi.boolean().default(true),
    observerReflection: Joi.string().allow(''),
    surprise: Joi.string().allow(''),
    numPeople: Joi.number().integer().min(0).default(1),
    duration: Joi.number().integer().min(0).default(10),
    location: Joi.string().allow(''),
    user: Joi.string().allow(''),

    // optional richer PII fields if sent by frontend
    firstName: Joi.string().allow(''),
    lastName: Joi.string().allow(''),
    phone: Joi.string().allow(''),
    participantType: Joi.string().allow(''),
    sendCopy: Joi.boolean().optional(),
});

// Create conversation
router.post('/', authenticateAccessToken, async (req, res, next) => {
    try {
        const { value, error } = conversationSchema.validate(req.body, { stripUnknown: true });
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const {
            uuid,
            status,
            shareContact,
            isAnonymous,
            firstName,
            lastName,
            phone,
            contactInfo,
            sendCopy,
            ...content
        } = value;

        // Save conversation (non-PII content)
        let conversation = await Conversation.findOne({ uuid });
        if (!conversation) {
            conversation = await Conversation.create({
                uuid,
                shareContact,
                isAnonymous,
                status,
                ...content
            });
        } else {
            conversation.set({ shareContact, isAnonymous, status, ...content });
            await conversation.save();
        }

        // If contact is shared, store PII separately with encryption
        if (shareContact && !isAnonymous && (firstName || lastName || contactInfo || phone)) {
            const pii = await PIIContact.create({
                conversationUuidHash: uuid ? hash(uuid) : undefined,
                firstNameEnc: encrypt(firstName || ''),
                lastNameEnc: encrypt(lastName || ''),
                emailEnc: encrypt(contactInfo || ''),
                phoneEnc: encrypt(phone || ''),
                consentGiven: true,
                consentScope: ['contact'],
                consentTimestamp: new Date(),
                // retention policy: 12 months by default unless overridden
                retentionUntil: new Date(Date.now() + (Number(process.env.PII_RETENTION_DAYS || 365) * 24 * 60 * 60 * 1000))
            });
            conversation.piiRef = pii._id;
            await conversation.save();
        }

        return res.status(201).json({ id: conversation._id, dialogue_id: conversation.uuid });
    } catch (e) {
        next(e);
    }
});

// Get all conversations for a specific user
router.get('/:username', authenticateAccessToken, async (req, res, next) => {
    try {
        const { username } = req.params;

        const conversations = await Conversation.find({ user: username })
            .select('-piiRef') // Exclude PII-reference
            .sort({ createdAt: -1 })
            .lean();

        if (!conversations || conversations.length === 0) {
            return res.status(404).json({ error: 'No conversations found for this user' });
        }

        res.json(conversations);
    } catch (e) {
        next(e);
    }
});


// Get conversation content (without PII)
router.get('/:id', authenticateAccessToken, async (req, res, next) => {
    try {
        // Support both ObjectId and UUID lookup
        const id = req.params.id;
        const query = /^[a-f\d]{24}$/i.test(id) ? { _id: id } : { uuid: id };
        const convo = await Conversation.findOne(query).lean();
        if (!convo) return res.status(404).json({ error: 'Not found' });
        // Exclude piiRef value when responding to public API
        const { piiRef, ...rest } = convo;
        res.json(rest);
    } catch (e) {
        next(e);
    }
});

// GDPR: Erase PII by conversation ID
router.delete('/:id/pii', authenticateAccessToken, async (req, res, next) => {
    try {
        const convo = await Conversation.findById(req.params.id);
        if (!convo) return res.status(404).json({ error: 'Not found' });
        if (convo.piiRef) {
            await PIIContact.findByIdAndDelete(convo.piiRef);
            convo.piiRef = null;
            await convo.save();
        }
        res.json({ ok: true });
    } catch (e) {
        next(e);
    }
});

// GDPR: Anonymize conversation content on request
router.delete('/:id', authenticateAccessToken, async (req, res, next) => {
    try {
        const convo = await Conversation.findById(req.params.id);
        if (!convo) return res.status(404).json({ error: 'Not found' });
        if (convo.piiRef) await PIIContact.findByIdAndDelete(convo.piiRef);
        await Conversation.findByIdAndDelete(req.params.id);
        res.json({ ok: true });
    } catch (e) {
        next(e);
    }
});

export default router;


