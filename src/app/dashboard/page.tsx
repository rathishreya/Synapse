'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Link from 'next/link';
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
  MessageCircle,
  Send,
  Sparkles,
  Minimize2,
  Loader2,
  ArrowUpRight,
  Zap
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';

export default function DashboardPage() {
  const [showAddLead, setShowAddLead] = useState(false);
  const [addLeadMethod, setAddLeadMethod] = useState<'single' | 'import' | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  
  // AI Chat Assistant State
  const [showChatAssistant, setShowChatAssistant] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{
    id: number;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    action?: {
      type: 'schedule_meeting' | 'view_prospects' | 'send_email' | 'view_analytics';
      data?: any;
    };
  }>>([
    {
      id: 1,
      text: "Hi! I'm your AI assistant. I can help you understand your dashboard data, schedule meetings, manage prospects, and more. What can I help you with today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);

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
    { icon: Mail, label: 'Cold Mailing', color: 'from-blue-500 to-blue-600', href: '/cold-mailing' },
    { icon: Phone, label: 'Cold Call', color: 'from-green-500 to-green-600', href: '/cold-calling' },
    { icon: Calendar, label: 'Schedule Meeting', color: 'from-purple-500 to-purple-600', href: '/meetings' },
    { icon: Activity, label: 'Email Campaign', color: 'from-orange-500 to-orange-600', href: '/campaigns' }
  ];

  const activeLeads = [
    { name: 'John Smith', company: 'Acme Corp', status: 'Hot', lastContact: '2 hours ago', email: 'john@acme.com' },
    { name: 'Sarah Johnson', company: 'Tech Startup', status: 'Warm', lastContact: '1 day ago', email: 'sarah@techstartup.com' },
    { name: 'Mike Wilson', company: 'Big Enterprise', status: 'Cold', lastContact: '3 days ago', email: 'mike@bigenterprise.com' },
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

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // AI Response Generator
  const generateAIResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Dashboard stats queries
    if (lowerMessage.includes('prospect') && (lowerMessage.includes('total') || lowerMessage.includes('how many'))) {
      return {
        text: `You currently have 2,543 total prospects in your database, which is up by 12.5% compared to last month. Out of these, 847 have converted to leads (34% conversion rate). Would you like me to show you more details about any specific segment?`,
        action: { type: 'view_prospects' as const }
      };
    }
    
    if (lowerMessage.includes('lead') && (lowerMessage.includes('total') || lowerMessage.includes('how many'))) {
      return {
        text: `You have 847 total leads, which represents an 8.2% increase from last month. These are prospects who have engaged with your outreach. The breakdown is: Hot leads: 12, Warm leads: 156, Cold leads: 679. Your current win rate is 24.3%.`,
        action: { type: 'view_prospects' as const }
      };
    }
    
    if (lowerMessage.includes('campaign')) {
      return {
        text: `You have 12 active campaigns running right now, which is an increase of 3 campaigns from last month. Your most successful campaign is "Q1 Enterprise Outreach" with a 49.5% open rate and 10% reply rate. Would you like to see detailed analytics?`,
        action: { type: 'view_analytics' as const }
      };
    }
    
    if (lowerMessage.includes('follow') || lowerMessage.includes('due')) {
      return {
        text: `You have 34 follow-ups due today and in the next few days. Here are the top priorities:\n\n1. Acme Corp - Due today (Hot lead)\n2. Tech Startup - Due today (Warm lead)\n3. Big Enterprise - Due tomorrow (Cold lead)\n\nWould you like me to help you draft follow-up emails for any of these?`
      };
    }
    
    if (lowerMessage.includes('win rate') || lowerMessage.includes('conversion')) {
      return {
        text: `Your current win rate is 24.3%, which is up 2.1% from last month! This means you're successfully converting about 1 in 4 qualified leads. Your best performing offering is Enterprise AI Platform with a 31% win rate. Keep up the great work!`
      };
    }
    
    // Meeting scheduling
    if (lowerMessage.includes('schedule') && lowerMessage.includes('meeting')) {
      return {
        text: `I can help you schedule a meeting! Here's what I need:\n\n1. Who is the meeting with? (prospect name or email)\n2. What date and time works best?\n3. Which platform? (Google Meet, Zoom, or MS Teams)\n4. What's the meeting purpose?\n\nYou can also click the button below to open the full scheduling interface.`,
        action: { type: 'schedule_meeting' as const }
      };
    }
    
    if (lowerMessage.includes('schedule') || lowerMessage.includes('meeting')) {
      return {
        text: `I can help you schedule meetings! You can:\n\n• Schedule a new meeting with a prospect\n• View your upcoming meetings\n• Reschedule existing meetings\n\nWould you like to schedule a meeting now? Just let me know the prospect's name and your preferred time.`,
        action: { type: 'schedule_meeting' as const }
      };
    }
    
    // Email queries
    if (lowerMessage.includes('email') || lowerMessage.includes('mail')) {
      return {
        text: `I can help with email-related tasks:\n\n• Your email open rate is currently 34%\n• Your reply rate is at 8.2%\n• You have 12 active email campaigns\n\nWould you like to compose a new email, view analytics, or check your inbox?`,
        action: { type: 'send_email' as const }
      };
    }
    
    // Analytics
    if (lowerMessage.includes('analytic') || lowerMessage.includes('performance') || lowerMessage.includes('report')) {
      return {
        text: `Here's a quick performance summary:\n\n📊 This Month:\n• Prospects: 2,543 (+12.5%)\n• Leads: 847 (+8.2%)\n• Active Campaigns: 12\n• Win Rate: 24.3% (+2.1%)\n\n🔥 Top Performers:\n• Best campaign: "Q1 Enterprise Outreach"\n• Best day: Tuesdays at 10 AM\n• Best offering: Enterprise AI Platform\n\nWant detailed analytics for any specific area?`,
        action: { type: 'view_analytics' as const }
      };
    }
    
    // Hot leads
    if (lowerMessage.includes('hot') || lowerMessage.includes('priority')) {
      return {
        text: `You have 3 hot leads that need immediate attention:\n\n1. John Smith from Acme Corp\n   Last contact: 2 hours ago\n   Action: Follow up today\n\n2. Sarah Johnson from Tech Startup\n   Last contact: 1 day ago\n   Action: Send proposal\n\n3. Mike Wilson from Big Enterprise\n   Last contact: 3 days ago\n   Action: Schedule call\n\nWould you like me to help you reach out to any of these?`
      };
    }
    
    // AI insights
    if (lowerMessage.includes('insight') || lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
      return {
        text: `Based on your data, here are my top recommendations:\n\n1. 🔥 High Priority: 3 hot leads haven't been contacted in 48 hours - follow up now!\n\n2. 📧 Optimization: Your email open rate is 34%. Try personalizing subject lines for better engagement.\n\n3. ⏰ Best Time: Your data shows Tuesdays at 10 AM have the highest response rate.\n\nWant me to help implement any of these?`
      };
    }
    
    // Greeting
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
      return {
        text: `Hello! 👋 I'm here to help you with your sales dashboard. I can:\n\n• Answer questions about your metrics\n• Schedule meetings\n• Provide insights and recommendations\n• Help with prospect management\n• Assist with campaigns\n\nWhat would you like to know?`
      };
    }
    
    // Help
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you')) {
      return {
        text: `I can help you with:\n\n📊 Dashboard Queries:\n• "How many prospects do I have?"\n• "What's my win rate?"\n• "Show me my campaigns"\n\n📅 Actions:\n• "Schedule a meeting"\n• "Send an email"\n• "View analytics"\n\n💡 Insights:\n• "Give me recommendations"\n• "Show hot leads"\n• "What should I prioritize?"\n\nJust ask me anything!`
      };
    }
    
    // Default response
    return {
      text: `I understand you're asking about "${userMessage}". While I can provide information about your prospects, leads, campaigns, meetings, and performance metrics, I need a bit more context. Could you rephrase your question or try asking:\n\n• "How many prospects do I have?"\n• "Schedule a meeting"\n• "Show me my campaign performance"\n• "What are my hot leads?"`
    };
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      text: chatInput,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);
    
    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(chatInput);
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse.text,
        sender: 'ai' as const,
        timestamp: new Date(),
        action: aiResponse.action
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleQuickQuestion = (question: string) => {
    setChatInput(question);
    chatInputRef.current?.focus();
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

        {/* Active Leads Table - Premium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl hover:border-white/20 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-br from-violet-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
            <CardHeader className="relative border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white">Active Leads</CardTitle>
                    <CardDescription className="text-gray-400 text-sm">Recent lead activity and status</CardDescription>
                  </div>
                </div>
                <Link href="/prospects">
                  <Button variant="outline" size="sm" className="border-white/10 bg-slate-800/50 text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300">
                    View All <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="relative p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-slate-800/30">
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Company</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Last Contact</th>
                      <th className="text-right py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeLeads.map((lead, index) => (
                      <motion.tr 
                        key={index} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ backgroundColor: 'rgba(6, 182, 212, 0.03)' }}
                        className="border-b border-white/5 transition-all duration-200 cursor-pointer"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                              {lead.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm font-semibold text-white">{lead.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-300">{lead.company}</td>
                        <td className="py-4 px-6 text-sm text-gray-400">{lead.email}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                            lead.status === 'Hot' 
                              ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                            lead.status === 'Warm' 
                              ? 'bg-orange-500/10 text-orange-400 border-orange-500/30' :
                              'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-400">{lead.lastContact}</td>
                        <td className="py-4 px-6 text-right">
                          <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
                            Contact
                            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Chat Assistant - Floating Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {showChatAssistant ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[420px] h-[600px] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-2xl"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-cyan-600 animate-pulse"></div>
                </div>
                <div>
                  <h3 className="font-bold text-white">AI Assistant</h3>
                  <p className="text-xs text-cyan-100">Always here to help</p>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowChatAssistant(false)}
                className="text-white hover:bg-white/20"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Quick Questions */}
            <div className="p-3 bg-slate-800/30 border-b border-white/10 overflow-x-auto">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuickQuestion('How many prospects do I have?')}
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 whitespace-nowrap text-xs"
                >
                  📊 Prospects
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuickQuestion('Schedule a meeting')}
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 whitespace-nowrap text-xs"
                >
                  📅 Schedule
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuickQuestion('Show hot leads')}
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 whitespace-nowrap text-xs"
                >
                  🔥 Hot Leads
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuickQuestion('Give me recommendations')}
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 whitespace-nowrap text-xs"
                >
                  💡 Insights
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    {message.sender === 'ai' && (
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-xs text-gray-400">AI Assistant</span>
                      </div>
                    )}
                    <div
                      className={`rounded-2xl p-3 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white'
                          : 'bg-slate-800/50 border border-white/10 text-gray-200'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                      {message.action && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <Link
                            href={
                              message.action.type === 'schedule_meeting' ? '/meetings' :
                              message.action.type === 'view_prospects' ? '/prospects' :
                              message.action.type === 'send_email' ? '/cold-mailing' :
                              message.action.type === 'view_analytics' ? '/cold-mailing/analytics' :
                              '/dashboard'
                            }
                          >
                            <Button
                              size="sm"
                              className={`w-full ${
                                message.sender === 'user'
                                  ? 'bg-white/20 hover:bg-white/30 text-white'
                                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                              }`}
                            >
                              {message.action.type === 'schedule_meeting' && '📅 Open Meeting Scheduler'}
                              {message.action.type === 'view_prospects' && '👥 View All Prospects'}
                              {message.action.type === 'send_email' && '📧 Go to Email'}
                              {message.action.type === 'view_analytics' && '📊 View Analytics'}
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                    {message.sender === 'user' && (
                      <div className="text-xs text-gray-500 mt-1 text-right">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[85%]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs text-gray-400">AI Assistant</span>
                    </div>
                    <div className="rounded-2xl p-3 bg-slate-800/50 border border-white/10">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-slate-800/30 border-t border-white/10">
              <div className="flex gap-2">
                <Textarea
                  ref={chatInputRef}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-slate-900/50 border-white/10 text-white resize-none min-h-[44px] max-h-[120px]"
                  rows={1}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim() || isTyping}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50"
                  size="icon"
                >
                  {isTyping ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Press Enter to send, Shift+Enter for new line
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowChatAssistant(true)}
            className="relative group"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300">
              <MessageCircle className="w-7 h-7 text-white" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-20 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap pointer-events-none border border-white/10"
            >
              <p className="text-sm font-medium">Ask AI Assistant</p>
              <p className="text-xs text-gray-400">I can help with anything!</p>
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-l-8 border-l-slate-900 border-b-8 border-b-transparent"></div>
            </motion.div>
          </motion.button>
        )}
      </div>
    </div>
  );
}
