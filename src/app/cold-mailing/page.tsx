'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Search,
  Plus,
  Mail,
  Archive,
  Trash2,
  Star,
  Clock,
  Send,
  Inbox,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ColdMailingPage() {
  const [selectedTab, setSelectedTab] = useState('inbox');

  const emails = [
    { id: 1, from: 'john@acme.com', subject: 'Re: Enterprise Solutions Inquiry', preview: 'Thanks for reaching out...', time: '10:30 AM', unread: true, offering: 'Enterprise' },
    { id: 2, from: 'emily@techstart.com', subject: 'Demo Request', preview: 'I would like to schedule...', time: 'Yesterday', unread: true, offering: 'SaaS' },
    { id: 3, from: 'robert@global.com', subject: 'Pricing Information', preview: 'Could you send me...', time: '2 days ago', unread: false, offering: 'Enterprise' }
  ];

  const stats = [
    { label: 'Sent (AI)', value: '1,234', icon: Send, color: 'from-blue-500 to-blue-600' },
    { label: 'Sent (Manual)', value: '456', icon: Mail, color: 'from-purple-500 to-purple-600' },
    { label: 'Replied', value: '234', icon: Inbox, color: 'from-green-500 to-green-600' },
    { label: 'Opened', value: '67%', icon: BarChart3, color: 'from-orange-500 to-orange-600' }
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
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ x: -5 }}
                  className="p-2 rounded-lg hover:bg-white/5"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </motion.button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Cold Mailing</h1>
                <p className="text-sm text-gray-400">Manage your email campaigns and inbox</p>
              </div>
            </div>
            <Link href="/cold-mailing/compose">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium"
              >
                <Plus className="w-4 h-4 mr-2 inline" />
                Compose
              </motion.button>
            </Link>
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

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3">
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl p-4">
              <nav className="space-y-2">
                {[
                  { id: 'inbox', label: 'Inbox', icon: Inbox, count: 12 },
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

              <div className="mt-6 pt-6 border-t border-white/10">
                <Link href="/cold-mailing/templates">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full p-3 rounded-lg bg-white/5 text-white text-sm font-medium hover:bg-white/10"
                  >
                    <Mail className="w-4 h-4 mr-2 inline" />
                    Templates
                  </motion.button>
                </Link>
                <Link href="/cold-mailing/analytics">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full p-3 rounded-lg bg-white/5 text-white text-sm font-medium hover:bg-white/10 mt-2"
                  >
                    <BarChart3 className="w-4 h-4 mr-2 inline" />
                    Analytics
                  </motion.button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Email List */}
          <div className="col-span-9">
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search emails..."
                      className="pl-10 bg-slate-800/50 border-white/10 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="divide-y divide-white/5">
                {emails.map((email, index) => (
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
                          </div>
                          <p className="text-sm text-white mb-1">{email.subject}</p>
                          <p className="text-sm text-gray-500 truncate">{email.preview}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">{email.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

