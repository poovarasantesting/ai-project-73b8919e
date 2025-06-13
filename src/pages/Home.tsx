import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center space-y-12 py-16 md:py-24">
      <div className="max-w-3xl space-y-6 text-center">
        <Camera className="mx-auto h-16 w-16 text-primary" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Welcome to PixelGallery
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Explore our curated collection of stunning photography from around the world.
          Discover beautiful landscapes, captivating portraits, and artistic compositions.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/gallery">
              Browse Gallery
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3 md:gap-8">
        {featuredImages.map((image) => (
          <div key={image.id} className="overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg">
            <Link to={`/gallery/${image.id}`}>
              <img 
                src={image.url} 
                alt={image.title} 
                className="h-60 w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="p-4">
                <h3 className="font-medium">{image.title}</h3>
                <p className="text-sm text-muted-foreground">{image.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const featuredImages = [
  {
    id: "1",
    title: "Mountain Landscape",
    description: "Scenic mountain view at sunset",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Ocean Waves",
    description: "Crashing waves at a rocky coastline",
    url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=1626&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Urban Architecture",
    description: "Modern city skyline with skyscrapers",
    url: "https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?q=80&w=1740&auto=format&fit=crop",
  },
];