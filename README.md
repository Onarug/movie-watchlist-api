# Movie Watchlist API

A RESTful API for managing movies and personal watchlists, built with Node.js, Express, and PostgreSQL. 
Users can register, log in, browse movies, and track their watchlist

## Features

- **Authentication** — JWT-based auth with httpOnly cookies, password hashing via bcrypt
- **Movies** — create, read, update, and delete movie entries
- **Watchlist** — add movies to a personal watchlist, update status/rating/notes, remove items
- **Validation** — request validation with Zod
- **Authorization** — ownership checks ensure users can only modify their own data

## Getting Started

### Prerequisites
- Node.js (v22+)
- A PostgreSQL database

### Environment Variables

```env
DATABASE_URL="" (I used a neon one)
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
```


Optionally seed sample movie data by calling seed.js



Server runs on `http://localhost:5001` by default.

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Create a new account |
| POST | `/auth/login` | Log in and receive a JWT |
| POST | `/auth/logout` | Log out and clear the auth cookie |

### Movies
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/movies` | List all movies |
| GET | `/movies/:id` | Get a single movie |
| POST | `/movies` | Create a movie (auth required) |


### Watchlist
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/watchlist` | Get the logged-in user's watchlist |
| POST | `/watchlist` | Add a movie to the watchlist |
| PATCH | `/watchlist/:id` | Update status, rating, or notes |
| DELETE | `/watchlist/:id` | Remove an item from the watchlist |
