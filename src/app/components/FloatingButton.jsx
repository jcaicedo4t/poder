// ./components/FloatingButton.js
"use client"
import { useState, useEffect } from "react";

export default function FloatingButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const color = isDarkMode ? "black" : "white";

    root.style.setProperty("background-color", color, "important"); 
    
    


    body.style.setProperty("background-color", color, "important");

    console.log(root.style.backgroundColor);
    console.log(body.style.backgroundColor);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    console.log("Toggle Dark Mode");
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <>
      <button
        type="button"
        className="fixed bottom-5 right-5 hs-dark-mode-active:hidden block hs-dark-mode group flex items-center text-gray-600 hover:text-blue-600 font-medium dark:text-neutral-400 dark:hover:text-neutral-500"
        data-hs-theme-click-value="dark"
        onClick={toggleDarkMode}
      >
        <svg
          className="flex-shrink-0 size-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      </button>
      <button
        type="button"
        className="fixed bottom-5 right-5 hs-dark-mode-active:block hidden hs-dark-mode group flex items-center text-gray-600 hover:text-blue-600 font-medium dark:text-neutral-400 dark:hover:text-neutral-500"
        data-hs-theme-click-value="light"
        onClick={toggleDarkMode}
      >
        <svg
          className="flex-shrink-0 size-5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      </button>
    </>
  );
}
