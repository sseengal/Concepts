# Information Architecture

This document outlines the structure and organization of the educational web app, focusing on the MVP implementation.

## Site Structure

```
Home
├── Dashboard (authenticated users)
│   ├── My Progress
│   ├── Recommended Lessons
│   └── Continue Learning
│
├── Curriculum
│   ├── Year 2
│   │   ├── Topic 1: Numbers to 100
│   │   │   ├── Lesson 1.1: Counting to 100
│   │   │   │   ├── Introduction (Video/Text)
│   │   │   │   ├── Examples
│   │   │   │   └── Practice Exercises
│   │   │   ├── Lesson 1.2: Place Value
│   │   │   └── ...
│   │   ├── Topic 2: Addition and Subtraction
│   │   └── ...
│   ├── Year 3
│   └── ...
│
├── Library
│   ├── Videos
│   ├── Practice Sets
│   └── Free Resources
│
├── Account (authenticated users)
│   ├── Profile
│   ├── Subscription
│   └── Settings
│
└── About
    ├── How It Works
    ├── Curriculum Overview
    └── Pricing
```

## Content Types

### 1. Lessons
- **Structure**: Introduction → Examples → Practice
- **Components**:
  - Video/text explanation
  - Interactive examples
  - Step-by-step walkthroughs
  - Practice exercises

### 2. Practice Exercises
- **Types**:
  - Multiple choice questions
  - Short answer questions
  - Interactive problems (drag-and-drop, matching)
- **Features**:
  - Immediate feedback
  - Hints and explanations
  - Progress tracking

### 3. Progress Tracking
- **Student Dashboard**:
  - Completion status
  - Performance metrics
  - Streak calendar
  - Recommended next steps

## Frontend Data Structure (Initial Implementation)

### JSON Data Models

#### 1. curriculum.json
```json
{
  "grades": [
    {
      "id": "year-2",
      "name": "Year 2",
      "topics": [
        {
          "id": "numbers-to-100",
          "name": "Numbers to 100",
          "order": 1,
          "lessons": [...]
        }
      ]
    }
  ]
}
```

#### 2. lessons.json
```json
{
  "id": "counting-to-100",
  "title": "Counting to 100",
  "description": "Learn to count numbers up to 100",
  "order": 1,
  "content_type": "mixed",
  "is_premium": false,
  "sections": [
    {
      "type": "video",
      "source": "youtube",
      "url": "https://youtube.com/..."
    },
    {
      "type": "text",
      "content": "Markdown content here..."
    }
  ]
}
```

#### 3. exercises.json
```json
{
  "id": "counting-practice",
  "lesson_id": "counting-to-100",
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "text": "What comes after 45?",
      "options": ["44", "45", "46", "50"],
      "correct_answer": "46",
      "explanation": "When counting, we add 1 to get the next number."
    }
  ]
}
```

#### 4. userProgress.js (Local Storage Initially)
```javascript
// Structure stored in localStorage
const userProgress = {
  completedLessons: ["counting-to-100", "place-value"],
  exerciseScores: {
    "counting-practice": {
      score: 8,
      total: 10,
      completedAt: "2025-06-28T12:00:00"
    }
  },
  lastVisited: "place-value"
};
```

## Future Supabase Data Structure (Phase 2)

### Tables (To be implemented in Sprint 5)

#### 1. users
- id (primary key)
- email
- created_at
- last_login
- subscription_status

#### 2. profiles
- id (foreign key to users)
- display_name
- grade_level
- avatar_url

#### 3. curriculum
- id (primary key)
- grade_level
- topic_id
- topic_name
- topic_order
- is_premium

#### 4. lessons
- id (primary key)
- curriculum_id (foreign key)
- title
- description
- lesson_order
- content_type (video, text, mixed)
- content_url
- is_premium

#### 5. exercises
- id (primary key)
- lesson_id (foreign key)
- question_type
- question_text
- options (JSON for multiple choice)
- correct_answer
- explanation
- difficulty_level

#### 6. progress
- id (primary key)
- user_id (foreign key)
- lesson_id (foreign key)
- completed
- score
- completed_at

## Access Control

### Free Tier
- Access to:
  - All Year 2 introductory lessons
  - Limited practice exercises
  - Basic progress tracking

### Premium Tier
- Access to:
  - All grade levels and topics
  - All practice exercises
  - Detailed progress tracking
  - Personalized recommendations

## Search and Discovery

### Navigation Methods
- Grade-based navigation
- Topic-based navigation
- Search functionality
- Progress-based recommendations

### Filters
- Grade level
- Topic
- Difficulty
- Content type (video/text/practice)
- Completion status (for logged-in users)

## Responsive Design Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## API Integration Points

### Educational Content
- YouTube API for video content
- H5P for interactive exercises
- Open education APIs for curriculum content

### Authentication
- Supabase Authentication

### Payments
- Stripe Payment Links

## Analytics Tracking

### Key Events
- Lesson views
- Exercise completions
- Sign-ups
- Subscription conversions
- Time spent on platform

---

This information architecture focuses on the MVP implementation, prioritizing the core learning experience while using no-code/low-code solutions for supporting features.
