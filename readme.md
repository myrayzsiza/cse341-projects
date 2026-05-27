# Temple API

This API implements two collections (`temples` and `reviews`) with full CRUD operations, validation, error handling, and Swagger documentation.

## Instructions to run application

- Run `npm install`
- Create a `.env` file with a valid `MONGODB_URI`
- Add GitHub OAuth values to `.env`:
  - `GITHUB_CLIENT_ID`
  - `GITHUB_CLIENT_SECRET`
  - `GITHUB_CALLBACK_URL=http://localhost:8080/auth/github/callback`
  - `SESSION_SECRET`
- Run `npm start`
- Open `http://localhost:8080/api-docs` to view Swagger UI

## GitHub OAuth

- Authenticate with GitHub at `/auth/github`
- Check login status at `/auth/status`
- Logout at `/auth/logout`

## API collections

- `temples` supports GET, POST, PUT, DELETE
- `reviews` supports GET, POST, PUT, DELETE

## Notes

- `.env` is ignored by git via `.gitignore`
- Swagger docs are generated with `npm run swagger`
- Use the API root for collection endpoints:
  - `GET /temples`
  - `POST /temples`
  - `GET /temples/:temple_id`
  - `PUT /temples/:temple_id`
  - `DELETE /temples/:temple_id`
  - `GET /reviews`
  - `POST /reviews`
  - `GET /reviews/:review_id`
  - `PUT /reviews/:review_id`
  - `DELETE /reviews/:review_id`
