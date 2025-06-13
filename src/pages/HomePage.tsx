import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="py-20 md:py-28 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
          Hi, I'm <span className="text-primary">Your Name</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-[700px] mb-8">
          Web Developer & Designer creating beautiful digital experiences
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link to="/projects">View My Work</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/contact">Get In Touch</Link>
          </Button>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 border-t">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">My Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "React", "TypeScript", "Node.js", "Tailwind CSS",
              "Next.js", "UI/UX Design", "GraphQL", "Responsive Design"
            ].map(skill => (
              <div key={skill} className="border rounded-lg p-4 text-center hover:border-primary transition-colors">
                <p>{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 border-t">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <Link 
              to="/projects"
              className="flex items-center text-primary hover:underline"
            >
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                id: 1,
                title: "E-Commerce Platform",
                description: "A modern e-commerce solution with real-time inventory and payment processing",
                image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?q=80&w=500&auto=format&fit=crop"
              },
              {
                id: 2,
                title: "Analytics Dashboard",
                description: "Interactive dashboard with data visualization for business metrics",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop"
              }
            ].map(project => (
              <div key={project.id} className="group rounded-lg overflow-hidden border hover:border-primary transition-colors">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <Button asChild variant="ghost" size="sm">
                    <Link to={`/projects/${project.id}`}>
                      View Details <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}