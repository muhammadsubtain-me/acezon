export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface StepItem {
  title: string;
  description: string;
  icon: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  role: string;
  university: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const services: ServiceItem[] = [
  {
    id: 'essay',
    title: 'Essay Writing',
    description:
      'Well-researched, original essays crafted by subject-matter experts — properly cited and plagiarism-free.',
    icon: 'PenTool',
  },
  {
    id: 'assignment',
    title: 'Assignments',
    description:
      'From case studies to lab reports, we handle every assignment type with precision and academic rigor.',
    icon: 'ClipboardList',
  },
  {
    id: 'proofread',
    title: 'Proofreading & Editing',
    description:
      'Polish your drafts to perfection — grammar, structure, tone, and clarity checked by professional editors.',
    icon: 'SpellCheck',
  },
  {
    id: 'other',
    title: 'Custom Assistance',
    description:
      'Dissertations, research proposals, presentations, or anything else — tell us what you need and we will handle it.',
    icon: 'Sparkles',
  },
];

export const steps: StepItem[] = [
  {
    title: 'Submit Your Request',
    description:
      'Share your assignment details, deadline, and any reference files through our quick order form.',
    icon: 'Send',
  },
  {
    title: 'We Get to Work',
    description:
      'An expert in your subject is assigned immediately. Track progress and chat with your assistant anytime.',
    icon: 'Cog',
  },
  {
    title: 'Receive & Review',
    description:
      'Get your completed work by the deadline. Request revisions for free until you are fully satisfied.',
    icon: 'CheckCircle2',
  },
];

export const features: FeatureItem[] = [
  {
    title: 'Available 24/7',
    description:
      'Round-the-clock support means your deadlines are always covered, no matter the time zone.',
    icon: 'Clock',
  },
  {
    title: 'Expert Writers',
    description:
      'Every order is handled by a qualified specialist with a degree in your field of study.',
    icon: 'GraduationCap',
  },
  {
    title: '100% Original',
    description:
      'All work is written from scratch and checked for plagiarism before it reaches you.',
    icon: 'ShieldCheck',
  },
  {
    title: 'On-Time Delivery',
    description:
      'We respect your deadlines. Missed deadlines are rare and always backed by our guarantee.',
    icon: 'Timer',
  },
  {
    title: 'Free Revisions',
    description:
      'Not happy with the first draft? Request unlimited revisions at no extra cost.',
    icon: 'RefreshCw',
  },
  {
    title: 'Confidential & Secure',
    description:
      'Your details stay private. We never share your information with third parties.',
    icon: 'Lock',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Aisha M.',
    role: 'Masters Student',
    university: 'University of Manchester',
    quote:
      'Acezon saved my semester. My dissertation was due in 48 hours and they delivered a polished, well-researched draft ahead of time. Communication over WhatsApp was instant.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/5905903/pexels-photo-5905903.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop',
  },
  {
    name: 'Daniel R.',
    role: 'Undergraduate',
    university: 'University of Toronto',
    quote:
      'The essay quality was outstanding and the referencing was spot on. I have used them four times now and every single order has exceeded my expectations.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop',
  },
  {
    name: 'Fatima K.',
    role: 'PhD Candidate',
    university: 'King Saud University',
    quote:
      'Their proofreading service transformed my research proposal. The editor caught issues I had missed for weeks. Highly professional and confidential.',
    rating: 5,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&fit=crop',
  },
];

export const faqs: FaqItem[] = [
  {
    question: 'Is the work you provide original and plagiarism-free?',
    answer:
      'Yes. Every assignment is written from scratch by a qualified expert and checked with plagiarism detection tools before delivery. You receive work that is 100% original and tailored to your instructions.',
  },
  {
    question: 'How fast can you complete my order?',
    answer:
      'Turnaround depends on the complexity and length, but we routinely handle urgent orders with deadlines as short as 6 hours. Submit your request with your deadline and we will confirm feasibility immediately.',
  },
  {
    question: 'How do I communicate with my assistant?',
    answer:
      'You can choose WhatsApp or email when submitting your order. Your assigned expert will reach out through your preferred channel to clarify requirements and share updates.',
  },
  {
    question: 'What if I am not satisfied with the work?',
    answer:
      'We offer free revisions until you are fully satisfied. After delivery, simply reply with your feedback and your assistant will make the requested changes at no extra cost.',
  },
  {
    question: 'Is my information kept confidential?',
    answer:
      'Absolutely. Your personal details and order information are never shared with third parties. All communication is private and your data is stored securely.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept Wise, PayPal, Remitly, ADIB, and Al Rajhi Bank transfers. Payment details are shared with you after your order is confirmed.',
  },
];
