"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Find Movie", href: "/findmovie" },
  { label: "Find Show", href: "/findshow" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-16 border-b border-white/6 transition-all duration-300 ${
        scrolled ? "bg-[#0c0c0f]/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 group">
        <span
          className="font-black tracking-widest text-xl text-white leading-none"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Cine<span className="text-red-500">Shelf</span>
        </span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden sm:flex items-center gap-1">
        {NAV_LINKS.map(({ label, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`text-xs font-medium tracking-wide px-3.5 py-1.5 rounded-md border transition-all duration-200 ${
                active
                  ? "text-red-200 border-red-500/30 bg-red-500/10"
                  : "text-white border-transparent hover:text-white hover:border-white/10 hover:bg-white/5"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile hamburger */}
      <button
        className="sm:hidden flex flex-col gap-1.25 p-1 relative z-50"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-5 h-px bg-white transition-all duration-200 ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`}
        />
        <span
          className={`block w-5 h-px bg-white transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block w-5 h-px bg-white transition-all duration-200 ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
        />
      </button>

      {/* Mobile menu */}
      <div
        className={`sm:hidden absolute top-16 left-0 right-0 bg-[#0c0c0f]/95 backdrop-blur-md border-b border-white/6 px-6 py-5 flex flex-col gap-3 transition-all duration-200 ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {NAV_LINKS.map(({ label, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium py-2 border-b border-white/6 transition-colors ${
                active ? "text-red-400" : "text-white/50 hover:text-white"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </header>
  );
};

export default Header;
