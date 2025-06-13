import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, LayoutGrid, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

// Sample gallery data
const galleryImages = [
  {
    id: 1,
    title: "Mountain Landscape",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
    description: "Beautiful mountain range at sunset",
  },
  {
    id: 2,
    title: "Ocean View",
    url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=800&auto=format&fit=crop",
    description: "Serene ocean view with waves crashing on rocks",
  },
  {
    id: 3,
    title: "Forest Path",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop",
    description: "Sunlight filtering through a dense forest path",
  },
  {
    id: 4,
    title: "City Skyline",
    url: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?q=80&w=800&auto=format&fit=crop",
    description: "Modern city skyline at night with glowing lights",
  },
  {
    id: 5,
    title: "Desert Dunes",
    url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=800&auto=format&fit=crop",
    description: "Rolling sand dunes in a vast desert",
  },
  {
    id: 6,
    title: "Waterfall",
    url: "https://images.unsplash.com/photo-1496950866446-3253e1470e8e?q=80&w=800&auto=format&fit=crop",
    description: "Powerful waterfall cascading down rocky cliffs",
  },
  {
    id: 7,
    title: "Northern Lights",
    url: "https://images.unsplash.com/photo-1483086431886-3590a88317fe?q=80&w=800&auto=format&fit=crop",
    description: "Aurora borealis dancing in the night sky",
  },
  {
    id: 8,
    title: "Autumn Colors",
    url: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?q=80&w=800&auto=format&fit=crop",
    description: "Vibrant autumn foliage in a peaceful park",
  },
];

export default function Gallery() {
  const { toast } = useToast();
  const [images, setImages] = useState(galleryImages);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredImages = galleryImages.filter(
        (image) =>
          image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          image.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setImages(filteredImages);
    } else {
      setImages(galleryImages);
    }
  }, [searchTerm]);

  const handleImageClick = (id: number) => {
    toast({
      title: "Image Selected",
      description: `Viewing image #${id}`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center">
          <Link to="/">
            <Button variant="outline" className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold flex items-center">
            <LayoutGrid className="mr-2" /> Gallery
          </h1>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search images..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array(8)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-4">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-full" />
                  </CardContent>
                </Card>
              ))
          : images.map((image) => (
              <Link
                to={`/gallery/${image.id}`}
                key={image.id}
                onClick={() => handleImageClick(image.id)}
              >
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg">{image.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {image.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
      </div>

      {!loading && images.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold">No images found</h3>
          <p className="text-gray-500 mt-2">
            Try changing your search criteria
          </p>
        </div>
      )}
    </div>
  );
}