
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface UploadDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadDialog({ isOpen, onOpenChange }: UploadDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [description, setDescription] = useState<string>("");
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Analyze the image
      setAnalyzing(true);
      try {
        const formData = new FormData();
        formData.append('image', selectedFile);
        
        const { data: { generatedText }, error } = await supabase.functions
          .invoke('analyze-image', {
            body: formData,
          });

        if (error) throw error;
        
        setDescription(generatedText);
      } catch (error) {
        console.error('Error analyzing image:', error);
        toast({
          title: "Error",
          description: "Failed to analyze the image. Please try again.",
          variant: "destructive",
        });
      } finally {
        setAnalyzing(false);
      }
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('garments')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('garments')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('garments')
        .insert([
          {
            name: file.name.split('.')[0],
            description: description || 'User uploaded garment',
            image_url: publicUrl,
          }
        ]);

      if (dbError) {
        throw dbError;
      }

      toast({
        title: "Success!",
        description: "Your image has been uploaded successfully.",
      });

      onOpenChange(false);
      setFile(null);
      setDescription("");
    } catch (error) {
      console.error('Error uploading:', error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Your Garment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10MB)</p>
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {file && (
              <p className="text-sm text-gray-500">
                Selected file: {file.name}
              </p>
            )}
            {analyzing && (
              <p className="text-sm text-blue-500">
                Analyzing your garment...
              </p>
            )}
            {description && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium mb-2">Garment Analysis:</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={!file || uploading || analyzing}
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
