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
  logo: string;
  imageClass?: string;
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
  { name: 'Wise', logo: '/images/payment/wise.png' },
  { name: 'PayPal', logo: '/images/payment/paypal.png' },
  { name: 'Remitly', logo: '/images/payment/remitly.png' },
  {
    name: 'ADIB',
    logo: '/images/payment/adib.png',
    imageClass: 'h-9 sm:h-10 md:h-11 w-[112px] sm:w-[124px] md:w-[136px]',
  },
  {
    name: 'Al Rajhi Bank',
    logo: '/images/payment/al-raji.png',
    imageClass: 'h-9 sm:h-10 md:h-11 w-[112px] sm:w-[124px] md:w-[136px]',
  },
];
