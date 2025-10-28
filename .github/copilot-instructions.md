# Guidance for AI coding agents: express-srv

Keep guidance short and actionable. This repository is a small Express + Mongoose server with a static front-end in `public/`.

Key files and layout
- `app.js` — main Express app: mounts routes under `/api/*`, serves `public/` statically, reads Mongo connection string from env.
- `server.js` — simple HTTP server that loads `app` and listens on `process.env.PORT || 5000`.
- `api/routes/` — route handlers. Each file exports an Express Router (e.g. `api/routes/users.js`, `api/routes/articles.js`).
- `api/models/` — Mongoose schemas and models (e.g. `user.js`, `article.js`).
- `api/auth/` — authentication helpers: `authentication.js` (sets `req.token` from Authorization header and signs tokens) and `config.js` (exports `secretKey`).
- `enums/modelEnums.js` — canonical enum lists used by schemas (use these rather than inventing new string sets).
- `public/` — front-end assets (HTML in `public/html`, client JS in `public/js`). The server exposes these via `express.static('./public')`.

Run / dev workflow
- Install deps: `npm install` (no lockfile in repo — follow `package.json`).
- Environment: create a `.env` file with at least:
  - `NODE_ENV_ATLAS_DATABASE` — full MongoDB connection string the app expects (used directly in `mongoose.connect(...)`).
  - (optional) `NODE_ENV_ATLAS_CLUSTER_NAME`, `NODE_ENV_ATLAS_DATABASE_NAME` — used only for console logging.
  - `PORT` — optional; defaults to 5000.
- Start (development): `npm start` (uses `nodemon server.js` per `package.json`). There are no test scripts or build steps.

Auth and tokens (important pattern)
- Routes that require authentication use `auth.verifyToken` (from `api/auth/authentication.js`) as middleware. That middleware expects the `Authorization` header in the form: `Authorization: Bearer <token>` and sets `req.token`.
- Most protected routes then call `jwt.verify(req.token, config.secretKey, (err) => { ... })` inside the handler. Keep this two-step pattern when adding new protected endpoints.
- Token creation: `auth.signUser(payload, config.secretKey, res, req)` signs a token with `expiresIn: '3000s'` and returns it in JSON. `config.secretKey` is currently in `api/auth/config.js`.

File uploads / avatars
- The project uses `multer` with `memoryStorage()` to accept uploads and stores image data as `Buffer` on Mongoose documents (see `api/routes/users.js` and `api/models/user.js`).
- Expect multipart/form-data with field name `avatar` for registration and avatar updates (handlers use `upload.single('avatar')`).

How to add a new resource (concrete pattern)
1. Create a Mongoose model under `api/models/<name>.js` and export `module.exports = mongoose.model('<Name>', schema)`.
2. Create an Express Router under `api/routes/<name>.js`. Use `const router = express.Router();` and `module.exports = router;`.
3. Mount it in `app.js` with `app.use('/api/<name>', require('./api/routes/<name>'));`.
4. Follow existing route patterns: use `auth.verifyToken` where appropriate, call `jwt.verify(req.token, config.secretKey, ...)` to check the token, and return structured JSON objects with `message`, `request`, and `serverError` keys like existing handlers.

Conventions and patterns to follow
- Logging: handlers log structured objects via `console.log({ request: { type: 'GET', url: req.originalUrl, status: 'SUCCESS' } })`. Follow the same shape to keep logs consistent.
- Error responses: return JSON with `message`, `serverError` (error.message), and `request` metadata. Many routes return `res.status(500).json({ message: ..., serverError: error.message, request: {...} })`.
- Data shapes: user avatars are stored inside `image.avatar.data` as a Buffer; client-side code expects that shape — preserve it.
- Enums: reference `enums/modelEnums.js` instead of hard-coding string lists in multiple places.

Integration notes / external dependencies
- MongoDB (mongoose) — connection string must be provided via `NODE_ENV_ATLAS_DATABASE`.
- JWT (`jsonwebtoken`) — project signs and verifies tokens; secret lives in `api/auth/config.js` (consider moving to `.env` for production).
- Multer — used for uploads; storage is in-memory and later persisted into MongoDB documents.

Quick examples (patterns seen in repo)
- Protected GET all: `router.get('/', auth.verifyToken, (req,res)=>{ jwt.verify(req.token, config.secretKey, (err)=>{ if(err) return res.status(403)...; Model.find().then(docs=>res.json(docs)).catch(next); }); });`
- Register with avatar: uses `upload.single('avatar')` and saves `req.file.buffer` into `user.image.avatar.data`.

Security / maintenance notes (discoverable facts)
- `api/auth/config.js` contains a hard-coded `secretKey`. This is discoverable here and must be considered when working on security-sensitive features.
- Mongo connection string is expected in env — do not commit secrets to the repo.

If uncertain, open these files first: `app.js`, `server.js`, `api/auth/authentication.js`, `api/auth/config.js`, `api/routes/users.js`, and `enums/modelEnums.js`.

If anything in the above is unclear or you'd like examples expanded (e.g., a sample `.env` or a new-route stub), tell me which part to expand and I will update this file.
