  // import React from 'react';
  // import { motion } from 'framer-motion';

  // const HomePage = () => {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
  //       {/* Main Content */}
  //       <div className="flex items-center justify-center h-screen px-4">
  //         <motion.div
  //           initial={{ opacity: 0, y: 40 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ duration: 0.8 }}
  //           className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center"
  //         >
  //           <h2 className="text-4xl font-bold text-gray-800 mb-4">
  //             Welcome to Your Stock Assistant
  //           </h2>
  //           <p className="text-gray-600">
  //             Track, analyze and discover top market picks. Your smart stock research platform.
  //           </p>
  //         </motion.div>
  //       </div>
  //     </div>
  //   );
  // };

  // export default HomePage;

  // 


  // actually working 
  
  // import React, { useState, useEffect } from 'react';
  // import { motion } from 'framer-motion';
  // import ChatBot from 'react-chatbot-kit';
  // import 'react-chatbot-kit/build/main.css'; // Chatbot styles
  
  // // Import the chatbot configuration
  // import { config, MessageParser, ActionProvider } from './chatbotconfig';
  
  // const HomePage = ({ isLoggedIn, onLogout }) => {
  //   const [showChatBot, setShowChatBot] = useState(false);
  
  //   // Effect to show the chatbot after login
  //   useEffect(() => {
  //     if (isLoggedIn) {
  //       setShowChatBot(true);
  //     } else {
  //       setShowChatBot(false);
  //     }
  //   }, [isLoggedIn]);
  
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
  //       {/* Main Content */}
  //       <div className="flex items-center justify-center h-screen px-4">
  //         <motion.div
  //           initial={{ opacity: 0, y: 40 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ duration: 0.8 }}
  //           className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center"
  //         >
  //           <h2 className="text-4xl font-bold text-gray-800 mb-4">
  //             Welcome to Your Stock Assistant
  //           </h2>
  //           <p className="text-gray-600">
  //             Track, analyze and discover top market picks. Your smart stock research platform.
  //           </p>
  //         </motion.div>
  //       </div>
  
  //       {/* Logout button
  //       {isLoggedIn && (
  //         <button
  //           onClick={onLogout}
  //           className="absolute bottom-10 left-10 bg-red-500 text-white p-3 rounded-full"
  //         >
  //           Logout
  //         </button>
  //       )} */}
  
  //       {/* Show the chatbot after login */}
  //       {showChatBot && (
  //         <div className="absolute bottom-10 right-10">
  //           <ChatBot
  //             config={config}
  //             messageParser={MessageParser}
  //             actionProvider={ActionProvider}
  //           />
  //         </div>
  //       )}
  //     </div>
  //   );
  // };
  
  // export default HomePage;\



  import React, { useState, useEffect } from 'react';
  import { motion } from 'framer-motion';
  import Chatbot from './chatbotconfig'; // Your custom chatbot component
  
  const HomePage = ({ isLoggedIn }) => {
    const [showChatBot, setShowChatBot] = useState(false);
  
    useEffect(() => {
      if (isLoggedIn) {
        setShowChatBot(true);
      } else {
        setShowChatBot(false);
      }
    }, [isLoggedIn]);
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
        {/* Main Content */}
        <div className="flex items-center justify-center h-screen px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to Your Stock Assistant
            </h2>
            <p className="text-gray-600">
              Track, analyze and discover top market picks. Your smart stock research platform.
            </p>
          </motion.div>
        </div>
  
        {/* Show the chatbot after login */}
        {showChatBot && (
          <div className="absolute bottom-10 right-10 w-[350px] max-h-[500px] overflow-auto">
            <Chatbot />
          </div>
        )}
      </div>
    );
  };
  
  export default HomePage;
  
  