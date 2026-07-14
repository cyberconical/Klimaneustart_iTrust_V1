import mongoose from 'mongoose';

// Conversation content is non-PII and can be stored plainly.
const TopicSubGroupDetailsSchema = new mongoose.Schema(
    {
        selectedOptions: { type: [String], default: [] },
        customNote: { type: String, default: '' }
    },
    { _id: false }
);

const ConversationSchema = new mongoose.Schema(
    {
        uuid: { type: String, index: true, unique: true },
        status: { type: String, enum: ['in_progress', 'completed'], default: 'in_progress' },
        notes: { type: String, default: '' },
        mainInterest: { type: String, default: '' },
        livableCity: { type: String, default: '' },
        topicDetails: { type: mongoose.Schema.Types.Mixed, default: {} },
        districts: { type: [String], default: [] },
        selectedInitiatives: { type: [String], default: [] },
        interestAreas: { type: [String], default: [] },
        observerReflection: { type: String, default: '' },
        surprise: { type: String, default: '' },
        numPeople: { type: Number, default: 1 },
        duration: { type: Number, default: 10 },
        location: { type: String },
        user: { type: String }
    },
    { timestamps: true }
);

ConversationSchema.index({ user: 1, createdAt: -1 });
ConversationSchema.index({ createdAt: -1 });

export default mongoose.model('Conversation', ConversationSchema);


