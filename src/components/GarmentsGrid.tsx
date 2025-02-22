
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Garment {
  id: string;
  name: string;
  description: string;
  image_url: string;
}

export function GarmentsGrid() {
  const [garments, setGarments] = useState<Garment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGarments() {
      try {
        const { data, error } = await supabase
          .from('garments')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching garments:', error);
          return;
        }

        setGarments(data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGarments();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[400px]">Loading...</div>;
  }

  return (
    <ScrollArea className="h-[calc(100vh-200px)] w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {garments.map((garment) => (
            <Card key={garment.id} className="overflow-hidden">
              <img
                src={garment.image_url}
                alt={garment.name}
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{garment.name}</h3>
                <p className="text-sm text-gray-600">{garment.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
