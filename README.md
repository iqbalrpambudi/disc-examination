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
- Real-time progress tracking
- Detailed results with personality profile information
- Responsive design for all device sizes
- Dark mode support

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Context API](https://reactjs.org/docs/context.html) - State management

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

3. Run the development server

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

```
/src
  /app                  # Next.js app router pages
    /page.tsx           # Home page
    /test/page.tsx      # Test page
    /results/page.tsx   # Results page
  /components           # Reusable components
  /context              # React context for state management
  /data                 # JSON data for questions and profiles
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
