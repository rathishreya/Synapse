'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Target,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  Calendar,
  User,
  DollarSign,
  Activity,
  Zap,
  Send,
  MessageSquare,
  FileText,
  Filter,
  Search,
  ArrowUpRight,
  Award,
  Flame,
  Sparkles,
  Plus,
  BarChart3,
  ListTodo,
  Bell,
  Download
} from 'lucide-react';
import { useState } from 'react';
import { Lead, Task, Activity as ActivityType, PerformanceMetrics } from '@/types/team-management';

export default function SalesRepView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data - Replace with API calls
  const performanceMetrics: PerformanceMetrics['metrics'] = {
    leadsCreated: 45,
    leadsContacted: 42,
    leadsQualified: 28,
    leadsConverted: 12,
    callsMade: 128,
    emailsSent: 245,
    meetingsScheduled: 34,
    meetingsCompleted: 28,
    dealsWon: 12,
    dealsLost: 5,
    revenue: 156000,
    quota: 200000,
    quotaAchievement: 78,
    averageDealSize: 13000,
    averageSalesCycle: 24,
    conversionRate: 26.7,
    responseRate: 93,
    activityScore: 88
  };

  const leads: Lead[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@acmecorp.com',
      phone: '+1 555-0123',
      company: 'Acme Corp',
      title: 'VP of Sales',
      status: 'qualified',
      priority: 'hot',
      score: 92,
      source: 'LinkedIn',
      assignedTo: 'current-user',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date(),
      lastContactDate: new Date(),
      nextFollowUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      estimatedValue: 45000,
      region: 'North America',
      industry: 'Technology',
      tags: ['enterprise', 'hot-lead']
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@techstart.io',
      phone: '+1 555-0124',
      company: 'Tech Startup Inc',
      title: 'CEO',
      status: 'proposal',
      priority: 'hot',
      score: 88,
      source: 'Referral',
      assignedTo: 'current-user',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date(),
      lastContactDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      nextFollowUpDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      estimatedValue: 32000,
      region: 'North America',
      industry: 'SaaS',
      tags: ['saas', 'decision-maker']
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'mchen@enterprise.com',
      phone: '+1 555-0125',
      company: 'Enterprise Solutions Ltd',
      title: 'Director of Operations',
      status: 'contacted',
      priority: 'warm',
      score: 75,
      source: 'Website',
      assignedTo: 'current-user',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date(),
      lastContactDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      nextFollowUpDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      estimatedValue: 28000,
      region: 'North America',
      industry: 'Enterprise',
      tags: ['mid-market']
    }
  ];

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Follow up with Acme Corp on proposal',
      description: 'Discuss pricing and implementation timeline',
      leadId: '1',
      assignedTo: 'current-user',
      priority: 'high',
      status: 'pending',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      automatedFollowUp: true
    },
    {
      id: '2',
      title: 'Send case study to Tech Startup Inc',
      leadId: '2',
      assignedTo: 'current-user',
      priority: 'high',
      status: 'pending',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'Schedule demo call with Enterprise Solutions',
      leadId: '3',
      assignedTo: 'current-user',
      priority: 'medium',
      status: 'pending',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      createdAt: new Date()
    }
  ];

  const activities: ActivityType[] = [
    {
      id: '1',
      leadId: '1',
      userId: 'current-user',
      type: 'call',
      subject: 'Discovery Call',
      description: 'Discussed requirements and pain points',
      duration: 45,
      outcome: 'Interested in enterprise plan',
      completedAt: new Date(),
      createdAt: new Date()
    },
    {
      id: '2',
      leadId: '2',
      userId: 'current-user',
      type: 'email',
      subject: 'Proposal Sent',
      description: 'Sent pricing proposal and case studies',
      completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'hot': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'warm': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'cold': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      contacted: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      qualified: 'bg-green-500/20 text-green-400 border-green-500/30',
      proposal: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      negotiation: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      closed_won: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      closed_lost: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return colors[status] || colors.new;
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl hover:border-white/20 transition-all group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
            <CardContent className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  +12%
                </Badge>
              </div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">My Pipeline</h3>
              <p className="text-3xl font-bold text-white">{performanceMetrics.leadsCreated}</p>
              <p className="text-xs text-gray-500 mt-1">Active leads</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl hover:border-white/20 transition-all group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-br from-green-500/20 to-emerald-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
            <CardContent className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" />
                  +15%
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Deals Won</h3>
              <p className="text-3xl font-bold text-white">{performanceMetrics.dealsWon}</p>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl hover:border-white/20 transition-all group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 to-pink-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
            <CardContent className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Revenue</h3>
              <p className="text-3xl font-bold text-white">${(performanceMetrics.revenue / 1000).toFixed(0)}K</p>
              <p className="text-xs text-gray-500 mt-1">of ${(performanceMetrics.quota / 1000).toFixed(0)}K quota</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl hover:border-white/20 transition-all group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-br from-orange-500/20 to-amber-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
            <CardContent className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Activity Score</h3>
              <p className="text-3xl font-bold text-white">{performanceMetrics.activityScore}</p>
              <p className="text-xs text-gray-500 mt-1">Excellent performance</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl hover:border-white/20 transition-all group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-br from-pink-500/20 to-rose-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
            <CardContent className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Conversion Rate</h3>
              <p className="text-3xl font-bold text-white">{performanceMetrics.conversionRate}%</p>
              <p className="text-xs text-gray-500 mt-1">Above average</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quota Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  Quota Achievement
                </CardTitle>
                <CardDescription className="text-gray-400">Monthly target progress</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-white">{performanceMetrics.quotaAchievement}%</p>
                <p className="text-sm text-gray-400">${(performanceMetrics.revenue / 1000).toFixed(0)}K / ${(performanceMetrics.quota / 1000).toFixed(0)}K</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={performanceMetrics.quotaAchievement} className="h-3" />
            <div className="flex items-center justify-between mt-3">
              <span className="text-sm text-gray-400">10 days remaining</span>
              <span className="text-sm font-semibold text-green-400">${((performanceMetrics.quota - performanceMetrics.revenue) / 1000).toFixed(0)}K to go</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Tabs */}
      <Tabs defaultValue="leads" className="space-y-6">
        <TabsList className="bg-slate-800/50 border border-white/10 p-1">
          <TabsTrigger value="leads" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
            <Flame className="w-4 h-4 mr-2" />
            My Leads
          </TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600">
            <ListTodo className="w-4 h-4 mr-2" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="activities" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600">
            <Activity className="w-4 h-4 mr-2" />
            Activities
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-600">
            <BarChart3 className="w-4 h-4 mr-2" />
            Performance
          </TabsTrigger>
        </TabsList>

        {/* Leads Tab */}
        <TabsContent value="leads" className="space-y-4">
          <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl">
            <CardHeader className="border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Prioritized Leads</CardTitle>
                  <CardDescription className="text-gray-400">Sorted by lead score and urgency</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      placeholder="Search leads..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-slate-900/50 border-white/10 text-white w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="border-white/10 bg-slate-800/50">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/10 bg-slate-800/50">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {leads.map((lead, index) => (
                  <motion.div
                    key={lead.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="p-5 rounded-xl bg-slate-800/50 border border-white/10 hover:border-white/20 hover:bg-slate-800/70 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-slate-900/50">
                          <User className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-white text-lg">{lead.name}</h3>
                            <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30">
                              <Flame className="w-3 h-3 text-orange-400" />
                              <span className="text-xs font-bold text-orange-400">{lead.score}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-400">{lead.title} at {lead.company}</p>
                          <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {lead.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {lead.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(lead.priority)}>
                          {lead.priority.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(lead.status)}>
                          {lead.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 p-3 rounded-lg bg-slate-900/50">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Estimated Value</p>
                        <p className="text-sm font-bold text-white">${(lead.estimatedValue! / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Last Contact</p>
                        <p className="text-sm font-bold text-white" suppressHydrationWarning>
                          {lead.lastContactDate ? new Date(lead.lastContactDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Never'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Next Follow-up</p>
                        <p className="text-sm font-bold text-orange-400" suppressHydrationWarning>
                          {lead.nextFollowUpDate ? new Date(lead.nextFollowUpDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Not scheduled'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {lead.tags?.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-white/20 text-gray-400">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule
                        </Button>
                        <Button size="sm" variant="outline" className="border-white/10 bg-slate-700/50">
                          <ArrowUpRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl">
            <CardHeader className="border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">My Tasks</CardTitle>
                  <CardDescription className="text-gray-400">{tasks.length} pending tasks</CardDescription>
                </div>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600">
                  <Plus className="w-4 h-4 mr-2" />
                  New Task
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {tasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="p-4 rounded-xl bg-slate-800/50 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <input
                          type="checkbox"
                          className="mt-1 w-5 h-5 rounded border-cyan-500 accent-cyan-500"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1">{task.title}</h4>
                          {task.description && (
                            <p className="text-sm text-gray-400 mb-2">{task.description}</p>
                          )}
                          <div className="flex items-center gap-3 text-sm">
                            <span className="flex items-center gap-1 text-gray-500" suppressHydrationWarning>
                              <Clock className="w-3 h-3" />
                              Due {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                            {task.automatedFollowUp && (
                              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                                <Zap className="w-3 h-3 mr-1" />
                                Auto
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Badge className={
                        task.priority === 'high' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                        task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                        'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      }>
                        {task.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activities Tab */}
        <TabsContent value="activities" className="space-y-4">
          <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl">
            <CardHeader className="border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Contact History</CardTitle>
                  <CardDescription className="text-gray-400">Recent interactions with leads</CardDescription>
                </div>
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Log Activity
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 p-4 rounded-xl bg-slate-800/50 border border-white/10"
                  >
                    <div className={`p-3 rounded-lg ${
                      activity.type === 'call' ? 'bg-blue-500/20' :
                      activity.type === 'email' ? 'bg-purple-500/20' :
                      activity.type === 'meeting' ? 'bg-green-500/20' :
                      'bg-gray-500/20'
                    }`}>
                      {activity.type === 'call' && <Phone className="w-5 h-5 text-blue-400" />}
                      {activity.type === 'email' && <Mail className="w-5 h-5 text-purple-400" />}
                      {activity.type === 'meeting' && <Calendar className="w-5 h-5 text-green-400" />}
                      {activity.type === 'note' && <FileText className="w-5 h-5 text-gray-400" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-white">{activity.subject}</h4>
                        <span className="text-sm text-gray-500" suppressHydrationWarning>
                          {new Date(activity.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{activity.description}</p>
                      {activity.outcome && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {activity.outcome}
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-white">Activity Metrics</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Calls Made</span>
                    <span className="text-white font-bold">{performanceMetrics.callsMade}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Emails Sent</span>
                    <span className="text-white font-bold">{performanceMetrics.emailsSent}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Meetings Scheduled</span>
                    <span className="text-white font-bold">{performanceMetrics.meetingsScheduled}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Meetings Completed</span>
                    <span className="text-white font-bold">{performanceMetrics.meetingsCompleted}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-white">Conversion Metrics</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Leads Created</span>
                    <span className="text-white font-bold">{performanceMetrics.leadsCreated}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Leads Qualified</span>
                    <span className="text-white font-bold">{performanceMetrics.leadsQualified}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Deals Won</span>
                    <span className="text-white font-bold">{performanceMetrics.dealsWon}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Win Rate</span>
                    <span className="text-green-400 font-bold">
                      {((performanceMetrics.dealsWon / (performanceMetrics.dealsWon + performanceMetrics.dealsLost)) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Suggestions */}
          <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                AI-Powered Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">High Probability Close</h4>
                      <p className="text-sm text-gray-300">John Smith from Acme Corp shows 85% close probability. Schedule a follow-up call this week.</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Clock className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Optimal Contact Time</h4>
                      <p className="text-sm text-gray-300">Best time to contact Michael Chen is between 2-4 PM based on historical response rates.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

