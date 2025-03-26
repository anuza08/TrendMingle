import React, { useState } from "react";
import axios from "axios";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

function Chatbot() {
  const userId = localStorage.getItem("id");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message immediately
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setIsTyping(true); // Show typing indicator

    try {
      const response = await axios.post("http://localhost:8080/api/chat", {
        message: input,
        userId,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: response.data.message,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I encountered an error.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition-all duration-300 animate-bounce"
        >
          <FaRobot className="text-2xl" />
        </button>
      )}

      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col border border-gray-200 overflow-hidden">
          <div className="bg-red-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold text-lg">Chat Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-16">
                How can I help you today?
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`mb-3 max-w-xs p-3 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-red-500 text-white ml-auto rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                {isTyping && (
                  <div className="mb-3 max-w-xs p-3 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none w-20">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={isTyping}
              />
              <button
                onClick={sendMessage}
                disabled={isTyping}
                className={`flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-r-lg transition-colors ${
                  isTyping
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-red-700"
                }`}
              >
                {isTyping ? (
                  <ImSpinner8 className="animate-spin" />
                ) : (
                  <FaPaperPlane />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
