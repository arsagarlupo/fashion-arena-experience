
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export function SignInDialog() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const logSignInAttempt = async (email: string, successful: boolean) => {
    try {
      await supabase
        .from('sign_in_attempts')
        .insert({
          email,
          successful
        });
    } catch (error) {
      console.error('Error logging sign in attempt:', error);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: users, error: fetchError } = await supabase
        .from('users')
        .select()
        .eq('email', email)
        .eq('password', password)
        .maybeSingle();

      if (fetchError || !users) {
        await logSignInAttempt(email, false);
        toast({
          title: "Error",
          description: "Invalid email or password.",
          variant: "destructive",
        });
        return;
      }

      await logSignInAttempt(email, true);
      localStorage.setItem("currentUser", JSON.stringify(users));
      toast({
        title: "Success!",
        description: "You have successfully signed in.",
      });
      setIsOpen(false);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error('Error during sign in:', error);
      toast({
        title: "Error",
        description: "An error occurred during sign in.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Sign In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSignIn} className="space-y-4">
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
