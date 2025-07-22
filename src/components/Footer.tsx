export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} DISC Personality Assessment
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 text-sm"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 text-sm"
            >
              Terms of Service
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 text-sm"
            >
              Contact
            </a>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-center text-gray-400 dark:text-gray-500">
          <p>DISC is a behavior assessment tool based on the DISC theory of psychologist William Marston.</p>
          <p>This assessment is for educational purposes only and is not a substitute for professional advice.</p>
        </div>
      </div>
    </footer>
  );
}