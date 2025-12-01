'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  Filter
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CampaignsPage() {
  const [viewTab, setViewTab] = useState<'all' | 'active' | 'scheduled' | 'draft' | 'completed'>('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [createStep, setCreateStep] = useState<'basic' | 'content' | 'audience' | 'schedule'>('basic');
  
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
    audienceType: 'all', // all, groups, custom
    selectedGroups: [] as string[],
    scheduleType: 'now', // now, scheduled, drip
    scheduleDate: '',
    scheduleTime: '',
    followUpEnabled: false,
    followUpCount: '2',
    followUpInterval: '3', // days
    abTestEnabled: false,
    trackOpens: true,
    trackClicks: true,
    unsubscribeLink: true
  });

  const campaigns = [
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
    },
    { 
      id: 4, 
      name: 'Re-engagement Campaign - Inactive Leads', 
      offering: 'Multi-Offering', 
      status: 'Draft',
      fromName: 'Synapse Team',
      subject: 'We Miss You! Special Offer Inside',
      recipients: 0,
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      replied: 0,
      bounced: 0,
      unsubscribed: 0,
      createdAt: '2025-01-16',
      scheduledFor: null,
      lastActivity: 'Draft saved today'
    },
    { 
      id: 5, 
      name: 'End of Year Success Stories', 
      offering: 'Enterprise AI Platform', 
      status: 'Completed',
      fromName: 'Sarah from Synapse',
      subject: 'See How Companies Transformed Their Sales',
      recipients: 1200,
      sent: 1200,
      delivered: 1185,
      opened: 756,
      clicked: 234,
      replied: 89,
      bounced: 15,
      unsubscribed: 8,
      createdAt: '2024-12-20',
      scheduledFor: null,
      lastActivity: 'Completed Dec 28'
    }
  ];

  const offerings = [
    { value: 'enterprise-ai', label: 'Enterprise AI Platform' },
    { value: 'saas', label: 'SaaS Platform' },
    { value: 'consulting', label: 'Consulting Services' },
    { value: 'custom', label: 'Custom Solutions' }
  ];

  const templates = [
    { value: 'outreach-1', label: 'Cold Outreach Template 1', offering: 'enterprise-ai' },
    { value: 'outreach-2', label: 'Cold Outreach Template 2', offering: 'saas' },
    { value: 'followup-1', label: 'Follow-up Template', offering: 'enterprise-ai' },
    { value: 'custom', label: 'Create Custom' }
  ];

  const groups = [
    { value: 'group-1', label: 'High Priority Leads (45)', count: 45 },
    { value: 'group-2', label: 'Enterprise Prospects (120)', count: 120 },
    { value: 'group-3', label: 'Recent Sign-ups (78)', count: 78 },
    { value: 'group-4', label: 'Inactive Leads (234)', count: 234 }
  ];

  const filteredCampaigns = viewTab === 'all' 
    ? campaigns 
    : campaigns.filter(c => c.status.toLowerCase() === viewTab);

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
    console.log('Creating campaign:', campaignForm);
    // Reset form and close
    setShowCreateDialog(false);
    setCreateStep('basic');
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
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
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
              <div>
                <h1 className="text-2xl font-bold text-white">Email Campaigns</h1>
                <p className="text-sm text-gray-400">Create and manage automated email sequences</p>
              </div>
            </div>
            <Button
              onClick={() => setShowCreateDialog(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>
          {/* Tabs */}
          <div className="mt-4 flex gap-2">
            {['all', 'active', 'scheduled', 'draft', 'completed'].map((tab) => (
              <Button
                key={tab}
                variant={viewTab === tab ? 'default' : 'outline'}
                className={viewTab === tab 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600' 
                  : 'bg-white/5 border-white/10 text-white'
                }
                onClick={() => setViewTab(tab as any)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                <Badge className="ml-2 bg-white/20">
                  {tab === 'all' ? campaigns.length : campaigns.filter(c => c.status.toLowerCase() === tab).length}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </motion.div>
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 gap-6">
          {filteredCampaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl overflow-hidden hover:border-cyan-500/30 transition-all">
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
                        Last activity: {campaign.lastActivity}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white">
                        <Edit className="w-3.5 h-3.5 mr-1" />
                        Edit
                      </Button>
                      {campaign.status === 'Active' ? (
                        <Button size="sm" variant="outline" className="bg-orange-500/10 border-orange-500/30 text-orange-400">
                          <Pause className="w-3.5 h-3.5 mr-1" />
                          Pause
                        </Button>
                      ) : campaign.status === 'Paused' ? (
                        <Button size="sm" variant="outline" className="bg-green-500/10 border-green-500/30 text-green-400">
                          <Play className="w-3.5 h-3.5 mr-1" />
                          Resume
                        </Button>
                      ) : campaign.status === 'Scheduled' ? (
                        <Button size="sm" variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-400">
                          <Clock className="w-3.5 h-3.5 mr-1" />
                          {campaign.scheduledFor}
                        </Button>
                      ) : campaign.status === 'Draft' ? (
                        <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-600">
                          <Send className="w-3.5 h-3.5 mr-1" />
                          Launch
                        </Button>
                      ) : null}
                      <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white">
                        <BarChart3 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
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

                  <div className="flex gap-2 mt-6 pt-4 border-t border-white/10">
                    <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white">
                      <Copy className="w-3.5 h-3.5 mr-1" />
                      Duplicate
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white">
                      <Download className="w-3.5 h-3.5 mr-1" />
                      Export
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white">
                      <Archive className="w-3.5 h-3.5 mr-1" />
                      Archive
                    </Button>
                    <Button size="sm" variant="outline" className="bg-red-500/10 border-red-500/30 text-red-400">
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
                <Mail className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <h3 className="text-xl font-semibold text-white mb-2">No campaigns found</h3>
                <p className="text-gray-400 mb-6">
                  {viewTab === 'all' 
                    ? 'Create your first campaign to start reaching prospects'
                    : `No ${viewTab} campaigns at the moment`
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
      </div>

      {/* Create Campaign Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">Create New Campaign</DialogTitle>
            <DialogDescription className="text-gray-400">
              Set up your email campaign with automated follow-ups
            </DialogDescription>
          </DialogHeader>

          <Tabs value={createStep} onValueChange={(val) => setCreateStep(val as any)} className="mt-4">
            <TabsList className="grid grid-cols-4 bg-slate-800/50 p-1">
              <TabsTrigger value="basic" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
                1. Basic Info
              </TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
                2. Email Content
              </TabsTrigger>
              <TabsTrigger value="audience" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
                3. Audience
              </TabsTrigger>
              <TabsTrigger value="schedule" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
                4. Schedule & Settings
              </TabsTrigger>
            </TabsList>

            {/* Step 1: Basic Info */}
            <TabsContent value="basic" className="space-y-4 mt-6">
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
                <p className="text-xs text-gray-500 mt-1">If different from sender email</p>
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
            <TabsContent value="content" className="space-y-4 mt-6">
              <div>
                <Label className="text-gray-300 mb-2 block">Use Template (Optional)</Label>
                <Select value={campaignForm.template} onValueChange={(val) => setCampaignForm({...campaignForm, template: val})}>
                  <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                    <SelectValue placeholder="Select a template or create custom" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map(tmpl => (
                      <SelectItem key={tmpl.value} value={tmpl.value}>{tmpl.label}</SelectItem>
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
                <p className="text-xs text-gray-500 mt-1">This appears in the inbox preview</p>
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

              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                <p className="text-sm font-medium text-cyan-400 mb-1 flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Your Email
                </p>
                <p className="text-xs text-gray-400">
                  Send a test email to yourself before launching the campaign
                </p>
                <Button size="sm" variant="outline" className="mt-2 bg-white/5 border-white/10 text-white">
                  <Send className="w-3.5 h-3.5 mr-1" />
                  Send Test Email
                </Button>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setCreateStep('basic')} className="bg-white/5 border-white/10 text-white">
                  Back
                </Button>
                <Button 
                  onClick={() => setCreateStep('audience')}
                  disabled={!campaignForm.subject || !campaignForm.emailBody}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600"
                >
                  Next: Select Audience
                </Button>
              </div>
            </TabsContent>

            {/* Step 3: Audience */}
            <TabsContent value="audience" className="space-y-4 mt-6">
              <div>
                <Label className="text-gray-300 mb-3 block">Who should receive this campaign? *</Label>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setCampaignForm({...campaignForm, audienceType: 'all'})}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      campaignForm.audienceType === 'all'
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-white/10 bg-slate-800/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Users className={`w-5 h-5 ${campaignForm.audienceType === 'all' ? 'text-cyan-400' : 'text-gray-400'}`} />
                      <div className="flex-1">
                        <p className="font-medium text-white">All Prospects</p>
                        <p className="text-sm text-gray-400">Send to all prospects in your database</p>
                      </div>
                      <Badge className="bg-slate-700 text-white">1,234 prospects</Badge>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setCampaignForm({...campaignForm, audienceType: 'groups'})}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      campaignForm.audienceType === 'groups'
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-white/10 bg-slate-800/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Target className={`w-5 h-5 ${campaignForm.audienceType === 'groups' ? 'text-cyan-400' : 'text-gray-400'}`} />
                      <div className="flex-1">
                        <p className="font-medium text-white">Select Groups</p>
                        <p className="text-sm text-gray-400">Choose specific groups or segments</p>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setCampaignForm({...campaignForm, audienceType: 'custom'})}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      campaignForm.audienceType === 'custom'
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-white/10 bg-slate-800/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Filter className={`w-5 h-5 ${campaignForm.audienceType === 'custom' ? 'text-cyan-400' : 'text-gray-400'}`} />
                      <div className="flex-1">
                        <p className="font-medium text-white">Custom Filter</p>
                        <p className="text-sm text-gray-400">Use advanced filters to target specific prospects</p>
                      </div>
                    </div>
                  </motion.button>
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
                        <Badge className="bg-slate-700 text-white text-xs">{group.count} prospects</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {campaignForm.audienceType === 'custom' && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-400 mb-1">Custom Filters</p>
                  <p className="text-xs text-gray-400 mb-3">
                    Set up custom filters based on prospect properties, tags, behavior, etc.
                  </p>
                  <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white">
                    <Settings className="w-3.5 h-3.5 mr-1" />
                    Configure Filters
                  </Button>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setCreateStep('content')} className="bg-white/5 border-white/10 text-white">
                  Back
                </Button>
                <Button 
                  onClick={() => setCreateStep('schedule')}
                  disabled={campaignForm.audienceType === 'groups' && campaignForm.selectedGroups.length === 0}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600"
                >
                  Next: Schedule Campaign
                </Button>
              </div>
            </TabsContent>

            {/* Step 4: Schedule & Settings */}
            <TabsContent value="schedule" className="space-y-4 mt-6">
              <div>
                <Label className="text-gray-300 mb-3 block">When should this campaign start? *</Label>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setCampaignForm({...campaignForm, scheduleType: 'now'})}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      campaignForm.scheduleType === 'now'
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-white/10 bg-slate-800/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Send className={`w-5 h-5 ${campaignForm.scheduleType === 'now' ? 'text-cyan-400' : 'text-gray-400'}`} />
                      <div>
                        <p className="font-medium text-white">Send Immediately</p>
                        <p className="text-sm text-gray-400">Campaign starts right after creation</p>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setCampaignForm({...campaignForm, scheduleType: 'scheduled'})}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      campaignForm.scheduleType === 'scheduled'
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-white/10 bg-slate-800/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className={`w-5 h-5 ${campaignForm.scheduleType === 'scheduled' ? 'text-cyan-400' : 'text-gray-400'}`} />
                      <div>
                        <p className="font-medium text-white">Schedule for Later</p>
                        <p className="text-sm text-gray-400">Choose a specific date and time</p>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setCampaignForm({...campaignForm, scheduleType: 'drip'})}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      campaignForm.scheduleType === 'drip'
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-white/10 bg-slate-800/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <TrendingUp className={`w-5 h-5 ${campaignForm.scheduleType === 'drip' ? 'text-cyan-400' : 'text-gray-400'}`} />
                      <div>
                        <p className="font-medium text-white">Drip Campaign</p>
                        <p className="text-sm text-gray-400">Send in batches over time</p>
                      </div>
                    </div>
                  </motion.button>
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

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Include Unsubscribe Link</p>
                    <p className="text-xs text-gray-400">Required for compliance (CAN-SPAM, GDPR)</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={campaignForm.unsubscribeLink}
                    onChange={(e) => setCampaignForm({...campaignForm, unsubscribeLink: e.target.checked})}
                    className="w-4 h-4"
                    disabled
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
                      console.log('Saving as draft:', campaignForm);
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
        </DialogContent>
      </Dialog>

      {/* AI Chat Assistant */}
      <ChatAssistant />
    </div>
  );
}
