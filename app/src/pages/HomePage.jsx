import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import curriculum from '@/data/curriculum.json';
const HomePage = ({ userProgress }) => {
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // In a real app, this would be an API call
        // For now, we're using the local JSON data
        setGrades(curriculum.grades);
        setLoading(false);
    }, []);
    // Calculate completion percentage for each grade
    const getGradeCompletion = (grade) => {
        var totalLessons = grade.topics.reduce(function (acc, topic) { return acc + topic.lessons.length; }, 0);
        if (totalLessons === 0)
            return 0;
        var completedCount = 0;
        grade.topics.forEach(function (topic) {
            topic.lessons.forEach(function (lesson) {
                if (userProgress.completedLessons.includes(lesson.id)) {
                    completedCount++;
                }
            });
        });
        return Math.round((completedCount / totalLessons) * 100);
    };
    // Find the last visited lesson if any
    const getLastVisitedLesson = () => {
        if (!userProgress.lastVisited)
            return null;
        for (var _i = 0, grades_1 = grades; _i < grades_1.length; _i++) {
            var grade = grades_1[_i];
            for (var _a = 0, _b = grade.topics; _a < _b.length; _a++) {
                var topic = _b[_a];
                var lesson = topic.lessons.find(function (l) { return l.id === userProgress.lastVisited; });
                if (lesson) {
                    return {
                        lesson: lesson,
                        topic: topic,
                        grade: grade
                    };
                }
            }
        }
        return null;
    };
    const lastVisited = getLastVisitedLesson();
    if (loading) {
        return (<div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>);
    }
    return (<div>
      {/* Hero Section */}
      <section className="bg-blue-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 rounded-lg mb-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Welcome to MathQuest!</h1>
          <p className="text-xl text-blue-700 mb-8">
            Fun and interactive math lessons for primary school students.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/grade/year-2" className="btn-primary">
              Start Year 2
            </Link>
            <Link to="/grade/year-3" className="btn-secondary">
              Start Year 3
            </Link>
          </div>
        </div>
      </section>

      {/* Continue Learning Section */}
      {lastVisited && (<section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{lastVisited.grade.name} &gt; {lastVisited.topic.name}</p>
                <h3 className="text-xl font-semibold">{lastVisited.lesson.title}</h3>
                <p className="text-gray-600 mt-1">{lastVisited.lesson.description}</p>
              </div>
              <Link to={"/lesson/".concat(lastVisited.lesson.id)} className="btn-primary whitespace-nowrap">
                Continue
              </Link>
            </div>
          </div>
        </section>)}

      {/* Grade Levels Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Grade Levels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {grades.map(function (grade) { return (<Link key={grade.id} to={"/grade/".concat(grade.id)} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{grade.name}</h3>
              <p className="text-gray-600 mb-4">
                {grade.topics.length} topics, {grade.topics.reduce(function (acc, topic) { return acc + topic.lessons.length; }, 0)} lessons
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "".concat(getGradeCompletion(grade), "%") }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {getGradeCompletion(grade)}% complete
              </p>
            </Link>); })}
        </div>
      </section>

      {/* Featured Topics Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Topics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {grades.length > 0 && grades[0].topics.slice(0, 3).map(function (topic) { return (<Link key={topic.id} to={"/topic/".concat(topic.id)} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{topic.icon}</span>
                <h3 className="text-lg font-semibold">{topic.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{topic.description}</p>
              <p className="text-sm text-blue-600 font-medium">
                {topic.lessons.length} lessons
              </p>
            </Link>); })}
        </div>
      </section>
    </div>);
};
export default HomePage;
