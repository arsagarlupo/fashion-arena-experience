
import { ChatResponse } from "@/types/chat";

export const chatResponses: ChatResponse = {
  "How do I start a virtual try-on?": {
    type: "bot",
    content: "Starting a virtual try-on is easy! Just follow these steps:\n1. Click the 'Try Now' button\n2. Upload a photo or use our virtual avatar\n3. Select the clothing items you want to try\n4. See how they look on you instantly!",
    options: ["How accurate are the size recommendations?", "Can I save my looks?"]
  },
  "How accurate are the size recommendations?": {
    type: "bot",
    content: "Our AI-powered size recommendations are 95% accurate! We use advanced body measurement technology and machine learning to suggest the perfect size for you.",
    options: ["How do I start a virtual try-on?", "How does the technology work?"]
  },
  "Can I save my favorite outfits?": {
    type: "bot",
    content: "Yes! Once you create an account, you can save unlimited outfits to your virtual wardrobe and access them anytime.",
    options: ["How do I start a virtual try-on?", "How does the technology work?"]
  },
  "How does the technology work?": {
    type: "bot",
    content: "Our technology uses advanced AI and computer vision to create a precise virtual representation of how clothes will look on you. It considers fabric physics, lighting, and your body measurements.",
    options: ["How do I start a virtual try-on?", "How accurate are the size recommendations?"]
  }
};
