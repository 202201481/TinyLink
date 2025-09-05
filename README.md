# TinyLink - URL Shortener

TinyLink is a modern, scalable URL shortening service built with the MERN stack (MongoDB, Express, React, Node.js) and enhanced with TanStack Query for efficient data fetching. The application features user authentication, custom short URL creation, and analytics tracking.

## Features

- **Short URL Generation**: Create shortened URLs with automatic or custom slugs
- **User Authentication**: Register and login to manage your shortened URLs
- **Analytics**: Track clicks and usage statistics for your links
- **Responsive UI**: Modern interface built with React and Tailwind CSS
- **Caching**: Redis-based caching for high-performance URL redirection
- **Scalable**: Designed for high performance and reliability

## Architecture

TinyLink follows a modern full-stack architecture:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │     │   Backend   │     │   Database  │
│   (React)   │────▶│  (Node.js)  │────▶│  (MongoDB)  │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │    Cache    │
                    │   (Redis)   │
                    └─────────────┘
```

### Key Components

- **Frontend**: React application with TanStack Query for data fetching
- **Backend**: Node.js/Express REST API with layered architecture (Controller-Service-DAO)
- **Database**: MongoDB with optimized indexes for high-performance queries
- **Cache**: Redis for caching frequently accessed URLs and reducing database load

## Technology Stack

### Frontend
- React.js
- TanStack Query (React Query)
- TanStack Router
- Redux Toolkit
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Redis for caching
- JWT Authentication

## Scalability Features

TinyLink is designed for high scalability and performance:

1. **Caching Layer**: Redis caching reduces database load for frequently accessed URLs
2. **Database Indexing**: Strategic MongoDB indexes for faster queries
3. **Optimized Data Access**: DAO layer with efficient query patterns
4. **Stateless Architecture**: Enables horizontal scaling of the backend service

## Deployment

The application can be deployed on Render for a production environment:

### Render Deployment

1. **Backend Service**:
   - Create a new Web Service in Render
   - Connect your GitHub repository
   - Select the backend directory
   - Set build command: `npm install`
   - Set start command: `node app.js`
   - Add environment variables (MONGODB_URI, REDIS_URL, JWT_SECRET, etc.)

2. **Frontend Static Site**:
   - Create a new Static Site in Render
   - Connect your GitHub repository
   - Select the frontend directory
   - Set build command: `npm install && npm run build`
   - Set publish directory: `dist`
   - Configure environment variables

3. **Database Setup**:
   - Use MongoDB Atlas for the database
   - Use Render Redis or Redis Labs for caching

## Local Development

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
