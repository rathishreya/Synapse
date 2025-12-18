'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatAssistant from '@/components/chat-assistant';
import {
  ArrowLeft,
  Plus,
  Play,
  Pause,
  BarChart3,
  Mail,
  Users,
  Calendar,
  TrendingUp,
  Copy,
  Archive,
  Trash2,
  Edit,
  Send,
  Clock,
  Target,
  FileText,
  Sparkles,
  Settings,
  Eye,
  CheckCircle2,
  XCircle,
  MousePointerClick,
  AlertCircle,
  Download,
  Filter,
  Zap,
  Workflow,
  Search,
  Inbox,
  Star,
  Layers
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type Campaign = {
  id: number;
  name: string;
  offering: string;
  status: 'Active' | 'Scheduled' | 'Paused' | 'Draft' | 'Completed';
  fromName: string;
  subject: string;
  recipients: number;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  replied: number;
  bounced: number;
  unsubscribed: number;
  createdAt: string;
  scheduledFor: string | null;
  lastActivity: string;
};

export default function OutreachPage() {
  const [viewTab, setViewTab] = useState<'campaigns'/* | 'templates' | 'analytics'*/>('campaigns');
  const [campaignFilter, setCampaignFilter] = useState<'all' | 'active' | 'scheduled' | 'draft' | 'completed'>('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [createStep, setCreateStep] = useState<'basic' | 'content' | 'sequence' | 'audience' | 'schedule'>('basic');

  const [campaignForm, setCampaignForm] = useState({
    name: '',
    fromName: '',
    fromEmail: '',
    replyTo: '',
    subject: '',
    previewText: '',
    offering: '',
    template: '',
    emailBody: '',
    outreachType: 'single', // 'single' or 'multichannel'
    singleChannelType: 'email', // 'email' or 'linkedin'
    audienceType: 'all',
    selectedGroups: [] as string[],
    scheduleType: 'now',
    scheduleDate: '',
    scheduleTime: '',
    followUpEnabled: false,
    followUpCount: '2',
    followUpInterval: '3',
    abTestEnabled: false,
    trackOpens: true,
    trackClicks: true,
    unsubscribeLink: true
  });

  // Stats data
  const stats = [
    { label: 'Total Sent', value: '1,690', icon: Send, color: 'from-blue-500 to-blue-600', change: '+12.5%', trending: 'up' },
    { label: 'AI Generated', value: '1,234', icon: Sparkles, color: 'from-purple-500 to-purple-600', change: '+23%', trending: 'up' },
    { label: 'Manual Sent', value: '456', icon: Mail, color: 'from-cyan-500 to-cyan-600', change: '+8%', trending: 'up' },
    { label: 'Replied', value: '234', icon: Inbox, color: 'from-green-500 to-green-600', change: '+15%', trending: 'up' },
    { label: 'Open Rate', value: '67%', icon: Eye, color: 'from-orange-500 to-orange-600', change: '+5%', trending: 'up' },
    { label: 'Click Rate', value: '34%', icon: MousePointerClick, color: 'from-pink-500 to-pink-600', change: '+3%', trending: 'up' }
  ];

  const campaigns: Campaign[] = [
    { 
      id: 1, 
      name: 'Q1 Enterprise Outreach - AI Solutions', 
      offering: 'Enterprise AI Platform', 
      status: 'Active',
      fromName: 'Sarah from Synapse',
      subject: 'Transform Your Sales with AI',
      recipients: 450,
      sent: 450,
      delivered: 445,
      opened: 223,
      clicked: 89,
      replied: 45,
      bounced: 5,
      unsubscribed: 2,
      createdAt: '2025-01-10',
      scheduledFor: null,
      lastActivity: '2 hours ago'
    },
    { 
      id: 2, 
      name: 'SaaS Product Launch - New Features', 
      offering: 'SaaS Platform', 
      status: 'Scheduled',
      fromName: 'Team Synapse',
      subject: 'Exciting New Features Coming Your Way',
      recipients: 890,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      replied: 0,
      bounced: 0,
      unsubscribed: 0,
      createdAt: '2025-01-15',
      scheduledFor: '2025-01-20 09:00 AM',
      lastActivity: 'Scheduled for Jan 20'
    },
    { 
      id: 3, 
      name: 'Consulting Services - Follow-up Campaign', 
      offering: 'Consulting', 
      status: 'Paused',
      fromName: 'Michael Chen',
      subject: 'Unlock Growth with Strategic Consulting',
      recipients: 234,
      sent: 89,
      delivered: 87,
      opened: 45,
      clicked: 18,
      replied: 12,
      bounced: 2,
      unsubscribed: 1,
      createdAt: '2025-01-08',
      scheduledFor: null,
      lastActivity: 'Paused 3 days ago'
    }
  ];

  const templates = [
    { id: 1, name: 'Cold Outreach - Enterprise', category: 'Cold Outreach', subject: 'Transform Your Sales Process', lastUsed: '2 days ago', performance: '45% open rate' },
    { id: 2, name: 'Follow-up Template 1', category: 'Follow-up', subject: 'Following up on my previous message', lastUsed: '1 day ago', performance: '62% open rate' },
    { id: 3, name: 'Product Launch Announcement', category: 'Announcement', subject: 'Exciting News: New Feature Launch', lastUsed: '5 days ago', performance: '71% open rate' },
    { id: 4, name: 'Re-engagement Campaign', category: 'Re-engagement', subject: 'We Miss You! Special Offer Inside', lastUsed: '1 week ago', performance: '38% open rate' }
  ];

  const offerings = [
    { value: 'enterprise-ai', label: 'Enterprise AI Platform' },
    { value: 'saas', label: 'SaaS Platform' },
    { value: 'consulting', label: 'Consulting Services' },
    { value: 'custom', label: 'Custom Solutions' }
  ];

  const groups = [
    { value: 'group-1', label: 'High Priority Leads (45)', count: 45 },
    { value: 'group-2', label: 'Enterprise Prospects (120)', count: 120 },
    { value: 'group-3', label: 'Recent Sign-ups (78)', count: 78 },
    { value: 'group-4', label: 'Inactive Leads (234)', count: 234 }
  ];

  const filteredCampaigns = campaignFilter === 'all' 
    ? campaigns 
    : campaigns.filter(c => c.status.toLowerCase() === campaignFilter);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Scheduled': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Paused': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Draft': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'Completed': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const handleCreateCampaign = () => {
    console.log('Creating campaign:', { campaignForm });
    setShowCreateDialog(false);
    setCreateStep('basic');
    // Reset forms
    setCampaignForm({
      name: '',
      fromName: '',
      fromEmail: '',
      replyTo: '',
      subject: '',
      previewText: '',
      offering: '',
      template: '',
      emailBody: '',
      outreachType: 'single',
      singleChannelType: 'email',
      audienceType: 'all',
      selectedGroups: [],
      scheduleType: 'now',
      scheduleDate: '',
      scheduleTime: '',
      followUpEnabled: false,
      followUpCount: '2',
      followUpInterval: '3',
      abTestEnabled: false,
      trackOpens: true,
      trackClicks: true,
      unsubscribeLink: true
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ x: -5 }}
                  className="p-2 rounded-lg hover:bg-white/5"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </motion.button>
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Outreach
                  </h1>
                </div>
                <p className="text-sm text-gray-400 mt-1">Multi-channel campaigns, email management, and analytics</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/outreach/builder">
                <Button
                  variant="outline"
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Workflow className="w-4 h-4 mr-2" />
                  Visual Builder
                </Button>
              </Link>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCreateDialog(true);
                  setCreateStep('basic');
                }}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/25"
              >
                <Plus className="w-4 h-4 mr-2" />
                Quick Campaign
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2">
            {['campaigns'/*, 'templates', 'analytics'*/].map((tab) => (
              <Button
                key={tab}
                variant={viewTab === tab ? 'default' : 'outline'}
                className={viewTab === tab 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600' 
                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                }
                onClick={() => setViewTab(tab as any)}
              >
                {tab === 'campaigns' && <Target className="w-4 h-4 mr-2" />}
                {/* {tab === 'templates' && <Layers className="w-4 h-4 mr-2" />} */}
                {/* {tab === 'analytics' && <BarChart3 className="w-4 h-4 mr-2" />} */}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-6 relative">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl hover:border-cyan-500/30 transition-all group">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                      <stat.icon className="w-4 h-4 text-white" />
                    </div>
                    {stat.change && (
                      <span className={`text-xs font-medium ${stat.trending === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                        {stat.change}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Campaigns Tab */}
        {viewTab === 'campaigns' && (
          <>
            {/* Campaign Filters */}
            <div className="flex gap-2 mb-6">
              {['all', 'active', 'scheduled', 'draft', 'completed'].map((filter) => (
                <Button
                  key={filter}
                  variant={campaignFilter === filter ? 'default' : 'outline'}
                  size="sm"
                  className={campaignFilter === filter 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-cyan-500/50 text-cyan-400' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                  }
                  onClick={() => setCampaignFilter(filter as any)}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  <Badge className="ml-2 bg-white/20 text-white border-0 text-xs">
                    {filter === 'all' ? campaigns.length : campaigns.filter(c => c.status.toLowerCase() === filter).length}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Campaign List */}
            <div className="grid grid-cols-1 gap-6">
              {filteredCampaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl overflow-hidden hover:border-cyan-500/30 transition-all group">
                    <CardHeader className="border-b border-white/10 bg-gradient-to-r from-cyan-500/5 to-blue-600/5">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-white">{campaign.name}</CardTitle>
                            <Badge className={`${getStatusColor(campaign.status)} border`}>
                              {campaign.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Target className="w-3.5 h-3.5" />
                              {campaign.offering}
                            </span>
                            <span className="flex items-center gap-1">
                              <Mail className="w-3.5 h-3.5" />
                              From: {campaign.fromName}
                            </span>
                            <span className="flex items-center gap-1">
                              <FileText className="w-3.5 h-3.5" />
                              {campaign.subject}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            {campaign.lastActivity}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Link href="/outreach/builder">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Edit className="w-3.5 h-3.5 mr-1" />
                              Edit
                            </Button>
                          </Link>
                          {campaign.status === 'Active' && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="bg-orange-500/10 border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Pause className="w-3.5 h-3.5 mr-1" />
                              Pause
                            </Button>
                          )}
                          {campaign.status === 'Paused' && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Play className="w-3.5 h-3.5 mr-1" />
                              Resume
                            </Button>
                          )}
                          {campaign.status === 'Draft' && (
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-cyan-500 to-blue-600"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Send className="w-3.5 h-3.5 mr-1" />
                              Launch
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">Recipients</p>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <p className="text-2xl font-bold text-white">{campaign.recipients}</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">Sent</p>
                          <div className="flex items-center gap-2">
                            <Send className="w-4 h-4 text-blue-400" />
                            <p className="text-2xl font-bold text-white">{campaign.sent}</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">Delivered</p>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            <p className="text-2xl font-bold text-white">{campaign.delivered}</p>
                            {campaign.sent > 0 && (
                              <span className="text-xs text-green-400">
                                {((campaign.delivered / campaign.sent) * 100).toFixed(1)}%
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">Bounced</p>
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-400" />
                            <p className="text-2xl font-bold text-white">{campaign.bounced}</p>
                            {campaign.sent > 0 && (
                              <span className="text-xs text-red-400">
                                {((campaign.bounced / campaign.sent) * 100).toFixed(1)}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-white/10">
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">Open Rate</p>
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-purple-400" />
                            <p className="text-2xl font-bold text-white">{campaign.opened}</p>
                            {campaign.delivered > 0 && (
                              <span className="text-xs text-purple-400">
                                {((campaign.opened / campaign.delivered) * 100).toFixed(1)}%
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">Click Rate</p>
                          <div className="flex items-center gap-2">
                            <MousePointerClick className="w-4 h-4 text-cyan-400" />
                            <p className="text-2xl font-bold text-white">{campaign.clicked}</p>
                            {campaign.opened > 0 && (
                              <span className="text-xs text-cyan-400">
                                {((campaign.clicked / campaign.opened) * 100).toFixed(1)}%
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">Replies</p>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-green-400" />
                            <p className="text-2xl font-bold text-white">{campaign.replied}</p>
                            {campaign.delivered > 0 && (
                              <span className="text-xs text-green-400">
                                {((campaign.replied / campaign.delivered) * 100).toFixed(1)}%
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">Unsubscribed</p>
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-orange-400" />
                            <p className="text-2xl font-bold text-white">{campaign.unsubscribed}</p>
                            {campaign.delivered > 0 && (
                              <span className="text-xs text-orange-400">
                                {((campaign.unsubscribed / campaign.delivered) * 100).toFixed(1)}%
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-4 border-t border-white/10 mt-4">
                        {/* <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                          <Copy className="w-3.5 h-3.5 mr-1" />
                          Duplicate
                        </Button>
                        <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                          <Download className="w-3.5 h-3.5 mr-1" />
                          Export
                        </Button>
                        <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                          <Archive className="w-3.5 h-3.5 mr-1" />
                          Archive
                        </Button> */}
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {filteredCampaigns.length === 0 && (
                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                  <CardContent className="p-12 text-center">
                    <Target className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                    <h3 className="text-xl font-semibold text-white mb-2">No campaigns found</h3>
                    <p className="text-gray-400 mb-6">
                      {campaignFilter === 'all' 
                        ? 'Create your first outreach campaign to start engaging prospects'
                        : `No ${campaignFilter} campaigns at the moment`
                      }
                    </p>
                    <Button 
                      onClick={() => setShowCreateDialog(true)}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Campaign
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        )}

        {/* Templates Tab */}
        {false && viewTab === 'campaigns' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl hover:border-cyan-500/30 transition-all group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-white mb-1">{template.name}</CardTitle>
                        <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">
                          {template.category}
                        </Badge>
                      </div>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Subject Line</p>
                        <p className="text-sm text-white">{template.subject}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Last used: {template.lastUsed}</span>
                        <span className="text-green-400">{template.performance}</span>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10">
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600">
                          <Send className="w-3.5 h-3.5 mr-1" />
                          Use Template
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Analytics Tab */}
        {false && viewTab === 'campaigns' && (
          <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
            <CardContent className="p-12 text-center">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics</h3>
              <p className="text-gray-400 mb-4">
                Deep dive into your outreach performance with detailed analytics and insights
              </p>
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="p-4 rounded-lg bg-slate-800/50 border border-white/10">
                  <p className="text-sm text-gray-400 mb-1">Average Open Rate</p>
                  <p className="text-2xl font-bold text-white">67.3%</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/50 border border-white/10">
                  <p className="text-sm text-gray-400 mb-1">Average Click Rate</p>
                  <p className="text-2xl font-bold text-white">34.1%</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/50 border border-white/10">
                  <p className="text-sm text-gray-400 mb-1">Average Reply Rate</p>
                  <p className="text-2xl font-bold text-white">14.8%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create Campaign Dialog - Quick Form */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-white text-2xl flex items-center gap-3">
                  <Zap className="w-6 h-6 text-cyan-400" />
                  Quick Campaign Setup
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  Create a simple campaign or use the visual builder for advanced sequences
                </DialogDescription>
              </div>
              <Link href="/outreach/builder">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/5 border-white/10 text-white hover:bg-cyan-500/20 hover:border-cyan-500/50"
                >
                  <Workflow className="w-4 h-4 mr-2" />
                  Visual Builder
                </Button>
              </Link>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto mt-6">
            {(
              /* Step-by-Step Form Mode */
              <Tabs value={createStep} onValueChange={(val) => setCreateStep(val as any)} className="space-y-4">
                <TabsList className="grid grid-cols-5 bg-slate-800/50 p-1">
                  <TabsTrigger value="basic" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
                    1. Basic Info
                  </TabsTrigger>
                  <TabsTrigger value="content" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
                    2. Content
                  </TabsTrigger>
                  <TabsTrigger value="sequence" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
                    3. Sequence
                  </TabsTrigger>
                  <TabsTrigger value="audience" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
                    4. Audience
                  </TabsTrigger>
                  <TabsTrigger value="schedule" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
                    5. Schedule
                  </TabsTrigger>
                </TabsList>

                {/* Step 1: Basic Info */}
                <TabsContent value="basic" className="space-y-4">
                  <div>
                    <Label className="text-gray-300 mb-2 block">Campaign Name *</Label>
                    <Input
                      value={campaignForm.name}
                      onChange={(e) => setCampaignForm({...campaignForm, name: e.target.value})}
                      placeholder="e.g., Q1 Enterprise Outreach"
                      className="bg-slate-800/50 border-white/10 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300 mb-2 block">From Name *</Label>
                      <Input
                        value={campaignForm.fromName}
                        onChange={(e) => setCampaignForm({...campaignForm, fromName: e.target.value})}
                        placeholder="e.g., Sarah from Synapse"
                        className="bg-slate-800/50 border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300 mb-2 block">From Email *</Label>
                      <Input
                        type="email"
                        value={campaignForm.fromEmail}
                        onChange={(e) => setCampaignForm({...campaignForm, fromEmail: e.target.value})}
                        placeholder="sarah@synapse.com"
                        className="bg-slate-800/50 border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-300 mb-2 block">Reply-To Email</Label>
                    <Input
                      type="email"
                      value={campaignForm.replyTo}
                      onChange={(e) => setCampaignForm({...campaignForm, replyTo: e.target.value})}
                      placeholder="replies@synapse.com (optional)"
                      className="bg-slate-800/50 border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300 mb-2 block">Offering/Product *</Label>
                    <Select value={campaignForm.offering} onValueChange={(val) => setCampaignForm({...campaignForm, offering: val})}>
                      <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                        <SelectValue placeholder="Select offering" />
                      </SelectTrigger>
                      <SelectContent>
                        {offerings.map(off => (
                          <SelectItem key={off.value} value={off.value}>{off.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Outreach Type Selection */}
                  <div className="space-y-4 p-4 bg-slate-800/30 rounded-lg border border-white/10">
                    <Label className="text-gray-300 block font-semibold">Outreach Type *</Label>
                    
                    <div className="space-y-3">
                      <div 
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          campaignForm.outreachType === 'single' 
                            ? 'border-cyan-500 bg-cyan-500/10' 
                            : 'border-white/10 bg-slate-800/50 hover:border-white/20'
                        }`}
                        onClick={() => setCampaignForm({...campaignForm, outreachType: 'single'})}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            checked={campaignForm.outreachType === 'single'}
                            onChange={() => setCampaignForm({...campaignForm, outreachType: 'single'})}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="text-white font-semibold mb-1">Single Channel</div>
                            <p className="text-sm text-gray-400">Focus on one channel (Email or LinkedIn)</p>
                            
                            {campaignForm.outreachType === 'single' && (
                              <div className="mt-3 ml-6 space-y-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="singleChannel"
                                    checked={campaignForm.singleChannelType === 'email'}
                                    onChange={() => setCampaignForm({...campaignForm, singleChannelType: 'email'})}
                                    className="text-cyan-500"
                                  />
                                  <span className="text-white">Email Only</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name="singleChannel"
                                    checked={campaignForm.singleChannelType === 'linkedin'}
                                    onChange={() => setCampaignForm({...campaignForm, singleChannelType: 'linkedin'})}
                                    className="text-cyan-500"
                                  />
                                  <span className="text-white">LinkedIn Only</span>
                                </label>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div 
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          campaignForm.outreachType === 'multichannel' 
                            ? 'border-cyan-500 bg-cyan-500/10' 
                            : 'border-white/10 bg-slate-800/50 hover:border-white/20'
                        }`}
                        onClick={() => setCampaignForm({...campaignForm, outreachType: 'multichannel'})}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            checked={campaignForm.outreachType === 'multichannel'}
                            onChange={() => setCampaignForm({...campaignForm, outreachType: 'multichannel'})}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="text-white font-semibold mb-1">Multichannel</div>
                            <p className="text-sm text-gray-400">Combine Email + LinkedIn for maximum reach</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button 
                      onClick={() => setCreateStep('content')}
                      disabled={!campaignForm.name || !campaignForm.fromName || !campaignForm.fromEmail || !campaignForm.offering}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600"
                    >
                      Next: Email Content
                    </Button>
                  </div>
                </TabsContent>

                {/* Step 2: Email Content */}
                <TabsContent value="content" className="space-y-4">
                  <div>
                    <Label className="text-gray-300 mb-2 block">Use Template (Optional)</Label>
                    <Select value={campaignForm.template} onValueChange={(val) => setCampaignForm({...campaignForm, template: val})}>
                      <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                        <SelectValue placeholder="Select a template or create custom" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map(tmpl => (
                          <SelectItem key={tmpl.id.toString()} value={tmpl.id.toString()}>{tmpl.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-gray-300 mb-2 block">Subject Line *</Label>
                    <Input
                      value={campaignForm.subject}
                      onChange={(e) => setCampaignForm({...campaignForm, subject: e.target.value})}
                      placeholder="e.g., Transform Your Sales with AI"
                      className="bg-slate-800/50 border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300 mb-2 block">Preview Text</Label>
                    <Input
                      value={campaignForm.previewText}
                      onChange={(e) => setCampaignForm({...campaignForm, previewText: e.target.value})}
                      placeholder="Text shown in email preview (optional)"
                      className="bg-slate-800/50 border-white/10 text-white"
                    />
                  </div>
            
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-gray-300">Email Body *</Label>
                      <Button size="sm" variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-400">
                        <Sparkles className="w-3.5 h-3.5 mr-1" />
                        Generate with AI
                      </Button>
                    </div>
                    <Textarea
                      value={campaignForm.emailBody}
                      onChange={(e) => setCampaignForm({...campaignForm, emailBody: e.target.value})}
                      placeholder="Write your email content here..."
                      className="bg-slate-800/50 border-white/10 text-white min-h-[200px]"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      You can use variables: {'{{name}}, {{company}}, {{position}}'}
                    </p>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setCreateStep('basic')} className="bg-white/5 border-white/10 text-white">
                      Back
                    </Button>
                    <Button 
                      onClick={() => setCreateStep('sequence')}
                      disabled={!campaignForm.subject || !campaignForm.emailBody}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600"
                    >
                      Next: Sequence
                    </Button>
                  </div>
                </TabsContent>

                {/* Step 3: Sequence - Quick Access to Visual Builder */}
                <TabsContent value="sequence" className="space-y-4">
                  <Card className="border-white/10 bg-slate-800/50">
                    <CardContent className="p-8 text-center">
                      <Workflow className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
                      <h3 className="text-xl font-semibold text-white mb-2">Build Your Sequence</h3>
                      <p className="text-gray-400 mb-6">
                        Create a multi-step outreach sequence with emails, delays, calls, LinkedIn messages, and more
                      </p>
                      <Link href="/outreach/builder">
                        <Button 
                          className="bg-gradient-to-r from-cyan-500 to-blue-600"
                        >
                          <Workflow className="w-4 h-4 mr-2" />
                          Open Visual Builder
                        </Button>
                      </Link>
                      <div className="mt-6 text-sm text-gray-500">
                        Or skip this step to send a single email
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setCreateStep('content')} className="bg-white/5 border-white/10 text-white">
                      Back
                    </Button>
                    <Button 
                      onClick={() => setCreateStep('audience')}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600"
                    >
                      Skip: Select Audience
                    </Button>
                  </div>
                </TabsContent>

                {/* Step 4: Audience */}
                <TabsContent value="audience" className="space-y-4">
                  <div>
                    <Label className="text-gray-300 mb-3 block">Who should receive this campaign? *</Label>
                    <div className="space-y-3">
                      {[
                        { type: 'all', icon: Users, label: 'All Prospects', desc: 'Send to all prospects in your database', count: '1,234 prospects' },
                        { type: 'groups', icon: Target, label: 'Select Groups', desc: 'Choose specific groups or segments', count: null },
                        { type: 'custom', icon: Filter, label: 'Custom Filter', desc: 'Use advanced filters to target specific prospects', count: null }
                      ].map((option) => (
                        <motion.button
                          key={option.type}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => setCampaignForm({...campaignForm, audienceType: option.type})}
                          className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                            campaignForm.audienceType === option.type
                              ? 'border-cyan-500 bg-cyan-500/10'
                              : 'border-white/10 bg-slate-800/30'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <option.icon className={`w-5 h-5 ${campaignForm.audienceType === option.type ? 'text-cyan-400' : 'text-gray-400'}`} />
                            <div className="flex-1">
                              <p className="font-medium text-white">{option.label}</p>
                              <p className="text-sm text-gray-400">{option.desc}</p>
                            </div>
                            {option.count && <Badge className="bg-slate-700 text-white">{option.count}</Badge>}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {campaignForm.audienceType === 'groups' && (
                    <div>
                      <Label className="text-gray-300 mb-2 block">Select Groups</Label>
                      <div className="space-y-2">
                        {groups.map((group) => (
                          <div 
                            key={group.value}
                            className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={campaignForm.selectedGroups.includes(group.value)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setCampaignForm({
                                    ...campaignForm,
                                    selectedGroups: [...campaignForm.selectedGroups, group.value]
                                  });
                                } else {
                                  setCampaignForm({
                                    ...campaignForm,
                                    selectedGroups: campaignForm.selectedGroups.filter(g => g !== group.value)
                                  });
                                }
                              }}
                              className="w-4 h-4"
                            />
                            <p className="text-white flex-1">{group.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setCreateStep('sequence')} className="bg-white/5 border-white/10 text-white">
                      Back
                    </Button>
                    <Button 
                      onClick={() => setCreateStep('schedule')}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600"
                    >
                      Next: Schedule Campaign
                    </Button>
                  </div>
                </TabsContent>

                {/* Step 5: Schedule & Settings */}
                <TabsContent value="schedule" className="space-y-4">
                  <div>
                    <Label className="text-gray-300 mb-3 block">When should this campaign start? *</Label>
                    <div className="space-y-3">
                      {[
                        { type: 'now', icon: Send, label: 'Send Immediately', desc: 'Campaign starts right after creation' },
                        { type: 'scheduled', icon: Clock, label: 'Schedule for Later', desc: 'Choose a specific date and time' },
                        { type: 'drip', icon: TrendingUp, label: 'Drip Campaign', desc: 'Send in batches over time' }
                      ].map((option) => (
                        <motion.button
                          key={option.type}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => setCampaignForm({...campaignForm, scheduleType: option.type})}
                          className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                            campaignForm.scheduleType === option.type
                              ? 'border-cyan-500 bg-cyan-500/10'
                              : 'border-white/10 bg-slate-800/30'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <option.icon className={`w-5 h-5 ${campaignForm.scheduleType === option.type ? 'text-cyan-400' : 'text-gray-400'}`} />
                            <div>
                              <p className="font-medium text-white">{option.label}</p>
                              <p className="text-sm text-gray-400">{option.desc}</p>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {campaignForm.scheduleType === 'scheduled' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-300 mb-2 block">Date</Label>
                        <Input
                          type="date"
                          value={campaignForm.scheduleDate}
                          onChange={(e) => setCampaignForm({...campaignForm, scheduleDate: e.target.value})}
                          className="bg-slate-800/50 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-300 mb-2 block">Time</Label>
                        <Input
                          type="time"
                          value={campaignForm.scheduleTime}
                          onChange={(e) => setCampaignForm({...campaignForm, scheduleTime: e.target.value})}
                          className="bg-slate-800/50 border-white/10 text-white"
                        />
                      </div>
                    </div>
                  )}

                  <div className="border-t border-white/10 pt-4 space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Enable Follow-up Sequence</p>
                        <p className="text-xs text-gray-400">Automatically send follow-up emails to non-responders</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={campaignForm.followUpEnabled}
                        onChange={(e) => setCampaignForm({...campaignForm, followUpEnabled: e.target.checked})}
                        className="w-4 h-4"
                      />
                    </div>

                    {campaignForm.followUpEnabled && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-300 mb-2 block">Number of Follow-ups</Label>
                          <Select value={campaignForm.followUpCount} onValueChange={(val) => setCampaignForm({...campaignForm, followUpCount: val})}>
                            <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 Follow-up</SelectItem>
                              <SelectItem value="2">2 Follow-ups</SelectItem>
                              <SelectItem value="3">3 Follow-ups</SelectItem>
                              <SelectItem value="4">4 Follow-ups</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-gray-300 mb-2 block">Days Between Follow-ups</Label>
                          <Select value={campaignForm.followUpInterval} onValueChange={(val) => setCampaignForm({...campaignForm, followUpInterval: val})}>
                            <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 Day</SelectItem>
                              <SelectItem value="2">2 Days</SelectItem>
                              <SelectItem value="3">3 Days</SelectItem>
                              <SelectItem value="5">5 Days</SelectItem>
                              <SelectItem value="7">7 Days</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Track Email Opens</p>
                        <p className="text-xs text-gray-400">Monitor when recipients open your emails</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={campaignForm.trackOpens}
                        onChange={(e) => setCampaignForm({...campaignForm, trackOpens: e.target.checked})}
                        className="w-4 h-4"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Track Link Clicks</p>
                        <p className="text-xs text-gray-400">Monitor which links recipients click</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={campaignForm.trackClicks}
                        onChange={(e) => setCampaignForm({...campaignForm, trackClicks: e.target.checked})}
                        className="w-4 h-4"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setCreateStep('audience')} className="bg-white/5 border-white/10 text-white">
                      Back
                    </Button>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => {
                          console.log('Saving as draft');
                          setShowCreateDialog(false);
                        }}
                        variant="outline"
                        className="bg-white/5 border-white/10 text-white"
                      >
                        Save as Draft
                      </Button>
                      <Button 
                        onClick={handleCreateCampaign}
                        className="bg-gradient-to-r from-green-500 to-emerald-600"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {campaignForm.scheduleType === 'now' ? 'Launch Campaign' : 'Schedule Campaign'}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Chat Assistant */}
      <ChatAssistant />
    </div>
  );
}
