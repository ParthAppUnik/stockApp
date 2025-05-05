// import React, { useState } from 'react';
// import axios from 'axios';
// import { FaPaperPlane } from 'react-icons/fa'; // For better Send icon

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState('');

//   const sendMessage = async (input) => {
//     setMessages((prev) => [...prev, { sender: 'user', text: input }]);
//     try {
//       const response = await axios.post('http://localhost:8000/api/recommendations/', {
//         message: input,
//       });
//       setMessages((prev) => [...prev, { sender: 'bot', text: response.data.response }]);
//     } catch (error) {
//       console.error("Error sending message to backend", error);
//     }
//   };

//   const handleInputChange = (e) => setUserInput(e.target.value);
//   const handleSend = () => {
//     if (userInput.trim()) {
//       sendMessage(userInput);
//       setUserInput('');
//     }
//   };

//   return (
//     <div className="chatbot fixed bottom-5 right-5 w-[350px] max-h-[600px] bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden border border-gray-300">
      
//       <div className="chat-window flex-1 p-4 overflow-y-auto bg-gray-50">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//           >
//             <div
//               className={`px-4 py-2 rounded-2xl max-w-xs ${
//                 msg.sender === 'user'
//                   ? 'bg-blue-500 text-white rounded-br-none'
//                   : 'bg-gray-200 text-gray-800 rounded-bl-none'
//               }`}
//             >
//               {msg.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="input-container flex items-center border-t border-gray-300 p-2 bg-white">
//         <input
//           type="text"
//           className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           value={userInput}
//           onChange={handleInputChange}
//           placeholder="Ask about stocks..."
//           onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//         />
//         <button
//           onClick={handleSend}
//           className="ml-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition"
//         >
//           <FaPaperPlane />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;









    import React, { useState } from 'react';
    import axios from 'axios';
    import { FaPaperPlane } from 'react-icons/fa'; // For better Send icon

    const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');

    const sendMessage = async (input) => {
        setMessages((prev) => [...prev, { sender: 'user', text: input }]);
        try {
        // Send the message to the backend API
        const response = await axios.post('http://localhost:8000/api/recommendations/', {
            message: input,
        });
        console.log(response.data); // Log the response for debugging
        // Assuming the backend sends a response with a 'response' field (check backend response structure)
        const botMessage = response.data.response;

        // Check if the backend response is an object with keys like top_5_to_buy or top_5_to_sell
        if (botMessage && typeof botMessage === 'object') {
            const top5Buy = botMessage.top_5_to_buy?.join(', ') || 'No stocks to buy.';
            const top5Sell = botMessage.top_5_to_sell?.join(', ') || 'No stocks to sell.';
            
            setMessages((prev) => [
            ...prev,
            { sender: 'bot', text: `Top 5 to Buy: ${top5Buy}\nTop 5 to Sell: ${top5Sell}` },
            ]);
        } else {
            // If it's a normal text response
            setMessages((prev) => [...prev, { sender: 'bot', text: botMessage }]);
        }
        } catch (error) {
        console.error("Error sending message to backend", error);
        }
    };

    const handleInputChange = (e) => setUserInput(e.target.value);
    const handleSend = () => {
        if (userInput.trim()) {
        sendMessage(userInput);
        setUserInput('');
        }
    };

    return (
        <div className="chatbot fixed bottom-5 right-5 w-[350px] max-h-[600px] bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden border border-gray-300">
        
        <div className="chat-window flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, idx) => (
            <div
                key={idx}
                className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
                <div
                className={`px-4 py-2 rounded-2xl max-w-xs ${
                    msg.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
                >
                {msg.text}
                </div>
            </div>
            ))}
        </div>

        <div className="input-container flex items-center border-t border-gray-300 p-2 bg-white">
            <input
            type="text"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Ask about stocks..."
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
            onClick={handleSend}
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition"
            >
            <FaPaperPlane />
            </button>
        </div>
        </div>
    );
    };

    export default Chatbot;
