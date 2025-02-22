
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Clock, ShieldCheck } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="container mx-auto">
        <h2 className="text-3xl font-display font-bold mb-12 text-center">
          Why Choose AIWear?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Sparkles className="h-8 w-8 text-primary" />}
            title="Virtual Try-On Technology"
            description="Experience clothes virtually before purchasing. Our AI-powered technology ensures a perfect fit every time."
          />
          <FeatureCard
            icon={<Clock className="h-8 w-8 text-primary" />}
            title="Save Time & Money"
            description="No more returns! Try before you buy and make confident purchasing decisions from the comfort of your home."
          />
          <FeatureCard
            icon={<ShieldCheck className="h-8 w-8 text-primary" />}
            title="Secure & Private"
            description="Your data is safe with us. Experience secure virtual try-ons with our privacy-first technology."
          />
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white/50 backdrop-blur">
      <CardContent className="p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
