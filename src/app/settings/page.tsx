'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles, 
  User,
  Building2,
  Globe2,
  Tags,
  Database,
  Mail,
  Clock,
  Target,
  ArrowLeft,
  Save,
  Bell,
  Shield,
  CreditCard,
  Users,
  Bot
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Personal Info
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Acme Corp',
    role: 'Sales Manager',
    
    // Lead Generation
    industry: 'Technology',
    offerings: ['SaaS Products', 'Consulting Services'],
    category: 'B2B',
    companySize: '50-200',
    location: 'United States',
    keywords: ['AI', 'Automation', 'Sales'],
    dataSources: ['LinkedIn Sales Navigator', 'Apollo'],
    scrapingFrequency: 'Daily',
    
    // Outreach
    outreachChannels: ['Email', 'LinkedIn DM'],
    followUpCount: '3',
    followUpFrequency: 'Weekly',
    outreachGoals: ['Lead Generation', 'Meeting Scheduling'],
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true
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

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', formData);
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

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card/60 backdrop-blur-xl border-b border-border shadow-lg shadow-primary/5">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.push('/dashboard')}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SalesAI
            </span>
            <Badge variant="secondary" className="ml-2">Settings</Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
              onClick={handleSave}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold shadow-2xl shadow-primary/40">
              JD
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Account Settings</h1>
              <p className="text-muted-foreground text-lg font-light">Manage your profile and preferences</p>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-card/70 backdrop-blur-sm border border-border p-1 shadow-lg">
            <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="lead-gen" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Target className="w-4 h-4 mr-2" />
              Lead Generation
            </TabsTrigger>
            <TabsTrigger value="outreach" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Mail className="w-4 h-4 mr-2" />
              Outreach
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="bg-card/70 backdrop-blur-xl border-border shadow-2xl">
                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/10 to-secondary/10">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>Update your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        className="bg-background/50 backdrop-blur-sm border-2 border-border hover:border-primary/30 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className="bg-background/50 backdrop-blur-sm border-2 border-border hover:border-primary/30 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input 
                        id="company" 
                        value={formData.company}
                        onChange={(e) => updateFormData('company', e.target.value)}
                        className="bg-background/50 backdrop-blur-sm border-2 border-border hover:border-primary/30 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input 
                        id="role" 
                        value={formData.role}
                        onChange={(e) => updateFormData('role', e.target.value)}
                        className="bg-background/50 backdrop-blur-sm border-2 border-border hover:border-primary/30 focus:border-primary/50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Lead Generation Tab */}
          <TabsContent value="lead-gen">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="bg-card/70 backdrop-blur-xl border-border shadow-2xl">
                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/10 to-secondary/10">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    Target Company Profile
                  </CardTitle>
                  <CardDescription>Configure your ideal customer profile and lead generation preferences</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Select value={formData.industry} onValueChange={(value) => updateFormData('industry', value)}>
                          <SelectTrigger className="bg-background/50 border-2 border-border hover:border-primary/30">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Technology">Technology</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="E-commerce">E-commerce</SelectItem>
                            <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={formData.category} onValueChange={(value) => updateFormData('category', value)}>
                          <SelectTrigger className="bg-background/50 border-2 border-border hover:border-primary/30">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="B2B">B2B</SelectItem>
                            <SelectItem value="B2C">B2C</SelectItem>
                            <SelectItem value="B2B2C">B2B2C</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companySize">Company Size</Label>
                        <Select value={formData.companySize} onValueChange={(value) => updateFormData('companySize', value)}>
                          <SelectTrigger className="bg-background/50 border-2 border-border hover:border-primary/30">
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="50-200">50-200 employees</SelectItem>
                            <SelectItem value="200-1000">200-1000 employees</SelectItem>
                            <SelectItem value="1000+">1000+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Select value={formData.location} onValueChange={(value) => updateFormData('location', value)}>
                          <SelectTrigger className="bg-background/50 border-2 border-border hover:border-primary/30">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="United States">United States</SelectItem>
                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="Europe">Europe</SelectItem>
                            <SelectItem value="Asia Pacific">Asia Pacific</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border space-y-4">
                    <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Tags className="w-4 h-4 text-primary" />
                      Target Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.keywords.map((keyword) => (
                        <Badge key={keyword} className="bg-primary/20 text-primary border-primary/30">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border space-y-4">
                    <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Database className="w-4 h-4 text-primary" />
                      Data Sources
                    </h3>
                    <div className="space-y-3">
                      {['LinkedIn Sales Navigator', 'Apollo', 'Clay', 'Hunter.io'].map((source) => (
                        <div key={source} className="flex items-center space-x-2">
                          <Checkbox 
                            id={source}
                            checked={formData.dataSources.includes(source)}
                            onCheckedChange={() => toggleArrayItem('dataSources', source)}
                            className="border-2 border-primary data-[state=checked]:bg-primary"
                          />
                          <Label htmlFor={source} className="cursor-pointer">{source}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border space-y-4">
                    <Label htmlFor="scrapingFrequency">Scraping Frequency</Label>
                    <Select value={formData.scrapingFrequency} onValueChange={(value) => updateFormData('scrapingFrequency', value)}>
                      <SelectTrigger className="bg-background/50 border-2 border-border hover:border-primary/30">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hourly">Hourly</SelectItem>
                        <SelectItem value="Daily">Daily</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Outreach Tab */}
          <TabsContent value="outreach">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="bg-card/70 backdrop-blur-xl border-border shadow-2xl">
                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/10 to-secondary/10">
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    Outreach Configuration
                  </CardTitle>
                  <CardDescription>Manage your automated outreach settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border space-y-4">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Outreach Channels</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['Email', 'LinkedIn DM', 'WhatsApp DM', 'Cold Calling'].map((channel) => (
                        <div key={channel} className="flex items-center space-x-2">
                          <Checkbox 
                            id={channel}
                            checked={formData.outreachChannels.includes(channel)}
                            onCheckedChange={() => toggleArrayItem('outreachChannels', channel)}
                            className="border-2 border-primary data-[state=checked]:bg-primary"
                          />
                          <Label htmlFor={channel} className="cursor-pointer">{channel}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border space-y-4">
                      <Label htmlFor="followUpCount">Number of Follow-ups</Label>
                      <Select value={formData.followUpCount} onValueChange={(value) => updateFormData('followUpCount', value)}>
                        <SelectTrigger className="bg-background/50 border-2 border-border hover:border-primary/30">
                          <SelectValue placeholder="Select count" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 follow-up</SelectItem>
                          <SelectItem value="2">2 follow-ups</SelectItem>
                          <SelectItem value="3">3 follow-ups</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border space-y-4">
                      <Label htmlFor="followUpFrequency">Follow-up Frequency</Label>
                      <Select value={formData.followUpFrequency} onValueChange={(value) => updateFormData('followUpFrequency', value)}>
                        <SelectTrigger className="bg-background/50 border-2 border-border hover:border-primary/30">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Daily">Daily</SelectItem>
                          <SelectItem value="Weekly">Weekly</SelectItem>
                          <SelectItem value="Biweekly">Biweekly</SelectItem>
                          <SelectItem value="Monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border space-y-4">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Primary Goals</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {['Lead Generation', 'Meeting Scheduling', 'Demo Booking', 'Customer Retention', 'Partnership'].map((goal) => (
                        <div key={goal} className="flex items-center space-x-2">
                          <Checkbox 
                            id={goal}
                            checked={formData.outreachGoals.includes(goal)}
                            onCheckedChange={() => toggleArrayItem('outreachGoals', goal)}
                            className="border-2 border-primary data-[state=checked]:bg-primary"
                          />
                          <Label htmlFor={goal} className="cursor-pointer">{goal}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="bg-card/70 backdrop-blur-xl border-border shadow-2xl">
                <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/10 to-secondary/10">
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Manage how you receive updates and alerts</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
                      <div className="space-y-1">
                        <Label htmlFor="email-notif" className="text-base font-semibold">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground font-light">Receive email updates about your campaigns</p>
                      </div>
                      <Checkbox 
                        id="email-notif"
                        checked={formData.emailNotifications}
                        onCheckedChange={(checked) => updateFormData('emailNotifications', checked)}
                        className="border-2 border-primary data-[state=checked]:bg-primary h-6 w-6"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
                      <div className="space-y-1">
                        <Label htmlFor="push-notif" className="text-base font-semibold">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground font-light">Get real-time alerts on your device</p>
                      </div>
                      <Checkbox 
                        id="push-notif"
                        checked={formData.pushNotifications}
                        onCheckedChange={(checked) => updateFormData('pushNotifications', checked)}
                        className="border-2 border-primary data-[state=checked]:bg-primary h-6 w-6"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
                      <div className="space-y-1">
                        <Label htmlFor="weekly-reports" className="text-base font-semibold">Weekly Reports</Label>
                        <p className="text-sm text-muted-foreground font-light">Receive weekly performance summaries</p>
                      </div>
                      <Checkbox 
                        id="weekly-reports"
                        checked={formData.weeklyReports}
                        onCheckedChange={(checked) => updateFormData('weeklyReports', checked)}
                        className="border-2 border-primary data-[state=checked]:bg-primary h-6 w-6"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

