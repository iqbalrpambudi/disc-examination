'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDISC } from '@/context/DISCContext';

export default function TestPage() {
  const router = useRouter();
  const {
    currentQuestion,
    questions,
    answers,
    setAnswer,
    nextQuestion,
    prevQuestion,
    calculateResults,
    isEmailSubmitted,
    testStartTime,
  } = useDISC();
  
  const [elapsedTime, setElapsedTime] = useState(0);
  
  // Redirect to email page if email is not submitted
  useEffect(() => {
    if (!isEmailSubmitted) {
      router.push('/email');
    }
  }, [isEmailSubmitted, router]);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const question = questions[currentQuestion];
  
  // Redirect to email page if questions are not loaded
  useEffect(() => {
    if (isEmailSubmitted && questions.length === 0) {
      router.push('/email');
    }
  }, [isEmailSubmitted, questions.length, router]);
  
  // Timer effect
  useEffect(() => {
    if (!testStartTime) return;
    
    const timer = setInterval(() => {
      const now = new Date();
      const seconds = Math.floor((now.getTime() - testStartTime.getTime()) / 1000);
      setElapsedTime(seconds);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [testStartTime]);

  // Set selected option based on existing answers
  useEffect(() => {
    if (question && answers[question.id]) {
      const index = question.options.findIndex(
        (option) => option.type === answers[question.id].type
      );
      setSelectedOption(index);
    } else {
      setSelectedOption(null);
    }
  }, [currentQuestion, answers, question]);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    setAnswer(question.id, question.options[index]);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      nextQuestion();
    } else {
      // Last question, calculate results and navigate to results page
      calculateResults();
      router.push('/results');
    }
  };

  // Show loading or redirect if questions are not loaded
  if (!question || questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading test questions...</p>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <main className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
        <div className="flex justify-end mb-2">
          <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-medium">
            Time: {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
          </div>
        </div>
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6">{question?.question}</h1>

        <div className="space-y-4 mb-8">
          {question?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${selectedOption === index
                ? 'bg-indigo-50 border-indigo-500 dark:bg-indigo-900/30 dark:border-indigo-400'
                : 'bg-white border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
                }`}
            >
              {option.text}
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className={`px-6 py-2 rounded-full ${currentQuestion === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'
              }`}
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`px-6 py-2 rounded-full ${selectedOption === null
              ? 'bg-indigo-400 cursor-not-allowed dark:bg-indigo-800'
              : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500'
              } text-white`}
          >
            {currentQuestion < questions.length - 1 ? 'Next' : 'See Results'}
          </button>
        </div>
      </main>
    </div>
  );
}