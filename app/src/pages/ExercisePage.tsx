import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Exercise, Question, UserProgress } from '@/types';

interface ExercisePageProps {
  userProgress: UserProgress;
  updateProgress: (progress: Partial<UserProgress>) => void;
}

const ExercisePage = ({ userProgress, updateProgress }: ExercisePageProps) => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isExerciseCompleted, setIsExerciseCompleted] = useState(false);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we're using a direct import for the exercise JSON
        // This is a workaround for Vite's dynamic import behavior
        let exerciseData;
        
        // This is a simple mapping for now - in a real app, you'd want a more robust solution
        if (exerciseId === 'counting-practice') {
          const module = await import('../data/exercises/counting-practice.json');
          exerciseData = module.default;
        } else {
          throw new Error('Exercise not found');
        }
        
        setExercise(exerciseData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load exercise:', error);
        setLoading(false);
      }
    };

    fetchExercise();
  }, [exerciseId]);

  const handleAnswerSelect = (answer: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmitAnswer = () => {
    if (!exercise || selectedAnswer === null) return;
    
    const currentQuestion = exercise.questions[currentQuestionIndex];
    let isCorrect = false;
    
    if (currentQuestion.type === 'multiple-choice') {
      isCorrect = selectedAnswer === currentQuestion.correct_answer;
    } else if (currentQuestion.type === 'fill-in') {
      isCorrect = selectedAnswer.toLowerCase().trim() === currentQuestion.correct_answer.toLowerCase().trim();
    } else if (currentQuestion.type === 'true-false') {
      isCorrect = (selectedAnswer === 'true') === currentQuestion.correct_answer;
    }
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (!exercise) return;
    
    if (currentQuestionIndex < exercise.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      // Exercise completed
      setIsExerciseCompleted(true);
      
      // Update progress
      const updatedExerciseScores = {
        ...userProgress.exerciseScores,
        [exercise.id]: {
          score,
          total: exercise.questions.length,
          completedAt: new Date().toISOString()
        }
      };
      
      updateProgress({
        exerciseScores: updatedExerciseScores
      });
    }
  };

  const handleFinishExercise = () => {
    // Navigate back to the lesson or topic
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-700">Exercise not found</h2>
        <p className="mt-4 text-gray-600">Sorry, we couldn't find the exercise you're looking for.</p>
        <Link to="/" className="btn-primary mt-6 inline-block">
          Return to Home
        </Link>
      </div>
    );
  }

  if (isExerciseCompleted) {
    const percentage = Math.round((score / exercise.questions.length) * 100);
    let message = '';
    let emoji = '';
    
    if (percentage >= 90) {
      message = 'Excellent work!';
      emoji = '🎉';
    } else if (percentage >= 70) {
      message = 'Good job!';
      emoji = '👍';
    } else if (percentage >= 50) {
      message = 'Nice effort!';
      emoji = '😊';
    } else {
      message = 'Keep practicing!';
      emoji = '💪';
    }
    
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md p-8">
        <div className="text-5xl mb-4">{emoji}</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">{message}</h2>
        <p className="text-gray-600 mb-6">You scored {score} out of {exercise.questions.length}</p>
        
        <div className="w-full max-w-md mx-auto mb-8">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full ${
                percentage >= 70 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <p className="text-right mt-1 text-gray-600">{percentage}%</p>
        </div>
        
        <button
          onClick={handleFinishExercise}
          className="btn-primary"
        >
          Continue Learning
        </button>
      </div>
    );
  }

  const currentQuestion = exercise.questions[currentQuestionIndex];
  const progress = Math.round(((currentQuestionIndex + 1) / exercise.questions.length) * 100);

  return (
    <div>
      {/* Exercise Header */}
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold mt-2">{exercise.title}</h1>
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
            Question {currentQuestionIndex + 1} of {exercise.questions.length}
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6">{currentQuestion.text}</h2>
        
        {currentQuestion.type === 'multiple-choice' && (
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div 
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedAnswer === option 
                    ? isAnswerSubmitted
                      ? option === currentQuestion.correct_answer
                        ? 'bg-green-100 border-green-500'
                        : 'bg-red-100 border-red-500'
                      : 'bg-blue-50 border-blue-500'
                    : isAnswerSubmitted && option === currentQuestion.correct_answer
                      ? 'bg-green-100 border-green-500'
                      : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                    selectedAnswer === option 
                      ? isAnswerSubmitted
                        ? option === currentQuestion.correct_answer
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-blue-500 text-white'
                      : isAnswerSubmitted && option === currentQuestion.correct_answer
                        ? 'bg-green-500 text-white'
                        : 'border border-gray-300'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {currentQuestion.type === 'fill-in' && (
          <div>
            <input
              type="text"
              value={selectedAnswer || ''}
              onChange={(e) => handleAnswerSelect(e.target.value)}
              disabled={isAnswerSubmitted}
              placeholder="Type your answer here..."
              className={`w-full p-3 border rounded-lg ${
                isAnswerSubmitted
                  ? selectedAnswer?.toLowerCase().trim() === currentQuestion.correct_answer.toLowerCase().trim()
                    ? 'bg-green-100 border-green-500'
                    : 'bg-red-100 border-red-500'
                  : 'focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
              }`}
            />
            {isAnswerSubmitted && selectedAnswer?.toLowerCase().trim() !== currentQuestion.correct_answer.toLowerCase().trim() && (
              <p className="text-green-600 mt-2">Correct answer: {currentQuestion.correct_answer}</p>
            )}
          </div>
        )}
        
        {currentQuestion.type === 'true-false' && (
          <div className="flex space-x-4">
            <button
              onClick={() => handleAnswerSelect('true')}
              disabled={isAnswerSubmitted}
              className={`flex-1 p-4 border rounded-lg ${
                selectedAnswer === 'true'
                  ? isAnswerSubmitted
                    ? currentQuestion.correct_answer === true
                      ? 'bg-green-100 border-green-500'
                      : 'bg-red-100 border-red-500'
                    : 'bg-blue-50 border-blue-500'
                  : isAnswerSubmitted && currentQuestion.correct_answer === true
                    ? 'bg-green-100 border-green-500'
                    : 'hover:bg-gray-50'
              }`}
            >
              True
            </button>
            <button
              onClick={() => handleAnswerSelect('false')}
              disabled={isAnswerSubmitted}
              className={`flex-1 p-4 border rounded-lg ${
                selectedAnswer === 'false'
                  ? isAnswerSubmitted
                    ? currentQuestion.correct_answer === false
                      ? 'bg-green-100 border-green-500'
                      : 'bg-red-100 border-red-500'
                    : 'bg-blue-50 border-blue-500'
                  : isAnswerSubmitted && currentQuestion.correct_answer === false
                    ? 'bg-green-100 border-green-500'
                    : 'hover:bg-gray-50'
              }`}
            >
              False
            </button>
          </div>
        )}
        
        {isAnswerSubmitted && (
          <div className={`mt-6 p-4 rounded-lg ${
            selectedAnswer === currentQuestion.correct_answer 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <p className={`font-medium ${
              selectedAnswer === currentQuestion.correct_answer ? 'text-green-700' : 'text-red-700'
            }`}>
              {selectedAnswer === currentQuestion.correct_answer ? 'Correct!' : 'Incorrect'}
            </p>
            <p className="mt-1 text-gray-700">{currentQuestion.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <div></div> {/* Empty div for spacing */}
        
        {isAnswerSubmitted ? (
          <button
            onClick={handleNextQuestion}
            className="btn-primary"
          >
            {currentQuestionIndex < exercise.questions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
        ) : (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className={`btn ${selectedAnswer === null ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'btn-primary'}`}
          >
            Check Answer
          </button>
        )}
      </div>
    </div>
  );
};

export default ExercisePage;
