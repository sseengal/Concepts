import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import curriculum from '@/data/curriculum.json';

const TopicPage = ({ userProgress }) => {
    const { topicId } = useParams();
    const [topic, setTopic] = useState(null);
    const [grade, setGrade] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, this would be an API call
        // For now, we're using the local JSON data
        let foundTopic = null;
        let foundGrade = null;
        curriculum.grades.forEach(g => {
            const t = g.topics.find(t => t.id === topicId);
            if (t) {
                foundTopic = t;
                foundGrade = g;
            }
        });
        setTopic(foundTopic);
        setGrade(foundGrade);
        setLoading(false);
    }, [topicId]);

    // Check if a lesson is completed
    const isLessonCompleted = (lessonId) => {
        return userProgress.completedLessons.includes(lessonId);
    };

    // Get exercise score if available
    const getExerciseScore = (exerciseId) => {
        return userProgress.exerciseScores[exerciseId] || null;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!topic || !grade) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-700">Topic not found</h2>
                <p className="mt-4 text-gray-600">Sorry, we couldn't find the topic you're looking for.</p>
                <Link to="/" className="btn-primary mt-6 inline-block">
                    Return to Home
                </Link>
            </div>
        );
    }

    return (
        <div>
            {/* Topic Header */}
            <div className="mb-8">
                <div className="flex items-center mb-2">
                    <Link to="/" className="text-blue-600 hover:text-blue-800 mr-2">
                        Home
                    </Link>
                    <span className="text-gray-500">&gt;</span>
                    <Link to={`/grade/${grade.id}`} className="text-blue-600 hover:text-blue-800 mx-2">
                        {grade.name}
                    </Link>
                    <span className="text-gray-500">&gt;</span>
                    <span className="ml-2 text-gray-700">{topic.name}</span>
                </div>
                <div className="flex items-center">
                    <span className="text-4xl mr-4">{topic.icon}</span>
                    <div>
                        <h1 className="text-3xl font-bold">{topic.name}</h1>
                        <p className="text-gray-600 mt-1">{topic.description}</p>
                    </div>
                </div>
            </div>

            {/* Lessons List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Lessons</h2>
                    <p className="text-gray-600">Complete these lessons in order to master this topic</p>
                </div>
                <ul className="divide-y divide-gray-200">
                    {topic.lessons.map((lesson, index) => {
                        const isCompleted = isLessonCompleted(lesson.id);
                        const isLocked = index > 0 && !isLessonCompleted(topic.lessons[index - 1].id);
                        const isPremium = lesson.is_premium;
                        
                        return (
                            <li key={lesson.id} className="p-6">
                                <div className="flex items-start">
                                    <div className="mr-4 mt-1">
                                        {isCompleted ? (
                                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                                </svg>
                                            </span>
                                        ) : (
                                            <span className={`flex h-8 w-8 items-center justify-center rounded-full ${isLocked ? 'bg-gray-100 text-gray-400' : 'bg-blue-100 text-blue-600'}`}>
                                                {index + 1}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center mb-1">
                                            <h3 className="text-lg font-medium">{lesson.title}</h3>
                                            {isPremium && (
                                                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                                                    Premium
                                                </span>
                                            )}
                                            <span className="ml-auto text-sm text-gray-500">{lesson.duration}</span>
                                        </div>
                                        <p className="text-gray-600 mb-3">{lesson.description}</p>
                                        
                                        {isLocked ? (
                                            <button disabled className="btn bg-gray-200 text-gray-500 cursor-not-allowed">
                                                <svg className="inline-block w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                                </svg>
                                                Complete previous lesson first
                                            </button>
                                        ) : isPremium && userProgress.completedLessons.length < 2 ? (
                                            <div>
                                                <button className="btn bg-yellow-500 text-white hover:bg-yellow-600">
                                                    <svg className="inline-block w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                                    </svg>
                                                    Premium Content
                                                </button>
                                                <p className="text-sm text-gray-500 mt-2">
                                                    This is a premium lesson. Premium features will be available in the future.
                                                </p>
                                            </div>
                                        ) : (
                                            <Link to={`/lesson/${lesson.id}`} className={`btn ${isCompleted ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'btn-primary'}`}>
                                                {isCompleted ? 'Review Lesson' : 'Start Lesson'}
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Related Topics */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Related Topics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {grade.topics
                        .filter(t => t.id !== topic.id)
                        .slice(0, 2)
                        .map(relatedTopic => (
                            <Link key={relatedTopic.id} to={`/topic/${relatedTopic.id}`} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center">
                                <span className="text-2xl mr-3">{relatedTopic.icon}</span>
                                <div>
                                    <h3 className="font-medium">{relatedTopic.name}</h3>
                                    <p className="text-sm text-gray-600">{relatedTopic.lessons.length} lessons</p>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default TopicPage;
