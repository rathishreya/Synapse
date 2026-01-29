'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  Users,
  TrendingUp,
  TrendingDown,
  Trophy,
  DollarSign,
  Activity,
  Target,
  AlertCircle,
  Zap,
  BarChart3,
  PieChart,
  Crown,
  Star,
  Award,
  RefreshCw,
  Eye,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Filter,
  Download,
  Settings,
  Play,
  Plus,
  ChevronRight,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  User,
  Layers,
  Map
} from 'lucide-react';
import { useState } from 'react';
import { TeamPerformance, Alert as AlertType, AssignmentRule } from '@/types/team-management';

export default function SalesManagerView() {
  const [showAssignmentDialog, setShowAssignmentDialog] = useState(false);
  const [assignmentMode, setAssignmentMode] = useState<'round_robin' | 'skill_based' | 'workload_based'>('round_robin');

  // Mock team data
  const teamMembers = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Senior Sales Rep',
      avatar: '👩‍💼',
      status: 'online' as const,
      region: 'North America',
      metrics: {
        leadsAssigned: 45,
        leadsContacted: 42,
        leadsConverted: 12,
        revenue: 156000,
        quota: 200000,
        quotaAchievement: 78,
        callsMade: 128,
        emailsSent: 245,
        meetingsCompleted: 28,
        conversionRate: 26.7,
        responseRate: 93,
        averageDealSize: 13000,
        averageSalesCycle: 24,
        dealsWon: 12,
        dealsLost: 3,
        leadsCreated: 45,
        leadsQualified: 28,
        meetingsScheduled: 34,
        activityScore: 88
      }
    },
    {
      id: '2',
      name: 'Mike Johnson',
      role: 'Sales Rep',
      avatar: '👨‍💼',
      status: 'online' as const,
      region: 'North America',
      metrics: {
        leadsAssigned: 38,
        leadsContacted: 35,
        leadsConverted: 8,
        revenue: 98000,
        quota: 150000,
        quotaAchievement: 65,
        callsMade: 95,
        emailsSent: 189,
        meetingsCompleted: 22,
        conversionRate: 21.1,
        responseRate: 92,
        averageDealSize: 12250,
        averageSalesCycle: 28,
        dealsWon: 8,
        dealsLost: 3,
        leadsCreated: 38,
        leadsQualified: 22,
        meetingsScheduled: 26,
        activityScore: 82
      }
    },
    {
      id: '3',
      name: 'Emily Davis',
      role: 'Sales Rep',
      avatar: '👱‍♀️',
      status: 'away' as const,
      region: 'Europe',
      metrics: {
        leadsAssigned: 41,
        leadsContacted: 38,
        leadsConverted: 10,
        revenue: 125000,
        quota: 150000,
        quotaAchievement: 83,
        callsMade: 112,
        emailsSent: 221,
        meetingsCompleted: 25,
        conversionRate: 24.4,
        responseRate: 93,
        averageDealSize: 12500,
        averageSalesCycle: 26,
        dealsWon: 10,
        dealsLost: 2,
        leadsCreated: 41,
        leadsQualified: 25,
        meetingsScheduled: 30,
        activityScore: 85
      }
    },
    {
      id: '4',
      name: 'Alex Martinez',
      role: 'Junior Sales Rep',
      avatar: '👨‍💻',
      status: 'offline' as const,
      region: 'North America',
      metrics: {
        leadsAssigned: 25,
        leadsContacted: 22,
        leadsConverted: 4,
        revenue: 52000,
        quota: 100000,
        quotaAchievement: 52,
        callsMade: 67,
        emailsSent: 134,
        meetingsCompleted: 15,
        conversionRate: 16.0,
        responseRate: 88,
        averageDealSize: 13000,
        averageSalesCycle: 30,
        dealsWon: 4,
        dealsLost: 4,
        leadsCreated: 25,
        leadsQualified: 15,
        meetingsScheduled: 18,
        activityScore: 75
      }
    }
  ];

  const alerts: AlertType[] = [
    {
      id: '1',
      type: 'stalled_deal',
      severity: 'high',
      title: 'Deal Stalled',
      message: 'Acme Corp deal has been in negotiation stage for 15 days',
      entityId: 'deal-123',
      userId: '1',
      createdAt: new Date(),
      metadata: { dealValue: 45000, daysSinceLastActivity: 15 }
    },
    {
      id: '2',
      type: 'at_risk_kpi',
      severity: 'critical',
      title: 'Quota At Risk',
      message: 'Alex Martinez is 48% behind quota with 10 days left',
      entityId: 'user-4',
      userId: '4',
      createdAt: new Date(),
      metadata: { quotaGap: 48000, daysRemaining: 10 }
    },
    {
      id: '3',
      type: 'missed_follow_up',
      severity: 'medium',
      title: 'Follow-up Overdue',
      message: '3 leads have missed follow-up dates',
      entityId: 'lead-multiple',
      createdAt: new Date(),
      metadata: { count: 3 }
    }
  ];

  const recentActivity = [
    { user: 'Sarah Chen', action: 'Won deal', details: 'Closed $45K deal with Acme Corp', time: '10 min ago', icon: Trophy, color: 'text-green-400' },
    { user: 'Mike Johnson', action: 'Meeting scheduled', details: 'Demo call with Tech Startup Inc', time: '25 min ago', icon: Calendar, color: 'text-blue-400' },
    { user: 'Emily Davis', action: 'Sent proposal', details: 'Proposal sent to Enterprise Solutions', time: '1 hour ago', icon: Mail, color: 'text-purple-400' },
    { user: 'Sarah Chen', action: 'Call completed', details: '45 min call with potential enterprise client', time: '2 hours ago', icon: Phone, color: 'text-cyan-400' }
  ];

  const totalMetrics = {
    teamMembers: teamMembers.length,
    activeMembers: teamMembers.filter(m => m.status === 'online').length,
    totalRevenue: teamMembers.reduce((sum, m) => sum + m.metrics.revenue, 0),
    totalQuota: teamMembers.reduce((sum, m) => sum + m.metrics.quota, 0),
    totalLeads: teamMembers.reduce((sum, m) => sum + m.metrics.leadsAssigned, 0),
    totalConversions: teamMembers.reduce((sum, m) => sum + m.metrics.leadsConverted, 0),
    avgConversionRate: teamMembers.reduce((sum, m) => sum + m.metrics.conversionRate, 0) / teamMembers.length,
    unassignedLeads: 12
  };

  const quotaAchievement = (totalMetrics.totalRevenue / totalMetrics.totalQuota) * 100;

  return (
    <div className="container mx-auto px-6 py-8 space-y-6">
      {/* Team Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl hover:border-white/20 transition-all group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 to-pink-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
            <CardContent className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  {totalMetrics.activeMembers} Active
                </Badge>
              </div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Team Members</h3>
              <p className="text-3xl font-bold text-white">{totalMetrics.teamMembers}</p>
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
            <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
            <CardContent className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" />
                  +12%
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Total Revenue</h3>
              <p className="text-3xl font-bold text-white">${(totalMetrics.totalRevenue / 1000).toFixed(0)}K</p>
              <p className="text-xs text-gray-500 mt-1">{quotaAchievement.toFixed(0)}% of quota</p>
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
            <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
            <CardContent className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" />
                  +8%
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Conversions</h3>
              <p className="text-3xl font-bold text-white">{totalMetrics.totalConversions}</p>
              <p className="text-xs text-gray-500 mt-1">{totalMetrics.avgConversionRate.toFixed(1)}% avg rate</p>
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
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <Button
                  size="sm"
                  onClick={() => setShowAssignmentDialog(true)}
                  className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
                >
                  <Zap className="w-3.5 h-3.5 mr-1" />
                  Assign
                </Button>
              </div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Unassigned Leads</h3>
              <p className="text-3xl font-bold text-white">{totalMetrics.unassignedLeads}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl">
            <CardHeader className="border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                    Active Alerts
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {alerts.filter(a => a.severity === 'critical').length} critical, {alerts.filter(a => a.severity === 'high').length} high priority
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-white/10 bg-slate-800/50">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                    className={`p-4 rounded-xl border transition-all ${
                      alert.severity === 'critical' ? 'bg-red-500/10 border-red-500/30' :
                      alert.severity === 'high' ? 'bg-orange-500/10 border-orange-500/30' :
                      'bg-yellow-500/10 border-yellow-500/30'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          alert.severity === 'critical' ? 'bg-red-500/20' :
                          alert.severity === 'high' ? 'bg-orange-500/20' :
                          'bg-yellow-500/20'
                        }`}>
                          <AlertCircle className={`w-4 h-4 ${
                            alert.severity === 'critical' ? 'text-red-400' :
                            alert.severity === 'high' ? 'text-orange-400' :
                            'text-yellow-400'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">{alert.title}</h4>
                          <p className="text-sm text-gray-300">{alert.message}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="border-white/10 bg-slate-700/50">
                        Resolve
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Main Tabs */}
      <Tabs defaultValue="team" className="space-y-6">
        <TabsList className="bg-slate-800/50 border border-white/10 p-1">
          <TabsTrigger value="team" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
            <Users className="w-4 h-4 mr-2" />
            Team Performance
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600">
            <Activity className="w-4 h-4 mr-2" />
            Activity Feed
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="assignments" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-600">
            <Layers className="w-4 h-4 mr-2" />
            Assignments
          </TabsTrigger>
        </TabsList>

        {/* Team Performance Tab */}
        <TabsContent value="team" className="space-y-4">
          <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl">
            <CardHeader className="border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Team Members</CardTitle>
                  <CardDescription className="text-gray-400">Real-time performance tracking</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-white/10 bg-slate-800/50">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/10 bg-slate-800/50">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/10 bg-slate-800/50">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="p-5 rounded-xl bg-slate-800/50 border border-white/10 hover:border-white/20 hover:bg-slate-800/70 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="text-4xl">{member.avatar}</div>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-800 ${
                            member.status === 'online' ? 'bg-green-500' :
                            member.status === 'away' ? 'bg-yellow-500' :
                            'bg-gray-500'
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-white text-lg">{member.name}</h3>
                            {index === 0 && (
                              <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30">
                                <Crown className="w-3 h-3 mr-1" />
                                Top Performer
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-400">{member.role} · {member.region}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="border-white/10 bg-slate-700/50">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-white/10 bg-slate-700/50">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-slate-900/50">
                        <p className="text-xs text-gray-400 mb-1">Revenue</p>
                        <p className="text-xl font-bold text-white">${(member.metrics.revenue / 1000).toFixed(0)}K</p>
                        <p className="text-xs text-gray-500">{member.metrics.quotaAchievement}% of quota</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900/50">
                        <p className="text-xs text-gray-400 mb-1">Deals Won</p>
                        <p className="text-xl font-bold text-green-400">{member.metrics.dealsWon}</p>
                        <p className="text-xs text-gray-500">{member.metrics.conversionRate.toFixed(1)}% rate</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900/50">
                        <p className="text-xs text-gray-400 mb-1">Leads</p>
                        <p className="text-xl font-bold text-cyan-400">{member.metrics.leadsAssigned}</p>
                        <p className="text-xs text-gray-500">{member.metrics.leadsContacted} contacted</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900/50">
                        <p className="text-xs text-gray-400 mb-1">Activity</p>
                        <p className="text-xl font-bold text-purple-400">{member.metrics.activityScore}</p>
                        <p className="text-xs text-gray-500">Score</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-400">Calls:</span>
                        <span className="text-white font-semibold">{member.metrics.callsMade}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-400">Emails:</span>
                        <span className="text-white font-semibold">{member.metrics.emailsSent}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-green-400" />
                        <span className="text-gray-400">Meetings:</span>
                        <span className="text-white font-semibold">{member.metrics.meetingsCompleted}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-orange-400" />
                        <span className="text-gray-400">Avg Cycle:</span>
                        <span className="text-white font-semibold">{member.metrics.averageSalesCycle}d</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-gray-400">Response:</span>
                          <span className="text-sm font-bold text-green-400">{member.metrics.responseRate}%</span>
                        </div>
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-600">
                        View Details
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Feed Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl">
            <CardHeader className="border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Team Activity Feed</CardTitle>
                  <CardDescription className="text-gray-400">Recent team actions and updates</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-white/10 bg-slate-800/50">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 p-4 rounded-xl bg-slate-800/50 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className={`p-3 rounded-lg bg-slate-900/50`}>
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-white">{activity.user}</h4>
                        <span className="text-sm text-gray-500">{activity.time}</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-1">{activity.action}</p>
                      <p className="text-sm text-gray-300">{activity.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-400" />
                  Team Performance Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div key={member.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white">{member.name}</span>
                          {index === 0 && <Star className="w-4 h-4 text-yellow-400" />}
                        </div>
                        <span className="text-sm font-bold text-cyan-400">{member.metrics.quotaAchievement}%</span>
                      </div>
                      <div className="h-2 bg-slate-900/50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${member.metrics.quotaAchievement}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Team Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {[...teamMembers].sort((a, b) => b.metrics.revenue - a.metrics.revenue).map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl border transition-all ${
                        index === 0
                          ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
                          : 'bg-slate-800/50 border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900/50 font-bold text-white">
                            {index + 1}
                          </div>
                          <div className="text-2xl">{member.avatar}</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-white">{member.name}</h3>
                              {index === 0 && <Crown className="w-4 h-4 text-yellow-400" />}
                            </div>
                            <p className="text-sm text-gray-400">{member.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">${(member.metrics.revenue / 1000).toFixed(0)}K</p>
                          <p className="text-xs text-gray-400">Revenue</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Regional Performance */}
          <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="text-white flex items-center gap-2">
                <Map className="w-5 h-5 text-green-400" />
                Regional Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['North America', 'Europe'].map((region) => {
                  const regionMembers = teamMembers.filter(m => m.region === region);
                  const regionRevenue = regionMembers.reduce((sum, m) => sum + m.metrics.revenue, 0);
                  const regionDeals = regionMembers.reduce((sum, m) => sum + m.metrics.dealsWon, 0);
                  
                  return (
                    <div key={region} className="p-5 rounded-xl bg-slate-800/50 border border-white/10">
                      <h3 className="font-bold text-white mb-4">{region}</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Revenue</span>
                          <span className="text-white font-bold">${(regionRevenue / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Deals Won</span>
                          <span className="text-white font-bold">{regionDeals}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Team Members</span>
                          <span className="text-white font-bold">{regionMembers.length}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4">
          <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl">
            <CardHeader className="border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-orange-400" />
                    Lead Assignment Rules
                  </CardTitle>
                  <CardDescription className="text-gray-400">Configure automatic and manual assignment</CardDescription>
                </div>
                <Button
                  onClick={() => setShowAssignmentDialog(true)}
                  className="bg-gradient-to-r from-orange-500 to-amber-600"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Auto Assign Now
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setAssignmentMode('round_robin')}
                  className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                    assignmentMode === 'round_robin'
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-white/10 bg-slate-800/50 hover:border-cyan-500/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-cyan-500/20">
                      <RefreshCw className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="font-bold text-white">Round Robin</h3>
                  </div>
                  <p className="text-sm text-gray-400">Distribute leads evenly across all team members</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setAssignmentMode('skill_based')}
                  className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                    assignmentMode === 'skill_based'
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-white/10 bg-slate-800/50 hover:border-purple-500/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Target className="w-5 h-5 text-purple-400" />
                    </div>
                    <h3 className="font-bold text-white">Skill-Based</h3>
                  </div>
                  <p className="text-sm text-gray-400">Match leads with best-suited team members</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setAssignmentMode('workload_based')}
                  className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                    assignmentMode === 'workload_based'
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-white/10 bg-slate-800/50 hover:border-green-500/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <Activity className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="font-bold text-white">Workload-Based</h3>
                  </div>
                  <p className="text-sm text-gray-400">Assign to members with lightest workload</p>
                </motion.div>
              </div>

              <div className="p-5 rounded-xl bg-slate-800/50 border border-white/10">
                <h3 className="font-bold text-white mb-4">Unassigned Leads ({totalMetrics.unassignedLeads})</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">
                    {totalMetrics.unassignedLeads} leads are waiting for assignment using the {assignmentMode.replace('_', ' ')} strategy.
                  </p>
                  <Button
                    onClick={() => setShowAssignmentDialog(true)}
                    className="bg-gradient-to-r from-orange-500 to-amber-600 w-full"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Assign {totalMetrics.unassignedLeads} Leads
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Assignment Dialog */}
      <Dialog open={showAssignmentDialog} onOpenChange={setShowAssignmentDialog}>
        <DialogContent className="sm:max-w-md bg-slate-900 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-400" />
              Auto Assign Leads
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Assign {totalMetrics.unassignedLeads} leads using {assignmentMode.replace('_', ' ')} strategy
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-white mb-2 block">Assignment Mode</Label>
              <Select value={assignmentMode} onValueChange={(value: any) => setAssignmentMode(value)}>
                <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="round_robin">Round Robin</SelectItem>
                  <SelectItem value="skill_based">Skill-Based</SelectItem>
                  <SelectItem value="workload_based">Workload-Based</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={() => {
                // Handle assignment
                setShowAssignmentDialog(false);
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-600"
            >
              <Play className="w-4 h-4 mr-2" />
              Assign Leads
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


