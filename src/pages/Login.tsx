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
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { auth, db } from '../lib/firebase';
  import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
  import { ArrowLeft } from 'lucide-react';

  const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  });

  const Login = () => {
    const { theme } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });

    const handleGoBack = () => {
      navigate(-1); // Navigate to the previous page in history
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      setIsLoading(true);
    
      try {
        // 1. Authenticate with Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;

        console.log("User authenticated:", user.uid);
        console.log("User display name:", user.displayName);
        console.log("User email:", user.email);

        // 2. Get user document from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
      
        // 3. Update last login timestamp
        await updateDoc(userDocRef, {
          lastLogin: serverTimestamp()
        });

        // 4. Check user role and redirect accordingly
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("User data from Firestore:", userData);
        
          if (userData.role === "admin") {
            toast({
              title: "Admin login successful",
              description: "Welcome to the admin dashboard",
            });
            navigate('/admin/dashboard');
          } else {
            toast({
              title: "Login successful",
              description: "Welcome back!",
            });
            navigate('/');
          }
        } else {
          console.warn("User document not found in Firestore");
          toast({
            title: "Login successful",
            description: "Welcome back!",
          });
          navigate('/');
        }
      } catch (error: unknown) {
        console.error("Login error:", error);
      
        let errorMessage = "Login failed";
        if (error instanceof Error) {
          switch (true) {
            case error.message.includes("auth/user-not-found"):
            case error.message.includes("auth/wrong-password"):
              errorMessage = "Invalid email or password";
              break;
            case error.message.includes("auth/user-disabled"):
              errorMessage = "This account has been disabled";
              break;
            default:
              errorMessage = error.message || "An error occurred";
          }
        }
      
        toast({
          title: "Login failed",
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
              <h1 className="text-3xl font-bold mb-2 dark:text-white">Welcome Back</h1>
              <p className="text-rhino-gray dark:text-gray-300">Log in to your Big Data Rhino account</p>
            </div>
        
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-rhino-blue hover:text-rhino-darkBlue dark:text-blue-400">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
            
                <Button 
                  type="submit"
                  className="w-full bg-rhino-blue hover:bg-rhino-darkBlue dark:bg-blue-600 dark:hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log in"}
                </Button>
            
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/signup" className="font-medium text-rhino-blue hover:text-rhino-darkBlue dark:text-blue-400">
                      Sign up
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

  export default Login;
