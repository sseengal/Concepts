import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Lesson, UserProgress } from '@/types';
import ReactMarkdown from 'react-markdown';

// This would be imported from a component library in a real app
const NumberLine = ({ start, end, highlightEvery, interactive }: { 
  start: number; 
  end: number; 
  highlightEvery: number;
  interactive: boolean;
}) => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  
  const numbers = [];
  for (let i = start; i <= end; i++) {
    numbers.push(i);
  }
  
  return (
    <div className="my-6 p-4 bg-blue-50 rounded-lg">
      <div className="flex flex-wrap justify-center gap-2">
        {numbers.map(num => (
          <button
            key={num}
            className={`w-10 h-10 flex items-center justify-center rounded-full 
              ${num % highlightEvery === 0 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} 
              ${selectedNumber === num ? 'ring-2 ring-offset-2 ring-blue-500' : ''}
              ${interactive ? 'hover:bg-blue-100 cursor-pointer' : 'cursor-default'}`}
            onClick={() => interactive && setSelectedNumber(num)}
          >
            {num}
          </button>
        ))}
      </div>
      {interactive && selectedNumber && (
        <p className="text-center mt-4 text-blue-700">You selected: {selectedNumber}</p>
      )}
    </div>
  );
};

interface LessonPageProps {
  userProgress: UserProgress;
  updateProgress: (progress: Partial<UserProgress>) => void;
}

const LessonPage = ({ userProgress, updateProgress }: LessonPageProps) => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [exerciseId, setExerciseId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we're using a direct import for the lesson JSON
        // This is a workaround for Vite's dynamic import behavior
        let lessonData;
        
        // This is a simple mapping for now - in a real app, you'd want a more robust solution
        if (lessonId === 'counting-to-100') {
          const module = await import('../data/lessons/counting-to-100.json');
          lessonData = module.default;
        } else {
          throw new Error('Lesson not found');
        }
        
        setLesson(lessonData);
        
        // Find the corresponding exercise if any
        try {
          const exerciseModule = await import('../data/exercises/counting-practice.json');
          if (exerciseModule.default.lesson_id === lessonId) {
            setExerciseId(exerciseModule.default.id);
          }
        } catch (error) {
          console.log('No exercise found for this lesson');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to load lesson:', error);
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  useEffect(() => {
    // Update last visited lesson
    if (lesson) {
      updateProgress({
        lastVisited: lesson.id
      });
    }
  }, [lesson, updateProgress]);

  const handleNextSection = () => {
    if (lesson && currentSectionIndex < lesson.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      // Scroll to top of the section
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      // Scroll to top of the section
      window.scrollTo(0, 0);
    }
  };

  const handleCompleteLesson = () => {
    if (lesson) {
      // Mark lesson as completed
      const updatedCompletedLessons = [...userProgress.completedLessons];
      if (!updatedCompletedLessons.includes(lesson.id)) {
        updatedCompletedLessons.push(lesson.id);
      }
      
      updateProgress({
        completedLessons: updatedCompletedLessons
      });
      
      // Navigate to exercise if available, otherwise back to topic
      if (exerciseId) {
        navigate(`/exercise/${exerciseId}`);
      } else {
        // We would need to know the topic ID here
        // For now, just go back to home
        navigate('/');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-700">Lesson not found</h2>
        <p className="mt-4 text-gray-600">Sorry, we couldn't find the lesson you're looking for.</p>
        <Link to="/" className="btn-primary mt-6 inline-block">
          Return to Home
        </Link>
      </div>
    );
  }

  const currentSection = lesson.sections[currentSectionIndex];
  const isFirstSection = currentSectionIndex === 0;
  const isLastSection = currentSectionIndex === lesson.sections.length - 1;
  const progress = Math.round(((currentSectionIndex + 1) / lesson.sections.length) * 100);

  return (
    <div>
      {/* Lesson Header */}
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold mt-2">{lesson.title}</h1>
        <div className="flex items-center mt-2">
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <span className="ml-4 text-sm text-gray-600">
            {currentSectionIndex + 1} of {lesson.sections.length}
          </span>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {currentSection.type === 'introduction' && (
          <div className="prose max-w-none">
            <ReactMarkdown>{currentSection.content}</ReactMarkdown>
          </div>
        )}
        
        {currentSection.type === 'video' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">{currentSection.title || 'Video Lesson'}</h2>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe
                src={currentSection.url}
                title={currentSection.title || 'Video Lesson'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg w-full h-64 md:h-96"
              ></iframe>
            </div>
            {currentSection.description && (
              <p className="text-gray-700 mt-2">{currentSection.description}</p>
            )}
          </div>
        )}
        
        {currentSection.type === 'text' && (
          <div className="prose max-w-none">
            <ReactMarkdown>{currentSection.content}</ReactMarkdown>
          </div>
        )}
        
        {currentSection.type === 'interactive' && (
          <div>
            {currentSection.component === 'NumberLine' && (
              <NumberLine 
                start={currentSection.props.start} 
                end={currentSection.props.end}
                highlightEvery={currentSection.props.highlightEvery}
                interactive={currentSection.props.interactive}
              />
            )}
          </div>
        )}
        
        {currentSection.type === 'conclusion' && (
          <div className="prose max-w-none">
            <ReactMarkdown>{currentSection.content}</ReactMarkdown>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePreviousSection}
          disabled={isFirstSection}
          className={`btn ${isFirstSection ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'btn-secondary'}`}
        >
          Previous
        </button>
        
        {isLastSection ? (
          <button
            onClick={handleCompleteLesson}
            className="btn-primary"
          >
            Complete & Continue
          </button>
        ) : (
          <button
            onClick={handleNextSection}
            className="btn-primary"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default LessonPage;
