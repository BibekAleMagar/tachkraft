# Real Estate App

A full-stack real estate platform built with **NestJS**, **React**, and **PostgreSQL**.

---

## Tech Stack

| Layer    | Technology                 |
| -------- | -------------------------- |
| Frontend | React + Vite + TypeScript  |
| Backend  | NestJS + Prisma + JWT Auth |
| Database | PostgreSQL                 |
| DevOps   | Docker + Docker Compose    |

---

## How to Run

### Prerequisites

- [Docker](https://www.docker.com/) installed and running

### 1. Clone the repository

```bash
git clone https://github.com/BibekAleMagar/tachkraft.git
cd techkraft
```

### 2. Update credentials in `compose.yml`

Open `compose.yml` and replace the placeholder values:

```yaml
POSTGRES_USER: postgres
POSTGRES_PASSWORD: yourpassword # ← change this
POSTGRES_DB: real_estate
DATABASE_URL: postgresql://postgres:yourpassword@db:5432/real_estate # ← match above
JWT_SECRET: your_super_secret_jwt_key # ← change this
```

### 3. Start all services

```bash
docker compose up --build
```

This will:

- Start PostgreSQL on port `5433`
- Run Prisma migrations automatically
- Seed the database with initial data
- Start the NestJS backend on port `3000`
- Start the React frontend on port `5173`

### 4. Access the app

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:3000 |
| Database | localhost:5433        |

### 5. Stop the app

```bash
docker compose down
```

To also delete the database volume:

```bash
docker compose down -v
```

---

## Example Flows

### 1. Sign Up

```
POST http://localhost:3000/auth/signup

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### 2. Login

```
POST http://localhost:3000/auth/login

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Browse Properties

```
GET http://localhost:3000/properties

No auth required — returns list of all available properties.
```

### 4. Add to Favourites

```
POST http://localhost:3000/favourites/:propertyId

Headers:
  Authorization: Bearer <access_token>

Adds the property to the logged-in user's favourites.
```

### 5. View Favourites

```
GET http://localhost:3000/favourites

Headers:
  Authorization: Bearer <access_token>

Returns all properties saved by the logged-in user.
```

### 6. Remove from Favourites

```
DELETE http://localhost:3000/favourites/:propertyId

Headers:
  Authorization: Bearer <access_token>
```

## Notes

- JWT tokens expire — re-login if you get a `401 Unauthorized` response
- The database seeds property data automatically on first run
- Make sure port `5173`, `3000`, and `5433` are free on your machine before running
