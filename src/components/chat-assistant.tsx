'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  MessageCircle,
  Send,
  Sparkles,
  Minimize2,
  Loader2,
  Calendar,
  Users,
  Mail,
  Phone,
  Target,
  FileText,
  Settings,
  BarChart3,
  Zap,
  CheckCircle2,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter
} from 'lucide-react';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  action?: {
    type: string;
    data?: any;
  };
}

interface ChatAssistantProps {
  pageContext?: string; // Optional context about current page (not currently used, pathname is used instead)
}

export default function ChatAssistant({ pageContext }: ChatAssistantProps) {
  const [showChatAssistant, setShowChatAssistant] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hi! I'm your AI assistant. I can help you with anything in Synapse AI - schedule meetings, manage prospects, send emails, create campaigns, and much more. What can I help you with today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Get current page context safely
  const currentPage = useMemo(() => {
    if (!pathname) return 'dashboard';
    if (pathname.includes('/prospects')) return 'prospects';
    if (pathname.includes('/leads')) return 'leads';
    if (pathname.includes('/cold-mailing')) return 'cold-mailing';
    if (pathname.includes('/cold-calling')) return 'cold-calling';
    if (pathname.includes('/meetings')) return 'meetings';
    if (pathname.includes('/campaigns')) return 'campaigns';
    if (pathname.includes('/linkedin')) return 'linkedin';
    if (pathname.includes('/twitter')) return 'twitter';
    if (pathname.includes('/instagram')) return 'instagram';
    if (pathname.includes('/settings')) return 'settings';
    return 'dashboard';
  }, [pathname]);

  // Enhanced AI Response Generator with page-specific actions
  const generateAIResponse = (userMessage: string): { text: string; action?: { type: string; data?: any } } => {
    const lowerMessage = userMessage.toLowerCase();
    const page = currentPage;

    // Task scheduling
    if (lowerMessage.includes('schedule') || lowerMessage.includes('task') || lowerMessage.includes('todo')) {
      if (lowerMessage.includes('meeting')) {
        return {
          text: `I can help you schedule a meeting! Here's what I need:\n\n1. Who is the meeting with? (prospect name or email)\n2. What date and time works best?\n3. Which platform? (Google Meet, Zoom, or MS Teams)\n4. What's the meeting purpose?\n\nI'll navigate you to the meeting scheduler now.`,
          action: { type: 'navigate', data: '/meetings' }
        };
      }
      return {
        text: `I can help you schedule tasks and meetings! Would you like to:\n\n• Schedule a meeting with a prospect\n• Create a task/reminder\n• Set up a follow-up\n\nWhat would you like to schedule?`,
        action: { type: 'navigate', data: '/meetings' }
      };
    }

    // Page-specific actions
    if (page === 'prospects') {
      if (lowerMessage.includes('add') || lowerMessage.includes('create') || lowerMessage.includes('new')) {
        return {
          text: `I can help you add a new prospect! You can:\n\n• Add a single prospect manually\n• Bulk import prospects via CSV\n• Generate prospects using AI\n\nI'll open the add prospect dialog for you.`,
          action: { type: 'action', data: 'add_prospect' }
        };
      }
      if (lowerMessage.includes('group') || lowerMessage.includes('segment')) {
        return {
          text: `I can help you create groups for your prospects! Groups help you organize prospects by offering, campaign, or any criteria. Would you like to create a new group?`,
          action: { type: 'action', data: 'create_group' }
        };
      }
      if (lowerMessage.includes('outreach') || lowerMessage.includes('campaign') || lowerMessage.includes('start')) {
        return {
          text: `I can help you start an outreach campaign! This will guide you through:\n\n1. Selecting an offering\n2. Choosing or creating a group\n3. Configuring outreach settings\n4. Setting up templates\n\nI'll open the outreach workflow for you.`,
          action: { type: 'action', data: 'start_outreach' }
        };
      }
      if (lowerMessage.includes('filter') || lowerMessage.includes('search')) {
        return {
          text: `I can help you filter and search prospects! You can filter by:\n\n• Status (New, Contacted, Follow-up, etc.)\n• Priority (High, Medium, Low)\n• Offering\n• Assigned To\n• Source\n\nUse the search bar or filters at the top of the table.`,
        };
      }
    }

    if (page === 'leads') {
      if (lowerMessage.includes('convert') || lowerMessage.includes('won') || lowerMessage.includes('lost')) {
        return {
          text: `I can help you convert leads! You can:\n\n• Mark a lead as Won (deal closed)\n• Mark a lead as Lost (deal lost)\n• Revert a lead back to Prospect\n\nClick on any lead to see conversion options.`,
        };
      }
      if (lowerMessage.includes('nurture') || lowerMessage.includes('engage')) {
        return {
          text: `I can help you nurture your leads! The Nurture tab provides:\n\n• Personalized outreach templates\n• AI-enhanced messaging\n• Email scheduling\n• Demo scheduling\n• Proposal creation\n\nClick on a lead and go to the Nurture tab to get started.`,
        };
      }
    }

    if (page === 'cold-mailing') {
      if (lowerMessage.includes('compose') || lowerMessage.includes('send') || lowerMessage.includes('email')) {
        return {
          text: `I can help you compose and send emails! You can:\n\n• Compose a new email\n• Use templates\n• Generate email content with AI\n• Schedule emails\n\nI'll open the compose dialog for you.`,
          action: { type: 'action', data: 'compose_email' }
        };
      }
      if (lowerMessage.includes('template')) {
        return {
          text: `I can help you manage templates! You can:\n\n• View all templates\n• Create new templates\n• Edit existing templates\n• Generate templates with AI\n• Delete templates\n\nI'll navigate you to the templates page.`,
          action: { type: 'navigate', data: '/cold-mailing/templates' }
        };
      }
      if (lowerMessage.includes('analytic') || lowerMessage.includes('performance')) {
        return {
          text: `I can show you email analytics! You'll see:\n\n• Email metrics (sent, opened, replied)\n• Performance by offering\n• Performance by template\n• Activity logs\n\nI'll navigate you to the analytics page.`,
          action: { type: 'navigate', data: '/cold-mailing/analytics' }
        };
      }
    }

    if (page === 'cold-calling') {
      if (lowerMessage.includes('call') || lowerMessage.includes('dial')) {
        return {
          text: `I can help you make calls! You can:\n\n• View your call queue\n• Start a call with a prospect\n• Schedule future calls\n• View call history\n• Listen to call recordings\n\nUse the call interface to get started.`,
        };
      }
      if (lowerMessage.includes('script')) {
        return {
          text: `I can help you create call scripts! You can:\n\n• Generate scripts with AI\n• Customize scripts per prospect\n• Save scripts for reuse\n• View script performance\n\nClick on a prospect to access call scripts.`,
        };
      }
    }

    if (page === 'meetings') {
      if (lowerMessage.includes('schedule') || lowerMessage.includes('new')) {
        return {
          text: `I can help you schedule a meeting! You can:\n\n• Schedule via Google Meet\n• Schedule via Zoom\n• Schedule via MS Teams\n• Set custom date and time\n• Send calendar invites\n\nI'll open the schedule meeting dialog.`,
          action: { type: 'action', data: 'schedule_meeting' }
        };
      }
      if (lowerMessage.includes('mom') || lowerMessage.includes('minutes')) {
        return {
          text: `I can help you view and manage Meeting Minutes of Meeting (MOM)! For past meetings, you can:\n\n• View meeting summary\n• See key discussion points\n• Review action items\n• Get AI-powered next steps\n• Export MOM\n\nClick on any past meeting to view its MOM.`,
        };
      }
    }

    if (page === 'campaigns') {
      if (lowerMessage.includes('create') || lowerMessage.includes('new') || lowerMessage.includes('campaign')) {
        return {
          text: `I can help you create a new email campaign! The campaign wizard includes:\n\n1. Basic Info (name, sender details)\n2. Email Content (templates, AI generation)\n3. Audience Selection (prospects, groups)\n4. Schedule & Settings (timing, tracking)\n\nI'll start the campaign creation wizard for you.`,
          action: { type: 'action', data: 'create_campaign' }
        };
      }
    }

    if (page === 'settings') {
      if (lowerMessage.includes('outreach') || lowerMessage.includes('configure')) {
        return {
          text: `I can help you configure outreach settings! You can:\n\n• View and edit outreach config per offering\n• Add new offerings\n• Configure templates\n• Set up automation\n\nGo to the Outreach tab in settings.`,
        };
      }
      if (lowerMessage.includes('offering') || lowerMessage.includes('product')) {
        return {
          text: `I can help you manage offerings! You can:\n\n• Add new offerings\n• Edit existing offerings\n• Configure outreach for each offering\n• Delete offerings\n\nI'll help you add or edit an offering.`,
          action: { type: 'action', data: 'manage_offering' }
        };
      }
    }

    // General queries
    if (lowerMessage.includes('prospect') && (lowerMessage.includes('total') || lowerMessage.includes('how many'))) {
      return {
        text: `You currently have 2,543 total prospects in your database, which is up by 12.5% compared to last month. Out of these, 847 have converted to leads (34% conversion rate). Would you like me to show you more details?`,
        action: { type: 'navigate', data: '/prospects' }
      };
    }

    if (lowerMessage.includes('lead') && (lowerMessage.includes('total') || lowerMessage.includes('how many'))) {
      return {
        text: `You have 847 total leads, which represents an 8.2% increase from last month. These are prospects who have engaged with your outreach. The breakdown is: Hot leads: 12, Warm leads: 156, Cold leads: 679. Your current win rate is 24.3%.`,
        action: { type: 'navigate', data: '/leads' }
      };
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('what can you')) {
      return {
        text: `I can help you with:\n\n📊 Data & Analytics:\n• "How many prospects do I have?"\n• "What's my win rate?"\n• "Show me analytics"\n\n📅 Actions:\n• "Schedule a meeting"\n• "Add a prospect"\n• "Start outreach"\n• "Create a campaign"\n\n💡 Page-Specific Help:\n• On Prospects: "Add prospect", "Create group", "Start outreach"\n• On Leads: "Convert lead", "Nurture lead"\n• On Cold Mailing: "Compose email", "View templates"\n• On Meetings: "Schedule meeting", "View MOM"\n\nJust ask me anything!`,
      };
    }

    if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
      return {
        text: `Hello! 👋 I'm your AI assistant for Synapse AI. I can help you with:\n\n• Managing prospects and leads\n• Scheduling meetings and tasks\n• Sending emails and campaigns\n• Viewing analytics\n• Configuring settings\n\nWhat would you like to do?`,
      };
    }

    // Default response
    return {
      text: `I understand you're asking about "${userMessage}". I can help you with various tasks depending on the page you're on. Try asking:\n\n• "Schedule a meeting"\n• "Add a prospect" (on Prospects page)\n• "Compose email" (on Cold Mailing page)\n• "Create campaign" (on Campaigns page)\n• "Help" (to see all capabilities)\n\nOr be more specific about what you'd like to do!`,
    };
  };

  const handleSendMessage = async () => {
    const messageText = chatInput.trim();
    if (!messageText) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText);
      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        text: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        action: aiResponse.action
      };

      setChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Handle navigation actions
      if (aiResponse.action?.type === 'navigate' && aiResponse.action?.data) {
        setTimeout(() => {
          router.push(aiResponse.action!.data);
        }, 500);
      }

      // Handle page-specific actions (these would trigger callbacks in the future)
      if (aiResponse.action?.type === 'action') {
        // In a real app, you'd emit events or use callbacks here
        console.log('Action requested:', aiResponse.action.data);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setChatInput(question);
    setTimeout(() => {
      chatInputRef.current?.focus();
    }, 100);
  };

  // Get page-specific quick questions
  const getQuickQuestions = () => {
    const baseQuestions = [
      { text: '📊 Show Stats', question: 'How many prospects do I have?' },
      { text: '📅 Schedule', question: 'Schedule a meeting' },
      { text: '💡 Help', question: 'What can you help me with?' }
    ];

    const pageQuestions: Record<string, Array<{ text: string; question: string }>> = {
      prospects: [
        { text: '➕ Add', question: 'Add a new prospect' },
        { text: '🚀 Outreach', question: 'Start outreach campaign' },
        { text: '👥 Group', question: 'Create a group' }
      ],
      leads: [
        { text: '🎯 Convert', question: 'How do I convert a lead?' },
        { text: '💌 Nurture', question: 'Help me nurture a lead' },
        { text: '📈 Analytics', question: 'Show lead analytics' }
      ],
      'cold-mailing': [
        { text: '✉️ Compose', question: 'Compose a new email' },
        { text: '📝 Templates', question: 'Show me templates' },
        { text: '📊 Analytics', question: 'Show email analytics' }
      ],
      'cold-calling': [
        { text: '📞 Call', question: 'Help me make a call' },
        { text: '📜 Script', question: 'Generate a call script' },
        { text: '📋 History', question: 'Show call history' }
      ],
      meetings: [
        { text: '📅 Schedule', question: 'Schedule a new meeting' },
        { text: '📄 MOM', question: 'View meeting minutes' },
        { text: '📊 Upcoming', question: 'Show upcoming meetings' }
      ],
      campaigns: [
        { text: '➕ Create', question: 'Create a new campaign' },
        { text: '📊 Performance', question: 'Show campaign performance' },
        { text: '📝 Templates', question: 'Manage templates' }
      ],
      settings: [
        { text: '⚙️ Configure', question: 'Configure outreach settings' },
        { text: '➕ Offering', question: 'Add a new offering' },
        { text: '📊 Analytics', question: 'View analytics by offering' }
      ]
    };

    return [...(pageQuestions[currentPage] || []), ...baseQuestions].slice(0, 4);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
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
                  <p className="text-xs text-cyan-100">
                    {currentPage === 'dashboard' ? 'Always here to help' : `Helping with ${currentPage}`}
                  </p>
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
                {getQuickQuestions().map((q, idx) => (
                  <Button
                    key={idx}
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickQuestion(q.question)}
                    className="bg-white/5 border-white/10 text-white hover:bg-white/10 whitespace-nowrap text-xs"
                  >
                    {q.text}
                  </Button>
                ))}
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
                      {message.action && message.action.type === 'navigate' && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <Link href={message.action.data || '#'}>
                            <Button
                              size="sm"
                              className={`w-full ${
                                message.sender === 'user'
                                  ? 'bg-white/20 hover:bg-white/30 text-white'
                                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                              }`}
                            >
                              Navigate to {message.action.data?.replace('/', '') || 'Page'}
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
      </AnimatePresence>
    </div>
  );
}

