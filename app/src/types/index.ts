// User Progress Types
export interface UserProgress {
  completedLessons: string[];
  exerciseScores: {
    [exerciseId: string]: {
      score: number;
      total: number;
      completedAt: string;
    };
  };
  lastVisited: string;
}

// Curriculum Types
export interface LessonSummary {
  id: string;
  title: string;
  description: string;
  order: number;
  duration: string;
  is_premium: boolean;
}

export interface Topic {
  id: string;
  name: string;
  order: number;
  description: string;
  icon: string;
  lessons: LessonSummary[];
}

export interface Grade {
  id: string;
  name: string;
  topics: Topic[];
}

// Lesson Types
export interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  content_type: string;
  is_premium: boolean;
  sections: LessonSection[];
}

export type LessonSection = 
  | IntroductionSection
  | VideoSection
  | TextSection
  | InteractiveSection
  | ConclusionSection;

export interface IntroductionSection {
  type: 'introduction';
  content: string;
}

export interface VideoSection {
  type: 'video';
  source: 'youtube' | 'vimeo' | 'other';
  title?: string;
  url: string;
  description?: string;
}

export interface TextSection {
  type: 'text';
  content: string;
}

export interface InteractiveSection {
  type: 'interactive';
  component: string;
  props: Record<string, any>;
}

export interface ConclusionSection {
  type: 'conclusion';
  content: string;
}

// Exercise Types
export interface Exercise {
  id: string;
  lesson_id: string;
  title: string;
  description: string;
  questions: Question[];
}

export type Question = 
  | MultipleChoiceQuestion
  | FillInQuestion
  | TrueFalseQuestion
  | MatchingQuestion
  | OrderingQuestion;

export interface MultipleChoiceQuestion {
  id: string;
  type: 'multiple-choice';
  text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

export interface FillInQuestion {
  id: string;
  type: 'fill-in';
  text: string;
  correct_answer: string;
  explanation: string;
}

export interface TrueFalseQuestion {
  id: string;
  type: 'true-false';
  text: string;
  correct_answer: boolean;
  explanation: string;
}

export interface MatchingQuestion {
  id: string;
  type: 'matching';
  text: string;
  pairs: Array<{ left: string; right: string }>;
  explanation: string;
}

export interface OrderingQuestion {
  id: string;
  type: 'ordering';
  text: string;
  items: string[];
  correct_order: string[];
  explanation: string;
}
