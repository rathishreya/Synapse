'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Link from 'next/link';
import ChatAssistant from '@/components/chat-assistant';
import { 
  TrendingUp,
  TrendingDown, 
  Users,
  Target, 
  Mail,
  Phone,
  Calendar,
  Plus,
  Upload,
  ChevronRight,
  Activity,
  Trophy,
  Bell,
  Settings,
  X,
  Check,
  Clock,
  AlertCircle,
  UserPlus,
  ArrowUpRight,
  Zap,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';

export default function DashboardPage() {
  const [showAddLead, setShowAddLead] = useState(false);
  const [addLeadMethod, setAddLeadMethod] = useState<'single' | 'import' | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  // Notifications data
  const notifications = [
    { id: 1, title: 'New lead added', message: 'John Smith from Acme Corp was added to your pipeline', time: '2 min ago', unread: true, icon: UserPlus, color: 'text-green-500' },
    { id: 2, title: 'Follow-up due', message: '5 follow-ups are due today', time: '1 hour ago', unread: true, icon: Clock, color: 'text-orange-500' },
    { id: 3, title: 'Campaign completed', message: 'Your "Q4 Outreach" campaign has finished', time: '3 hours ago', unread: true, icon: Check, color: 'text-blue-500' },
    { id: 4, title: 'Template update', message: 'AI has optimized your outreach template', time: '5 hours ago', unread: false, icon: Mail, color: 'text-purple-500' },
  ];

  // Mock data
  const stats = [
    {
      title: 'Total Prospects',
      value: '2,543',
      change: '+12.5%',
      trending: 'up' as const,
      icon: Users,
      color: 'from-violet-500 to-purple-600',
      lightColor: 'from-violet-500/10 to-purple-600/10'
    },
    {
      title: 'Total Leads',
      value: '847',
      change: '+8.2%',
      trending: 'up' as const,
      icon: Target,
      color: 'from-cyan-500 to-blue-600',
      lightColor: 'from-cyan-500/10 to-blue-600/10'
    },
    {
      title: 'Active Campaigns',
      value: '12',
      change: '+3',
      trending: 'up' as const,
      icon: Activity,
      color: 'from-pink-500 to-rose-600',
      lightColor: 'from-pink-500/10 to-rose-600/10'
    },
    {
      title: 'Follow-ups Due',
      value: '34',
      change: '-5',
      trending: 'down' as const,
      icon: Calendar,
      color: 'from-orange-500 to-amber-600',
      lightColor: 'from-orange-500/10 to-amber-600/10'
    },
    {
      title: 'Win Rate',
      value: '24.3%',
      change: '+2.1%',
      trending: 'up' as const,
      icon: Trophy,
      color: 'from-emerald-500 to-teal-600',
      lightColor: 'from-emerald-500/10 to-teal-600/10'
    }
  ];

  const quickActions = [
    { icon: Users, label: 'Prospects', color: 'from-indigo-500 to-indigo-600', href: '/prospects' },
    { icon: Target, label: 'Leads', color: 'from-emerald-500 to-emerald-600', href: '/leads' },
    { icon: Mail, label: 'Cold Mailing', color: 'from-blue-500 to-blue-600', href: '/cold-mailing' },
    { icon: Phone, label: 'Cold Call', color: 'from-green-500 to-green-600', href: '/cold-calling' },
    { icon: Calendar, label: 'Schedule Meeting', color: 'from-purple-500 to-purple-600', href: '/meetings' },
    { icon: Activity, label: 'Email Campaign', color: 'from-orange-500 to-orange-600', href: '/campaigns' },
    { icon: Linkedin, label: 'LinkedIn', color: 'from-blue-600 to-blue-700', href: '/linkedin' },
    { icon: Twitter, label: 'Twitter', color: 'from-sky-400 to-sky-500', href: '/twitter' },
    { icon: Instagram, label: 'Instagram', color: 'from-pink-500 to-purple-600', href: '/instagram' },
    { icon: Youtube, label: 'YouTube', color: 'from-red-500 to-red-600', href: '/youtube' }
  ];


  const [todos, setTodos] = useState([
    { id: 1, text: 'Follow up with Acme Corp', date: 'Today', completed: false },
    { id: 2, text: 'Send proposal to Tech Startup', date: 'Tomorrow', completed: false },
  ]);

  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, date: 'Today', completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs */}
                <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-500/30 to-pink-600/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-violet-500/20 to-indigo-600/20 rounded-full blur-3xl"
        />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
              </div>

        {/* Header */}
      <div className="border-b border-white/10 bg-slate-900/30 backdrop-blur-2xl sticky top-0 z-40 shadow-2xl">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between mb-6">
            <div>
        <motion.div 
                initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-2"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative p-2 bg-slate-900 rounded-lg">
                    <Sparkles className="w-6 h-6 text-cyan-400" />
                  </div>
                  </div>
                <div>
                  <motion.h1 
                    initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    Synapse AI
                  </motion.h1>
                  <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xs text-gray-500 font-medium tracking-wide"
                  >
                    Your AI Sales Representative
                  </motion.p>
                </div>
          </motion.div>
          <motion.div
                initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2"
              >
                <span className="text-sm text-gray-400">Welcome back,</span>
                <span className="text-sm font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Sarah Chen
                </span>
                <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                  Premium
                </span>
          </motion.div>
        </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
                  <Dialog open={showAddLead} onOpenChange={setShowAddLead}>
                    <DialogTrigger asChild>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      size="default"
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Lead
                      </Button>
                  </motion.div>
                    </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-slate-900 border-white/10">
                      <DialogHeader>
                  <DialogTitle className="text-white">Add Lead</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Choose how you want to add leads
                  </DialogDescription>
                      </DialogHeader>
                <div className="grid gap-4 py-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card 
                      className={`cursor-pointer transition-all border-2 ${
                        addLeadMethod === 'single' 
                          ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20' 
                          : 'border-white/10 bg-slate-800/50 hover:border-cyan-500/50'
                      }`}
                      onClick={() => setAddLeadMethod('single')}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg text-white">Add Single Lead</CardTitle>
                        <CardDescription className="text-gray-400">Manually enter lead details</CardDescription>
                      </CardHeader>
          </Card>
        </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card 
                      className={`cursor-pointer transition-all border-2 ${
                        addLeadMethod === 'import' 
                          ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20' 
                          : 'border-white/10 bg-slate-800/50 hover:border-cyan-500/50'
                      }`}
                      onClick={() => setAddLeadMethod('import')}
                    >
            <CardHeader>
                        <CardTitle className="text-lg text-white">Import Leads</CardTitle>
                        <CardDescription className="text-gray-400">Upload CSV file with multiple leads</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      </div>
                {addLeadMethod && (
                        <Button 
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600"
                              onClick={() => {
                      // Handle add lead
                      setShowAddLead(false);
                      setAddLeadMethod(null);
                              }}
                            >
                    {addLeadMethod === 'single' ? 'Open Form' : 'Upload CSV'}
                            </Button>
                )}
              </DialogContent>
            </Dialog>

              {/* Notifications */}
              <div className="relative">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          variant="outline"
                    size="icon"
                    className="relative border-white/10 bg-slate-800/50 hover:border-cyan-500/50 hover:bg-slate-800/80 backdrop-blur-xl transition-all duration-300"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <Bell className="w-5 h-5 text-gray-300" />
                    {unreadCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
                      >
                        {unreadCount}
                      </motion.span>
                    )}
                        </Button>
                </motion.div>

                {/* Notifications Panel */}
                <AnimatePresence>
                  {showNotifications && (
                        <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 top-14 w-96 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-white">Notifications</h3>
                            <Button 
                            variant="ghost"
                            size="sm"
                            onClick={() => setUnreadCount(0)}
                            className="text-xs text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                          >
                            Mark all read
                            </Button>
                          </div>
                        </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <motion.div
                            key={notification.id}
                            whileHover={{ backgroundColor: 'rgba(6, 182, 212, 0.05)' }}
                            className={`p-4 border-b border-white/5 cursor-pointer transition-all ${
                              notification.unread ? 'bg-cyan-500/5' : ''
                            }`}
                          >
                            <div className="flex gap-3">
                              <div className={`p-2.5 rounded-lg bg-slate-800/50 ${notification.color} shrink-0`}>
                                <notification.icon className="w-4 h-4" />
                        </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <h4 className="font-semibold text-sm text-white">{notification.title}</h4>
                                  {notification.unread && (
                                    <div className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0 mt-1.5"></div>
                                  )}
                    </div>
                                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                    </div>
                  </div>
                          </motion.div>
                        ))}
                            </div>
                      <div className="p-3 border-t border-white/10 bg-slate-800/30 text-center">
                        <Button variant="ghost" size="sm" className="text-xs text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
                          View all notifications
                  </Button>
                </div>
              </motion.div>
            )}
                </AnimatePresence>
            </div>
            
              {/* Settings */}
              <Link href="/settings">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                    size="icon"
                    className="border-white/10 bg-slate-800/50 hover:border-cyan-500/50 hover:bg-slate-800/80 backdrop-blur-xl transition-all duration-300"
                >
                    <Settings className="w-5 h-5 text-gray-300" />
                </Button>
                </motion.div>
              </Link>
              </div>
            </div>
            
          {/* Quick Actions - Premium Redesign */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {quickActions.map((action, index) => (
              <Link key={action.label} href={action.href}>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex flex-col items-center justify-center px-6 py-4 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all duration-300 min-w-[120px] overflow-hidden"
                >
                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className={`relative p-3 rounded-xl bg-gradient-to-br ${action.color} mb-3 shadow-lg group-hover:shadow-xl group-hover:shadow-cyan-500/20 transition-all duration-300`}>
                    <action.icon className="w-5 h-5 text-white" />
              </div>
                  <span className="relative text-xs font-semibold text-gray-300 group-hover:text-white whitespace-nowrap transition-colors duration-300">
                    {action.label}
                  </span>
                </motion.button>
              </Link>
            ))}
              </div>
            </div>
            </div>
            
      <div className="relative container mx-auto px-6 py-8">
        {/* Stats Cards - Premium Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="relative overflow-hidden border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl hover:border-white/20 transition-all duration-300 group">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.lightColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Glow Effect on Hover */}
                <div className={`absolute -inset-1 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
                
                <CardContent className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <stat.icon className="w-6 h-6 text-white" />
              </div>
              <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                        stat.trending === 'up' 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      }`}
                    >
                      {stat.trending === 'up' ? (
                        <TrendingUp className="w-3.5 h-3.5 mr-1" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5 mr-1" />
                      )}
                      {stat.change}
                    </motion.div>
              </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">{stat.title}</h3>
                    <p className="text-3xl font-bold text-white mb-1 tracking-tight">{stat.value}</p>
                    <p className="text-xs text-gray-500">vs last month</p>
            </div>
              </CardContent>
            </Card>
            </motion.div>
          ))}
            </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* To-Do List - Premium */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl hover:border-white/20 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 to-pink-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
              <CardHeader className="relative border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600">
                    <Check className="w-4 h-4 text-white" />
                    </div>
                  <div>
                    <CardTitle className="text-white">To-Do List</CardTitle>
                    <CardDescription className="text-gray-400 text-sm">Your pending tasks</CardDescription>
                    </div>
                  </div>
              </CardHeader>
              <CardContent className="relative p-6">
                <div className="space-y-3 mb-4">
                  {todos.map((todo) => (
                    <motion.div 
                      key={todo.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-white/10 hover:border-white/20 hover:bg-slate-800/70 transition-all duration-200"
                    >
              <input
                type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="w-4 h-4 rounded border-cyan-500 accent-cyan-500"
                      />
                    <div className="flex-1">
                        <p className={`text-sm font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                          {todo.text}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{todo.date}</p>
                    </div>
                    </motion.div>
                ))}
              </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add new task..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    className="flex-1 bg-slate-900/50 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500"
                  />
                  <Button onClick={addTodo} size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
              </motion.div>

          {/* AI Insights - Premium */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-2"
          >
            <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl hover:border-white/20 transition-all duration-300 group relative overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
              <CardHeader className="relative border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                    <Sparkles className="w-4 h-4 text-white" />
              </div>
                  <div>
                    <CardTitle className="text-white">AI Insights</CardTitle>
                    <CardDescription className="text-gray-400 text-sm">Smart recommendations for your sales</CardDescription>
              </div>
            </div>
              </CardHeader>
              <CardContent className="relative p-6">
                <div className="space-y-4">
                  <motion.div 
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="p-5 rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 hover:border-red-500/40 transition-all duration-200 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <div className="relative flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-red-500/20 shrink-0">
                        <Zap className="w-4 h-4 text-red-400" />
              </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1.5 flex items-center gap-2">
                          High Priority
                          <span className="px-2 py-0.5 text-xs font-bold bg-red-500/20 text-red-400 rounded-full border border-red-500/30">Urgent</span>
                        </h4>
                        <p className="text-sm text-gray-300 leading-relaxed">3 hot leads haven't been contacted in 48 hours. Follow up now to maintain engagement.</p>
            </div>
            </div>
                  </motion.div>
            
              <motion.div
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="p-5 rounded-xl bg-slate-800/50 border border-white/10 hover:border-white/20 hover:bg-slate-800/70 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/20 shrink-0">
                        <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1.5">Optimization Tip</h4>
                        <p className="text-sm text-gray-300 leading-relaxed">Your email open rate is 34%. Try personalizing subject lines for better engagement.</p>
          </div>
                    </div>
          </motion.div>

          <motion.div
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="p-5 rounded-xl bg-slate-800/50 border border-white/10 hover:border-white/20 hover:bg-slate-800/70 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-green-500/20 shrink-0">
                        <Clock className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                        <h4 className="font-semibold text-white mb-1.5">Best Time to Contact</h4>
                        <p className="text-sm text-gray-300 leading-relaxed">Based on your data, Tuesdays at 10 AM have the highest response rate.</p>
                  </div>
                </div>
                  </motion.div>
              </div>
              </CardContent>
            </Card>
          </motion.div>
            </div>

      </div>

      {/* AI Chat Assistant - Floating Widget */}
      <ChatAssistant />
    </div>
  );
}
