
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TermsModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [hasAccepted, setHasAccepted] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('termsAccepted');
    if (accepted) {
      setHasAccepted(true);
      setIsOpen(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('termsAccepted', 'true');
    setHasAccepted(true);
    setIsOpen(false);
  };

  if (hasAccepted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl glass">
        <DialogHeader>
          <DialogTitle className="text-3xl font-display">Terms & Conditions</DialogTitle>
          <DialogDescription className="text-lg opacity-80">
            Please read and accept our terms before continuing
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] rounded-md border p-4">
          <div className="space-y-4">
            <p className="text-sm leading-relaxed">
              Welcome to our AR Clothing Store. By using this service, you agree to the following terms:
            </p>
            <h3 className="text-lg font-semibold">1. AR Technology Usage</h3>
            <p className="text-sm leading-relaxed">
              Our AR try-on feature is provided "as is" and may not perfectly represent the actual clothing items.
              Results may vary based on lighting, image quality, and other factors.
            </p>
            <h3 className="text-lg font-semibold">2. Image Rights</h3>
            <p className="text-sm leading-relaxed">
              By uploading images, you grant us permission to process them for AR try-on purposes.
              We do not store or use your images for any other purposes.
            </p>
            <h3 className="text-lg font-semibold">3. User Content</h3>
            <p className="text-sm leading-relaxed">
              You are responsible for any content you share or upload to our platform.
              Please ensure you have the rights to use and share such content.
            </p>
            {/* Add more terms sections as needed */}
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button 
            onClick={handleAccept}
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-6"
          >
            I Accept the Terms & Conditions
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
