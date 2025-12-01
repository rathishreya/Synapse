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
  Twitter,
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
  Heart,
  Repeat2,
  Reply,
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
  Award
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function TwitterPage() {
  const [selectedTab, setSelectedTab] = useState('inbox');
  const [showCompose, setShowCompose] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showScheduleTweet, setShowScheduleTweet] = useState(false);
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
  
  // Offerings data
  const offerings = [
    { id: 'enterprise', name: 'Enterprise Solutions' },
    { id: 'saas', name: 'SaaS Products' },
    { id: 'consulting', name: 'Consulting Services' }
  ];

  // Mock data
  const stats = [
    { label: 'Followers', value: '12.5K', change: '+8.2%', trend: 'up' },
    { label: 'DMs Sent', value: '856', change: '+12.5%', trend: 'up' },
    { label: 'Response Rate', value: '28.3%', change: '+4.1%', trend: 'up' },
    { label: 'Engagement Rate', value: '5.2%', change: '+1.8%', trend: 'up' }
  ];

  const messages = [
    {
      id: 1,
      from: '@johnsmith',
      name: 'John Smith',
      company: 'Acme Corp',
      avatar: 'JS',
      message: 'Hi! Saw your tweet about AI automation. Interested in learning more!',
      time: '1 hour ago',
      unread: true,
      type: 'incoming'
    },
    {
      id: 2,
      from: '@sarahj',
      name: 'Sarah Johnson',
      company: 'Tech Startup',
      avatar: 'SJ',
      message: 'Thanks for the follow! Let\'s connect.',
      time: '3 hours ago',
      unread: true,
      type: 'incoming'
    },
    {
      id: 3,
      from: '@mikew',
      name: 'Mike Wilson',
      company: 'Big Enterprise',
      avatar: 'MW',
      message: 'Following up on our conversation...',
      time: '1 day ago',
      unread: false,
      type: 'sent'
    }
  ];

  const templates = [
    { id: 1, name: 'Follow-up DM', type: 'followup', content: 'Hi {{Handle}}, following up on our conversation about {{Topic}}...' },
    { id: 2, name: 'Engagement Response', type: 'engagement', content: 'Thanks for engaging with our content! Would love to connect...' },
    { id: 3, name: 'Sales Outreach', type: 'sales', content: 'Hi {{Handle}}, saw you\'re interested in {{Solution}}. We can help!' }
  ];

  const prospects = [
    { id: 1, name: 'John Smith', handle: '@johnsmith', company: 'Acme Corp', followers: '5.2K', status: 'Following', offering: 'enterprise', leadScore: 85, email: 'john@acme.com' },
    { id: 2, name: 'Sarah Johnson', handle: '@sarahj', company: 'Tech Startup', followers: '8.1K', status: 'Not Following', offering: 'saas', leadScore: 72, email: 'sarah@techstartup.com' },
    { id: 3, name: 'Mike Wilson', handle: '@mikew', company: 'Big Enterprise', followers: '12.3K', status: 'Following', offering: 'enterprise', leadScore: 91, email: 'mike@bigenterprise.com' },
    { id: 4, name: 'Emily Chen', handle: '@emilyc', company: 'TechStart Inc', followers: '3.5K', status: 'Following', offering: 'consulting', leadScore: 68, email: 'emily@techstart.com' }
  ];
  
  const campaigns = [
    { id: 1, name: 'Enterprise Q1 Outreach', offering: 'enterprise', status: 'Active', sent: 189, responses: 34, conversions: 9, startDate: '2025-01-15' },
    { id: 2, name: 'SaaS Product Launch', offering: 'saas', status: 'Paused', sent: 124, responses: 22, conversions: 6, startDate: '2025-01-20' }
  ];
  
  const scheduledTweets = [
    { id: 1, content: 'Excited to share our new AI-powered sales automation tool... #SalesTech #AI', scheduledFor: '2025-01-25 10:00 AM', status: 'Scheduled', offering: 'enterprise' },
    { id: 2, content: '5 ways to improve your sales pipeline efficiency... #SalesTips', scheduledFor: '2025-01-26 02:00 PM', status: 'Scheduled', offering: 'saas' }
  ];

  const tweets = [
    {
      id: 1,
      author: '@johnsmith',
      name: 'John Smith',
      content: 'Just launched our new AI-powered sales tool! 🚀 #SalesTech #AI',
      time: '2 hours ago',
      likes: 45,
      retweets: 12,
      replies: 8
    },
    {
      id: 2,
      author: '@sarahj',
      name: 'Sarah Johnson',
      content: 'Looking for a CRM solution. Any recommendations? #CRM #Sales',
      time: '5 hours ago',
      likes: 23,
      retweets: 5,
      replies: 15
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
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
                <div className="p-2 rounded-lg bg-gradient-to-br from-sky-400 to-sky-500">
                  <Twitter className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Twitter Outreach</h1>
                  <p className="text-sm text-gray-400">Manage DMs, engagement, and campaigns</p>
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
                className="bg-gradient-to-r from-sky-400 to-sky-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                New DM
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
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-400"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Inbox
                      <Badge className="ml-auto bg-sky-500/20 text-sky-400">8</Badge>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="sent" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-400"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Sent
                    </TabsTrigger>
                    <TabsTrigger 
                      value="engagement" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-400"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Engagement
                    </TabsTrigger>
                    <TabsTrigger 
                      value="followers" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-400"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Followers
                    </TabsTrigger>
                    <TabsTrigger 
                      value="campaigns" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-400"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Campaigns
                    </TabsTrigger>
                    <TabsTrigger 
                      value="templates" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-400"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Templates
                    </TabsTrigger>
                    <TabsTrigger 
                      value="tweets" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-400"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Scheduled Tweets
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
                      <CardTitle className="text-white">Direct Messages</CardTitle>
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Search DMs..."
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
                          className="p-4 rounded-lg bg-slate-800/50 border border-white/10 hover:border-sky-500/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center text-white font-bold">
                              {message.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <div>
                                  <p className="font-semibold text-white">{message.name}</p>
                                  <p className="text-xs text-sky-400">{message.from}</p>
                                  <p className="text-xs text-gray-400">{message.company}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-400">{message.time}</span>
                                  {message.unread && (
                                    <Badge className="bg-sky-500/20 text-sky-400 text-xs">New</Badge>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-gray-300 mt-2">{message.message}</p>
                              <div className="flex items-center gap-2 mt-3">
                                <Button size="sm" variant="outline" className="bg-sky-500/10 border-sky-500/30 text-sky-400">
                                  <Reply className="w-3 h-3 mr-1" />
                                  Reply
                                </Button>
                                <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-gray-400">
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
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center text-white font-bold">
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

              {/* Engagement */}
              <TabsContent value="engagement" className="space-y-4">
                <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white">Engagement Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tweets.map((tweet) => (
                        <div key={tweet.id} className="p-4 rounded-lg bg-slate-800/50 border border-white/10">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center text-white font-bold">
                              {tweet.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-white">{tweet.name}</p>
                                <p className="text-sm text-sky-400">{tweet.author}</p>
                                <span className="text-xs text-gray-400">· {tweet.time}</span>
                              </div>
                              <p className="text-sm text-gray-300 mb-3">{tweet.content}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-400">
                                <button className="flex items-center gap-1 hover:text-red-400 transition-colors">
                                  <Heart className="w-4 h-4" />
                                  {tweet.likes}
                                </button>
                                <button className="flex items-center gap-1 hover:text-green-400 transition-colors">
                                  <Repeat2 className="w-4 h-4" />
                                  {tweet.retweets}
                                </button>
                                <button className="flex items-center gap-1 hover:text-sky-400 transition-colors">
                                  <Reply className="w-4 h-4" />
                                  {tweet.replies}
                                </button>
                                <Button size="sm" variant="outline" className="ml-auto bg-sky-500/10 border-sky-500/30 text-sky-400">
                                  <MessageSquare className="w-3 h-3 mr-1" />
                                  Send DM
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Followers */}
              <TabsContent value="followers" className="space-y-4">
                <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Followers & Prospects</CardTitle>
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
                        <Button className="bg-gradient-to-r from-sky-400 to-sky-500">
                          <UserPlus className="w-4 h-4 mr-2" />
                          Find Prospects
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {prospects.filter(p => !selectedOffering || selectedOffering === 'all' || p.offering === selectedOffering).map((prospect) => (
                        <div key={prospect.id} className="p-4 rounded-lg bg-slate-800/50 border border-white/10 hover:border-sky-500/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 flex items-center justify-center text-white font-bold">
                                {prospect.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold text-white">{prospect.name}</p>
                                  <Badge className="bg-sky-500/20 text-sky-400 text-xs">
                                    Score: {prospect.leadScore}
                                  </Badge>
                                </div>
                                <p className="text-sm text-sky-400">{prospect.handle}</p>
                                <p className="text-xs text-gray-400">{prospect.company} · {prospect.followers} followers</p>
                                <div className="flex items-center gap-3 mt-2">
                                  <Badge className="bg-purple-500/20 text-purple-400 text-xs">
                                    {offerings.find(o => o.id === prospect.offering)?.name}
                                  </Badge>
                                  <a href={`mailto:${prospect.email}`} className="text-xs text-gray-400 hover:text-sky-400 flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    Email
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={prospect.status === 'Following' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}>
                                {prospect.status}
                              </Badge>
                              <Button size="sm" variant="outline" className="bg-sky-500/10 border-sky-500/30 text-sky-400">
                                <MessageSquare className="w-3 h-3 mr-1" />
                                DM
                              </Button>
                              <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-gray-400">
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
                      <CardTitle className="text-white">Twitter Campaigns</CardTitle>
                      <Button 
                        onClick={() => {
                          setShowCreateCampaign(true);
                          setCampaignStep(1);
                        }}
                        className="bg-gradient-to-r from-sky-400 to-sky-500"
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
                        <p className="text-sm">Create your first Twitter outreach campaign</p>
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
                                    <Badge className="bg-sky-500/20 text-sky-400">
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
                                    <Button size="sm" variant="outline" className="bg-yellow-500/10 border-yellow-500/30 text-yellow-400">
                                      <Pause className="w-3 h-3 mr-1" />
                                      Pause
                                    </Button>
                                  ) : (
                                    <Button size="sm" variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400">
                                      <Play className="w-3 h-3 mr-1" />
                                      Resume
                                    </Button>
                                  )}
                                  <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-gray-400">
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-4 gap-4">
                                <div>
                                  <p className="text-sm text-gray-400 mb-1">DMs Sent</p>
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
                                <Button size="sm" variant="outline" className="bg-sky-500/10 border-sky-500/30 text-sky-400">
                                  <BarChart3 className="w-3 h-3 mr-1" />
                                  View Analytics
                                </Button>
                                <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-gray-400">
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
                      <CardTitle className="text-white">DM Templates</CardTitle>
                      <Button className="bg-gradient-to-r from-sky-400 to-sky-500">
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
                              <Badge className="bg-sky-500/20 text-sky-400">{template.type}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-300 mb-4">{template.content}</p>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" className="bg-sky-500/10 border-sky-500/30 text-sky-400">
                                Use Template
                              </Button>
                              <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-gray-400">
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

              {/* Scheduled Tweets */}
              <TabsContent value="tweets" className="space-y-4">
                <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Scheduled Tweets</CardTitle>
                      <Button 
                        onClick={() => setShowScheduleTweet(true)}
                        className="bg-gradient-to-r from-sky-400 to-sky-500"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Schedule Tweet
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {scheduledTweets.length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        <Share2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium mb-2">No scheduled tweets</p>
                        <p className="text-sm">Schedule your first tweet</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {scheduledTweets.map((tweet) => (
                          <Card key={tweet.id} className="bg-slate-800/50 border-white/10">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <div>
                                  <CardTitle className="text-white text-base">Tweet #{tweet.id}</CardTitle>
                                  <div className="flex items-center gap-3 mt-2">
                                    <Badge className="bg-sky-500/20 text-sky-400">
                                      {offerings.find(o => o.id === tweet.offering)?.name}
                                    </Badge>
                                    <Badge className="bg-green-500/20 text-green-400">
                                      {tweet.status}
                                    </Badge>
                                    <span className="text-xs text-gray-400">{tweet.scheduledFor}</span>
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
                              <p className="text-sm text-gray-300">{tweet.content}</p>
                              <p className="text-xs text-gray-400 mt-2">{tweet.content.length}/280 characters</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
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
            <DialogTitle className="text-white">Compose Twitter DM</DialogTitle>
            <DialogDescription className="text-gray-400">
              Send a direct message to prospects
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex gap-2">
              <Button
                variant={composeMode === 'single' ? 'default' : 'outline'}
                onClick={() => setComposeMode('single')}
                className={composeMode === 'single' ? 'bg-sky-500' : 'bg-white/5 border-white/10 text-white'}
              >
                Single DM
              </Button>
              <Button
                variant={composeMode === 'bulk' ? 'default' : 'outline'}
                onClick={() => setComposeMode('bulk')}
                className={composeMode === 'bulk' ? 'bg-sky-500' : 'bg-white/5 border-white/10 text-white'}
              >
                Bulk DM
              </Button>
            </div>

            {composeMode === 'single' ? (
              <>
                <div>
                  <Label className="text-gray-300 mb-2 block">To (Twitter Handle)</Label>
                  <Select value={composeTo} onValueChange={setComposeTo}>
                    <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                      <SelectValue placeholder="Select prospect..." />
                    </SelectTrigger>
                    <SelectContent>
                      {prospects.map(prospect => (
                        <SelectItem key={prospect.id} value={prospect.handle}>
                          {prospect.handle} - {prospect.name}
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
                  <Label className="text-gray-300 mb-2 block">Message (280 char limit)</Label>
                  <Textarea
                    value={composeMessage}
                    onChange={(e) => setComposeMessage(e.target.value)}
                    placeholder="Type your DM here..."
                    maxLength={280}
                    className="min-h-[100px] bg-slate-800/50 border-white/10 text-white"
                  />
                  <p className="text-xs text-gray-400 mt-1">{composeMessage.length}/280 characters</p>
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
                        {prospect.handle} - {prospect.name}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Label className="text-gray-300 mb-2 block">Message Template</Label>
                  <Textarea
                    value={composeMessage}
                    onChange={(e) => setComposeMessage(e.target.value)}
                    placeholder="Type your message template (use {{Handle}}, {{Name}} for personalization)..."
                    maxLength={280}
                    className="min-h-[100px] bg-slate-800/50 border-white/10 text-white"
                  />
                  <p className="text-xs text-gray-400 mt-1">{composeMessage.length}/280 characters</p>
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
                  console.log('Sending Twitter DM:', { composeMode, composeTo, composeMessage });
                  setShowCompose(false);
                }}
                className="bg-gradient-to-r from-sky-400 to-sky-500"
              >
                <Send className="w-4 h-4 mr-2" />
                Send DM
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Analytics Dialog */}
      <Dialog open={showAnalytics} onOpenChange={setShowAnalytics}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-white">Twitter Analytics</DialogTitle>
            <DialogDescription className="text-gray-400">
              Track your Twitter outreach performance
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-slate-800/50 border-white/10">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-400 mb-1">DMs Sent</p>
                  <p className="text-2xl font-bold text-white">856</p>
                  <p className="text-xs text-green-400 mt-1">+12% from last week</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-white/10">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-400 mb-1">Response Rate</p>
                  <p className="text-2xl font-bold text-white">28.3%</p>
                  <p className="text-xs text-green-400 mt-1">+4% from last week</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-white/10">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-400 mb-1">Engagement Rate</p>
                  <p className="text-2xl font-bold text-white">5.2%</p>
                  <p className="text-xs text-green-400 mt-1">+1.8% from last week</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-white/10">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-400 mb-1">New Followers</p>
                  <p className="text-2xl font-bold text-white">234</p>
                  <p className="text-xs text-green-400 mt-1">+15% from last week</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Chat Assistant */}
      <ChatAssistant />
    </div>
  );
}

