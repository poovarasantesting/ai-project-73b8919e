import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution with real-time inventory and payment processing. Built with React, Node.js and MongoDB.",
    image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?q=80&w=500&auto=format&fit=crop",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "web",
    demoUrl: "#",
    codeUrl: "#"
  },
  {
    id: 2,
    title: "Analytics Dashboard",
    description: "Interactive dashboard with data visualization for business metrics. Features real-time updates and customizable widgets.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop",
    tags: ["React", "TypeScript", "D3.js", "Firebase"],
    category: "web",
    demoUrl: "#",
    codeUrl: "#"
  },
  {
    id: 3,
    title: "Mobile Fitness App",
    description: "A fitness tracking application for iOS and Android with workout plans, progress tracking, and social features.",
    image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=500&auto=format&fit=crop",
    tags: ["React Native", "Redux", "Firebase"],
    category: "mobile",
    demoUrl: "#",
    codeUrl: "#"
  },
  {
    id: 4,
    title: "Task Management System",
    description: "A comprehensive task management application with team collaboration features, notifications, and reporting.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=500&auto=format&fit=crop",
    tags: ["Next.js", "GraphQL", "Prisma", "PostgreSQL"],
    category: "web",
    demoUrl: "#",
    codeUrl: "#"
  },
  {
    id: 5,
    title: "Portfolio Template",
    description: "A customizable portfolio template for developers and designers to showcase their work and skills.",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=500&auto=format&fit=crop",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "template",
    demoUrl: "#",
    codeUrl: "#"
  },
  {
    id: 6,
    title: "Weather App",
    description: "A weather application providing current conditions and forecasts with beautiful visualizations.",
    image: "https://images.unsplash.com/photo-1532178910-7815d6919875?q=80&w=500&auto=format&fit=crop",
    tags: ["React", "OpenWeatherAPI", "ChartJS"],
    category: "mobile",
    demoUrl: "#",
    codeUrl: "#"
  }
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="container py-12 md:py-16">
      <h1 className="text-4xl font-bold mb-6">My Projects</h1>
      <p className="text-xl text-muted-foreground mb-10 max-w-3xl">
        Browse through a selection of my work. Each project represents different skills and technologies I've worked with.
      </p>
      
      <Tabs defaultValue="all" className="mb-10" onValueChange={setActiveFilter}>
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="web">Web Apps</TabsTrigger>
          <TabsTrigger value="mobile">Mobile Apps</TabsTrigger>
          <TabsTrigger value="template">Templates</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div key={project.id} className="group border rounded-xl overflow-hidden flex flex-col hover:border-primary transition-colors">
            <div className="aspect-video overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <div className="flex gap-4 mt-auto">
                <Button variant="default" size="sm" asChild>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-2" /> Live Demo
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                    <Github size={16} className="mr-2" /> Code
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}