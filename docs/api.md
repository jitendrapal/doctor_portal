# API Documentation

Swagger/OpenAPI is exposed at:

- `/api/docs` when backend is running

## Auth Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

## User Endpoints

- `GET /api/users/me/profile`
- `PATCH /api/users/me/profile`

## Feed Endpoints

- `POST /api/feed/posts`
- `GET /api/feed/posts?page=1&limit=20`

## AI Endpoints

- `POST /api/ai/summarize-post`
- `POST /api/ai/generate-post`

## Search Endpoints

- `GET /api/search?q=cardiology`

## Notification Endpoints

- `GET /api/notifications`
