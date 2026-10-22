import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__brand">
          <span className="footer__logo">🧪</span>
          <span className="footer__name">Methyl Orange</span>
          <span className="footer__tagline">MERN Stack Template</span>
        </div>
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} Methyl Orange. Built for scalable & modular development.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
