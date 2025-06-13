import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Download, Maximize, Minimize } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

// Use same gallery data as in Gallery.tsx
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

export default function ImageView() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [image, setImage] = useState<typeof galleryImages[0] | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const foundImage = galleryImages.find((img) => img.id === Number(id));
      setImage(foundImage || null);
      setLoading(false);
    }, 800);
  }, [id]);

  const currentIndex = galleryImages.findIndex((img) => img.id === Number(id));
  
  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    return galleryImages[nextIndex].id;
  };
  
  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    return galleryImages[prevIndex].id;
  };

  const handleDownload = () => {
    if (!image) return;
    
    // In a real app, this would download the image
    toast({
      title: "Download Started",
      description: `Downloading ${image.title}`,
    });
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link to="/gallery">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gallery
          </Button>
        </Link>
        <Card>
          <Skeleton className="h-[60vh] w-full" />
          <CardContent className="p-6">
            <Skeleton className="h-8 w-1/3 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Link to="/gallery">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gallery
          </Button>
        </Link>
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-4">Image Not Found</h2>
          <p className="text-gray-500 mb-6">
            The image you are looking for does not exist or has been removed.
          </p>
          <Link to="/gallery">
            <Button>Return to Gallery</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className={`transition-all duration-300 ${fullscreen ? 'fixed inset-0 z-50 bg-black' : 'container mx-auto px-4 py-8'}`}>
      {!fullscreen && (
        <div className="flex justify-between items-center mb-6">
          <Link to="/gallery">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gallery
            </Button>
          </Link>
          <div className="flex gap-2">
            <Link to={`/gallery/${prevImage()}`}>
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <Link to={`/gallery/${nextImage()}`}>
              <Button variant="outline" size="icon">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}

      <Card className={`overflow-hidden ${fullscreen ? 'h-full border-0 rounded-none' : ''}`}>
        <div className={`relative ${fullscreen ? 'h-full' : 'h-[60vh]'}`}>
          <img
            src={image.url}
            alt={image.title}
            className={`w-full h-full object-contain ${fullscreen ? 'bg-black' : 'bg-gray-100 dark:bg-gray-800'}`}
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="opacity-80 hover:opacity-100"
              onClick={toggleFullscreen}
            >
              {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="opacity-80 hover:opacity-100"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
          {fullscreen && (
            <Button
              className="absolute top-4 left-4 opacity-80 hover:opacity-100"
              variant="secondary"
              onClick={() => setFullscreen(false)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          )}
        </div>
        {!fullscreen && (
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-2">{image.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{image.description}</p>
          </CardContent>
        )}
      </Card>

      {!fullscreen && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          {galleryImages.slice(0, 4).map((img) => (
            <Link to={`/gallery/${img.id}`} key={img.id}>
              <div className={`h-24 rounded-md overflow-hidden ${Number(id) === img.id ? 'ring-2 ring-blue-500' : ''}`}>
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}