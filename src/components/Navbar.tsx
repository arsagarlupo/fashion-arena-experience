
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  User,
  X,
  Settings,
  UserPen,
  Upload,
  Share,
  HelpCircle,
  Bell,
  Sun,
  Moon,
  Languages,
  Text
} from "lucide-react";
import { SignInDialog } from "./auth/SignInDialog";
import { SignUpDialog } from "./auth/SignUpDialog";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("medium");
  const [language, setLanguage] = useState("english");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    // Apply theme to body
    document.body.className = theme === 'dark' ? 'dark' : '';
  }, [theme]);

  useEffect(() => {
    // Apply font size to body
    document.body.style.fontSize = {
      small: '14px',
      medium: '16px',
      large: '18px',
    }[fontSize];
  }, [fontSize]);

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/");
    window.location.reload();
  };

  const handleProfilePhotoChange = () => {
    // Placeholder for photo change functionality
    console.log("Change profile photo");
  };

  const handleInviteFriends = () => {
    // Placeholder for invite functionality
    console.log("Invite friends");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <span className="text-2xl font-display font-bold text-primary">Drobe</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About Us
            </a>
            {!currentUser ? (
              <div className="flex items-center space-x-4">
                <SignInDialog />
                <SignUpDialog />
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center space-x-4 cursor-pointer">
                    <span className="text-sm font-medium">{currentUser.name}</span>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <UserPen className="mr-2 h-4 w-4" />
                    <span>Edit Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleProfilePhotoChange}>
                    <Upload className="mr-2 h-4 w-4" />
                    <span>Change Photo</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent className="w-56">
                      {/* Theme Selection */}
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          {theme === 'dark' ? (
                            <Moon className="mr-2 h-4 w-4" />
                          ) : (
                            <Sun className="mr-2 h-4 w-4" />
                          )}
                          <span>Theme</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                            <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>

                      {/* Font Size Selection */}
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <Text className="mr-2 h-4 w-4" />
                          <span>Font Size</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuRadioGroup value={fontSize} onValueChange={setFontSize}>
                            <DropdownMenuRadioItem value="small">Small</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="large">Large</DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>

                      {/* Language Selection */}
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <Languages className="mr-2 h-4 w-4" />
                          <span>Language</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
                            <DropdownMenuRadioItem value="english">English</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="spanish">Spanish</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="french">French</DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>

                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Updates</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={handleInviteFriends}>
                    <Share className="mr-2 h-4 w-4" />
                    <span>Invite Friends</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={handleSignOut} className="text-red-500">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <a
              href="/"
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              About Us
            </a>
            {!currentUser ? (
              <div className="space-y-2">
                <SignInDialog />
                <SignUpDialog />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">{currentUser.name}</span>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                </div>
                <Button variant="outline" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
