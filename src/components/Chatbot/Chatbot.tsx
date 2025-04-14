import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
const recommendations: { [key: string]: string } = {
  chocolate: "We recommend our Chocolate Mocha!",
  vanilla: "Try our Vanilla Latte!",
  caramel: "How about a Caramel Macchiato?",
  hazelnut: "You might enjoy our Hazelnut Brew!",
  default: "We recommend trying our special coffee blend!"
};

export function Chatbot() {
  const [flavor, setFlavor] = useState('');
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [isOpen, setIsOpen] = useState(false); // State to toggle chat visibility

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lowerCaseFlavor = flavor.toLowerCase();
    const response = recommendations[lowerCaseFlavor] || recommendations.default;

    setMessages([...messages, { sender: 'User  ', text: flavor }, { sender: 'AI', text: response }]);
    setFlavor('');
  };

  // Close the chatbot when clicking outside of it
  const chatbotRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50"> {/* Fixed position on the bottom right */}
      {isOpen ? (
        <div ref={chatbotRef} className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg w-[440px] h-[634px]">
          <div className="flex flex-col space-y-1.5 pb-6">
            <h2 className="font-semibold text-lg tracking-tight">	Green Chatbot</h2>
            <p className="text-sm text-gray-600 leading-3">Powered by Green</p>
          </div>

          <div className="pr-4 h-[474px] overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-3 my-4 text-gray-600 text-sm ${msg.sender === 'Green' ? 'flex-1' : ''}`}>
                <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                  <div className="rounded-full bg-gray-100 border p-1">
                       <Image
                              src="/Logo/Logo.png" // Path to your logo image
                              alt="Company Logo" // Alt text for accessibility
                              width={20} // Adjusted width
                              height={20} // Adjusted height
                              className="object-contain" // Optional: to maintain aspect ratio
                            />
                    
                  </div>
                </span>
                <div className={`bg-${msg.sender === 'User   ' ? 'blue' : 'green'}-100 p-2 rounded-lg`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex mt-4">
            <input
              type="text"
              value={flavor}
              onChange={(e) => setFlavor(e.target.value)}
              className="border border-amber-900 rounded-lg p-2 flex-1"
              placeholder="Type your flavor..."
            />
            <button type="submit" className="bg-amber-900 text-white rounded-lg px-4 ml-2">Send</button>
          </form>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="bg-amber-900 text-white rounded-full p-5 shadow-lg">
          Open Chat
        </button>
      )}
    </div>
  );
}