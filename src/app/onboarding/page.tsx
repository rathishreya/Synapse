'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Sparkles, 
  Target, 
  Mail, 
  Check, 
  ArrowRight, 
  Upload, 
  Download,
  Bot,
  User,
  ChevronRight,
  Building2,
  Globe2,
  Tags,
  Database,
  Clock,
  AlertCircle,
  Link2
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type LeadGenMethod = 'manual' | 'ai' | null;
type OutreachMethod = 'manual' | 'ai' | null;
type TemplateMethod = 'manual' | 'ai' | null;

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<'user-info' | 'lead-gen' | 'lead-manual' | 'outreach' | 'templates' | 'summary'>('user-info');
  const [leadGenMethod, setLeadGenMethod] = useState<LeadGenMethod>('ai');
  const [outreachMethod, setOutreachMethod] = useState<OutreachMethod>(null);
  const [templateMethod, setTemplateMethod] = useState<TemplateMethod>(null);
  const [mounted, setMounted] = useState(false);
  const [currentOfferingIndex, setCurrentOfferingIndex] = useState(0);
  const [followupStrategy, setFollowupStrategy] = useState<Record<string, 'same' | 'custom'>>({});
  const [aiPrompt, setAiPrompt] = useState('');

  // Generate stable random values for animated orbs
  const [orbs] = useState(() => 
    [...Array(8)].map((_, i) => ({
      width: Math.random() * 400 + 250,
      height: Math.random() * 400 + 250,
      left: Math.random() * 100,
      top: Math.random() * 100,
      x: [Math.random() * 150 - 75, Math.random() * 150 - 75, Math.random() * 150 - 75],
      y: [Math.random() * 150 - 75, Math.random() * 150 - 75, Math.random() * 150 - 75],
      duration: 15 + Math.random() * 10,
      delay: i * 1.5,
    }))
  );

  // Generate stable random values for floating particles
  const [particles] = useState(() =>
    [...Array(30)].map((_, i) => ({
      x: Math.random() * 200 - 100,
      duration: 6 + Math.random() * 4,
      delay: Math.random() * 6,
      left: Math.random() * 100,
      scale: 0.5 + Math.random() * 0.5,
    }))
  );

  // Generate stable random values for 3D cubes
  const [cubes] = useState(() =>
    [...Array(12)].map((_, i) => ({
      size: Math.random() * 80 + 40,
      left: Math.random() * 100,
      top: Math.random() * 100,
      rotateX: Math.random() * 360,
      rotateY: Math.random() * 360,
      rotateZ: Math.random() * 360,
      duration: 20 + Math.random() * 15,
      delay: i * 1.2,
    }))
  );

  useEffect(() => {
    setMounted(true);
    console.log('Onboarding mounted - animations should render');
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    // User Information (Form 0)
    userName: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    companyName: '',
    websiteUrl: '',
    painPoints: ['', '', ''],
    valueProposition: ['', '', ''],
    callToAction: '',
    companyOverview: '',
    additionalContext: '',
    // Prospect Generation (Form 1)
    industry: '',
    offerings: [] as string[],
    category: '',
    companySize: '',
    location: '',
    keywords: [] as string[],
    dataSources: [] as string[],
    scrapingFrequency: '',
    // Outreach Configuration (Form 2)
    outreachChannels: [] as string[],
    followUpCount: '',
    followUpFrequency: '',
    outreachGoals: [] as string[],
    startTime: '',
    testDummyReach: false,
    testFrom: '',
    testTo: '',
    testSubject: '',
    testBody: '',
    // Templates (Form 3)
    templates: {} as Record<string, string>
  });

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: (prev[key as keyof typeof prev] as string[]).includes(value)
        ? (prev[key as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[key as keyof typeof prev] as string[]), value]
    }));
  };

  const getProgress = () => {
    switch (currentStep) {
      case 'user-info': return 10;
      case 'lead-gen': return 30;
      case 'lead-manual': return 40;
      case 'outreach': return 60;
      case 'templates': return 80;
      case 'summary': return 100;
      default: return 0;
    }
  };

  const updatePainPoint = (index: number, value: string) => {
    const newPainPoints = [...formData.painPoints];
    newPainPoints[index] = value;
    setFormData(prev => ({ ...prev, painPoints: newPainPoints }));
  };

  const updateValueProp = (index: number, value: string) => {
    const newValueProps = [...formData.valueProposition];
    newValueProps[index] = value;
    setFormData(prev => ({ ...prev, valueProposition: newValueProps }));
  };

  const handleComplete = () => {
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-l from-primary/10 to-transparent rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-secondary/10 to-transparent rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Enhanced Animated Background */}
        {mounted && (
          <>
            {/* Test Marker - Remove after confirming animations work */}
            <motion.div
              className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-lg font-bold z-50"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              3D Animations Active!
            </motion.div>

            {/* Animated Mesh Gradient Background */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(at 40% 20%, hsl(200 72% 50% / 0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, hsl(196 81% 54% / 0.08) 0px, transparent 50%), radial-gradient(at 0% 50%, hsl(220 70% 55% / 0.08) 0px, transparent 50%), radial-gradient(at 80% 50%, hsl(200 72% 50% / 0.08) 0px, transparent 50%), radial-gradient(at 0% 100%, hsl(196 81% 54% / 0.08) 0px, transparent 50%), radial-gradient(at 80% 100%, hsl(220 70% 55% / 0.08) 0px, transparent 50%), radial-gradient(at 0% 0%, hsl(200 72% 50% / 0.08) 0px, transparent 50%)',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Spotlight Effects */}
            <motion.div
              className="absolute w-[800px] h-[800px] rounded-full"
              style={{
                background: 'radial-gradient(circle, hsl(200 72% 50% / 0.25), transparent 70%)',
                filter: 'blur(80px)',
              }}
              animate={{
                x: ['10%', '70%', '10%'],
                y: ['10%', '60%', '10%'],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full"
              style={{
                background: 'radial-gradient(circle, hsl(196 81% 54% / 0.22), transparent 70%)',
                filter: 'blur(80px)',
              }}
              animate={{
                x: ['80%', '20%', '80%'],
                y: ['80%', '30%', '80%'],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Wave Animation */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-96 opacity-20"
              style={{
                background: 'linear-gradient(0deg, hsl(200 72% 50% / 0.1), transparent)',
              }}
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Gradient Orbs with smooth animations */}
            {orbs.map((orb, i) => (
              <motion.div
                key={`orb-${i}`}
                className="absolute rounded-full filter blur-3xl"
                style={{
                  width: orb.width,
                  height: orb.height,
                  left: `${orb.left}%`,
                  top: `${orb.top}%`,
                  background: i % 3 === 0 
                    ? 'radial-gradient(circle, hsl(200 72% 50% / 0.15), transparent)'
                    : i % 3 === 1
                    ? 'radial-gradient(circle, hsl(196 81% 54% / 0.15), transparent)'
                    : 'radial-gradient(circle, hsl(220 70% 55% / 0.12), transparent)',
                }}
                animate={{
                  x: orb.x,
                  y: orb.y,
                  scale: [1, 1.15, 0.95, 1],
                  opacity: [0.3, 0.5, 0.4, 0.3],
                }}
                transition={{
                  duration: orb.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: orb.delay,
                }}
              />
            ))}

            {/* Floating Particles */}
            {particles.map((particle, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute bg-primary/30 rounded-full"
                style={{
                  width: particle.scale * 8,
                  height: particle.scale * 8,
                  left: `${particle.left}%`,
                  bottom: 0,
                }}
                animate={{
                  y: [-20, -1200],
                  x: [0, particle.x],
                  opacity: [0, 0.8, 0.6, 0],
                  scale: [particle.scale, particle.scale * 1.2, particle.scale],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "linear",
                }}
              />
            ))}

            {/* Connection Lines Effect */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(200 72% 50%)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="hsl(196 81% 54%)" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              {[...Array(5)].map((_, i) => (
                <motion.line
                  key={`line-${i}`}
                  x1={`${(i * 25)}%`}
                  y1="0%"
                  x2={`${(i * 25 + 50) % 100}%`}
                  y2="100%"
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.7,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </svg>

            {/* Animated Dots Matrix */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={`dot-${i}`}
                  className="absolute w-1 h-1 rounded-full bg-primary"
                  style={{
                    left: `${(i * 5.26) % 100}%`,
                    top: `${(i * 7.5) % 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Aurora Effect */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[500px]"
              style={{
                background: 'linear-gradient(180deg, hsl(200 72% 50% / 0.05), hsl(196 81% 54% / 0.03), transparent)',
                filter: 'blur(60px)',
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scaleY: [1, 1.1, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Rotating Gradient Rings */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] -translate-x-1/2 -translate-y-1/2"
              style={{
                background: 'conic-gradient(from 0deg, transparent, hsl(200 72% 50% / 0.05), transparent 30%)',
                borderRadius: '50%',
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* 3D Floating Cubes */}
            <div className="absolute inset-0" style={{ perspective: '1000px' }}>
              {cubes.map((cube, i) => (
                <motion.div
                  key={`cube-${i}`}
                  className="absolute"
                  style={{
                    width: cube.size,
                    height: cube.size,
                    left: `${cube.left}%`,
                    top: `${cube.top}%`,
                    transformStyle: 'preserve-3d',
                  }}
                  animate={{
                    rotateX: [cube.rotateX, cube.rotateX + 360],
                    rotateY: [cube.rotateY, cube.rotateY + 360],
                    rotateZ: [cube.rotateZ, cube.rotateZ + 180],
                    y: [0, -50, 0, 50, 0],
                    x: [0, 30, 0, -30, 0],
                  }}
                  transition={{
                    duration: cube.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: cube.delay,
                  }}
                >
                  {/* Cube faces */}
                  <div
                    className="absolute inset-0 border-2 border-primary/40 bg-gradient-to-br from-primary/20 to-secondary/10 backdrop-blur-sm shadow-lg"
                    style={{
                      transform: `translateZ(${cube.size / 2}px)`,
                      boxShadow: '0 0 20px rgba(36, 158, 219, 0.3)',
                    }}
                  />
                  <div
                    className="absolute inset-0 border-2 border-primary/40 bg-gradient-to-br from-primary/20 to-secondary/10 backdrop-blur-sm shadow-lg"
                    style={{
                      transform: `rotateY(180deg) translateZ(${cube.size / 2}px)`,
                      boxShadow: '0 0 20px rgba(36, 158, 219, 0.3)',
                    }}
                  />
                  <div
                    className="absolute inset-0 border-2 border-secondary/40 bg-gradient-to-br from-secondary/20 to-primary/10 backdrop-blur-sm shadow-lg"
                    style={{
                      transform: `rotateY(90deg) translateZ(${cube.size / 2}px)`,
                      boxShadow: '0 0 20px rgba(43, 182, 233, 0.3)',
                    }}
                  />
                  <div
                    className="absolute inset-0 border-2 border-secondary/40 bg-gradient-to-br from-secondary/20 to-primary/10 backdrop-blur-sm shadow-lg"
                    style={{
                      transform: `rotateY(-90deg) translateZ(${cube.size / 2}px)`,
                      boxShadow: '0 0 20px rgba(43, 182, 233, 0.3)',
                    }}
                  />
                  <div
                    className="absolute inset-0 border-2 border-primary/40 bg-gradient-to-br from-primary/20 to-secondary/10 backdrop-blur-sm shadow-lg"
                    style={{
                      transform: `rotateX(90deg) translateZ(${cube.size / 2}px)`,
                      boxShadow: '0 0 20px rgba(36, 158, 219, 0.3)',
                    }}
                  />
                  <div
                    className="absolute inset-0 border-2 border-primary/40 bg-gradient-to-br from-primary/20 to-secondary/10 backdrop-blur-sm shadow-lg"
                    style={{
                      transform: `rotateX(-90deg) translateZ(${cube.size / 2}px)`,
                      boxShadow: '0 0 20px rgba(36, 158, 219, 0.3)',
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* 3D Rotating Pyramids */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`pyramid-${i}`}
                className="absolute"
                style={{
                  width: 60 + i * 10,
                  height: 60 + i * 10,
                  left: `${(i * 17 + 8) % 90}%`,
                  top: `${(i * 23 + 15) % 85}%`,
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                }}
                animate={{
                  rotateX: [0, 360],
                  rotateY: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 25 + i * 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 2,
                }}
              >
                <div
                  className="absolute inset-0 border-2 border-secondary/40 bg-gradient-to-br from-secondary/25 to-primary/15 shadow-lg"
                  style={{
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    transform: 'rotateY(0deg)',
                    boxShadow: '0 0 20px rgba(43, 182, 233, 0.4)',
                  }}
                />
              </motion.div>
            ))}

            {/* 3D Rings */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute rounded-full border-2 border-primary/30 shadow-lg"
                style={{
                  width: 100 + i * 50,
                  height: 100 + i * 50,
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 0 30px rgba(36, 158, 219, 0.3), inset 0 0 20px rgba(36, 158, 219, 0.2)',
                }}
                animate={{
                  rotateX: [0, 360],
                  rotateY: [360, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 15 + i * 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 1.5,
                }}
              />
            ))}

            {/* Floating 3D Cards */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`card-${i}`}
                className="absolute w-32 h-40 rounded-lg border-2 border-primary/40 bg-gradient-to-br from-primary/15 to-secondary/15 backdrop-blur-md shadow-2xl"
                style={{
                  left: `${(i * 12.5) % 90}%`,
                  top: `${(i * 15) % 80}%`,
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 0 30px rgba(36, 158, 219, 0.3), 0 20px 40px rgba(0, 0, 0, 0.3)',
                }}
                animate={{
                  rotateY: [0, 15, -15, 0],
                  rotateX: [0, -10, 10, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 1,
                }}
              />
            ))}
          </>
        )}
        
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Top Navigation */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-card/60 backdrop-blur-xl border-b border-border shadow-lg shadow-primary/5"
      >
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div 
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg font-semibold text-foreground"
                >
                  SalesAI Setup
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xs text-muted-foreground"
                >
                  Configure your workspace
                </motion.p>
              </div>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <Badge variant="secondary" className="text-xs px-3 py-1">
                Step {currentStep === 'lead-gen' || currentStep === 'lead-manual' ? 1 : currentStep === 'outreach' ? 2 : currentStep === 'templates' ? 3 : 4} of 4
              </Badge>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      {true && (
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="fixed top-[73px] left-0 right-0 z-40 origin-left"
        >
          <Progress value={getProgress()} className="h-1 rounded-none" />
        </motion.div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-32 pb-12">
        <AnimatePresence mode="wait">
          {/* Step 0: User Information */}
          {currentStep === 'user-info' && (
            <motion.div
              key="user-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-8">
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4"
                >
                  <User className="w-8 h-8 text-primary" />
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-foreground mb-2"
                >
                  User Information
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground text-lg"
                >
                  Tell us about yourself and your company
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Card className="shadow-2xl border-border bg-card/70 backdrop-blur-xl overflow-hidden">
                  <CardContent className="p-8 space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="userName" className="text-sm font-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          User Name
                        </Label>
                        <Input
                          id="userName"
                          value={formData.userName}
                          onChange={(e) => updateFormData('userName', e.target.value)}
                          placeholder="John Doe"
                          className="bg-background border-border shadow-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          placeholder="john@company.com"
                          className="bg-background border-border shadow-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                          Phone Number <span className="text-xs text-muted-foreground">(Optional)</span>
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="bg-background border-border shadow-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="linkedinUrl" className="text-sm font-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          LinkedIn URL
                        </Label>
                        <Input
                          id="linkedinUrl"
                          value={formData.linkedinUrl}
                          onChange={(e) => updateFormData('linkedinUrl', e.target.value)}
                          placeholder="https://linkedin.com/in/johndoe"
                          className="bg-background border-border shadow-sm"
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Company Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="companyName" className="text-sm font-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          Company or Product Name
                        </Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => updateFormData('companyName', e.target.value)}
                          placeholder="Acme Corp"
                          className="bg-background border-border shadow-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="websiteUrl" className="text-sm font-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          Website URL
                        </Label>
                        <Input
                          id="websiteUrl"
                          value={formData.websiteUrl}
                          onChange={(e) => updateFormData('websiteUrl', e.target.value)}
                          placeholder="https://acme.com"
                          className="bg-background border-border shadow-sm"
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Pain Points */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        Customer Pain Points <span className="text-xs text-muted-foreground">(At least 3)</span>
                      </Label>
                      <p className="text-sm text-muted-foreground">Add pain points your product or service is solving</p>
                      {formData.painPoints.map((point, index) => (
                        <Input
                          key={`pain-${index}`}
                          value={point}
                          onChange={(e) => updatePainPoint(index, e.target.value)}
                          placeholder={`Pain point ${index + 1}`}
                          className="bg-background border-border shadow-sm"
                        />
                      ))}
                    </div>

                    <Separator />

                    {/* Value Proposition */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        Value Proposition <span className="text-xs text-muted-foreground">(At least 3 benefits)</span>
                      </Label>
                      <p className="text-sm text-muted-foreground">Add benefits of using your product/service</p>
                      {formData.valueProposition.map((prop, index) => (
                        <Input
                          key={`value-${index}`}
                          value={prop}
                          onChange={(e) => updateValueProp(index, e.target.value)}
                          placeholder={`Benefit ${index + 1}`}
                          className="bg-background border-border shadow-sm"
                        />
                      ))}
                    </div>

                    <Separator />

                    {/* Call to Action */}
                    <div className="space-y-2">
                      <Label htmlFor="callToAction" className="text-sm font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        Call-to-Action
                      </Label>
                      <p className="text-sm text-muted-foreground mb-2">Add an action you want the recipient to take</p>
                      <Input
                        id="callToAction"
                        value={formData.callToAction}
                        onChange={(e) => updateFormData('callToAction', e.target.value)}
                        placeholder="E.g. Book a meeting, Start free trial"
                        className="bg-background border-border shadow-sm"
                      />
                    </div>

                    <Separator />

                    {/* Company Overview */}
                    <div className="space-y-2">
                      <Label htmlFor="companyOverview" className="text-sm font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        Company Overview
                      </Label>
                      <p className="text-sm text-muted-foreground mb-2">Add a brief description of what your company or product does</p>
                      <Textarea
                        id="companyOverview"
                        value={formData.companyOverview}
                        onChange={(e) => updateFormData('companyOverview', e.target.value)}
                        placeholder="Tell us about your company..."
                        className="min-h-[100px] bg-background border-border shadow-sm"
                      />
                    </div>

                    <Separator />

                    {/* Additional Context */}
                    <div className="space-y-2">
                      <Label htmlFor="additionalContext" className="text-sm font-medium flex items-center gap-2">
                        Additional Context <span className="text-xs text-muted-foreground">(Optional)</span>
                      </Label>
                      <p className="text-sm text-muted-foreground mb-2">Add other details, such as a customer quote, to enhance the content</p>
                      <Textarea
                        id="additionalContext"
                        value={formData.additionalContext}
                        onChange={(e) => updateFormData('additionalContext', e.target.value)}
                        placeholder="Any additional information..."
                        className="min-h-[80px] bg-background border-border shadow-sm"
                      />
                    </div>

                    <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border/50">
                      <Button 
                        className="px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
                        onClick={() => setCurrentStep('lead-gen')}
                      >
                        Continue <ChevronRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {/* Step 1: Lead Generation */}
          {currentStep === 'lead-gen' && (
            <motion.div
              key="lead-gen"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-8">
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4"
                >
                  <Target className="w-8 h-8 text-primary" />
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-foreground mb-2"
                >
                  Lead Generation
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground text-lg"
                >
                  Configure how you'd like to generate and manage leads
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Card className="shadow-2xl border-border bg-card/70 backdrop-blur-xl overflow-hidden">
                  <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/10 to-secondary/10">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center gap-3"
                    >
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30"
                      >
                        <span className="text-white font-bold">1</span>
                      </motion.div>
                      <div>
                        <CardTitle className="text-xl">Choose Generation Method</CardTitle>
                        <CardDescription>Select how you want to import or generate leads</CardDescription>
                      </div>
                    </motion.div>
                  </CardHeader>
                  
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
                        whileHover={{ y: -8, scale: 1.03 }} 
                        whileTap={{ scale: 0.97 }}
                      >
                        <Card 
                          className={`cursor-pointer transition-all duration-300 border-2 ${
                            leadGenMethod === 'manual' 
                              ? 'border-primary shadow-2xl shadow-primary/30 bg-card/90' 
                              : 'border-border hover:border-primary/50 bg-card/60 hover:shadow-xl hover:shadow-primary/10'
                          } backdrop-blur-sm`}
                          onClick={() => setLeadGenMethod('manual')}
                        >
                        <CardHeader className="text-center pb-6">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mx-auto mb-4 shadow-xl shadow-primary/40">
                            <User className="w-8 h-8 text-white" />
                          </div>
                          <CardTitle className="text-lg mb-2 font-bold">Manual Import</CardTitle>
                          <CardDescription className="text-sm font-light">Upload your existing lead database via CSV file</CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                        whileHover={{ y: -8, scale: 1.03 }} 
                        whileTap={{ scale: 0.97 }}
                      >
                        <Card 
                          className={`cursor-pointer transition-all duration-300 border-2 ${
                            leadGenMethod === 'ai' 
                              ? 'border-primary shadow-2xl shadow-primary/30 bg-card/90' 
                              : 'border-border hover:border-primary/50 bg-card/60 hover:shadow-xl hover:shadow-primary/10'
                          } backdrop-blur-sm`}
                          onClick={() => setLeadGenMethod('ai')}
                        >
                        <CardHeader className="text-center pb-6">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mx-auto mb-4 shadow-xl shadow-primary/40">
                            <Bot className="w-8 h-8 text-white" />
                          </div>
                          <CardTitle className="text-lg mb-2 font-bold">AI Generated</CardTitle>
                          <CardDescription className="text-sm font-light">Let AI automatically find and enrich leads for you</CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  </div>

                  {leadGenMethod === 'ai' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-6"
                    >
                      <Separator className="my-6" />
                      
                      <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-primary" />
                          Target Company Profile
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="industry" className="text-sm font-medium flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                              Industry
                            </Label>
                            <Select value={formData.industry} onValueChange={(value) => updateFormData('industry', value)}>
                              <SelectTrigger id="industry" className="bg-background border-border shadow-sm">
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="technology">Technology</SelectItem>
                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                                <SelectItem value="retail">Retail</SelectItem>
                                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="category" className="text-sm font-medium flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                              Category
                            </Label>
                            <Select value={formData.category} onValueChange={(value) => updateFormData('category', value)}>
                              <SelectTrigger id="category" className="bg-background border-border shadow-sm">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="b2b">B2B</SelectItem>
                                <SelectItem value="b2c">B2C</SelectItem>
                                <SelectItem value="b2b2c">B2B2C</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="companySize" className="text-sm font-medium flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                              Company Size
                            </Label>
                            <Select value={formData.companySize} onValueChange={(value) => updateFormData('companySize', value)}>
                              <SelectTrigger id="companySize" className="bg-background border-border shadow-sm">
                                <SelectValue placeholder="Select company size" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1-10">1-10 employees</SelectItem>
                                <SelectItem value="11-50">11-50 employees</SelectItem>
                                <SelectItem value="51-200">51-200 employees</SelectItem>
                                <SelectItem value="201-500">201-500 employees</SelectItem>
                                <SelectItem value="501+">501+ employees</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                              Location
                            </Label>
                            <Select value={formData.location} onValueChange={(value) => updateFormData('location', value)}>
                              <SelectTrigger id="location" className="bg-background border-border shadow-sm">
                                <SelectValue placeholder="Select location" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="north-america">North America</SelectItem>
                                <SelectItem value="europe">Europe</SelectItem>
                                <SelectItem value="asia">Asia</SelectItem>
                                <SelectItem value="global">Global</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Tags className="w-4 h-4 text-primary" />
                          Offerings & Keywords
                        </h3>

                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium mb-3 block">Offerings (Select multiple)</Label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {['SaaS', 'Hardware', 'Consulting', 'Training', 'Support', 'Integration'].map((offering) => (
                                <div key={offering} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={offering}
                                    checked={formData.offerings.includes(offering)}
                                    onCheckedChange={() => toggleArrayItem('offerings', offering)}
                                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                  />
                                  <label htmlFor={offering} className="text-sm text-foreground cursor-pointer select-none">
                                    {offering}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <Label className="text-sm font-medium mb-3 block">Keywords (Select multiple)</Label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {['AI', 'Cloud', 'Sales', 'Marketing', 'Analytics', 'CRM'].map((keyword) => (
                                <div key={keyword} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`keyword-${keyword}`}
                                    checked={formData.keywords.includes(keyword)}
                                    onCheckedChange={() => toggleArrayItem('keywords', keyword)}
                                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                  />
                                  <label htmlFor={`keyword-${keyword}`} className="text-sm text-foreground cursor-pointer select-none">
                                    {keyword}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Database className="w-4 h-4 text-primary" />
                          Data Sources & Frequency
                        </h3>

                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium mb-3 block">Data Sources (Select multiple)</Label>
                            <div className="space-y-2">
                              {['LinkedIn Sales Navigator', 'Apollo', 'Clay'].map((source) => (
                                <div key={source} className="flex items-center space-x-2 p-3 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors">
                                  <Checkbox 
                                    id={source}
                                    checked={formData.dataSources.includes(source)}
                                    onCheckedChange={() => toggleArrayItem('dataSources', source)}
                                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                  />
                                  <label htmlFor={source} className="text-sm text-foreground cursor-pointer select-none flex-1">
                                    {source}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="scrapingFrequency" className="text-sm font-medium flex items-center gap-2">
                              <Clock className="w-4 h-4 text-primary" />
                              Scraping Frequency
                            </Label>
                            <Select value={formData.scrapingFrequency} onValueChange={(value) => updateFormData('scrapingFrequency', value)}>
                              <SelectTrigger id="scrapingFrequency" className="bg-background border-border shadow-sm">
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex justify-between gap-3 mt-8 pt-6 border-t border-border/50">
                    <Button variant="outline" onClick={() => router.push('/login')} className="px-6">
                      Back
                    </Button>
                    {leadGenMethod && (
                      <Button 
                        className="px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
                        onClick={() => leadGenMethod === 'manual' ? setCurrentStep('lead-manual') : setCurrentStep('outreach')}
                      >
                        Continue <ChevronRight className="ml-2 w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            </motion.div>
          )}

          {/* Manual Import Step */}
          {currentStep === 'lead-manual' && (
            <motion.div
              key="lead-manual"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-8">
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4"
                >
                  <Upload className="w-8 h-8 text-primary" />
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-foreground mb-2"
                >
                  Import Your Leads
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground text-lg"
                >
                  Upload a CSV file with your existing lead data
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Card className="shadow-2xl border-border bg-card/70 backdrop-blur-xl">
                  <CardContent className="p-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ scale: 1.02, borderColor: "hsl(200 72% 50% / 0.5)" }}
                      className="border-2 border-dashed border-border rounded-2xl p-16 text-center hover:border-primary/50 transition-colors cursor-pointer bg-card/30 hover:bg-card/50 backdrop-blur-sm"
                    >
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      </motion.div>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-foreground font-semibold text-lg mb-2"
                      >
                        Drop your CSV file here
                      </motion.p>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-sm text-muted-foreground mb-6"
                      >
                        or click to browse from your computer
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300">
                          Choose File
                        </Button>
                      </motion.div>
                    </motion.div>

                  <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
                    <Download className="w-4 h-4" />
                    <a href="#" className="text-primary hover:underline font-medium">
                      Download CSV template
                    </a>
                  </div>

                  <div className="flex justify-between gap-3 mt-8 pt-6 border-t border-border/50">
                    <Button variant="outline" onClick={() => setCurrentStep('lead-gen')} className="px-6">
                      Back
                    </Button>
                    <Button 
                      className="px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
                      onClick={() => setCurrentStep('outreach')}
                    >
                      Continue <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            </motion.div>
          )}

          {/* Outreach Step */}
          {currentStep === 'outreach' && (
            <motion.div
              key="outreach"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-8">
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/10 mb-4"
                >
                  <Mail className="w-8 h-8 text-secondary" />
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-foreground mb-2"
                >
                  Outreach Configuration
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground text-lg"
                >
                  Set up your automated outreach strategy
                </motion.p>
              </div>

              <Card className="shadow-2xl border-border bg-card/70 backdrop-blur-xl">
                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/10 to-secondary/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <CardTitle className="text-xl">Choose Outreach Method</CardTitle>
                      <CardDescription>Configure how you want to engage with leads</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Card 
                        className={`cursor-pointer transition-all border-2 ${
                          outreachMethod === 'manual' 
                            ? 'border-secondary shadow-lg shadow-secondary/20 bg-secondary/5' 
                            : 'border-border hover:border-secondary/50 bg-card'
                        }`}
                        onClick={() => setOutreachMethod('manual')}
                      >
                        <CardHeader className="text-center pb-6">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mx-auto mb-4 shadow-xl shadow-primary/40">
                            <User className="w-8 h-8 text-white" />
                          </div>
                          <CardTitle className="text-lg mb-2">Manual</CardTitle>
                          <CardDescription className="text-sm">You control every outreach interaction</CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Card 
                        className={`cursor-pointer transition-all border-2 ${
                          outreachMethod === 'ai' 
                            ? 'border-secondary shadow-lg shadow-secondary/20 bg-secondary/5' 
                            : 'border-border hover:border-secondary/50 bg-card'
                        }`}
                        onClick={() => setOutreachMethod('ai')}
                      >
                        <CardHeader className="text-center pb-6">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-primary mx-auto mb-4 shadow-lg">
                            <Bot className="w-8 h-8 text-white" />
                          </div>
                          <CardTitle className="text-lg mb-2">AI Automated</CardTitle>
                          <CardDescription className="text-sm">Let AI handle outreach automatically</CardDescription>
                        </CardHeader>
                      </Card>
                    </motion.div>
                  </div>

                  {outreachMethod === 'ai' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-6"
                    >
                      <Separator />

                      <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                        <h3 className="text-sm font-semibold text-foreground mb-4">Outreach Channels</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {['Cold Calling', 'Cold Mailing', 'LinkedIn DM', 'WhatsApp DM'].map((channel) => (
                            <div key={channel} className="flex items-center space-x-2 p-3 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors">
                              <Checkbox 
                                id={channel}
                                checked={formData.outreachChannels.includes(channel)}
                                onCheckedChange={() => toggleArrayItem('outreachChannels', channel)}
                                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                              />
                              <label htmlFor={channel} className="text-sm text-foreground cursor-pointer select-none flex-1">
                                {channel}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                          <Label htmlFor="followUpCount" className="text-sm font-medium mb-3 block">Number of Follow-ups</Label>
                          <Select value={formData.followUpCount} onValueChange={(value) => updateFormData('followUpCount', value)}>
                            <SelectTrigger id="followUpCount" className="bg-background border-border shadow-sm">
                              <SelectValue placeholder="Select number" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 Follow-up</SelectItem>
                              <SelectItem value="2">2 Follow-ups</SelectItem>
                              <SelectItem value="3">3 Follow-ups</SelectItem>
                              <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                          <Label htmlFor="followUpFrequency" className="text-sm font-medium mb-3 block">Follow-up Frequency</Label>
                          <Select value={formData.followUpFrequency} onValueChange={(value) => updateFormData('followUpFrequency', value)}>
                            <SelectTrigger id="followUpFrequency" className="bg-background border-border shadow-sm">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="biweekly">Bi-weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {formData.followUpCount === 'custom' && (
                        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                          <Label htmlFor="customFollowUpCount" className="text-sm font-medium mb-3 block">Custom Number of Follow-ups</Label>
                          <Input
                            id="customFollowUpCount"
                            type="number"
                            min="1"
                            placeholder="Enter number"
                            className="bg-background border-border shadow-sm"
                          />
                        </div>
                      )}

                      {formData.followUpFrequency === 'custom' && (
                        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                          <Label htmlFor="customFrequency" className="text-sm font-medium mb-3 block">Custom Frequency (in days)</Label>
                          <Input
                            id="customFrequency"
                            type="number"
                            min="1"
                            placeholder="Enter days"
                            className="bg-background border-border shadow-sm"
                          />
                        </div>
                      )}

                      <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                        <Label htmlFor="timeOfFollowUp" className="text-sm font-medium mb-3 block">Time of Follow-up</Label>
                        <Input
                          id="timeOfFollowUp"
                          type="time"
                          className="bg-background border-border shadow-sm"
                        />
                      </div>

                      <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                        <Label htmlFor="startTime" className="text-sm font-medium mb-3 block">When to start Automated Outreach</Label>
                        <Select value={formData.startTime} onValueChange={(value) => updateFormData('startTime', value)}>
                          <SelectTrigger id="startTime" className="bg-background border-border shadow-sm">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="test">Test Dummy Reach</SelectItem>
                            <SelectItem value="immediately">Immediately</SelectItem>
                            <SelectItem value="custom">Custom Date & Time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.startTime === 'custom' && (
                        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border space-y-4">
                          <div>
                            <Label htmlFor="customDate" className="text-sm font-medium mb-2 block">Select Date</Label>
                            <Input
                              id="customDate"
                              type="date"
                              className="bg-background border-border shadow-sm"
                            />
                          </div>
                          <div>
                            <Label htmlFor="customTime" className="text-sm font-medium mb-2 block">Select Time</Label>
                            <Input
                              id="customTime"
                              type="time"
                              className="bg-background border-border shadow-sm"
                            />
                          </div>
                        </div>
                      )}

                      {formData.startTime === 'test' && (
                        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl p-6 border border-orange-500/20">
                          <div className="flex items-start gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-orange-500/20">
                              <AlertCircle className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground mb-1">Test Dummy Reach</h4>
                              <p className="text-sm text-muted-foreground mb-4">
                                We will not send emails to leads. Test your templates internally.
                              </p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="testFrom" className="text-sm font-medium mb-2 block">From</Label>
                                <Input
                                  id="testFrom"
                                  type="email"
                                  value={formData.testFrom}
                                  onChange={(e) => updateFormData('testFrom', e.target.value)}
                                  placeholder="sender@company.com"
                                  className="bg-background border-border shadow-sm"
                                />
                              </div>
                              <div>
                                <Label htmlFor="testTo" className="text-sm font-medium mb-2 block">To</Label>
                                <Input
                                  id="testTo"
                                  type="email"
                                  value={formData.testTo}
                                  onChange={(e) => updateFormData('testTo', e.target.value)}
                                  placeholder="recipient@company.com"
                                  className="bg-background border-border shadow-sm"
                                />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="testSubject" className="text-sm font-medium mb-2 block">Subject</Label>
                              <Input
                                id="testSubject"
                                value={formData.testSubject}
                                onChange={(e) => updateFormData('testSubject', e.target.value)}
                                placeholder="Your test email subject"
                                className="bg-background border-border shadow-sm"
                              />
                            </div>

                            <div>
                              <Label htmlFor="testBody" className="text-sm font-medium mb-2 block">Body (Select from templates)</Label>
                              <Textarea
                                id="testBody"
                                value={formData.testBody}
                                onChange={(e) => updateFormData('testBody', e.target.value)}
                                placeholder="Your test email body..."
                                className="min-h-[120px] bg-background border-border shadow-sm"
                              />
                            </div>

                            <div className="bg-background/50 rounded-lg p-4 border border-border">
                              <p className="text-sm text-muted-foreground italic">
                                📝 Note: You have to change this from settings in order to start automated outreach
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  <div className="flex justify-between gap-3 mt-8 pt-6 border-t border-border/50">
                    <Button variant="outline" onClick={() => setCurrentStep(leadGenMethod === 'manual' ? 'lead-manual' : 'lead-gen')} className="px-6">
                      Back
                    </Button>
                    <div className="flex gap-3">
                      <Button 
                        variant="outline"
                        onClick={() => setCurrentStep('summary')}
                        className="px-6 border-secondary/50 text-secondary hover:bg-secondary/10"
                      >
                        Skip
                      </Button>
                      {outreachMethod && (
                        <Button 
                          className="px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
                          onClick={() => outreachMethod === 'manual' ? setCurrentStep('summary') : setCurrentStep('templates')}
                        >
                          Continue <ChevronRight className="ml-2 w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Templates Step */}
          {currentStep === 'templates' && (
            <motion.div
              key="templates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-8">
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4"
                >
                  <Mail className="w-8 h-8 text-primary" />
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-foreground mb-2"
                >
                  Outreach Templates
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground text-lg"
                >
                  Customize templates for each offering
                </motion.p>
              </div>

              <Card className="shadow-2xl border-border bg-card/70 backdrop-blur-xl">
                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/10 to-secondary/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div>
                      <CardTitle className="text-xl">Configure Message Templates</CardTitle>
                      <CardDescription>Create or use AI-generated templates for your outreach</CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  {formData.offerings.length > 0 ? (
                    <div>
                      {formData.offerings.map((offering, offeringIndex) => (
                        offeringIndex === currentOfferingIndex ? (
                          <motion.div 
                            key={offering}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gradient-to-br from-muted/50 to-muted/20 rounded-2xl p-8 border-2 border-border/50 shadow-lg"
                          >
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/30">
                                  <Target className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold text-foreground">{offering}</h3>
                                  <p className="text-sm text-muted-foreground">Configure 3 templates for this offering</p>
                                </div>
                              </div>
                              <Badge className="bg-primary/10 text-primary border-primary/20">
                                {offeringIndex + 1} of {formData.offerings.length}
                              </Badge>
                            </div>

                          {/* Template 1: Outreach */}
                          <div className="space-y-4 mb-6 bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                  1
                                </div>
                                <Label className="text-base font-semibold">Outreach Template</Label>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-2 border-primary/30 hover:bg-primary/10"
                                onClick={() => {
                                  const promptInput = document.getElementById(`outreach-prompt-${offering}`) as HTMLInputElement;
                                  const prompt = promptInput?.value || '';
                                  const aiTemplate = `Hi {{FirstName}},\n\n${prompt || `I noticed ${formData.companyName} specializes in ${offering}. We help companies automate their sales with AI-powered solutions.`}\n\n${formData.callToAction || 'Would you be open to a quick chat?'}\n\nBest regards,\n{{YourName}}`;
                                  setFormData(prev => ({
                                    ...prev,
                                    templates: {
                                      ...prev.templates,
                                      [`${offering}-outreach`]: aiTemplate
                                    }
                                  }));
                                  if (promptInput) promptInput.value = '';
                                }}
                              >
                                <Sparkles className="w-4 h-4" />
                                Generate using AI
                              </Button>
                            </div>
                            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/10">
                              <Label htmlFor={`outreach-prompt-${offering}`} className="text-sm font-medium mb-2 block">
                                AI Generation Prompt (Optional)
                              </Label>
                              <Input
                                id={`outreach-prompt-${offering}`}
                                placeholder="E.g., Focus on cost savings and automation benefits..."
                                className="bg-background/50"
                              />
                              <p className="text-xs text-muted-foreground mt-2">
                                Leave empty for auto-generated template based on your company info
                              </p>
                            </div>
                            <Textarea
                              placeholder="Hi {{FirstName}},&#10;&#10;Your outreach message here...&#10;&#10;Best regards,&#10;{{YourName}}"
                              className="min-h-[140px] bg-background border-border font-mono text-sm"
                              value={formData.templates[`${offering}-outreach`] || ''}
                              onChange={(e) => {
                                setFormData(prev => ({
                                  ...prev,
                                  templates: {
                                    ...prev.templates,
                                    [`${offering}-outreach`]: e.target.value
                                  }
                                }));
                              }}
                            />
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  const link = window.prompt('Enter link to insert:');
                                  if (link) {
                                    const currentValue = formData.templates[`${offering}-outreach`] || '';
                                    setFormData(prev => ({
                                      ...prev,
                                      templates: {
                                        ...prev.templates,
                                        [`${offering}-outreach`]: currentValue + ` ${link}`
                                      }
                                    }));
                                  }
                                }}
                              >
                                <Link2 className="w-4 h-4 mr-2" />
                                Insert Link
                              </Button>
                            </div>
                          </div>

                          {/* Template 2: Follow-up */}
                          <div className="space-y-4 mb-6 bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                  2
                                </div>
                                <Label className="text-base font-semibold">Follow-up Template</Label>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-2 border-primary/30 hover:bg-primary/10"
                                onClick={() => {
                                  const promptInput = document.getElementById(`followup-prompt-${offering}`) as HTMLInputElement;
                                  const prompt = promptInput?.value || '';
                                  const aiTemplate = `Hi {{FirstName}},\n\n${prompt || `Following up on my previous message about ${offering}. Have you had a chance to review?`}\n\nLooking forward to connecting!\n\nBest regards,\n{{YourName}}`;
                                  setFormData(prev => ({
                                    ...prev,
                                    templates: {
                                      ...prev.templates,
                                      [`${offering}-followup`]: aiTemplate
                                    }
                                  }));
                                  if (promptInput) promptInput.value = '';
                                }}
                              >
                                <Sparkles className="w-4 h-4" />
                                Generate using AI
                              </Button>
                            </div>

                            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/10">
                              <Label htmlFor={`followup-prompt-${offering}`} className="text-sm font-medium mb-2 block">
                                AI Generation Prompt (Optional)
                              </Label>
                              <Input
                                id={`followup-prompt-${offering}`}
                                placeholder="E.g., Add urgency and social proof..."
                                className="bg-background/50"
                              />
                              <p className="text-xs text-muted-foreground mt-2">
                                Leave empty for auto-generated template
                              </p>
                            </div>

                            <div className="mb-4 p-4 bg-muted/50 rounded-lg border border-border/50">
                              <Label className="text-sm font-medium mb-3 block">Follow-up Template Strategy</Label>
                              <div className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id={`same-${offering}`}
                                    name={`followup-strategy-${offering}`}
                                    className="w-4 h-4"
                                    checked={followupStrategy[offering] !== 'custom'}
                                    onChange={() => setFollowupStrategy(prev => ({ ...prev, [offering]: 'same' }))}
                                  />
                                  <label htmlFor={`same-${offering}`} className="text-sm cursor-pointer">
                                    Same template for all follow-ups
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id={`custom-${offering}`}
                                    name={`followup-strategy-${offering}`}
                                    className="w-4 h-4"
                                    checked={followupStrategy[offering] === 'custom'}
                                    onChange={() => setFollowupStrategy(prev => ({ ...prev, [offering]: 'custom' }))}
                                  />
                                  <label htmlFor={`custom-${offering}`} className="text-sm cursor-pointer">
                                    Customize each follow-up
                                  </label>
                                </div>
                              </div>
                              {formData.followUpCount && (
                                <p className="text-xs text-muted-foreground mt-2">
                                  Based on your selection: {formData.followUpCount === 'custom' ? 'Custom' : formData.followUpCount} follow-up(s)
                                </p>
                              )}
                            </div>

                            {followupStrategy[offering] === 'custom' ? (
                              <div className="space-y-4">
                                {Array.from({ length: parseInt(formData.followUpCount) || 1 }).map((_, followupIdx) => (
                                  <div key={followupIdx} className="space-y-2">
                                    <Label className="text-sm font-medium flex items-center gap-2">
                                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
                                        {followupIdx + 1}
                                      </div>
                                      Follow-up {followupIdx + 1}
                                    </Label>
                                    <Textarea
                                      placeholder={`Hi {{FirstName}},&#10;&#10;Follow-up message ${followupIdx + 1}...&#10;&#10;Best regards,&#10;{{YourName}}`}
                                      className="min-h-[120px] bg-background border-border font-mono text-sm"
                                      value={formData.templates[`${offering}-followup-${followupIdx + 1}`] || ''}
                                      onChange={(e) => {
                                        setFormData(prev => ({
                                          ...prev,
                                          templates: {
                                            ...prev.templates,
                                            [`${offering}-followup-${followupIdx + 1}`]: e.target.value
                                          }
                                        }));
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <Textarea
                                placeholder="Hi {{FirstName}},&#10;&#10;Following up on my previous message...&#10;&#10;Best regards,&#10;{{YourName}}"
                                className="min-h-[140px] bg-background border-border font-mono text-sm"
                                value={formData.templates[`${offering}-followup`] || ''}
                                onChange={(e) => {
                                  setFormData(prev => ({
                                    ...prev,
                                    templates: {
                                      ...prev.templates,
                                      [`${offering}-followup`]: e.target.value
                                    }
                                  }));
                                }}
                              />
                            )}

                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  const link = window.prompt('Enter link to insert:');
                                  if (link) {
                                    const currentValue = formData.templates[`${offering}-followup`] || '';
                                    setFormData(prev => ({
                                      ...prev,
                                      templates: {
                                        ...prev.templates,
                                        [`${offering}-followup`]: currentValue + ` ${link}`
                                      }
                                    }));
                                  }
                                }}
                              >
                                <Link2 className="w-4 h-4 mr-2" />
                                Insert Link
                              </Button>
                            </div>
                          </div>

                          {/* Template 3: Closing */}
                          <div className="space-y-4 bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                  3
                                </div>
                                <Label className="text-base font-semibold">Closing Template</Label>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-2 border-primary/30 hover:bg-primary/10"
                                onClick={() => {
                                  const promptInput = document.getElementById(`closing-prompt-${offering}`) as HTMLInputElement;
                                  const prompt = promptInput?.value || '';
                                  const aiTemplate = `Hi {{FirstName}},\n\n${prompt || `Great! I'm excited about partnering with ${formData.companyName} for ${offering}.`}\n\n${formData.callToAction || 'Let\'s schedule a time to get started!'}\n\nBest regards,\n{{YourName}}`;
                                  setFormData(prev => ({
                                    ...prev,
                                    templates: {
                                      ...prev.templates,
                                      [`${offering}-closing`]: aiTemplate
                                    }
                                  }));
                                  if (promptInput) promptInput.value = '';
                                }}
                              >
                                <Sparkles className="w-4 h-4" />
                                Generate using AI
                              </Button>
                            </div>
                            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/10">
                              <Label htmlFor={`closing-prompt-${offering}`} className="text-sm font-medium mb-2 block">
                                AI Generation Prompt (Optional)
                              </Label>
                              <Input
                                id={`closing-prompt-${offering}`}
                                placeholder="E.g., Emphasize partnership and mutual success..."
                                className="bg-background/50"
                              />
                              <p className="text-xs text-muted-foreground mt-2">
                                Leave empty for auto-generated template
                              </p>
                            </div>
                            <Textarea
                              placeholder="Hi {{FirstName}},&#10;&#10;Your closing message here...&#10;&#10;Best regards,&#10;{{YourName}}"
                              className="min-h-[140px] bg-background border-border font-mono text-sm"
                              value={formData.templates[`${offering}-closing`] || ''}
                              onChange={(e) => {
                                setFormData(prev => ({
                                  ...prev,
                                  templates: {
                                    ...prev.templates,
                                    [`${offering}-closing`]: e.target.value
                                  }
                                }));
                              }}
                            />
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  const link = window.prompt('Enter link to insert:');
                                  if (link) {
                                    const currentValue = formData.templates[`${offering}-closing`] || '';
                                    setFormData(prev => ({
                                      ...prev,
                                      templates: {
                                        ...prev.templates,
                                        [`${offering}-closing`]: currentValue + ` ${link}`
                                      }
                                    }));
                                  }
                                }}
                              >
                                <Link2 className="w-4 h-4 mr-2" />
                                Insert Link
                              </Button>
                            </div>
                          </div>

                          {/* Navigation Buttons for Multiple Offerings */}
                          <div className="flex justify-between items-center mt-8 pt-6 border-t border-border/50">
                            <Button
                              variant="outline"
                              onClick={() => setCurrentOfferingIndex(Math.max(0, currentOfferingIndex - 1))}
                              disabled={currentOfferingIndex === 0}
                              className="gap-2"
                            >
                              <ChevronRight className="w-4 h-4 rotate-180" />
                              Previous Offering
                            </Button>

                            {currentOfferingIndex < formData.offerings.length - 1 ? (
                              <Button
                                className="gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                                onClick={() => setCurrentOfferingIndex(currentOfferingIndex + 1)}
                              >
                                Next Offering
                                <ChevronRight className="w-4 h-4" />
                              </Button>
                            ) : (
                              <Button
                                className="gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                                onClick={() => setCurrentStep('summary')}
                              >
                                Complete Templates
                                <Check className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </motion.div>
                        ) : null
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                        <AlertCircle className="w-10 h-10" />
                      </div>
                      <p className="text-lg font-medium">No offerings selected</p>
                      <p className="text-sm mt-2">Please go back and select at least one offering in the lead generation step.</p>
                      <div className="flex justify-center mt-8">
                        <Button variant="outline" onClick={() => setCurrentStep('outreach')} className="px-8">
                          Back to Outreach
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Summary Step */}
          {currentStep === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 12 }}
                  className="inline-block mb-4"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.15, 1],
                      boxShadow: [
                        "0 10px 40px rgba(34, 197, 94, 0.3)",
                        "0 20px 60px rgba(34, 197, 94, 0.5)",
                        "0 10px 40px rgba(34, 197, 94, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-500"
                  >
                    <Check className="w-10 h-10 text-white" />
                  </motion.div>
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl font-bold text-foreground mb-2"
                >
                  All Set!
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-muted-foreground text-lg"
                >
                  Your workspace is being configured
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Card className="shadow-2xl border-border bg-card/70 backdrop-blur-xl">
                  <CardContent className="p-8 space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
                      className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20"
                    >
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                      <Target className="w-5 h-5 text-primary" />
                      Lead Generation
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Method:</span>
                        <p className="text-foreground font-semibold">{leadGenMethod === 'ai' ? 'AI Generated' : 'Manual Import'}</p>
                      </div>
                      {leadGenMethod === 'ai' && formData.industry && (
                        <>
                          <div>
                            <span className="text-muted-foreground">Industry:</span>
                            <p className="text-foreground font-semibold capitalize">{formData.industry}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Company Size:</span>
                            <p className="text-foreground font-semibold">{formData.companySize || 'Not set'}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Frequency:</span>
                            <p className="text-foreground font-semibold capitalize">{formData.scrapingFrequency || 'Not set'}</p>
                          </div>
                        </>
                      )}
                    </div>
                    {formData.offerings.length > 0 && (
                      <div className="mt-4">
                        <span className="text-sm text-muted-foreground mb-2 block">Offerings:</span>
                        <div className="flex flex-wrap gap-2">
                          {formData.offerings.map(offering => (
                            <Badge key={offering} className="bg-primary text-primary-foreground">{offering}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                    className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-2xl p-6 border border-secondary/20"
                  >
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
                      <Mail className="w-5 h-5 text-secondary" />
                      Outreach
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Method:</span>
                        <p className="text-foreground font-semibold">{outreachMethod === 'ai' ? 'AI Automated' : 'Manual'}</p>
                      </div>
                      {outreachMethod === 'ai' && (
                        <>
                          <div>
                            <span className="text-muted-foreground">Follow-ups:</span>
                            <p className="text-foreground font-semibold">{formData.followUpCount || 'Not set'}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Frequency:</span>
                            <p className="text-foreground font-semibold capitalize">{formData.followUpFrequency || 'Not set'}</p>
                          </div>
                        </>
                      )}
                    </div>
                    {formData.outreachChannels.length > 0 && (
                      <div className="mt-4">
                        <span className="text-sm text-muted-foreground mb-2 block">Channels:</span>
                        <div className="flex flex-wrap gap-2">
                          {formData.outreachChannels.map(channel => (
                            <Badge key={channel} variant="secondary">{channel}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 text-center border border-border/50"
                  >
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="inline-block mb-4"
                    >
                      <Sparkles className="w-10 h-10 text-primary" />
                    </motion.div>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="text-lg text-foreground font-semibold mb-2"
                    >
                      Configuring your workspace...
                    </motion.p>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1 }}
                      className="text-muted-foreground"
                    >
                      Setting up AI agents and preparing your dashboard
                    </motion.p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 py-6 text-lg font-semibold"
                      onClick={handleComplete}
                    >
                      Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
