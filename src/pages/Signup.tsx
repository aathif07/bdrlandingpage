  import React, { useState } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import { Input } from '@/components/ui/input';
  import { Button } from '@/components/ui/button';
  import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
  import { useForm } from 'react-hook-form';
  import { z } from 'zod';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { useToast } from '@/hooks/use-toast';
  import InteractiveBackground from '../components/effects/InteractiveBackground';
  import { useTheme } from '../context/ThemeContext';
  import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
  import { auth, db } from '../lib/firebase';
  import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
  import { ArrowLeft } from 'lucide-react';

  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters" }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  const Signup = () => {
    const { theme } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1); // Navigate to the previous page in history
    };

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      setIsLoading(true);
    
      try {
        // 1. Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;

        // 2. Update the user profile with display name
        await updateProfile(user, {
          displayName: values.name
        });
      
        console.log("User profile updated with display name:", values.name);

        // 3. Store user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
          name: values.name,
          email: values.email,
          role: "user", // Default role, admin would need to be set manually
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          displayName: values.name, // Add displayName field for consistency
        });

        console.log("User document created in Firestore with ID:", user.uid);

        // 4. Show success message and redirect to login
        toast({
          title: "Account created successfully",
          description: "You can now log in with your credentials",
        });

        navigate('/login');
      } catch (error: unknown) {
        console.error("Signup error:", error);
      
        let errorMessage = "Failed to create account";
        if (error instanceof Error) {
          switch (true) {
            case error.message.includes("auth/email-already-in-use"):
              errorMessage = "Email is already in use";
              break;
            case error.message.includes("auth/invalid-email"):
              errorMessage = "Invalid email format";
              break;
            case error.message.includes("auth/weak-password"):
              errorMessage = "Password is too weak";
              break;
            default:
              errorMessage = error.message || "An error occurred";
          }
        }
      
        toast({
          title: "Signup failed",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className={`min-h-screen flex items-center justify-center p-6 ${theme === 'dark' ? 'dark' : ''}`}>
        <InteractiveBackground />
    
        {/* Back button - positioned at the top left */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute top-4 left-4 flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 z-20"
          onClick={handleGoBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
    
        <div className="w-full max-w-md relative z-10">
          <div className="glass-card p-8 rounded-2xl shadow-xl backdrop-blur-md border dark:border-gray-700">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 dark:text-white">Create Account</h1>
              <p className="text-rhino-gray dark:text-gray-300">Sign up to access Big Data Rhino services</p>
            </div>
        
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-white">Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          {...field} 
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-white">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="you@example.com" 
                          type="email" 
                          {...field} 
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
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
                      <FormLabel className="dark:text-white">Password</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="••••••••" 
                          type="password" 
                          {...field} 
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-white">Confirm Password</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="••••••••" 
                          type="password" 
                          {...field} 
                          className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            
                <Button 
                  type="submit"
                  className="w-full bg-rhino-blue hover:bg-rhino-darkBlue dark:bg-blue-600 dark:hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
            
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-rhino-blue hover:text-rhino-darkBlue dark:text-blue-400">
                      Log in
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    );
  };

  export default Signup;
