'use client';

import { useState } from 'react';
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
  Clock
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type LeadGenMethod = 'manual' | 'ai' | null;
type OutreachMethod = 'manual' | 'ai' | null;
type TemplateMethod = 'manual' | 'ai' | null;

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<'welcome' | 'lead-gen' | 'lead-manual' | 'outreach' | 'templates' | 'summary'>('lead-gen');
  const [leadGenMethod, setLeadGenMethod] = useState<LeadGenMethod>('ai');
  const [outreachMethod, setOutreachMethod] = useState<OutreachMethod>(null);
  const [templateMethod, setTemplateMethod] = useState<TemplateMethod>(null);

  // Form state
  const [formData, setFormData] = useState({
    industry: '',
    offerings: [] as string[],
    category: '',
    companySize: '',
    location: '',
    keywords: [] as string[],
    dataSources: [] as string[],
    scrapingFrequency: '',
    outreachChannels: [] as string[],
    followUpCount: '',
    followUpFrequency: '',
    outreachGoals: [] as string[],
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
      case 'welcome': return 0;
      case 'lead-gen': return 25;
      case 'lead-manual': return 35;
      case 'outreach': return 60;
      case 'templates': return 85;
      case 'summary': return 100;
      default: return 0;
    }
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
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-card/60 backdrop-blur-xl border-b border-border shadow-lg shadow-primary/5">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">SalesAI Setup</h1>
                <p className="text-xs text-muted-foreground">Configure your workspace</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs px-3 py-1">
              Step {currentStep === 'lead-gen' || currentStep === 'lead-manual' ? 1 : currentStep === 'outreach' ? 2 : currentStep === 'templates' ? 3 : 4} of 4
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {currentStep !== 'welcome' && (
        <div className="fixed top-[73px] left-0 right-0 z-40">
          <Progress value={getProgress()} className="h-1 rounded-none" />
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-32 pb-12">
        <AnimatePresence mode="wait">
          {/* Step 1: Lead Generation */}
          {currentStep === 'lead-gen' && (
            <motion.div
              key="lead-gen"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Lead Generation</h2>
                <p className="text-muted-foreground text-lg">Configure how you'd like to generate and manage leads</p>
              </div>

              <Card className="shadow-2xl border-border bg-card/70 backdrop-blur-xl">
                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/10 to-secondary/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <CardTitle className="text-xl">Choose Generation Method</CardTitle>
                      <CardDescription>Select how you want to import or generate leads</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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

                    <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
          )}

          {/* Manual Import Step */}
          {currentStep === 'lead-manual' && (
            <motion.div
              key="lead-manual"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Import Your Leads</h2>
                <p className="text-muted-foreground text-lg">Upload a CSV file with your existing lead data</p>
              </div>

              <Card className="shadow-2xl border-border bg-card/70 backdrop-blur-xl">
                <CardContent className="p-8">
                  <div className="border-2 border-dashed border-border rounded-2xl p-16 text-center hover:border-primary/50 transition-colors cursor-pointer bg-card/30 hover:bg-card/50 backdrop-blur-sm">
                    <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-foreground font-semibold text-lg mb-2">Drop your CSV file here</p>
                    <p className="text-sm text-muted-foreground mb-6">or click to browse from your computer</p>
                    <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300">
                      Choose File
                    </Button>
                  </div>

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
          )}

          {/* Outreach Step */}
          {currentStep === 'outreach' && (
            <motion.div
              key="outreach"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/10 mb-4">
                  <Mail className="w-8 h-8 text-secondary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Outreach Configuration</h2>
                <p className="text-muted-foreground text-lg">Set up your automated outreach strategy</p>
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

                      <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
                        <h3 className="text-sm font-semibold text-foreground mb-4">Primary Goals</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {['Lead Generation', 'Meeting Scheduling', 'Demo Booking', 'Customer Retention', 'Others'].map((goal) => (
                            <div key={goal} className="flex items-center space-x-2 p-3 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors">
                              <Checkbox 
                                id={goal}
                                checked={formData.outreachGoals.includes(goal)}
                                onCheckedChange={() => toggleArrayItem('outreachGoals', goal)}
                                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                              />
                              <label htmlFor={goal} className="text-sm text-foreground cursor-pointer select-none flex-1">
                                {goal}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex justify-between gap-3 mt-8 pt-6 border-t border-border/50">
                    <Button variant="outline" onClick={() => setCurrentStep(leadGenMethod === 'manual' ? 'lead-manual' : 'lead-gen')} className="px-6">
                      Back
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
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Outreach Templates</h2>
                <p className="text-muted-foreground text-lg">Customize templates for each offering</p>
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
                    <div className="space-y-6">
                      {formData.offerings.map((offering, index) => (
                        <div key={offering} className="bg-muted/30 rounded-xl p-6 border border-border/50">
                          <div className="flex items-center gap-2 mb-4">
                            <Badge className="bg-primary text-primary-foreground">{offering}</Badge>
                            <span className="text-sm text-muted-foreground">Template {index + 1}</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Card 
                                className={`cursor-pointer transition-all border ${
                                  templateMethod === 'manual' 
                                    ? 'border-primary bg-primary/5' 
                                    : 'border-border hover:border-primary/50'
                                }`}
                                onClick={() => setTemplateMethod('manual')}
                              >
                                <CardHeader className="py-3 text-center">
                                  <CardTitle className="text-sm">Write Manual Template</CardTitle>
                                </CardHeader>
                              </Card>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Card 
                                className={`cursor-pointer transition-all border ${
                                  templateMethod === 'ai' 
                                    ? 'border-primary bg-primary/5' 
                                    : 'border-border hover:border-primary/50'
                                }`}
                                onClick={() => setTemplateMethod('ai')}
                              >
                                <CardHeader className="py-3 text-center">
                                  <CardTitle className="text-sm">Use AI Generated</CardTitle>
                                </CardHeader>
                              </Card>
                            </motion.div>
                          </div>

                          <Textarea 
                            placeholder={templateMethod === 'ai' 
                              ? `Hi {{FirstName}},\n\nI noticed that {{CompanyName}} is in the ${offering} space. We help companies like yours automate their sales process with AI.\n\nWould you be open to a quick 15-minute call next week?\n\nBest regards,\n{{YourName}}`
                              : "Write your custom template here..."
                            }
                            className="min-h-[180px] bg-background border-border font-mono text-sm"
                            value={formData.templates[offering] || (templateMethod === 'ai' ? `Hi {{FirstName}},\n\nI noticed that {{CompanyName}} is in the ${offering} space. We help companies like yours automate their sales process with AI.\n\nWould you be open to a quick 15-minute call next week?\n\nBest regards,\n{{YourName}}` : '')}
                            onChange={(e) => {
                              setFormData(prev => ({
                                ...prev,
                                templates: {
                                  ...prev.templates,
                                  [offering]: e.target.value
                                }
                              }));
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>No offerings selected. Please go back and select at least one offering.</p>
                    </div>
                  )}

                  <div className="flex justify-between gap-3 mt-8 pt-6 border-t border-border/50">
                    <Button variant="outline" onClick={() => setCurrentStep('outreach')} className="px-6">
                      Back
                    </Button>
                    <Button 
                      className="px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
                      onClick={() => setCurrentStep('summary')}
                    >
                      Continue <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
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
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-8">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-500 mb-4 shadow-lg"
                >
                  <Check className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-4xl font-bold text-foreground mb-2">All Set!</h2>
                <p className="text-muted-foreground text-lg">Your workspace is being configured</p>
              </div>

              <Card className="shadow-2xl border-border bg-card/70 backdrop-blur-xl">
                <CardContent className="p-8 space-y-6">
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
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
                  </div>

                  <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-2xl p-6 border border-secondary/20">
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
                  </div>

                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 text-center border border-border/50">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="inline-block mb-4"
                    >
                      <Sparkles className="w-10 h-10 text-primary" />
                    </motion.div>
                    <p className="text-lg text-foreground font-semibold mb-2">
                      Configuring your workspace...
                    </p>
                    <p className="text-muted-foreground">
                      Setting up AI agents and preparing your dashboard
                    </p>
                  </div>

                  <Button 
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 py-6 text-lg font-semibold"
                    onClick={handleComplete}
                  >
                    Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
