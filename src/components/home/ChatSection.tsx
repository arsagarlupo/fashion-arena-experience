
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { ChatMessage } from "@/types/chat";
import { chatResponses } from "@/utils/chatResponses";

export function ChatSection() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      type: "bot",
      content: "👋 Hi! I'm here to help you learn how to use AIWear. What would you like to know?",
      options: [
        "How do I start a virtual try-on?",
        "How accurate are the size recommendations?",
        "Can I save my favorite outfits?",
        "How does the technology work?"
      ]
    }
  ]);

  const handleSendMessage = (text: string) => {
    const userMessage: ChatMessage = { type: "user", content: text };
    setChatHistory(prev => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse: ChatMessage = chatResponses[text] || {
        type: "bot",
        content: "I can help you with using AIWear's virtual try-on feature, size recommendations, saving outfits, and understanding our technology. What would you like to know?",
        options: Object.keys(chatResponses)
      };
      setChatHistory(prev => [...prev, botResponse]);
    }, 500);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-display font-bold mb-8 text-center">
          How to Use AIWear
        </h2>
        <div className="max-w-2xl mx-auto">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="h-[400px] overflow-y-auto mb-4 space-y-4">
                {chatHistory.map((msg, index) => (
                  <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`rounded-lg p-4 max-w-[80%] ${
                      msg.type === 'user' 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100'
                    }`}>
                      <p className="whitespace-pre-line">{msg.content}</p>
                      {msg.type === 'bot' && msg.options && (
                        <div className="mt-4 space-y-2">
                          {msg.options.map((option, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              className="w-full justify-start text-left"
                              onClick={() => handleSendMessage(option)}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Type your question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && message.trim()) {
                      handleSendMessage(message);
                      setMessage('');
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    if (message.trim()) {
                      handleSendMessage(message);
                      setMessage('');
                    }
                  }}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
