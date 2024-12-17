import React from "react";

const Footer = () => {
  return (
    <footer style={{ textAlign: "center", padding: "1rem 0" }}>
      <p>&copy; {new Date().getFullYear()} Bounty Board Project</p>
    </footer>
  );
};

export default Footer;
