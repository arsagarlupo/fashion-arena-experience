import { Navbar } from "@/components/Navbar";
import { TermsModal } from "@/components/TermsModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Star, Sparkles, Clock, ShieldCheck, Send } from "lucide-react";
import { useState } from "react";

export default function Index() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      type: "bot",
      content: "👋 Hi! I'm here to help you learn how to use Drobe. What would you like to know?",
      options: [
        "How do I start a virtual try-on?",
        "How accurate are the size recommendations?",
        "Can I save my favorite outfits?",
        "How does the technology work?"
      ]
    }
  ]);

  const handleSendMessage = (text: string) => {
    setChatHistory(prev => [...prev, { type: "user", content: text }]);

    const responses: { [key: string]: { content: string; options?: string[] } } = {
      "How do I start a virtual try-on?": {
        content: "Starting a virtual try-on is easy! Just follow these steps:\n1. Click the 'Try Now' button\n2. Upload a photo or use our virtual avatar\n3. Select the clothing items you want to try\n4. See how they look on you instantly!",
        options: ["How accurate are the size recommendations?", "Can I save my looks?"]
      },
      "How accurate are the size recommendations?": {
        content: "Our AI-powered size recommendations are 95% accurate! We use advanced body measurement technology and machine learning to suggest the perfect size for you.",
        options: ["How do I start a virtual try-on?", "How does the technology work?"]
      },
      "Can I save my favorite outfits?": {
        content: "Yes! Once you create an account, you can save unlimited outfits to your virtual wardrobe and access them anytime.",
        options: ["How do I start a virtual try-on?", "How does the technology work?"]
      },
      "How does the technology work?": {
        content: "Our technology uses advanced AI and computer vision to create a precise virtual representation of how clothes will look on you. It considers fabric physics, lighting, and your body measurements.",
        options: ["How do I start a virtual try-on?", "How accurate are the size recommendations?"]
      }
    };

    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        type: "bot",
        content: responses[text]?.content || "I can help you with using Drobe's virtual try-on feature, size recommendations, saving outfits, and understanding our technology. What would you like to know?",
        options: responses[text]?.options || Object.keys(responses)
      }]);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-accent/10">
      <TermsModal />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src="https://res.cloudinary.com/dcm494eoc/image/upload/v1740220950/M_S_Womens_Fashion_The_New_Autumn_Season_A_W16_TV_Ad_-_M_S_720p_h264_1_ylwsan.gif"
            alt="Fashion Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto text-center relative z-20">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in text-white">
            Virtual Fashion,<br />Real Style
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto animate-fade-in">
            Experience the future of shopping with our virtual clothing try-on. See how outfits look on you before you buy.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-fade-in">
            Try Now <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Advertisement Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">
            Why Choose Drobe?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Virtual Try-On Technology</h3>
                <p className="text-gray-600">
                  Experience clothes virtually before purchasing. Our AI-powered technology ensures a perfect fit every time.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Save Time & Money</h3>
                <p className="text-gray-600">
                  No more returns! Try before you buy and make confident purchasing decisions from the comfort of your home.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
                <p className="text-gray-600">
                  Your data is safe with us. Experience secure virtual try-ons with our privacy-first technology.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-display font-bold mb-8 text-center">
            How to Use Drobe
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

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6">
              About Drobe
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We're revolutionizing online shopping by bringing virtual try-on technology to your wardrobe.
              Try clothes virtually, make confident purchases, and express your style without limitations.
            </p>
            <div className="flex items-center justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-6 w-6 text-primary" fill="currentColor" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="container mx-auto text-center text-sm text-gray-600">
          <p>© 2024 Drobe. All rights reserved.</p>
          <p className="mt-2">
            Virtual try-on results may vary. See our terms and conditions for details.
          </p>
        </div>
      </footer>
    </div>
  );
}
