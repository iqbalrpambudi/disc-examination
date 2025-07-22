'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDISC } from '@/context/DISCContext';

export default function ResultsPage() {
  const router = useRouter();
  const { scores, dominantType, profiles, isTestCompleted, resetTest } = useDISC();

  // Redirect to test page if test is not completed
  useEffect(() => {
    if (!isTestCompleted) {
      router.push('/test');
    }
  }, [isTestCompleted, router]);

  if (!isTestCompleted || !dominantType) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const profile = profiles[dominantType];
  const totalQuestions = Object.values(scores).reduce((sum, score) => sum + score, 0);

  // Calculate percentages for the chart
  const percentages = {
    D: Math.round((scores.D / totalQuestions) * 100) || 0,
    I: Math.round((scores.I / totalQuestions) * 100) || 0,
    S: Math.round((scores.S / totalQuestions) * 100) || 0,
    C: Math.round((scores.C / totalQuestions) * 100) || 0,
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <main className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Your DISC Results</h1>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2">
            Your dominant type is: <span className="text-indigo-600 dark:text-indigo-400">{profile.name} ({dominantType})</span>
          </h2>
          <p className="text-xl font-medium text-indigo-700 dark:text-indigo-300">{profile.title}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Your Profile</h3>
            <p className="mb-6">{profile.description}</p>

            <h4 className="font-semibold mb-2">Work Style</h4>
            <p className="mb-6">{profile.workStyle}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">Strengths</h4>
                <ul className="list-disc list-inside space-y-1">
                  {profile.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-amber-600 dark:text-amber-400">Challenges</h4>
                <ul className="list-disc list-inside space-y-1">
                  {profile.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Your DISC Distribution</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-red-600 dark:text-red-400">Dominance (D)</span>
                  <span>{percentages.D}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-red-500 h-4 rounded-full"
                    style={{ width: `${percentages.D}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-yellow-600 dark:text-yellow-400">Influence (I)</span>
                  <span>{percentages.I}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-yellow-500 h-4 rounded-full"
                    style={{ width: `${percentages.I}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-green-600 dark:text-green-400">Steadiness (S)</span>
                  <span>{percentages.S}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-green-500 h-4 rounded-full"
                    style={{ width: `${percentages.S}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-blue-600 dark:text-blue-400">Conscientiousness (C)</span>
                  <span>{percentages.C}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${percentages.C}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <h4 className="font-semibold mb-2">About Your Results</h4>
              <p className="text-sm">
                While {dominantType} is your primary style, everyone has a blend of all four DISC styles.
                The percentages above show your distribution across all styles. Your unique combination
                shapes how you interact with others and approach situations.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button
            onClick={resetTest}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-200"
          >
            Take Test Again
          </button>
          <Link
            href="/"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-full transition-colors duration-200 text-center dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
          >
            Return Home
          </Link>
        </div>
      </main>
    </div>
  );
}