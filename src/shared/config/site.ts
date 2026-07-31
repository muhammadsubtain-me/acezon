export interface SiteInfo {
  name: string;
  url: string;
  tagline: string;
  address: string;
  supportEmail: string;
  supportPhones: string[];
  whatsappNumber: string;
  copyright: string;
}

export interface PaymentMethod {
  name: string;
}

export const siteInfo: SiteInfo = {
  name: 'Acezon',
  url: 'https://www.acezon.app',
  tagline:
    'Expert academic assistance to help students achieve the grades they deserve. Available 24/7.',
  address: 'Islamabad, Pakistan',
  supportEmail: 'help@acezon.app',
  supportPhones: ['+92 310 7459732', '+92 304 2335382'],
  whatsappNumber: '923042335382',
  copyright: '© 2026 Acezon. All Rights Reserved.',
};

export const paymentMethods: PaymentMethod[] = [
  { name: 'Wise' },
  { name: 'PayPal' },
  { name: 'Remitly' },
  { name: 'ADIB' },
  { name: 'Al Rajhi Bank' },
];
