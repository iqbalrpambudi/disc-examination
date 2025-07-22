import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/utils/emailService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recipientEmail, hrEmail, subject, text, html, attachmentData } = body;

    // Validate required fields
    if (!recipientEmail || !subject || !text || !html) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create attachment from base64 data if provided
    const attachments = attachmentData
      ? [
          {
            filename: 'DISC_Assessment_Results.pdf',
            content: Buffer.from(attachmentData, 'base64'),
            contentType: 'application/pdf',
          },
        ]
      : undefined;

    // Send email
    const result = await sendEmail({
      recipientEmail,
      hrEmail: hrEmail || process.env.HR_EMAIL || '',
      subject,
      text,
      html,
      attachments,
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
    console.error('Error in email API route:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}