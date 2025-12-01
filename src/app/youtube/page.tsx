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
  Youtube,
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
  Video,
  Play,
  Pause,
  Edit,
  Trash2,
  Download,
  Upload,
  Link2,
  Eye,
  ThumbsUp,
  MessageCircle,
  Heart,
  Bell,
  Settings,
  Grid3x3,
  List,
  Upload as UploadIcon,
  Film,
  Image as ImageIcon,
  Wand2,
  Save,
  Calendar as CalendarIcon,
  Type,
  Hash,
  RefreshCw,
  Loader2,
  Globe,
  Lock,
  Eye as EyeIcon,
  Users as UsersIcon,
  DollarSign,
  Target,
  AlertCircle,
  X,
  Copy,
  Download as DownloadIcon
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function YouTubePage() {
  const [selectedTab, setSelectedTab] = useState('videos');
  const [showCreateVideo, setShowCreateVideo] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  // Video Creation States
  const [videoPrompt, setVideoPrompt] = useState('');
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoScript, setVideoScript] = useState('');
  const [videoStoryboard, setVideoStoryboard] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoTags, setVideoTags] = useState<string[]>([]);
  const [videoCategory, setVideoCategory] = useState('');
  const [videoVisibility, setVideoVisibility] = useState('private');
  const [thumbnailPrompt, setThumbnailPrompt] = useState('');
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false);
  const [generatedThumbnail, setGeneratedThumbnail] = useState<string | null>(null);
  const [captionPrompt, setCaptionPrompt] = useState('');
  const [isGeneratingCaptions, setIsGeneratingCaptions] = useState(false);
  const [generatedCaptions, setGeneratedCaptions] = useState('');
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
  const [videoSchedule, setVideoSchedule] = useState<{ date: string; time: string } | null>(null);
  const [videoDuration, setVideoDuration] = useState('10');
  const [videoLanguage, setVideoLanguage] = useState('en');
  const [videoLibrary, setVideoLibrary] = useState<Array<{
    id: number;
    title: string;
    description: string;
    script: string;
    thumbnail: string | null;
    captions: string;
    tags: string[];
    status: 'draft' | 'scheduled' | 'published';
    scheduledDate?: string;
    createdAt: string;
    engagement?: { views: number; likes: number; comments: number; subscribers: number };
  }>>([]);
  
  // Mock data
  const stats = [
    { label: 'Total Subscribers', value: '12.5K', change: '+8.2%', trend: 'up' },
    { label: 'Total Views', value: '234K', change: '+15.3%', trend: 'up' },
    { label: 'Watch Time', value: '1.2K hours', change: '+12.1%', trend: 'up' },
    { label: 'Avg. Engagement', value: '6.8%', change: '+2.4%', trend: 'up' }
  ];

  const videos = [
    {
      id: 1,
      title: 'AI Sales Automation: Complete Guide for B2B Companies',
      thumbnail: 'AI',
      views: '12.5K',
      likes: 456,
      comments: 89,
      published: '2 days ago',
      duration: '8:45',
      status: 'Published'
    },
    {
      id: 2,
      title: 'How to 10x Your Sales Pipeline with AI',
      thumbnail: 'Sales',
      views: '8.3K',
      likes: 312,
      comments: 56,
      published: '5 days ago',
      duration: '12:30',
      status: 'Published'
    },
    {
      id: 3,
      title: 'Enterprise Solutions Demo - Coming Soon',
      thumbnail: 'Demo',
      views: '0',
      likes: 0,
      comments: 0,
      published: 'Scheduled: Tomorrow',
      duration: '15:00',
      status: 'Scheduled'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
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
                <div className="p-2 rounded-lg bg-gradient-to-br from-red-600 to-red-700">
                  <Youtube className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">YouTube Channel</h1>
                  <p className="text-sm text-gray-400">Manage videos, analytics, and engagement</p>
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
                onClick={() => setShowCreateVideo(true)}
                className="bg-gradient-to-r from-red-600 to-red-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Video
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
                      value="videos" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-red-500/10 data-[state=active]:text-red-400"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Videos
                    </TabsTrigger>
                    <TabsTrigger 
                      value="analytics" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-red-500/10 data-[state=active]:text-red-400"
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics
                    </TabsTrigger>
                    <TabsTrigger 
                      value="comments" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-red-500/10 data-[state=active]:text-red-400"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Comments
                      <Badge className="ml-auto bg-red-500/20 text-red-400">24</Badge>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="playlists" 
                      className="w-full justify-start px-4 py-3 data-[state=active]:bg-red-500/10 data-[state=active]:text-red-400"
                    >
                      <List className="w-4 h-4 mr-2" />
                      Playlists
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              {/* Videos Tab */}
              <TabsContent value="videos" className="space-y-4">
                <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Your Videos</CardTitle>
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Search videos..."
                          className="w-64 bg-slate-800/50 border-white/10 text-white"
                        />
                        <Select defaultValue="all">
                          <SelectTrigger className="w-40 bg-slate-800/50 border-white/10 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Videos</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                            <SelectItem value="draft">Drafts</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {videos.map((video) => (
                        <Card key={video.id} className="bg-slate-800/50 border-white/10 hover:border-red-500/50 transition-colors">
                          <CardContent className="p-0">
                            <div className="relative aspect-video bg-slate-700/50 rounded-t-lg overflow-hidden">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Play className="w-12 h-12 text-gray-500" />
                              </div>
                              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                {video.duration}
                              </div>
                              <Badge className={`absolute top-2 right-2 ${
                                video.status === 'Published' ? 'bg-green-500/20 text-green-400' :
                                video.status === 'Scheduled' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-gray-500/20 text-gray-400'
                              }`}>
                                {video.status}
                              </Badge>
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-white mb-2 line-clamp-2">{video.title}</h3>
                              <div className="flex items-center justify-between text-sm text-gray-400">
                                <div className="flex items-center gap-4">
                                  <span className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    {video.views}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <ThumbsUp className="w-4 h-4" />
                                    {video.likes}
                                  </span>
                                </div>
                                <span>{video.published}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-3">
                                <Button size="sm" variant="outline" className="bg-red-500/10 border-red-500/30 text-red-400 flex-1">
                                  <Edit className="w-3 h-3 mr-1" />
                                  Edit
                                </Button>
                                <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-gray-400">
                                  <BarChart3 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-4">
                <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white">Channel Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-gray-400">
                      <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">Analytics coming soon</p>
                      <p className="text-sm">Detailed analytics will be available here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Comments Tab */}
              <TabsContent value="comments" className="space-y-4">
                <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white">Comments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-gray-400">
                      <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">Comments coming soon</p>
                      <p className="text-sm">Comment management will be available here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Playlists Tab */}
              <TabsContent value="playlists" className="space-y-4">
                <Card className="bg-slate-900/50 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white">Playlists</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-gray-400">
                      <List className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">Playlists coming soon</p>
                      <p className="text-sm">Playlist management will be available here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Create Video Dialog */}
      <Dialog open={showCreateVideo} onOpenChange={setShowCreateVideo}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Video className="w-5 h-5 text-red-400" />
              Create YouTube Video
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Generate videos with AI, create thumbnails, scripts, and captions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* AI Video Generation */}
            <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-red-400" />
                  AI Video Generation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">Video Concept / Prompt *</Label>
                  <Textarea
                    value={videoPrompt}
                    onChange={(e) => setVideoPrompt(e.target.value)}
                    placeholder="E.g., Create a 10-minute educational video about AI sales automation for B2B companies. Include: introduction to AI in sales, key benefits, real-world case studies, implementation steps, common challenges, and future trends. Make it engaging with clear visuals and professional narration..."
                    className="min-h-[150px] bg-slate-800/50 border-white/10 text-white"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Describe your video concept, duration, style, target audience, and key points to cover
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-gray-300 mb-2 block">Video Duration</Label>
                    <Select value={videoDuration} onValueChange={setVideoDuration}>
                      <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block">Video Style</Label>
                    <Select defaultValue="educational">
                      <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="educational">Educational</SelectItem>
                        <SelectItem value="tutorial">Tutorial</SelectItem>
                        <SelectItem value="review">Review</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                        <SelectItem value="promotional">Promotional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block">Target Audience</Label>
                    <Select defaultValue="b2b">
                      <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="b2b">B2B Professionals</SelectItem>
                        <SelectItem value="b2c">B2C Consumers</SelectItem>
                        <SelectItem value="general">General Audience</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setIsGeneratingVideo(true);
                    // Simulate AI generation
                    setTimeout(() => {
                      setVideoTitle('AI Sales Automation: Complete Guide for B2B Companies in 2025');
                      setVideoDescription(`In this comprehensive guide, we explore how AI is revolutionizing sales automation for B2B companies. Learn about key trends, implementation strategies, and real-world success stories.

📌 What You'll Learn:
• Introduction to AI in Sales Automation
• Key Benefits and ROI Metrics
• Real-World Case Studies
• Step-by-Step Implementation Guide
• Common Challenges and Solutions
• Future Trends and Predictions

🔗 Resources Mentioned:
• Enterprise Solutions Case Study
• AI Sales Tools Comparison
• Implementation Checklist

💬 Questions? Drop them in the comments below!

#AISales #SalesAutomation #B2BSales #SalesTech #BusinessGrowth #DigitalTransformation`);
                      setVideoScript(`YOUTUBE VIDEO SCRIPT: AI Sales Automation Guide (10 minutes)

[0:00-0:15] HOOK
"What if I told you that AI could help your sales team close 3x more deals in half the time? In this video, we're diving deep into AI sales automation for B2B companies. Stick around because by the end, you'll know exactly how to implement it in your business."

[0:15-1:00] INTRODUCTION
"Hey everyone, welcome back to the channel. I'm [Name], and today we're talking about one of the most transformative technologies in sales: AI automation. Whether you're a sales manager looking to scale your team or a business owner wanting to increase revenue, this video is for you."

[1:00-3:00] WHAT IS AI SALES AUTOMATION?
"Let's start with the basics. AI sales automation uses artificial intelligence to handle repetitive sales tasks like lead qualification, follow-ups, and data entry. Think of it as having a super-powered assistant that never sleeps, never forgets, and gets smarter over time."

[3:00-5:30] KEY BENEFITS
"Here's why companies are rushing to adopt AI sales automation:
First, it increases efficiency. Your team can focus on high-value activities like closing deals instead of manual data entry.
Second, it improves accuracy. AI doesn't make human errors in lead scoring or follow-up timing.
Third, it scales effortlessly. Handle 10 or 10,000 leads with the same resources.
And fourth, it provides real-time insights that help you make data-driven decisions."

[5:30-7:00] CASE STUDIES
"Let's look at some real results. Enterprise Solutions Inc. saw a 45% increase in conversion rates after implementing AI automation. TechStartup Co. reduced their sales cycle by 30% and increased qualified meetings by 3x. These aren't isolated cases - the data speaks for itself."

[7:00-8:30] IMPLEMENTATION STEPS
"So how do you get started? Step one: Assess your current sales process and identify automation opportunities. Step two: Choose the right AI platform that integrates with your existing tools. Step three: Start small with lead scoring or follow-up automation. Step four: Train your team and monitor results. And step five: Scale gradually based on what works."

[8:30-9:30] COMMON CHALLENGES
"Now, let's address the elephant in the room. Common challenges include data quality issues, integration complexity, and team adoption. The key is to start with clean data, choose platforms with good integrations, and involve your team in the process from day one."

[9:30-10:00] FUTURE TRENDS & CTA
"Looking ahead, AI in sales is only going to get more sophisticated. By 2027, we predict that 80% of B2B sales processes will be AI-assisted. The question isn't whether to adopt AI, but how quickly you can implement it.

If you found this video helpful, give it a thumbs up and subscribe for more sales tech content. Drop your questions in the comments, and I'll see you in the next one!"`);
                      setVideoStoryboard(`STORYBOARD: AI Sales Automation Guide

Scene 1 (0:00-0:15): Hook
- Visual: Dynamic animation showing sales metrics improving
- Text Overlay: "3x More Deals in Half the Time"
- Speaker: Direct to camera, engaging tone

Scene 2 (0:15-1:00): Introduction
- Visual: Professional background, speaker introduction
- Graphics: Channel branding
- Speaker: Welcoming, establishing credibility

Scene 3 (1:00-3:00): What is AI Sales Automation
- Visual: Animated diagrams showing AI workflow
- Graphics: Icons for automation processes
- Speaker: Educational, clear explanations

Scene 4 (3:00-5:30): Key Benefits
- Visual: Split screen with benefits listed
- Graphics: Icons for each benefit, animated counters
- Speaker: Enthusiastic, data-driven

Scene 5 (5:30-7:00): Case Studies
- Visual: Charts, graphs, testimonial cards
- Graphics: Company logos, success metrics
- Speaker: Confident, results-focused

Scene 6 (7:00-8:30): Implementation Steps
- Visual: Step-by-step checklist animation
- Graphics: Numbered steps, process flow
- Speaker: Practical, actionable

Scene 7 (8:30-9:30): Common Challenges
- Visual: Problem-solution format
- Graphics: Warning icons, solution highlights
- Speaker: Honest, solution-oriented

Scene 8 (9:30-10:00): Future Trends & CTA
- Visual: Futuristic graphics, call-to-action screen
- Graphics: Subscribe button, social links
- Speaker: Forward-looking, engaging`);
                      setVideoTags(['AI Sales', 'Sales Automation', 'B2B Sales', 'Sales Technology', 'Business Growth', 'Digital Transformation', 'Sales Enablement', 'AI Technology', 'Sales Strategy', 'Revenue Growth']);
                      setIsGeneratingVideo(false);
                    }, 2500);
                  }}
                  disabled={!videoPrompt.trim() || isGeneratingVideo}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 disabled:opacity-50"
                >
                  {isGeneratingVideo ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating Video Content...
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
                      <FileText className="w-5 h-5" />
                      Generated Video Script
                    </CardTitle>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-red-500/10 border-red-500/30 text-red-400"
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
                    className="min-h-[300px] bg-slate-900/50 border-white/10 text-white font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Script length: {videoScript.split(/\s+/).filter(Boolean).length} words
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Generated Storyboard */}
            {videoStoryboard && (
              <Card className="bg-slate-800/50 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Grid3x3 className="w-5 h-5" />
                    Generated Storyboard
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={videoStoryboard}
                    onChange={(e) => setVideoStoryboard(e.target.value)}
                    className="min-h-[250px] bg-slate-900/50 border-white/10 text-white font-mono text-sm"
                  />
                </CardContent>
              </Card>
            )}

            {/* Video Upload */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <UploadIcon className="w-5 h-5" />
                  Upload Video
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-red-500/50 transition-colors">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedVideoFile(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                    id="video-upload"
                  />
                  <label htmlFor="video-upload" className="cursor-pointer">
                    <Video className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-white font-medium mb-1">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-400">Video file (Max 256GB, MP4, MOV, AVI, etc.)</p>
                  </label>
                </div>
                {selectedVideoFile && (
                  <div className="mt-4 p-4 bg-slate-900/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Video className="w-8 h-8 text-red-400" />
                        <div>
                          <p className="text-white font-medium">{selectedVideoFile.name}</p>
                          <p className="text-xs text-gray-400">
                            {(selectedVideoFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedVideoFile(null)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Thumbnail Generation */}
            <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-orange-400" />
                  Generate Thumbnail
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">Thumbnail Design Prompt</Label>
                  <Textarea
                    value={thumbnailPrompt}
                    onChange={(e) => setThumbnailPrompt(e.target.value)}
                    placeholder="E.g., Create an eye-catching YouTube thumbnail for an AI sales automation video. Include: bold title text 'AI Sales Automation', professional B2B aesthetic, tech elements, bright colors (red/blue gradient), engaging visuals, and a clear value proposition..."
                    className="min-h-[100px] bg-slate-800/50 border-white/10 text-white"
                  />
                </div>
                <Button
                  onClick={() => {
                    setIsGeneratingThumbnail(true);
                    setTimeout(() => {
                      setGeneratedThumbnail('thumbnail-generated.png');
                      setIsGeneratingThumbnail(false);
                    }, 2000);
                  }}
                  disabled={!thumbnailPrompt.trim() || isGeneratingThumbnail}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 disabled:opacity-50"
                >
                  {isGeneratingThumbnail ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating Thumbnail...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Thumbnail with AI
                    </>
                  )}
                </Button>
                {generatedThumbnail && (
                  <div className="mt-4">
                    <div className="relative aspect-video bg-slate-700/50 rounded-lg overflow-hidden border-2 border-orange-500/30">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-gray-500" />
                      </div>
                      <div className="absolute top-2 right-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="bg-black/50 text-white hover:bg-black/70"
                          onClick={() => setGeneratedThumbnail(null)}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Button size="sm" variant="outline" className="bg-orange-500/10 border-orange-500/30 text-orange-400">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerate
                      </Button>
                      <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Video Details */}
            {videoTitle && (
              <Card className="bg-slate-800/50 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Video Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300 mb-2 block">Title *</Label>
                    <Input
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      placeholder="Enter video title..."
                      className="bg-slate-900/50 border-white/10 text-white"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {videoTitle.length} / 100 characters
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-300 mb-2 block">Description *</Label>
                    <Textarea
                      value={videoDescription}
                      onChange={(e) => setVideoDescription(e.target.value)}
                      placeholder="Enter video description..."
                      className="min-h-[200px] bg-slate-900/50 border-white/10 text-white"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {videoDescription.length} / 5,000 characters
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300 mb-2 block">Category</Label>
                      <Select value={videoCategory} onValueChange={setVideoCategory}>
                        <SelectTrigger className="bg-slate-900/50 border-white/10 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="science">Science & Technology</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="howto">Howto & Style</SelectItem>
                          <SelectItem value="tech">Technology</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-gray-300 mb-2 block">Language</Label>
                      <Select value={videoLanguage} onValueChange={setVideoLanguage}>
                        <SelectTrigger className="bg-slate-900/50 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            {videoTags.length > 0 && (
              <Card className="bg-slate-800/50 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <Hash className="w-5 h-5" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {videoTags.map((tag, idx) => (
                      <Badge
                        key={idx}
                        className="bg-red-500/20 border-red-500/30 text-red-400 cursor-pointer hover:bg-red-500/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Input
                    placeholder="Add more tags (comma separated, max 500 characters)..."
                    className="bg-slate-900/50 border-white/10 text-white"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const input = e.currentTarget.value;
                        const newTags = input.split(',').map(t => t.trim()).filter(t => t);
                        setVideoTags([...videoTags, ...newTags]);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {videoTags.join(', ').length} / 500 characters
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Caption Generation */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Type className="w-5 h-5 text-blue-400" />
                  Generate Captions/Subtitles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">Caption Generation Prompt (Optional)</Label>
                  <Textarea
                    value={captionPrompt}
                    onChange={(e) => setCaptionPrompt(e.target.value)}
                    placeholder="E.g., Generate accurate captions with proper timing, include speaker labels, add emphasis on key points, ensure readability..."
                    className="min-h-[80px] bg-slate-800/50 border-white/10 text-white"
                  />
                </div>
                <Button
                  onClick={() => {
                    setIsGeneratingCaptions(true);
                    setTimeout(() => {
                      setGeneratedCaptions(`WEBVTT

00:00:00.000 --> 00:00:15.000
What if I told you that AI could help your sales team close 3x more deals in half the time?

00:00:15.000 --> 00:01:00.000
In this video, we're diving deep into AI sales automation for B2B companies. Stick around because by the end, you'll know exactly how to implement it in your business.

00:01:00.000 --> 00:03:00.000
Hey everyone, welcome back to the channel. I'm [Name], and today we're talking about one of the most transformative technologies in sales: AI automation.

00:03:00.000 --> 00:05:30.000
Let's start with the basics. AI sales automation uses artificial intelligence to handle repetitive sales tasks like lead qualification, follow-ups, and data entry.

00:05:30.000 --> 00:07:00.000
Here's why companies are rushing to adopt AI sales automation: First, it increases efficiency. Your team can focus on high-value activities like closing deals.

00:07:00.000 --> 00:08:30.000
Let's look at some real results. Enterprise Solutions Inc. saw a 45% increase in conversion rates after implementing AI automation.

00:08:30.000 --> 00:09:30.000
So how do you get started? Step one: Assess your current sales process and identify automation opportunities.

00:09:30.000 --> 00:10:00.000
If you found this video helpful, give it a thumbs up and subscribe for more sales tech content.`);
                      setIsGeneratingCaptions(false);
                    }, 2000);
                  }}
                  disabled={isGeneratingCaptions || !selectedVideoFile}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 disabled:opacity-50"
                >
                  {isGeneratingCaptions ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating Captions...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Captions/Subtitles
                    </>
                  )}
                </Button>
                {generatedCaptions && (
                  <div className="mt-4">
                    <Label className="text-gray-300 mb-2 block">Generated Captions (WebVTT Format)</Label>
                    <Textarea
                      value={generatedCaptions}
                      onChange={(e) => setGeneratedCaptions(e.target.value)}
                      className="min-h-[200px] bg-slate-900/50 border-white/10 text-white font-mono text-xs"
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <Button size="sm" variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-400">
                        <Download className="w-4 h-4 mr-2" />
                        Download .vtt
                      </Button>
                      <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Visibility & Scheduling */}
            <Card className="bg-slate-800/50 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Visibility & Scheduling
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">Visibility</Label>
                  <Select value={videoVisibility} onValueChange={setVideoVisibility}>
                    <SelectTrigger className="bg-slate-900/50 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="unlisted">Unlisted</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {videoVisibility === 'scheduled' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300 mb-2 block">Publish Date</Label>
                      <Input
                        type="date"
                        value={videoSchedule?.date || ''}
                        onChange={(e) => setVideoSchedule({ ...videoSchedule || { date: '', time: '' }, date: e.target.value })}
                        className="bg-slate-900/50 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300 mb-2 block">Publish Time</Label>
                      <Input
                        type="time"
                        value={videoSchedule?.time || ''}
                        onChange={(e) => setVideoSchedule({ ...videoSchedule || { date: '', time: '' }, time: e.target.value })}
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
                  setShowCreateVideo(false);
                  setVideoPrompt('');
                  setVideoScript('');
                  setVideoStoryboard('');
                  setVideoTitle('');
                  setVideoDescription('');
                  setVideoTags([]);
                  setThumbnailPrompt('');
                  setGeneratedThumbnail(null);
                  setCaptionPrompt('');
                  setGeneratedCaptions('');
                  setSelectedVideoFile(null);
                  setVideoSchedule(null);
                }}
                className="bg-white/5 border-white/10 text-white"
              >
                Cancel
              </Button>
              {(videoTitle || videoScript) && (
                <Button
                  onClick={() => {
                    console.log('Saving video as draft:', {
                      title: videoTitle,
                      description: videoDescription,
                      script: videoScript,
                      thumbnail: generatedThumbnail,
                      captions: generatedCaptions
                    });
                    setShowCreateVideo(false);
                  }}
                  className="bg-gradient-to-r from-red-600 to-red-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save as Draft
                </Button>
              )}
              {selectedVideoFile && videoTitle && (
                <Button
                  onClick={() => {
                    console.log('Publishing video:', {
                      file: selectedVideoFile.name,
                      title: videoTitle,
                      description: videoDescription,
                      tags: videoTags,
                      visibility: videoVisibility,
                      schedule: videoSchedule
                    });
                    setShowCreateVideo(false);
                  }}
                  className="bg-gradient-to-r from-green-500 to-emerald-600"
                >
                  <UploadIcon className="w-4 h-4 mr-2" />
                  {videoVisibility === 'scheduled' ? 'Schedule Upload' : 'Upload & Publish'}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Analytics Dialog */}
      <Dialog open={showAnalytics} onOpenChange={setShowAnalytics}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-white">YouTube Analytics</DialogTitle>
            <DialogDescription className="text-gray-400">
              Track your channel performance
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="text-center py-12 text-gray-400">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Analytics coming soon</p>
              <p className="text-sm">Detailed analytics will be available here</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Chat Assistant */}
      <ChatAssistant />
    </div>
  );
}

