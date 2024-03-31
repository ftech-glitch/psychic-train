# WhereBnB

## Development Instructions

### Project Structure

The project is split into two major components: **frontend** and **backend**
Note: We should keep the package.json files separate (i.e. frontend has its own package.json, backend has its own package.json.). The parent package.json contains scripts to bundle FE/BE together.

```bash
psychic-train
├── backend
├── frontend
└── node_modules
```

#### To start development of Frontend

```bash
cd frontend/
npm i
npm run dev
```

#### To start development of Backend

Make sure you create the .env file and insert these two environment variables:
./backend/.env

```
PORT=5000
MONGODB_URI=<URI to database>
```

```bash
cd backend/
npm i
npm run dev
```

#### To start both Frontend and Backend from ROOT

Run frontend

```
npm run dev:frontend
```

Run backend

```
npm run dev:backend
```

Run CONCURRENTLY

```
Run frontend
```

npm run dev

```

```
