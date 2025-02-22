
import { Navbar } from "@/components/Navbar";
import { TermsModal } from "@/components/TermsModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-accent/10">
      <TermsModal />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in">
            Virtual Fashion,<br />Real Style
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            Experience the future of shopping with our AR clothing try-on. See how outfits look on you before you buy.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-fade-in">
            Try Now <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-display font-bold mb-8 text-center">
            Trending Styles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden hover-scale glass">
                <CardContent className="p-4">
                  <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4"></div>
                  <h3 className="font-medium mb-2">Modern Classic Blazer</h3>
                  <Button variant="outline" className="w-full">
                    Try Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-primary/5">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6">
              About ARdrobe
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We're revolutionizing online shopping by bringing AR technology to your wardrobe.
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
          <p>© 2024 ARdrobe. All rights reserved.</p>
          <p className="mt-2">
            AR try-on results may vary. See our terms and conditions for details.
          </p>
        </div>
      </footer>
    </div>
  );
}
