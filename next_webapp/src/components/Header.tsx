"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n-navigation";
import LanguageDropdown from "./LanguageDropdown";
import { HiMenu, HiX } from "react-icons/hi";

// 1) Import FontAwesomeIcon + icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const t = useTranslations("common");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 2) State for dark mode
  const [darkMode, setDarkMode] = useState(false);

  // 3) Whenever darkMode changes, add/remove .dark class to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 4) Toggle darkMode on button click
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Nav items
  const navItems = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Use Cases", link: "/UseCases" },
    { name: "Statistics", link: "/statistics" },
    { name: "Upload", link: "/upload" },
  ];

  return (
    <header className="bg-white shadow-sm dark:bg-gray-900 dark:text-white">
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <img
                className="h-20 w-auto"
                src="/img/new-logo-green.png"
                alt="Logo"
              />
            </Link>

            {/* Hamburger Icon (for mobile) */}
            <div className="flex lg:hidden ml-auto">
              <button
                onClick={toggleMenu}
                className="text-green-600 hover:text-green-900 dark:text-green-300 dark:hover:text-green-100 focus:outline-none"
              >
                {isMenuOpen ? (
                  <HiX className="h-6 w-6" />
                ) : (
                  <HiMenu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Desktop Menu */}
            <nav
              className={`ml-10 space-x-4 hidden lg:flex ${
                isMenuOpen ? "block" : "hidden"
              } lg:block`}
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  className="text-green-600 hover:text-green-900 dark:text-green-300 dark:hover:text-green-100 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {t(item.name)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side (Language dropdown, signup/login, dark mode toggle) */}
          <div className="flex items-center justify-between">
            <LanguageDropdown />
            <div className="hidden lg:flex gap-2">
              <Link
                href="/signup"
                className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium dark:bg-green-800 dark:hover:bg-green-600 dark:hover:text-gray-900"
              >
                {t("Sign Up")}
              </Link>
              <Link
                href="/login"
                className="bg-white text-green-600 hover:bg-green-700 hover:text-white border border-green-600 px-4 py-2 rounded-md text-sm font-medium dark:bg-gray-900 dark:hover:bg-green-600 dark:hover:text-gray-900"
              >
                {t("Log In")}
              </Link>
            </div>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="px-4 focus:outline-none hover:text-green-700 dark:hover:text-green-100"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <FontAwesomeIcon
                  icon={faSun}
                  size="lg"
                  className="text-yellow-400 dark:hover:text-yellow-600"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faMoon}
                  size="lg"
                  className="text-blue-800 hover:text-blue-400"
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Items */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <nav className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link key={item.name} href={item.link}>
                  {t(item.name)}
                </Link>
              ))}
              {/* Sign Up and Log In on mobile menu */}
              <Link
                href="/signup"
                className="block text-green-600 hover:text-green-900 dark:text-green-300 dark:hover:text-green-100 px-3 py-2 rounded-md text-base font-medium"
              >
                {t("Sign Up")}
              </Link>
              <Link
                href="/login"
                className="block text-green-600 hover:text-green-900 dark:text-green-300 dark:hover:text-green-100 px-3 py-2 rounded-md text-base font-medium"
              >
                {t("Log In")}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
