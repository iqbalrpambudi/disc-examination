import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <main className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 my-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">DISC Personality Assessment</h1>
        
        <div className="space-y-6 mb-8">
          <p className="text-lg">
            Welcome to the DISC Personality Assessment! This test will help you understand your behavioral style
            and how you interact with others.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">What is DISC?</h2>
          <p>
            DISC is a behavior assessment tool based on the DISC theory of psychologist William Marston. 
            It focuses on four different personality traits:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-800">
              <h3 className="font-bold text-red-700 dark:text-red-400">D - Dominance</h3>
              <p className="text-sm">Direct, decisive, problem-solver, risk-taker</p>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-100 dark:border-yellow-800">
              <h3 className="font-bold text-yellow-700 dark:text-yellow-400">I - Influence</h3>
              <p className="text-sm">Optimistic, enthusiastic, persuasive, talkative</p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
              <h3 className="font-bold text-green-700 dark:text-green-400">S - Steadiness</h3>
              <p className="text-sm">Patient, loyal, stable, predictable, consistent</p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
              <h3 className="font-bold text-blue-700 dark:text-blue-400">C - Conscientiousness</h3>
              <p className="text-sm">Analytical, precise, detail-oriented, logical</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-2">About This Test</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>10 questions to assess your behavioral tendencies</li>
            <li>Takes approximately 5 minutes to complete</li>
            <li>Provides insights into your dominant personality style</li>
            <li>Helps you understand your strengths and potential challenges</li>
          </ul>
        </div>
        
        <div className="flex justify-center">
          <Link 
            href="/test"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-full transition-colors duration-200 flex items-center justify-center"
          >
            Start Assessment
          </Link>
        </div>
      </main>
    </div>
  );
}
