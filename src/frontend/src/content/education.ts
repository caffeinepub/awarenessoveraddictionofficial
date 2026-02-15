export interface EducationSection {
  slug: string;
  title: string;
  navLabel: string;
  content: {
    introduction: string;
    sections: {
      heading: string;
      content: string;
      bullets?: string[];
    }[];
  };
}

export const educationSections: EducationSection[] = [
  {
    slug: 'what-addiction-is',
    title: 'What Addiction Is',
    navLabel: 'What Addiction Is',
    content: {
      introduction:
        'Addiction is a complex brain disorder characterized by compulsive substance use or behavior despite harmful consequences. It affects millions of people worldwide and is recognized as a medical condition that requires treatment and support.',
      sections: [
        {
          heading: 'Understanding Addiction as a Disease',
          content:
            'Addiction is not a moral failing or a lack of willpower. It is a chronic disease that changes the brain\'s structure and function, affecting decision-making, judgment, learning, memory, and behavior control.',
          bullets: [
            'Changes brain chemistry and neural pathways',
            'Affects the reward, motivation, and memory circuits',
            'Creates powerful cravings and compulsive behaviors',
            'Can be treated effectively with proper care',
          ],
        },
        {
          heading: 'Types of Addiction',
          content:
            'Addiction can involve substances like alcohol, prescription medications, or illegal drugs. It can also involve behaviors such as gambling, gaming, or shopping. All forms of addiction share common characteristics of compulsion and loss of control.',
        },
        {
          heading: 'The Cycle of Addiction',
          content:
            'Addiction typically follows a cycle: initial use, regular use, risky use or abuse, dependence, and addiction. Understanding this progression helps in recognizing warning signs and seeking help early.',
        },
      ],
    },
  },
  {
    slug: 'signs-risk-factors',
    title: 'Signs & Risk Factors',
    navLabel: 'Signs & Risk Factors',
    content: {
      introduction:
        'Recognizing the signs of addiction early can make a significant difference in outcomes. While addiction can affect anyone, certain risk factors may increase vulnerability.',
      sections: [
        {
          heading: 'Common Warning Signs',
          content:
            'Addiction manifests through behavioral, physical, and psychological changes. Being aware of these signs can help identify when someone needs support.',
          bullets: [
            'Neglecting responsibilities at work, school, or home',
            'Changes in appearance or personal hygiene',
            'Withdrawal from family and friends',
            'Secretive behavior or lying about activities',
            'Financial problems or unexplained need for money',
            'Mood swings, irritability, or personality changes',
            'Loss of interest in previously enjoyed activities',
            'Continued use despite negative consequences',
          ],
        },
        {
          heading: 'Physical Signs',
          content:
            'Physical symptoms vary depending on the substance or behavior, but may include changes in sleep patterns, appetite, weight, energy levels, or appearance of physical health problems.',
        },
        {
          heading: 'Risk Factors',
          content:
            'Multiple factors can increase the likelihood of developing an addiction, though having risk factors does not guarantee addiction will occur.',
          bullets: [
            'Family history of addiction',
            'Early exposure to substance use',
            'Mental health conditions like depression or anxiety',
            'Trauma or adverse childhood experiences',
            'Peer pressure or social environment',
            'Lack of family involvement or support',
            'High stress levels without healthy coping mechanisms',
          ],
        },
      ],
    },
  },
  {
    slug: 'recovery-basics',
    title: 'Recovery Basics',
    navLabel: 'Recovery Basics',
    content: {
      introduction:
        'Recovery from addiction is a journey that looks different for everyone. While challenging, recovery is absolutely possible with the right support, treatment, and commitment to change.',
      sections: [
        {
          heading: 'What Recovery Looks Like',
          content:
            'Recovery is not just about stopping substance use—it\'s about building a fulfilling life in which addiction no longer has a place. It involves healing physically, mentally, emotionally, and often spiritually.',
          bullets: [
            'Abstinence from addictive substances or behaviors',
            'Developing healthy coping mechanisms',
            'Rebuilding relationships and trust',
            'Addressing underlying mental health issues',
            'Creating a supportive environment',
            'Finding purpose and meaning in life',
          ],
        },
        {
          heading: 'Treatment Options',
          content:
            'Effective treatment is tailored to individual needs and may include a combination of approaches.',
          bullets: [
            'Detoxification programs for safe withdrawal',
            'Inpatient or residential treatment programs',
            'Outpatient counseling and therapy',
            'Medication-assisted treatment (MAT)',
            'Support groups like AA, NA, or SMART Recovery',
            'Cognitive-behavioral therapy (CBT)',
            'Family therapy and education',
          ],
        },
        {
          heading: 'The Recovery Process',
          content:
            'Recovery is often described as a lifelong process rather than a destination. It involves stages of change, setbacks, and growth. Most people benefit from ongoing support even after initial treatment.',
        },
        {
          heading: 'Building a Support Network',
          content:
            'A strong support system is crucial for sustained recovery. This may include family, friends, sponsors, therapists, support groups, and others who understand the recovery journey.',
        },
      ],
    },
  },
  {
    slug: 'how-to-support-someone',
    title: 'How to Support Someone',
    navLabel: 'How to Support Someone',
    content: {
      introduction:
        'Supporting a loved one struggling with addiction can be challenging and emotionally draining. Your support can make a meaningful difference, but it\'s important to approach the situation with compassion, boundaries, and realistic expectations.',
      sections: [
        {
          heading: 'Educate Yourself',
          content:
            'Understanding addiction as a disease helps you approach your loved one with empathy rather than judgment. Learn about the specific substance or behavior they\'re struggling with and available treatment options.',
        },
        {
          heading: 'Communicate with Compassion',
          content:
            'Choose a calm moment to express your concerns using "I" statements. Focus on specific behaviors you\'ve observed and how they affect you, rather than labeling or blaming.',
          bullets: [
            'Express concern without judgment',
            'Listen actively without interrupting',
            'Avoid enabling behaviors',
            'Be honest about the impact on you and others',
            'Offer specific help, like researching treatment options',
          ],
        },
        {
          heading: 'Set Healthy Boundaries',
          content:
            'Boundaries protect your own well-being while still showing love and support. It\'s okay to say no to requests that enable addiction or compromise your own health.',
          bullets: [
            'Don\'t cover up or make excuses for their behavior',
            'Don\'t provide money that may be used for substances',
            'Don\'t take on their responsibilities',
            'Protect yourself and other family members from harm',
            'Follow through on consequences you\'ve set',
          ],
        },
        {
          heading: 'Encourage Professional Help',
          content:
            'While your support is valuable, professional treatment is often necessary. Encourage your loved one to seek help from doctors, therapists, or treatment programs. Offer to help them find resources or accompany them to appointments.',
        },
        {
          heading: 'Take Care of Yourself',
          content:
            'Supporting someone with addiction can be exhausting. You cannot pour from an empty cup. Seek support for yourself through therapy, support groups like Al-Anon or Nar-Anon, or trusted friends and family.',
        },
      ],
    },
  },
  {
    slug: 'relapse-next-steps',
    title: 'Relapse & What to Do Next',
    navLabel: 'Relapse & Next Steps',
    content: {
      introduction:
        'Relapse is a return to substance use or addictive behavior after a period of abstinence. While discouraging, relapse is common in recovery and does not mean failure. It\'s an opportunity to learn, adjust the treatment plan, and recommit to recovery.',
      sections: [
        {
          heading: 'Understanding Relapse',
          content:
            'Relapse is often part of the recovery process. Studies show that 40-60% of people in recovery experience relapse at some point, similar to relapse rates for other chronic diseases like diabetes or hypertension.',
          bullets: [
            'Relapse doesn\'t erase progress made',
            'It\'s a sign that treatment needs adjustment',
            'Early intervention can prevent full relapse',
            'Many people achieve long-term recovery after relapse',
          ],
        },
        {
          heading: 'Warning Signs of Relapse',
          content:
            'Relapse often begins before actual substance use, with emotional and mental changes. Recognizing these early warning signs allows for intervention.',
          bullets: [
            'Romanticizing past substance use',
            'Isolating from support network',
            'Stopping treatment or support group attendance',
            'Increased stress without healthy coping',
            'Dishonesty or secretive behavior',
            'Overconfidence about recovery',
          ],
        },
        {
          heading: 'Immediate Steps After Relapse',
          content:
            'If relapse occurs, taking quick action can minimize its impact and prevent a full return to addiction.',
          bullets: [
            'Reach out to your support network immediately',
            'Contact your therapist, counselor, or sponsor',
            'Be honest about what happened',
            'Avoid self-blame and shame',
            'Identify triggers that led to relapse',
            'Consider returning to treatment or increasing support',
            'Remove access to substances if possible',
          ],
        },
        {
          heading: 'Learning from Relapse',
          content:
            'Each relapse provides valuable information about vulnerabilities and gaps in the recovery plan. Work with treatment professionals to identify what led to relapse and develop strategies to address those factors.',
        },
        {
          heading: 'Moving Forward',
          content:
            'Recovery is a journey with ups and downs. Relapse doesn\'t define you or your recovery. With renewed commitment, adjusted strategies, and continued support, long-term recovery remains achievable.',
        },
      ],
    },
  },
];
