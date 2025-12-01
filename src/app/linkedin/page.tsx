'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import ChatAssistant from '@/components/chat-assistant';
import {
  Linkedin,
  ArrowLeft,
  Send,
  Search,
  Users,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  Plus,
  Sparkles,
  FileText,
  BarChart3,
  Clock,
  CheckCircle2,
  XCircle,
  Zap,
  UserPlus,
  Share2,
  Target,
  Building,
  Mail,
  Phone,
  ExternalLink,
  RefreshCw,
  Play,
  Pause,
  Edit,
  Trash2,
  Download,
  Upload,
  Link2,
  Activity,
  Award,
  TrendingUp as TrendingUpIcon,
  Image as ImageIcon,
  Video,
  BookOpen,
  FileText as FileTextIcon,
  Wand2,
  Hash,
  Save,
  Calendar as CalendarIcon,
  Type,
  Layers,
  Grid3x3,
  Palette,
  Music,
  Film,
  Eye,
  ThumbsUp,
  MessageCircle as MessageCircleIcon,
  Share2 as Share2Icon,
  Download as DownloadIcon
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function LinkedInPage() {
  const [selectedTab, setSelectedTab] = useState('inbox');
  const [showCompose, setShowCompose] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showSchedulePost, setShowSchedulePost] = useState(false);
  const [showSyncProspects, setShowSyncProspects] = useState(false);
  const [composeMode, setComposeMode] = useState<'single' | 'bulk'>('single');
  const [selectedProspects, setSelectedProspects] = useState<number[]>([]);
  const [selectedOffering, setSelectedOffering] = useState('');
  const [campaignStep, setCampaignStep] = useState(1);
  
  // Compose states
  const [composeTo, setComposeTo] = useState('');
  const [composeMessage, setComposeMessage] = useState('');
  const [composeTemplate, setComposeTemplate] = useState('');
  const [useAIPrompt, setUseAIPrompt] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  
  // Campaign states
  const [campaignName, setCampaignName] = useState('');
  const [campaignOffering, setCampaignOffering] = useState('');
  const [campaignTemplate, setCampaignTemplate] = useState('');
  const [campaignProspects, setCampaignProspects] = useState<number[]>([]);
  const [campaignAutomation, setCampaignAutomation] = useState(true);
  
  // Content Creation States
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCreateBlog, setShowCreateBlog] = useState(false);
  const [showCreateVideo, setShowCreateVideo] = useState(false);
  const [showCreateImage, setShowCreateImage] = useState(false);
  const [contentType, setContentType] = useState<'post' | 'blog' | 'video' | 'image'>('post');
  const [postPrompt, setPostPrompt] = useState('');
  const [generatedCaption, setGeneratedCaption] = useState('');
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<File[]>([]);
  const [postSchedule, setPostSchedule] = useState<{ date: string; time: string } | null>(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogSEO, setBlogSEO] = useState({ keywords: '', description: '' });
  const [blogPrompt, setBlogPrompt] = useState('');
  const [isGeneratingBlog, setIsGeneratingBlog] = useState(false);
  const [videoPrompt, setVideoPrompt] = useState('');
  const [videoScript, setVideoScript] = useState('');
  const [videoStoryboard, setVideoStoryboard] = useState('');
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [selectedProspect, setSelectedProspect] = useState<number | null>(null);
  const [showConnectionRequest, setShowConnectionRequest] = useState(false);
  const [connectionRequestMessage, setConnectionRequestMessage] = useState('');
  const [contentLibrary, setContentLibrary] = useState<Array<{
    id: number;
    type: 'post' | 'blog' | 'video' | 'image';
    title?: string;
    caption?: string;
    content?: string;
    hashtags: string[];
    media: string[];
    scheduled: boolean;
    scheduledDate?: string;
    status: 'draft' | 'scheduled' | 'published';
    createdAt: string;
    engagement?: { views: number; likes: number; comments: number; shares: number };
  }>>([]);
  
  // Offerings data
  const offerings = [
    { id: 'enterprise', name: 'Enterprise Solutions' },
    { id: 'saas', name: 'SaaS Products' },
    { id: 'consulting', name: 'Consulting Services' }
  ];

  // Mock data
  const stats = [
    { label: 'Total Connections', value: '2,543', change: '+12.5%', trend: 'up' },
    { label: 'Messages Sent', value: '1,247', change: '+8.2%', trend: 'up' },
    { label: 'Response Rate', value: '34.5%', change: '+5.1%', trend: 'up' },
    { label: 'Leads Converted', value: '156', change: '+18.3%', trend: 'up' }
  ];

  const messages = [
    {
      id: 1,
      from: 'John Smith',
      company: 'Acme Corp',
      avatar: 'JS',
      message: 'Hi, I saw your post about AI automation. Would love to connect!',
      time: '2 hours ago',
      unread: true,
      type: 'incoming'
    },
    {
      id: 2,
      from: 'Sarah Johnson',
      company: 'Tech Startup',
      avatar: 'SJ',
      message: 'Thanks for the connection request. Let\'s schedule a call.',
      time: '5 hours ago',
      unread: true,
      type: 'incoming'
    },
    {
      id: 3,
      from: 'Mike Wilson',
      company: 'Big Enterprise',
      avatar: 'MW',
      message: 'Following up on our conversation about enterprise solutions...',
      time: '1 day ago',
      unread: false,
      type: 'sent'
    }
  ];

  const templates = [
    { id: 1, name: 'Connection Request', type: 'connection', content: 'Hi {{FirstName}}, I noticed we\'re both in {{Industry}}. Would love to connect!' },
    { id: 2, name: 'Follow-up Message', type: 'followup', content: 'Hi {{FirstName}}, following up on our previous conversation...' },
    { id: 3, name: 'Sales Outreach', type: 'sales', content: 'Hi {{FirstName}}, I saw {{Company}} is looking for {{Solution}}. We can help!' }
  ];

  const prospects = [
    { id: 1, name: 'John Smith', company: 'Acme Corp', title: 'CEO', linkedinUrl: 'linkedin.com/in/johnsmith', status: 'Not Connected', offering: 'enterprise', leadScore: 85, email: 'john@acme.com', phone: '+1 555-0101' },
    { id: 2, name: 'Sarah Johnson', company: 'Tech Startup', title: 'CTO', linkedinUrl: 'linkedin.com/in/sarahjohnson', status: 'Connected', offering: 'saas', leadScore: 72, email: 'sarah@techstartup.com', phone: '+1 555-0102' },
    { id: 3, name: 'Mike Wilson', company: 'Big Enterprise', title: 'VP Sales', linkedinUrl: 'linkedin.com/in/mikewilson', status: 'Pending', offering: 'enterprise', leadScore: 91, email: 'mike@bigenterprise.com', phone: '+1 555-0103' },
    { id: 4, name: 'Emily Chen', company: 'TechStart Inc', title: 'CMO', linkedinUrl: 'linkedin.com/in/emilychen', status: 'Connected', offering: 'consulting', leadScore: 68, email: 'emily@techstart.com', phone: '+1 555-0104' },
    { id: 5, name: 'David Martinez', company: 'Global Corp', title: 'Director', linkedinUrl: 'linkedin.com/in/davidmartinez', status: 'Not Connected', offering: 'enterprise', leadScore: 79, email: 'david@global.com', phone: '+1 555-0105' }
  ];
  
  const campaigns = [
    { id: 1, name: 'Enterprise Q1 Outreach', offering: 'enterprise', status: 'Active', sent: 234, responses: 45, conversions: 12, startDate: '2025-01-15' },
    { id: 2, name: 'SaaS Product Launch', offering: 'saas', status: 'Paused', sent: 156, responses: 28, conversions: 8, startDate: '2025-01-20' },
    { id: 3, name: 'Consulting Services', offering: 'consulting', status: 'Completed', sent: 89, responses: 23, conversions: 5, startDate: '2025-01-10' }
  ];
  
  const scheduledPosts = [
    { id: 1, content: 'Excited to share our new AI-powered sales automation tool...', scheduledFor: '2025-01-25 10:00 AM', status: 'Scheduled', offering: 'enterprise' },
    { id: 2, content: '5 ways to improve your sales pipeline efficiency...', scheduledFor: '2025-01-26 02:00 PM', status: 'Scheduled', offering: 'saas' }
  ];

  // Handler functions
  const handleReply = (messageId: number) => {
    const message = messages.find(m => m.id === messageId);
    if (message) {
      setSelectedMessage(messageId);
      setComposeTo(message.from);
      setComposeMode('single');
      setShowCompose(true);
    }
  };

  const handleViewProfile = (prospectId: number) => {
    const prospect = prospects.find(p => p.id === prospectId);
    if (prospect) {
      window.open(`https://${prospect.linkedinUrl}`, '_blank');
    }
  };

  const handleSendMessage = (prospectId: number) => {
    const prospect = prospects.find(p => p.id === prospectId);
    if (prospect) {
      setSelectedProspect(prospectId);
      setComposeTo(prospect.name);
      setComposeMode('single');
      setShowCompose(true);
    }
  };

  const handleConnectionRequest = (prospectId: number) => {
    const prospect = prospects.find(p => p.id === prospectId);
    if (prospect) {
      setSelectedProspect(prospectId);
      setShowConnectionRequest(true);
      // Pre-fill with template
      setConnectionRequestMessage(`Hi ${prospect.name.split(' ')[0]}, I noticed we're both in the ${offerings.find(o => o.id === prospect.offering)?.name} space. Would love to connect!`);
    }
  };

  const handleUseTemplate = (templateId: number) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setComposeMessage(template.content);
      setComposeTemplate(templateId.toString());
      setShowCompose(true);
    }
  };

  const handleEditTemplate = (templateId: number) => {
    // Open edit dialog for template
    console.log('Edit template:', templateId);
    // You can add a template edit dialog here
  };

  const handleEditContent = (contentId: number) => {
    const content = contentLibrary.find(c => c.id === contentId);
    if (content) {
      if (content.type === 'post') {
        setGeneratedCaption(content.caption || '');
        setGeneratedHashtags(content.hashtags);
        setContentType('post');
        setShowCreatePost(true);
      } else if (content.type === 'blog') {
        setBlogTitle(content.title || '');
        setBlogContent(content.content || '');
        setContentType('blog');
        setShowCreateBlog(true);
      } else if (content.type === 'video') {
        setContentType('video');
        setShowCreateVideo(true);
      } else if (content.type === 'image') {
        setContentType('image');
        setShowCreateImage(true);
      }
    }
  };

  const handleDeleteContent = (contentId: number) => {
    if (confirm('Are you sure you want to delete this content?')) {
      setContentLibrary(contentLibrary.filter(c => c.id !== contentId));
    }
  };

  const handlePauseCampaign = (campaignId: number) => {
    console.log('Pause campaign:', campaignId);
    // Update campaign status
  };

  const handleResumeCampaign = (campaignId: number) => {
    console.log('Resume campaign:', campaignId);
    // Update campaign status
  };

  const handleViewCampaignAnalytics = (campaignId: number) => {
    console.log('View analytics for campaign:', campaignId);
    setShowAnalytics(true);
  };

  const handleExportCampaign = (campaignId: number) => {
    console.log('Export campaign:', campaignId);
    // Export campaign data
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ x: -5 }}
                  className="p-2 rounded-lg hover:bg-white/5"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </motion.button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">LinkedIn Outreach</h1>
                  <p className="text-sm text-gray-400">Manage connections, messages, and campaigns</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowSyncProspects(true)}
                variant="outline"
                className="bg-white/5 border-white/10 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync Prospects
              </Button>
              <Button
                onClick={() => setShowAnalytics(true)}
                variant="outline"
                className="bg-white/5 border-white/10 text-white"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button
                onClick={() => {
                  setShowCompose(true);
                  setComposeMode('single');
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Message
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                  <p className={`text-xs ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white text-lg">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                  <TabsList className="flex flex-col w-full h-auto bg-transparent p-0">
                    <TabsTrigger 
                      value="inbox" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-400"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Inbox
                      <Badge className="ml-auto bg-blue-500/20 text-blue-400">12</Badge>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="sent" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-400"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Sent
                    </TabsTrigger>
                    <TabsTrigger 
                      value="connections" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-400"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Connections
                    </TabsTrigger>
                    <TabsTrigger 
                      value="campaigns" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-400"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Campaigns
                    </TabsTrigger>
                    <TabsTrigger 
                      value="templates" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-400"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Templates
                    </TabsTrigger>
                    <TabsTrigger 
                      value="posts" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-400"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Posts
                    </TabsTrigger>
                    <TabsTrigger 
                      value="content" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-400"
                    >
                      <Grid3x3 className="w-4 h-4 mr-2" />
                      Content Creation
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              {/* Inbox */}
              <TabsContent value="inbox" className="space-y-4">
                <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Inbox</CardTitle>
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Search messages..."
                          className="w-64 bg-slate-800/50 border-white/10 text-white"
                        />
                        <Button variant="outline" size="sm" className="bg-slate-800/50 border-white/10 text-white">
                          <Filter className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {messages.filter(m => m.type === 'incoming').map((message) => (
                        <motion.div
                          key={message.id}
                          whileHover={{ scale: 1.01 }}
                          className="p-4 rounded-lg bg-slate-800/50 border border-white/10 hover:border-blue-500/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                              {message.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <div>
                                  <p className="font-semibold text-white">{message.from}</p>
                                  <p className="text-xs text-gray-400">{message.company}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-400">{message.time}</span>
                                  {message.unread && (
                                    <Badge className="bg-blue-500/20 text-blue-400 text-xs">New</Badge>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-gray-300 mt-2">{message.message}</p>
                              <div className="flex items-center gap-2 mt-3">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="bg-blue-500/10 border-blue-500/30 text-blue-400"
                                  onClick={() => handleReply(message.id)}
                                >
                                  <MessageSquare className="w-3 h-3 mr-1" />
                                  Reply
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="bg-white/5 border-white/10 text-gray-400"
                                  onClick={() => {
                                    const prospect = prospects.find(p => p.name === message.from);
                                    if (prospect) {
                                      handleViewProfile(prospect.id);
                                    }
                                  }}
                                >
                                  View Profile
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Sent */}
              <TabsContent value="sent" className="space-y-4">
                <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white">Sent Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {messages.filter(m => m.type === 'sent').map((message) => (
                        <div key={message.id} className="p-4 rounded-lg bg-slate-800/50 border border-white/10">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                              {message.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <p className="font-semibold text-white">{message.from}</p>
                                <span className="text-xs text-gray-400">{message.time}</span>
                              </div>
                              <p className="text-sm text-gray-300 mt-2">{message.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Connections */}
              <TabsContent value="connections" className="space-y-4">
                <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Connections & Prospects</CardTitle>
                      <div className="flex items-center gap-2">
                        <Select value={selectedOffering} onValueChange={setSelectedOffering}>
                          <SelectTrigger className="w-48 bg-slate-800/50 border-white/10 text-white">
                            <SelectValue placeholder="Filter by Offering" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Offerings</SelectItem>
                            {offerings.map(offering => (
                              <SelectItem key={offering.id} value={offering.id}>
                                {offering.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button 
                          className="bg-gradient-to-r from-blue-600 to-blue-700"
                          onClick={() => {
                            // Open find connections dialog or navigate
                            console.log('Find connections');
                            // You can add a dialog here for finding connections
                          }}
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Find Connections
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {prospects.filter(p => !selectedOffering || selectedOffering === 'all' || p.offering === selectedOffering).map((prospect) => (
                        <div key={prospect.id} className="p-4 rounded-lg bg-slate-800/50 border border-white/10 hover:border-blue-500/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                                {prospect.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold text-white">{prospect.name}</p>
                                  <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                                    Score: {prospect.leadScore}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-400">{prospect.title} at {prospect.company}</p>
                                <div className="flex items-center gap-3 mt-1">
                                  <p className="text-xs text-blue-400">{prospect.linkedinUrl}</p>
                                  <Badge className="bg-purple-500/20 text-purple-400 text-xs">
                                    {offerings.find(o => o.id === prospect.offering)?.name}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-3 mt-2">
                                  <a href={`mailto:${prospect.email}`} className="text-xs text-gray-400 hover:text-blue-400 flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    {prospect.email}
                                  </a>
                                  <a href={`tel:${prospect.phone}`} className="text-xs text-gray-400 hover:text-blue-400 flex items-center gap-1">
                                    <Phone className="w-3 h-3" />
                                    {prospect.phone}
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={prospect.status === 'Connected' ? 'bg-green-500/20 text-green-400' : prospect.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'}>
                                {prospect.status}
                              </Badge>
                              {prospect.status === 'Connected' ? (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="bg-blue-500/10 border-blue-500/30 text-blue-400"
                                  onClick={() => handleSendMessage(prospect.id)}
                                >
                                  <MessageSquare className="w-3 h-3 mr-1" />
                                  Message
                                </Button>
                              ) : (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="bg-blue-500/10 border-blue-500/30 text-blue-400"
                                  onClick={() => handleConnectionRequest(prospect.id)}
                                >
                                  <UserPlus className="w-3 h-3 mr-1" />
                                  Connect
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="bg-white/5 border-white/10 text-gray-400"
                                onClick={() => handleViewProfile(prospect.id)}
                              >
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Campaigns */}
              <TabsContent value="campaigns" className="space-y-4">
                <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">LinkedIn Campaigns</CardTitle>
                      <Button 
                        onClick={() => {
                          setShowCreateCampaign(true);
                          setCampaignStep(1);
                        }}
                        className="bg-gradient-to-r from-blue-600 to-blue-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Campaign
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {campaigns.length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        <Zap className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium mb-2">No campaigns yet</p>
                        <p className="text-sm">Create your first LinkedIn outreach campaign</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {campaigns.map((campaign) => (
                          <Card key={campaign.id} className="bg-slate-800/50 border-white/10">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <div>
                                  <CardTitle className="text-white text-lg">{campaign.name}</CardTitle>
                                  <div className="flex items-center gap-3 mt-2">
                                    <Badge className="bg-blue-500/20 text-blue-400">
                                      {offerings.find(o => o.id === campaign.offering)?.name}
                                    </Badge>
                                    <Badge className={campaign.status === 'Active' ? 'bg-green-500/20 text-green-400' : campaign.status === 'Paused' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'}>
                                      {campaign.status}
                                    </Badge>
                                    <span className="text-xs text-gray-400">Started: {campaign.startDate}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {campaign.status === 'Active' ? (
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                                      onClick={() => handlePauseCampaign(campaign.id)}
                                    >
                                      <Pause className="w-3 h-3 mr-1" />
                                      Pause
                                    </Button>
                                  ) : (
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="bg-green-500/10 border-green-500/30 text-green-400"
                                      onClick={() => handleResumeCampaign(campaign.id)}
                                    >
                                      <Play className="w-3 h-3 mr-1" />
                                      Resume
                                    </Button>
                                  )}
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="bg-white/5 border-white/10 text-gray-400"
                                    onClick={() => {
                                      setShowCreateCampaign(true);
                                      setCampaignStep(1);
                                      // Pre-fill campaign data
                                    }}
                                  >
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-4 gap-4">
                                <div>
                                  <p className="text-sm text-gray-400 mb-1">Messages Sent</p>
                                  <p className="text-2xl font-bold text-white">{campaign.sent}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-400 mb-1">Responses</p>
                                  <p className="text-2xl font-bold text-white">{campaign.responses}</p>
                                  <p className="text-xs text-green-400 mt-1">
                                    {((campaign.responses / campaign.sent) * 100).toFixed(1)}% rate
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-400 mb-1">Conversions</p>
                                  <p className="text-2xl font-bold text-white">{campaign.conversions}</p>
                                  <p className="text-xs text-green-400 mt-1">
                                    {((campaign.conversions / campaign.sent) * 100).toFixed(1)}% rate
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-400 mb-1">ROI</p>
                                  <p className="text-2xl font-bold text-white">+{((campaign.conversions / campaign.sent) * 100 * 2.5).toFixed(0)}%</p>
                                </div>
                              </div>
                              <div className="mt-4 flex items-center gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="bg-blue-500/10 border-blue-500/30 text-blue-400"
                                  onClick={() => handleViewCampaignAnalytics(campaign.id)}
                                >
                                  <BarChart3 className="w-3 h-3 mr-1" />
                                  View Analytics
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="bg-white/5 border-white/10 text-gray-400"
                                  onClick={() => handleExportCampaign(campaign.id)}
                                >
                                  <Download className="w-3 h-3 mr-1" />
                                  Export
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Templates */}
              <TabsContent value="templates" className="space-y-4">
                <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Message Templates</CardTitle>
                      <Button className="bg-gradient-to-r from-blue-600 to-blue-700">
                        <Plus className="w-4 h-4 mr-2" />
                        New Template
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {templates.map((template) => (
                        <Card key={template.id} className="bg-slate-800/50 border-white/10">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-white text-base">{template.name}</CardTitle>
                              <Badge className="bg-blue-500/20 text-blue-400">{template.type}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-300 mb-4">{template.content}</p>
                            <div className="flex items-center gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="bg-blue-500/10 border-blue-500/30 text-blue-400"
                                onClick={() => handleUseTemplate(template.id)}
                              >
                                Use Template
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="bg-white/5 border-white/10 text-gray-400"
                                onClick={() => handleEditTemplate(template.id)}
                              >
                                Edit
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Posts */}
              <TabsContent value="posts" className="space-y-4">
                <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Scheduled Posts</CardTitle>
                      <Button 
                        onClick={() => setShowSchedulePost(true)}
                        className="bg-gradient-to-r from-blue-600 to-blue-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Schedule Post
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {scheduledPosts.length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        <Share2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium mb-2">No scheduled posts</p>
                        <p className="text-sm">Schedule your first LinkedIn post</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {scheduledPosts.map((post) => (
                          <Card key={post.id} className="bg-slate-800/50 border-white/10">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <div>
                                  <CardTitle className="text-white text-base">Post #{post.id}</CardTitle>
                                  <div className="flex items-center gap-3 mt-2">
                                    <Badge className="bg-blue-500/20 text-blue-400">
                                      {offerings.find(o => o.id === post.offering)?.name}
                                    </Badge>
                                    <Badge className="bg-green-500/20 text-green-400">
                                      {post.status}
                                    </Badge>
                                    <span className="text-xs text-gray-400">{post.scheduledFor}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-gray-400">
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                  <Button size="sm" variant="outline" className="bg-red-500/10 border-red-500/30 text-red-400">
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-300">{post.content}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Content Creation */}
              <TabsContent value="content" className="space-y-4">
                <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Content Creation & Management</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => {
                            setContentType('post');
                            setShowCreatePost(true);
                          }}
                          className="bg-gradient-to-r from-blue-600 to-blue-700"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Create Post
                        </Button>
                        <Button
                          onClick={() => {
                            setContentType('blog');
                            setShowCreateBlog(true);
                          }}
                          variant="outline"
                          className="bg-blue-500/10 border-blue-500/30 text-blue-400"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Write Article
                        </Button>
                        <Button
                          onClick={() => {
                            setContentType('video');
                            setShowCreateVideo(true);
                          }}
                          variant="outline"
                          className="bg-purple-500/10 border-purple-500/30 text-purple-400"
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Create Video
                        </Button>
                        <Button
                          onClick={() => {
                            setContentType('image');
                            setShowCreateImage(true);
                          }}
                          variant="outline"
                          className="bg-green-500/10 border-green-500/30 text-green-400"
                        >
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Create Image Post
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-blue-500/20">
                              <Share2 className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Total Posts</p>
                              <p className="text-2xl font-bold text-white">{contentLibrary.filter(c => c.type === 'post').length}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/30">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-purple-500/20">
                              <BookOpen className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Total Articles</p>
                              <p className="text-2xl font-bold text-white">{contentLibrary.filter(c => c.type === 'blog').length}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border-cyan-500/30">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-cyan-500/20">
                              <Video className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Total Videos</p>
                              <p className="text-2xl font-bold text-white">{contentLibrary.filter(c => c.type === 'video').length}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-green-500/20">
                              <ImageIcon className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Total Images</p>
                              <p className="text-2xl font-bold text-white">{contentLibrary.filter(c => c.type === 'image').length}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Content Library */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Content Library</h3>
                        <div className="flex items-center gap-2">
                          <Input
                            placeholder="Search content..."
                            className="w-64 bg-slate-800/50 border-white/10 text-white"
                          />
                          <Select defaultValue="all">
                            <SelectTrigger className="w-40 bg-slate-800/50 border-white/10 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Content</SelectItem>
                              <SelectItem value="draft">Drafts</SelectItem>
                              <SelectItem value="scheduled">Scheduled</SelectItem>
                              <SelectItem value="published">Published</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {contentLibrary.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                          <Grid3x3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium mb-2">No content yet</p>
                          <p className="text-sm">Create your first post, article, video, or image</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {contentLibrary.map((content) => (
                            <Card key={content.id} className="bg-slate-800/50 border-white/10 hover:border-blue-500/50 transition-colors">
                              <CardHeader>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    {content.type === 'post' && <Share2 className="w-4 h-4 text-blue-400" />}
                                    {content.type === 'blog' && <BookOpen className="w-4 h-4 text-purple-400" />}
                                    {content.type === 'video' && <Video className="w-4 h-4 text-cyan-400" />}
                                    {content.type === 'image' && <ImageIcon className="w-4 h-4 text-green-400" />}
                                    <Badge className={
                                      content.status === 'published' ? 'bg-green-500/20 text-green-400' :
                                      content.status === 'scheduled' ? 'bg-yellow-500/20 text-yellow-400' :
                                      'bg-gray-500/20 text-gray-400'
                                    }>
                                      {content.status}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button 
                                      size="sm" 
                                      variant="ghost" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => handleEditContent(content.id)}
                                    >
                                      <Edit className="w-3.5 h-3.5 text-gray-400" />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="ghost" 
                                      className="h-8 w-8 p-0"
                                      onClick={() => handleDeleteContent(content.id)}
                                    >
                                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                    </Button>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="aspect-video bg-slate-700/50 rounded-lg mb-3 flex items-center justify-center">
                                  {content.type === 'post' && <Share2 className="w-8 h-8 text-gray-500" />}
                                  {content.type === 'blog' && <BookOpen className="w-8 h-8 text-gray-500" />}
                                  {content.type === 'video' && <Video className="w-8 h-8 text-gray-500" />}
                                  {content.type === 'image' && <ImageIcon className="w-8 h-8 text-gray-500" />}
                                </div>
                                <p className="text-sm font-semibold text-white mb-1 line-clamp-1">
                                  {content.title || content.caption || 'Untitled'}
                                </p>
                                {content.caption && (
                                  <p className="text-sm text-gray-300 line-clamp-2 mb-2">{content.caption}</p>
                                )}
                                {content.engagement && (
                                  <div className="flex items-center gap-4 text-xs text-gray-400 pt-2 border-t border-white/10">
                                    <span className="flex items-center gap-1">
                                      <Eye className="w-3 h-3" />
                                      {content.engagement.views}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <ThumbsUp className="w-3 h-3" />
                                      {content.engagement.likes}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <MessageCircleIcon className="w-3 h-3" />
                                      {content.engagement.comments}
                                    </span>
                                  </div>
                                )}
                                {content.scheduled && content.scheduledDate && (
                                  <div className="flex items-center gap-1 text-xs text-yellow-400 mt-2">
                                    <CalendarIcon className="w-3 h-3" />
                                    Scheduled: {content.scheduledDate}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Compose Message Dialog */}
      <Dialog open={showCompose} onOpenChange={setShowCompose}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Compose LinkedIn Message</DialogTitle>
            <DialogDescription className="text-gray-400">
              Send a direct message or connection request
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex gap-2">
              <Button
                variant={composeMode === 'single' ? 'default' : 'outline'}
                onClick={() => setComposeMode('single')}
                className={composeMode === 'single' ? 'bg-blue-600' : 'bg-white/5 border-white/10 text-white'}
              >
                Single Message
              </Button>
              <Button
                variant={composeMode === 'bulk' ? 'default' : 'outline'}
                onClick={() => setComposeMode('bulk')}
                className={composeMode === 'bulk' ? 'bg-blue-600' : 'bg-white/5 border-white/10 text-white'}
              >
                Bulk Message
              </Button>
            </div>

            {composeMode === 'single' ? (
              <>
                <div>
                  <Label className="text-gray-300 mb-2 block">To</Label>
                  <Select value={composeTo} onValueChange={setComposeTo}>
                    <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                      <SelectValue placeholder="Select prospect..." />
                    </SelectTrigger>
                    <SelectContent>
                      {prospects.map(prospect => (
                        <SelectItem key={prospect.id} value={prospect.name}>
                          {prospect.name} - {prospect.company}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">Template (Optional)</Label>
                  <Select value={composeTemplate} onValueChange={setComposeTemplate}>
                    <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                      <SelectValue placeholder="Select a template..." />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map(template => (
                        <SelectItem key={template.id} value={template.id.toString()}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Checkbox
                      id="use-ai"
                      checked={useAIPrompt}
                      onCheckedChange={(checked) => setUseAIPrompt(checked as boolean)}
                    />
                    <Label htmlFor="use-ai" className="text-gray-300">Generate with AI</Label>
                  </div>
                  {useAIPrompt && (
                    <Input
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Enter prompt for AI generation..."
                      className="bg-slate-800/50 border-white/10 text-white mb-2"
                    />
                  )}
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">Message</Label>
                  <Textarea
                    value={composeMessage}
                    onChange={(e) => setComposeMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="min-h-[150px] bg-slate-800/50 border-white/10 text-white"
                  />
                </div>
              </>
            ) : (
              <div>
                <Label className="text-gray-300 mb-2 block">Select Prospects</Label>
                <div className="max-h-[200px] overflow-y-auto space-y-2 border border-white/10 rounded-lg p-3 bg-slate-800/50">
                  {prospects.map((prospect) => (
                    <div key={prospect.id} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedProspects.includes(prospect.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedProspects([...selectedProspects, prospect.id]);
                          } else {
                            setSelectedProspects(selectedProspects.filter(id => id !== prospect.id));
                          }
                        }}
                      />
                      <label className="text-sm text-gray-300 cursor-pointer">
                        {prospect.name} - {prospect.company}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Label className="text-gray-300 mb-2 block">Message Template</Label>
                  <Textarea
                    value={composeMessage}
                    onChange={(e) => setComposeMessage(e.target.value)}
                    placeholder="Type your message template (use {{FirstName}}, {{Company}} for personalization)..."
                    className="min-h-[150px] bg-slate-800/50 border-white/10 text-white"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2 justify-end pt-4 border-t border-white/10">
              <Button
                variant="outline"
                onClick={() => setShowCompose(false)}
                className="bg-white/5 border-white/10 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log('Sending LinkedIn message:', { composeMode, composeTo, composeMessage });
                  setShowCompose(false);
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sync Prospects Dialog */}
      <Dialog open={showSyncProspects} onOpenChange={setShowSyncProspects}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Sync Prospects from CRM</DialogTitle>
            <DialogDescription className="text-gray-400">
              Import prospects from your main prospects table to LinkedIn outreach
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-gray-300 mb-2 block">Filter by Offering</Label>
              <Select value={selectedOffering} onValueChange={setSelectedOffering}>
                <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                  <SelectValue placeholder="Select offering (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Offerings</SelectItem>
                  {offerings.map(offering => (
                    <SelectItem key={offering.id} value={offering.id}>
                      {offering.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <RefreshCw className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-400 mb-1">Sync Options</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sync-new" defaultChecked />
                      <label htmlFor="sync-new" className="text-sm text-gray-300">Sync new prospects only</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sync-linkedin" defaultChecked />
                      <label htmlFor="sync-linkedin" className="text-sm text-gray-300">Only prospects with LinkedIn URLs</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="update-existing" />
                      <label htmlFor="update-existing" className="text-sm text-gray-300">Update existing connections</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-4 border-t border-white/10">
              <Button
                variant="outline"
                onClick={() => setShowSyncProspects(false)}
                className="bg-white/5 border-white/10 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log('Syncing prospects:', { selectedOffering });
                  setShowSyncProspects(false);
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Campaign Dialog */}
      <Dialog open={showCreateCampaign} onOpenChange={setShowCreateCampaign}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Create LinkedIn Campaign</DialogTitle>
            <DialogDescription className="text-gray-400">
              Step {campaignStep} of 3: Set up your automated LinkedIn outreach campaign
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {campaignStep === 1 && (
              <>
                <div>
                  <Label className="text-gray-300 mb-2 block">Campaign Name *</Label>
                  <Input
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    placeholder="e.g., Enterprise Q1 Outreach"
                    className="bg-slate-800/50 border-white/10 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">Target Offering *</Label>
                  <Select value={campaignOffering} onValueChange={setCampaignOffering}>
                    <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                      <SelectValue placeholder="Select offering..." />
                    </SelectTrigger>
                    <SelectContent>
                      {offerings.map(offering => (
                        <SelectItem key={offering.id} value={offering.id}>
                          {offering.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">Message Template *</Label>
                  <Select value={campaignTemplate} onValueChange={setCampaignTemplate}>
                    <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                      <SelectValue placeholder="Select template..." />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map(template => (
                        <SelectItem key={template.id} value={template.id.toString()}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="automation"
                    checked={campaignAutomation}
                    onCheckedChange={(checked) => setCampaignAutomation(checked as boolean)}
                  />
                  <label htmlFor="automation" className="text-sm text-gray-300">
                    Enable automated follow-up sequences
                  </label>
                </div>
              </>
            )}
            {campaignStep === 2 && (
              <>
                <div>
                  <Label className="text-gray-300 mb-2 block">Select Prospects</Label>
                  <div className="max-h-[300px] overflow-y-auto space-y-2 border border-white/10 rounded-lg p-3 bg-slate-800/50">
                    {prospects.filter(p => !campaignOffering || p.offering === campaignOffering).map((prospect) => (
                      <div key={prospect.id} className="flex items-center space-x-2 p-2 rounded hover:bg-slate-700/50">
                        <Checkbox
                          checked={campaignProspects.includes(prospect.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setCampaignProspects([...campaignProspects, prospect.id]);
                            } else {
                              setCampaignProspects(campaignProspects.filter(id => id !== prospect.id));
                            }
                          }}
                        />
                        <label className="text-sm text-gray-300 cursor-pointer flex-1">
                          {prospect.name} - {prospect.company} (Score: {prospect.leadScore})
                        </label>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {campaignProspects.length} prospect(s) selected
                  </p>
                </div>
              </>
            )}
            {campaignStep === 3 && (
              <>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-3">Campaign Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Campaign Name:</span>
                      <span className="text-white">{campaignName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Offering:</span>
                      <span className="text-white">{offerings.find(o => o.id === campaignOffering)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Prospects:</span>
                      <span className="text-white">{campaignProspects.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Automation:</span>
                      <span className="text-white">{campaignAutomation ? 'Enabled' : 'Disabled'}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="flex gap-2 justify-end pt-4 border-t border-white/10">
              {campaignStep > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setCampaignStep(campaignStep - 1)}
                  className="bg-white/5 border-white/10 text-white"
                >
                  Back
                </Button>
              )}
              {campaignStep < 3 ? (
                <Button
                  onClick={() => setCampaignStep(campaignStep + 1)}
                  disabled={campaignStep === 1 && (!campaignName || !campaignOffering || !campaignTemplate)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 disabled:opacity-50"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    console.log('Creating campaign:', { campaignName, campaignOffering, campaignProspects, campaignAutomation });
                    setShowCreateCampaign(false);
                    setCampaignStep(1);
                    setCampaignName('');
                    setCampaignOffering('');
                    setCampaignTemplate('');
                    setCampaignProspects([]);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-blue-700"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Post Dialog */}
      <Dialog open={showSchedulePost} onOpenChange={setShowSchedulePost}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Schedule LinkedIn Post</DialogTitle>
            <DialogDescription className="text-gray-400">
              Create and schedule a post for your LinkedIn profile
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-gray-300 mb-2 block">Post Content *</Label>
              <Textarea
                placeholder="Write your LinkedIn post here..."
                className="min-h-[150px] bg-slate-800/50 border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300 mb-2 block">Related Offering</Label>
              <Select value={selectedOffering} onValueChange={setSelectedOffering}>
                <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                  <SelectValue placeholder="Select offering (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {offerings.map(offering => (
                    <SelectItem key={offering.id} value={offering.id}>
                      {offering.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300 mb-2 block">Schedule Date</Label>
                <Input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="bg-slate-800/50 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">Schedule Time</Label>
                <Input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="bg-slate-800/50 border-white/10 text-white"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-4 border-t border-white/10">
              <Button
                variant="outline"
                onClick={() => setShowSchedulePost(false)}
                className="bg-white/5 border-white/10 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log('Scheduling post:', { scheduleDate, scheduleTime, selectedOffering });
                  setShowSchedulePost(false);
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Analytics Dialog */}
      <Dialog open={showAnalytics} onOpenChange={setShowAnalytics}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-white">LinkedIn Analytics</DialogTitle>
            <DialogDescription className="text-gray-400">
              Track your LinkedIn outreach performance and conversions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-slate-800/50 border-white/10">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-400 mb-1">Connection Requests Sent</p>
                  <p className="text-2xl font-bold text-white">234</p>
                  <p className="text-xs text-green-400 mt-1">+15% from last week</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-white/10">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-400 mb-1">Acceptance Rate</p>
                  <p className="text-2xl font-bold text-white">68%</p>
                  <p className="text-xs text-green-400 mt-1">+3% from last week</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-white/10">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-400 mb-1">Messages Sent</p>
                  <p className="text-2xl font-bold text-white">1,247</p>
                  <p className="text-xs text-green-400 mt-1">+8% from last week</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-white/10">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-400 mb-1">Response Rate</p>
                  <p className="text-2xl font-bold text-white">34.5%</p>
                  <p className="text-xs text-green-400 mt-1">+5% from last week</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-white/10">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-400 mb-1">Leads Converted</p>
                  <p className="text-2xl font-bold text-white">156</p>
                  <p className="text-xs text-green-400 mt-1">+18% from last week</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-white/10">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-400 mb-1">Conversion Rate</p>
                  <p className="text-2xl font-bold text-white">12.5%</p>
                  <p className="text-xs text-green-400 mt-1">+2.1% from last week</p>
                </CardContent>
              </Card>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Performance by Offering</h3>
              <div className="space-y-2">
                {offerings.map(offering => (
                  <div key={offering.id} className="p-3 rounded-lg bg-slate-800/50 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{offering.name}</span>
                      <Badge className="bg-blue-500/20 text-blue-400">Active</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Sent: </span>
                        <span className="text-white">234</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Responses: </span>
                        <span className="text-white">45 (19.2%)</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Conversions: </span>
                        <span className="text-green-400">12 (5.1%)</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Blog/Article Dialog */}
      <Dialog open={showCreateBlog} onOpenChange={setShowCreateBlog}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              Write LinkedIn Article
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Create professional articles with AI assistance, SEO optimization, and rich formatting
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* AI Generation */}
            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-purple-400" />
                  AI Article Generation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">Article Topic / Prompt *</Label>
                  <Textarea
                    value={blogPrompt}
                    onChange={(e) => setBlogPrompt(e.target.value)}
                    placeholder="E.g., Write a comprehensive 2000-word article about the future of AI in sales automation. Include: introduction, key trends, case studies, best practices, challenges, future predictions, and actionable insights for B2B companies..."
                    className="min-h-[150px] bg-slate-800/50 border-white/10 text-white"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Be specific about the topic, length, structure, and key points you want covered
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300 mb-2 block">Article Length</Label>
                    <Select defaultValue="2000">
                      <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1000">Short (1000 words)</SelectItem>
                        <SelectItem value="2000">Medium (2000 words)</SelectItem>
                        <SelectItem value="3000">Long (3000 words)</SelectItem>
                        <SelectItem value="custom">Custom Length</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block">Writing Style</Label>
                    <Select defaultValue="professional">
                      <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="conversational">Conversational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setIsGeneratingBlog(true);
                    // Simulate AI generation
                    setTimeout(() => {
                      setBlogTitle('The Future of AI in Sales Automation: Transforming B2B Revenue Operations');
                      setBlogContent(`# The Future of AI in Sales Automation: Transforming B2B Revenue Operations

## Introduction

Artificial Intelligence is revolutionizing the way businesses approach sales and revenue operations. As we navigate through 2025, AI-powered sales automation has become more than just a buzzword—it's a strategic imperative for companies looking to scale efficiently and maintain competitive advantage.

## Key Trends Shaping AI Sales Automation

### 1. Predictive Lead Scoring
Modern AI systems can analyze thousands of data points to predict which leads are most likely to convert, enabling sales teams to prioritize their efforts effectively.

### 2. Automated Follow-up Sequences
Intelligent automation ensures no lead falls through the cracks, with personalized follow-ups based on engagement patterns and behavior.

### 3. Real-time Sales Intelligence
AI provides instant insights into prospect behavior, allowing sales reps to engage at the perfect moment with the right message.

## Case Studies: Success Stories

### Enterprise Solutions Inc.
After implementing AI sales automation, Enterprise Solutions saw a 45% increase in conversion rates and reduced sales cycle time by 30%.

### TechStartup Co.
TechStartup leveraged AI for lead qualification, resulting in 3x more qualified meetings and 50% reduction in wasted sales efforts.

## Best Practices for Implementation

1. **Start with Clear Objectives**: Define what you want to achieve with AI automation
2. **Choose the Right Tools**: Select platforms that integrate seamlessly with your existing stack
3. **Train Your Team**: Ensure your sales team understands how to leverage AI insights
4. **Monitor and Optimize**: Continuously refine your AI models based on performance data

## Challenges and Solutions

While AI offers tremendous benefits, organizations face challenges such as data quality, integration complexity, and change management. The key is to start small, prove value, and scale gradually.

## Future Predictions

By 2027, we predict that:
- 80% of B2B sales processes will be AI-assisted
- AI will handle 60% of initial prospect qualification
- Sales teams will focus more on relationship-building and complex negotiations

## Actionable Insights

For B2B companies looking to adopt AI sales automation:
- Begin with lead scoring and qualification
- Automate repetitive tasks first
- Use AI to enhance, not replace, human sales expertise
- Invest in data quality and CRM hygiene

## Conclusion

AI in sales automation is not just the future—it's the present. Companies that embrace these technologies today will have a significant competitive advantage tomorrow. The question isn't whether to adopt AI, but how quickly you can implement it effectively.

---

*Ready to transform your sales operations? Connect with us to learn how AI can revolutionize your revenue generation.*`);
                      setBlogSEO({
                        keywords: 'AI Sales Automation, B2B Sales, Sales Technology, Revenue Operations, Lead Scoring, Sales Intelligence',
                        description: 'Explore how AI is transforming B2B sales automation. Learn about key trends, case studies, best practices, and future predictions for AI-powered revenue operations.'
                      });
                      setIsGeneratingBlog(false);
                    }, 2000);
                  }}
                  disabled={!blogPrompt.trim() || isGeneratingBlog}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 disabled:opacity-50"
                >
                  {isGeneratingBlog ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating Article...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Article with AI
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Article Title */}
            {blogTitle && (
              <Card className="bg-slate-800/50 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Article Title</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder="Enter a compelling article title..."
                    className="bg-slate-900/50 border-white/10 text-white text-lg"
                  />
                </CardContent>
              </Card>
            )}

            {/* Article Content */}
            {blogContent && (
              <Card className="bg-slate-800/50 border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">Article Content</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white">
                        <Type className="w-4 h-4 mr-2" />
                        Format
                      </Button>
                      <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Add Image
                      </Button>
                      <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white">
                        <Link2 className="w-4 h-4 mr-2" />
                        Add Link
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-purple-500/10 border-purple-500/30 text-purple-400"
                        onClick={() => {
                          setIsGeneratingBlog(true);
                          setTimeout(() => {
                            // Regenerate content
                            setIsGeneratingBlog(false);
                          }, 2000);
                        }}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    placeholder="Write your article content here... Use markdown for formatting (## for headings, ** for bold, etc.)"
                    className="min-h-[500px] bg-slate-900/50 border-white/10 text-white font-mono text-sm"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500">
                      Word count: {blogContent.split(/\s+/).filter(Boolean).length} words
                    </p>
                    <p className="text-xs text-gray-500">
                      Character count: {blogContent.length} / 125,000
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* SEO Optimization */}
            {blogContent && (
              <Card className="bg-slate-800/50 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">SEO Optimization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300 mb-2 block">Keywords</Label>
                    <Input
                      value={blogSEO.keywords}
                      onChange={(e) => setBlogSEO({ ...blogSEO, keywords: e.target.value })}
                      placeholder="Enter relevant keywords (comma separated)..."
                      className="bg-slate-900/50 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block">Meta Description</Label>
                    <Textarea
                      value={blogSEO.description}
                      onChange={(e) => setBlogSEO({ ...blogSEO, description: e.target.value })}
                      placeholder="Write a compelling meta description (150-160 characters)..."
                      className="min-h-[80px] bg-slate-900/50 border-white/10 text-white"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      {blogSEO.description.length} / 160 characters
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex gap-2 justify-end pt-4 border-t border-white/10">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCreateBlog(false);
                  setBlogPrompt('');
                  setBlogTitle('');
                  setBlogContent('');
                  setBlogSEO({ keywords: '', description: '' });
                }}
                className="bg-white/5 border-white/10 text-white"
              >
                Cancel
              </Button>
              {blogContent && (
                <Button
                  onClick={() => {
                    const newContent = {
                      id: Date.now(),
                      type: 'blog' as const,
                      title: blogTitle,
                      content: blogContent,
                      hashtags: [],
                      media: [],
                      scheduled: false,
                      status: 'draft' as const,
                      createdAt: new Date().toISOString()
                    };
                    setContentLibrary([newContent, ...contentLibrary]);
                    setShowCreateBlog(false);
                    setBlogPrompt('');
                    setBlogTitle('');
                    setBlogContent('');
                    setBlogSEO({ keywords: '', description: '' });
                  }}
                  className="bg-gradient-to-r from-purple-500 to-purple-600"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save as Draft
                </Button>
              )}
              {blogContent && (
                <Button
                  onClick={() => {
                    const newContent = {
                      id: Date.now(),
                      type: 'blog' as const,
                      title: blogTitle,
                      content: blogContent,
                      hashtags: [],
                      media: [],
                      scheduled: false,
                      status: 'published' as const,
                      createdAt: new Date().toISOString(),
                      engagement: { views: 0, likes: 0, comments: 0, shares: 0 }
                    };
                    setContentLibrary([newContent, ...contentLibrary]);
                    setShowCreateBlog(false);
                    setBlogPrompt('');
                    setBlogTitle('');
                    setBlogContent('');
                    setBlogSEO({ keywords: '', description: '' });
                  }}
                  className="bg-gradient-to-r from-green-500 to-emerald-600"
                >
                  <Share2Icon className="w-4 h-4 mr-2" />
                  Publish Article
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Video Dialog */}
      <Dialog open={showCreateVideo} onOpenChange={setShowCreateVideo}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Video className="w-5 h-5 text-cyan-400" />
              Create LinkedIn Video
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Create professional videos with AI script generation and editing tools
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Video Generation */}
            <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-cyan-400" />
                  AI Video Script & Storyboard Generation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">Video Concept / Prompt *</Label>
                  <Textarea
                    value={videoPrompt}
                    onChange={(e) => setVideoPrompt(e.target.value)}
                    placeholder="E.g., Create a 2-minute professional video script about our enterprise AI solution. Include: hook (first 5 seconds), problem statement, solution overview, key features, benefits, social proof, and strong call-to-action. Make it engaging and suitable for LinkedIn..."
                    className="min-h-[150px] bg-slate-800/50 border-white/10 text-white"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Describe the video concept, duration, tone, key messages, and target audience
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300 mb-2 block">Video Duration</Label>
                    <Select defaultValue="120">
                      <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 seconds</SelectItem>
                        <SelectItem value="60">1 minute</SelectItem>
                        <SelectItem value="120">2 minutes</SelectItem>
                        <SelectItem value="300">5 minutes</SelectItem>
                        <SelectItem value="600">10 minutes</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block">Video Format</Label>
                    <Select defaultValue="native">
                      <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="native">Native Video</SelectItem>
                        <SelectItem value="document">Document Video</SelectItem>
                        <SelectItem value="carousel">Carousel Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setIsGeneratingVideo(true);
                    setTimeout(() => {
                      setVideoScript(`VIDEO SCRIPT: Enterprise AI Solution (2 minutes)

[0:00-0:05] HOOK
"Tired of manual lead qualification eating up 60% of your sales team's time? What if AI could do it in seconds?"

[0:05-0:30] PROBLEM STATEMENT
"Most B2B companies struggle with inefficient sales processes. Your team spends hours on tasks that could be automated, while high-value opportunities slip through the cracks."

[0:30-1:00] SOLUTION OVERVIEW
"Introducing our Enterprise AI Solution—a game-changer for modern sales teams. We've built an AI-powered platform that automates lead qualification, follow-ups, and pipeline management."

[1:00-1:30] KEY FEATURES
"Here's what makes it special:
- Intelligent lead scoring that's 95% accurate
- Automated follow-up sequences that never miss
- Real-time insights that help you close faster
- Seamless CRM integration that just works"

[1:30-1:50] BENEFITS & SOCIAL PROOF
"Companies using our solution see 3x more qualified meetings and 40% faster sales cycles. Enterprise Solutions Inc. increased their conversion rate by 45% in just 3 months."

[1:50-2:00] CALL-TO-ACTION
"Ready to transform your sales operations? Book a demo today. Link in the comments. Let's scale your revenue together."`);
                      setVideoStoryboard(`STORYBOARD:

Scene 1 (0:00-0:05): Close-up of frustrated sales rep at desk
- Visual: Person looking at screen with many unqualified leads
- Text Overlay: "60% of time wasted"

Scene 2 (0:05-0:30): Split screen showing problem
- Visual: Clock ticking, manual processes
- Text: "Inefficient sales processes"

Scene 3 (0:30-1:00): Product showcase
- Visual: AI dashboard, automated workflows
- Text: "Enterprise AI Solution"

Scene 4 (1:00-1:30): Feature highlights
- Visual: Animated icons for each feature
- Text: Key features list

Scene 5 (1:30-1:50): Success metrics
- Visual: Charts, graphs, testimonials
- Text: "45% increase in conversions"

Scene 6 (1:50-2:00): CTA screen
- Visual: Product logo, contact info
- Text: "Book a demo today"`);
                      setIsGeneratingVideo(false);
                    }, 2000);
                  }}
                  disabled={!videoPrompt.trim() || isGeneratingVideo}
                  className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 disabled:opacity-50"
                >
                  {isGeneratingVideo ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating Script & Storyboard...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Video Script & Storyboard
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Generated Script */}
            {videoScript && (
              <Card className="bg-slate-800/50 border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <FileTextIcon className="w-5 h-5" />
                      Generated Video Script
                    </CardTitle>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                      onClick={() => {
                        setIsGeneratingVideo(true);
                        setTimeout(() => {
                          // Regenerate script
                          setIsGeneratingVideo(false);
                        }, 2000);
                      }}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={videoScript}
                    onChange={(e) => setVideoScript(e.target.value)}
                    className="min-h-[200px] bg-slate-900/50 border-white/10 text-white font-mono text-sm"
                  />
                </CardContent>
              </Card>
            )}

            {/* Generated Storyboard */}
            {videoStoryboard && (
              <Card className="bg-slate-800/50 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Layers className="w-5 h-5" />
                    Generated Storyboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={videoStoryboard}
                    onChange={(e) => setVideoStoryboard(e.target.value)}
                    className="min-h-[200px] bg-slate-900/50 border-white/10 text-white font-mono text-sm"
                  />
                </CardContent>
              </Card>
            )}

            {/* Video Upload */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Upload or Record Video</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors">
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-white">Upload Video</p>
                    </label>
                  </div>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors">
                    <Video className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-white">Record Video</p>
                  </div>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors">
                    <Film className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-white">AI Generate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Video Editing Tools */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Video Editing Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  <Button variant="outline" className="bg-slate-900/50 border-white/10 text-white">
                    <Type className="w-4 h-4 mr-2" />
                    Add Text
                  </Button>
                  <Button variant="outline" className="bg-slate-900/50 border-white/10 text-white">
                    <Music className="w-4 h-4 mr-2" />
                    Add Music
                  </Button>
                  <Button variant="outline" className="bg-slate-900/50 border-white/10 text-white">
                    <Layers className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <Button variant="outline" className="bg-slate-900/50 border-white/10 text-white">
                    <Play className="w-4 h-4 mr-2" />
                    Trim
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Video Caption */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Video Caption</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add a caption for your video..."
                  className="min-h-[100px] bg-slate-900/50 border-white/10 text-white"
                />
                <div className="mt-4">
                  <Label className="text-gray-300 mb-2 block">Hashtags</Label>
                  <Input
                    placeholder="Add hashtags..."
                    className="bg-slate-900/50 border-white/10 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2 justify-end pt-4 border-t border-white/10">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCreateVideo(false);
                  setVideoPrompt('');
                  setVideoScript('');
                  setVideoStoryboard('');
                }}
                className="bg-white/5 border-white/10 text-white"
              >
                Cancel
              </Button>
              {videoScript && (
                <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600">
                  <Save className="w-4 h-4 mr-2" />
                  Save Video
                </Button>
              )}
              {videoScript && (
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600">
                  <Share2Icon className="w-4 h-4 mr-2" />
                  Publish Video
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Image/Carousel Post Dialog */}
      <Dialog open={showCreateImage} onOpenChange={setShowCreateImage}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-green-400" />
              Create Image/Carousel Post
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Create engaging image posts or carousels with AI-generated captions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* AI Generation */}
            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-green-400" />
                  AI Image Post Generation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">Image Post Idea / Prompt *</Label>
                  <Textarea
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="E.g., Create a professional LinkedIn image post showcasing our AI sales automation tool. The post should highlight key benefits, include a compelling headline, use professional design, and have an engaging caption with relevant hashtags. Make it suitable for B2B audience..."
                    className="min-h-[120px] bg-slate-800/50 border-white/10 text-white"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Describe the image concept, design style, key messages, and target audience
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300 mb-2 block">Post Type</Label>
                    <Select defaultValue="single">
                      <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single Image</SelectItem>
                        <SelectItem value="carousel">Carousel (Multiple Images)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block">Design Style</Label>
                    <Select defaultValue="professional">
                      <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="minimalist">Minimalist</SelectItem>
                        <SelectItem value="bold">Bold & Vibrant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setIsGeneratingImage(true);
                    setTimeout(() => {
                      setImageCaption(`🚀 Introducing Our Revolutionary AI Sales Automation Platform!

Transform your sales operations with cutting-edge AI technology that's helping B2B companies achieve unprecedented growth.

✨ Key Benefits:
• 10x faster lead qualification
• Automated follow-up sequences
• Real-time sales intelligence
• Seamless CRM integration

📊 Results That Speak:
→ 45% increase in conversion rates
→ 30% reduction in sales cycle time
→ 3x more qualified meetings

Ready to supercharge your sales team? Let's connect and discuss how we can transform your revenue operations.

#SalesAutomation #AI #B2BSales #SalesTech #EnterpriseAI #BusinessGrowth #DigitalTransformation #SalesEnablement #TechInnovation #RevenueOperations`);
                      setIsGeneratingImage(false);
                    }, 2000);
                  }}
                  disabled={!imagePrompt.trim() || isGeneratingImage}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 disabled:opacity-50"
                >
                  {isGeneratingImage ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating Caption...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Caption with AI
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Image Upload */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Upload Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-green-500/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        setSelectedMedia(Array.from(e.target.files));
                      }
                    }}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-white font-medium mb-1">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-400">Images (Max 9 images for carousel, 10MB each)</p>
                  </label>
                </div>
                {selectedMedia.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {selectedMedia.map((file, idx) => (
                      <div key={idx} className="relative aspect-square bg-slate-700/50 rounded-lg overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-gray-500" />
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-1 right-1 h-6 w-6 p-0 bg-red-500/80 hover:bg-red-500"
                          onClick={() => setSelectedMedia(selectedMedia.filter((_, i) => i !== idx))}
                        >
                          <XCircle className="w-3 h-3 text-white" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                {selectedMedia.length > 1 && (
                  <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <p className="text-sm text-blue-400">
                      📸 Carousel Post: {selectedMedia.length} images will be displayed as a carousel
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Generated Caption */}
            {imageCaption && (
              <Card className="bg-slate-800/50 border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <Type className="w-5 h-5" />
                      Generated Caption
                    </CardTitle>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-green-500/10 border-green-500/30 text-green-400"
                      onClick={() => {
                        setIsGeneratingImage(true);
                        setTimeout(() => {
                          // Regenerate caption
                          setIsGeneratingImage(false);
                        }, 2000);
                      }}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={imageCaption}
                    onChange={(e) => setImageCaption(e.target.value)}
                    className="min-h-[200px] bg-slate-900/50 border-white/10 text-white font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Character count: {imageCaption.length} / 3,000
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Hashtags */}
            {imageCaption && (
              <Card className="bg-slate-800/50 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Hash className="w-5 h-5" />
                    Hashtags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Add hashtags (comma separated)..."
                    className="bg-slate-900/50 border-white/10 text-white"
                  />
                </CardContent>
              </Card>
            )}

            <div className="flex gap-2 justify-end pt-4 border-t border-white/10">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCreateImage(false);
                  setImagePrompt('');
                  setImageCaption('');
                  setSelectedMedia([]);
                }}
                className="bg-white/5 border-white/10 text-white"
              >
                Cancel
              </Button>
              {imageCaption && (
                <Button className="bg-gradient-to-r from-green-500 to-green-600">
                  <Save className="w-4 h-4 mr-2" />
                  Save as Draft
                </Button>
              )}
              {imageCaption && (
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600">
                  <Share2Icon className="w-4 h-4 mr-2" />
                  Publish Post
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Connection Request Dialog */}
      <Dialog open={showConnectionRequest} onOpenChange={setShowConnectionRequest}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Send Connection Request</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedProspect && `Send a connection request to ${prospects.find(p => p.id === selectedProspect)?.name}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-gray-300 mb-2 block">Connection Request Message</Label>
              <Textarea
                value={connectionRequestMessage}
                onChange={(e) => setConnectionRequestMessage(e.target.value)}
                placeholder="Hi [Name], I'd like to add you to my professional network..."
                className="min-h-[120px] bg-slate-800/50 border-white/10 text-white"
              />
              <p className="text-xs text-gray-500 mt-2">
                Character count: {connectionRequestMessage.length} / 300
              </p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <UserPlus className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-400 mb-1">Tips for Connection Requests</p>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Personalize your message to increase acceptance rate</li>
                    <li>• Mention mutual connections or shared interests</li>
                    <li>• Keep it professional and concise</li>
                    <li>• Avoid generic messages</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-4 border-t border-white/10">
              <Button
                variant="outline"
                onClick={() => {
                  setShowConnectionRequest(false);
                  setConnectionRequestMessage('');
                  setSelectedProspect(null);
                }}
                className="bg-white/5 border-white/10 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (selectedProspect) {
                    console.log('Sending connection request:', {
                      prospectId: selectedProspect,
                      message: connectionRequestMessage
                    });
                    // Update prospect status to 'Pending'
                    setShowConnectionRequest(false);
                    setConnectionRequestMessage('');
                    setSelectedProspect(null);
                  }
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Send Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Chat Assistant */}
      <ChatAssistant />
    </div>
  );
}

