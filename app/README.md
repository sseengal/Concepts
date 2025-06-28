# MathQuest - Educational Web App for Primary School Mathematics

## Overview

MathQuest is an interactive educational web application designed for primary school students (Year 2+) to learn mathematics through engaging lessons and exercises. The application focuses on delivering a core learning experience with minimal friction, using a modern, responsive, and child-friendly UI.

## Features

### MVP Features

- **Core Learning Experience**
  - Interactive lessons with mixed content types (text, video, interactive elements)
  - Practice exercises with various question types
  - Progress tracking via local storage
  - Grade and topic-based curriculum structure

### Future Features

- **User Management** (via Supabase)
  - Authentication and user profiles
  - Persistent progress tracking
  - Personalized learning paths

- **Payment Integration** (via Stripe Payment Links)
  - Subscription management for premium content
  - Access control for premium features

- **Advanced Features**
  - Gamification elements (badges, rewards)
  - Parent/teacher dashboards
  - Advanced analytics and reporting

## Technology Stack

- **Frontend**: React.js with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Content Rendering**: React Markdown
- **Build Tool**: Vite
- **Future Integration**: Supabase (auth, database), Stripe (payments)

## Project Structure

```
src/
├── assets/        # Static assets like images
├── components/    # Reusable UI components
├── data/          # JSON data files (curriculum, lessons, exercises)
├── hooks/         # Custom React hooks
├── layouts/       # Page layout components
├── pages/         # Page components
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
npm run build
```

## Development Approach

This project follows a phased development approach:

1. **Phase 1**: Core learning experience with frontend-only implementation
2. **Phase 2**: Integration with Supabase for database and authentication
3. **Phase 3**: Payment integration and premium features
4. **Phase 4**: Advanced features and optimizations

## License

All rights reserved.
