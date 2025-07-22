# DISC Personality Assessment

A web application built with Next.js and Tailwind CSS that allows users to take a DISC personality assessment and view their results.

## About DISC

DISC is a behavior assessment tool based on the DISC theory of psychologist William Marston. It focuses on four different personality traits:

- **D - Dominance**: Direct, decisive, problem-solver, risk-taker
- **I - Influence**: Optimistic, enthusiastic, persuasive, talkative
- **S - Steadiness**: Patient, loyal, stable, predictable, consistent
- **C - Conscientiousness**: Analytical, precise, detail-oriented, logical

## Features

- Interactive DISC assessment with 10 questions
- Email input requirement before taking the test
- Real-time progress tracking with test duration timer
- Detailed results with personality profile information
- PDF generation and download of test results
- Email functionality to send results to the user and HR
- Responsive design for all device sizes
- Dark mode support

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Context API](https://reactjs.org/docs/context.html) - State management
- [jsPDF](https://github.com/MrRio/jsPDF) - PDF generation
- [html2canvas](https://github.com/niklasvh/html2canvas) - HTML to canvas conversion for PDF
- [Nodemailer](https://nodemailer.com/) - Email sending functionality

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd disc-examination
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Configure email settings

Create a `.env.local` file in the root directory with the following variables:

```
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASSWORD=your-app-password
HR_EMAIL=hr@company.com
```

Note: For Gmail, you'll need to use an App Password. See [Google's documentation](https://support.google.com/accounts/answer/185833) for more information.

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

```
/src
  /app                  # Next.js app router pages
    /page.tsx           # Home page
    /email/page.tsx     # Email input page
    /test/page.tsx      # Test page
    /results/page.tsx   # Results page
    /api                # API routes
      /send-email       # Email sending API
  /components           # Reusable components
  /context              # React context for state management
  /data                 # JSON data for questions and profiles
  /utils                # Utility functions
    /emailService.ts    # Email service
    /pdfGenerator.ts    # PDF generation utilities
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
