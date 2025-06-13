import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { galleryImages } from "@/data/images";

export default function Gallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [filteredImages, setFilteredImages] = useState(galleryImages);

  useEffect(() => {
    let result = galleryImages;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (image) => 
          image.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          image.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (category !== "all") {
      result = result.filter((image) => image.category === category);
    }
    
    setFilteredImages(result);
  }, [searchTerm, category]);

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Image Gallery</h1>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search images..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="landscape">Landscape</SelectItem>
              <SelectItem value="portrait">Portrait</SelectItem>
              <SelectItem value="architecture">Architecture</SelectItem>
              <SelectItem value="nature">Nature</SelectItem>
              <SelectItem value="abstract">Abstract</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredImages.length === 0 ? (
        <div className="my-20 flex flex-col items-center justify-center space-y-4 text-center">
          <Filter className="h-12 w-12 text-muted-foreground" />
          <h2 className="text-2xl font-semibold">No images found</h2>
          <p className="text-muted-foreground">
            Try changing your search terms or filters
          </p>
          <Button onClick={() => {
            setSearchTerm("");
            setCategory("all");
          }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredImages.map((image) => (
            <Link to={`/gallery/${image.id}`} key={image.id}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">{image.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{image.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}