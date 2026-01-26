## Klima Backend (Express + MongoDB)

MERN backend for storing conversation data with GDPR-aware data separation of PII.

### Quick start

1. Copy environment example and edit values:

```bash
cp .env.example .env
```

2. Install dependencies and run:

```bash
npm install
npm run dev
```

Server listens on `http://localhost:${PORT}` (default 4000).

### API

- POST `/api/v1/users/register`
  - Creates a new user.
  - Response: `{ username }`

- POST `/api/v1/users/login`
  - Creates an user session.
  - Response: `{ userId, sessionToken }`

- POST `/api/v1/conversations`
  - Body: Conversation content from the frontend. If `shareContact` is true and user is not anonymous, optional PII fields (`firstName`, `lastName`, `contactInfo` as email, `phone`) are stored encrypted in `PIIContact` collection, linked by reference.
  - Response: `{ id, dialogue_id }`

- GET `/api/v1/conversations/:id`
  - Returns conversation content only (no PII values).

- DELETE `/api/v1/conversations/:id/pii`
  - Erases PII linked to a conversation.

- DELETE `/api/v1/conversations/:id`
  - Deletes the entire conversation and any linked PII.

### GDPR design

- PII is stored in a separate collection with AES-256-GCM encryption at rest.
- Link to conversation is via MongoDB ObjectId and hashed UUID to avoid plain identifiers in PII.
- Consent flags and `retentionUntil` are tracked. TTL index automatically deletes PII after retention.
- Content endpoints never return PII.


