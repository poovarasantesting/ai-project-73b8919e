import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      console.log(values);
      setIsLoading(false);
      toast({
        title: "Login attempted",
        description: "In a real app, you would be logged in now.",
      });
    }, 1500);
  }

  return (
    <div className="w-full max-w-md p-6 mx-auto space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your credentials to sign in to your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="youremail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-center text-sm">
        <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
          Forgot password?
        </a>
      </div>
      
      <div className="pt-4 text-center text-sm border-t">
        <p className="text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}