"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { CalendarDays, Menu, X, Home, User, LogOut, LogIn } from "lucide-react";
import { parseCookies, destroyCookie } from "nookies";
import { jwtDecode } from "jwt-decode";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/features/hooks";
import { logout } from "@/features/auth/authSlice";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    email: string;
    name?: string;
  } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token;

    if (token) {
      try {
        const decoded = jwtDecode<{ id: string; email: string; name?: string }>(
          token
        );
        setUser(decoded);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    destroyCookie(null, "token", { path: "/" });
    setUser(null);
    setIsAuthenticated(false);
    dispatch(logout());
    router.push("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home", active: pathname === "/" },
    { href: "/events", label: "Events", active: pathname === "/events" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <CalendarDays className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight">GiggleFest</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    link.active ? "text-primary" : "text-foreground/70"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full h-9 w-9 p-0 border-2"
                    >
                      <span className="font-semibold">
                        {user?.name?.charAt(0).toUpperCase() ||
                          user?.email?.charAt(0).toUpperCase() ||
                          "U"}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex flex-col space-y-1 p-2 text-sm">
                      <p className="font-medium">{user?.name || "User"}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.email || ""}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex gap-3">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          <button
            className="md:hidden flex items-center text-foreground"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg border-t p-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex items-center gap-2 py-2 px-3 rounded-md transition-colors ${
                    link.active
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-accent"
                  }`}
                >
                  {link.href === "/" ? (
                    <Home className="h-4 w-4" />
                  ) : (
                    <CalendarDays className="h-4 w-4" />
                  )}
                  {link.label}
                </Link>
              ))}

              <div className="h-px bg-border my-2" />

              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    onClick={closeMenu}
                    className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-accent"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="flex items-center gap-2 py-2 px-3 rounded-md text-left hover:bg-accent"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-accent"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                  <Button className="mt-2" asChild>
                    <Link href="/register" onClick={closeMenu}>
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
