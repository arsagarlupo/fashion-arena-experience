
import { Navbar } from "@/components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-accent/10 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-display font-bold mb-8 text-center">About Drobe</h1>
          
          <div className="space-y-8 text-gray-600 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="leading-relaxed">
                Drobe is revolutionizing the online shopping experience by bringing virtual try-on technology 
                to your wardrobe. We believe that everyone deserves to shop with confidence, knowing exactly 
                how clothes will look on them before making a purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
              <p className="leading-relaxed">
                Our platform uses advanced virtual try-on technology to help you visualize clothing items 
                on yourself. Simply upload a photo or use our virtual avatar, select the items you're 
                interested in, and see how they look instantly. No more uncertainty about fit or style!
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Features</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Virtual Try-On Technology</li>
                <li>Personalized Size Recommendations</li>
                <li>360-Degree View</li>
                <li>Mix and Match Outfits</li>
                <li>Save Favorite Looks</li>
                <li>Share With Friends</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
              <p className="leading-relaxed">
                We're committed to providing an exceptional shopping experience while reducing returns 
                and waste in the fashion industry. Our technology helps customers make more informed 
                decisions, leading to higher satisfaction and fewer returns.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="leading-relaxed">
                Have questions or feedback? We'd love to hear from you! Reach out to our support team 
                at support@drobe.com or through our help center.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
