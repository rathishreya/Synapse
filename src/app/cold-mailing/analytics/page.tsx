'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatAssistant from '@/components/chat-assistant';
import {
  ArrowLeft,
  Mail,
  Send,
  Inbox,
  Eye,
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  Zap,
  BarChart3,
  Activity,
  CheckCircle2,
  XCircle,
  Users,
  FileText,
  Calendar,
  Filter
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7days');

  // Analytics Stats
  const stats = [
    { label: 'Total Emails Sent', value: '2,456', change: '+12%', trend: 'up', icon: Send, color: 'from-cyan-500 to-blue-600' },
    { label: 'Open Rate', value: '68.4%', change: '+5.2%', trend: 'up', icon: Eye, color: 'from-green-500 to-emerald-600' },
    { label: 'Reply Rate', value: '23.1%', change: '+3.8%', trend: 'up', icon: Inbox, color: 'from-purple-500 to-pink-600' },
    { label: 'Conversion Rate', value: '8.7%', change: '-1.2%', trend: 'down', icon: Target, color: 'from-orange-500 to-red-600' }
  ];

  // Performance by Offering
  const offeringStats = [
    { offering: 'Enterprise Solutions', sent: 856, opened: 612, replied: 203, converted: 78, openRate: '71.5%', replyRate: '23.7%' },
    { offering: 'SaaS Products', sent: 1024, opened: 682, replied: 234, converted: 89, openRate: '66.6%', replyRate: '22.9%' },
    { offering: 'Consulting Services', sent: 576, opened: 378, replied: 132, converted: 41, openRate: '65.6%', replyRate: '22.9%' }
  ];

  // Template Performance
  const templateStats = [
    { template: 'Enterprise - Outreach', sent: 342, opened: 256, replied: 89, openRate: '74.9%', replyRate: '26.0%', aiGenerated: true },
    { template: 'Enterprise - Follow-up 1', sent: 256, opened: 178, replied: 67, openRate: '69.5%', replyRate: '26.2%', aiGenerated: false },
    { template: 'SaaS - Outreach', sent: 412, opened: 278, replied: 98, openRate: '67.5%', replyRate: '23.8%', aiGenerated: true },
    { template: 'SaaS - Follow-up 1', sent: 324, opened: 215, replied: 76, openRate: '66.4%', replyRate: '23.5%', aiGenerated: true },
    { template: 'Consulting - Outreach', sent: 234, opened: 156, replied: 54, openRate: '66.7%', replyRate: '23.1%', aiGenerated: false }
  ];

  // Activity Logs
  const activityLogs = [
    { id: 1, action: 'Campaign Started', offering: 'Enterprise Solutions', details: 'Automated outreach to 45 prospects', timestamp: '2 hours ago', type: 'campaign', icon: Send },
    { id: 2, action: 'Template Generated', template: 'SaaS - Follow-up 2', details: 'AI generated with custom prompt', timestamp: '3 hours ago', type: 'template', icon: Zap },
    { id: 3, action: 'Bulk Reply Received', offering: 'SaaS Products', details: '12 prospects replied', timestamp: '5 hours ago', type: 'reply', icon: Inbox },
    { id: 4, action: 'Template Edited', template: 'Enterprise - Outreach', details: 'Manual edit by Sarah J.', timestamp: '6 hours ago', type: 'template', icon: FileText },
    { id: 5, action: 'Campaign Completed', offering: 'Consulting Services', details: '89 emails sent, 67% opened', timestamp: '8 hours ago', type: 'campaign', icon: CheckCircle2 },
    { id: 6, action: 'Template Created', template: 'Enterprise - Follow-up 3', details: 'Added new follow-up template', timestamp: '1 day ago', type: 'template', icon: FileText },
    { id: 7, action: 'High Open Rate Alert', offering: 'Enterprise Solutions', details: '85% open rate detected', timestamp: '1 day ago', type: 'alert', icon: TrendingUp },
    { id: 8, action: 'Template Generated', template: 'Consulting - Closing', details: 'AI generated closing template', timestamp: '2 days ago', type: 'template', icon: Zap }
  ];

  // AI Usage Stats
  const aiStats = [
    { metric: 'Templates Generated', value: '234', icon: Zap, color: 'cyan' },
    { metric: 'Prompts Used', value: '156', icon: FileText, color: 'purple' },
    { metric: 'Avg. Success Rate', value: '72.4%', icon: Target, color: 'green' },
    { metric: 'Time Saved', value: '18.5h', icon: Clock, color: 'orange' }
  ];

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
              <Link href="/cold-mailing">
                <motion.button
                  whileHover={{ x: -5 }}
                  className="p-2 rounded-lg hover:bg-white/5"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </motion.button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Cold Mailing Analytics</h1>
                <p className="text-sm text-gray-400">Track your email campaign performance</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white text-sm"
              >
                <option value="24hours">Last 24 Hours</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
              <Button variant="outline" className="bg-white/5 border-white/10 text-white">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                      <div className="flex items-center gap-1.5">
                        {stat.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-400" />
                        )}
                        <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                          {stat.change}
                        </span>
                        <span className="text-xs text-gray-500">vs last period</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* AI Usage Stats */}
        <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
          <CardHeader className="border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-white">AI Performance</CardTitle>
                <p className="text-sm text-gray-400">AI-powered template generation metrics</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-4 gap-6">
              {aiStats.map((stat, index) => (
                <motion.div
                  key={stat.metric}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-slate-800/30 border border-white/5"
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-${stat.color}-500/20 flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.metric}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="offerings" className="space-y-6">
          <TabsList className="bg-slate-900/50 border border-white/10">
            <TabsTrigger value="offerings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
              <Users className="w-4 h-4 mr-2" />
              By Offering
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
              <FileText className="w-4 h-4 mr-2" />
              By Template
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
              <Activity className="w-4 h-4 mr-2" />
              Activity Logs
            </TabsTrigger>
          </TabsList>

          {/* By Offering */}
          <TabsContent value="offerings">
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-white">Performance by Offering</CardTitle>
                <p className="text-sm text-gray-400">Compare campaign performance across different offerings</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-white/10 bg-slate-800/50">
                      <tr>
                        <th className="text-left p-4 text-sm font-medium text-gray-400">Offering</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-400">Sent</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-400">Opened</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-400">Replied</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-400">Converted</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-400">Open Rate</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-400">Reply Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {offeringStats.map((offering, index) => (
                        <motion.tr
                          key={offering.offering}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="p-4">
                            <span className="font-medium text-white">{offering.offering}</span>
                          </td>
                          <td className="p-4 text-gray-300">{offering.sent}</td>
                          <td className="p-4 text-gray-300">{offering.opened}</td>
                          <td className="p-4 text-gray-300">{offering.replied}</td>
                          <td className="p-4 text-gray-300">{offering.converted}</td>
                          <td className="p-4">
                            <Badge className="bg-green-500/20 text-green-400">{offering.openRate}</Badge>
                          </td>
                          <td className="p-4">
                            <Badge className="bg-cyan-500/20 text-cyan-400">{offering.replyRate}</Badge>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* By Template */}
          <TabsContent value="templates">
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-white">Template Performance</CardTitle>
                <p className="text-sm text-gray-400">Analyze individual template effectiveness</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-white/10 bg-slate-800/50">
                      <tr>
                        <th className="text-left p-4 text-sm font-medium text-gray-400">Template</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-400">Sent</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-400">Opened</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-400">Replied</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-400">Open Rate</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-400">Reply Rate</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-400">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {templateStats.map((template, index) => (
                        <motion.tr
                          key={template.template}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="p-4">
                            <span className="font-medium text-white">{template.template}</span>
                          </td>
                          <td className="p-4 text-gray-300">{template.sent}</td>
                          <td className="p-4 text-gray-300">{template.opened}</td>
                          <td className="p-4 text-gray-300">{template.replied}</td>
                          <td className="p-4">
                            <Badge className="bg-green-500/20 text-green-400">{template.openRate}</Badge>
                          </td>
                          <td className="p-4">
                            <Badge className="bg-cyan-500/20 text-cyan-400">{template.replyRate}</Badge>
                          </td>
                          <td className="p-4">
                            {template.aiGenerated ? (
                              <Badge className="bg-purple-500/20 text-purple-400">
                                <Zap className="w-3 h-3 mr-1 inline" />
                                AI
                              </Badge>
                            ) : (
                              <Badge className="bg-slate-700 text-gray-300">Manual</Badge>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Logs */}
          <TabsContent value="activity">
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-white">Activity Timeline</CardTitle>
                <p className="text-sm text-gray-400">All actions and events in your cold mailing campaigns</p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {activityLogs.map((log, index) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/30 border border-white/5 hover:border-cyan-500/30 transition-all"
                    >
                      <div className={`p-2 rounded-lg ${
                        log.type === 'template' ? 'bg-purple-500/20' :
                        log.type === 'campaign' ? 'bg-cyan-500/20' :
                        log.type === 'reply' ? 'bg-green-500/20' :
                        'bg-orange-500/20'
                      }`}>
                        <log.icon className={`w-5 h-5 ${
                          log.type === 'template' ? 'text-purple-400' :
                          log.type === 'campaign' ? 'text-cyan-400' :
                          log.type === 'reply' ? 'text-green-400' :
                          'text-orange-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-medium text-white">{log.action}</h4>
                          <span className="text-xs text-gray-500">{log.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">{log.details}</p>
                        {(log.offering || log.template) && (
                          <Badge className="bg-slate-700 text-gray-300 text-xs">
                            {log.offering || log.template}
                          </Badge>
                        )}
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

