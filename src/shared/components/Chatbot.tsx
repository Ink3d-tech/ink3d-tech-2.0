"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import io from "socket.io-client";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { MessageSquareMoreIcon, X } from "lucide-react";

const SOCKET_URL = process.env.NEXT_PUBLIC_API;
const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
});

export default function Chatbot() {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatSize, setChatSize] = useState({ width: 320, height: 400 });
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Inicializamos sin `window`
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    // Solo se ejecuta en el cliente después del primer renderizado
    if (typeof window !== "undefined") {
      setPosition({
        x: window.innerWidth - 340,
        y: window.innerHeight - 460,
      });
    }
  }, []); // Se ejecuta solo una vez, cuando el componente se monta en el cliente

  useEffect(() => {
    const handleBotResponse = (data: { text: string }) => {
      setMessages((prev) => {
        if (prev[prev.length - 1]?.text !== data.text) {
          return [...prev, { text: data.text, sender: "bot" }];
        }
        return prev;
      });
    };

    socket.on("bot-response", handleBotResponse);

    return () => {
      socket.off("bot-response", handleBotResponse);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: "user" };
      setMessages((prev) => [...prev, newMessage]);

      socket.emit("message", {
        userMessage: input,
        conversationHistory: messages,
      });

      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const startDrag = useCallback(() => {
    setDragging(true);
  }, []);

  const onDrag = useCallback(
    (e: MouseEvent) => {
      if (dragging) {
        setPosition({
          x: Math.min(window.innerWidth - chatSize.width, Math.max(0, e.clientX - chatSize.width / 2)),
          y: Math.min(window.innerHeight - chatSize.height, Math.max(0, e.clientY - 30)),
        });
      }
    },
    [dragging, chatSize]
  );

  const stopDrag = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setPosition({
        x: window.innerWidth - chatSize.width - 20,
        y: window.innerHeight - chatSize.height - 80,
      });
    }
  }, [isOpen, chatSize]);

  useEffect(() => {
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDrag);
    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDrag);
    };
  }, [onDrag, stopDrag]);

  return (
    <div className="fixed bottom-5 right-5 z-[99999]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
      >
        <MessageSquareMoreIcon size={24} className="hidden sm:block" />
        <MessageSquareMoreIcon size={15} className="sm:hidden" />
      </button>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          <ResizableBox
            width={chatSize.width}
            height={chatSize.height}
            minConstraints={[250, 300]}
            maxConstraints={[500, 600]}
            onResizeStop={(e, data) => setChatSize({ width: data.size.width, height: data.size.height })}
          >
            <div
              className="bg-white shadow-xl rounded-lg p-4 flex flex-col cursor-move"
              style={{ width: "100%", height: "100%" }}
              onMouseDown={startDrag}
            >
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-lg font-semibold">Chatbot INK3D</h2>
                <button onClick={() => setIsOpen(false)} className="text-red-500">
                  <X />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-2">
                {messages.map((msg, index) => (
                  <div key={index} className={`p-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                    <span className={`inline-block p-2 rounded-md ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
                      {msg.text}
                    </span>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex mt-2">
                <input
                  className="flex-1 p-2 border rounded-md"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="¿Cómo puedo ayudarte?"
                />
                <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-md">
                  ➤
                </button>
              </div>
            </div>
          </ResizableBox>
        </div>
      )}
    </div>
  );
}