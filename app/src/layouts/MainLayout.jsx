import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const MainLayout = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (<div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-app py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">MathQuest</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link to="/grade/year-2" className="text-gray-700 hover:text-blue-600">Year 2</Link>
              <Link to="/grade/year-3" className="text-gray-700 hover:text-blue-600">Year 3</Link>
              <span className="text-gray-700 cursor-not-allowed opacity-50">Premium</span>
            </nav>

            {/* Mobile menu button */}
            <button type="button" className="md:hidden p-2 rounded-md text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (<div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4">
                <Link to="/" className="text-gray-700 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link to="/grade/year-2" className="text-gray-700 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Year 2</Link>
                <Link to="/grade/year-3" className="text-gray-700 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>Year 3</Link>
                <span className="text-gray-700 cursor-not-allowed opacity-50">Premium</span>
              </div>
            </div>)}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container-app py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container-app">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">MathQuest</h3>
              <p className="text-gray-600">
                Making math fun and accessible for primary school students.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link></li>
                <li><span className="text-gray-600 cursor-not-allowed opacity-50">About Us</span></li>
                <li><span className="text-gray-600 cursor-not-allowed opacity-50">Contact</span></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><span className="text-gray-600 cursor-not-allowed opacity-50">Terms of Service</span></li>
                <li><span className="text-gray-600 cursor-not-allowed opacity-50">Privacy Policy</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-center">© {new Date().getFullYear()} MathQuest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>);
};
export default MainLayout;
