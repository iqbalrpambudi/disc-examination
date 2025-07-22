'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useDISC } from '@/context/DISCContext';

export default function EmailPage() {
  const router = useRouter();
  const { setUserEmail, startTest } = useDISC();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Store email and start test
    setUserEmail(email);
    startTest();
    router.push('/test');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <main className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
        <h1 className="text-2xl font-bold text-center mb-6">Enter Your Email</h1>
        
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Please provide your email address before starting the DISC assessment. 
          Your results will be sent to this email address.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              required
            />
            {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
            >
              Continue to Assessment
            </button>
          </div>
        </form>
        
        <p className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
          Your email will only be used to send your DISC assessment results and will not be shared with third parties.
        </p>
      </main>
    </div>
  );
}