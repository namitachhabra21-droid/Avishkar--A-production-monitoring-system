# ToolMind MongoDB API

## Setup

1. Create `server/.env` from `server/.env.example`.
2. Set `MONGODB_URI` to your MongoDB Atlas connection string.
3. Seed standard production data:

```bash
npm run seed:mongo
```

4. Start the API:

```bash
npm run server
```

The Expo app reads from `EXPO_PUBLIC_API_BASE_URL`, defaulting to `http://127.0.0.1:4000`.

## API

- `GET /health`
- `GET /api/production`
- `GET /api/stage-master`
- `PATCH /api/stage-master/:id`
- `GET /api/tools`
- `PATCH /api/tools/:id`
