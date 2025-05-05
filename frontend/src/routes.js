// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Link, useNavigate } from 'react-router-dom';
// import LoginPage from './screens/LoginPage';
// import SignupPage from './screens/SignupPage';
// import HomePage from './components/HomePage';

// function AppRoutes() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
//     setIsLoggedIn(loggedIn);
//   }, []);

//   const handleLogin = () => {
//     localStorage.setItem('isLoggedIn', 'true');
//     setIsLoggedIn(true);
//     navigate('/');
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('isLoggedIn');
//     setIsLoggedIn(false);
//     navigate('/'); // Redirect to home after logout
//   };

//   return (
//     <div>
//       {/* Top Navigation Bar */}
//       <nav style={{ padding: '10px', background: '#fff', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
//         {!isLoggedIn && (
//           <>
//             <Link to="/login">
//               <button style={{ backgroundColor: 'blue', color: 'white', padding: '8px 12px', borderRadius: '8px' }}>
//                 Log In
//               </button>
//             </Link>
//             <Link to="/signup">
//               <button style={{ backgroundColor: 'green', color: 'white', padding: '8px 12px', borderRadius: '8px' }}>
//                 Sign Up
//               </button>
//             </Link>
//           </>
//         )}
//         {isLoggedIn && (
//           <button
//             onClick={handleLogout}
//             style={{ backgroundColor: 'red', color: 'white', padding: '8px 12px', borderRadius: '8px' }}
//           >
//             Logout
//           </button>
//         )}
//       </nav>

//       {/* Page Routes */}
//       <Routes>
//         <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
//         <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
//         <Route path="/signup" element={<SignupPage />} />
//       </Routes>
//     </div>
//   );
// }

// export default AppRoutes;

import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import LoginPage from './screens/LoginPage';
import SignupPage from './screens/SignupPage';
import HomePage from './components/HomePage';

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check login status on load
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true'); // Store login state
    setIsLoggedIn(true);
    navigate('/'); // Redirect to home page
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login state
    setIsLoggedIn(false);
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav style={{ padding: '10px', background: '#fff', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        {!isLoggedIn && (
          <>
            <Link to="/login">
              <button style={{ backgroundColor: 'blue', color: 'white', padding: '8px 12px', borderRadius: '8px' }}>
                Log In
              </button>
            </Link>
            <Link to="/signup">
              <button style={{ backgroundColor: 'green', color: 'white', padding: '8px 12px', borderRadius: '8px' }}>
                Sign Up
              </button>
            </Link>
          </>
        )}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            style={{ backgroundColor: 'red', color: 'white', padding: '8px 12px', borderRadius: '8px' }}
          >
            Logout
          </button>
        )}
      </nav>

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
