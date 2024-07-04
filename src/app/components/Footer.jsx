const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="fixed bottom-0 w-full py-4 bg-gray-100 text-gray-600 text-center">
        <p className="font-semibold text-sm">
          &copy; {currentYear}. Proyecto desarrollado por{" "}
          <a
            href="https://jcaicedodev.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600 hover:text-blue-800"
          >
            José Caicedo
          </a>.
        </p>
      </footer>
    );
  };
  
  export default Footer;
  