// frontend/components/Navbar.tsx
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token); // Set logged in state based on token presence
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/products">View Products</Link>
        </li>
        <li>
          <Link href="/cart">View Cart</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <button className='Logout' onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
            <li>
              <Link href="/auth/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;