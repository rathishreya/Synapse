'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import ChatAssistant from '@/components/chat-assistant';
import {
  ArrowLeft,
  Search,
  Filter,
  Target,
  TrendingUp,
  TrendingDown,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  User,
  Building,
  Sparkles,
  Eye,
  Edit,
  Save,
  Activity,
  Bot,
  Send,
  FileText,
  Link2,
  ExternalLink,
  Zap,
  MessageSquare,
  Mic,
  PlayCircle,
  StopCircle,
  X,
  Plus,
  Star,
  Award,
  TrendingDown as TrendingDownIcon,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Gift,
  Handshake,
  XCircle,
  Timer,
  Flame,
  BarChart3,
  Users,
  MailCheck,
  PhoneCall,
  Video,
  FileCheck,
  DollarSign,
  Percent,
  Clock3,
  Heart,
  ThumbsUp,
  MessageCircle,
  CalendarCheck,
  Rocket,
  Brain,
  Lightbulb,
  ArrowRight,
  ChevronRight,
  Download,
  Upload,
  File,
  CheckSquare,
  Square,
  CalendarDays,
  Clock4,
  Share2,
  Copy,
  MoreVertical,
  Bell,
  Tag,
  Folder,
  Image as ImageIcon,
  FileText as FileTextIcon,
  Play,
  Pause,
  Volume2,
  DownloadCloud,
  Paperclip,
  Send as SendIcon,
  Reply,
  Forward,
  Archive,
  Trash2,
  Star as StarIcon,
  Flag,
  AlertTriangle,
  Info,
  TrendingDown as TrendingDownIcon2,
  BarChart2,
  PieChart,
  LineChart,
  UserPlus,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LeadsPage() {
  const router = useRouter();
  const [selectedOffering, setSelectedOffering] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  
  // Lead detail dialog states
  const [showLeadDetail, setShowLeadDetail] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [detailTab, setDetailTab] = useState('engagement');
  
  // Conversion states
  const [showConvertDialog, setShowConvertDialog] = useState(false);
  const [convertAction, setConvertAction] = useState<'to-prospect' | 'to-won' | 'to-lost' | null>(null);
  
  // Quick actions
  const [showQuickAction, setShowQuickAction] = useState(false);
  const [quickActionType, setQuickActionType] = useState<'meeting' | 'proposal' | 'demo' | null>(null);
  
  // Additional features states
  const [emailHistory, setEmailHistory] = useState<any[]>([]);
  const [callHistory, setCallHistory] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [notes, setNotes] = useState('');
  const [newNote, setNewNote] = useState('');
  const [showScheduleMeeting, setShowScheduleMeeting] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddDocument, setShowAddDocument] = useState(false);
  
  // Outreach states
  const [showStartOutreach, setShowStartOutreach] = useState(false);
  const [showBulkOutreach, setShowBulkOutreach] = useState(false);
  const [showWorkflowBuilder, setShowWorkflowBuilder] = useState(false);
  const [selectedLeadForWorkflow, setSelectedLeadForWorkflow] = useState<any>(null);
  const [outreachStep, setOutreachStep] = useState<0 | 0.5 | 1 | 2>(0);
  const [outreachOffering, setOutreachOffering] = useState('');
  const [outreachGroup, setOutreachGroup] = useState('');
  const [outreachMethod, setOutreachMethod] = useState<'manual' | 'ai' | null>(null);
  const [outreachChannels, setOutreachChannels] = useState<string[]>([]);
  const [followUpCount, setFollowUpCount] = useState('');
  const [followUpFrequency, setFollowUpFrequency] = useState('');
  const [timeOfFollowUp, setTimeOfFollowUp] = useState('');
  const [startTime, setStartTime] = useState('');
  const [customDate, setCustomDate] = useState('');
  const [customTime, setCustomTime] = useState('');
  const [outreachTemplates, setOutreachTemplates] = useState<Record<string, string>>({});
  const [outreachCurrentOfferingIndex, setOutreachCurrentOfferingIndex] = useState(0);
  const [bulkOutreachMode, setBulkOutreachMode] = useState<'automated' | 'manual'>('automated');
  const [customFollowUpCount, setCustomFollowUpCount] = useState('');
  const [customFrequency, setCustomFrequency] = useState('');
  const [testFrom, setTestFrom] = useState('');
  const [testTo, setTestTo] = useState('');
  const [testSubject, setTestSubject] = useState('');
  const [testBody, setTestBody] = useState('');
  const [showCreateGroupInOutreach, setShowCreateGroupInOutreach] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [groups, setGroups] = useState<Array<{
    id: string;
    name: string;
    description: string;
    offering: string;
    prospectIds: number[];
  }>>([]);
  
  // Bulk actions states
  const [showBulkAssign, setShowBulkAssign] = useState(false);
  const [showBulkStatus, setShowBulkStatus] = useState(false);
  const [showBulkPriority, setShowBulkPriority] = useState(false);
  const [bulkAssignTo, setBulkAssignTo] = useState('');
  const [bulkStatus, setBulkStatus] = useState('');
  const [bulkPriority, setBulkPriority] = useState('');
  
  // Email Campaign states (for bulk outreach)
  const [campaignStep, setCampaignStep] = useState<'basic' | 'content' | 'audience' | 'schedule'>('basic');
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
    audienceType: 'selected', // selected, all, groups, custom
    selectedGroups: [] as string[],
    scheduleType: 'now', // now, scheduled, drip
    scheduleDate: '',
    scheduleTime: '',
    followUpEnabled: false,
    followUpCount: '2',
    followUpInterval: '3',
    trackOpens: true,
    trackClicks: true,
    unsubscribeLink: true
  });

  const offerings = [
    { id: 'all', name: 'All Offerings' },
    { id: 'enterprise', name: 'Enterprise Solutions' },
    { id: 'saas', name: 'SaaS Products' },
    { id: 'consulting', name: 'Consulting Services' }
  ];

  // Enhanced leads data with engagement metrics
  const leads = [
    {
      id: 1,
      name: 'John Smith',
      company: 'Acme Corp',
      email: 'john@acme.com',
      phone: '+1 555-0101',
      linkedinUrl: 'https://linkedin.com/in/johnsmith',
      websiteUrl: 'https://acme.com',
      offering: 'enterprise',
      status: 'Hot Lead',
      priority: 'High',
      assignedTo: 'Sarah J.',
      leadScore: 92,
      conversionProbability: 85,
      engagementScore: 95,
      lastContact: '2 hours ago',
      acknowledgedAt: '2025-01-20 10:30 AM',
      responseType: 'Email Reply',
      createdAt: '2025-01-15',
      updatedAt: '2025-01-20',
      notes: 'Very interested in enterprise package. Requested pricing details.',
      engagementHistory: [
        { type: 'email_reply', time: '2 hours ago', content: 'Interested in learning more' },
        { type: 'email_opened', time: '5 hours ago', content: 'Opened pricing email' },
        { type: 'email_sent', time: '1 day ago', content: 'Initial outreach sent' }
      ],
      nextBestAction: 'Schedule Demo',
      daysAsLead: 5,
      responseTime: '2 hours',
      emailOpens: 8,
      emailClicks: 3,
      callCount: 1,
      meetingScheduled: true,
      proposalSent: false,
      estimatedValue: 50000,
      winProbability: 85
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      company: 'Tech Startup',
      email: 'sarah@techstartup.com',
      phone: '+1 555-0102',
      linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
      websiteUrl: 'https://techstartup.com',
      offering: 'saas',
      status: 'Warm Lead',
      priority: 'High',
      assignedTo: 'Mike W.',
      leadScore: 88,
      conversionProbability: 72,
      engagementScore: 82,
      lastContact: '1 day ago',
      acknowledgedAt: '2025-01-19 03:15 PM',
      responseType: 'Email Reply',
      createdAt: '2025-01-16',
      updatedAt: '2025-01-19',
      notes: 'Scheduled demo for next week. Very interested in SaaS solution.',
      engagementHistory: [
        { type: 'meeting_scheduled', time: '1 day ago', content: 'Demo scheduled for Jan 25' },
        { type: 'email_reply', time: '2 days ago', content: 'Available next week' },
        { type: 'email_opened', time: '3 days ago', content: 'Opened follow-up email' }
      ],
      nextBestAction: 'Prepare Demo',
      daysAsLead: 3,
      responseTime: '4 hours',
      emailOpens: 5,
      emailClicks: 2,
      callCount: 0,
      meetingScheduled: true,
      proposalSent: false,
      estimatedValue: 25000,
      winProbability: 72
    },
    {
      id: 3,
      name: 'Michael Brown',
      company: 'DataFlow Systems',
      email: 'mbrown@dataflow.com',
      phone: '+1 555-0103',
      linkedinUrl: 'https://linkedin.com/in/michaelbrown',
      websiteUrl: 'https://dataflow.com',
      offering: 'consulting',
      status: 'Hot Lead',
      priority: 'High',
      assignedTo: 'Alex K.',
      leadScore: 95,
      conversionProbability: 92,
      engagementScore: 98,
      lastContact: '3 days ago',
      acknowledgedAt: '2025-01-17 11:20 AM',
      responseType: 'Email Reply',
      createdAt: '2025-01-10',
      updatedAt: '2025-01-17',
      notes: 'High-value lead. Proposal sent. Waiting for response.',
      engagementHistory: [
        { type: 'proposal_sent', time: '3 days ago', content: 'Custom proposal delivered' },
        { type: 'meeting_completed', time: '5 days ago', content: 'Discovery call completed' },
        { type: 'email_reply', time: '7 days ago', content: 'Requested proposal' }
      ],
      nextBestAction: 'Follow-up on Proposal',
      daysAsLead: 10,
      responseTime: '1 hour',
      emailOpens: 12,
      emailClicks: 6,
      callCount: 2,
      meetingScheduled: false,
      proposalSent: true,
      estimatedValue: 100000,
      winProbability: 92
    },
    {
      id: 4,
      name: 'Emily Chen',
      company: 'TechStart Inc',
      email: 'emily@techstart.com',
      phone: '+1 555-0104',
      linkedinUrl: 'https://linkedin.com/in/emilychen',
      websiteUrl: 'https://techstart.com',
      offering: 'enterprise',
      status: 'Warm Lead',
      priority: 'Medium',
      assignedTo: 'Sarah J.',
      leadScore: 78,
      conversionProbability: 58,
      engagementScore: 65,
      lastContact: '5 hours ago',
      acknowledgedAt: '2025-01-21 09:45 AM',
      responseType: 'Email Reply',
      createdAt: '2025-01-16',
      updatedAt: '2025-01-21',
      notes: 'Needs more information. Follow-up scheduled.',
      engagementHistory: [
        { type: 'email_reply', time: '5 hours ago', content: 'Need more details' },
        { type: 'email_opened', time: '1 day ago', content: 'Opened information email' }
      ],
      nextBestAction: 'Send Case Studies',
      daysAsLead: 5,
      responseTime: '8 hours',
      emailOpens: 4,
      emailClicks: 1,
      callCount: 0,
      meetingScheduled: false,
      proposalSent: false,
      estimatedValue: 35000,
      winProbability: 58
    },
    {
      id: 5,
      name: 'David Martinez',
      company: 'Cloud Solutions',
      email: 'david@cloudsolutions.com',
      phone: '+1 555-0105',
      linkedinUrl: 'https://linkedin.com/in/davidmartinez',
      websiteUrl: 'https://cloudsolutions.com',
      offering: 'saas',
      status: 'Cold Lead',
      priority: 'Medium',
      assignedTo: 'Mike W.',
      leadScore: 65,
      conversionProbability: 35,
      engagementScore: 45,
      lastContact: '3 days ago',
      acknowledgedAt: '2025-01-20 02:10 PM',
      responseType: 'Email Reply',
      createdAt: '2025-01-18',
      updatedAt: '2025-01-20',
      notes: 'Qualified lead. Interested in cloud-based SaaS solution.',
      engagementHistory: [
        { type: 'email_reply', time: '3 days ago', content: 'Will review and get back' },
        { type: 'email_opened', time: '4 days ago', content: 'Opened initial email' }
      ],
      nextBestAction: 'Re-engage with Value',
      daysAsLead: 2,
      responseTime: '12 hours',
      emailOpens: 2,
      emailClicks: 0,
      callCount: 0,
      meetingScheduled: false,
      proposalSent: false,
      estimatedValue: 15000,
      winProbability: 35
    }
  ];

  const stats = [
    { 
      label: 'Total Leads', 
      value: leads.length.toString(), 
      change: '+15.2%', 
      trend: 'up',
      icon: Target,
      color: 'from-emerald-500 to-teal-600'
    },
    { 
      label: 'Hot Leads', 
      value: leads.filter(l => l.status === 'Hot Lead').length.toString(), 
      change: '+8.5%', 
      trend: 'up',
      icon: Flame,
      color: 'from-orange-500 to-red-600'
    },
    { 
      label: 'Conversion Rate', 
      value: '24.3%', 
      change: '+3.2%', 
      trend: 'up',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-600'
    },
    { 
      label: 'Avg Engagement', 
      value: Math.round(leads.reduce((acc, l) => acc + l.engagementScore, 0) / leads.length).toString() + '%', 
      change: '+5.1%', 
      trend: 'up',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot Lead': return 'bg-gradient-to-r from-orange-500/20 to-red-600/20 text-orange-400 border-orange-500/30';
      case 'Warm Lead': return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border-yellow-500/30';
      case 'Cold Lead': return 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500/20 text-red-400';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'Low': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getEngagementIcon = (type: string) => {
    switch (type) {
      case 'email_reply': return MailCheck;
      case 'email_opened': return Mail;
      case 'email_sent': return Send;
      case 'meeting_scheduled': return CalendarCheck;
      case 'meeting_completed': return Video;
      case 'proposal_sent': return FileCheck;
      case 'call_completed': return PhoneCall;
      default: return Activity;
    }
  };

  const filteredLeads = selectedOffering === 'all' 
    ? leads 
    : leads.filter(lead => lead.offering === selectedOffering);

  const openLeadDetail = (lead: any, tab: string = 'engagement') => {
    // Navigate to the lead detail page with the tab as a query parameter
    router.push(`/leads/${lead.id}?tab=${tab}`);
  };

  const toggleLeadSelection = (id: number) => {
    setSelectedLeads(prev =>
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  const handleConvert = (action: 'to-prospect' | 'to-won' | 'to-lost') => {
    setConvertAction(action);
    setShowConvertDialog(true);
  };

  // Quick action handlers
  const handleSendEmail = () => {
    setDetailTab('emails');
    // Scroll to compose button or trigger compose
    console.log('Send email to:', selectedLead?.email);
  };

  const handleCallNow = () => {
    setDetailTab('calls');
    console.log('Calling:', selectedLead?.phone);
  };

  const handleSchedule = () => {
    setShowScheduleMeeting(true);
  };

  const handleSendProposal = () => {
    setShowQuickAction(true);
    setQuickActionType('proposal');
  };

  // Task handlers
  const [taskForm, setTaskForm] = useState({ title: '', due: '', priority: 'medium' });
  
  const handleAddTask = () => {
    if (taskForm.title.trim()) {
      const newTask = {
        id: tasks.length + 1,
        title: taskForm.title,
        due: taskForm.due || new Date().toISOString().split('T')[0],
        completed: false,
        priority: taskForm.priority
      };
      setTasks([...tasks, newTask]);
      setTaskForm({ title: '', due: '', priority: 'medium' });
      setShowAddTask(false);
    }
  };

  // Document handlers
  const handleUploadDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDoc = {
        id: documents.length + 1,
        name: file.name,
        type: file.type.includes('pdf') ? 'pdf' : 'doc',
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        uploaded: 'Just now'
      };
      setDocuments([...documents, newDoc]);
      setShowAddDocument(false);
    }
  };

  // Email handlers
  const handleComposeEmail = () => {
    console.log('Compose email to:', selectedLead?.email);
    // Could open a compose dialog or navigate
  };

  const handleViewEmail = (emailId: number) => {
    console.log('View email:', emailId);
  };

  const handleReplyEmail = (emailId: number) => {
    console.log('Reply to email:', emailId);
  };

  // Call handlers
  const handleScheduleCall = () => {
    setShowScheduleMeeting(true);
  };

  const handlePlayRecording = (callId: number) => {
    console.log('Play recording for call:', callId);
  };

  // Next best action handler
  const handleNextBestAction = () => {
    console.log('Execute next best action:', selectedLead?.nextBestAction);
    // Could trigger the recommended action
  };

  // Nurture handlers
  const handleSendNurtureEmail = () => {
    console.log('Send nurture email');
  };

  const handleGenerateNurtureContent = () => {
    console.log('Generate AI nurture content');
  };

  // Bulk action handler
  const applyBulkAction = (action: 'assign' | 'status' | 'priority') => {
    if (action === 'assign') {
      console.log(`Assigning ${selectedLeads.length} leads to ${bulkAssignTo}`);
      setShowBulkAssign(false);
      setSelectedLeads([]);
      setBulkAssignTo('');
    } else if (action === 'status') {
      console.log(`Updating status for ${selectedLeads.length} leads to ${bulkStatus}`);
      setShowBulkStatus(false);
      setSelectedLeads([]);
      setBulkStatus('');
    } else if (action === 'priority') {
      console.log(`Updating priority for ${selectedLeads.length} leads to ${bulkPriority}`);
      setShowBulkPriority(false);
      setSelectedLeads([]);
      setBulkPriority('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Premium Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      {/* Premium Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-white/10 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50"
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
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30"
                >
                  <Star className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    Leads Management
                  </h1>
                  <p className="text-sm text-gray-400">Your engaged prospects - nurture them to close</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {selectedLeads.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowBulkOutreach(true)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-medium shadow-lg shadow-emerald-500/30"
                >
                  <Send className="w-4 h-4 mr-2 inline" />
                  Bulk Outreach ({selectedLeads.length})
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setShowStartOutreach(true);
                  setOutreachStep(0);
                }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-medium shadow-lg shadow-emerald-500/30"
              >
                <Zap className="w-4 h-4 mr-2 inline" />
                Start Outreach
              </motion.button>
              <Button
                variant="outline"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="bg-slate-800/50 border-white/10 text-white"
              >
                {viewMode === 'grid' ? 'List View' : 'Grid View'}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Premium Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-white/10 backdrop-blur-xl overflow-hidden relative group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  <CardContent className="p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <p className={`text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {stat.change} from last month
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bulk Actions Bar */}
        {selectedLeads.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-gradient-to-r from-emerald-500/10 to-teal-600/10 border border-emerald-500/30 rounded-lg backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} selected
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedLeads([])}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowBulkAssign(true)}
                  className="text-white hover:text-emerald-400"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Assign
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowBulkStatus(true)}
                  className="text-white hover:text-emerald-400"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Status
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowBulkPriority(true)}
                  className="text-white hover:text-emerald-400"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Priority
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowBulkOutreach(true)}
                  className="text-white hover:text-emerald-400"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Outreach
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filters & Search */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search leads by name, company, or email..."
              className="pl-10 bg-slate-900/50 border-white/10 text-white backdrop-blur-xl"
            />
          </div>
          <Select value={selectedOffering} onValueChange={setSelectedOffering}>
            <SelectTrigger className="w-48 bg-slate-900/50 border-white/10 text-white backdrop-blur-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {offerings.map(offering => (
                <SelectItem key={offering.id} value={offering.id}>
                  {offering.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-slate-900/50 border-white/10 text-white backdrop-blur-xl">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Leads Grid View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLeads.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => openLeadDetail(lead)}
                className="cursor-pointer"
              >
                <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-white/10 backdrop-blur-xl h-full overflow-hidden relative group">
                  {/* Status Indicator Bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${
                    lead.status === 'Hot Lead' ? 'bg-gradient-to-r from-orange-500 to-red-600' :
                    lead.status === 'Warm Lead' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                    'bg-gradient-to-r from-blue-500 to-cyan-500'
                  }`} />
                  
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={selectedLeads.includes(lead.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedLeads([...selectedLeads, lead.id]);
                            } else {
                              setSelectedLeads(selectedLeads.filter(id => id !== lead.id));
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/30">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-lg">{lead.name}</h3>
                          <p className="text-sm text-gray-400">{lead.company}</p>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(lead.status)} text-xs border font-medium`}>
                        {lead.status}
                      </Badge>
                    </div>

                    {/* Conversion Probability */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">Win Probability</span>
                        <span className="text-sm font-semibold text-emerald-400">{lead.winProbability}%</span>
                      </div>
                      <Progress value={lead.winProbability} className="h-2 bg-slate-800" />
                    </div>

                    {/* Engagement Metrics */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="p-2 rounded-lg bg-slate-800/50 text-center">
                        <Mail className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-400">Opens</p>
                        <p className="text-sm font-semibold text-white">{lead.emailOpens}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-800/50 text-center">
                        <Phone className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-400">Calls</p>
                        <p className="text-sm font-semibold text-white">{lead.callCount}</p>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-800/50 text-center">
                        <DollarSign className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-400">Value</p>
                        <p className="text-sm font-semibold text-white">${(lead.estimatedValue / 1000).toFixed(0)}k</p>
                      </div>
                    </div>

                    {/* Next Best Action */}
                    <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-500/10 to-teal-600/10 border border-emerald-500/20 mb-4">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs text-gray-300">Next:</span>
                        <span className="text-xs font-semibold text-emerald-400">{lead.nextBestAction}</span>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuickActionType('meeting');
                          setShowQuickAction(true);
                        }}
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                      >
                        <Calendar className="w-3 h-3 mr-1" />
                        Meeting
                      </Button>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuickActionType('proposal');
                          setShowQuickAction(true);
                        }}
                        variant="outline"
                        className="flex-1 bg-slate-800/50 border-white/10 text-white"
                      >
                        <FileCheck className="w-3 h-3 mr-1" />
                        Proposal
                      </Button>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openLeadDetail(lead);
                        }}
                        variant="outline"
                        className="bg-slate-800/50 border-white/10 text-white"
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>

                    {/* Conversion Actions */}
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConvert('to-won');
                        }}
                        className="flex-1 bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20"
                      >
                        <Handshake className="w-3 h-3 mr-1" />
                        Win
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConvert('to-lost');
                        }}
                        className="flex-1 bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
                      >
                        <XCircle className="w-3 h-3 mr-1" />
                        Lost
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConvert('to-prospect');
                        }}
                        className="flex-1 bg-gray-500/10 border-gray-500/30 text-gray-400 hover:bg-gray-500/20"
                      >
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Revert
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          /* List View */
          <Card className="bg-slate-900/80 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Leads ({filteredLeads.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-sm font-medium text-gray-400">
                        <Checkbox
                          checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedLeads(filteredLeads.map(l => l.id));
                            } else {
                              setSelectedLeads([]);
                            }
                          }}
                        />
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Lead ID</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Name (POC)</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Company</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Email</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Phone</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Source</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Offering</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Priority</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Lead Score</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Assigned To</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Win Probability</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Engagement</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Acknowledged At</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Last Contact</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Estimated Value</th>
                      <th className="text-left p-4 text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead, index) => (
                      <motion.tr
                        key={lead.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                        onClick={() => openLeadDetail(lead)}
                      >
                        <td className="p-4" onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={selectedLeads.includes(lead.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedLeads([...selectedLeads, lead.id]);
                              } else {
                                setSelectedLeads(selectedLeads.filter(id => id !== lead.id));
                              }
                            }}
                          />
                        </td>
                        <td className="p-4">
                          <span className="text-gray-400 text-sm font-mono">#{lead.id}</span>
                        </td>
                        <td className="p-4">
                          <button 
                            onClick={() => openLeadDetail(lead)}
                            className="font-medium text-white hover:text-emerald-400 transition-colors text-left"
                          >
                            {lead.name}
                          </button>
                        </td>
                        <td className="p-4 text-gray-300">{lead.company}</td>
                        <td className="p-4">
                          <span className="text-sm text-gray-400">{lead.email}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-gray-400">{lead.phone}</span>
                        </td>
                        <td className="p-4">
                          <Badge className="bg-slate-800 text-gray-300 text-xs">{lead.responseType || 'Email Reply'}</Badge>
                        </td>
                        <td className="p-4">
                          <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                            {offerings.find(o => o.id === lead.offering)?.name || lead.offering}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={`${getStatusColor(lead.status)} text-xs border`}>
                            {lead.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={`${getPriorityColor(lead.priority)} text-xs`}>
                            {lead.priority}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-600" 
                                style={{ width: `${lead.leadScore}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-400">{lead.leadScore}</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-300 text-sm">{lead.assignedTo}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-600" 
                                style={{ width: `${lead.winProbability}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400">{lead.winProbability}%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-600" 
                                style={{ width: `${lead.engagementScore}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-400">{lead.engagementScore}%</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-400 text-sm whitespace-nowrap">{lead.acknowledgedAt}</td>
                        <td className="p-4 text-gray-400 text-sm">{lead.lastContact}</td>
                        <td className="p-4">
                          <span className="text-sm font-semibold text-white">${(lead.estimatedValue / 1000).toFixed(0)}k</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                openLeadDetail(lead);
                              }}
                              className="text-gray-400 hover:text-white"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedLeadForWorkflow(lead);
                                setShowWorkflowBuilder(true);
                              }}
                              className="text-emerald-400 hover:text-emerald-300"
                            >
                              <Send className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Lead details now open on a dedicated page via /leads/[id] route */}

      {/* Quick Action Dialog */}
      <Dialog open={showQuickAction} onOpenChange={setShowQuickAction}>
        <DialogContent className="bg-slate-900 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">
              {quickActionType === 'meeting' && 'Schedule Meeting'}
              {quickActionType === 'proposal' && 'Send Proposal'}
              {quickActionType === 'demo' && 'Schedule Demo'}
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-400 mt-2">Quick action form coming in next step...</p>
        </DialogContent>
      </Dialog>

      {/* Add Task Dialog */}
      <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
        <DialogContent className="bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-orange-500/30">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold">Add New Task</DialogTitle>
            <DialogDescription className="text-gray-400">Create a task to track follow-ups and actions</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-gray-300 mb-2 block">Task Title</Label>
              <Input
                placeholder="e.g., Follow up on proposal"
                className="bg-slate-800/50 border-white/10 text-white"
                value={taskForm.title}
                onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300 mb-2 block">Due Date</Label>
                <Input
                  type="date"
                  className="bg-slate-800/50 border-white/10 text-white"
                  value={taskForm.due}
                  onChange={(e) => setTaskForm({ ...taskForm, due: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">Priority</Label>
                <Select value={taskForm.priority} onValueChange={(value) => setTaskForm({ ...taskForm, priority: value })}>
                  <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-600" onClick={handleAddTask}>
                <CheckSquare className="w-4 h-4 mr-2" />
                Create Task
              </Button>
              <Button variant="outline" onClick={() => setShowAddTask(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Document Dialog */}
      <Dialog open={showAddDocument} onOpenChange={setShowAddDocument}>
        <DialogContent className="bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-blue-500/30">
          <DialogHeader>
            <DialogTitle className="text-white text-xl font-bold">Upload Document</DialogTitle>
            <DialogDescription className="text-gray-400">Add files, proposals, or case studies</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <label className="border-2 border-dashed border-blue-500/30 rounded-lg p-8 text-center hover:border-blue-500/50 transition-colors cursor-pointer block">
              <input
                type="file"
                className="hidden"
                onChange={handleUploadDocument}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
              />
              <Upload className="w-12 h-12 text-blue-400 mx-auto mb-3" />
              <p className="text-white font-medium mb-1">Drop files here or click to upload</p>
              <p className="text-xs text-gray-400">PDF, DOCX, XLSX up to 10MB</p>
            </label>
            <div className="flex gap-3">
              <label className="flex-1">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600" asChild>
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </span>
                </Button>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadDocument}
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                />
              </label>
              <Button variant="outline" onClick={() => setShowAddDocument(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Outreach Dialog - Email Campaign Workflow */}
      <Dialog open={showBulkOutreach} onOpenChange={(open) => {
        setShowBulkOutreach(open);
        if (!open) {
          setCampaignStep('basic');
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
            audienceType: 'selected',
            selectedGroups: [],
            scheduleType: 'now',
            scheduleDate: '',
            scheduleTime: '',
            followUpEnabled: false,
            followUpCount: '2',
            followUpInterval: '3',
            trackOpens: true,
            trackClicks: true,
            unsubscribeLink: true
          });
        }
      }}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">Create Email Campaign</DialogTitle>
            <DialogDescription className="text-gray-400">
              Set up an email campaign for {selectedLeads.length} selected lead(s)
            </DialogDescription>
          </DialogHeader>

          <Tabs value={campaignStep} onValueChange={(val) => setCampaignStep(val as any)} className="mt-4">
            <TabsList className="grid grid-cols-4 bg-slate-800/50 p-1">
              <TabsTrigger value="basic" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600">
                1. Basic Info
              </TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600">
                2. Email Content
              </TabsTrigger>
              <TabsTrigger value="audience" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600">
                3. Audience
              </TabsTrigger>
              <TabsTrigger value="schedule" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600">
                4. Schedule
              </TabsTrigger>
            </TabsList>

            {/* Step 1: Basic Info */}
            <TabsContent value="basic" className="space-y-4 mt-6">
              <div>
                <Label className="text-gray-300 mb-2 block">Campaign Name *</Label>
                <Input
                  value={campaignForm.name}
                  onChange={(e) => setCampaignForm({...campaignForm, name: e.target.value})}
                  placeholder="e.g., Q1 Leads Outreach"
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
              </div>

              <div>
                <Label className="text-gray-300 mb-2 block">Offering/Product *</Label>
                <Select value={campaignForm.offering} onValueChange={(val) => setCampaignForm({...campaignForm, offering: val})}>
                  <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                    <SelectValue placeholder="Select offering" />
                  </SelectTrigger>
                  <SelectContent>
                    {offerings.filter(o => o.id !== 'all').map(off => (
                      <SelectItem key={off.id} value={off.id}>{off.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  onClick={() => setCampaignStep('content')}
                  disabled={!campaignForm.name || !campaignForm.fromName || !campaignForm.fromEmail || !campaignForm.offering}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600"
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
                    <SelectItem value="outreach-1">Cold Outreach Template 1</SelectItem>
                    <SelectItem value="outreach-2">Cold Outreach Template 2</SelectItem>
                    <SelectItem value="followup-1">Follow-up Template</SelectItem>
                    <SelectItem value="custom">Create Custom</SelectItem>
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

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setCampaignStep('basic')} className="bg-white/5 border-white/10 text-white">
                  Back
                </Button>
                <Button 
                  onClick={() => setCampaignStep('audience')}
                  disabled={!campaignForm.subject || !campaignForm.emailBody}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600"
                >
                  Next: Select Audience
                </Button>
              </div>
            </TabsContent>

            {/* Step 3: Audience */}
            <TabsContent value="audience" className="space-y-4 mt-6">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-sm font-medium text-emerald-400">Selected Leads</p>
                    <p className="text-xs text-gray-400">{selectedLeads.length} lead(s) will receive this campaign</p>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-gray-300 mb-3 block">Who should receive this campaign? *</Label>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setCampaignForm({...campaignForm, audienceType: 'selected'})}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      campaignForm.audienceType === 'selected'
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-white/10 bg-slate-800/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Users className={`w-5 h-5 ${campaignForm.audienceType === 'selected' ? 'text-emerald-400' : 'text-gray-400'}`} />
                      <div className="flex-1">
                        <p className="font-medium text-white">Selected Leads Only</p>
                        <p className="text-sm text-gray-400">Send to the {selectedLeads.length} selected lead(s)</p>
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">{selectedLeads.length} leads</Badge>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setCampaignForm({...campaignForm, audienceType: 'all'})}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      campaignForm.audienceType === 'all'
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-white/10 bg-slate-800/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Users className={`w-5 h-5 ${campaignForm.audienceType === 'all' ? 'text-emerald-400' : 'text-gray-400'}`} />
                      <div className="flex-1">
                        <p className="font-medium text-white">All Leads</p>
                        <p className="text-sm text-gray-400">Send to all leads in your database</p>
                      </div>
                    </div>
                  </motion.button>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setCampaignStep('content')} className="bg-white/5 border-white/10 text-white">
                  Back
                </Button>
                <Button 
                  onClick={() => setCampaignStep('schedule')}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600"
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
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-white/10 bg-slate-800/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Send className={`w-5 h-5 ${campaignForm.scheduleType === 'now' ? 'text-emerald-400' : 'text-gray-400'}`} />
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
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-white/10 bg-slate-800/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className={`w-5 h-5 ${campaignForm.scheduleType === 'scheduled' ? 'text-emerald-400' : 'text-gray-400'}`} />
                      <div>
                        <p className="font-medium text-white">Schedule for Later</p>
                        <p className="text-sm text-gray-400">Choose a specific date and time</p>
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
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setCampaignStep('audience')} className="bg-white/5 border-white/10 text-white">
                  Back
                </Button>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => {
                      console.log('Saving as draft:', campaignForm);
                      setShowBulkOutreach(false);
                    }}
                    variant="outline"
                    className="bg-white/5 border-white/10 text-white"
                  >
                    Save as Draft
                  </Button>
                  <Button 
                    onClick={() => {
                      console.log('Creating campaign for selected leads:', {
                        campaignForm,
                        selectedLeads
                      });
                      setShowBulkOutreach(false);
                      setSelectedLeads([]);
                    }}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600"
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

      {/* Start Outreach Dialog - Multi-Step */}
      <Dialog open={showStartOutreach} onOpenChange={(open) => {
        setShowStartOutreach(open);
        if (!open) {
          setOutreachStep(0);
          setOutreachOffering('');
          setOutreachGroup('');
          setOutreachMethod(null);
          setOutreachChannels([]);
          setFollowUpCount('');
          setFollowUpFrequency('');
          setTimeOfFollowUp('');
          setStartTime('');
          setCustomDate('');
          setCustomTime('');
          setOutreachTemplates({});
          setOutreachCurrentOfferingIndex(0);
        }
      }}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              Start Outreach Campaign for Leads
              <Badge variant="secondary" className="ml-auto">
                {outreachStep === 0 ? 'Step 1 of 3' : outreachStep === 1 ? 'Step 2 of 3' : 'Step 3 of 3'}
              </Badge>
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {outreachStep === 0 ? 'Select an offering' : outreachStep === 1 ? 'Configure your outreach strategy' : 'Set up message templates'}
            </DialogDescription>
          </DialogHeader>

          {outreachStep === 0 && (
            <div className="space-y-6 py-4">
              <div>
                <Label className="text-gray-300 mb-3 block">Select Offering *</Label>
                <Select value={outreachOffering} onValueChange={setOutreachOffering}>
                  <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                    <SelectValue placeholder="Choose an offering..." />
                  </SelectTrigger>
                  <SelectContent>
                    {offerings.filter(o => o.id !== 'all').map(offering => (
                      <SelectItem key={offering.id} value={offering.id}>
                        {offering.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-white/10">
                <Button 
                  variant="outline" 
                  onClick={() => setShowStartOutreach(false)}
                  className="bg-white/5 border-white/10 text-white"
                >
                  Cancel
                </Button>
                {outreachOffering && (
                  <Button 
                    onClick={() => setOutreachStep(1)}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600"
                  >
                    Continue <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {outreachStep === 1 && (
            <div className="space-y-6 py-4">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-emerald-400 mb-1">Selected Configuration</p>
                    <p className="text-xs text-gray-400">
                      Offering: {offerings.find(o => o.id === outreachOffering)?.name}
                    </p>
                  </div>
                </div>
              </div>
                  
              <div>
                <Label className="text-gray-300 mb-4 block">Choose Outreach Method *</Label>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card 
                      className={`cursor-pointer transition-all border-2 ${
                        outreachMethod === 'manual' 
                          ? 'border-emerald-500 shadow-lg shadow-emerald-500/20 bg-emerald-500/5' 
                          : 'border-white/10 hover:border-emerald-500/50 bg-slate-800/50'
                      }`}
                      onClick={() => setOutreachMethod('manual')}
                    >
                      <CardHeader className="text-center pb-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 mx-auto mb-3">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-base mb-1 text-white">Manual</CardTitle>
                        <p className="text-xs text-gray-400">You control every outreach interaction</p>
                      </CardHeader>
                    </Card>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card 
                      className={`cursor-pointer transition-all border-2 ${
                        outreachMethod === 'ai' 
                          ? 'border-emerald-500 shadow-lg shadow-emerald-500/20 bg-emerald-500/5' 
                          : 'border-white/10 hover:border-emerald-500/50 bg-slate-800/50'
                      }`}
                      onClick={() => setOutreachMethod('ai')}
                    >
                      <CardHeader className="text-center pb-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-500 mx-auto mb-3">
                          <Bot className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-base mb-1 text-white">AI Automated</CardTitle>
                        <p className="text-xs text-gray-400">Let AI handle outreach automatically</p>
                      </CardHeader>
                    </Card>
                  </motion.div>
                </div>
              </div>

              {outreachMethod === 'ai' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4"
                >
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10">
                    <Label className="text-gray-300 mb-3 block">Outreach Channels</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Cold Calling', 'Cold Mailing', 'LinkedIn DM', 'WhatsApp DM'].map((channel) => (
                        <div key={channel} className="flex items-center space-x-2 p-3 rounded-lg bg-slate-900/50 border border-white/10 hover:border-emerald-500/50 transition-colors">
                          <Checkbox 
                            id={`channel-${channel}`}
                            checked={outreachChannels.includes(channel)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setOutreachChannels([...outreachChannels, channel]);
                              } else {
                                setOutreachChannels(outreachChannels.filter(c => c !== channel));
                              }
                            }}
                            className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                          />
                          <label htmlFor={`channel-${channel}`} className="text-sm text-gray-300 cursor-pointer select-none flex-1">
                            {channel}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10">
                      <Label htmlFor="followUpCount" className="text-gray-300 mb-3 block">Number of Follow-ups</Label>
                      <Select value={followUpCount} onValueChange={setFollowUpCount}>
                        <SelectTrigger id="followUpCount" className="bg-slate-900/50 border-white/10 text-white">
                          <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Follow-up</SelectItem>
                          <SelectItem value="2">2 Follow-ups</SelectItem>
                          <SelectItem value="3">3 Follow-ups</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10">
                      <Label htmlFor="followUpFrequency" className="text-gray-300 mb-3 block">Follow-up Frequency</Label>
                      <Select value={followUpFrequency} onValueChange={setFollowUpFrequency}>
                        <SelectTrigger id="followUpFrequency" className="bg-slate-900/50 border-white/10 text-white">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="biweekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10">
                    <Label htmlFor="timeOfFollowUp" className="text-gray-300 mb-3 block">Time of Follow-up</Label>
                    <Input
                      id="timeOfFollowUp"
                      type="time"
                      value={timeOfFollowUp}
                      onChange={(e) => setTimeOfFollowUp(e.target.value)}
                      className="bg-slate-900/50 border-white/10 text-white"
                    />
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10">
                    <Label htmlFor="startTime" className="text-gray-300 mb-3 block">When to start Automated Outreach</Label>
                    <Select value={startTime} onValueChange={setStartTime}>
                      <SelectTrigger id="startTime" className="bg-slate-900/50 border-white/10 text-white">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="test">Test Dummy Reach</SelectItem>
                        <SelectItem value="immediately">Immediately</SelectItem>
                        <SelectItem value="custom">Custom Date & Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {startTime === 'custom' && (
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10 space-y-4">
                      <div>
                        <Label htmlFor="customDate" className="text-gray-300 mb-2 block">Select Date</Label>
                        <Input
                          id="customDate"
                          type="date"
                          value={customDate}
                          onChange={(e) => setCustomDate(e.target.value)}
                          className="bg-slate-900/50 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="customTime" className="text-gray-300 mb-2 block">Select Time</Label>
                        <Input
                          id="customTime"
                          type="time"
                          value={customTime}
                          onChange={(e) => setCustomTime(e.target.value)}
                          className="bg-slate-900/50 border-white/10 text-white"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              <div className="flex gap-2 justify-end pt-4 border-t border-white/10">
                <Button 
                  variant="outline" 
                  onClick={() => setOutreachStep(0)}
                  className="bg-white/5 border-white/10 text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                {outreachMethod && (
                  <Button 
                    onClick={() => {
                      if (outreachMethod === 'manual') {
                        console.log('Manual outreach configured');
                        setShowStartOutreach(false);
                      } else {
                        setOutreachStep(2);
                      }
                    }}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600"
                  >
                    {outreachMethod === 'manual' ? 'Complete' : 'Continue to Templates'} <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {outreachStep === 2 && (
            <div className="space-y-6 py-4">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <p className="text-sm text-emerald-400 font-medium">Configure Templates for {offerings.find(o => o.id === outreachOffering)?.name}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">Outreach Template</Label>
                  <Textarea
                    placeholder="Enter your outreach email template..."
                    value={outreachTemplates[`${outreachOffering}-outreach`] || ''}
                    onChange={(e) => setOutreachTemplates({...outreachTemplates, [`${outreachOffering}-outreach`]: e.target.value})}
                    className="min-h-[120px] bg-slate-800/50 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-300 mb-2 block">Follow-up Template</Label>
                  <Textarea
                    placeholder="Enter your follow-up email template..."
                    value={outreachTemplates[`${outreachOffering}-followup`] || ''}
                    onChange={(e) => setOutreachTemplates({...outreachTemplates, [`${outreachOffering}-followup`]: e.target.value})}
                    className="min-h-[120px] bg-slate-800/50 border-white/10 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-300 mb-2 block">Closing Template</Label>
                  <Textarea
                    placeholder="Enter your closing email template..."
                    value={outreachTemplates[`${outreachOffering}-closing`] || ''}
                    onChange={(e) => setOutreachTemplates({...outreachTemplates, [`${outreachOffering}-closing`]: e.target.value})}
                    className="min-h-[120px] bg-slate-800/50 border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-white/10">
                <Button 
                  variant="outline" 
                  onClick={() => setOutreachStep(1)}
                  className="bg-white/5 border-white/10 text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  onClick={() => {
                    console.log('Outreach campaign configured:', {
                      offering: outreachOffering,
                      method: outreachMethod,
                      channels: outreachChannels,
                      templates: outreachTemplates
                    });
                    setShowStartOutreach(false);
                  }}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Start Campaign
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Bulk Assign Dialog */}
      <Dialog open={showBulkAssign} onOpenChange={setShowBulkAssign}>
        <DialogContent className="bg-slate-900 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Bulk Assign Leads</DialogTitle>
            <DialogDescription className="text-gray-400">
              Assign {selectedLeads.length} selected lead(s) to a team member
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-gray-300 mb-2 block">Assign To</Label>
              <Select value={bulkAssignTo} onValueChange={setBulkAssignTo}>
                <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah">Sarah J.</SelectItem>
                  <SelectItem value="mike">Mike W.</SelectItem>
                  <SelectItem value="alex">Alex K.</SelectItem>
                  <SelectItem value="john">John D.</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setShowBulkAssign(false)} className="bg-white/5 border-white/10 text-white">
                Cancel
              </Button>
              <Button 
                onClick={() => applyBulkAction('assign')}
                className="bg-gradient-to-r from-emerald-500 to-teal-600"
              >
                Assign Leads
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Status Dialog */}
      <Dialog open={showBulkStatus} onOpenChange={setShowBulkStatus}>
        <DialogContent className="bg-slate-900 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Change Status</DialogTitle>
            <DialogDescription className="text-gray-400">
              Update status for {selectedLeads.length} selected lead(s)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-gray-300 mb-2 block">New Status</Label>
              <Select value={bulkStatus} onValueChange={setBulkStatus}>
                <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hot Lead">Hot Lead</SelectItem>
                  <SelectItem value="Warm Lead">Warm Lead</SelectItem>
                  <SelectItem value="Cold Lead">Cold Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setShowBulkStatus(false)} className="bg-white/5 border-white/10 text-white">
                Cancel
              </Button>
              <Button 
                onClick={() => applyBulkAction('status')}
                className="bg-gradient-to-r from-emerald-500 to-teal-600"
              >
                Update Status
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Priority Dialog */}
      <Dialog open={showBulkPriority} onOpenChange={setShowBulkPriority}>
        <DialogContent className="bg-slate-900 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Change Priority</DialogTitle>
            <DialogDescription className="text-gray-400">
              Update priority for {selectedLeads.length} selected lead(s)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-gray-300 mb-2 block">New Priority</Label>
              <Select value={bulkPriority} onValueChange={setBulkPriority}>
                <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High Priority</SelectItem>
                  <SelectItem value="Medium">Medium Priority</SelectItem>
                  <SelectItem value="Low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setShowBulkPriority(false)} className="bg-white/5 border-white/10 text-white">
                Cancel
              </Button>
              <Button 
                onClick={() => applyBulkAction('priority')}
                className="bg-gradient-to-r from-emerald-500 to-teal-600"
              >
                Update Priority
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Visual Workflow Builder Dialog */}
      <Dialog open={showWorkflowBuilder} onOpenChange={setShowWorkflowBuilder}>
        <DialogContent className="bg-slate-900 border-emerald-500/30 max-w-7xl max-h-[90vh] overflow-hidden p-0">
          <DialogHeader className="border-b border-emerald-500/30 bg-gradient-to-r from-slate-900 to-slate-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-white text-2xl font-bold flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/30 to-teal-600/30 border border-emerald-400/40">
                    <Activity className="w-6 h-6 text-emerald-300" />
                  </div>
                  Outreach Workflow Builder
                </DialogTitle>
                <DialogDescription className="text-gray-400 mt-2">
                  {selectedLeadForWorkflow && `Building workflow for ${selectedLeadForWorkflow.name} at ${selectedLeadForWorkflow.company}`}
                </DialogDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-slate-800 border-white/10 text-white hover:bg-slate-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Template
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                  onClick={() => {
                    console.log('Launching workflow');
                    setShowWorkflowBuilder(false);
                  }}
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Launch Workflow
                </Button>
              </div>
            </div>
          </DialogHeader>
          
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] bg-slate-950">
            {/* Workflow Tree Visualization */}
            <div className="flex flex-col items-center space-y-4 py-8">
              
              {/* Node 1: Initial Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
              >
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-emerald-500/30 rounded-xl p-6 shadow-xl hover:shadow-emerald-500/20 transition-all cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/20">
                        <Mail className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold">Initial Outreach</h3>
                        <p className="text-xs text-gray-400">Send personalized message</p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                      Step 1
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-300 bg-slate-950/50 rounded p-3 border border-white/5">
                    Hi {selectedLeadForWorkflow?.name}, I noticed your work at {selectedLeadForWorkflow?.company}...
                  </div>
                </div>
              </motion.div>

              {/* Connector */}
              <div className="w-0.5 h-8 bg-gradient-to-b from-emerald-500/50 to-purple-500/50" />

              {/* Node 2: Wait Period */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="w-full max-w-md"
              >
                <div className="bg-gradient-to-br from-purple-900/30 to-purple-950/30 border-2 border-purple-500/30 rounded-xl p-4 shadow-xl">
                  <div className="flex items-center justify-center gap-3">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <span className="text-white font-semibold">Wait 2 Days</span>
                    <Badge className="bg-purple-500/20 text-purple-300">Delay</Badge>
                  </div>
                </div>
              </motion.div>

              {/* Connector */}
              <div className="w-0.5 h-8 bg-gradient-to-b from-purple-500/50 to-orange-500/50" />

              {/* Node 3: Decision Point - User Acknowledged */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full max-w-2xl"
              >
                <div className="bg-gradient-to-br from-orange-900/30 to-red-950/30 border-2 border-orange-500/40 rounded-xl p-6 shadow-xl relative">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-orange-500/20">
                      <AlertCircle className="w-6 h-6 text-orange-400" />
                    </div>
                    <h3 className="text-white font-bold text-lg">Decision Point: User Acknowledged?</h3>
                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                      Condition
                    </Badge>
                  </div>

                  {/* Branch Arrows */}
                  <div className="grid grid-cols-2 gap-8">
                    {/* NO Branch */}
                    <div className="relative">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-red-500/50" />
                      <div className="bg-gradient-to-br from-red-900/40 to-red-950/40 border-2 border-red-500/40 rounded-xl p-4">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <XCircle className="w-5 h-5 text-red-400" />
                          <span className="text-white font-bold">NO</span>
                        </div>
                        
                        {/* Follow-up sequence for NO */}
                        <div className="space-y-3">
                          <div className="bg-slate-950/50 rounded-lg p-3 border border-red-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Mail className="w-4 h-4 text-red-300" />
                              <span className="text-sm text-white font-medium">Follow-up Message</span>
                            </div>
                            <p className="text-xs text-gray-400">Send reminder about value proposition</p>
                          </div>
                          
                          <div className="flex items-center justify-center">
                            <div className="w-0.5 h-4 bg-red-500/30" />
                          </div>
                          
                          <div className="bg-purple-900/30 rounded-lg p-2 border border-purple-500/20 text-center">
                            <span className="text-xs text-purple-300">Wait 3 Days</span>
                          </div>
                          
                          <div className="flex items-center justify-center">
                            <div className="w-0.5 h-4 bg-red-500/30" />
                          </div>
                          
                          <div className="bg-slate-950/50 rounded-lg p-3 border border-red-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Phone className="w-4 h-4 text-red-300" />
                              <span className="text-sm text-white font-medium">Call Attempt</span>
                            </div>
                            <p className="text-xs text-gray-400">Personal phone outreach</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* YES Branch */}
                    <div className="relative">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-green-500/50" />
                      <div className="bg-gradient-to-br from-green-900/40 to-green-950/40 border-2 border-green-500/40 rounded-xl p-4">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                          <span className="text-white font-bold">YES</span>
                        </div>
                        
                        {/* Follow-up sequence for YES */}
                        <div className="space-y-3">
                          <div className="bg-slate-950/50 rounded-lg p-3 border border-green-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <ThumbsUp className="w-4 h-4 text-green-300" />
                              <span className="text-sm text-white font-medium">Thank You Message</span>
                            </div>
                            <p className="text-xs text-gray-400">Appreciate their response</p>
                          </div>
                          
                          <div className="flex items-center justify-center">
                            <div className="w-0.5 h-4 bg-green-500/30" />
                          </div>
                          
                          <div className="bg-purple-900/30 rounded-lg p-2 border border-purple-500/20 text-center">
                            <span className="text-xs text-purple-300">Wait 1 Day</span>
                          </div>
                          
                          <div className="flex items-center justify-center">
                            <div className="w-0.5 h-4 bg-green-500/30" />
                          </div>
                          
                          <div className="bg-slate-950/50 rounded-lg p-3 border border-green-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="w-4 h-4 text-green-300" />
                              <span className="text-sm text-white font-medium">Schedule Meeting</span>
                            </div>
                            <p className="text-xs text-gray-400">Book demo/discovery call</p>
                          </div>
                          
                          <div className="flex items-center justify-center">
                            <div className="w-0.5 h-4 bg-green-500/30" />
                          </div>
                          
                          <div className="bg-slate-950/50 rounded-lg p-3 border border-green-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="w-4 h-4 text-green-300" />
                              <span className="text-sm text-white font-medium">Send Proposal</span>
                            </div>
                            <p className="text-xs text-gray-400">Customized offer document</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Settings Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full max-w-2xl mt-8"
              >
                <Card className="border-2 border-blue-500/30 bg-gradient-to-br from-slate-800 to-slate-900">
                  <CardHeader className="border-b border-blue-500/20">
                    <CardTitle className="text-white flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-blue-500/20">
                        <Settings className="w-5 h-5 text-blue-400" />
                      </div>
                      Sequence Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-300 mb-2 block">Send Time</Label>
                        <Select defaultValue="business">
                          <SelectTrigger className="bg-slate-800 border-white/10 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="business">Business Hours (9-5)</SelectItem>
                            <SelectItem value="morning">Morning (8-12)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (1-5)</SelectItem>
                            <SelectItem value="evening">Evening (6-9)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-gray-300 mb-2 block">Time Zone</Label>
                        <Select defaultValue="pst">
                          <SelectTrigger className="bg-slate-800 border-white/10 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pst">PST (Pacific)</SelectItem>
                            <SelectItem value="est">EST (Eastern)</SelectItem>
                            <SelectItem value="cst">CST (Central)</SelectItem>
                            <SelectItem value="mst">MST (Mountain)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-gray-300 mb-2 block flex items-center gap-2">
                        <Checkbox className="border-white/20" />
                        <span>Stop sequence if lead responds</span>
                      </Label>
                    </div>
                    
                    <div>
                      <Label className="text-gray-300 mb-2 block flex items-center gap-2">
                        <Checkbox className="border-white/20" defaultChecked />
                        <span>Track email opens and clicks</span>
                      </Label>
                    </div>
                    
                    <div>
                      <Label className="text-gray-300 mb-2 block flex items-center gap-2">
                        <Checkbox className="border-white/20" defaultChecked />
                        <span>Automatically move to next stage on response</span>
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Chat Assistant */}
      <ChatAssistant />
    </div>
  );
}
