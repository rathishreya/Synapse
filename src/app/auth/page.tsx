'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function AuthPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Generate stable random values for orbs
  const [orbs] = useState(() => 
    [...Array(5)].map((_, i) => ({
      width: Math.random() * 300 + 200,
      height: Math.random() * 300 + 200,
      left: Math.random() * 80 + 10,
      top: Math.random() * 80 + 10,
      x: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
      y: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
      duration: 10 + Math.random() * 10,
    }))
  );

  // Generate stable random values for particles
  const [particles] = useState(() =>
    [...Array(20)].map((_, i) => ({
      x: Math.random() * 100 - 50,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
      left: Math.random() * 100,
    }))
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGoogleAuth = () => {
    // TODO: Implement Google OAuth
    console.log('Google auth triggered');
    // Simulate checking if user exists
    const isFirstTime = !localStorage.getItem('userExists');
    
    if (isFirstTime) {
      localStorage.setItem('userExists', 'true');
      localStorage.setItem('isFirstTimeUser', 'true');
      router.push('/onboarding?step=0');
    } else {
      router.push('/dashboard');
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Check if email exists (simulated)
    const existingUser = localStorage.getItem(`user_${formData.email}`);
    
    if (!isLogin) {
      // Signup
      if (existingUser) {
        alert('This email already exists. Please login.');
        return;
      }
      
      // Save user
      localStorage.setItem(`user_${formData.email}`, JSON.stringify({
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString()
      }));
      localStorage.setItem('currentUser', formData.email);
      localStorage.setItem('isFirstTimeUser', 'true');
      
      alert('Verification email sent! (Simulated)');
      router.push('/onboarding?step=0');
    } else {
      // Login
      if (!existingUser) {
        alert('User not found. Please sign up.');
        return;
      }
      
      const user = JSON.parse(existingUser);
      if (user.password !== formData.password) {
        alert('Incorrect password');
        return;
      }
      
      localStorage.setItem('currentUser', formData.email);
      
      // Check if user completed onboarding
      const completedOnboarding = localStorage.getItem(`onboarding_${formData.email}`);
      if (completedOnboarding) {
        router.push('/dashboard');
      } else {
        router.push('/onboarding?step=0');
      }
    }
  };

  const handleForgotPassword = () => {
    if (!formData.email) {
      alert('Please enter your email first');
      return;
    }
    alert(`Password reset link sent to ${formData.email} (Simulated)`);
    setShowForgotPassword(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-background">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-l from-primary/15 to-transparent rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-r from-secondary/15 to-transparent rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Animated Background */}
      {mounted && (
        <div className="absolute inset-0">
          {/* Gradient Orbs */}
          {orbs.map((orb, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full filter blur-3xl opacity-10"
              style={{
                width: orb.width,
                height: orb.height,
                background: `linear-gradient(135deg, ${i % 2 === 0 ? 'hsl(200 72% 50%)' : 'hsl(196 81% 54%)'}, ${i % 2 === 0 ? 'hsl(196 81% 54%)' : 'hsl(200 72% 50%)'})`,
                left: `${orb.left}%`,
                top: `${orb.top}%`,
              }}
              animate={{
                x: orb.x,
                y: orb.y,
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: orb.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2,
              }}
            />
          ))}

          {/* Floating Particles */}
          {particles.map((particle, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-2 h-2 bg-primary rounded-full"
              animate={{
                y: [-20, -1000],
                x: [0, particle.x],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "linear",
              }}
              style={{
                left: `${particle.left}%`,
                bottom: 0,
              }}
            />
          ))}

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(200_72%_50%_/_0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(200_72%_50%_/_0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>
      )}

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <Card className="bg-card/80 backdrop-blur-2xl border-border shadow-2xl shadow-primary/10 hover:shadow-primary/20 transition-all duration-300">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl shadow-primary/40"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
            </div>
            <CardTitle className="text-4xl font-bold text-foreground mb-3">
              Welcome to <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">Synapse</span>
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base font-light leading-relaxed">
              Synapse connects every lead, every channel, every conversation — just like your smartest rep.
            </CardDescription>
            <p className="text-sm text-muted-foreground mt-2">
              Sign in to supercharge your sales with AI
            </p>
          </CardHeader>

          <CardContent className="space-y-5">
            <Button
              size="lg"
              className="w-full bg-card hover:bg-muted text-foreground font-semibold py-7 flex items-center justify-center gap-3 border-2 border-border hover:border-primary/40 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={handleGoogleAuth}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground font-light">Or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="bg-background/50 backdrop-blur-sm border-2 border-border hover:border-primary/30 focus:border-primary/50"
                />
              </div>

              {!showForgotPassword && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                        className="bg-background/50 backdrop-blur-sm border-2 border-border hover:border-primary/30 focus:border-primary/50 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        required
                        className="bg-background/50 backdrop-blur-sm border-2 border-border hover:border-primary/30 focus:border-primary/50"
                      />
                    </div>
                  )}

                  {isLogin && (
                    <div className="text-right">
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-sm text-primary hover:text-secondary transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 py-7 font-semibold"
                  >
                    {isLogin ? 'Sign In' : 'Sign Up'}
                  </Button>
                </>
              )}

              {showForgotPassword && (
                <Button
                  type="button"
                  onClick={handleForgotPassword}
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 py-7 font-semibold"
                >
                  Send Reset Link
                </Button>
              )}
            </form>

            <p className="text-center text-sm text-muted-foreground mt-8 font-light">
              {showForgotPassword ? (
                <>
                  Remember your password?{' '}
                  <button
                    onClick={() => setShowForgotPassword(false)}
                    className="text-primary hover:text-secondary font-semibold transition-colors duration-300"
                  >
                    Back to login
                  </button>
                </>
              ) : isLogin ? (
                <>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-primary hover:text-secondary font-semibold transition-colors duration-300"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-primary hover:text-secondary font-semibold transition-colors duration-300"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <Link href="/" className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm font-light inline-flex items-center gap-2 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

