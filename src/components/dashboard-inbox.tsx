'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Mail,
  Linkedin,
  Search,
  Star,
  Archive,
  Trash2,
  Send,
  Clock,
  Inbox,
  Eye,
  MousePointerClick,
  TrendingUp,
  Users,
  MessageSquare,
  BarChart3,
  Sparkles,
  FileText,
  Plus
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function DashboardInbox() {
  const [activeInbox, setActiveInbox] = useState<'linkedin' | 'gmail'>('gmail');
  const [selectedTab, setSelectedTab] = useState('inbox');

  // Gmail data
  const gmailMessages = [
    { id: 1, from: 'john@acme.com', subject: 'Re: Enterprise Solutions Inquiry', preview: 'Thanks for reaching out, I would love to discuss...', time: '10:30 AM', unread: true, offering: 'Enterprise', replied: true },
    { id: 2, from: 'emily@techstart.com', subject: 'Demo Request', preview: 'I would like to schedule a demo for next week...', time: 'Yesterday', unread: true, offering: 'SaaS', replied: false },
    { id: 3, from: 'robert@global.com', subject: 'Re: Pricing Information', preview: 'Could you send me detailed pricing for...', time: '2 days ago', unread: false, offering: 'Enterprise', replied: true },
    { id: 4, from: 'lisa@startup.io', subject: 'Follow-up Question', preview: 'I have a few questions about the integration...', time: '3 days ago', unread: false, offering: 'SaaS', replied: false }
  ];

  // LinkedIn data
  const linkedinMessages = [
    { id: 1, from: 'Michael Chen', role: 'VP of Sales at Tech Corp', preview: 'Hi! I saw your message about AI solutions...', time: '2h ago', unread: true, connectionLevel: '1st' },
    { id: 2, from: 'Sarah Johnson', role: 'Director at StartupX', preview: 'Thanks for connecting! Would love to chat...', time: '5h ago', unread: true, connectionLevel: '2nd' },
    { id: 3, from: 'David Park', role: 'CEO at Innovation Labs', preview: 'Interesting proposition. Let\'s schedule a call...', time: '1 day ago', unread: false, connectionLevel: '1st' },
    { id: 4, from: 'Emma Williams', role: 'Marketing Lead at BigCo', preview: 'I forwarded your message to our team...', time: '2 days ago', unread: false, connectionLevel: '2nd' }
  ];

  // Gmail analytics
  const gmailStats = [
    { label: 'Total Emails', value: '1,234', icon: Mail, color: 'from-blue-500 to-blue-600', change: '+12%' },
    { label: 'Replies', value: '234', icon: MessageSquare, color: 'from-green-500 to-green-600', change: '+18%' },
    { label: 'Open Rate', value: '67%', icon: Eye, color: 'from-purple-500 to-purple-600', change: '+5%' },
    { label: 'Click Rate', value: '34%', icon: MousePointerClick, color: 'from-orange-500 to-orange-600', change: '+3%' }
  ];

  // LinkedIn analytics
  const linkedinStats = [
    { label: 'Messages Sent', value: '456', icon: Linkedin, color: 'from-cyan-500 to-blue-600', change: '+22%' },
    { label: 'Connections', value: '892', icon: Users, color: 'from-emerald-500 to-teal-600', change: '+15%' },
    { label: 'Response Rate', value: '45%', icon: TrendingUp, color: 'from-pink-500 to-rose-600', change: '+8%' },
    { label: 'Profile Views', value: '2.3K', icon: Eye, color: 'from-violet-500 to-purple-600', change: '+25%' }
  ];

  // Templates
  const templates = [
    { id: 1, name: 'Cold Outreach - Enterprise', category: 'Email', platform: 'Gmail', subject: 'Transform Your Sales Process', lastUsed: '2 days ago', performance: '45% open rate', color: 'from-blue-500 to-blue-600' },
    { id: 2, name: 'LinkedIn Connection Request', category: 'Connection', platform: 'LinkedIn', subject: 'Let\'s Connect!', lastUsed: '1 day ago', performance: '62% acceptance', color: 'from-cyan-500 to-blue-600' },
    { id: 3, name: 'Follow-up Email', category: 'Follow-up', platform: 'Gmail', subject: 'Following up on my previous message', lastUsed: '3 hours ago', performance: '58% open rate', color: 'from-green-500 to-emerald-600' },
    { id: 4, name: 'LinkedIn InMail', category: 'InMail', platform: 'LinkedIn', subject: 'Exclusive Opportunity', lastUsed: '5 days ago', performance: '41% response', color: 'from-purple-500 to-violet-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
            <Mail className="w-6 h-6 text-cyan-400" />
            Unified Inbox
          </h2>
          <p className="text-sm text-gray-400 mt-1">Manage all your outreach communications in one place</p>
        </div>
        <div className="flex gap-2">
          <Link href="/outreach/builder">
            <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Main Tabs */}
      <Tabs defaultValue="inbox" className="space-y-6">
        <TabsList className="bg-slate-800/50 p-1 backdrop-blur-xl border border-white/10">
          <TabsTrigger value="inbox" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
            <Inbox className="w-4 h-4 mr-2" />
            Inbox
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
            <FileText className="w-4 h-4 mr-2" />
            Templates
          </TabsTrigger>
        </TabsList>

        {/* Inbox Tab */}
        <TabsContent value="inbox" className="space-y-4">
          {/* Platform Selector */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveInbox('gmail')}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                activeInbox === 'gmail'
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-white/10 bg-slate-800/50 hover:border-blue-500/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-white">Gmail Inbox</p>
                    <p className="text-xs text-gray-400">Email outreach</p>
                  </div>
                </div>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                  {gmailMessages.filter(m => m.unread).length} new
                </Badge>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveInbox('linkedin')}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                activeInbox === 'linkedin'
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-white/10 bg-slate-800/50 hover:border-cyan-500/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                    <Linkedin className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-white">LinkedIn Inbox</p>
                    <p className="text-xs text-gray-400">Professional network</p>
                  </div>
                </div>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                  {linkedinMessages.filter(m => m.unread).length} new
                </Badge>
              </div>
            </motion.button>
          </div>

          {/* Inbox Content */}
          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="col-span-3">
              <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    {[
                      { id: 'inbox', label: 'Inbox', icon: Inbox, count: activeInbox === 'gmail' ? 12 : 8 },
                      { id: 'sent', label: 'Sent', icon: Send },
                      { id: 'drafts', label: 'Drafts', icon: Clock, count: 3 },
                      { id: 'starred', label: 'Starred', icon: Star },
                      { id: 'archive', label: 'Archive', icon: Archive },
                      { id: 'trash', label: 'Trash', icon: Trash2 }
                    ].map((item) => (
                      <motion.button
                        key={item.id}
                        whileHover={{ x: 5 }}
                        onClick={() => setSelectedTab(item.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                          selectedTab === item.id
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                            : 'text-gray-400 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </div>
                        {item.count && (
                          <Badge className="bg-white/20 text-white border-0 text-xs">
                            {item.count}
                          </Badge>
                        )}
                      </motion.button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Message List */}
            <div className="col-span-9">
              <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder={`Search ${activeInbox === 'gmail' ? 'emails' : 'messages'}...`}
                        className="pl-10 bg-slate-800/50 border-white/10 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-white/5 max-h-[500px] overflow-y-auto">
                  {activeInbox === 'gmail' ? (
                    gmailMessages.map((email, index) => (
                      <motion.div
                        key={email.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                        className="p-4 cursor-pointer transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex items-center gap-3 flex-1">
                            <div className={`w-2 h-2 rounded-full ${email.unread ? 'bg-cyan-400' : 'bg-transparent'}`} />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className={`font-medium ${email.unread ? 'text-white' : 'text-gray-400'}`}>
                                  {email.from}
                                </h3>
                                <Badge className="bg-slate-800 text-gray-300 text-xs">
                                  {email.offering}
                                </Badge>
                                {email.replied && (
                                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                    Replied
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-white mb-1">{email.subject}</p>
                              <p className="text-sm text-gray-500 truncate">{email.preview}</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">{email.time}</span>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    linkedinMessages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                        className="p-4 cursor-pointer transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex items-center gap-3 flex-1">
                            <div className={`w-2 h-2 rounded-full ${message.unread ? 'bg-cyan-400' : 'bg-transparent'}`} />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className={`font-medium ${message.unread ? 'text-white' : 'text-gray-400'}`}>
                                  {message.from}
                                </h3>
                                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">
                                  {message.connectionLevel}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-500 mb-1">{message.role}</p>
                              <p className="text-sm text-gray-300 truncate">{message.preview}</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">{message.time}</span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          {/* Platform Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gmail Analytics */}
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader className="border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white">Gmail Performance</CardTitle>
                    <CardDescription>Email campaign metrics</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {gmailStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-xl bg-slate-800/50 border border-white/10 hover:border-cyan-500/30 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                          <stat.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-medium text-green-400">{stat.change}</span>
                      </div>
                      <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* LinkedIn Analytics */}
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader className="border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                    <Linkedin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white">LinkedIn Performance</CardTitle>
                    <CardDescription>Professional network metrics</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {linkedinStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-xl bg-slate-800/50 border border-white/10 hover:border-cyan-500/30 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                          <stat.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-medium text-green-400">{stat.change}</span>
                      </div>
                      <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
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
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-white">{template.name}</CardTitle>
                          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-yellow-400">
                            <Star className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">
                            {template.category}
                          </Badge>
                          <Badge className={`bg-gradient-to-r ${template.color} text-white text-xs`}>
                            {template.platform}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Subject/Message</p>
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
                          Use
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

