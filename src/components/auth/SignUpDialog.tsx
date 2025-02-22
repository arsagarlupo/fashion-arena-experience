
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function SignUpDialog() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Starting signup process...', { name, email });
    
    try {
      // Check if user already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select()
        .eq('email', email)
        .maybeSingle();
      
      console.log('Checking existing user:', { existingUser, checkError });

      if (existingUser) {
        toast({
          title: "Error",
          description: "An account with this email already exists.",
          variant: "destructive",
        });
        return;
      }
      
      // Add new user
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([{
          name,
          email,
          password
        }])
        .select()
        .single();
      
      console.log('Insert result:', { newUser, insertError });
      
      if (insertError) {
        console.error('Insert error:', insertError);
        throw insertError;
      }

      if (!newUser) {
        throw new Error('No user data returned after insert');
      }

      // Set as current user
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      
      toast({
        title: "Success!",
        description: "Your account has been created.",
      });
      
      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error during sign up:', error);
      toast({
        title: "Error",
        description: "An error occurred while creating your account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Sign Up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create an Account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Choose a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Create Account</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
