import { siteInfo } from '../config/site';

// Contact channels shown on the Contact page. Icons (emojis) are reused
// elsewhere too — e.g. the address pin in the footer.
export const contactMethods = [
  {
    id: 'email',
    icon: '📧',
    title: 'Email for Customers:',
    value: siteInfo.supportEmail,
  },
  {
    id: 'phone',
    icon: '📞',
    title: 'Call Support:',
    value: siteInfo.supportPhones.join(' | '),
  },
  {
    id: 'address',
    icon: '📍',
    title: 'Address:',
    value: `${siteInfo.address}.`,
  },
];
