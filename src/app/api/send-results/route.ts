import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/utils/emailService';
import profiles from '@/data/disc-profiles.json';

// Import the Scores type from DISCContext
type Scores = {
  D: number;
  I: number;
  S: number;
  C: number;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, dominantType, scores, testDuration } = body as {
      email: string;
      dominantType: string;
      scores: Scores;
      testDuration: number;
    };

    // Validate required fields
    if (!email || !dominantType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get profile data for the dominant type
    const profile = profiles[dominantType as keyof typeof profiles];
    if (!profile) {
      return NextResponse.json(
        { error: 'Invalid dominant type' },
        { status: 400 }
      );
    }

    // Calculate percentages
    const totalQuestions = Object.values(scores).reduce((sum: number, score: number) => sum + score, 0);
    const percentages = {
      D: Math.round((scores.D / totalQuestions) * 100) || 0,
      I: Math.round((scores.I / totalQuestions) * 100) || 0,
      S: Math.round((scores.S / totalQuestions) * 100) || 0,
      C: Math.round((scores.C / totalQuestions) * 100) || 0,
    };

    // Format test duration
    const formatDuration = (seconds: number) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${remainingSeconds}s`;
    };

    // Format date
    const formatDate = () => {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date());
    };

    // Prepare email content
    const subject = `Your DISC Assessment Results: ${profile.name} (${dominantType})`;
    
    const text = `
      Thank you for completing the DISC Assessment.
      
      Your dominant type is ${profile.name} (${dominantType})
      
      DISC Distribution:
      Dominance (D): ${percentages.D}%
      Influence (I): ${percentages.I}%
      Steadiness (S): ${percentages.S}%
      Conscientiousness (C): ${percentages.C}%
      
      Test completed on: ${formatDate()}
      Test duration: ${formatDuration(testDuration)}
      
      ${profile.description}
      
      Work Style:
      ${profile.workStyle}
      
      Strengths:
      ${profile.strengths.map(s => `- ${s}`).join('\n')}
      
      Challenges:
      ${profile.challenges.map(c => `- ${c}`).join('\n')}
    `;
    
    const html = `
      <h1>Your DISC Assessment Results</h1>
      <p>Thank you for completing the DISC Assessment.</p>
      
      <h2>Your dominant type is: <span style="color: #4f46e5">${profile.name} (${dominantType})</span></h2>
      <p><strong>${profile.title}</strong></p>
      
      <h3>Your DISC Distribution</h3>
      <ul>
        <li><strong style="color: #ef4444">Dominance (D):</strong> ${percentages.D}%</li>
        <li><strong style="color: #eab308">Influence (I):</strong> ${percentages.I}%</li>
        <li><strong style="color: #22c55e">Steadiness (S):</strong> ${percentages.S}%</li>
        <li><strong style="color: #3b82f6">Conscientiousness (C):</strong> ${percentages.C}%</li>
      </ul>
      
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Participant email:</strong> ${email}</p>
        <p><strong>Test completed on:</strong> ${formatDate()}</p>
        <p><strong>Test duration:</strong> ${formatDuration(testDuration)}</p>
      </div>
      
      <h3>Your Profile</h3>
      <p>${profile.description}</p>
      
      <h4>Work Style</h4>
      <p>${profile.workStyle}</p>
      
      <div style="display: flex; gap: 20px; margin-top: 20px;">
        <div style="flex: 1;">
          <h4 style="color: #22c55e">Strengths</h4>
          <ul>
            ${profile.strengths.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
        
        <div style="flex: 1;">
          <h4 style="color: #f59e0b">Challenges</h4>
          <ul>
            ${profile.challenges.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>
      </div>
      
      <p style="margin-top: 30px; font-style: italic;">
        While ${dominantType} is your primary style, everyone has a blend of all four DISC styles.
        The percentages above show your distribution across all styles. Your unique combination
        shapes how you interact with others and approach situations.
      </p>
    `;

    // Send email
    const result = await sendEmail({
      recipientEmail: email,
      hrEmail: process.env.HR_EMAIL || '',
      subject,
      text,
      html,
    });

    if (result.success) {
      return NextResponse.json({ message: result.message });
    } else {
      return NextResponse.json(
        { error: result.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in send-results API route:', error);
    return NextResponse.json(
      { error: 'Failed to send results email' },
      { status: 500 }
    );
  }
}