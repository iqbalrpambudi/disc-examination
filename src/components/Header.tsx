'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDISC } from '@/context/DISCContext';

export default function Header() {
  const pathname = usePathname();
  const { resetTest } = useDISC();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center" onClick={() => pathname === '/' ? resetTest() : null}>
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">DISC</span>
              <span className="ml-1 text-xl font-semibold">Assessment</span>
            </Link>
          </div>
          
          <nav className="flex space-x-4">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${pathname === '/' 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'}`}
              onClick={resetTest}
            >
              Home
            </Link>
            
            <Link 
              href="/test" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${pathname.startsWith('/test') 
                ? 'text-indigo-600 dark:text-indigo-400' 
                : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'}`}
              onClick={resetTest}
            >
              Take Test
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}