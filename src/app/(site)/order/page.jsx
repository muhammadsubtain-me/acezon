import OrderClient from './OrderClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Hire Academic Expert & Get Free Quote',
  description:
    'Submit your homework, tutoring, or technical writing requirements. Get matched with a verified subject matter expert and receive a free quote in under 15 minutes.',
};

export default function OrderPage() {
  return <OrderClient />;
}
