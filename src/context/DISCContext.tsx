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
  setAnswer: (questionId: number, option: Option) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  calculateResults: () => void;
  resetTest: () => void;
  isTestCompleted: boolean;
};

// Type assertion to ensure the imported questions match our defined Question type
const questions = questionsData as Question[];

const initialScores: Scores = {
  D: 0,
  I: 0,
  S: 0,
  C: 0,
};

const DISCContext = createContext<DISCContextType | undefined>(undefined);

export const DISCProvider = ({ children }: { children: ReactNode }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Option>>({});
  const [scores, setScores] = useState<Scores>(initialScores);
  const [dominantType, setDominantType] = useState<string | null>(null);
  const [isTestCompleted, setIsTestCompleted] = useState(false);

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
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setScores(initialScores);
    setDominantType(null);
    setIsTestCompleted(false);
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
        setAnswer,
        nextQuestion,
        prevQuestion,
        calculateResults,
        resetTest,
        isTestCompleted,
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