export interface Resource {
  name: string;
  description: string;
  url: string;
  phone?: string;
  category: 'crisis' | 'treatment' | 'support' | 'information';
}

export const emergencyDisclaimer = `If you or someone you know is in immediate danger or experiencing a medical emergency, please call your local emergency number (911 in the US) or go to the nearest emergency room immediately. This website is not monitored 24/7 and cannot provide emergency assistance.`;

export const crisisGuidance = `If you're experiencing a mental health crisis or having thoughts of suicide, please reach out to a crisis helpline immediately. Trained counselors are available 24/7 to provide confidential support.`;

export const resources: Resource[] = [
  {
    name: '988 Suicide & Crisis Lifeline',
    description:
      'Free, confidential support 24/7 for people in distress, prevention and crisis resources.',
    url: 'https://988lifeline.org/',
    phone: '988',
    category: 'crisis',
  },
  {
    name: 'SAMHSA National Helpline',
    description:
      'Free, confidential, 24/7 treatment referral and information service (in English and Spanish) for individuals and families facing mental health and/or substance use disorders.',
    url: 'https://www.samhsa.gov/find-help/national-helpline',
    phone: '1-800-662-4357',
    category: 'crisis',
  },
  {
    name: 'Crisis Text Line',
    description:
      'Free, 24/7 support for those in crisis. Text HOME to 741741 to connect with a trained crisis counselor.',
    url: 'https://www.crisistextline.org/',
    phone: '741741',
    category: 'crisis',
  },
  {
    name: 'Alcoholics Anonymous (AA)',
    description:
      'International fellowship of people who have had a drinking problem. Find local meetings and support.',
    url: 'https://www.aa.org/',
    category: 'support',
  },
  {
    name: 'Narcotics Anonymous (NA)',
    description:
      'Global community-based organization for people recovering from drug addiction. Find meetings worldwide.',
    url: 'https://www.na.org/',
    category: 'support',
  },
  {
    name: 'SMART Recovery',
    description:
      'Science-based addiction recovery support groups that teach self-empowerment and self-reliance.',
    url: 'https://www.smartrecovery.org/',
    category: 'support',
  },
  {
    name: 'Al-Anon Family Groups',
    description:
      'Support for families and friends of people with alcohol problems. Find meetings and resources.',
    url: 'https://al-anon.org/',
    category: 'support',
  },
  {
    name: 'Nar-Anon Family Groups',
    description:
      'Support for families and friends affected by someone else\'s drug addiction.',
    url: 'https://www.nar-anon.org/',
    category: 'support',
  },
  {
    name: 'National Institute on Drug Abuse (NIDA)',
    description:
      'Comprehensive information about drug abuse and addiction, including research, treatment, and prevention.',
    url: 'https://www.drugabuse.gov/',
    category: 'information',
  },
  {
    name: 'National Institute on Alcohol Abuse and Alcoholism (NIAAA)',
    description:
      'Research-based information about alcohol use, abuse, and alcoholism.',
    url: 'https://www.niaaa.nih.gov/',
    category: 'information',
  },
  {
    name: 'Partnership to End Addiction',
    description:
      'Resources for families dealing with addiction, including a helpline and educational materials.',
    url: 'https://drugfree.org/',
    category: 'information',
  },
  {
    name: 'FindTreatment.gov',
    description:
      'Confidential and anonymous resource to find substance use treatment facilities and programs.',
    url: 'https://findtreatment.gov/',
    category: 'treatment',
  },
];
