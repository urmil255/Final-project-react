function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-wave">
      <div className="footer-content">
        <p>Copyright ⓒ {year}</p>
        <div className="footer-line"></div>
        <p className="floating-text">Final Project By Urmil Trivedi</p>
      </div>
    </footer>
  );
}

export default Footer;
