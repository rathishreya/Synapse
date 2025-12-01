'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import ChatAssistant from '@/components/chat-assistant';
import {
  ArrowLeft,
  Phone,
  Sparkles,
  Play,
  Pause,
  Clock,
  CheckCircle2,
  XCircle,
  User,
  Calendar,
  History,
  Search,
  Filter,
  PhoneCall,
  PhoneMissed,
  PhoneIncoming,
  MessageSquare,
  AlertCircle,
  TrendingUp,
  FileText,
  Plus
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ColdCallingPage() {
  const [selectedProspect, setSelectedProspect] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState('queue');

  const callQueue = [
    { id: 1, name: 'John Smith', company: 'Acme Corp', phone: '+1 555-0101', priority: 'High', offering: 'Enterprise', lastContact: 'Never' },
    { id: 2, name: 'Emily Chen', company: 'TechStart Inc', phone: '+1 555-0102', priority: 'Medium', offering: 'SaaS', lastContact: '3 days ago' },
    { id: 3, name: 'Robert Williams', company: 'Global Enterprises', phone: '+1 555-0103', priority: 'High', offering: 'Enterprise', lastContact: 'Never' }
  ];

  // Call History (Past Calls)
  const callHistory = [
    {
      id: 1,
      prospect: 'Sarah Johnson',
      company: 'Innovate Labs',
      phone: '+1 555-0104',
      offering: 'SaaS',
      date: '2025-01-17',
      time: '10:30 AM',
      duration: '5:23',
      outcome: 'Successful',
      status: 'Interested',
      notes: 'Discussed product features, wants demo next week. Very enthusiastic about AI capabilities.',
      nextAction: 'Schedule demo',
      callType: 'Outbound',
      recordingUrl: '#'
    },
    {
      id: 2,
      prospect: 'Michael Brown',
      company: 'DataFlow Systems',
      phone: '+1 555-0105',
      offering: 'Enterprise',
      date: '2025-01-17',
      time: '09:15 AM',
      duration: '3:45',
      outcome: 'Successful',
      status: 'Meeting Scheduled',
      notes: 'Positive conversation. Scheduled follow-up call for Thursday at 2 PM.',
      nextAction: 'Follow-up call scheduled',
      callType: 'Outbound',
      recordingUrl: '#'
    },
    {
      id: 3,
      prospect: 'Lisa Anderson',
      company: 'CloudTech Solutions',
      phone: '+1 555-0106',
      offering: 'SaaS',
      date: '2025-01-16',
      time: '2:45 PM',
      duration: '7:12',
      outcome: 'Successful',
      status: 'Proposal Sent',
      notes: 'Detailed discussion about pricing and implementation. Sent proposal via email.',
      nextAction: 'Follow up on proposal',
      callType: 'Outbound',
      recordingUrl: '#'
    },
    {
      id: 4,
      prospect: 'David Martinez',
      company: 'FinTech Pro',
      phone: '+1 555-0107',
      offering: 'Consulting',
      date: '2025-01-16',
      time: '11:20 AM',
      duration: '0:45',
      outcome: 'No Answer',
      status: 'Voicemail',
      notes: 'Left voicemail with callback number and brief introduction.',
      nextAction: 'Retry tomorrow',
      callType: 'Outbound',
      recordingUrl: null
    },
    {
      id: 5,
      prospect: 'Jennifer Lee',
      company: 'MediaHub Inc',
      phone: '+1 555-0108',
      offering: 'SaaS',
      date: '2025-01-15',
      time: '4:10 PM',
      duration: '2:30',
      outcome: 'Not Interested',
      status: 'Closed',
      notes: 'Currently using competitor solution, not looking to switch.',
      nextAction: 'Follow up in Q3',
      callType: 'Outbound',
      recordingUrl: '#'
    },
    {
      id: 6,
      prospect: 'Thomas Garcia',
      company: 'RetailMax Corp',
      phone: '+1 555-0109',
      offering: 'Enterprise',
      date: '2025-01-15',
      time: '1:30 PM',
      duration: '6:45',
      outcome: 'Successful',
      status: 'Interested',
      notes: 'Excellent call. Decision maker interested in Q2 implementation.',
      nextAction: 'Send detailed proposal',
      callType: 'Outbound',
      recordingUrl: '#'
    }
  ];

  // Scheduled Calls (Future)
  const scheduledCalls = [
    {
      id: 1,
      prospect: 'Amanda Taylor',
      company: 'EcoSmart Industries',
      phone: '+1 555-0110',
      offering: 'Enterprise',
      date: '2025-01-18',
      time: '10:00 AM',
      priority: 'High',
      purpose: 'Follow-up on proposal',
      notes: 'Discuss implementation timeline and pricing adjustments',
      reminder: '15 min before',
      status: 'Confirmed'
    },
    {
      id: 2,
      prospect: 'Christopher Wilson',
      company: 'NexGen Robotics',
      phone: '+1 555-0111',
      offering: 'SaaS',
      date: '2025-01-18',
      time: '2:00 PM',
      priority: 'High',
      purpose: 'Technical discussion',
      notes: 'Demo of key features, bring technical team',
      reminder: '30 min before',
      status: 'Confirmed'
    },
    {
      id: 3,
      prospect: 'Rachel Green',
      company: 'TechVentures LLC',
      phone: '+1 555-0112',
      offering: 'Consulting',
      date: '2025-01-19',
      time: '11:30 AM',
      priority: 'Medium',
      purpose: 'Initial outreach',
      notes: 'First contact, discuss consulting services',
      reminder: '15 min before',
      status: 'Pending'
    },
    {
      id: 4,
      prospect: 'Mark Thompson',
      company: 'Growth Partners',
      phone: '+1 555-0113',
      offering: 'Enterprise',
      date: '2025-01-19',
      time: '3:30 PM',
      priority: 'High',
      purpose: 'Closing call',
      notes: 'Final discussion before contract signing',
      reminder: '30 min before',
      status: 'Confirmed'
    },
    {
      id: 5,
      prospect: 'Sophie Clark',
      company: 'Digital Dynamics',
      phone: '+1 555-0114',
      offering: 'SaaS',
      date: '2025-01-20',
      time: '9:00 AM',
      priority: 'Medium',
      purpose: 'Demo presentation',
      notes: 'Show new features released this quarter',
      reminder: '15 min before',
      status: 'Confirmed'
    }
  ];

  const stats = [
    { label: 'Calls Today', value: '23', icon: Phone, color: 'from-blue-500 to-blue-600' },
    { label: 'Successful', value: '12', icon: CheckCircle2, color: 'from-green-500 to-green-600' },
    { label: 'No Answer', value: '8', icon: XCircle, color: 'from-orange-500 to-orange-600' },
    { label: 'Avg Duration', value: '4:32', icon: Clock, color: 'from-purple-500 to-purple-600' }
  ];

  const getOutcomeColor = (outcome: string) => {
    switch(outcome) {
      case 'Successful': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'No Answer': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Not Interested': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Interested': return 'bg-cyan-500/20 text-cyan-400';
      case 'Meeting Scheduled': return 'bg-purple-500/20 text-purple-400';
      case 'Proposal Sent': return 'bg-blue-500/20 text-blue-400';
      case 'Voicemail': return 'bg-yellow-500/20 text-yellow-400';
      case 'Closed': return 'bg-gray-500/20 text-gray-400';
      case 'Confirmed': return 'bg-green-500/20 text-green-400';
      case 'Pending': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
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
              <div>
                <h1 className="text-2xl font-bold text-white">Cold Calling</h1>
                <p className="text-sm text-gray-400">Manage your calling queue and scripts</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Script
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="queue" className="space-y-6" onValueChange={setSelectedTab}>
          <TabsList className="bg-slate-900/50 border border-white/10 backdrop-blur-xl">
            <TabsTrigger value="queue" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
              <Phone className="w-4 h-4 mr-2" />
              Call Queue
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
              <History className="w-4 h-4 mr-2" />
              Call History
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
              <Calendar className="w-4 h-4 mr-2" />
              Scheduled Calls
            </TabsTrigger>
          </TabsList>

          {/* Call Queue Tab */}
          <TabsContent value="queue">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader className="border-b border-white/10">
                  <CardTitle className="text-white">Call Queue</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
              {callQueue.map((prospect, index) => (
                <motion.div
                  key={prospect.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                  onClick={() => setSelectedProspect(prospect.id)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    selectedProspect === prospect.id
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{prospect.name}</h3>
                    <Badge className={`${
                      prospect.priority === 'High' 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {prospect.priority}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-400">{prospect.company}</p>
                    <p className="text-gray-500">{prospect.phone}</p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-slate-800 text-gray-300 text-xs">{prospect.offering}</Badge>
                      <span className="text-xs text-gray-500">Last: {prospect.lastContact}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
                </CardContent>
              </Card>

              {/* Call Interface */}
              <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader className="border-b border-white/10">
                  <CardTitle className="text-white">
                    {selectedProspect ? 'Ready to Call' : 'Select a Prospect'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {selectedProspect ? (
                    <div className="space-y-6">
                      <div className="text-center py-8">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                          <User className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {callQueue.find(p => p.id === selectedProspect)?.name}
                        </h3>
                        <p className="text-gray-400">
                          {callQueue.find(p => p.id === selectedProspect)?.company}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 py-6 text-lg">
                          <Phone className="w-5 h-5 mr-2" />
                          Start Call
                        </Button>
                        <Button variant="outline" className="w-full bg-white/5 border-white/10 text-white">
                          <Sparkles className="w-4 h-4 mr-2" />
                          View AI Script
                        </Button>
                      </div>

                      <Card className="bg-slate-800/50 border-white/10">
                        <CardHeader>
                          <CardTitle className="text-sm text-white">Quick Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm text-gray-400">
                            <p>• Decision maker for {callQueue.find(p => p.id === selectedProspect)?.offering}</p>
                            <p>• {callQueue.find(p => p.id === selectedProspect)?.priority} priority</p>
                            <p>• Best time to call: 10 AM - 3 PM EST</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-400">
                      <Phone className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Select a prospect from the queue to start calling</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Call History Tab */}
          <TabsContent value="history">
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader className="border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Call History</CardTitle>
                    <p className="text-sm text-gray-400 mt-1">All past calls and outcomes</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search calls..."
                        className="pl-10 bg-slate-800/50 border-white/10 text-white w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-white/5">
                  {callHistory.map((call, index) => (
                    <motion.div
                      key={call.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-6 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${
                          call.outcome === 'Successful' ? 'bg-green-500/20' :
                          call.outcome === 'No Answer' ? 'bg-orange-500/20' :
                          'bg-red-500/20'
                        }`}>
                          {call.outcome === 'Successful' ? (
                            <PhoneCall className={`w-5 h-5 ${
                              call.outcome === 'Successful' ? 'text-green-400' : 'text-red-400'
                            }`} />
                          ) : call.outcome === 'No Answer' ? (
                            <PhoneMissed className="w-5 h-5 text-orange-400" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-400" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-white text-lg">{call.prospect}</h3>
                              <p className="text-sm text-gray-400">{call.company}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-400">{call.date}</p>
                              <p className="text-xs text-gray-500">{call.time}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-slate-800/30">
                              <p className="text-xs text-gray-500 mb-1">Duration</p>
                              <p className="text-sm font-medium text-white flex items-center">
                                <Clock className="w-3 h-3 mr-1 text-cyan-400" />
                                {call.duration}
                              </p>
                            </div>
                            <div className="p-2 rounded-lg bg-slate-800/30">
                              <p className="text-xs text-gray-500 mb-1">Outcome</p>
                              <Badge className={`text-xs border ${getOutcomeColor(call.outcome)}`}>
                                {call.outcome}
                              </Badge>
                            </div>
                            <div className="p-2 rounded-lg bg-slate-800/30">
                              <p className="text-xs text-gray-500 mb-1">Status</p>
                              <Badge className={`text-xs ${getStatusColor(call.status)}`}>
                                {call.status}
                              </Badge>
                            </div>
                            <div className="p-2 rounded-lg bg-slate-800/30">
                              <p className="text-xs text-gray-500 mb-1">Offering</p>
                              <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                                {call.offering}
                              </Badge>
                            </div>
                          </div>

                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-300 mb-1 flex items-center">
                              <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
                              Notes:
                            </p>
                            <p className="text-sm text-gray-400 bg-slate-800/30 p-3 rounded-lg">
                              {call.notes}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Next Action: <span className="text-gray-400">{call.nextAction}</span></span>
                            </div>
                            {call.recordingUrl && (
                              <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white text-xs">
                                <Play className="w-3 h-3 mr-1" />
                                Play Recording
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scheduled Calls Tab */}
          <TabsContent value="scheduled">
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader className="border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Scheduled Calls</CardTitle>
                    <p className="text-sm text-gray-400 mt-1">Upcoming calls and reminders</p>
                  </div>
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Call
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-white/5">
                  {scheduledCalls.map((call, index) => (
                    <motion.div
                      key={call.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-6 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-cyan-500/20">
                          <Calendar className="w-5 h-5 text-cyan-400" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-white text-lg">{call.prospect}</h3>
                              <p className="text-sm text-gray-400">{call.company}</p>
                            </div>
                            <Badge className={`${
                              call.priority === 'High' 
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            }`}>
                              {call.priority} Priority
                            </Badge>
                          </div>

                          <div className="grid grid-cols-4 gap-3 mb-3">
                            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                              <p className="text-xs text-gray-500 mb-1">Date</p>
                              <p className="text-sm font-medium text-white">{call.date}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                              <p className="text-xs text-gray-500 mb-1">Time</p>
                              <p className="text-sm font-medium text-white flex items-center">
                                <Clock className="w-3 h-3 mr-1 text-cyan-400" />
                                {call.time}
                              </p>
                            </div>
                            <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                              <p className="text-xs text-gray-500 mb-1">Status</p>
                              <Badge className={`text-xs ${getStatusColor(call.status)}`}>
                                {call.status}
                              </Badge>
                            </div>
                            <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
                              <p className="text-xs text-gray-500 mb-1">Reminder</p>
                              <p className="text-xs font-medium text-white flex items-center">
                                <AlertCircle className="w-3 h-3 mr-1 text-orange-400" />
                                {call.reminder}
                              </p>
                            </div>
                          </div>

                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-300 mb-1 flex items-center">
                              <FileText className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                              Purpose:
                            </p>
                            <p className="text-sm text-white bg-slate-800/30 p-3 rounded-lg mb-2">
                              {call.purpose}
                            </p>
                            <p className="text-xs text-gray-400">{call.notes}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                              {call.offering}
                            </Badge>
                            <Badge className="bg-slate-700 text-gray-300 text-xs">
                              {call.phone}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Chat Assistant */}
      <ChatAssistant />
    </div>
  );
}

