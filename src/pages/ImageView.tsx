import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Share, 
  Heart, 
  ZoomIn, 
  ZoomOut,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { galleryImages } from "@/data/images";
import { toast } from "@/components/ui/use-toast";

export default function ImageView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState<typeof galleryImages[0] | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const foundIndex = galleryImages.findIndex((img) => img.id === id);
    if (foundIndex !== -1) {
      setImage(galleryImages[foundIndex]);
      setImageIndex(foundIndex);
    } else {
      navigate("/gallery");
    }
  }, [id, navigate]);

  const handlePrevious = () => {
    const prevIndex = (imageIndex - 1 + galleryImages.length) % galleryImages.length;
    navigate(`/gallery/${galleryImages[prevIndex].id}`);
  };

  const handleNext = () => {
    const nextIndex = (imageIndex + 1) % galleryImages.length;
    navigate(`/gallery/${galleryImages[nextIndex].id}`);
  };

  const handleDownload = () => {
    if (image) {
      const link = document.createElement("a");
      link.href = image.url;
      link.download = `${image.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      link.click();
      toast({
        title: "Download started",
        description: `Downloading ${image.title}`,
      });
    }
  };

  const handleShare = () => {
    if (navigator.share && image) {
      navigator.share({
        title: image.title,
        text: image.description,
        url: window.location.href,
      })
      .catch(() => {
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied to clipboard",
          description: "You can now share this image with others.",
        });
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied to clipboard",
        description: "You can now share this image with others.",
      });
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Removed from favorites" : "Added to favorites",
      description: liked ? "Image removed from your favorites" : "Image added to your favorites",
    });
  };

  const handleZoomIn = () => {
    if (zoomLevel < 2) {
      setZoomLevel(zoomLevel + 0.2);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel(zoomLevel - 0.2);
    }
  };

  if (!image) {
    return null;
  }

  return (
    <div className="container flex min-h-[calc(100vh-8rem)] flex-col py-8">
      <div className="mb-4 flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate("/gallery")}>
          <X className="mr-2 h-4 w-4" />
          Close
        </Button>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleLike}
            className={liked ? "text-red-500" : ""}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-red-500" : ""}`} />
          </Button>
          <Button variant="outline" size="icon" onClick={handleShare}>
            <Share className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative flex-1">
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 shadow-sm"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <div className="flex h-full items-center justify-center overflow-hidden bg-muted/20">
          <img
            src={image.url}
            alt={image.title}
            className="max-h-[70vh] transition-transform duration-300"
            style={{ transform: `scale(${zoomLevel})` }}
          />
        </div>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 shadow-sm"
          onClick={handleNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold">{image.title}</h1>
          <p className="text-sm text-muted-foreground">
            Category: {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
          </p>
        </div>
        <p>{image.description}</p>
        <div className="flex flex-wrap gap-2">
          {image.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}