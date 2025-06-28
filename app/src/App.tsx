import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Layouts
import MainLayout from '@/layouts/MainLayout';

// Pages
import HomePage from '@/pages/HomePage';
import GradeLevelPage from '@/pages/GradeLevelPage';
import TopicPage from '@/pages/TopicPage';
import LessonPage from '@/pages/LessonPage';
import ExercisePage from '@/pages/ExercisePage';

// Types
import { UserProgress } from '@/types';

function App() {
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedLessons: [],
    exerciseScores: {},
    lastVisited: ''
  });

  // Load user progress from localStorage on initial render
  useEffect(() => {
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      try {
        setUserProgress(JSON.parse(savedProgress));
      } catch (error) {
        console.error('Failed to parse user progress:', error);
      }
    }
  }, []);

  // Save user progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  // Function to update user progress
  const updateProgress = (newProgress: Partial<UserProgress>) => {
    setUserProgress(prev => ({
      ...prev,
      ...newProgress
    }));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage userProgress={userProgress} />} />
          <Route path="grade/:gradeId" element={<GradeLevelPage userProgress={userProgress} />} />
          <Route path="topic/:topicId" element={<TopicPage userProgress={userProgress} />} />
          <Route 
            path="lesson/:lessonId" 
            element={
              <LessonPage 
                userProgress={userProgress} 
                updateProgress={updateProgress} 
              />
            } 
          />
          <Route 
            path="exercise/:exerciseId" 
            element={
              <ExercisePage 
                userProgress={userProgress} 
                updateProgress={updateProgress} 
              />
            } 
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
