'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import questionsData from '@/data/disc-questions.json';
import profiles from '@/data/disc-profiles.json';

export type Option = {
  text: string;
  type: 'D' | 'I' | 'S' | 'C';
};

export type Question = {
  id: number;
  question: string;
  options: Option[];
};

export type Profile = {
  name: string;
  title: string;
  description: string;
  strengths: string[];
  challenges: string[];
  workStyle: string;
};

export type Scores = {
  D: number;
  I: number;
  S: number;
  C: number;
};

export type DISCContextType = {
  currentQuestion: number;
  questions: Question[];
  answers: Record<number, Option>;
  scores: Scores;
  dominantType: string | null;
  profiles: Record<string, Profile>;
  userEmail: string;
  setUserEmail: (email: string) => void;
  testStartTime: Date | null;
  testEndTime: Date | null;
  testDuration: number | null; // in seconds
  setAnswer: (questionId: number, option: Option) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  calculateResults: () => void;
  resetTest: () => void;
  isTestCompleted: boolean;
  isEmailSubmitted: boolean;
  startTest: () => void;
};

// Type assertion to ensure the imported questions match our defined Question type
const allQuestions = questionsData as Question[];

// Function to shuffle array and select random questions
const getRandomQuestions = (questions: Question[], count: number): Question[] => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const initialScores: Scores = {
  D: 0,
  I: 0,
  S: 0,
  C: 0,
};

const DISCContext = createContext<DISCContextType | undefined>(undefined);

export const DISCProvider = ({ children }: { children: ReactNode }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, Option>>({});
  const [scores, setScores] = useState<Scores>(initialScores);
  const [dominantType, setDominantType] = useState<string | null>(null);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [testStartTime, setTestStartTime] = useState<Date | null>(null);
  const [testEndTime, setTestEndTime] = useState<Date | null>(null);
  const [testDuration, setTestDuration] = useState<number | null>(null);

  const setAnswer = (questionId: number, option: Option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const newScores = { ...initialScores };

    // Count the number of each type selected
    Object.values(answers).forEach((answer) => {
      newScores[answer.type as keyof Scores] += 1;
    });

    setScores(newScores);

    // Find the dominant type (highest score)
    let maxScore = 0;
    let maxType: string | null = null;

    Object.entries(newScores).forEach(([type, score]) => {
      if (score > maxScore) {
        maxScore = score;
        maxType = type;
      }
    });

    setDominantType(maxType);
    setIsTestCompleted(true);
    
    // Record test end time and calculate duration
    const endTime = new Date();
    setTestEndTime(endTime);
    
    if (testStartTime) {
      const durationInSeconds = Math.floor((endTime.getTime() - testStartTime.getTime()) / 1000);
      setTestDuration(durationInSeconds);
    }
    
    // Send email with test results
    if (userEmail && maxType) {
      sendResultsEmail(userEmail, maxType, newScores);
    }
  };

  const sendResultsEmail = async (email: string, dominantType: string, scores: Scores) => {
    try {
      const response = await fetch('/api/send-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          dominantType,
          scores,
          testDuration: testDuration || 0,
        }),
      });
      
      if (!response.ok) {
        console.error('Failed to send results email');
      }
    } catch (error) {
      console.error('Error sending results email:', error);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setQuestions([]);
    setAnswers({});
    setScores(initialScores);
    setDominantType(null);
    setIsTestCompleted(false);
    setTestStartTime(null);
    setTestEndTime(null);
    setTestDuration(null);
    // Don't reset email when retaking the test
  };
  
  const startTest = () => {
    // Select 10 random questions for this test session
    const selectedQuestions = getRandomQuestions(allQuestions, 10);
    setQuestions(selectedQuestions);
    setIsEmailSubmitted(true);
    setTestStartTime(new Date());
  };

  return (
    <DISCContext.Provider
      value={{
        currentQuestion,
        questions,
        answers,
        scores,
        dominantType,
        profiles,
        userEmail,
        setUserEmail,
        testStartTime,
        testEndTime,
        testDuration,
        setAnswer,
        nextQuestion,
        prevQuestion,
        calculateResults,
        resetTest,
        isTestCompleted,
        isEmailSubmitted,
        startTest,
      }}
    >
      {children}
    </DISCContext.Provider>
  );
};

export const useDISC = () => {
  const context = useContext(DISCContext);
  if (context === undefined) {
    throw new Error('useDISC must be used within a DISCProvider');
  }
  return context;
};