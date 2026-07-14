## Klima Backend (Express + MongoDB)

MERN backend for storing conversation data. No personally identifiable contact information is collected or stored.

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
  - Body: Conversation content from the frontend.
  - Response: `{ id, dialogue_id }`

- GET `/api/v1/conversations/:id`
  - Returns conversation content.

- DELETE `/api/v1/conversations/:id`
  - Deletes the conversation.

