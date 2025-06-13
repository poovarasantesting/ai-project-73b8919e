import { useState } from "react";
import { Loader2, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setIsSubmitting(false);
      // Reset form
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };
  
  return (
    <div className="container py-12 md:py-16">
      <h1 className="text-4xl font-bold mb-6">Get In Touch</h1>
      <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
        I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
      </p>
      
      <div className="grid md:grid-cols-[1fr,400px] gap-12">
        {/* Contact Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" name="name" placeholder="Your Name" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" placeholder="your.email@example.com" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" name="subject" placeholder="How can I help you?" required />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  name="message" 
                  placeholder="Tell me about your project, question, or just say hello..." 
                  rows={6}
                  required 
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </Card>
        
        {/* Contact Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Contact Information</h2>
          <p className="text-muted-foreground">
            Feel free to contact me directly or through the form, and I'll get back to you as soon as possible.
          </p>
          
          <div className="space-y-4 mt-8">
            <div className="flex items-start">
              <div className="mt-1 mr-3 p-2 rounded-full bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Location</h3>
                <p className="text-muted-foreground">San Francisco, CA</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mt-1 mr-3 p-2 rounded-full bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <a 
                  href="mailto:your.email@example.com" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  your.email@example.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mt-1 mr-3 p-2 rounded-full bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Phone</h3>
                <a 
                  href="tel:+14155552671" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  (415) 555-2671
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t pt-6">
            <h3 className="font-medium mb-3">Availability</h3>
            <p className="text-muted-foreground mb-2">
              Monday - Friday: 9am - 6pm PST
            </p>
            <p className="text-muted-foreground">
              Response time: within 24-48 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}