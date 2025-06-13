import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Welcome to Gallery Viewer
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center max-w-2xl mb-10">
        Browse through our collection of beautiful, high-quality images in a
        clean and intuitive interface.
      </p>
      <div className="flex gap-4">
        <Link to="/gallery">
          <Button className="flex items-center gap-2" size="lg">
            View Gallery <ArrowRight size={18} />
          </Button>
        </Link>
      </div>
    </div>
  );
}