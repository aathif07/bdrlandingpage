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
  import { sendPasswordResetEmail } from 'firebase/auth';
  import { auth } from '../lib/firebase';
  import { ArrowLeft } from 'lucide-react';

  const formSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
  });

  const ForgotPassword = () => {
    const { theme } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1); // Navigate to the previous page in history
    };

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
      },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      setIsLoading(true);
    
      try {
        await sendPasswordResetEmail(auth, values.email);
        setEmailSent(true);
        toast({
          title: "Reset email sent",
          description: "Check your inbox for password reset instructions",
        });
      } catch (error: unknown) {
        console.error("Password reset error:", error);
      
        let errorMessage = "Failed to send reset email";
        if (error instanceof Error) {
          switch (true) {
            case error.message.includes("auth/user-not-found"):
              errorMessage = "No account found with this email";
              break;
            case error.message.includes("auth/invalid-email"):
              errorMessage = "Invalid email format";
              break;
            default:
              errorMessage = error.message || "An error occurred";
          }
        }
      
        toast({
          title: "Reset failed",
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
            {emailSent ? (
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <svg className="h-8 w-8 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2 dark:text-white">Check Your Email</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We've sent password reset instructions to your email address.
                </p>
                <div className="flex flex-col space-y-3">
                  <Button onClick={() => setEmailSent(false)}>
                    Send Again
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/login')}>
                    Back to Login
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-2 dark:text-white">Forgot Password</h1>
                  <p className="text-rhino-gray dark:text-gray-300">Enter your email to reset your password</p>
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
                
                    <Button 
                      type="submit"
                      className="w-full bg-rhino-blue hover:bg-rhino-darkBlue dark:bg-blue-600 dark:hover:bg-blue-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Reset Password"}
                    </Button>
                
                    <div className="text-center mt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Remember your password?{" "}
                        <Link to="/login" className="font-medium text-rhino-blue hover:text-rhino-darkBlue dark:text-blue-400">
                          Log in
                        </Link>
                      </p>
                    </div>
                  </form>
                </Form>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default ForgotPassword;
