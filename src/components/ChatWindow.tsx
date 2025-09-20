import { useState } from "react";

type Message = {
  sender: "me" | "them";
  text: string;
};

interface ChatWindowProps {
  user: {
    id: number;
    name: string;
    pfp: string;
    details: string;
  };
  onClose: () => void;
}

export default function ChatWindow({ user, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { sender: "me", text }]);
  };

  return (
    <div className="fixed bottom-0 right-4 w-96 bg-gray-900 text-white rounded-t-xl shadow-xl flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-700 p-3">
        <img src={user.pfp} alt={user.name} className="w-10 h-10 rounded-full" />
        <div>
          <h3 className="font-bold">{user.name}</h3>
          <p className="text-xs text-gray-400">{user.details}</p>
        </div>
        <button className="ml-auto text-gray-400" onClick={onClose}>✖</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, i) => (
          <p
            key={i}
            className={`p-2 rounded-lg max-w-xs ${
              msg.sender === "me" ? "bg-blue-500 ml-auto" : "bg-gray-700"
            }`}
          >
            {msg.text}
          </p>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = (e.currentTarget.elements.namedItem("msg") as HTMLInputElement);
          handleSend(input.value);
          input.value = "";
        }}
        className="flex p-2 gap-2"
      >
        <input
          name="msg"
          placeholder="Type a message..."
          className="flex-1 bg-gray-700 rounded-lg px-3 py-2 text-white"
        />
        <button type="submit" className="bg-blue-600 px-4 py-2 rounded-lg">
          Send
        </button>
      </form>
    </div>
  );
}
