
import { Star } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-16 px-4 bg-primary/5">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold mb-6">
            About AIWear
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
  );
}
