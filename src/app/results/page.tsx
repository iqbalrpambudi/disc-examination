'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDISC } from '@/context/DISCContext';
import { downloadPDF, generatePDF } from '@/utils/pdfGenerator';

export default function ResultsPage() {
  const router = useRouter();
  const { 
    scores, 
    dominantType, 
    profiles, 
    isTestCompleted, 
    resetTest,
    userEmail,
    testDuration,
    testStartTime,
    testEndTime
  } = useDISC();
  
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{ success?: boolean; message: string } | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Redirect to test page if test is not completed
  useEffect(() => {
    if (!isTestCompleted) {
      router.push('/test');
    }
  }, [isTestCompleted, router]);
  
  // Show notification that results were automatically sent to HR
  useEffect(() => {
    if (isTestCompleted && userEmail) {
      setEmailStatus({ 
        success: true, 
        message: 'Your results have been recorded. You can also download them as PDF or send them again if needed.'
      });
    }
  }, [isTestCompleted, userEmail]);

  if (!isTestCompleted || !dominantType) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  // Format test duration
  const formatDuration = (seconds: number | null) => {
    if (!seconds) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  // Format date
  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  // Handle PDF download
  const handleDownloadPDF = async () => {
    if (!resultsRef.current) return;
    
    try {
      setIsDownloading(true);
      await downloadPDF('results-content', `DISC_Assessment_${dominantType}_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };
  
  // Handle manual email sending with PDF attachment
  const handleSendEmail = async () => {
    if (!resultsRef.current || !userEmail) return;
    
    try {
      setIsSending(true);
      setEmailStatus(null);
      
      // Generate PDF as base64
      const pdfBase64 = await generatePDF('results-content');
      
      // Prepare email content
      const emailData = {
        recipientEmail: userEmail,
        hrEmail: '', // Will use the default HR_EMAIL from .env.local
        subject: `Your DISC Assessment Results: ${profile.name} (${dominantType})`,
        text: `Thank you for completing the DISC Assessment. Your dominant type is ${profile.name} (${dominantType}). Please find your detailed results in the attached PDF.`,
        html: `
          <h1>Your DISC Assessment Results</h1>
          <p>Thank you for completing the DISC Assessment.</p>
          <p><strong>Your dominant type is: ${profile.name} (${dominantType})</strong></p>
          <p>${profile.description}</p>
          <p>Please find your detailed results in the attached PDF.</p>
        `,
        attachmentData: pdfBase64
      };
      
      // Send email via API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setEmailStatus({ success: true, message: 'Results sent successfully to your email and HR!' });
      } else {
        setEmailStatus({ success: false, message: result.error || 'Failed to send email' });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailStatus({ success: false, message: 'An error occurred while sending the email' });
    } finally {
      setIsSending(false);
    }
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
        <div id="results-content" ref={resultsRef}>
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

          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Test Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">Email:</span> {userEmail}
              </div>
              <div>
                <span className="font-medium">Test Date:</span> {formatDate(testStartTime)}
              </div>
              <div>
                <span className="font-medium">Completion Time:</span> {formatDate(testEndTime)}
              </div>
              <div>
                <span className="font-medium">Duration:</span> {formatDuration(testDuration)}
              </div>
            </div>
          </div>
        </div>
        
        {/* Email status message */}
        {emailStatus && (
          <div className={`mt-4 p-3 rounded-lg ${emailStatus.success ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
            {emailStatus.message}
          </div>
        )}
        
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-200 flex items-center gap-2"
          >
            {isDownloading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating PDF...
              </>
            ) : (
              <>Download Results as PDF</>
            )}
          </button>
          
          <button
            onClick={handleSendEmail}
            disabled={isSending}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-200 flex items-center gap-2"
          >
            {isSending ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending Email...
              </>
            ) : (
              <>Send Results Again</>
            )}
          </button>
          
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