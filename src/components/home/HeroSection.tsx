
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { UploadDialog } from "@/components/UploadDialog";

export function HeroSection() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  return (
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
        <Button 
          className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-fade-in"
          onClick={() => setIsUploadDialogOpen(true)}
        >
          Try Now <ArrowRight className="ml-2" />
        </Button>
      </div>

      <UploadDialog 
        isOpen={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
      />
    </section>
  );
}
