'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ChatAssistant from '@/components/chat-assistant';
import { 
  Settings,
  User,
  Users,
  Target,
  Mail,
  Bell,
  ArrowLeft,
  Upload,
  Database,
  Clock,
  Sparkles,
  Save,
  AlertCircle,
  Plus,
  Trash2,
  Edit,
  X,
  LogOut,
  Shield,
  CreditCard,
  Plug,
  Palette,
  Key,
  Smartphone,
  Globe,
  Languages,
  Phone,
  Activity,
  MessageCircle,
  Copy,
  Download,
  Eye,
  Zap,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  MoreVertical,
  Send,
  FileText,
  Link2,
  Sparkles as SparklesIcon,
  Play,
  Pause,
  RefreshCw,
  Bot,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [painPoints, setPainPoints] = useState(['', '', '']);
  const [valueProps, setValueProps] = useState(['', '', '']);
  const [offerings, setOfferings] = useState([
    { 
      id: 1, 
      name: 'Enterprise Solutions',
      templates: {
        outreach: '',
        followup: '',
        closing: ''
      },
      followupCount: '3',
      followupFrequency: 'weekly'
    }
  ]);
  const [showAddOffering, setShowAddOffering] = useState(false);
  const [newOffering, setNewOffering] = useState({ name: '', templates: { outreach: '', followup: '', closing: '' } });
  const [editingOffering, setEditingOffering] = useState<number | null>(null);
  const [viewingOffering, setViewingOffering] = useState<number | null>(null);
  const [previewingTemplate, setPreviewingTemplate] = useState<{ offeringId: number; type: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOfferingFilter, setSelectedOfferingFilter] = useState<string>('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [showTestEmail, setShowTestEmail] = useState<number | null>(null);
  const [testEmailData, setTestEmailData] = useState({ to: '', subject: '', body: '' });
  
  // Outreach workflow states (same as prospects page)
  const [outreachStep, setOutreachStep] = useState<0 | 0.5 | 1 | 2>(0);
  const [outreachOffering, setOutreachOffering] = useState<string>('');
  const [outreachMethod, setOutreachMethod] = useState<'manual' | 'ai' | null>(null);
  const [outreachChannels, setOutreachChannels] = useState<string[]>([]);
  const [followUpCount, setFollowUpCount] = useState('');
  const [followUpFrequency, setFollowUpFrequency] = useState('');
  const [timeOfFollowUp, setTimeOfFollowUp] = useState('');
  const [startTime, setStartTime] = useState('');
  const [customDate, setCustomDate] = useState('');
  const [customTime, setCustomTime] = useState('');
  const [testFrom, setTestFrom] = useState('');
  const [testTo, setTestTo] = useState('');
  const [testSubject, setTestSubject] = useState('');
  const [testBody, setTestBody] = useState('');
  const [customFollowUpCount, setCustomFollowUpCount] = useState('');
  const [customFrequency, setCustomFrequency] = useState('');
  const [outreachTemplates, setOutreachTemplates] = useState<Record<string, string>>({});
  const [followupStrategy, setFollowupStrategy] = useState<Record<string, 'same' | 'custom'>>({});
  const [outreachAIPrompt, setOutreachAIPrompt] = useState('');

  const handleLogout = () => {
    // Clear any stored auth data
    localStorage.clear();
    sessionStorage.clear();
    // Redirect to home/login page
    router.push('/');
  };

  const addOffering = () => {
    if (newOffering.name) {
      setOfferings([...offerings, { 
        id: Date.now(), 
        ...newOffering,
        followupCount: '3',
        followupFrequency: 'weekly'
      }]);
      setNewOffering({ name: '', templates: { outreach: '', followup: '', closing: '' } });
      setShowAddOffering(false);
    }
  };

  const deleteOffering = (id: number) => {
    setOfferings(offerings.filter(o => o.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50 shadow-2xl"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </motion.button>
              </Link>
          <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl shadow-cyan-500/30"
                >
                  <span className="text-2xl font-bold text-white">JD</span>
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    Account Settings
                  </h1>
                  <p className="text-sm text-gray-400">Manage your profile and preferences</p>
          </div>
              </div>
          </div>
          <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition-all"
              >
                <Save className="w-4 h-4 mr-2 inline" />
              Save Changes
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white font-medium shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all"
              >
                <LogOut className="w-4 h-4 mr-2 inline" />
                Logout
              </motion.button>
            </div>
            </div>
          </div>
        </motion.div>

      <div className="container mx-auto px-6 py-8 relative">
        <Tabs defaultValue="user" className="w-full">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 max-w-6xl mx-auto mb-8 h-auto p-1.5 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl gap-1">
              <TabsTrigger value="user" className="flex items-center gap-2 py-3 px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg transition-all text-xs">
                <User className="w-4 h-4" />
                <span className="hidden xl:inline">Profile</span>
            </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2 py-3 px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg transition-all text-xs">
                <Shield className="w-4 h-4" />
                <span className="hidden xl:inline">Security</span>
            </TabsTrigger>
              <TabsTrigger value="prospects" className="flex items-center gap-2 py-3 px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg transition-all text-xs">
                <Target className="w-4 h-4" />
                <span className="hidden xl:inline">Leads</span>
            </TabsTrigger>
              <TabsTrigger value="outreach" className="flex items-center gap-2 py-3 px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg transition-all text-xs">
                <Mail className="w-4 h-4" />
                <span className="hidden xl:inline">Outreach</span>
              </TabsTrigger>
              <TabsTrigger value="integrations" className="flex items-center gap-2 py-3 px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg transition-all text-xs">
                <Plug className="w-4 h-4" />
                <span className="hidden xl:inline">Integrations</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2 py-3 px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg transition-all text-xs">
                <CreditCard className="w-4 h-4" />
                <span className="hidden xl:inline">Billing</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2 py-3 px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg transition-all text-xs">
                <Palette className="w-4 h-4" />
                <span className="hidden xl:inline">Preferences</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2 py-3 px-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg transition-all text-xs">
                <Bell className="w-4 h-4" />
                <span className="hidden xl:inline">Notifications</span>
            </TabsTrigger>
          </TabsList>
          </motion.div>

          {/* Profile Tab */}
          <TabsContent value="user" className="space-y-6">
            <AnimatePresence mode="wait">
            <motion.div
                key="user-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              className="space-y-6"
            >
                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardHeader className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                    <CardDescription className="text-gray-400">Update your personal details and contact information</CardDescription>
                </CardHeader>
                  <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                        <Label htmlFor="userName" className="text-sm font-medium text-gray-300">User Name</Label>
                        <Input id="userName" placeholder="John Doe" className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" />
                      </motion.div>
                      <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-300">Email</Label>
                        <Input id="email" type="email" placeholder="john@company.com" className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" />
                      </motion.div>
                      <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-300">Phone Number</Label>
                        <Input id="phone" placeholder="+1 (555) 000-0000" className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" />
                      </motion.div>
                      <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                        <Label htmlFor="linkedin" className="text-sm font-medium text-gray-300">LinkedIn URL</Label>
                        <Input id="linkedin" placeholder="https://linkedin.com/in/johndoe" className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardHeader className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Target className="w-5 h-5" />
                      Company Information
                    </CardTitle>
                    <CardDescription className="text-gray-400">Your company details and value proposition</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                        <Label htmlFor="companyName" className="text-sm font-medium text-gray-300">Company Name</Label>
                        <Input id="companyName" placeholder="Acme Corp" className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" />
                      </motion.div>
                      <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                        <Label htmlFor="website" className="text-sm font-medium text-gray-300">Website URL</Label>
                        <Input id="website" placeholder="https://acme.com" className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" />
                      </motion.div>
                    </div>

                    <Separator className="bg-white/10" />

                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-300">Customer Pain Points <span className="text-xs text-gray-500">(At least 3)</span></Label>
                      {painPoints.map((point, index) => (
                        <motion.div key={`pain-${index}`} whileFocus={{ scale: 1.02 }}>
                      <Input 
                            value={point}
                            onChange={(e) => {
                              const newPoints = [...painPoints];
                              newPoints[index] = e.target.value;
                              setPainPoints(newPoints);
                            }}
                            placeholder={`Pain point ${index + 1}`}
                            className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500"
                          />
                        </motion.div>
                      ))}
                    </div>

                    <Separator className="bg-white/10" />

                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-300">Value Proposition <span className="text-xs text-gray-500">(At least 3 benefits)</span></Label>
                      {valueProps.map((prop, index) => (
                        <motion.div key={`value-${index}`} whileFocus={{ scale: 1.02 }}>
                      <Input 
                            value={prop}
                            onChange={(e) => {
                              const newProps = [...valueProps];
                              newProps[index] = e.target.value;
                              setValueProps(newProps);
                            }}
                            placeholder={`Benefit ${index + 1}`}
                            className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* Lead Generation Tab */}
          <TabsContent value="prospects" className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key="prospects-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Offerings Management */}
                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardHeader className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2 text-white">
                          <Target className="w-5 h-5" />
                          Offerings
                        </CardTitle>
                        <CardDescription className="text-gray-400">Manage your product/service offerings and their templates</CardDescription>
                      </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setEditingOffering(-1); // Use -1 to indicate "new offering"
                        setOutreachStep(0);
                        setOutreachOffering('');
                        setNewOffering({ name: '', templates: { outreach: '', followup: '', closing: '' } });
                      }}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium shadow-lg"
                    >
                      <Plus className="w-4 h-4 mr-2 inline" />
                      Add Offering
                    </motion.button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {offerings.map((offering, index) => (
                      <motion.div
                        key={offering.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-lg bg-slate-800/50 border border-white/10 hover:border-cyan-500/50 transition-all"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">{offering.name}</h3>
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setEditingOffering(offering.id)}
                              className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                            >
                              <Edit className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteOffering(offering.id)}
                              className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                          <div>Follow-ups: <span className="text-cyan-400">{offering.followupCount}</span></div>
                          <div>Frequency: <span className="text-cyan-400">{offering.followupFrequency}</span></div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>


                {/* Rest of Lead Generation settings */}
                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardHeader className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Database className="w-5 h-5" />
                      Data Sources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {['LinkedIn Sales Navigator', 'Apollo', 'Clay', 'Hunter.io'].map((source) => (
                      <motion.div
                        key={source}
                        whileHover={{ x: 5 }}
                        className="flex items-center space-x-3 p-4 rounded-lg bg-slate-800/50 border border-white/10 hover:border-cyan-500/50 transition-all"
                      >
                        <Checkbox id={source} className="data-[state=checked]:bg-cyan-500 border-white/20" />
                        <label htmlFor={source} className="text-sm font-medium text-gray-300 cursor-pointer flex-1">{source}</label>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* Outreach Tab */}
          <TabsContent value="outreach" className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key="outreach-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Email Configuration */}
                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardHeader className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Mail className="w-5 h-5" />
                      Email Configuration
                    </CardTitle>
                    <CardDescription className="text-gray-400">Configure your email settings for cold mailing and campaigns</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                        <Label htmlFor="senderEmail" className="text-sm font-medium text-gray-300">Sender Email Address *</Label>
                        <Input 
                          id="senderEmail" 
                        type="email"
                          placeholder="sales@yourcompany.com" 
                          className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" 
                        />
                        <p className="text-xs text-gray-500">This email will be used as the sender for all outreach</p>
                      </motion.div>
                      <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                        <Label htmlFor="senderName" className="text-sm font-medium text-gray-300">Sender Name *</Label>
                        <Input 
                          id="senderName" 
                          placeholder="John Doe from Acme Corp" 
                          className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" 
                        />
                        <p className="text-xs text-gray-500">This name will appear in the From field</p>
                      </motion.div>
                      <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                        <Label htmlFor="replyToEmail" className="text-sm font-medium text-gray-300">Reply-To Email</Label>
                        <Input 
                          id="replyToEmail" 
                          type="email" 
                          placeholder="replies@yourcompany.com" 
                          className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" 
                        />
                        <p className="text-xs text-gray-500">Where replies will be sent (optional)</p>
                      </motion.div>
                      <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                        <Label htmlFor="bccEmail" className="text-sm font-medium text-gray-300">BCC Email</Label>
                        <Input 
                          id="bccEmail" 
                          type="email" 
                          placeholder="tracking@yourcompany.com" 
                          className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" 
                        />
                        <p className="text-xs text-gray-500">Blind copy all outreach emails (optional)</p>
                      </motion.div>
                    </div>

                    <Separator className="bg-white/10" />

                    <div className="space-y-2">
                      <Label htmlFor="emailSignature" className="text-sm font-medium text-gray-300">Email Signature</Label>
                      <Textarea
                        id="emailSignature"
                        placeholder="Best regards,&#10;John Doe&#10;Sales Director&#10;Acme Corp&#10;Phone: (555) 123-4567"
                        className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500 min-h-[120px]"
                      />
                      <p className="text-xs text-gray-500">This will be automatically appended to all emails</p>
                    </div>

                    <Separator className="bg-white/10" />

                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-white">Email Sending Limits</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emailsPerDay" className="text-sm font-medium text-gray-300">Emails Per Day</Label>
                      <Input 
                            id="emailsPerDay" 
                            type="number" 
                            placeholder="50" 
                            className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" 
                      />
                    </div>
                    <div className="space-y-2">
                          <Label htmlFor="emailsPerHour" className="text-sm font-medium text-gray-300">Emails Per Hour</Label>
                      <Input 
                            id="emailsPerHour" 
                            type="number" 
                            placeholder="10" 
                            className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" 
                      />
                    </div>
                        <div className="space-y-2">
                          <Label htmlFor="delayBetweenEmails" className="text-sm font-medium text-gray-300">Delay (seconds)</Label>
                          <Input 
                            id="delayBetweenEmails" 
                            type="number" 
                            placeholder="30" 
                            className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" 
                          />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">Set limits to avoid being flagged as spam</p>
                  </div>
                </CardContent>
              </Card>

                {/* Cold Calling Configuration */}
                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardHeader className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Phone className="w-5 h-5" />
                      Cold Calling Configuration
                    </CardTitle>
                    <CardDescription className="text-gray-400">Set up your calling preferences and availability</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                        <Label htmlFor="callerPhone" className="text-sm font-medium text-gray-300">Caller Phone Number *</Label>
                        <Input 
                          id="callerPhone" 
                          type="tel" 
                          placeholder="+1 (555) 123-4567" 
                          className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" 
                        />
                        <p className="text-xs text-gray-500">Your outbound calling number</p>
            </motion.div>
                      <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                        <Label htmlFor="callerId" className="text-sm font-medium text-gray-300">Caller ID Name</Label>
                        <Input 
                          id="callerId" 
                          placeholder="Acme Corp Sales" 
                          className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" 
                        />
                        <p className="text-xs text-gray-500">Name displayed to recipients</p>
                      </motion.div>
                    </div>

                    <Separator className="bg-white/10" />

                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-white">Calling Hours</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="callingStartTime" className="text-sm font-medium text-gray-300">Start Time</Label>
                          <Input 
                            id="callingStartTime" 
                            type="time" 
                            defaultValue="09:00"
                            className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="callingEndTime" className="text-sm font-medium text-gray-300">End Time</Label>
                          <Input 
                            id="callingEndTime" 
                            type="time" 
                            defaultValue="17:00"
                            className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-300">Calling Days</Label>
                        <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                            <motion.button
                              key={day}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`p-3 rounded-lg border-2 transition-all ${
                                ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day)
                                  ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                                  : 'border-white/10 bg-slate-800/50 text-gray-400 hover:border-white/20'
                              }`}
                            >
                              <p className="text-xs font-medium">{day}</p>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-white/10" />

                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-white">Call Automation Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-white/10">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white text-sm mb-1">Auto-dial Next Number</h4>
                            <p className="text-xs text-gray-400">Automatically dial the next prospect after call ends</p>
                          </div>
                          <Checkbox className="data-[state=checked]:bg-cyan-500 border-white/20 w-6 h-6" />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-white/10">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white text-sm mb-1">Call Recording</h4>
                            <p className="text-xs text-gray-400">Record all calls for quality and training</p>
                          </div>
                          <Checkbox defaultChecked className="data-[state=checked]:bg-cyan-500 border-white/20 w-6 h-6" />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-white/10">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white text-sm mb-1">AI Call Assistant</h4>
                            <p className="text-xs text-gray-400">Get real-time AI suggestions during calls</p>
                          </div>
                          <Checkbox defaultChecked className="data-[state=checked]:bg-cyan-500 border-white/20 w-6 h-6" />
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-white/10" />

                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-white">Call Limits</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="callsPerDay" className="text-sm font-medium text-gray-300">Max Calls Per Day</Label>
                          <Input 
                            id="callsPerDay" 
                            type="number" 
                            placeholder="50" 
                            className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="retryAttempts" className="text-sm font-medium text-gray-300">Max Retry Attempts</Label>
                          <Input 
                            id="retryAttempts" 
                            type="number" 
                            placeholder="3" 
                            className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" 
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Analytics by Offering */}
                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardHeader className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Activity className="w-5 h-5" />
                      Analytics by Offering
                    </CardTitle>
                    <CardDescription className="text-gray-400">Track performance metrics and conversions for each offering</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {offerings.map((offering, index) => {
                      // Mock analytics data - in real app, this would come from API
                      const analytics = {
                        totalProspects: 245,
                        convertedToLeads: 89,
                        conversionRate: 36.3,
                        stageBreakdown: {
                          'New': 45,
                          'Contacted': 78,
                          'Follow-up': 56,
                          'Meeting': 34,
                          'Proposal': 22,
                          'Won': 8,
                          'Lost': 2
                        },
                        avgTimeToConvert: '4.2 days',
                        emailMetrics: {
                          sent: 1234,
                          opened: 567,
                          replied: 89,
                          openRate: 46.0,
                          replyRate: 7.2
                        },
                        callMetrics: {
                          attempted: 234,
                          connected: 156,
                          converted: 45,
                          connectionRate: 66.7,
                          conversionRate: 19.2
                        }
                      };
                      
                      return (
            <motion.div
                          key={offering.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-5 rounded-xl bg-slate-800/50 border border-white/10 hover:border-cyan-500/50 transition-all"
                        >
                          <h3 className="text-lg font-semibold text-white mb-4">{offering.name}</h3>
                          
                          {/* Conversion Metrics */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30">
                              <p className="text-xs text-gray-400 mb-1">Total Prospects</p>
                              <p className="text-2xl font-bold text-white">{analytics.totalProspects}</p>
                            </div>
                            <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/30">
                              <p className="text-xs text-gray-400 mb-1">Converted to Leads</p>
                              <p className="text-2xl font-bold text-white">{analytics.convertedToLeads}</p>
                              <p className="text-xs text-emerald-400 mt-1">{analytics.conversionRate}% conversion rate</p>
                            </div>
                            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30">
                              <p className="text-xs text-gray-400 mb-1">Avg Time to Convert</p>
                              <p className="text-2xl font-bold text-white">{analytics.avgTimeToConvert}</p>
                            </div>
                          </div>

                          {/* Stage Breakdown */}
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-white mb-3">Stage Breakdown</h4>
                            <div className="space-y-2">
                              {Object.entries(analytics.stageBreakdown).map(([stage, count]) => {
                                const percentage = (count / analytics.totalProspects) * 100;
                                return (
                                  <div key={stage} className="space-y-1">
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-gray-300">{stage}</span>
                                      <span className="text-white font-medium">{count} ({percentage.toFixed(1)}%)</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percentage}%` }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className={`h-full ${
                                          stage === 'Won' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                                          stage === 'Lost' ? 'bg-gradient-to-r from-red-500 to-pink-600' :
                                          stage === 'Proposal' ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
                                          stage === 'Meeting' ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
                                          'bg-gradient-to-r from-cyan-500 to-blue-600'
                                        }`}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Email Metrics */}
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              Email Metrics
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              <div className="p-3 rounded-lg bg-slate-900/50">
                                <p className="text-xs text-gray-400">Sent</p>
                                <p className="text-lg font-bold text-white">{analytics.emailMetrics.sent}</p>
                              </div>
                              <div className="p-3 rounded-lg bg-slate-900/50">
                                <p className="text-xs text-gray-400">Opened</p>
                                <p className="text-lg font-bold text-white">{analytics.emailMetrics.opened}</p>
                                <p className="text-xs text-cyan-400">{analytics.emailMetrics.openRate}%</p>
                              </div>
                              <div className="p-3 rounded-lg bg-slate-900/50">
                                <p className="text-xs text-gray-400">Replied</p>
                                <p className="text-lg font-bold text-white">{analytics.emailMetrics.replied}</p>
                                <p className="text-xs text-emerald-400">{analytics.emailMetrics.replyRate}%</p>
                              </div>
                              <div className="p-3 rounded-lg bg-slate-900/50">
                                <p className="text-xs text-gray-400">Open Rate</p>
                                <p className="text-lg font-bold text-emerald-400">{analytics.emailMetrics.openRate}%</p>
                              </div>
                            </div>
                          </div>

                          {/* Call Metrics */}
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              Call Metrics
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              <div className="p-3 rounded-lg bg-slate-900/50">
                                <p className="text-xs text-gray-400">Attempted</p>
                                <p className="text-lg font-bold text-white">{analytics.callMetrics.attempted}</p>
                              </div>
                              <div className="p-3 rounded-lg bg-slate-900/50">
                                <p className="text-xs text-gray-400">Connected</p>
                                <p className="text-lg font-bold text-white">{analytics.callMetrics.connected}</p>
                                <p className="text-xs text-cyan-400">{analytics.callMetrics.connectionRate}%</p>
                              </div>
                              <div className="p-3 rounded-lg bg-slate-900/50">
                                <p className="text-xs text-gray-400">Converted</p>
                                <p className="text-lg font-bold text-white">{analytics.callMetrics.converted}</p>
                                <p className="text-xs text-emerald-400">{analytics.callMetrics.conversionRate}%</p>
                              </div>
                              <div className="p-3 rounded-lg bg-slate-900/50">
                                <p className="text-xs text-gray-400">Conversion Rate</p>
                                <p className="text-lg font-bold text-emerald-400">{analytics.callMetrics.conversionRate}%</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Campaign Automation Settings */}
                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardHeader className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Activity className="w-5 h-5" />
                      Campaign Automation
                  </CardTitle>
                    <CardDescription className="text-gray-400">Configure automation settings for your campaigns</CardDescription>
                </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-white">Automation Mode</h4>
                      <div className="grid grid-cols-1 gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-between p-4 rounded-lg border-2 border-cyan-500 bg-cyan-500/10 transition-all"
                        >
                          <div className="text-left">
                            <h4 className="font-semibold text-white mb-1">AI Automated</h4>
                            <p className="text-sm text-gray-400">AI handles all outreach automatically</p>
                          </div>
                          <div className="w-4 h-4 rounded-full border-2 border-cyan-500 bg-cyan-500" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-between p-4 rounded-lg border-2 border-white/10 bg-slate-800/50 hover:border-white/20 transition-all"
                        >
                          <div className="text-left">
                            <h4 className="font-semibold text-white mb-1">Semi-Automated</h4>
                            <p className="text-sm text-gray-400">Requires approval before sending</p>
                          </div>
                          <div className="w-4 h-4 rounded-full border-2 border-white/20" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-between p-4 rounded-lg border-2 border-white/10 bg-slate-800/50 hover:border-white/20 transition-all"
                        >
                          <div className="text-left">
                            <h4 className="font-semibold text-white mb-1">Manual Only</h4>
                            <p className="text-sm text-gray-400">Complete manual control</p>
                          </div>
                          <div className="w-4 h-4 rounded-full border-2 border-white/20" />
                        </motion.button>
                      </div>
                      </div>

                    <Separator className="bg-white/10" />

                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-white">Follow-up Configuration</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                          <Label htmlFor="followUpCount" className="text-sm font-medium text-gray-300">Number of Follow-ups</Label>
                          <Select defaultValue="3">
                            <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                              <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="1">1 Follow-up</SelectItem>
                              <SelectItem value="2">2 Follow-ups</SelectItem>
                              <SelectItem value="3">3 Follow-ups</SelectItem>
                              <SelectItem value="4">4 Follow-ups</SelectItem>
                              <SelectItem value="5">5 Follow-ups</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="followUpInterval" className="text-sm font-medium text-gray-300">Interval (days)</Label>
                          <Input 
                            id="followUpInterval" 
                            type="number" 
                            placeholder="3" 
                            defaultValue="3"
                            className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" 
                          />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="followUpTime" className="text-sm font-medium text-gray-300">Send Time</Label>
                          <Input 
                            id="followUpTime" 
                            type="time" 
                            defaultValue="10:00"
                            className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" 
                          />
                      </div>
                    </div>
                  </div>

                    <Separator className="bg-white/10" />

                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-white">Outreach Channels</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { name: 'Cold Mailing', icon: Mail, enabled: true },
                          { name: 'Cold Calling', icon: Phone, enabled: true },
                          { name: 'LinkedIn DM', icon: Users, enabled: false },
                          { name: 'WhatsApp', icon: MessageCircle, enabled: false }
                        ].map((channel) => (
                          <motion.div
                            key={channel.name}
                            whileHover={{ scale: 1.02 }}
                            className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-white/10 hover:border-cyan-500/50 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${channel.enabled ? 'bg-cyan-500/20' : 'bg-gray-500/20'}`}>
                                <channel.icon className={`w-4 h-4 ${channel.enabled ? 'text-cyan-400' : 'text-gray-400'}`} />
                              </div>
                              <span className="text-sm font-medium text-white">{channel.name}</span>
                            </div>
                            <Checkbox 
                              defaultChecked={channel.enabled}
                              className="data-[state=checked]:bg-cyan-500 border-white/20 w-6 h-6" 
                            />
                          </motion.div>
                      ))}
                    </div>
                  </div>

                    <Separator className="bg-white/10" />

                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-white">Smart Features</h4>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-white/10">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white text-sm mb-1">AI Content Generation</h4>
                            <p className="text-xs text-gray-400">Let AI generate personalized content for each prospect</p>
                          </div>
                          <Checkbox defaultChecked className="data-[state=checked]:bg-cyan-500 border-white/20 w-6 h-6" />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-white/10">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white text-sm mb-1">Smart Send Time Optimization</h4>
                            <p className="text-xs text-gray-400">AI determines the best time to send based on prospect behavior</p>
                          </div>
                          <Checkbox defaultChecked className="data-[state=checked]:bg-cyan-500 border-white/20 w-6 h-6" />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-white/10">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white text-sm mb-1">Auto-Stop on Reply</h4>
                            <p className="text-xs text-gray-400">Automatically stop follow-ups when prospect responds</p>
                          </div>
                          <Checkbox defaultChecked className="data-[state=checked]:bg-cyan-500 border-white/20 w-6 h-6" />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-white/10">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white text-sm mb-1">Lead Scoring</h4>
                            <p className="text-xs text-gray-400">Automatically score leads based on engagement</p>
                          </div>
                          <Checkbox defaultChecked className="data-[state=checked]:bg-cyan-500 border-white/20 w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Full Outreach Workflow Dialog */}
                <Dialog open={editingOffering !== null} onOpenChange={(open) => {
                  if (!open) {
                    setEditingOffering(null);
                    setOutreachStep(0);
                    setOutreachOffering('');
                    setOutreachMethod(null);
                    setOutreachChannels([]);
                    setFollowUpCount('');
                    setFollowUpFrequency('');
                    setTimeOfFollowUp('');
                    setStartTime('');
                    setCustomDate('');
                    setCustomTime('');
                    setTestFrom('');
                    setTestTo('');
                    setTestSubject('');
                    setTestBody('');
                    setCustomFollowUpCount('');
                    setCustomFrequency('');
                    setOutreachTemplates({});
                    setFollowupStrategy({});
                    setOutreachAIPrompt('');
                  }
                }}>
                  <DialogContent className="bg-slate-900 border-white/10 max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-white flex items-center gap-2">
                        <Zap className="w-5 h-5 text-cyan-400" />
                        {editingOffering !== null && offerings.find(o => o.id === editingOffering) 
                          ? `Configure Outreach: ${offerings.find(o => o.id === editingOffering)?.name}`
                          : 'Add New Offering & Configure Outreach'}
                        <Badge variant="secondary" className="ml-auto">
                          {outreachStep === 0 ? 'Step 1 of 3' : outreachStep === 1 ? 'Step 2 of 3' : 'Step 3 of 3'}
                        </Badge>
                      </DialogTitle>
                      <DialogDescription className="text-gray-400">
                        {outreachStep === 0 ? 'Select or create an offering' : outreachStep === 1 ? 'Configure your outreach strategy' : 'Set up message templates'}
                      </DialogDescription>
                    </DialogHeader>

                    {outreachStep === 0 && (
                      <div className="space-y-6 py-4">
                        {editingOffering === -1 ? (
                          <div>
                            <Label className="text-gray-300 mb-3 block">Offering Name *</Label>
                            <Input
                              value={newOffering.name}
                              onChange={(e) => setNewOffering({ ...newOffering, name: e.target.value })}
                              placeholder="E.g., Enterprise Solutions"
                              className="bg-slate-800/50 border-white/10 text-white"
                            />
                        </div>
                        ) : (
                          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                            <p className="text-sm text-cyan-400">
                              Configuring: {offerings.find(o => o.id === editingOffering)?.name}
                            </p>
                    </div>
                        )}

                        <div className="flex gap-2 justify-end pt-4 border-t border-white/10">
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              setEditingOffering(null);
                              setOutreachStep(0);
                            }}
                            className="bg-white/5 border-white/10 text-white"
                          >
                            Cancel
                          </Button>
                          {((editingOffering === -1 && newOffering.name) || (editingOffering !== null && editingOffering !== -1)) && (
                            <Button 
                              onClick={() => {
                                if (editingOffering === -1 && newOffering.name) {
                                  const newId = Date.now();
                                  setOfferings([...offerings, { 
                                    id: newId, 
                                    name: newOffering.name,
                                    templates: { outreach: '', followup: '', closing: '' },
                                    followupCount: '3',
                                    followupFrequency: 'weekly'
                                  }]);
                                  setEditingOffering(newId);
                                  setOutreachOffering(newId.toString());
                                  setNewOffering({ name: '', templates: { outreach: '', followup: '', closing: '' } });
                                } else if (editingOffering !== null && editingOffering !== -1) {
                                  setOutreachOffering(editingOffering.toString());
                                }
                                setOutreachStep(1);
                              }}
                              className="bg-gradient-to-r from-cyan-500 to-blue-600"
                            >
                              Continue <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                          )}
                  </div>
                      </div>
                    )}

                    {outreachStep === 1 && editingOffering !== null && editingOffering !== -1 && (
                      <div className="space-y-6 py-4">
                        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mb-4">
                          <div className="flex items-start gap-3">
                            <Target className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-cyan-400 mb-1">Selected Offering</p>
                              <p className="text-xs text-gray-400">
                                {offerings.find(o => o.id === editingOffering)?.name}
                              </p>
                  </div>
                          </div>
                        </div>
                            
                        <div>
                          <Label className="text-gray-300 mb-4 block">Choose Outreach Method *</Label>
                          <div className="grid grid-cols-2 gap-4">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Card 
                                className={`cursor-pointer transition-all border-2 ${
                                  outreachMethod === 'manual' 
                                    ? 'border-cyan-500 shadow-lg shadow-cyan-500/20 bg-cyan-500/5' 
                                    : 'border-white/10 hover:border-cyan-500/50 bg-slate-800/50'
                                }`}
                                onClick={() => setOutreachMethod('manual')}
                              >
                                <CardHeader className="text-center pb-4">
                                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 mx-auto mb-3">
                                    <User className="w-6 h-6 text-white" />
                                  </div>
                                  <CardTitle className="text-base mb-1 text-white">Manual</CardTitle>
                                  <p className="text-xs text-gray-400">You control every outreach interaction</p>
                                </CardHeader>
              </Card>
            </motion.div>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Card 
                                className={`cursor-pointer transition-all border-2 ${
                                  outreachMethod === 'ai' 
                                    ? 'border-cyan-500 shadow-lg shadow-cyan-500/20 bg-cyan-500/5' 
                                    : 'border-white/10 hover:border-cyan-500/50 bg-slate-800/50'
                                }`}
                                onClick={() => setOutreachMethod('ai')}
                              >
                                <CardHeader className="text-center pb-4">
                                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 mx-auto mb-3">
                                    <Bot className="w-6 h-6 text-white" />
                                  </div>
                                  <CardTitle className="text-base mb-1 text-white">AI Automated</CardTitle>
                                  <p className="text-xs text-gray-400">Let AI handle outreach automatically</p>
                </CardHeader>
                              </Card>
                            </motion.div>
                          </div>
                        </div>

                        {outreachMethod === 'ai' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-4"
                          >
                            <Separator className="bg-white/10" />

                            <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10">
                              <Label className="text-gray-300 mb-3 block">Outreach Channels</Label>
                    <div className="grid grid-cols-2 gap-3">
                                {['Cold Calling', 'Cold Mailing', 'LinkedIn DM', 'WhatsApp DM'].map((channel) => (
                                  <div key={channel} className="flex items-center space-x-2 p-3 rounded-lg bg-slate-900/50 border border-white/10 hover:border-cyan-500/50 transition-colors">
                          <Checkbox 
                                      id={`channel-${channel}`}
                                      checked={outreachChannels.includes(channel)}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          setOutreachChannels([...outreachChannels, channel]);
                                        } else {
                                          setOutreachChannels(outreachChannels.filter(c => c !== channel));
                                        }
                                      }}
                                      className="data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                                    />
                                    <label htmlFor={`channel-${channel}`} className="text-sm text-gray-300 cursor-pointer select-none flex-1">
                                      {channel}
                                    </label>
                        </div>
                      ))}
                    </div>
                  </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10">
                                <Label htmlFor="followUpCount" className="text-gray-300 mb-3 block">Number of Follow-ups</Label>
                                <Select value={followUpCount} onValueChange={setFollowUpCount}>
                                  <SelectTrigger id="followUpCount" className="bg-slate-900/50 border-white/10 text-white">
                                    <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                        <SelectContent>
                                    <SelectItem value="1">1 Follow-up</SelectItem>
                                    <SelectItem value="2">2 Follow-ups</SelectItem>
                                    <SelectItem value="3">3 Follow-ups</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                                {followUpCount === 'custom' && (
                                  <Input
                                    type="number"
                                    min="1"
                                    placeholder="Enter number"
                                    value={customFollowUpCount}
                                    onChange={(e) => setCustomFollowUpCount(e.target.value)}
                                    className="mt-3 bg-slate-900/50 border-white/10 text-white"
                                  />
                                )}
                    </div>

                              <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10">
                                <Label htmlFor="followUpFrequency" className="text-gray-300 mb-3 block">Follow-up Frequency</Label>
                                <Select value={followUpFrequency} onValueChange={setFollowUpFrequency}>
                                  <SelectTrigger id="followUpFrequency" className="bg-slate-900/50 border-white/10 text-white">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                                {followUpFrequency === 'custom' && (
                                  <Input
                                    type="number"
                                    min="1"
                                    placeholder="Enter days"
                                    value={customFrequency}
                                    onChange={(e) => setCustomFrequency(e.target.value)}
                                    className="mt-3 bg-slate-900/50 border-white/10 text-white"
                                  />
                                )}
                    </div>
                  </div>

                            <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10">
                              <Label htmlFor="timeOfFollowUp" className="text-gray-300 mb-3 block">Time of Follow-up</Label>
                              <Input
                                id="timeOfFollowUp"
                                type="time"
                                value={timeOfFollowUp}
                                onChange={(e) => setTimeOfFollowUp(e.target.value)}
                                className="bg-slate-900/50 border-white/10 text-white"
                              />
                            </div>
                          </motion.div>
                        )}

                        <div className="flex gap-2 justify-end pt-4 border-t border-white/10">
                          <Button 
                            variant="outline" 
                            onClick={() => setOutreachStep(0)}
                            className="bg-white/5 border-white/10 text-white"
                          >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                          </Button>
                          {outreachMethod && (
                            <Button 
                              onClick={() => setOutreachStep(2)}
                              className="bg-gradient-to-r from-cyan-500 to-blue-600"
                            >
                              Continue to Templates <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                          )}
                        </div>
                      </div>
                    )}

                    {outreachStep === 2 && editingOffering !== null && editingOffering !== -1 && (
                      <div className="space-y-6 py-4">
                        <div className="text-center mb-6">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 mx-auto mb-3">
                            <Mail className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">
                            Configure Templates for {offerings.find(o => o.id === editingOffering)?.name}
                          </h3>
                          <p className="text-sm text-gray-400">Set up your outreach, follow-up, and closing templates</p>
                        </div>

                        <div className="space-y-6">
                          {/* Outreach Template */}
                          <div className="bg-slate-800/50 rounded-xl p-5 border border-white/10">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                                  1
                                </div>
                                <Label className="text-base font-semibold text-white">Outreach Template</Label>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-2 border-cyan-500/30 hover:bg-cyan-500/10 text-cyan-400"
                                onClick={() => {
                                  const prompt = outreachAIPrompt || '';
                                  const aiTemplate = `Hi {{FirstName}},\n\n${prompt || `I noticed your company might benefit from our ${offerings.find(o => o.id === editingOffering)?.name}.`}\n\nWould you be open to a quick chat?\n\nBest regards,\n{{YourName}}`;
                                  const offering = offerings.find(o => o.id === editingOffering);
                                  if (offering) {
                                    setOfferings(offerings.map(o => 
                                      o.id === offering.id ? { 
                                        ...o, 
                                        templates: { ...o.templates, outreach: aiTemplate }
                                      } : o
                                    ));
                                  }
                                  setOutreachAIPrompt('');
                                }}
                              >
                                <SparklesIcon className="w-4 h-4" />
                                Generate with AI
                              </Button>
                            </div>
                            <div className="bg-slate-900/50 rounded-lg p-3 border border-white/10 mb-3">
                              <Label htmlFor="outreach-ai-prompt" className="text-sm font-medium mb-2 block text-gray-300">
                                AI Generation Prompt (Optional)
                              </Label>
                              <Input
                                id="outreach-ai-prompt"
                                placeholder="E.g., Focus on cost savings and automation benefits..."
                                value={outreachAIPrompt}
                                onChange={(e) => setOutreachAIPrompt(e.target.value)}
                                className="bg-slate-800/50 border-white/10 text-white"
                              />
                            </div>
                            <Textarea
                              placeholder="Hi {{FirstName}},\n\nYour outreach message here...\n\nBest regards,\n{{YourName}}"
                              className="min-h-[140px] bg-slate-900/50 border-white/10 font-mono text-sm text-white"
                              value={offerings.find(o => o.id === editingOffering)?.templates.outreach || ''}
                              onChange={(e) => {
                                const offering = offerings.find(o => o.id === editingOffering);
                                if (offering) {
                                  setOfferings(offerings.map(o => 
                                    o.id === offering.id ? { 
                                      ...o, 
                                      templates: { ...o.templates, outreach: e.target.value }
                                    } : o
                                  ));
                                }
                              }}
                            />
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-2 border-white/10 hover:bg-white/5 text-gray-300"
                                onClick={() => {
                                  const link = window.prompt('Enter link to insert:');
                                  if (link) {
                                    const offering = offerings.find(o => o.id === editingOffering);
                                    if (offering) {
                                      const currentValue = offering.templates.outreach || '';
                                      setOfferings(offerings.map(o => 
                                        o.id === offering.id ? { 
                                          ...o, 
                                          templates: { ...o.templates, outreach: currentValue + ` ${link}` }
                                        } : o
                                      ));
                                    }
                                  }
                                }}
                              >
                                <Link2 className="w-4 h-4" />
                                Insert Link
                              </Button>
                            </div>
                          </div>

                          {/* Follow-up Template */}
                          {outreachMethod === 'ai' && (
                            <div className="bg-slate-800/50 rounded-xl p-5 border border-white/10">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                    2
                                  </div>
                                  <Label className="text-base font-semibold text-white">Follow-up Template</Label>
                                </div>
                              </div>
                              <div className="mb-4 space-y-2">
                                <Label className="text-sm text-gray-300">Follow-up Strategy</Label>
                                <div className="flex gap-4">
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      id="same-followup"
                                      name="followup-strategy"
                                      checked={followupStrategy[editingOffering.toString()] !== 'custom'}
                                      onChange={() => setFollowupStrategy({ ...followupStrategy, [editingOffering.toString()]: 'same' })}
                                      className="w-4 h-4 text-cyan-500"
                                    />
                                    <label htmlFor="same-followup" className="text-sm text-gray-300">Same template for all follow-ups</label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      id="custom-followup"
                                      name="followup-strategy"
                                      checked={followupStrategy[editingOffering.toString()] === 'custom'}
                                      onChange={() => setFollowupStrategy({ ...followupStrategy, [editingOffering.toString()]: 'custom' })}
                                      className="w-4 h-4 text-cyan-500"
                                    />
                                    <label htmlFor="custom-followup" className="text-sm text-gray-300">Customize each follow-up</label>
                                  </div>
                                </div>
                              </div>
                              {followupStrategy[editingOffering.toString()] === 'custom' ? (
                                <div className="space-y-3">
                                  {Array.from({ length: parseInt(followUpCount === 'custom' ? customFollowUpCount : followUpCount || '1') }).map((_, idx) => (
                                    <div key={idx} className="bg-slate-900/50 rounded-lg p-3 border border-white/10">
                                      <Label className="text-sm font-medium mb-2 block text-gray-300">Follow-up {idx + 1}</Label>
                                      <Textarea
                                        placeholder={`Follow-up ${idx + 1} message...`}
                                        className="min-h-[100px] bg-slate-800/50 border-white/10 text-white"
                                        value={outreachTemplates[`${editingOffering}-followup-${idx + 1}`] || ''}
                                        onChange={(e) => {
                                          setOutreachTemplates({
                                            ...outreachTemplates,
                                            [`${editingOffering}-followup-${idx + 1}`]: e.target.value
                                          });
                                        }}
                                      />
                        </div>
                      ))}
                    </div>
                              ) : (
                                <Textarea
                                  placeholder="Follow-up message template..."
                                  className="min-h-[140px] bg-slate-900/50 border-white/10 font-mono text-sm text-white"
                                  value={offerings.find(o => o.id === editingOffering)?.templates.followup || ''}
                                  onChange={(e) => {
                                    const offering = offerings.find(o => o.id === editingOffering);
                                    if (offering) {
                                      setOfferings(offerings.map(o => 
                                        o.id === offering.id ? { 
                                          ...o, 
                                          templates: { ...o.templates, followup: e.target.value }
                                        } : o
                                      ));
                                    }
                                  }}
                                />
                              )}
                  </div>
                          )}

                          {/* Closing Template */}
                          <div className="bg-slate-800/50 rounded-xl p-5 border border-white/10">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-sm">
                                3
                              </div>
                              <Label className="text-base font-semibold text-white">Closing Template</Label>
                            </div>
                            <Textarea
                              placeholder="Closing message template..."
                              className="min-h-[140px] bg-slate-900/50 border-white/10 font-mono text-sm text-white"
                              value={offerings.find(o => o.id === editingOffering)?.templates.closing || ''}
                              onChange={(e) => {
                                const offering = offerings.find(o => o.id === editingOffering);
                                if (offering) {
                                  setOfferings(offerings.map(o => 
                                    o.id === offering.id ? { 
                                      ...o, 
                                      templates: { ...o.templates, closing: e.target.value }
                                    } : o
                                  ));
                                }
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex gap-2 justify-end pt-4 border-t border-white/10">
                          <Button 
                            variant="outline" 
                            onClick={() => setOutreachStep(1)}
                            className="bg-white/5 border-white/10 text-white"
                          >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                          </Button>
                          <Button 
                            onClick={() => {
                              console.log('Saving outreach configuration:', {
                                offering: editingOffering,
                                method: outreachMethod,
                                channels: outreachChannels,
                                followUpCount: followUpCount === 'custom' ? customFollowUpCount : followUpCount,
                                followUpFrequency: followUpFrequency === 'custom' ? customFrequency : followUpFrequency,
                                timeOfFollowUp,
                                templates: offerings.find(o => o.id === editingOffering)?.templates
                              });
                              setEditingOffering(null);
                              setOutreachStep(0);
                              setOutreachOffering('');
                              setOutreachMethod(null);
                              setOutreachChannels([]);
                              setFollowUpCount('');
                              setFollowUpFrequency('');
                              setTimeOfFollowUp('');
                              setCustomFollowUpCount('');
                              setCustomFrequency('');
                              setOutreachTemplates({});
                              setFollowupStrategy({});
                              setOutreachAIPrompt('');
                            }}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Complete Setup
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
            </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <AnimatePresence mode="wait">
            <motion.div
                key="notifications-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              className="space-y-6"
            >
                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardHeader className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                    <CardDescription className="text-gray-400">Manage how you receive updates and alerts</CardDescription>
                </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {[
                      { title: 'Email Notifications', desc: 'Receive email updates about your campaigns', checked: true },
                      { title: 'Push Notifications', desc: 'Get real-time alerts on your device', checked: true },
                      { title: 'Weekly Reports', desc: 'Receive weekly performance summaries', checked: true },
                      { title: 'Lead Updates', desc: 'Get notified when leads respond', checked: true },
                      { title: 'Campaign Completion', desc: 'Alert when campaigns finish', checked: false },
                    ].map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-white/10 hover:border-cyan-500/30 transition-all group"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                          <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                        <motion.div whileTap={{ scale: 0.95 }}>
                      <Checkbox 
                            defaultChecked={item.checked}
                            className="data-[state=checked]:bg-cyan-500 border-white/20 w-6 h-6"
                          />
                        </motion.div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key="security-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardHeader className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Key className="w-5 h-5" />
                      Password & Authentication
                    </CardTitle>
                    <CardDescription className="text-gray-400">Manage your password and security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-300">Current Password</Label>
                        <Input id="currentPassword" type="password" placeholder="••••••••" className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" />
                      </motion.div>
                      <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                        <Label htmlFor="newPassword" className="text-sm font-medium text-gray-300">New Password</Label>
                        <Input id="newPassword" type="password" placeholder="••••••••" className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" />
                      </motion.div>
                      <motion.div whileFocus={{ scale: 1.02 }} className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" placeholder="••••••••" className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500" />
                      </motion.div>
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600">
                        Update Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardHeader className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Smartphone className="w-5 h-5" />
                      Two-Factor Authentication
                    </CardTitle>
                    <CardDescription className="text-gray-400">Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-white/10">
                      <div>
                        <h4 className="font-semibold text-white mb-1">Enable 2FA</h4>
                        <p className="text-sm text-gray-400">Protect your account with two-factor authentication</p>
                      </div>
                      <Checkbox className="data-[state=checked]:bg-cyan-500 border-white/20 w-6 h-6" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardHeader className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Shield className="w-5 h-5" />
                      Active Sessions
                    </CardTitle>
                    <CardDescription className="text-gray-400">Manage your active login sessions</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-3">
                    {[
                      { device: 'Chrome on Windows', location: 'New York, US', current: true },
                      { device: 'Safari on MacBook Pro', location: 'San Francisco, US', current: false },
                    ].map((session, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-white/10"
                      >
                        <div>
                          <h4 className="font-semibold text-white text-sm">{session.device}</h4>
                          <p className="text-xs text-gray-400">{session.location}</p>
                          {session.current && (
                            <Badge className="mt-1 bg-green-500/20 text-green-400 text-xs">Current Session</Badge>
                          )}
                      </div>
                        {!session.current && (
                          <Button size="sm" variant="outline" className="bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20">
                            Revoke
                          </Button>
                        )}
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key="billing-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardHeader className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <CreditCard className="w-5 h-5" />
                      Current Plan
                    </CardTitle>
                    <CardDescription className="text-gray-400">Manage your subscription and billing</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="p-6 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">Premium Plan</h3>
                          <p className="text-sm text-gray-400">Unlimited prospects, AI features, and priority support</p>
                        </div>
                        <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1">Active</Badge>
                      </div>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-4xl font-bold text-white">$99</span>
                        <span className="text-gray-400">/ month</span>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600">
                          Upgrade Plan
                        </Button>
                        <Button variant="outline" className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10">
                          Cancel Subscription
                        </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardHeader className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <CreditCard className="w-5 h-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                          <CreditCard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-sm">•••• •••• •••• 4242</h4>
                          <p className="text-xs text-gray-400">Expires 12/2025</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                        Update
                      </Button>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardHeader className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Clock className="w-5 h-5" />
                      Billing History
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {[
                        { date: 'Jan 1, 2025', amount: '$99.00', status: 'Paid' },
                        { date: 'Dec 1, 2024', amount: '$99.00', status: 'Paid' },
                        { date: 'Nov 1, 2024', amount: '$99.00', status: 'Paid' },
                      ].map((invoice, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-white/10"
                        >
                          <div>
                            <h4 className="font-semibold text-white text-sm">{invoice.date}</h4>
                            <p className="text-xs text-gray-400">Premium Plan</p>
                          </div>
                          <div className="text-right flex items-center gap-3">
                            <span className="text-white font-semibold">{invoice.amount}</span>
                            <Badge className="bg-green-500/20 text-green-400 text-xs">{invoice.status}</Badge>
                            <Button size="sm" variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
                              Download
                            </Button>
                          </div>
            </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key="integrations-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardHeader className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Plug className="w-5 h-5" />
                      Connected Apps
                    </CardTitle>
                    <CardDescription className="text-gray-400">Manage your third-party integrations</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { name: 'Google Workspace', desc: 'Gmail, Calendar, Drive', connected: true },
                        { name: 'Microsoft 365', desc: 'Outlook, Teams, OneDrive', connected: false },
                        { name: 'Slack', desc: 'Team communication', connected: true },
                        { name: 'Salesforce', desc: 'CRM integration', connected: false },
                        { name: 'Zoom', desc: 'Video meetings', connected: true },
                        { name: 'HubSpot', desc: 'Marketing automation', connected: false },
                      ].map((app, index) => (
                        <motion.div
                          key={app.name}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-lg bg-slate-800/50 border border-white/10 hover:border-cyan-500/50 transition-all"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-white">{app.name}</h4>
                            <Badge className={app.connected ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}>
                              {app.connected ? 'Connected' : 'Not Connected'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400 mb-3">{app.desc}</p>
                          <Button 
                            size="sm" 
                            className={app.connected ? 'w-full bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'w-full bg-gradient-to-r from-cyan-500 to-blue-600'}
                          >
                            {app.connected ? 'Disconnect' : 'Connect'}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardHeader className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Key className="w-5 h-5" />
                      API Keys
                    </CardTitle>
                    <CardDescription className="text-gray-400">Manage your API access</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="p-4 rounded-lg bg-slate-800/50 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white text-sm">Production API Key</h4>
                        <Badge className="bg-green-500/20 text-green-400 text-xs">Active</Badge>
                      </div>
                      <p className="text-sm text-gray-400 font-mono mb-3">sk_live_••••••••••••••••4242</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                          Copy
                        </Button>
                        <Button size="sm" variant="outline" className="bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20">
                          Revoke
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Generate New API Key
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key="preferences-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardHeader className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Globe className="w-5 h-5" />
                      Regional Settings
                    </CardTitle>
                    <CardDescription className="text-gray-400">Configure your regional preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">Time Zone</Label>
                      <Select defaultValue="est">
                        <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                          <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                          <SelectItem value="cst">Central Time (CST)</SelectItem>
                          <SelectItem value="est">Eastern Time (EST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">Date Format</Label>
                      <Select defaultValue="mdy">
                        <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">Currency</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="gbp">GBP (£)</SelectItem>
                          <SelectItem value="jpy">JPY (¥)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardHeader className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Languages className="w-5 h-5" />
                      Language
                    </CardTitle>
                    <CardDescription className="text-gray-400">Choose your preferred language</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-300">Display Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="zh">中文</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <CardHeader className="border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Palette className="w-5 h-5" />
                      Appearance
                    </CardTitle>
                    <CardDescription className="text-gray-400">Customize your dashboard appearance</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      {['Dark', 'Light', 'System'].map((theme) => (
                        <motion.button
                          key={theme}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            theme === 'Dark'
                              ? 'border-cyan-500 bg-cyan-500/10'
                              : 'border-white/10 bg-slate-800/50 hover:border-white/20'
                          }`}
                        >
                          <div className={`w-full h-20 rounded-lg mb-2 ${
                            theme === 'Dark' ? 'bg-slate-900' :
                            theme === 'Light' ? 'bg-white' :
                            'bg-gradient-to-br from-slate-900 to-white'
                          }`} />
                          <p className="text-sm font-medium text-white">{theme}</p>
                        </motion.button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Chat Assistant */}
      <ChatAssistant />
    </div>
  );
}
