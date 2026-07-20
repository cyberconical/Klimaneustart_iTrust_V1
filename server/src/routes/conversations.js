import { Router } from 'express';
import Joi from 'joi';
import Conversation from '../models/Conversation.js';
import { authenticateAccessToken } from "../utils/token.js";
import {getAnalyticsData} from "../controllers/analytics.js";
import { toCsv } from "../utils/csv.js";

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
    observerReflection: Joi.string().allow(''),
    surprise: Joi.string().allow(''),
    numPeople: Joi.number().integer().min(0).default(1),
    duration: Joi.number().integer().min(0).default(10),
    location: Joi.string().allow(''),
    user: Joi.string().allow(''),
});

// Create conversation
router.post('/', authenticateAccessToken, async (req, res, next) => {
    try {
        const { value, error } = conversationSchema.validate(req.body, { stripUnknown: true });
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const { uuid, status, ...content } = value;

        // Save conversation content
        let conversation = await Conversation.findOne({ uuid });
        if (!conversation) {
            conversation = await Conversation.create({
                uuid,
                status,
                ...content
            });
        } else {
            conversation.set({ status, ...content });
            await conversation.save();
        }

        return res.status(201).json({ id: conversation._id, dialogue_id: conversation.uuid });
    } catch (e) {
        next(e);
    }
});

// Get all conversations for a specific user (admins can retrieve all conversations)
router.get('/user/:username', authenticateAccessToken, async (req, res, next) => {
    try {
        const { username } = req.params;
        const isAdmin = req.user.isAdmin === true;

        // Non-admin users can only access their own conversations
        if (!isAdmin && req.user.username !== username) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        // Admins can explicitly request everyone's conversations via ?all=true;
        // otherwise (and for non-admins always) only the requested user's own.
        const showAll = isAdmin && req.query.all === 'true';
        const filter = showAll ? {} : { user: username };

        const conversations = await Conversation.find(filter)
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

// Export conversations as CSV with every stored field. Non-admins always get
// only their own conversations; admins can pass ?all=true for everyone's.
router.get('/export/csv', authenticateAccessToken, async (req, res, next) => {
    try {
        const isAdmin = req.user.isAdmin === true;
        const showAll = isAdmin && req.query.all === 'true';
        const filter = showAll ? {} : { user: req.user.username };

        const conversations = await Conversation.find(filter)
            .sort({ createdAt: -1 })
            .lean();

        const csv = toCsv(conversations);

        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename="conversations-export.csv"');
        res.send('﻿' + csv);
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
        res.json(convo);
    } catch (e) {
        next(e);
    }
});

// Delete conversation on request
// router.delete('/:id', authenticateAccessToken, async (req, res, next) => {
//     try {
//         const convo = await Conversation.findById(req.params.id);
//         if (!convo) return res.status(404).json({ error: 'Not found' });
//         await Conversation.findByIdAndDelete(req.params.id);
//         res.json({ ok: true });
//     } catch (e) {
//         next(e);
//     }
// });

// Get analytics dashboard data
router.post('/analytics', authenticateAccessToken, async (req, res, next) => {
    try {
        const conversations = await Conversation.find();
        if (!conversations || conversations.length === 0) {
            return res.status(204).json({error: 'No conversations found'});
        }

        const dashboardData = getAnalyticsData(conversations);

        res.json(dashboardData);
    } catch (e) {
        next(e);
    }
});

export default router;


