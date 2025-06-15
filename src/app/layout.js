import "bootstrap/dist/css/bootstrap.min.css";
import SessionWrapper from "./components/SessionWrapper";
import { FaUsersCog } from "react-icons/fa";

export const metadata = {
  title: "Smart User Dashboard",
  description: "Effortlessly manage users with secure Google authentication and full CRUD access.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="bg-light text-dark d-flex flex-column min-vh-100">

        {/* Navbar */}
        <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm py-3">
          <div className="container">
            <a className="navbar-brand d-flex align-items-center gap-2 fw-semibold text-primary" href="/">
              <FaUsersCog size={22} className="text-primary" />
              <span>User Management Panel</span>
            </a>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow-1 py-4">
          <SessionWrapper>{children}</SessionWrapper>
        </main>

        {/* Footer */}
        <footer className="bg-white border-top text-muted py-3 text-center small mt-auto shadow-sm">
          <div className="container">
            <p className="mb-0">🚀 Built with Next.js & Google Auth — © {new Date().getFullYear()} SmartHub</p>
          </div>
        </footer>

      </body>
    </html>
  );
}
