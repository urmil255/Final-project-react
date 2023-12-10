import React from "react";
import { auth } from './firebase';
function Header() {
  const handleLogout = () => {
    auth.signOut(); // Sign out the current user
  };
  return (
    <header>
      <h1>Note Keeper</h1>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}

export default Header;
