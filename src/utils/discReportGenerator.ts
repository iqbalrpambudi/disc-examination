import { generatePDFFromHTML, downloadPDFFromHTML } from './pdfGenerator';
import { generateDISCReportHTML, DISCReportData } from '../templates/discReportTemplate';

/**
 * Generate a DISC report PDF as base64 string
 * @param data - The DISC report data
 * @returns Promise<string> - Base64 encoded PDF
 */
export async function generateDISCReportPDF(data: DISCReportData): Promise<string> {
  const htmlContent = generateDISCReportHTML(data);
  return await generatePDFFromHTML(htmlContent);
}

/**
 * Download a DISC report PDF file
 * @param data - The DISC report data
 * @param filename - The filename for the downloaded PDF
 */
export async function downloadDISCReportPDF(data: DISCReportData, filename: string): Promise<void> {
  const htmlContent = generateDISCReportHTML(data);
  return await downloadPDFFromHTML(htmlContent, filename);
}

/**
 * Helper function to format strengths/challenges list as HTML
 * @param items - Array of strength/challenge items
 * @returns HTML string with list items
 */
export function formatListItems(items: string[]): string {
  return items.map(item => `<li>${item}</li>`).join('');
}

/**
 * Helper function to determine dominant type description
 * @param dominantType - The dominant DISC type (D, I, S, C)
 * @returns Description of the dominant type
 */
export function getDominantTypeDescription(dominantType: string): string {
  const descriptions = {
    'D': 'The Driver',
    'I': 'The Influencer', 
    'S': 'The Supporter',
    'C': 'The Analyzer'
  };
  return descriptions[dominantType as keyof typeof descriptions] || 'Unknown Type';
}

/**
 * Helper function to get profile description based on dominant type
 * @param dominantType - The dominant DISC type (D, I, S, C)
 * @returns Profile description
 */
export function getProfileDescription(dominantType: string): string {
  const profiles = {
    'D': 'You are direct, decisive, and results-oriented. You focus on achieving goals, overcoming challenges, and taking charge. You value efficiency, control, and getting things done.',
    'I': 'You are enthusiastic, optimistic, and people-oriented. You focus on influencing others, building relationships, and creating a positive environment. You value recognition, social interaction, and collaboration.',
    'S': 'You are patient, reliable, and team-oriented. You focus on supporting others, maintaining stability, and creating harmony. You value cooperation, consistency, and helping others succeed.',
    'C': 'You are analytical, systematic, and precise. You focus on accuracy, quality, and logical thinking. You value expertise, competency, and attention to detail.'
  };
  return profiles[dominantType as keyof typeof profiles] || 'Profile description not available.';
}

/**
 * Helper function to get work style description based on dominant type
 * @param dominantType - The dominant DISC type (D, I, S, C)
 * @returns Work style description
 */
export function getWorkStyleDescription(dominantType: string): string {
  const workStyles = {
    'D': 'You work quickly and decisively, focusing on results and efficiency. You prefer autonomy and direct communication.',
    'I': 'You work collaboratively and enthusiastically, focusing on people and relationships. You prefer variety and social interaction.',
    'S': 'You work steadily and cooperatively, focusing on team harmony and support. You prefer stable environments and clear expectations.',
    'C': 'You work methodically and precisely, focusing on quality and accuracy. You prefer clear expectations and time to analyze before acting.'
  };
  return workStyles[dominantType as keyof typeof workStyles] || 'Work style description not available.';
}

/**
 * Helper function to get default strengths based on dominant type
 * @param dominantType - The dominant DISC type (D, I, S, C)
 * @returns Array of strengths
 */
export function getDefaultStrengths(dominantType: string): string[] {
  const strengths = {
    'D': ['Leadership', 'Decision making', 'Problem solving', 'Goal achievement'],
    'I': ['Communication', 'Enthusiasm', 'Relationship building', 'Motivation'],
    'S': ['Teamwork', 'Patience', 'Reliability', 'Support'],
    'C': ['Critical thinking', 'Attention to detail', 'Organization', 'Problem analysis']
  };
  return strengths[dominantType as keyof typeof strengths] || [];
}

/**
 * Helper function to get default challenges based on dominant type
 * @param dominantType - The dominant DISC type (D, I, S, C)
 * @returns Array of challenges
 */
export function getDefaultChallenges(dominantType: string): string[] {
  const challenges = {
    'D': ['May be impatient', 'Can be too direct', 'Might overlook details', 'May not consider others\' feelings'],
    'I': ['May lack attention to detail', 'Can be overly optimistic', 'Might struggle with routine tasks', 'May talk more than listen'],
    'S': ['May resist change', 'Can be too accommodating', 'Might avoid conflict', 'May lack assertiveness'],
    'C': ['May be overly critical', 'Can be perfectionistic', 'Might overthink decisions', 'May struggle with spontaneity']
  };
  return challenges[dominantType as keyof typeof challenges] || [];
}