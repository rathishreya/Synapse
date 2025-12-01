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
  Instagram,
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
  CheckCircle2,
  XCircle,
  Zap,
  UserPlus,
  Share2,
  Heart,
  Image as ImageIcon,
  Video,
  Camera,
  Film,
  Hash,
  Upload,
  Play,
  Save,
  Edit,
  Trash2,
  Calendar as CalendarIcon,
  Eye,
  ThumbsUp,
  MessageCircle as MessageCircleIcon,
  Share2 as Share2Icon,
  Download,
  Wand2,
  Layers,
  Grid3x3,
  Type,
  Palette,
  Music,
  Smile
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function InstagramPage() {
  const [selectedTab, setSelectedTab] = useState('inbox');
  const [showCompose, setShowCompose] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [composeMode, setComposeMode] = useState<'single' | 'bulk'>('single');
  const [selectedProspects, setSelectedProspects] = useState<number[]>([]);
  
  // Compose states
  const [composeTo, setComposeTo] = useState('');
  const [composeMessage, setComposeMessage] = useState('');
  const [composeTemplate, setComposeTemplate] = useState('');
  const [useAIPrompt, setUseAIPrompt] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  
  // Content Creation States
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [showCreateVideo, setShowCreateVideo] = useState(false);
  const [contentType, setContentType] = useState<'post' | 'story' | 'video'>('post');
  const [postPrompt, setPostPrompt] = useState('');
  const [generatedCaption, setGeneratedCaption] = useState('');
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<File[]>([]);
  const [postSchedule, setPostSchedule] = useState<{ date: string; time: string } | null>(null);
  const [showSchedulePicker, setShowSchedulePicker] = useState(false);
  const [contentLibrary, setContentLibrary] = useState<Array<{
    id: number;
    type: 'post' | 'story' | 'video';
    caption: string;
    hashtags: string[];
    media: string[];
    scheduled: boolean;
    scheduledDate?: string;
    status: 'draft' | 'scheduled' | 'published';
    createdAt: string;
    engagement?: { likes: number; comments: number; shares: number };
  }>>([]);

  // Mock data
  const stats = [
    { label: 'Followers', value: '8.9K', change: '+15.2%', trend: 'up' },
    { label: 'DMs Sent', value: '623', change: '+18.5%', trend: 'up' },
    { label: 'Response Rate', value: '42.1%', change: '+7.3%', trend: 'up' },
    { label: 'Engagement Rate', value: '6.8%', change: '+2.4%', trend: 'up' }
  ];

  const messages = [
    {
      id: 1,
      from: '@johnsmith',
      name: 'John Smith',
      company: 'Acme Corp',
      avatar: 'JS',
      message: 'Hi! Loved your recent post about AI automation. Can we connect?',
      time: '30 min ago',
      unread: true,
      type: 'incoming',
      hasImage: false
    },
    {
      id: 2,
      from: '@sarahj',
      name: 'Sarah Johnson',
      company: 'Tech Startup',
      avatar: 'SJ',
      message: 'Thanks for the follow! Interested in your services.',
      time: '2 hours ago',
      unread: true,
      type: 'incoming',
      hasImage: true
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
      type: 'sent',
      hasImage: false
    }
  ];

  const templates = [
    { id: 1, name: 'Follow-up DM', type: 'followup', content: 'Hi {{Handle}}, following up on our conversation about {{Topic}}...' },
    { id: 2, name: 'Engagement Response', type: 'engagement', content: 'Thanks for engaging with our content! Would love to connect...' },
    { id: 3, name: 'Sales Outreach', type: 'sales', content: 'Hi {{Handle}}, saw you\'re interested in {{Solution}}. We can help!' }
  ];

  const prospects = [
    { id: 1, name: 'John Smith', handle: '@johnsmith', company: 'Acme Corp', followers: '3.2K', status: 'Following', hasStory: true },
    { id: 2, name: 'Sarah Johnson', handle: '@sarahj', company: 'Tech Startup', followers: '5.1K', status: 'Not Following', hasStory: false },
    { id: 3, name: 'Mike Wilson', handle: '@mikew', company: 'Big Enterprise', followers: '8.3K', status: 'Following', hasStory: true }
  ];

  const posts = [
    {
      id: 1,
      author: '@johnsmith',
      name: 'John Smith',
      content: 'Just launched our new AI-powered sales tool! 🚀 #SalesTech #AI',
      time: '3 hours ago',
      likes: 234,
      comments: 45,
      hasImage: true
    },
    {
      id: 2,
      author: '@sarahj',
      name: 'Sarah Johnson',
      content: 'Looking for a CRM solution. Any recommendations? #CRM #Sales',
      time: '6 hours ago',
      likes: 156,
      comments: 28,
      hasImage: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
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
                <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600">
                  <Instagram className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Instagram Outreach</h1>
                  <p className="text-sm text-gray-400">Manage DMs, stories, and engagement</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
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
                className="bg-gradient-to-r from-pink-500 to-purple-600"
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
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-pink-500/10 data-[state=active]:text-pink-400"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Inbox
                      <Badge className="ml-auto bg-pink-500/20 text-pink-400">10</Badge>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="sent" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-pink-500/10 data-[state=active]:text-pink-400"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Sent
                    </TabsTrigger>
                    <TabsTrigger 
                      value="stories" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-pink-500/10 data-[state=active]:text-pink-400"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Stories
                    </TabsTrigger>
                    <TabsTrigger 
                      value="engagement" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-pink-500/10 data-[state=active]:text-pink-400"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Engagement
                    </TabsTrigger>
                    <TabsTrigger 
                      value="followers" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-pink-500/10 data-[state=active]:text-pink-400"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Followers
                    </TabsTrigger>
                    <TabsTrigger 
                      value="campaigns" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-pink-500/10 data-[state=active]:text-pink-400"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Campaigns
                    </TabsTrigger>
                    <TabsTrigger 
                      value="templates" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-pink-500/10 data-[state=active]:text-pink-400"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Templates
                    </TabsTrigger>
                    <TabsTrigger 
                      value="content" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-pink-500/10 data-[state=active]:text-pink-400"
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
                          className="p-4 rounded-lg bg-slate-800/50 border border-white/10 hover:border-pink-500/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-start gap-4">
                            <div className="relative">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                {message.avatar}
                              </div>
                              {message.hasImage && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-pink-500 border-2 border-slate-900 flex items-center justify-center">
                                  <ImageIcon className="w-2.5 h-2.5 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <div>
                                  <p className="font-semibold text-white">{message.name}</p>
                                  <p className="text-xs text-pink-400">{message.from}</p>
                                  <p className="text-xs text-gray-400">{message.company}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-400">{message.time}</span>
                                  {message.unread && (
                                    <Badge className="bg-pink-500/20 text-pink-400 text-xs">New</Badge>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-gray-300 mt-2">{message.message}</p>
                              <div className="flex items-center gap-2 mt-3">
                                <Button size="sm" variant="outline" className="bg-pink-500/10 border-pink-500/30 text-pink-400">
                                  <MessageSquare className="w-3 h-3 mr-1" />
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
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold">
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

              {/* Stories */}
              <TabsContent value="stories" className="space-y-4">
                <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Stories Engagement</CardTitle>
                      <Button className="bg-gradient-to-r from-pink-500 to-purple-600">
                        <Camera className="w-4 h-4 mr-2" />
                        Create Story
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {prospects.filter(p => p.hasStory).map((prospect) => (
                        <div key={prospect.id} className="text-center">
                          <div className="relative w-16 h-16 mx-auto mb-2">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 p-0.5">
                              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white font-bold">
                                {prospect.name.split(' ').map(n => n[0]).join('')}
                              </div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-pink-500 border-2 border-slate-900 flex items-center justify-center">
                              <Camera className="w-3 h-3 text-white" />
                            </div>
                          </div>
                          <p className="text-xs text-gray-300 truncate">{prospect.handle}</p>
                          <Button size="sm" variant="outline" className="mt-2 bg-pink-500/10 border-pink-500/30 text-pink-400 text-xs">
                            View Story
                          </Button>
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
                      {posts.map((post) => (
                        <div key={post.id} className="p-4 rounded-lg bg-slate-800/50 border border-white/10">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold">
                              {post.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-white">{post.name}</p>
                                <p className="text-sm text-pink-400">{post.author}</p>
                                <span className="text-xs text-gray-400">· {post.time}</span>
                              </div>
                              {post.hasImage && (
                                <div className="w-full h-64 bg-slate-700/50 rounded-lg mb-3 flex items-center justify-center">
                                  <ImageIcon className="w-12 h-12 text-gray-500" />
                                </div>
                              )}
                              <p className="text-sm text-gray-300 mb-3">{post.content}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-400">
                                <button className="flex items-center gap-1 hover:text-red-400 transition-colors">
                                  <Heart className="w-4 h-4" />
                                  {post.likes}
                                </button>
                                <button className="flex items-center gap-1 hover:text-pink-400 transition-colors">
                                  <MessageSquare className="w-4 h-4" />
                                  {post.comments}
                                </button>
                                <Button size="sm" variant="outline" className="ml-auto bg-pink-500/10 border-pink-500/30 text-pink-400">
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
                      <Button className="bg-gradient-to-r from-pink-500 to-purple-600">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Find Prospects
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {prospects.map((prospect) => (
                        <div key={prospect.id} className="p-4 rounded-lg bg-slate-800/50 border border-white/10 hover:border-pink-500/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                  {prospect.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                {prospect.hasStory && (
                                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 border-2 border-slate-900" />
                                )}
                              </div>
                              <div>
                                <p className="font-semibold text-white">{prospect.name}</p>
                                <p className="text-sm text-pink-400">{prospect.handle}</p>
                                <p className="text-xs text-gray-400">{prospect.company} · {prospect.followers} followers</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={prospect.status === 'Following' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}>
                                {prospect.status}
                              </Badge>
                              <Button size="sm" variant="outline" className="bg-pink-500/10 border-pink-500/30 text-pink-400">
                                <MessageSquare className="w-3 h-3 mr-1" />
                                DM
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
                      <CardTitle className="text-white">Instagram Campaigns</CardTitle>
                      <Button className="bg-gradient-to-r from-pink-500 to-purple-600">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Campaign
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-gray-400">
                      <Zap className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">No campaigns yet</p>
                      <p className="text-sm">Create your first Instagram outreach campaign</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Templates */}
              <TabsContent value="templates" className="space-y-4">
                <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">DM Templates</CardTitle>
                      <Button className="bg-gradient-to-r from-pink-500 to-purple-600">
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
                              <Badge className="bg-pink-500/20 text-pink-400">{template.type}</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-300 mb-4">{template.content}</p>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" className="bg-pink-500/10 border-pink-500/30 text-pink-400">
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
                          className="bg-gradient-to-r from-pink-500 to-purple-600"
                        >
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Create Post
                        </Button>
                        <Button
                          onClick={() => {
                            setContentType('story');
                            setShowCreateStory(true);
                          }}
                          variant="outline"
                          className="bg-pink-500/10 border-pink-500/30 text-pink-400"
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Create Story
                        </Button>
                        <Button
                          onClick={() => {
                            setContentType('video');
                            setShowCreateVideo(true);
                          }}
                          variant="outline"
                          className="bg-purple-500/10 border-purple-500/30 text-purple-400"
                        >
                          <Film className="w-4 h-4 mr-2" />
                          Create Video
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <Card className="bg-gradient-to-br from-pink-500/10 to-purple-600/10 border-pink-500/30">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-pink-500/20">
                              <ImageIcon className="w-5 h-5 text-pink-400" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Total Posts</p>
                              <p className="text-2xl font-bold text-white">{contentLibrary.filter(c => c.type === 'post').length}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border-purple-500/30">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-purple-500/20">
                              <Camera className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Total Stories</p>
                              <p className="text-2xl font-bold text-white">{contentLibrary.filter(c => c.type === 'story').length}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border-blue-500/30">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-blue-500/20">
                              <Film className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">Total Videos</p>
                              <p className="text-2xl font-bold text-white">{contentLibrary.filter(c => c.type === 'video').length}</p>
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
                          <p className="text-sm">Create your first post, story, or video</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {contentLibrary.map((content) => (
                            <Card key={content.id} className="bg-slate-800/50 border-white/10 hover:border-pink-500/50 transition-colors">
                              <CardHeader>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    {content.type === 'post' && <ImageIcon className="w-4 h-4 text-pink-400" />}
                                    {content.type === 'story' && <Camera className="w-4 h-4 text-purple-400" />}
                                    {content.type === 'video' && <Film className="w-4 h-4 text-blue-400" />}
                                    <Badge className={
                                      content.status === 'published' ? 'bg-green-500/20 text-green-400' :
                                      content.status === 'scheduled' ? 'bg-yellow-500/20 text-yellow-400' :
                                      'bg-gray-500/20 text-gray-400'
                                    }>
                                      {content.status}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                      <Edit className="w-3.5 h-3.5 text-gray-400" />
                                    </Button>
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                    </Button>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="aspect-square bg-slate-700/50 rounded-lg mb-3 flex items-center justify-center">
                                  {content.type === 'post' && <ImageIcon className="w-8 h-8 text-gray-500" />}
                                  {content.type === 'story' && <Camera className="w-8 h-8 text-gray-500" />}
                                  {content.type === 'video' && <Film className="w-8 h-8 text-gray-500" />}
                                </div>
                                <p className="text-sm text-gray-300 line-clamp-2 mb-2">{content.caption}</p>
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {content.hashtags.slice(0, 3).map((tag, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs bg-pink-500/10 border-pink-500/30 text-pink-400">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {content.hashtags.length > 3 && (
                                    <Badge variant="outline" className="text-xs bg-gray-500/10 border-gray-500/30 text-gray-400">
                                      +{content.hashtags.length - 3}
                                    </Badge>
                                  )}
                                </div>
                                {content.engagement && (
                                  <div className="flex items-center gap-4 text-xs text-gray-400 pt-2 border-t border-white/10">
                                    <span className="flex items-center gap-1">
                                      <ThumbsUp className="w-3 h-3" />
                                      {content.engagement.likes}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <MessageCircleIcon className="w-3 h-3" />
                                      {content.engagement.comments}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Share2Icon className="w-3 h-3" />
                                      {content.engagement.shares}
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
            <DialogTitle className="text-white">Compose Instagram DM</DialogTitle>
            <DialogDescription className="text-gray-400">
              Send a direct message to prospects
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex gap-2">
              <Button
                variant={composeMode === 'single' ? 'default' : 'outline'}
                onClick={() => setComposeMode('single')}
                className={composeMode === 'single' ? 'bg-pink-500' : 'bg-white/5 border-white/10 text-white'}
              >
                Single DM
              </Button>
              <Button
                variant={composeMode === 'bulk' ? 'default' : 'outline'}
                onClick={() => setComposeMode('bulk')}
                className={composeMode === 'bulk' ? 'bg-pink-500' : 'bg-white/5 border-white/10 text-white'}
              >
                Bulk DM
              </Button>
            </div>

            {composeMode === 'single' ? (
              <>
                <div>
                  <Label className="text-gray-300 mb-2 block">To (Instagram Handle)</Label>
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
                  <Label className="text-gray-300 mb-2 block">Message</Label>
                  <Textarea
                    value={composeMessage}
                    onChange={(e) => setComposeMessage(e.target.value)}
                    placeholder="Type your DM here..."
                    className="min-h-[150px] bg-slate-800/50 border-white/10 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">Add Media (Optional)</Label>
                  <Button variant="outline" className="bg-slate-800/50 border-white/10 text-white w-full">
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Upload Photo/Video
                  </Button>
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
                  console.log('Sending Instagram DM:', { composeMode, composeTo, composeMessage });
                  setShowCompose(false);
                }}
                className="bg-gradient-to-r from-pink-500 to-purple-600"
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
            <DialogTitle className="text-white">Instagram Analytics</DialogTitle>
            <DialogDescription className="text-gray-400">
              Track your Instagram outreach performance
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-slate-800/50 border-white/10">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-400 mb-1">DMs Sent</p>
                  <p className="text-2xl font-bold text-white">623</p>
                  <p className="text-xs text-green-400 mt-1">+18% from last week</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-white/10">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-400 mb-1">Response Rate</p>
                  <p className="text-2xl font-bold text-white">42.1%</p>
                  <p className="text-xs text-green-400 mt-1">+7% from last week</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-white/10">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-400 mb-1">Engagement Rate</p>
                  <p className="text-2xl font-bold text-white">6.8%</p>
                  <p className="text-xs text-green-400 mt-1">+2.4% from last week</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-white/10">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-400 mb-1">New Followers</p>
                  <p className="text-2xl font-bold text-white">456</p>
                  <p className="text-xs text-green-400 mt-1">+22% from last week</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Post Dialog */}
      <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-pink-400" />
              Create Instagram Post
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Generate posts with AI, add captions, hashtags, and schedule
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* AI Generation Section */}
            <Card className="bg-gradient-to-br from-pink-500/10 to-purple-600/10 border-pink-500/30">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-pink-400" />
                  AI-Powered Content Generation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">Describe your post idea</Label>
                  <Textarea
                    value={postPrompt}
                    onChange={(e) => setPostPrompt(e.target.value)}
                    placeholder="E.g., Create a post about our new AI sales automation feature, make it engaging and include a call-to-action..."
                    className="min-h-[120px] bg-slate-800/50 border-white/10 text-white"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    The AI will generate a caption, suggest hashtags, and provide content ideas
                  </p>
                </div>
                <Button
                  onClick={() => {
                    // Simulate AI generation
                    setGeneratedCaption(`🚀 Exciting News! We just launched our revolutionary AI Sales Automation feature that's transforming how teams close deals!\n\n✨ Key Benefits:\n• 10x faster lead qualification\n• Automated follow-ups\n• Real-time insights\n• Seamless CRM integration\n\nReady to supercharge your sales? Let's connect! 💼\n\n#SalesAutomation #AI #SalesTech #B2BSales #SalesTools #CRM #SalesEnablement #TechInnovation`);
                    setGeneratedHashtags(['SalesAutomation', 'AI', 'SalesTech', 'B2BSales', 'SalesTools', 'CRM', 'SalesEnablement', 'TechInnovation', 'BusinessGrowth', 'DigitalTransformation']);
                  }}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate with AI
                </Button>
              </CardContent>
            </Card>

            {/* Media Upload */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Media
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-pink-500/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        setSelectedMedia(Array.from(e.target.files));
                      }
                    }}
                    className="hidden"
                    id="media-upload"
                  />
                  <label htmlFor="media-upload" className="cursor-pointer">
                    <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-white font-medium mb-1">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-400">Images or Videos (Max 10 files, 100MB each)</p>
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
                        <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                          {file.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Generated Caption */}
            {generatedCaption && (
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
                      onClick={() => {
                        setGeneratedCaption('');
                        setGeneratedHashtags([]);
                      }}
                      className="bg-white/5 border-white/10 text-white"
                    >
                      Regenerate
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={generatedCaption}
                    onChange={(e) => setGeneratedCaption(e.target.value)}
                    className="min-h-[150px] bg-slate-900/50 border-white/10 text-white font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Character count: {generatedCaption.length} / 2,200
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Hashtags */}
            {generatedHashtags.length > 0 && (
              <Card className="bg-slate-800/50 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Hash className="w-5 h-5" />
                    Suggested Hashtags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {generatedHashtags.map((tag, idx) => (
                      <Badge
                        key={idx}
                        className="bg-pink-500/20 border-pink-500/30 text-pink-400 cursor-pointer hover:bg-pink-500/30"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Label className="text-gray-300 mb-2 block">Custom Hashtags</Label>
                    <Input
                      placeholder="Add more hashtags (comma separated)..."
                      className="bg-slate-900/50 border-white/10 text-white"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.currentTarget.value;
                          const newTags = input.split(',').map(t => t.trim().replace('#', '')).filter(t => t);
                          setGeneratedHashtags([...generatedHashtags, ...newTags]);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Scheduling */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Schedule Post
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="schedule-post"
                    checked={postSchedule !== null}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setPostSchedule({ date: '', time: '' });
                      } else {
                        setPostSchedule(null);
                      }
                    }}
                  />
                  <Label htmlFor="schedule-post" className="text-gray-300 cursor-pointer">
                    Schedule this post for later
                  </Label>
                </div>
                {postSchedule && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300 mb-2 block">Date</Label>
                      <Input
                        type="date"
                        value={postSchedule.date}
                        onChange={(e) => setPostSchedule({ ...postSchedule, date: e.target.value })}
                        className="bg-slate-900/50 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300 mb-2 block">Time</Label>
                      <Input
                        type="time"
                        value={postSchedule.time}
                        onChange={(e) => setPostSchedule({ ...postSchedule, time: e.target.value })}
                        className="bg-slate-900/50 border-white/10 text-white"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-2 justify-end pt-4 border-t border-white/10">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCreatePost(false);
                  setPostPrompt('');
                  setGeneratedCaption('');
                  setGeneratedHashtags([]);
                  setSelectedMedia([]);
                  setPostSchedule(null);
                }}
                className="bg-white/5 border-white/10 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const newContent = {
                    id: Date.now(),
                    type: 'post' as const,
                    caption: generatedCaption || 'Untitled post',
                    hashtags: generatedHashtags,
                    media: selectedMedia.map(f => f.name),
                    scheduled: postSchedule !== null,
                    scheduledDate: postSchedule ? `${postSchedule.date} ${postSchedule.time}` : undefined,
                    status: (postSchedule ? 'scheduled' : 'draft') as 'draft' | 'scheduled' | 'published',
                    createdAt: new Date().toISOString()
                  };
                  setContentLibrary([newContent, ...contentLibrary]);
                  setShowCreatePost(false);
                  setPostPrompt('');
                  setGeneratedCaption('');
                  setGeneratedHashtags([]);
                  setSelectedMedia([]);
                  setPostSchedule(null);
                }}
                className="bg-gradient-to-r from-pink-500 to-purple-600"
              >
                <Save className="w-4 h-4 mr-2" />
                {postSchedule ? 'Schedule Post' : 'Save as Draft'}
              </Button>
              {!postSchedule && (
                <Button
                  onClick={() => {
                    const newContent = {
                      id: Date.now(),
                      type: 'post' as const,
                      caption: generatedCaption || 'Untitled post',
                      hashtags: generatedHashtags,
                      media: selectedMedia.map(f => f.name),
                      scheduled: false,
                      status: 'published' as const,
                      createdAt: new Date().toISOString(),
                      engagement: { likes: 0, comments: 0, shares: 0 }
                    };
                    setContentLibrary([newContent, ...contentLibrary]);
                    setShowCreatePost(false);
                    setPostPrompt('');
                    setGeneratedCaption('');
                    setGeneratedHashtags([]);
                    setSelectedMedia([]);
                  }}
                  className="bg-gradient-to-r from-green-500 to-emerald-600"
                >
                  <Share2Icon className="w-4 h-4 mr-2" />
                  Publish Now
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Story Dialog */}
      <Dialog open={showCreateStory} onOpenChange={setShowCreateStory}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-purple-400" />
              Create Instagram Story
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Create engaging stories with AI-generated content
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Story Prompt */}
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-purple-400" />
                  AI Story Generation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">Story Idea / Prompt</Label>
                  <Textarea
                    placeholder="E.g., Create a story about a product launch announcement, make it exciting and include a swipe-up CTA..."
                    className="min-h-[100px] bg-slate-800/50 border-white/10 text-white"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Story Content
                </Button>
              </CardContent>
            </Card>

            {/* Story Media */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Story Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-purple-500/50 transition-colors">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      id="story-media"
                    />
                    <label htmlFor="story-media" className="cursor-pointer">
                      <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-white">Upload Photo/Video</p>
                    </label>
                  </div>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-purple-500/50 transition-colors">
                    <Video className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-white">Record Video</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Story Features */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Story Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/50 border border-white/10">
                    <Checkbox id="story-location" />
                    <Label htmlFor="story-location" className="text-gray-300 cursor-pointer">Add Location</Label>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/50 border border-white/10">
                    <Checkbox id="story-mention" />
                    <Label htmlFor="story-mention" className="text-gray-300 cursor-pointer">Tag People</Label>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/50 border border-white/10">
                    <Checkbox id="story-music" />
                    <Label htmlFor="story-music" className="text-gray-300 cursor-pointer">Add Music</Label>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/50 border border-white/10">
                    <Checkbox id="story-poll" />
                    <Label htmlFor="story-poll" className="text-gray-300 cursor-pointer">Add Poll</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Story Text Overlay */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Type className="w-5 h-5" />
                  Story Text / Caption
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add text overlay for your story..."
                  className="min-h-[100px] bg-slate-900/50 border-white/10 text-white"
                />
                <div className="flex items-center gap-4 mt-4">
                  <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white">
                    <Palette className="w-4 h-4 mr-2" />
                    Text Style
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white">
                    <Smile className="w-4 h-4 mr-2" />
                    Add Stickers
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2 justify-end pt-4 border-t border-white/10">
              <Button
                variant="outline"
                onClick={() => setShowCreateStory(false)}
                className="bg-white/5 border-white/10 text-white"
              >
                Cancel
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-600">
                <Save className="w-4 h-4 mr-2" />
                Save Story
              </Button>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600">
                <Share2Icon className="w-4 h-4 mr-2" />
                Publish Story
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Video Dialog */}
      <Dialog open={showCreateVideo} onOpenChange={setShowCreateVideo}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Film className="w-5 h-5 text-blue-400" />
              Create Instagram Video
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Generate video content with AI, add captions, and edit
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Video Generation */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-blue-400" />
                  AI Video Content Generation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">Video Concept / Script Prompt</Label>
                  <Textarea
                    placeholder="E.g., Create a 30-second video showcasing our AI sales automation tool, include key features and a strong call-to-action..."
                    className="min-h-[120px] bg-slate-800/50 border-white/10 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300 mb-2 block">Video Duration</Label>
                    <Select defaultValue="30">
                      <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 seconds</SelectItem>
                        <SelectItem value="30">30 seconds</SelectItem>
                        <SelectItem value="60">60 seconds</SelectItem>
                        <SelectItem value="90">90 seconds</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block">Video Format</Label>
                    <Select defaultValue="reels">
                      <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reels">Reels (9:16)</SelectItem>
                        <SelectItem value="post">Post (1:1)</SelectItem>
                        <SelectItem value="igtv">IGTV (9:16)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Video Script & Storyboard
                </Button>
              </CardContent>
            </Card>

            {/* Video Upload */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Upload or Record Video</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-blue-500/50 transition-colors">
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
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-blue-500/50 transition-colors">
                    <Video className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-white">Record Video</p>
                  </div>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-blue-500/50 transition-colors">
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
                onClick={() => setShowCreateVideo(false)}
                className="bg-white/5 border-white/10 text-white"
              >
                Cancel
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-600">
                <Save className="w-4 h-4 mr-2" />
                Save Video
              </Button>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600">
                <Share2Icon className="w-4 h-4 mr-2" />
                Publish Video
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Post Dialog */}
      <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-pink-400" />
              Create Instagram Post
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Generate posts with AI, add captions, hashtags, and schedule
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* AI Generation Section */}
            <Card className="bg-gradient-to-br from-pink-500/10 to-purple-600/10 border-pink-500/30">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-pink-400" />
                  AI-Powered Content Generation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">Describe your post idea</Label>
                  <Textarea
                    value={postPrompt}
                    onChange={(e) => setPostPrompt(e.target.value)}
                    placeholder="E.g., Create a post about our new AI sales automation feature, make it engaging and include a call-to-action..."
                    className="min-h-[120px] bg-slate-800/50 border-white/10 text-white"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    The AI will generate a caption, suggest hashtags, and provide content ideas
                  </p>
                </div>
                <Button
                  onClick={() => {
                    // Simulate AI generation
                    setGeneratedCaption(`🚀 Exciting News! We just launched our revolutionary AI Sales Automation feature that's transforming how teams close deals!\n\n✨ Key Benefits:\n• 10x faster lead qualification\n• Automated follow-ups\n• Real-time insights\n• Seamless CRM integration\n\nReady to supercharge your sales? Let's connect! 💼\n\n#SalesAutomation #AI #SalesTech #B2BSales #SalesTools #CRM #SalesEnablement #TechInnovation`);
                    setGeneratedHashtags(['SalesAutomation', 'AI', 'SalesTech', 'B2BSales', 'SalesTools', 'CRM', 'SalesEnablement', 'TechInnovation', 'BusinessGrowth', 'DigitalTransformation']);
                  }}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate with AI
                </Button>
              </CardContent>
            </Card>

            {/* Media Upload */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Media
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-pink-500/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        setSelectedMedia(Array.from(e.target.files));
                      }
                    }}
                    className="hidden"
                    id="media-upload"
                  />
                  <label htmlFor="media-upload" className="cursor-pointer">
                    <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-white font-medium mb-1">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-400">Images or Videos (Max 10 files, 100MB each)</p>
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
                        <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                          {file.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Generated Caption */}
            {generatedCaption && (
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
                      onClick={() => {
                        setGeneratedCaption('');
                        setGeneratedHashtags([]);
                      }}
                      className="bg-white/5 border-white/10 text-white"
                    >
                      Regenerate
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={generatedCaption}
                    onChange={(e) => setGeneratedCaption(e.target.value)}
                    className="min-h-[150px] bg-slate-900/50 border-white/10 text-white font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Character count: {generatedCaption.length} / 2,200
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Hashtags */}
            {generatedHashtags.length > 0 && (
              <Card className="bg-slate-800/50 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Hash className="w-5 h-5" />
                    Suggested Hashtags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {generatedHashtags.map((tag, idx) => (
                      <Badge
                        key={idx}
                        className="bg-pink-500/20 border-pink-500/30 text-pink-400 cursor-pointer hover:bg-pink-500/30"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Label className="text-gray-300 mb-2 block">Custom Hashtags</Label>
                    <Input
                      placeholder="Add more hashtags (comma separated)..."
                      className="bg-slate-900/50 border-white/10 text-white"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.currentTarget.value;
                          const newTags = input.split(',').map(t => t.trim().replace('#', '')).filter(t => t);
                          setGeneratedHashtags([...generatedHashtags, ...newTags]);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Scheduling */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Schedule Post
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="schedule-post"
                    checked={postSchedule !== null}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setPostSchedule({ date: '', time: '' });
                      } else {
                        setPostSchedule(null);
                      }
                    }}
                  />
                  <Label htmlFor="schedule-post" className="text-gray-300 cursor-pointer">
                    Schedule this post for later
                  </Label>
                </div>
                {postSchedule && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300 mb-2 block">Date</Label>
                      <Input
                        type="date"
                        value={postSchedule.date}
                        onChange={(e) => setPostSchedule({ ...postSchedule, date: e.target.value })}
                        className="bg-slate-900/50 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300 mb-2 block">Time</Label>
                      <Input
                        type="time"
                        value={postSchedule.time}
                        onChange={(e) => setPostSchedule({ ...postSchedule, time: e.target.value })}
                        className="bg-slate-900/50 border-white/10 text-white"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-2 justify-end pt-4 border-t border-white/10">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCreatePost(false);
                  setPostPrompt('');
                  setGeneratedCaption('');
                  setGeneratedHashtags([]);
                  setSelectedMedia([]);
                  setPostSchedule(null);
                }}
                className="bg-white/5 border-white/10 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const newContent = {
                    id: Date.now(),
                    type: 'post' as const,
                    caption: generatedCaption || 'Untitled post',
                    hashtags: generatedHashtags,
                    media: selectedMedia.map(f => f.name),
                    scheduled: postSchedule !== null,
                    scheduledDate: postSchedule ? `${postSchedule.date} ${postSchedule.time}` : undefined,
                    status: (postSchedule ? 'scheduled' : 'draft') as 'draft' | 'scheduled' | 'published',
                    createdAt: new Date().toISOString()
                  };
                  setContentLibrary([newContent, ...contentLibrary]);
                  setShowCreatePost(false);
                  setPostPrompt('');
                  setGeneratedCaption('');
                  setGeneratedHashtags([]);
                  setSelectedMedia([]);
                  setPostSchedule(null);
                }}
                className="bg-gradient-to-r from-pink-500 to-purple-600"
              >
                <Save className="w-4 h-4 mr-2" />
                {postSchedule ? 'Schedule Post' : 'Save as Draft'}
              </Button>
              {!postSchedule && (
                <Button
                  onClick={() => {
                    const newContent = {
                      id: Date.now(),
                      type: 'post' as const,
                      caption: generatedCaption || 'Untitled post',
                      hashtags: generatedHashtags,
                      media: selectedMedia.map(f => f.name),
                      scheduled: false,
                      status: 'published' as const,
                      createdAt: new Date().toISOString(),
                      engagement: { likes: 0, comments: 0, shares: 0 }
                    };
                    setContentLibrary([newContent, ...contentLibrary]);
                    setShowCreatePost(false);
                    setPostPrompt('');
                    setGeneratedCaption('');
                    setGeneratedHashtags([]);
                    setSelectedMedia([]);
                  }}
                  className="bg-gradient-to-r from-green-500 to-emerald-600"
                >
                  <Share2Icon className="w-4 h-4 mr-2" />
                  Publish Now
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Story Dialog */}
      <Dialog open={showCreateStory} onOpenChange={setShowCreateStory}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-purple-400" />
              Create Instagram Story
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Create engaging stories with AI-generated content
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Story Prompt */}
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-purple-400" />
                  AI Story Generation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">Story Idea / Prompt</Label>
                  <Textarea
                    placeholder="E.g., Create a story about a product launch announcement, make it exciting and include a swipe-up CTA..."
                    className="min-h-[100px] bg-slate-800/50 border-white/10 text-white"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Story Content
                </Button>
              </CardContent>
            </Card>

            {/* Story Media */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Story Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-purple-500/50 transition-colors">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      id="story-media"
                    />
                    <label htmlFor="story-media" className="cursor-pointer">
                      <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-white">Upload Photo/Video</p>
                    </label>
                  </div>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-purple-500/50 transition-colors">
                    <Video className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-white">Record Video</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Story Features */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Story Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/50 border border-white/10">
                    <Checkbox id="story-location" />
                    <Label htmlFor="story-location" className="text-gray-300 cursor-pointer">Add Location</Label>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/50 border border-white/10">
                    <Checkbox id="story-mention" />
                    <Label htmlFor="story-mention" className="text-gray-300 cursor-pointer">Tag People</Label>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/50 border border-white/10">
                    <Checkbox id="story-music" />
                    <Label htmlFor="story-music" className="text-gray-300 cursor-pointer">Add Music</Label>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/50 border border-white/10">
                    <Checkbox id="story-poll" />
                    <Label htmlFor="story-poll" className="text-gray-300 cursor-pointer">Add Poll</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Story Text Overlay */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Type className="w-5 h-5" />
                  Story Text / Caption
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add text overlay for your story..."
                  className="min-h-[100px] bg-slate-900/50 border-white/10 text-white"
                />
                <div className="flex items-center gap-4 mt-4">
                  <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white">
                    <Palette className="w-4 h-4 mr-2" />
                    Text Style
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white">
                    <Smile className="w-4 h-4 mr-2" />
                    Add Stickers
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2 justify-end pt-4 border-t border-white/10">
              <Button
                variant="outline"
                onClick={() => setShowCreateStory(false)}
                className="bg-white/5 border-white/10 text-white"
              >
                Cancel
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-600">
                <Save className="w-4 h-4 mr-2" />
                Save Story
              </Button>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600">
                <Share2Icon className="w-4 h-4 mr-2" />
                Publish Story
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Video Dialog */}
      <Dialog open={showCreateVideo} onOpenChange={setShowCreateVideo}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Film className="w-5 h-5 text-blue-400" />
              Create Instagram Video
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Generate video content with AI, add captions, and edit
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Video Generation */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-blue-400" />
                  AI Video Content Generation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">Video Concept / Script Prompt</Label>
                  <Textarea
                    placeholder="E.g., Create a 30-second video showcasing our AI sales automation tool, include key features and a strong call-to-action..."
                    className="min-h-[120px] bg-slate-800/50 border-white/10 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300 mb-2 block">Video Duration</Label>
                    <Select defaultValue="30">
                      <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 seconds</SelectItem>
                        <SelectItem value="30">30 seconds</SelectItem>
                        <SelectItem value="60">60 seconds</SelectItem>
                        <SelectItem value="90">90 seconds</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block">Video Format</Label>
                    <Select defaultValue="reels">
                      <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reels">Reels (9:16)</SelectItem>
                        <SelectItem value="post">Post (1:1)</SelectItem>
                        <SelectItem value="igtv">IGTV (9:16)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Video Script & Storyboard
                </Button>
              </CardContent>
            </Card>

            {/* Video Upload */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Upload or Record Video</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-blue-500/50 transition-colors">
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
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-blue-500/50 transition-colors">
                    <Video className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-white">Record Video</p>
                  </div>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-blue-500/50 transition-colors">
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
                onClick={() => setShowCreateVideo(false)}
                className="bg-white/5 border-white/10 text-white"
              >
                Cancel
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-600">
                <Save className="w-4 h-4 mr-2" />
                Save Video
              </Button>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600">
                <Share2Icon className="w-4 h-4 mr-2" />
                Publish Video
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

