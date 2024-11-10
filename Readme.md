# Clash Voting Platform

A real-time voting and clash platform built with Node.js (Express) backend and Next.js frontend. Users can create clashes (voting contests) with images, participate in voting, and engage through comments.

## 🚀 Tech Stack

### Backend

- Node.js + TypeScript
- Express.js
- Socket.IO for real-time communications
- PostgreSQL with Prisma ORM
- Bull for job queues
- EJS for email templates
- Express Rate Limiter for API protection
- Express File Upload for handling file uploads

### Frontend

- Next.js 14
- TypeScript
- Radix UI for accessible components
- TailwindCSS for styling
- Socket.IO Client for real-time features
- NextAuth.js for authentication
- React CountUp for animations
- Sonner for toast notifications

## ✨ Features

- User authentication and email verification
- Create and manage clashes with images
- Real-time voting system
- Comment system with real-time updates
- File upload functionality
- Rate limiting for API protection
- Job queues for background processing
- Responsive UI with modern components
- Password reset functionality

## 🛠️ Setup

### Prerequisites

- Node.js >= 18
- PostgreSQL
- Redis (for job queues)

### Environment Variables

#### Backend (.env)

```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
CLIENT_URL="http://localhost:3000"
```

#### Frontend (.env)

```env
NEXT_PUBLIC_API_URL="http://localhost:5000"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/iamsufiyan560/Thumbnail-clash.git
```

2. Backend Setup:

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

3. Frontend Setup:

```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

### Backend

```
├── config/
│   └── rateLimit.ts
├── jobs/
│   ├── VotingQueue.ts
│   ├── CommentQueue.ts
│   └── index.ts
├── middleware/
│   └── AuthMiddleware.ts
├── routes/
│   ├── authRoutes.ts
│   ├── clashRoutes.ts
│   └── verifyRoutes.ts
├── views/
│   └── email templates
├── socket.ts
└── server.ts
```

### Frontend

```
├── app/
├── components/
├── lib/
└── public/
```

## 🔄 Real-time Features

The platform uses Socket.IO for real-time updates:

- Live voting updates
- Real-time comment updates
- Instant clash status changes

## 🗄️ Database Schema

The PostgreSQL database includes the following main models:

- User: Manages user accounts and authentication
- Clash: Stores voting contests/clashes
- ClashItem: Represents individual voting options
- ClashComments: Handles user comments on clashes

## 🔒 Security Features

- Rate limiting on API endpoints
- JWT authentication
- Email verification
- Password hashing
- File upload restrictions
- CORS protection

## 📝 API Routes

### Authentication

- POST `/api/register` - User registration
- POST `/api/login` - User login
- POST `/api/forgot-password` - Password reset request

### Clash Management

- GET `/api/clash` - List all clashes
- POST `/api/clash` - Create new clash
- GET `/api/clash/:id` - Get clash details
- POST `/api/clash/:id/vote` - Submit vote
- POST `/api/clash/:id/comment` - Add comment

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
