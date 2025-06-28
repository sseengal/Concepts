import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import curriculum from '@/data/curriculum.json';
const GradeLevelPage = ({ userProgress }) => {
    const { gradeId } = useParams();
    const [grade, setGrade] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // In a real app, this would be an API call
        // For now, we're using the local JSON data
        const foundGrade = curriculum.grades.find(g => g.id === gradeId);
        setGrade(foundGrade || null);
        setLoading(false);
    }, [gradeId]);
    // Calculate completion percentage for a topic
    const getTopicCompletion = (topic) => {
        if (topic.lessons.length === 0)
            return 0;
        let completedCount = 0;
        topic.lessons.forEach((lesson) => {
            if (userProgress.completedLessons.includes(lesson.id)) {
                completedCount++;
            }
        });
        return Math.round((completedCount / topic.lessons.length) * 100);
    };
    if (loading) {
        return (<div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>);
    }
    if (!grade) {
        return (<div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-700">Grade not found</h2>
        <p className="mt-4 text-gray-600">Sorry, we couldn't find the grade you're looking for.</p>
        <react_router_dom_1.Link to="/" className="btn-primary mt-6 inline-block">
          Return to Home
        </react_router_dom_1.Link>
      </div>);
    }
    return (<div>
      {/* Grade Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <react_router_dom_1.Link to="/" className="text-blue-600 hover:text-blue-800 mr-2">
            Home
          </react_router_dom_1.Link>
          <span className="text-gray-500">&gt;</span>
          <span className="ml-2 text-gray-700">{grade.name}</span>
        </div>
        <h1 className="text-3xl font-bold">{grade.name} Mathematics</h1>
        <p className="text-gray-600 mt-2">
          Explore {grade.topics.length} topics with {grade.topics.reduce(function (acc, topic) { return acc + topic.lessons.length; }, 0)} interactive lessons
        </p>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {grade.topics.map(function (topic) { return (<div key={topic.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{topic.icon}</span>
                <h2 className="text-xl font-semibold">{topic.name}</h2>
              </div>
              <p className="text-gray-600 mb-4">{topic.description}</p>
              
              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{getTopicCompletion(topic)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "".concat(getTopicCompletion(topic), "%") }}></div>
                </div>
              </div>
              
              <react_router_dom_1.Link to={"/topic/".concat(topic.id)} className="btn-primary w-full text-center block">
                Explore Topic
              </react_router_dom_1.Link>
            </div>
            
            {/* Lesson list preview */}
            <div className="bg-gray-50 px-6 py-4">
              <h3 className="text-sm font-medium text-gray-500 mb-3">LESSONS</h3>
              <ul className="space-y-2">
                {topic.lessons.slice(0, 3).map(function (lesson) { return (<li key={lesson.id} className="flex items-center">
                    {userProgress.completedLessons.includes(lesson.id) ? (<svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>) : (<svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>)}
                    <span className="text-gray-700">{lesson.title}</span>
                    {lesson.is_premium && (<span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                        Premium
                      </span>)}
                  </li>); })}
                {topic.lessons.length > 3 && (<li className="text-sm text-gray-500">
                    + {topic.lessons.length - 3} more lessons
                  </li>)}
              </ul>
            </div>
          </div>); })}
      </div>
    </div>);
};
export default GradeLevelPage;
