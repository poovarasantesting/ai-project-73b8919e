import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

export default function AboutPage() {
  const timelineEvents = [
    {
      year: "2023",
      title: "Senior Developer",
      company: "TechCorp Inc.",
      description: "Led team of 5 developers building enterprise solutions"
    },
    {
      year: "2021",
      title: "Frontend Developer",
      company: "Digital Solutions Ltd",
      description: "Developed responsive web applications and improved UX/UI"
    },
    {
      year: "2019",
      title: "Junior Developer",
      company: "StartUp Studio",
      description: "Built and maintained client websites and applications"
    },
    {
      year: "2018",
      title: "Computer Science Degree",
      company: "University of Technology",
      description: "Graduated with honors, specialized in web technologies"
    }
  ];

  return (
    <div className="container py-12 md:py-16">
      <h1 className="text-4xl font-bold mb-6">About Me</h1>
      
      {/* Bio Section */}
      <section className="mb-16">
        <div className="grid md:grid-cols-[2fr,1fr] gap-8 items-start">
          <div>
            <p className="text-xl text-muted-foreground mb-4">
              I'm a passionate web developer with over 5 years of experience creating beautiful and functional websites and applications.
            </p>
            <p className="mb-4">
              My journey in web development started at university where I discovered my love for creating digital experiences. Since then, I've worked with startups and established companies to bring their visions to life through code.
            </p>
            <p className="mb-6">
              I specialize in frontend development with React and TypeScript, but I'm also comfortable working with backend technologies. I believe in writing clean, maintainable code and creating intuitive user interfaces.
            </p>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Next.js", "Node.js", "Tailwind CSS", "UI/UX", "Responsive Design"].map(skill => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Personal Info</CardTitle>
              <CardDescription>A bit about me</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-1">Location</div>
                <div>San Francisco, CA</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Email</div>
                <div>your.email@example.com</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Education</div>
                <div>B.Sc. Computer Science</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Languages</div>
                <div>English, Spanish</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Timeline Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8">My Journey</h2>
        <div className="relative border-l border-border pl-8 ml-4">
          {timelineEvents.map((event, index) => (
            <div key={index} className="mb-12 relative">
              <div className="absolute w-4 h-4 bg-primary rounded-full -left-[34px] top-1"></div>
              <div className="font-mono text-sm text-muted-foreground mb-1">{event.year}</div>
              <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
              <div className="text-primary flex items-center mb-2">
                {event.company} <ArrowUpRight size={14} className="ml-1" />
              </div>
              <p className="text-muted-foreground">{event.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}