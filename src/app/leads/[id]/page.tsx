'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  Star,
  Building,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Flame,
  BarChart3,
  Mail,
  Phone,
  Calendar,
  Heart,
  Activity,
  Rocket,
  Brain,
  Clock3,
  ThumbsUp,
  Link2,
  Timer,
  Zap,
  Sparkles,
  FileText,
  CheckSquare,
  Square,
  Plus,
  Folder,
  Upload,
  Download,
  FileText as FileTextIcon,
  Send,
  Handshake,
  XCircle,
  RefreshCw,
  Eye,
  Reply,
  Send as SendIcon,
  Play,
  FileCheck,
  Lightbulb
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id: leadId } = use(params);
  const initialTab = searchParams?.get('tab') || 'engagement';
  
  const [detailTab, setDetailTab] = useState(initialTab);
  const [notes, setNotes] = useState('');
  const [newNote, setNewNote] = useState('');
  const [tasks, setTasks] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [emailHistory, setEmailHistory] = useState<any[]>([]);
  const [callHistory, setCallHistory] = useState<any[]>([]);
  
  // Mock lead data - in a real app, this would fetch from an API
  const lead = {
    id: leadId,
    name: 'Sarah Smith',
    company: 'TechStart Inc.',
    offering: 'ai-automation',
    winProbability: 87,
    engagementScore: 95,
    responseTime: '2.4 hours',
    status: 'Hot',
    acknowledgedAt: 'Acknowledged Today',
    estimatedValue: 85000,
    emailOpens: 12,
    emailClicks: 8,
    callCount: 3,
    daysAsLead: 14,
    nextBestAction: 'Schedule personalized demo within 24 hours',
    notes: 'Very interested in AI automation features.',
    engagementHistory: [
      { type: 'email_opened', content: 'Opened "AI Automation ROI Analysis" email', time: '2 hours ago' },
      { type: 'link_clicked', content: 'Clicked "Schedule Demo" link', time: '3 hours ago' },
      { type: 'email_replied', content: 'Replied to follow-up email with questions', time: '1 day ago' },
      { type: 'call_completed', content: 'Discovery call completed (15 mins)', time: '2 days ago' },
      { type: 'email_opened', content: 'Opened "Welcome to Synapse" email', time: '3 days ago' }
    ]
  };

  useEffect(() => {
    // Initialize mock data
    setNotes(lead.notes || '');
    setEmailHistory([
      { id: 1, subject: 'Follow-up on your interest', sent: '2 hours ago', opened: true, replied: true, type: 'outbound' },
      { id: 2, subject: 'Welcome to Synapse AI', sent: '1 day ago', opened: true, replied: false, type: 'outbound' },
      { id: 3, subject: 'Re: Follow-up on your interest', sent: '1 hour ago', opened: false, replied: false, type: 'inbound' }
    ]);
    setCallHistory([
      { id: 1, date: '2025-01-20', duration: '15:32', outcome: 'Positive', notes: 'Discussed pricing and timeline', recording: true },
      { id: 2, date: '2025-01-18', duration: '8:45', outcome: 'Neutral', notes: 'Initial discovery call', recording: false }
    ]);
    setDocuments([
      { id: 1, name: 'Proposal_Q1_2025.pdf', type: 'pdf', size: '2.4 MB', uploaded: '2 days ago' },
      { id: 2, name: 'Case_Study_TechStart.pdf', type: 'pdf', size: '1.8 MB', uploaded: '5 days ago' }
    ]);
    setTasks([
      { id: 1, title: 'Follow up on proposal', due: '2025-01-22', completed: false, priority: 'high' },
      { id: 2, title: 'Schedule demo call', due: '2025-01-21', completed: false, priority: 'medium' }
    ]);
  }, [leadId]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'hot':
        return 'bg-red-500/30 text-red-300 border-red-400/40';
      case 'warm':
        return 'bg-orange-500/30 text-orange-300 border-orange-400/40';
      case 'cold':
        return 'bg-blue-500/30 text-blue-300 border-blue-400/40';
      default:
        return 'bg-gray-500/30 text-gray-300 border-gray-400/40';
    }
  };

  const getEngagementIcon = (type: string) => {
    switch (type) {
      case 'email_opened': return Mail;
      case 'link_clicked': return Link2;
      case 'email_replied': return Reply;
      case 'call_completed': return Phone;
      default: return Activity;
    }
  };

  const handleNextBestAction = () => {
    console.log('Executing next best action');
  };

  const handleGenerateNurtureContent = () => {
    console.log('Generating nurture content with AI');
  };

  const handleSendNurtureEmail = () => {
    console.log('Sending nurture email');
  };

  const handleSchedule = () => {
    console.log('Scheduling meeting');
  };

  const handleSendProposal = () => {
    console.log('Sending proposal');
  };

  const handleConvert = (action: string) => {
    console.log(`Converting lead: ${action}`);
  };

  const handleViewEmail = (id: number) => {
    console.log('Viewing email:', id);
  };

  const handleReplyEmail = (id: number) => {
    console.log('Replying to email:', id);
  };

  const handleScheduleCall = () => {
    console.log('Scheduling call');
  };

  const handlePlayRecording = (id: number) => {
    console.log('Playing recording:', id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Premium Animated Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-500/40 to-teal-600/40 rounded-full blur-3xl -z-0"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/40 to-pink-600/40 rounded-full blur-3xl -z-0"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-cyan-500/30 to-blue-600/30 rounded-full blur-3xl -z-0"
      />
      {/* Premium Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 -z-0" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="border-b-2 border-emerald-500/30 bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-2xl p-6">
          <div className="max-w-7xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-teal-600/5" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <Button
                  variant="ghost"
                  onClick={() => router.push('/leads')}
                  className="text-gray-400 hover:text-white"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Leads
                </Button>
              </div>
              
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Avatar */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.03, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity }
                    }}
                    className="relative shrink-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg blur-md opacity-40" />
                    <div className="relative w-16 h-16 rounded-lg bg-gradient-to-br from-emerald-500 via-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/40 border border-emerald-400/50">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2 truncate">
                      {lead.name}
                    </h1>
                    <div className="text-gray-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="flex items-center gap-1.5 shrink-0">
                        <Building className="w-4 h-4 text-gray-500" />
                        <span className="truncate">{lead.company}</span>
                      </span>
                      <span className="text-emerald-500/50 shrink-0">•</span>
                      <span className="flex items-center gap-1.5 shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">{lead.acknowledgedAt}</span>
                      </span>
                      <span className="text-emerald-500/50 shrink-0">•</span>
                      <span className="flex items-center gap-1.5 shrink-0">
                        <DollarSign className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-400">${(lead.estimatedValue / 1000).toFixed(0)}k</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Badges */}
                <div className="flex items-center gap-2 shrink-0">
                  <Badge className="bg-gradient-to-r from-emerald-500/30 to-teal-500/30 text-emerald-300 border border-emerald-400/40 px-3 py-1.5 text-sm font-semibold whitespace-nowrap shadow-md backdrop-blur-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {lead.winProbability}%
                  </Badge>
                  <Badge className={`px-3 py-1.5 text-sm font-semibold whitespace-nowrap border ${getStatusColor(lead.status)}`}>
                    <Flame className="w-4 h-4 mr-1" />
                    {lead.status}
                  </Badge>
                </div>
              </div>
              
              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-3 pt-3 border-t border-emerald-500/20">
                {[
                  { label: 'Engagement', value: `${lead.engagementScore}%`, icon: BarChart3, color: 'from-purple-500 to-pink-600' },
                  { label: 'Email Opens', value: lead.emailOpens, icon: Mail, color: 'from-blue-500 to-cyan-600' },
                  { label: 'Calls', value: lead.callCount, icon: Phone, color: 'from-green-500 to-emerald-600' },
                  { label: 'Days as Lead', value: lead.daysAsLead, icon: Calendar, color: 'from-orange-500 to-red-600' }
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="p-3 rounded-lg bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-white/10 hover:border-emerald-500/30 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`p-1.5 rounded-md bg-gradient-to-br ${stat.color} shadow-md`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{stat.label}</span>
                      </div>
                      <p className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{stat.value}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Content */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Tabs value={detailTab} onValueChange={setDetailTab} className="w-full">
            <TabsList className="bg-slate-800/40 border border-emerald-500/20 p-1 w-full grid grid-cols-7 gap-1.5 rounded-lg backdrop-blur-xl shadow-md mb-6">
              <TabsTrigger 
                value="engagement" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-500/30 rounded-md py-2.5 px-3 text-sm transition-all duration-300 data-[state=active]:scale-[1.02] data-[state=active]:border data-[state=active]:border-emerald-400/50 font-medium whitespace-nowrap"
              >
                <BarChart3 className="w-4 h-4 mr-1.5" />
                <span>Engagement</span>
              </TabsTrigger>
              <TabsTrigger 
                value="nurture" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-500/30 rounded-md py-2.5 px-3 text-sm transition-all duration-300 data-[state=active]:scale-[1.02] data-[state=active]:border data-[state=active]:border-emerald-400/50 font-medium whitespace-nowrap"
              >
                <Heart className="w-4 h-4 mr-1.5" />
                <span>Nurture</span>
              </TabsTrigger>
              <TabsTrigger 
                value="timeline" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-500/30 rounded-md py-2.5 px-3 text-sm transition-all duration-300 data-[state=active]:scale-[1.02] data-[state=active]:border data-[state=active]:border-emerald-400/50 font-medium whitespace-nowrap"
              >
                <Activity className="w-4 h-4 mr-1.5" />
                <span>Timeline</span>
              </TabsTrigger>
              <TabsTrigger 
                value="emails" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-500/30 rounded-md py-2.5 px-3 text-sm transition-all duration-300 data-[state=active]:scale-[1.02] data-[state=active]:border data-[state=active]:border-emerald-400/50 font-medium whitespace-nowrap"
              >
                <Mail className="w-4 h-4 mr-1.5" />
                <span>Emails</span>
              </TabsTrigger>
              <TabsTrigger 
                value="calls" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-500/30 rounded-md py-2.5 px-3 text-sm transition-all duration-300 data-[state=active]:scale-[1.02] data-[state=active]:border data-[state=active]:border-emerald-400/50 font-medium whitespace-nowrap"
              >
                <Phone className="w-4 h-4 mr-1.5" />
                <span>Calls</span>
              </TabsTrigger>
              <TabsTrigger 
                value="conversion" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-500/30 rounded-md py-2.5 px-3 text-sm transition-all duration-300 data-[state=active]:scale-[1.02] data-[state=active]:border data-[state=active]:border-emerald-400/50 font-medium whitespace-nowrap"
              >
                <Rocket className="w-4 h-4 mr-1.5" />
                <span>Convert</span>
              </TabsTrigger>
              <TabsTrigger 
                value="insights" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-500/30 rounded-md py-2.5 px-3 text-sm transition-all duration-300 data-[state=active]:scale-[1.02] data-[state=active]:border data-[state=active]:border-emerald-400/50 font-medium whitespace-nowrap"
              >
                <Brain className="w-4 h-4 mr-1.5" />
                <span>AI Insights</span>
              </TabsTrigger>
            </TabsList>

            {/* Engagement Tab */}
            <TabsContent value="engagement" className="space-y-4">
              {/* Engagement Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="border border-emerald-500/30 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl shadow-lg shadow-emerald-500/10 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="border-b border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 to-transparent p-4 relative z-10">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/30 to-teal-600/30 border border-emerald-400/40 shadow-md"
                        >
                          <TrendingUp className="w-5 h-5 text-emerald-300" />
                        </motion.div>
                        <CardTitle className="text-white font-semibold">Win Probability</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 relative z-10">
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring" }}
                          className="text-4xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-3"
                        >
                          {lead.winProbability}%
                        </motion.div>
                        <Progress value={lead.winProbability} className="h-2 bg-slate-800/50 mt-2" />
                        <p className="text-xs text-gray-400 mt-3">Based on engagement patterns</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="border border-purple-500/30 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl shadow-lg shadow-purple-500/10 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="border-b border-purple-500/20 bg-gradient-to-r from-purple-500/5 to-transparent p-4 relative z-10">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                          className="p-2 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-600/30 border border-purple-400/40 shadow-md"
                        >
                          <BarChart3 className="w-5 h-5 text-purple-300" />
                        </motion.div>
                        <CardTitle className="text-white font-semibold">Engagement Score</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 relative z-10">
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.25, type: "spring" }}
                          className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3"
                        >
                          {lead.engagementScore}%
                        </motion.div>
                        <Progress value={lead.engagementScore} className="h-2 bg-slate-800/50 mt-2" />
                        <p className="text-xs text-gray-400 mt-3">Email opens, clicks, replies</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="border border-blue-500/30 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl shadow-lg shadow-blue-500/10 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="border-b border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-transparent p-4 relative z-10">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                          className="p-2 rounded-lg bg-gradient-to-br from-blue-500/30 to-cyan-600/30 border border-blue-400/40 shadow-md"
                        >
                          <Clock3 className="w-5 h-5 text-blue-300" />
                        </motion.div>
                        <CardTitle className="text-white font-semibold">Response Time</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 relative z-10">
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring" }}
                          className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3"
                        >
                          {lead.responseTime}
                        </motion.div>
                        <p className="text-xs text-gray-400 mt-1">Average response time</p>
                        <Badge className="mt-3 bg-gradient-to-r from-green-500/30 to-emerald-600/30 text-green-300 border border-green-400/40 px-2 py-1 text-xs">
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          Excellent
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Engagement Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border border-white/10 bg-slate-800/40 p-5">
                  <div className="flex items-center gap-3">
                    <Mail className="w-6 h-6 text-emerald-400" />
                    <div>
                      <p className="text-3xl font-bold text-white">{lead.emailOpens}</p>
                      <p className="text-sm text-gray-400">Email Opens</p>
                    </div>
                  </div>
                </Card>
                <Card className="border border-white/10 bg-slate-800/40 p-5">
                  <div className="flex items-center gap-3">
                    <Link2 className="w-6 h-6 text-blue-400" />
                    <div>
                      <p className="text-3xl font-bold text-white">{lead.emailClicks}</p>
                      <p className="text-sm text-gray-400">Link Clicks</p>
                    </div>
                  </div>
                </Card>
                <Card className="border border-white/10 bg-slate-800/40 p-5">
                  <div className="flex items-center gap-3">
                    <Phone className="w-6 h-6 text-purple-400" />
                    <div>
                      <p className="text-3xl font-bold text-white">{lead.callCount}</p>
                      <p className="text-sm text-gray-400">Calls Made</p>
                    </div>
                  </div>
                </Card>
                <Card className="border border-white/10 bg-slate-800/40 p-5">
                  <div className="flex items-center gap-3">
                    <Timer className="w-6 h-6 text-orange-400" />
                    <div>
                      <p className="text-3xl font-bold text-white">{lead.daysAsLead}</p>
                      <p className="text-sm text-gray-400">Days as Lead</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Next Best Action */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.01 }}
              >
                <Card className="border border-emerald-500/40 bg-gradient-to-br from-emerald-500/15 via-teal-600/15 to-cyan-500/15 backdrop-blur-xl shadow-lg shadow-emerald-500/20 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-teal-600/5" />
                  <CardHeader className="border-b border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-transparent p-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/40 to-teal-600/40 border border-emerald-400/50 shadow-md"
                        >
                          <Zap className="w-5 h-5 text-emerald-200" />
                        </motion.div>
                        <CardTitle className="text-white font-bold">Next Best Action</CardTitle>
                      </div>
                      <Badge className="bg-gradient-to-r from-emerald-500/30 to-teal-600/30 text-emerald-100 border border-emerald-400/40 px-2 py-1 text-xs font-semibold">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 relative z-10">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent mb-1">
                          {lead.nextBestAction}
                        </h3>
                        <p className="text-sm text-gray-300">
                          Based on AI analysis of engagement patterns
                        </p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          onClick={handleNextBestAction}
                          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold px-5 py-2 shadow-lg"
                        >
                          <Rocket className="w-4 h-4 mr-2" />
                          Take Action
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Notes & Tasks Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Notes Card */}
                <Card className="border border-purple-500/30 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl">
                  <CardHeader className="border-b border-purple-500/20 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-purple-400" />
                        <CardTitle className="text-white font-bold">Notes</CardTitle>
                      </div>
                      <Button size="sm" variant="ghost" className="text-purple-400 hover:text-purple-300" onClick={() => setNewNote('')}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add notes about this lead..."
                      className="min-h-[120px] bg-slate-800/50 border-white/10 text-white"
                    />
                    <div className="flex gap-2 mt-3">
                      <Input
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Quick note..."
                        className="flex-1 bg-slate-800/50 border-white/10 text-white"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && newNote.trim()) {
                            setNotes(notes + '\n' + newNote);
                            setNewNote('');
                          }
                        }}
                      />
                      <Button size="sm" className="bg-purple-500/20 border-purple-500/30 text-purple-400 hover:bg-purple-500/30" onClick={() => {
                        if (newNote.trim()) {
                          setNotes(notes + '\n' + newNote);
                          setNewNote('');
                        }
                      }}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Tasks Card */}
                <Card className="border border-orange-500/30 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl">
                  <CardHeader className="border-b border-orange-500/20 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckSquare className="w-5 h-5 text-orange-400" />
                        <CardTitle className="text-white font-bold">Tasks</CardTitle>
                      </div>
                      <Button size="sm" variant="ghost" className="text-orange-400 hover:text-orange-300">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2">
                    {tasks.length > 0 ? (
                      tasks.map((task) => (
                        <motion.div
                          key={task.id}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center gap-2 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors cursor-pointer"
                          onClick={() => {
                            setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
                          }}
                        >
                          {task.completed ? (
                            <CheckSquare className="w-4 h-4 text-green-400" />
                          ) : (
                            <Square className="w-4 h-4 text-gray-400" />
                          )}
                          <span className={`text-sm flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                            {task.title}
                          </span>
                          <Badge className={`text-xs ${
                            task.priority === 'high' 
                              ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                              : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                          }`}>
                            {task.priority}
                          </Badge>
                          <span className="text-xs text-gray-400">{task.due}</span>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 text-center py-4">No tasks yet</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Documents Section */}
              <Card className="border border-blue-500/30 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl">
                <CardHeader className="border-b border-blue-500/20 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Folder className="w-5 h-5 text-blue-400" />
                      <CardTitle className="text-white font-bold">Documents</CardTitle>
                    </div>
                    <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                      <Upload className="w-4 h-4 mr-1" />
                      Upload
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  {documents.length > 0 ? (
                    documents.map((doc) => (
                      <motion.div
                        key={doc.id}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
                      >
                        <FileTextIcon className="w-5 h-5 text-blue-400" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white truncate">{doc.name}</p>
                          <p className="text-xs text-gray-400">{doc.size} • {doc.uploaded}</p>
                        </div>
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                          <Download className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 text-center py-4">No documents yet</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Nurture Tab */}
            <TabsContent value="nurture" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="border-2 border-emerald-500/30 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl shadow-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader className="border-b-2 border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-transparent p-6 relative z-10">
                    <div className="flex items-center gap-4">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-600/30 border-2 border-emerald-400/40 shadow-lg"
                      >
                        <Heart className="w-6 h-6 text-emerald-300" />
                      </motion.div>
                      <div>
                        <CardTitle className="text-white text-xl font-bold">Personalized Nurture Campaign</CardTitle>
                        <p className="text-sm text-gray-300 mt-1 font-medium">Since they've already engaged, focus on value delivery</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4 relative z-10">
                    <div>
                      <Label className="text-gray-200 mb-3 block font-semibold text-lg">Send Personalized Email</Label>
                      <Textarea
                        placeholder="AI will generate personalized content based on their engagement history..."
                        className="min-h-[200px] bg-slate-800/70 border-2 border-emerald-500/20 text-white rounded-xl p-4 focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        defaultValue={`Hi ${lead.name},\n\nThank you for your interest in our AI automation solutions. Based on your engagement, I thought you might find this valuable...`}
                      />
                      <div className="flex gap-3 mt-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button onClick={handleGenerateNurtureContent} className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-bold px-6 shadow-xl shadow-emerald-500/30">
                            <Sparkles className="w-5 h-5 mr-2" />
                            AI Enhance
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button onClick={handleSendNurtureEmail} variant="outline" className="bg-slate-800/70 border-2 border-emerald-500/30 text-white font-bold px-6 hover:bg-emerald-500/10">
                            <Send className="w-5 h-5 mr-2" />
                            Send Email
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className="border-2 border-blue-500/30 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl shadow-2xl shadow-blue-500/20 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="border-b-2 border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-transparent p-5 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-600/30 border-2 border-blue-400/40 shadow-lg">
                          <Calendar className="w-6 h-6 text-blue-300" />
                        </div>
                        <CardTitle className="text-white text-lg font-bold">Schedule Meeting</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 relative z-10">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={handleSchedule} className="w-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white font-bold py-6 text-lg shadow-xl shadow-blue-500/30">
                          <Calendar className="w-5 h-5 mr-2" />
                          Schedule Demo
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl shadow-2xl shadow-purple-500/20 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader className="border-b-2 border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-transparent p-5 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-600/30 border-2 border-purple-400/40 shadow-lg">
                          <FileCheck className="w-6 h-6 text-purple-300" />
                        </div>
                        <CardTitle className="text-white text-lg font-bold">Send Proposal</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 relative z-10">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button onClick={handleSendProposal} className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-bold py-6 text-lg shadow-xl shadow-purple-500/30">
                          <FileCheck className="w-5 h-5 mr-2" />
                          Create Proposal
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-600/30 border-2 border-emerald-400/40 shadow-lg">
                  <Activity className="w-7 h-7 text-emerald-300" />
                </div>
                <h3 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Engagement Timeline</h3>
              </motion.div>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/50 via-teal-500/50 to-cyan-500/50" />
                {lead.engagementHistory.map((event: any, idx: number) => {
                  const Icon = getEngagementIcon(event.type);
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.15 }}
                      className="relative pl-20 pb-6"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-slate-900 shadow-lg shadow-emerald-500/50 z-10" />
                      
                      <Card className="border-2 border-emerald-500/20 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all group overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardContent className="p-6 relative z-10">
                          <div className="flex items-start gap-5">
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-600/30 border-2 border-emerald-400/40 shadow-lg shrink-0"
                            >
                              <Icon className="w-6 h-6 text-emerald-300" />
                            </motion.div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <p className="font-bold text-white text-lg capitalize">{event.type.replace('_', ' ')}</p>
                                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-3 py-1 font-semibold">
                                  {event.time}
                                </Badge>
                              </div>
                              <p className="text-gray-300 font-medium">{event.content}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Emails Tab */}
            <TabsContent value="emails" className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Email History</h3>
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-600">
                  <SendIcon className="w-4 h-4 mr-2" />
                  Compose
                </Button>
              </div>
              {emailHistory.map((email, idx) => (
                <motion.div
                  key={email.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="border border-white/10 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl hover:border-emerald-500/30 transition-all">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={`text-xs ${
                              email.type === 'inbound' 
                                ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
                                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            }`}>
                              {email.type === 'inbound' ? 'Inbound' : 'Outbound'}
                            </Badge>
                            {email.opened && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                <Eye className="w-3 h-3 mr-1" />
                                Opened
                              </Badge>
                            )}
                            {email.replied && (
                              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                                <Reply className="w-3 h-3 mr-1" />
                                Replied
                              </Badge>
                            )}
                          </div>
                          <h4 className="font-semibold text-white mb-1">{email.subject}</h4>
                          <p className="text-sm text-gray-400">{email.sent}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white" onClick={() => handleViewEmail(email.id)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white" onClick={() => handleReplyEmail(email.id)}>
                            <Reply className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            {/* Calls Tab */}
            <TabsContent value="calls" className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Call History</h3>
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-600" onClick={handleScheduleCall}>
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Call
                </Button>
              </div>
              {callHistory.map((call, idx) => (
                <motion.div
                  key={call.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="border border-white/10 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl hover:border-blue-500/30 transition-all">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={`text-xs ${
                              call.outcome === 'Positive' 
                                ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                                : call.outcome === 'Negative'
                                ? 'bg-red-500/20 text-red-400 border-red-500/30'
                                : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                            }`}>
                              {call.outcome}
                            </Badge>
                            <span className="text-sm text-gray-400">{call.date}</span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-400">{call.duration}</span>
                          </div>
                          <p className="text-sm text-gray-300 mb-2">{call.notes}</p>
                          {call.recording && (
                            <Button size="sm" variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-400" onClick={() => handlePlayRecording(call.id)}>
                              <Play className="w-3 h-3 mr-1" />
                              Play Recording
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            {/* Conversion Tab */}
            <TabsContent value="conversion" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="border-2 border-green-500/40 bg-gradient-to-br from-green-500/20 via-emerald-600/20 to-teal-600/20 backdrop-blur-xl shadow-2xl shadow-green-500/30 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-emerald-600/10" />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-3xl" />
                  <CardHeader className="border-b-2 border-green-500/30 bg-gradient-to-r from-green-500/20 to-transparent p-6 relative z-10">
                    <div className="flex items-center gap-4">
                      <motion.div
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="p-4 rounded-xl bg-gradient-to-br from-green-500/40 to-emerald-600/40 border-2 border-green-400/50 shadow-xl"
                      >
                        <Handshake className="w-7 h-7 text-green-200" />
                      </motion.div>
                      <div>
                        <CardTitle className="text-white text-2xl font-bold">Mark as Won</CardTitle>
                        <p className="text-sm text-green-200/80 mt-1 font-medium">Celebrate this conversion!</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 relative z-10">
                    <p className="text-gray-200 mb-6 text-lg font-medium">This lead has converted to a customer. Move to won deals and track success metrics.</p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button onClick={() => handleConvert('to-won')} className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-bold py-6 text-lg shadow-xl shadow-green-500/40">
                        <Handshake className="w-6 h-6 mr-2" />
                        Mark as Won - ${(lead.estimatedValue / 1000).toFixed(0)}k Deal
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="border-2 border-red-500/40 bg-gradient-to-br from-red-500/20 via-red-600/20 to-rose-600/20 backdrop-blur-xl shadow-2xl shadow-red-500/30 overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-600/10" />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/20 rounded-full blur-3xl" />
                  <CardHeader className="border-b-2 border-red-500/30 bg-gradient-to-r from-red-500/20 to-transparent p-6 relative z-10">
                    <div className="flex items-center gap-4">
                      <motion.div
                        animate={{ rotate: [0, -15, 15, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="p-4 rounded-xl bg-gradient-to-br from-red-500/40 to-red-600/40 border-2 border-red-400/50 shadow-xl"
                      >
                        <XCircle className="w-7 h-7 text-red-200" />
                      </motion.div>
                      <div>
                        <CardTitle className="text-white text-2xl font-bold">Mark as Lost</CardTitle>
                        <p className="text-sm text-red-200/80 mt-1 font-medium">Learn from this experience</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 relative z-10">
                    <p className="text-gray-200 mb-6 text-lg font-medium">This lead is no longer interested. You can revert this later if they re-engage.</p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button onClick={() => handleConvert('to-lost')} className="w-full bg-gradient-to-r from-red-500 via-red-600 to-rose-600 text-white font-bold py-6 text-lg shadow-xl shadow-red-500/40">
                        <XCircle className="w-6 h-6 mr-2" />
                        Mark as Lost
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="border-2 border-gray-500/30 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl shadow-xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-slate-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardHeader className="border-b-2 border-gray-500/20 bg-gradient-to-r from-gray-500/10 to-transparent p-6 relative z-10">
                    <div className="flex items-center gap-4">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="p-4 rounded-xl bg-gradient-to-br from-gray-500/30 to-slate-600/30 border-2 border-gray-400/40 shadow-lg"
                      >
                        <RefreshCw className="w-7 h-7 text-gray-300" />
                      </motion.div>
                      <div>
                        <CardTitle className="text-white text-2xl font-bold">Revert to Prospect</CardTitle>
                        <p className="text-sm text-gray-400 mt-1 font-medium">Move back to prospects pipeline</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 relative z-10">
                    <p className="text-gray-300 mb-6 text-lg font-medium">Move this lead back to prospects if engagement has stopped or they need more nurturing.</p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button onClick={() => handleConvert('to-prospect')} variant="outline" className="w-full bg-slate-800/70 border-2 border-gray-500/40 text-white font-bold py-6 text-lg hover:bg-gray-500/20">
                        <RefreshCw className="w-6 h-6 mr-2" />
                        Revert to Prospect
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* AI Insights Tab */}
            <TabsContent value="insights" className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 mb-6"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-600/30 border-2 border-emerald-400/40 shadow-xl"
                >
                  <Brain className="w-8 h-8 text-emerald-300" />
                </motion.div>
                <div>
                  <h3 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">AI-Powered Recommendations</h3>
                  <p className="text-sm text-gray-400 mt-1">Intelligent insights based on engagement patterns</p>
                </div>
              </motion.div>

              <Card className="border-2 border-emerald-500/30 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl shadow-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-600/5" />
                <CardHeader className="border-b-2 border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-transparent p-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-600/30 border-2 border-emerald-400/40 shadow-lg">
                      <Sparkles className="w-6 h-6 text-emerald-300" />
                    </div>
                    <CardTitle className="text-white text-xl font-bold">Smart Recommendations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 relative z-10">
                  <div className="space-y-5">
                    {[
                      { 
                        title: 'Schedule Personalized Demo', 
                        desc: `Schedule a personalized demo within 24 hours - ${lead.name} has shown strong interest`,
                        priority: 'High',
                        icon: Calendar
                      },
                      { 
                        title: 'Send Industry Case Study', 
                        desc: `Send case study relevant to ${lead.company}'s industry to build credibility`,
                        priority: 'Medium',
                        icon: FileText
                      },
                      { 
                        title: 'Prepare Custom Proposal', 
                        desc: `Prepare custom proposal highlighting ROI of ${(lead.estimatedValue / 1000).toFixed(0)}k+ value`,
                        priority: 'High',
                        icon: FileCheck
                      },
                      { 
                        title: 'Follow-up Engagement', 
                        desc: `Follow up on their last engagement (${lead.engagementHistory[0]?.type.replace('_', ' ')}) within 48 hours`,
                        priority: 'Medium',
                        icon: Mail
                      }
                    ].map((rec, idx) => {
                      const Icon = rec.icon;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.15 }}
                          whileHover={{ x: 5, scale: 1.02 }}
                          className="p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 via-teal-600/10 to-cyan-500/10 border-2 border-emerald-500/30 hover:border-emerald-500/50 transition-all group"
                        >
                          <div className="flex items-start gap-4">
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className="p-3 rounded-lg bg-gradient-to-br from-emerald-500/30 to-teal-600/30 border-2 border-emerald-400/40 shadow-lg shrink-0"
                            >
                              <Icon className="w-6 h-6 text-emerald-300" />
                            </motion.div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <p className="text-white font-bold text-lg">{rec.title}</p>
                                <Badge className={`${
                                  rec.priority === 'High' 
                                    ? 'bg-red-500/20 text-red-300 border-red-500/30' 
                                    : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                                } border-2 px-3 py-1 font-semibold`}>
                                  {rec.priority} Priority
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-300 mb-4">{rec.desc}</p>
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  size="sm"
                                  onClick={() => console.log('Apply recommendation:', rec.title)}
                                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold shadow-lg"
                                >
                                  <Rocket className="w-4 h-4 mr-2" />
                                  Apply Recommendation
                                </Button>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

