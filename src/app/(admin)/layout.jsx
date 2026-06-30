// The admin section renders without the public site chrome (Navbar/Footer/
// WhatsApp button). This bare layout keeps the admin tree isolated from the
// marketing layout in (site).
export default function AdminLayout({ children }) {
  return <>{children}</>;
}
