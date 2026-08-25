import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { SmoothScroll } from "./components/SmoothScroll";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { BookDemoPage } from "./pages/BookDemoPage";
import { Legal } from "./pages/Legal";
import { NotFoundPage } from "./pages/NotFoundPage";
import { scrollToSection } from "./lib/scrollToSection";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname === "/" && hash) {
      const targetId = decodeURIComponent(hash.slice(1));
      const frame = window.requestAnimationFrame(() => {
        scrollToSection(targetId);
      });

      return () => window.cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [hash, pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  const isHomePage = location.pathname === "/";
  const isBookDemoPage = location.pathname === "/book-demo" || location.pathname === "/demo";

  useEffect(() => {
    const previousBodyBackground = document.body.style.backgroundColor;
    const previousRootBackground = document.documentElement.style.backgroundColor;

    if (isBookDemoPage) {
      document.body.style.backgroundColor = "#12091f";
      document.documentElement.style.backgroundColor = "#12091f";
    } else {
      document.body.style.backgroundColor = "";
      document.documentElement.style.backgroundColor = "";
    }

    return () => {
      document.body.style.backgroundColor = previousBodyBackground;
      document.documentElement.style.backgroundColor = previousRootBackground;
    };
  }, [isBookDemoPage]);

  return (
    <div className={`flex min-h-screen flex-col text-foreground selection:bg-primary/20 ${isBookDemoPage ? "bg-[#12091f]" : "bg-background"}`}>
      <ScrollToTop />
      {!isAuthPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/book-demo" element={<BookDemoPage />} />
          <Route path="/demo" element={<BookDemoPage />} />
          <Route path="/privacy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
          <Route path="/cookies" element={<Legal />} />
          <Route path="/security" element={<Legal />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isAuthPage && !isHomePage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <SmoothScroll>
        <AppContent />
      </SmoothScroll>
    </Router>
  );
}

export default App;
