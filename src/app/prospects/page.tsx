'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Play,
  UserPlus,
  Zap,
  CheckSquare,
  User,
  Activity,
  Save,
  ExternalLink,
  Sparkles,
  Send,
  FileText,
  Clock,
  CheckCircle2,
  Link2,
  Building,
  MessageSquare,
  Mic,
  PlayCircle,
  StopCircle,
  X,
  Upload,
  Users,
  ChevronRight,
  Bot,
  AlertCircle,
  Target
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Type definitions for type safety
interface Offering {
  id: string;
  name: string;
  followUpCount: number;
}

export default function ProspectsPage() {
  const [selectedOffering, setSelectedOffering] = useState('enterprise');
  const [selectedProspects, setSelectedProspects] = useState<number[]>([]);
  const [showBulkAssign, setShowBulkAssign] = useState(false);
  const [showBulkStatus, setShowBulkStatus] = useState(false);
  const [showBulkPriority, setShowBulkPriority] = useState(false);
  const [showBulkOutreach, setShowBulkOutreach] = useState(false);
  const [bulkAssignTo, setBulkAssignTo] = useState('');
  const [bulkStatus, setBulkStatus] = useState('');
  const [bulkPriority, setBulkPriority] = useState('');
  const [bulkOutreachMode, setBulkOutreachMode] = useState<'automated' | 'manual'>('automated');
  
  // Add Prospect states
  const [showAddProspect, setShowAddProspect] = useState(false);
  const [addProspectMode, setAddProspectMode] = useState<'single' | 'bulk' | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [leadFormData, setLeadFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    websiteUrl: '',
    source: 'Manual_Entry',
    offering: 'enterprise',
    priority: 'Medium',
    assignedTo: '',
    notes: ''
  });
  
  // Start Outreach states
  const [showStartOutreach, setShowStartOutreach] = useState(false);
  const [outreachStep, setOutreachStep] = useState<1 | 2>(1);
  const [outreachOffering, setOutreachOffering] = useState('');
  const [outreachMethod, setOutreachMethod] = useState<'manual' | 'ai' | null>(null);
  const [outreachChannels, setOutreachChannels] = useState<string[]>([]);
  const [followUpCount, setFollowUpCount] = useState('');
  const [followUpFrequency, setFollowUpFrequency] = useState('');
  const [timeOfFollowUp, setTimeOfFollowUp] = useState('');
  const [startTime, setStartTime] = useState('');
  const [customDate, setCustomDate] = useState('');
  const [customTime, setCustomTime] = useState('');
  const [testFrom, setTestFrom] = useState('');
  const [testTo, setTestTo] = useState('');
  const [testSubject, setTestSubject] = useState('');
  const [testBody, setTestBody] = useState('');
  const [customFollowUpCount, setCustomFollowUpCount] = useState('');
  const [customFrequency, setCustomFrequency] = useState('');
  const [outreachTemplates, setOutreachTemplates] = useState<Record<string, string>>({});
  const [outreachCurrentOfferingIndex, setOutreachCurrentOfferingIndex] = useState(0);
  const [followupStrategy, setFollowupStrategy] = useState<Record<string, 'same' | 'custom'>>({});
  const [outreachAIPrompt, setOutreachAIPrompt] = useState('');
  
  // Create Group states
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  
  // Prospect detail dialog states
  const [showProspectDetail, setShowProspectDetail] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState<any>(null);
  const [detailTab, setDetailTab] = useState('overview');
  
  // Prospect detail data states
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState('');
  const [newNote, setNewNote] = useState('');
  const [nextSteps, setNextSteps] = useState<string[]>([]);
  
  // Email states
  const [emailMode, setEmailMode] = useState<'automated' | 'manual'>('automated');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [followUpBodies, setFollowUpBodies] = useState<string[]>(['', '', '']);
  const [closingBody, setClosingBody] = useState('');
  
  // Calling states
  const [callingMode, setCallingMode] = useState<'automated' | 'manual'>('manual');
  const [callScript, setCallScript] = useState('');
  const [callNotes, setCallNotes] = useState('');
  const [showScriptAI, setShowScriptAI] = useState(false);
  const [scriptPrompt, setScriptPrompt] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [callTranscript, setCallTranscript] = useState('');
  const [callSummary, setCallSummary] = useState('');

  const offerings: Offering[] = [
    { id: 'enterprise', name: 'Enterprise Solutions', followUpCount: 3 },
    { id: 'saas', name: 'SaaS Products', followUpCount: 2 },
    { id: 'consulting', name: 'Consulting Services', followUpCount: 4 }
  ];

  const prospects = [
    {
      id: 1,
      name: 'John Smith',
      company: 'Acme Corp',
      email: 'john@acme.com',
      phone: '+1 555-0101',
      linkedinUrl: 'https://linkedin.com/in/johnsmith',
      websiteUrl: 'https://acme.com',
      source: 'LinkedIn_Scrape',
      offering: 'enterprise',
      status: 'Contacted',
      priority: 'High',
      assignedTo: 'Sarah J.',
      leadScore: 85,
      createdAt: '2025-01-15',
      updatedAt: '2025-01-20',
      notes: 'Interested in enterprise package',
      outreach: 'Automated'
    },
    {
      id: 2,
      name: 'Emily Chen',
      company: 'TechStart Inc',
      email: 'emily@techstart.com',
      phone: '+1 555-0102',
      linkedinUrl: 'https://linkedin.com/in/emilychen',
      websiteUrl: 'https://techstart.com',
      source: 'CSV_Import',
      offering: 'enterprise',
      status: 'Follow-up',
      priority: 'Medium',
      assignedTo: 'Mike W.',
      leadScore: 72,
      createdAt: '2025-01-16',
      updatedAt: '2025-01-21',
      notes: 'Requested demo',
      outreach: 'Manual'
    },
    {
      id: 3,
      name: 'Robert Williams',
      company: 'Global Enterprises',
      email: 'robert@global.com',
      phone: '+1 555-0103',
      linkedinUrl: 'https://linkedin.com/in/robertw',
      websiteUrl: 'https://globalent.com',
      source: 'Website',
      offering: 'enterprise',
      status: 'New',
      priority: 'High',
      assignedTo: 'Alex K.',
      leadScore: 91,
      createdAt: '2025-01-18',
      updatedAt: '2025-01-22',
      notes: 'CEO referral',
      outreach: 'Automated'
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      company: 'Innovate Labs',
      email: 'sarah.j@innovatelabs.com',
      phone: '+1 555-0104',
      linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
      websiteUrl: 'https://innovatelabs.io',
      source: 'LinkedIn_Scrape',
      offering: 'saas',
      status: 'Meeting',
      priority: 'High',
      assignedTo: 'Sarah J.',
      leadScore: 88,
      createdAt: '2025-01-12',
      updatedAt: '2025-01-23',
      notes: 'Scheduled product demo for next Monday',
      outreach: 'Automated'
    },
    {
      id: 5,
      name: 'Michael Brown',
      company: 'DataFlow Systems',
      email: 'mbrown@dataflow.com',
      phone: '+1 555-0105',
      linkedinUrl: 'https://linkedin.com/in/michaelbrown',
      websiteUrl: 'https://dataflow.com',
      source: 'Manual_Entry',
      offering: 'consulting',
      status: 'Proposal',
      priority: 'High',
      assignedTo: 'Mike W.',
      leadScore: 94,
      createdAt: '2025-01-10',
      updatedAt: '2025-01-23',
      notes: 'Awaiting final approval from board',
      outreach: 'Manual'
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      company: 'CloudTech Solutions',
      email: 'l.anderson@cloudtech.com',
      phone: '+1 555-0106',
      linkedinUrl: 'https://linkedin.com/in/lisaanderson',
      websiteUrl: 'https://cloudtech.io',
      source: 'Website',
      offering: 'saas',
      status: 'Won',
      priority: 'Medium',
      assignedTo: 'Alex K.',
      leadScore: 96,
      createdAt: '2025-01-05',
      updatedAt: '2025-01-24',
      notes: 'Deal closed! Starting onboarding next week',
      outreach: 'Automated'
    },
    {
      id: 7,
      name: 'David Martinez',
      company: 'FinTech Pro',
      email: 'david.m@fintechpro.com',
      phone: '+1 555-0107',
      linkedinUrl: 'https://linkedin.com/in/davidmartinez',
      websiteUrl: 'https://fintechpro.com',
      source: 'CSV_Import',
      offering: 'enterprise',
      status: 'Lost',
      priority: 'Low',
      assignedTo: 'Sarah J.',
      leadScore: 45,
      createdAt: '2025-01-08',
      updatedAt: '2025-01-19',
      notes: 'Budget constraints, revisit in Q3',
      outreach: 'Manual'
    },
    {
      id: 8,
      name: 'Jennifer Lee',
      company: 'MediaHub Inc',
      email: 'jlee@mediahub.com',
      phone: '+1 555-0108',
      linkedinUrl: 'https://linkedin.com/in/jenniferlee',
      websiteUrl: 'https://mediahub.com',
      source: 'LinkedIn_Scrape',
      offering: 'saas',
      status: 'New',
      priority: 'Medium',
      assignedTo: 'Mike W.',
      leadScore: 68,
      createdAt: '2025-01-20',
      updatedAt: '2025-01-20',
      notes: 'Initial outreach sent',
      outreach: 'Automated'
    },
    {
      id: 9,
      name: 'Thomas Garcia',
      company: 'RetailMax Corp',
      email: 'tgarcia@retailmax.com',
      phone: '+1 555-0109',
      linkedinUrl: 'https://linkedin.com/in/thomasgarcia',
      websiteUrl: 'https://retailmax.com',
      source: 'Website',
      offering: 'consulting',
      status: 'Contacted',
      priority: 'High',
      assignedTo: 'Alex K.',
      leadScore: 82,
      createdAt: '2025-01-17',
      updatedAt: '2025-01-21',
      notes: 'Interested in consulting services for Q2',
      outreach: 'Automated'
    },
    {
      id: 10,
      name: 'Amanda Taylor',
      company: 'EcoSmart Industries',
      email: 'ataylor@ecosmart.com',
      phone: '+1 555-0110',
      linkedinUrl: 'https://linkedin.com/in/amandataylor',
      websiteUrl: 'https://ecosmart.com',
      source: 'Manual_Entry',
      offering: 'enterprise',
      status: 'Follow-up',
      priority: 'Medium',
      assignedTo: 'Sarah J.',
      leadScore: 75,
      createdAt: '2025-01-14',
      updatedAt: '2025-01-22',
      notes: 'Sent follow-up email with case studies',
      outreach: 'Manual'
    },
    {
      id: 11,
      name: 'Christopher Wilson',
      company: 'NexGen Robotics',
      email: 'cwilson@nexgenrobotics.com',
      phone: '+1 555-0111',
      linkedinUrl: 'https://linkedin.com/in/christopherwilson',
      websiteUrl: 'https://nexgenrobotics.com',
      source: 'CSV_Import',
      offering: 'enterprise',
      status: 'Meeting',
      priority: 'High',
      assignedTo: 'Mike W.',
      leadScore: 89,
      createdAt: '2025-01-11',
      updatedAt: '2025-01-23',
      notes: 'Technical discussion scheduled for Thursday',
      outreach: 'Automated'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'New': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Contacted': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Follow-up': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Meeting': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Proposal': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Won': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Lost': 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'High': 'bg-red-500/20 text-red-400',
      'Medium': 'bg-yellow-500/20 text-yellow-400',
      'Low': 'bg-green-500/20 text-green-400',
    };
    return colors[priority] || 'bg-gray-500/20 text-gray-400';
  };

  const toggleProspectSelection = (id: number) => {
    setSelectedProspects(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleAllProspects = () => {
    if (selectedProspects.length === prospects.length) {
      setSelectedProspects([]);
    } else {
      setSelectedProspects(prospects.map(p => p.id));
    }
  };

  const applyBulkAction = (action: string) => {
    console.log(`Applying ${action} to prospects:`, selectedProspects);
    // Reset selections and close dialogs
    setSelectedProspects([]);
    setShowBulkAssign(false);
    setShowBulkStatus(false);
    setShowBulkPriority(false);
    setShowBulkOutreach(false);
  };

  const openProspectDetail = (prospect: any, tab: string = 'overview') => {
    setSelectedProspect(prospect);
    setDetailTab(tab);
    setNotes(prospect.notes || 'Interested in enterprise package. Discussed pricing.');
    setNextSteps(['Follow up with pricing details', 'Schedule demo for next week', 'Send case studies']);
    setShowProspectDetail(true);
  };

  const generateEmailFromTemplate = () => {
    if (!selectedProspect) return;
    const offering = offerings.find(o => o.id === selectedOffering);
    setEmailBody(`Hi ${selectedProspect.name},

I hope this email finds you well. I noticed that ${selectedProspect.company} might benefit from our ${offering?.name}.

[Your value proposition here]

Would you be open to a quick 15-minute call to discuss how we can help?

Best regards,
Your Name`);
  };

  const generateWithAI = () => {
    if (!selectedProspect) return;
    setEmailBody(`Hi ${selectedProspect.name},

${aiPrompt ? `Based on your request: "${aiPrompt}"` : 'AI-generated personalized message based on prospect data'}

I've been following ${selectedProspect.company}'s growth and believe our Enterprise Solutions could significantly impact your operations.

Would love to schedule a brief call to explore potential synergies.

Best,
Your Name`);
    setShowAIPrompt(false);
    setAiPrompt('');
  };

  const generateScriptWithAI = () => {
    if (!selectedProspect) return;
    setCallScript(`Call Script for ${selectedProspect.name} at ${selectedProspect.company}

OPENING (5 seconds):
"Hi ${selectedProspect.name}, this is [Your Name] from [Company]. Do you have a quick minute?"

VALUE PROPOSITION (15 seconds):
"I noticed ${selectedProspect.company} is in the [industry] space. We help similar companies [specific benefit]. 

DISCOVERY QUESTION:
"Are you currently facing challenges with [pain point]?"

${scriptPrompt ? `\nCustom focus: ${scriptPrompt}` : ''}

NEXT STEPS:
If interested → Schedule demo
If busy → Request email follow-up
If not interested → Thank and end call`);
    setShowScriptAI(false);
    setScriptPrompt('');
  };

  const activityLogs = [
    { id: 1, action: 'Prospect created', user: 'System', time: '2025-01-15 10:30 AM', details: 'Lead imported from LinkedIn scrape' },
    { id: 2, action: 'Status changed', user: 'Sarah J.', time: '2025-01-16 02:15 PM', details: 'Status changed from "New" to "Contacted"' },
    { id: 3, action: 'Email sent', user: 'System (AI)', time: '2025-01-16 02:20 PM', details: 'Outreach email sent via automated campaign' },
    { id: 4, action: 'Email opened', user: selectedProspect?.name || 'Prospect', time: '2025-01-16 03:45 PM', details: 'Prospect opened the email' },
    { id: 5, action: 'Note added', user: 'Sarah J.', time: '2025-01-17 11:00 AM', details: 'Added note: "Interested in enterprise package"' },
    { id: 6, action: 'Priority changed', user: 'Mike W.', time: '2025-01-18 09:30 AM', details: 'Priority changed from "Medium" to "High"' },
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
                <h1 className="text-2xl font-bold text-white">Prospects</h1>
                <p className="text-sm text-gray-400">Manage your leads and prospects</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowStartOutreach(true)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium"
              >
                <Play className="w-4 h-4 mr-2 inline" />
                Start Outreach
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setShowAddProspect(true);
                  setAddProspectMode(null);
                }}
                className="px-4 py-2 rounded-lg bg-white/5 text-white text-sm font-medium border border-white/10"
              >
                <Plus className="w-4 h-4 mr-2 inline" />
                Add Prospect
              </motion.button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mt-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search prospects..."
                className="pl-10 bg-slate-800/50 border-white/10 text-white"
              />
            </div>
            <Select value={selectedOffering} onValueChange={setSelectedOffering}>
              <SelectTrigger className="w-48 bg-slate-800/50 border-white/10 text-white">
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
            <Button variant="outline" className="bg-slate-800/50 border-white/10 text-white">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" className="bg-slate-800/50 border-white/10 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <div className="container mx-auto px-6 py-6">
        {/* Bulk Actions Bar - Top of Table */}
        {selectedProspects.length > 0 && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-4 bg-slate-900 border border-white/10 rounded-xl shadow-2xl p-4 flex items-center gap-3"
          >
            <CheckSquare className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-medium text-white">{selectedProspects.length} selected</span>
            <Separator orientation="vertical" className="h-6 bg-white/20" />
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-white hover:text-cyan-400"
              onClick={() => setShowBulkAssign(true)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Assign
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-white hover:text-cyan-400"
              onClick={() => setShowBulkStatus(true)}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Status
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-white hover:text-cyan-400"
              onClick={() => setShowBulkPriority(true)}
            >
              <Play className="w-4 h-4 mr-2" />
              Priority
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-white hover:text-cyan-400"
              onClick={() => setShowBulkOutreach(true)}
            >
              <Zap className="w-4 h-4 mr-2" />
              Outreach
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-white hover:text-green-400"
              onClick={() => setShowCreateGroup(true)}
            >
              <Users className="w-4 h-4 mr-2" />
              Create Group
            </Button>
            <Separator orientation="vertical" className="h-6 bg-white/20" />
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </motion.div>
        )}

        <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10 bg-slate-800/50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">
                    <input 
                      type="checkbox" 
                      className="rounded border-white/20 w-4 h-4 cursor-pointer" 
                      checked={selectedProspects.length === prospects.length && prospects.length > 0}
                      onChange={toggleAllProspects}
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
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Outreach</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Created At</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Updated At</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {prospects.map((prospect, index) => (
                  <motion.tr
                    key={prospect.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <input 
                        type="checkbox" 
                        className="rounded border-white/20 w-4 h-4 cursor-pointer" 
                        checked={selectedProspects.includes(prospect.id)}
                        onChange={() => toggleProspectSelection(prospect.id)}
                      />
                    </td>
                    <td className="p-4">
                      <span className="text-gray-400 text-sm font-mono">#{prospect.id}</span>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => openProspectDetail(prospect)}
                        className="font-medium text-white hover:text-cyan-400 transition-colors"
                      >
                        {prospect.name}
                      </button>
                    </td>
                    <td className="p-4 text-gray-300">{prospect.company}</td>
                    <td className="p-4">
                      <span className="text-sm text-gray-400">{prospect.email}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-400">{prospect.phone}</span>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-slate-800 text-gray-300 text-xs">{prospect.source}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                        {offerings.find(o => o.id === prospect.offering)?.name || prospect.offering}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={`${getStatusColor(prospect.status)} text-xs border`}>
                        {prospect.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={`${getPriorityColor(prospect.priority)} text-xs`}>
                        {prospect.priority}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600" 
                            style={{ width: `${prospect.leadScore}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-400">{prospect.leadScore}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-300 text-sm">{prospect.assignedTo}</td>
                    <td className="p-4">
                      <Badge className={prospect.outreach === 'Automated' ? 'bg-cyan-500/20 text-cyan-400 text-xs' : 'bg-purple-500/20 text-purple-400 text-xs'}>
                        {prospect.outreach}
                      </Badge>
                    </td>
                    <td className="p-4 text-gray-400 text-sm whitespace-nowrap">{prospect.createdAt}</td>
                    <td className="p-4 text-gray-400 text-sm whitespace-nowrap">{prospect.updatedAt}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openProspectDetail(prospect, 'overview')}
                          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                          title="View Overview"
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openProspectDetail(prospect, 'email')}
                          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                          title="Send Email"
                        >
                          <Mail className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openProspectDetail(prospect, 'calling')}
                          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                          title="Start Call"
                        >
                          <Phone className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openProspectDetail(prospect, 'activity')}
                          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                          title="View Activity"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Bulk Assign Dialog */}
      <Dialog open={showBulkAssign} onOpenChange={setShowBulkAssign}>
        <DialogContent className="bg-slate-900 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Bulk Assign Prospects</DialogTitle>
            <DialogDescription className="text-gray-400">
              Assign {selectedProspects.length} selected prospect(s) to a team member
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
                className="bg-gradient-to-r from-cyan-500 to-blue-600"
              >
                Assign Prospects
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
              Update status for {selectedProspects.length} selected prospect(s)
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
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="meeting">Meeting Scheduled</SelectItem>
                  <SelectItem value="proposal">Proposal Sent</SelectItem>
                  <SelectItem value="won">Won</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setShowBulkStatus(false)} className="bg-white/5 border-white/10 text-white">
                Cancel
              </Button>
              <Button 
                onClick={() => applyBulkAction('status')}
                className="bg-gradient-to-r from-cyan-500 to-blue-600"
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
              Update priority for {selectedProspects.length} selected prospect(s)
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
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setShowBulkPriority(false)} className="bg-white/5 border-white/10 text-white">
                Cancel
              </Button>
              <Button 
                onClick={() => applyBulkAction('priority')}
                className="bg-gradient-to-r from-cyan-500 to-blue-600"
              >
                Update Priority
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Outreach Mode Dialog */}
      <Dialog open={showBulkOutreach} onOpenChange={setShowBulkOutreach}>
        <DialogContent className="bg-slate-900 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Set Outreach Mode</DialogTitle>
            <DialogDescription className="text-gray-400">
              Configure outreach mode for {selectedProspects.length} selected prospect(s)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-gray-300 mb-3 block">Outreach Mode</Label>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setBulkOutreachMode('automated')}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    bulkOutreachMode === 'automated'
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-white/10 bg-slate-800/30'
                  }`}
                >
                  <Zap className={`w-6 h-6 mx-auto mb-2 ${
                    bulkOutreachMode === 'automated' ? 'text-cyan-400' : 'text-gray-400'
                  }`} />
                  <p className="text-sm font-medium text-white">Automated</p>
                  <p className="text-xs text-gray-400 mt-1">AI-powered outreach</p>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setBulkOutreachMode('manual')}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    bulkOutreachMode === 'manual'
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-white/10 bg-slate-800/30'
                  }`}
                >
                  <Edit className={`w-6 h-6 mx-auto mb-2 ${
                    bulkOutreachMode === 'manual' ? 'text-cyan-400' : 'text-gray-400'
                  }`} />
                  <p className="text-sm font-medium text-white">Manual</p>
                  <p className="text-xs text-gray-400 mt-1">Personal outreach</p>
                </motion.button>
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setShowBulkOutreach(false)} className="bg-white/5 border-white/10 text-white">
                Cancel
              </Button>
              <Button 
                onClick={() => applyBulkAction('outreach')}
                className="bg-gradient-to-r from-cyan-500 to-blue-600"
              >
                Set Outreach Mode
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Group Dialog */}
      <Dialog open={showCreateGroup} onOpenChange={setShowCreateGroup}>
        <DialogContent className="bg-slate-900 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Create Group</DialogTitle>
            <DialogDescription className="text-gray-400">
              Create a group from {selectedProspects.length} selected prospect(s)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-gray-300 mb-2 block">Group Name *</Label>
              <Input
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="e.g., Enterprise Q1 Prospects"
                className="bg-slate-800/50 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>
            <div>
              <Label className="text-gray-300 mb-2 block">Description (Optional)</Label>
              <Textarea
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                placeholder="Add a description for this group..."
                className="bg-slate-800/50 border-white/10 text-white placeholder:text-gray-500 min-h-[80px]"
              />
            </div>
            
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-400 mb-1">Selected Prospects</p>
                  <p className="text-xs text-gray-400">
                    {selectedProspects.length} prospect{selectedProspects.length !== 1 ? 's' : ''} will be added to this group
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowCreateGroup(false);
                  setGroupName('');
                  setGroupDescription('');
                }}
                className="bg-white/5 border-white/10 text-white"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  if (groupName.trim()) {
                    console.log('Creating group:', {
                      name: groupName,
                      description: groupDescription,
                      prospectIds: selectedProspects
                    });
                    // Reset and close
                    setShowCreateGroup(false);
                    setGroupName('');
                    setGroupDescription('');
                    setSelectedProspects([]);
                  }
                }}
                disabled={!groupName.trim()}
                className="bg-gradient-to-r from-green-500 to-emerald-600 disabled:opacity-50"
              >
                <Users className="w-4 h-4 mr-2" />
                Create Group
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Prospect Dialog */}
      <Dialog open={showAddProspect} onOpenChange={setShowAddProspect}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">Add New Prospect</DialogTitle>
            <DialogDescription className="text-gray-400">
              {addProspectMode === null && 'Choose how you want to add prospects'}
              {addProspectMode === 'single' && 'Fill in the prospect details'}
              {addProspectMode === 'bulk' && 'Import prospects from CSV file'}
            </DialogDescription>
          </DialogHeader>
          
          {addProspectMode === null && (
            <div className="py-6 space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setAddProspectMode('single')}
                className="w-full p-6 rounded-xl border-2 border-white/10 bg-slate-800/30 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all group"
              >
                <User className="w-8 h-8 mx-auto mb-3 text-cyan-400 group-hover:scale-110 transition-transform" />
                <p className="text-lg font-semibold text-white mb-1">Single Prospect</p>
                <p className="text-sm text-gray-400">Add one prospect manually with detailed information</p>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setAddProspectMode('bulk')}
                className="w-full p-6 rounded-xl border-2 border-white/10 bg-slate-800/30 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all group"
              >
                <Download className="w-8 h-8 mx-auto mb-3 text-blue-400 group-hover:scale-110 transition-transform" />
                <p className="text-lg font-semibold text-white mb-1">Bulk Import</p>
                <p className="text-sm text-gray-400">Upload a CSV file with multiple prospects</p>
              </motion.button>
            </div>
          )}

          {addProspectMode === 'single' && (
            <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">Name *</Label>
                  <Input
                    value={leadFormData.name}
                    onChange={(e) => setLeadFormData({...leadFormData, name: e.target.value})}
                    placeholder="John Doe"
                    className="bg-slate-800/50 border-white/10 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">Company *</Label>
                  <Input
                    value={leadFormData.company}
                    onChange={(e) => setLeadFormData({...leadFormData, company: e.target.value})}
                    placeholder="Acme Corp"
                    className="bg-slate-800/50 border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">Email *</Label>
                  <Input
                    type="email"
                    value={leadFormData.email}
                    onChange={(e) => setLeadFormData({...leadFormData, email: e.target.value})}
                    placeholder="john@acme.com"
                    className="bg-slate-800/50 border-white/10 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">Phone</Label>
                  <Input
                    value={leadFormData.phone}
                    onChange={(e) => setLeadFormData({...leadFormData, phone: e.target.value})}
                    placeholder="+1 555-0101"
                    className="bg-slate-800/50 border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">LinkedIn URL</Label>
                  <Input
                    value={leadFormData.linkedinUrl}
                    onChange={(e) => setLeadFormData({...leadFormData, linkedinUrl: e.target.value})}
                    placeholder="https://linkedin.com/in/johndoe"
                    className="bg-slate-800/50 border-white/10 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">Website URL</Label>
                  <Input
                    value={leadFormData.websiteUrl}
                    onChange={(e) => setLeadFormData({...leadFormData, websiteUrl: e.target.value})}
                    placeholder="https://acme.com"
                    className="bg-slate-800/50 border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">Offering</Label>
                  <Select value={leadFormData.offering} onValueChange={(val) => setLeadFormData({...leadFormData, offering: val})}>
                    <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
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
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">Priority</Label>
                  <Select value={leadFormData.priority} onValueChange={(val) => setLeadFormData({...leadFormData, priority: val})}>
                    <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">Assign To</Label>
                  <Select value={leadFormData.assignedTo} onValueChange={(val) => setLeadFormData({...leadFormData, assignedTo: val})}>
                    <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Sarah J.</SelectItem>
                      <SelectItem value="mike">Mike W.</SelectItem>
                      <SelectItem value="alex">Alex K.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-gray-300 mb-2 block">Notes</Label>
                <Textarea
                  value={leadFormData.notes}
                  onChange={(e) => setLeadFormData({...leadFormData, notes: e.target.value})}
                  placeholder="Add any additional notes..."
                  className="bg-slate-800/50 border-white/10 text-white min-h-[80px]"
                />
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setAddProspectMode(null);
                    setLeadFormData({
                      name: '',
                      company: '',
                      email: '',
                      phone: '',
                      linkedinUrl: '',
                      websiteUrl: '',
                      source: 'Manual_Entry',
                      offering: 'enterprise',
                      priority: 'Medium',
                      assignedTo: '',
                      notes: ''
                    });
                  }}
                  className="bg-white/5 border-white/10 text-white"
                >
                  Back
                </Button>
                <Button 
                  onClick={() => {
                    console.log('Adding prospect:', leadFormData);
                    setShowAddProspect(false);
                    setAddProspectMode(null);
                  }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Prospect
                </Button>
              </div>
            </div>
          )}

          {addProspectMode === 'bulk' && (
            <div className="py-6 space-y-4">
              <div className="p-8 border-2 border-dashed border-white/20 rounded-xl bg-slate-800/30 text-center">
                <Download className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                <p className="text-white font-medium mb-2">Upload CSV File</p>
                <p className="text-sm text-gray-400 mb-4">
                  Drag and drop your CSV file here or click to browse
                </p>
                <Input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                  className="max-w-xs mx-auto"
                />
                {csvFile && (
                  <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                    <p className="text-sm text-cyan-400">Selected: {csvFile.name}</p>
                  </div>
                )}
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-sm text-blue-400 font-medium mb-2">CSV Format Requirements:</p>
                <p className="text-xs text-gray-400">
                  Your CSV should include columns: Name, Company, Email, Phone, LinkedIn URL, Website URL, Offering, Priority
                </p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-3 text-xs border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                >
                  <Download className="w-3 h-3 mr-1.5" />
                  Download Template
                </Button>
              </div>

              <div className="flex gap-2 justify-end pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setAddProspectMode(null);
                    setCsvFile(null);
                  }}
                  className="bg-white/5 border-white/10 text-white"
                >
                  Back
                </Button>
                <Button 
                  onClick={() => {
                    console.log('Importing CSV:', csvFile);
                    setShowAddProspect(false);
                    setAddProspectMode(null);
                    setCsvFile(null);
                  }}
                  disabled={!csvFile}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 disabled:opacity-50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import Prospects
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Start Outreach Dialog - Multi-Step */}
      <Dialog open={showStartOutreach} onOpenChange={(open) => {
        setShowStartOutreach(open);
        if (!open) {
          // Reset all states when dialog closes
          setOutreachStep(1);
          setOutreachOffering('');
          setOutreachMethod(null);
          setOutreachChannels([]);
          setFollowUpCount('');
          setFollowUpFrequency('');
          setTimeOfFollowUp('');
          setStartTime('');
          setCustomDate('');
          setCustomTime('');
          setTestFrom('');
          setTestTo('');
          setTestSubject('');
          setTestBody('');
          setCustomFollowUpCount('');
          setCustomFrequency('');
          setOutreachTemplates({});
          setOutreachCurrentOfferingIndex(0);
          setFollowupStrategy({});
          setOutreachAIPrompt('');
        }
      }}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              Start Outreach Campaign
              <Badge variant="secondary" className="ml-auto">
                Step {outreachStep} of 2
              </Badge>
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {outreachStep === 1 ? 'Configure your outreach strategy' : 'Set up message templates'}
            </DialogDescription>
          </DialogHeader>

          {outreachStep === 1 && (
            <div className="space-y-6 py-4">
              {/* Step 1: Offering Selection & Outreach Configuration */}
              <div>
                <Label className="text-gray-300 mb-3 block">Select Offering *</Label>
                <Select value={outreachOffering} onValueChange={setOutreachOffering}>
                  <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                    <SelectValue placeholder="Choose an offering..." />
                  </SelectTrigger>
                  <SelectContent>
                    {offerings.map(offering => (
                      <SelectItem key={offering.id} value={offering.id}>
                        {offering.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {outreachOffering && (
                <>
                  <Separator className="bg-white/10" />
                  
                  <div>
                    <Label className="text-gray-300 mb-4 block">Choose Outreach Method *</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Card 
                          className={`cursor-pointer transition-all border-2 ${
                            outreachMethod === 'manual' 
                              ? 'border-cyan-500 shadow-lg shadow-cyan-500/20 bg-cyan-500/5' 
                              : 'border-white/10 hover:border-cyan-500/50 bg-slate-800/50'
                          }`}
                          onClick={() => setOutreachMethod('manual')}
                        >
                          <CardHeader className="text-center pb-4">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 mx-auto mb-3">
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
                              ? 'border-cyan-500 shadow-lg shadow-cyan-500/20 bg-cyan-500/5' 
                              : 'border-white/10 hover:border-cyan-500/50 bg-slate-800/50'
                          }`}
                          onClick={() => setOutreachMethod('ai')}
                        >
                          <CardHeader className="text-center pb-4">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 mx-auto mb-3">
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
                      <Separator className="bg-white/10" />

                      <div className="bg-slate-800/50 rounded-xl p-4 border border-white/10">
                        <Label className="text-gray-300 mb-3 block">Outreach Channels</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {['Cold Calling', 'Cold Mailing', 'LinkedIn DM', 'WhatsApp DM'].map((channel) => (
                            <div key={channel} className="flex items-center space-x-2 p-3 rounded-lg bg-slate-900/50 border border-white/10 hover:border-cyan-500/50 transition-colors">
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
                                className="data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
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
                              <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                          </Select>
                          {followUpCount === 'custom' && (
                            <Input
                              type="number"
                              min="1"
                              placeholder="Enter number"
                              value={customFollowUpCount}
                              onChange={(e) => setCustomFollowUpCount(e.target.value)}
                              className="mt-3 bg-slate-900/50 border-white/10 text-white"
                            />
                          )}
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
                              <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                          </Select>
                          {followUpFrequency === 'custom' && (
                            <Input
                              type="number"
                              min="1"
                              placeholder="Enter days"
                              value={customFrequency}
                              onChange={(e) => setCustomFrequency(e.target.value)}
                              className="mt-3 bg-slate-900/50 border-white/10 text-white"
                            />
                          )}
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

                      {startTime === 'test' && (
                        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                          <div className="flex items-start gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-orange-500/20">
                              <AlertCircle className="w-5 h-5 text-orange-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-white mb-1">Test Dummy Reach</h4>
                              <p className="text-sm text-gray-400 mb-4">
                                We will not send emails to leads. Test your templates internally.
                              </p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="testFrom" className="text-gray-300 mb-2 block">From</Label>
                                <Input
                                  id="testFrom"
                                  type="email"
                                  value={testFrom}
                                  onChange={(e) => setTestFrom(e.target.value)}
                                  placeholder="sender@company.com"
                                  className="bg-slate-900/50 border-white/10 text-white"
                                />
                              </div>
                              <div>
                                <Label htmlFor="testTo" className="text-gray-300 mb-2 block">To</Label>
                                <Input
                                  id="testTo"
                                  type="email"
                                  value={testTo}
                                  onChange={(e) => setTestTo(e.target.value)}
                                  placeholder="recipient@company.com"
                                  className="bg-slate-900/50 border-white/10 text-white"
                                />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="testSubject" className="text-gray-300 mb-2 block">Subject</Label>
                              <Input
                                id="testSubject"
                                value={testSubject}
                                onChange={(e) => setTestSubject(e.target.value)}
                                placeholder="Your test email subject"
                                className="bg-slate-900/50 border-white/10 text-white"
                              />
                            </div>

                            <div>
                              <Label htmlFor="testBody" className="text-gray-300 mb-2 block">Body (Select from templates)</Label>
                              <Textarea
                                id="testBody"
                                value={testBody}
                                onChange={(e) => setTestBody(e.target.value)}
                                placeholder="Your test email body..."
                                className="min-h-[120px] bg-slate-900/50 border-white/10 text-white"
                              />
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-4 border border-white/10">
                              <p className="text-sm text-gray-400 italic">
                                📝 Note: You have to change this from settings in order to start automated outreach
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </>
              )}

              <div className="flex gap-2 justify-end pt-4 border-t border-white/10">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowStartOutreach(false);
                  }}
                  className="bg-white/5 border-white/10 text-white"
                >
                  Cancel
                </Button>
                {outreachOffering && outreachMethod && (
                  <Button 
                    onClick={() => {
                      if (outreachMethod === 'manual') {
                        // Skip to templates if manual
                        setOutreachStep(2);
                      } else {
                        // Go to templates if AI automated
                        setOutreachStep(2);
                      }
                    }}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600"
                  >
                    Continue to Templates <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {outreachStep === 2 && (
            <div className="space-y-6 py-4">
              {/* Step 2: Templates Configuration */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 mx-auto mb-3">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Configure Templates for {offerings.find(o => o.id === outreachOffering)?.name}
                </h3>
                <p className="text-sm text-gray-400">Set up your outreach, follow-up, and closing templates</p>
              </div>

              {outreachOffering && (
                <div className="space-y-6">
                  {/* Outreach Template */}
                  <div className="bg-slate-800/50 rounded-xl p-5 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                          1
                        </div>
                        <Label className="text-base font-semibold text-white">Outreach Template</Label>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 border-cyan-500/30 hover:bg-cyan-500/10 text-cyan-400"
                        onClick={() => {
                          const prompt = outreachAIPrompt || '';
                          const aiTemplate = `Hi {{FirstName}},\n\n${prompt || `I noticed your company might benefit from our ${offerings.find(o => o.id === outreachOffering)?.name}.`}\n\nWould you be open to a quick chat?\n\nBest regards,\n{{YourName}}`;
                          setOutreachTemplates({
                            ...outreachTemplates,
                            [`${outreachOffering}-outreach`]: aiTemplate
                          });
                          setOutreachAIPrompt('');
                        }}
                      >
                        <Sparkles className="w-4 h-4" />
                        Generate with AI
                      </Button>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-3 border border-white/10 mb-3">
                      <Label htmlFor="outreach-ai-prompt" className="text-sm font-medium mb-2 block text-gray-300">
                        AI Generation Prompt (Optional)
                      </Label>
                      <Input
                        id="outreach-ai-prompt"
                        placeholder="E.g., Focus on cost savings and automation benefits..."
                        value={outreachAIPrompt}
                        onChange={(e) => setOutreachAIPrompt(e.target.value)}
                        className="bg-slate-800/50 border-white/10 text-white"
                      />
                    </div>
                    <Textarea
                      placeholder="Hi {{FirstName}},\n\nYour outreach message here...\n\nBest regards,\n{{YourName}}"
                      className="min-h-[140px] bg-slate-900/50 border-white/10 font-mono text-sm text-white"
                      value={outreachTemplates[`${outreachOffering}-outreach`] || ''}
                      onChange={(e) => {
                        setOutreachTemplates({
                          ...outreachTemplates,
                          [`${outreachOffering}-outreach`]: e.target.value
                        });
                      }}
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 border-white/10 hover:bg-white/5 text-gray-300"
                        onClick={() => {
                          const link = window.prompt('Enter link to insert:');
                          if (link) {
                            const currentValue = outreachTemplates[`${outreachOffering}-outreach`] || '';
                            setOutreachTemplates({
                              ...outreachTemplates,
                              [`${outreachOffering}-outreach`]: currentValue + ` ${link}`
                            });
                          }
                        }}
                      >
                        <Link2 className="w-4 h-4" />
                        Insert Link
                      </Button>
                    </div>
                  </div>

                  {/* Follow-up Template */}
                  {outreachMethod === 'ai' && (
                    <div className="bg-slate-800/50 rounded-xl p-5 border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                            2
                          </div>
                          <Label className="text-base font-semibold text-white">Follow-up Template</Label>
                        </div>
                      </div>
                      <div className="mb-4 space-y-2">
                        <Label className="text-sm text-gray-300">Follow-up Strategy</Label>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="same-followup"
                              name="followup-strategy"
                              checked={followupStrategy[outreachOffering] !== 'custom'}
                              onChange={() => setFollowupStrategy({ ...followupStrategy, [outreachOffering]: 'same' })}
                              className="w-4 h-4 text-cyan-500"
                            />
                            <label htmlFor="same-followup" className="text-sm text-gray-300">Same template for all follow-ups</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="custom-followup"
                              name="followup-strategy"
                              checked={followupStrategy[outreachOffering] === 'custom'}
                              onChange={() => setFollowupStrategy({ ...followupStrategy, [outreachOffering]: 'custom' })}
                              className="w-4 h-4 text-cyan-500"
                            />
                            <label htmlFor="custom-followup" className="text-sm text-gray-300">Customize each follow-up</label>
                          </div>
                        </div>
                      </div>
                      {followupStrategy[outreachOffering] === 'custom' ? (
                        <div className="space-y-3">
                          {Array.from({ length: parseInt(followUpCount === 'custom' ? customFollowUpCount : followUpCount || '1') }).map((_, idx) => (
                            <div key={idx} className="bg-slate-900/50 rounded-lg p-3 border border-white/10">
                              <Label className="text-sm font-medium mb-2 block text-gray-300">Follow-up {idx + 1}</Label>
                              <Textarea
                                placeholder={`Follow-up ${idx + 1} message...`}
                                className="min-h-[100px] bg-slate-800/50 border-white/10 text-white"
                                value={outreachTemplates[`${outreachOffering}-followup-${idx + 1}`] || ''}
                                onChange={(e) => {
                                  setOutreachTemplates({
                                    ...outreachTemplates,
                                    [`${outreachOffering}-followup-${idx + 1}`]: e.target.value
                                  });
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Textarea
                          placeholder="Follow-up message template..."
                          className="min-h-[140px] bg-slate-900/50 border-white/10 font-mono text-sm text-white"
                          value={outreachTemplates[`${outreachOffering}-followup`] || ''}
                          onChange={(e) => {
                            setOutreachTemplates({
                              ...outreachTemplates,
                              [`${outreachOffering}-followup`]: e.target.value
                            });
                          }}
                        />
                      )}
                    </div>
                  )}

                  {/* Closing Template */}
                  <div className="bg-slate-800/50 rounded-xl p-5 border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-sm">
                        3
                      </div>
                      <Label className="text-base font-semibold text-white">Closing Template</Label>
                    </div>
                    <Textarea
                      placeholder="Closing message template..."
                      className="min-h-[140px] bg-slate-900/50 border-white/10 font-mono text-sm text-white"
                      value={outreachTemplates[`${outreachOffering}-closing`] || ''}
                      onChange={(e) => {
                        setOutreachTemplates({
                          ...outreachTemplates,
                          [`${outreachOffering}-closing`]: e.target.value
                        });
                      }}
                    />
                  </div>
                </div>
              )}

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
                    console.log('Outreach Configuration:', {
                      offering: outreachOffering,
                      method: outreachMethod,
                      channels: outreachChannels,
                      followUpCount: followUpCount === 'custom' ? customFollowUpCount : followUpCount,
                      followUpFrequency: followUpFrequency === 'custom' ? customFrequency : followUpFrequency,
                      timeOfFollowUp,
                      startTime,
                      templates: outreachTemplates
                    });
                    setShowStartOutreach(false);
                    // Reset states
                    setOutreachStep(1);
                    setOutreachOffering('');
                    setOutreachMethod(null);
                    setOutreachChannels([]);
                    setFollowUpCount('');
                    setFollowUpFrequency('');
                    setTimeOfFollowUp('');
                    setStartTime('');
                    setCustomDate('');
                    setCustomTime('');
                    setTestFrom('');
                    setTestTo('');
                    setTestSubject('');
                    setTestBody('');
                    setCustomFollowUpCount('');
                    setCustomFrequency('');
                    setOutreachTemplates({});
                    setOutreachCurrentOfferingIndex(0);
                    setFollowupStrategy({});
                    setOutreachAIPrompt('');
                  }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Complete Setup
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Prospect Detail Dialog */}
      <Dialog open={showProspectDetail} onOpenChange={setShowProspectDetail}>
        <DialogContent className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-white/10 max-w-7xl max-h-[92vh] overflow-hidden p-0 shadow-2xl">
          {selectedProspect && (
            <>
              {/* Premium Header with Gradient */}
              <DialogHeader className="border-b border-white/10 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-6 shrink-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-cyan-500/30 shrink-0">
                      {selectedProspect.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <DialogTitle className="text-2xl font-bold text-white mb-2 truncate">{selectedProspect.name}</DialogTitle>
                      <DialogDescription className="text-gray-400 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                        <span className="flex items-center gap-1.5 shrink-0">
                          <Building className="w-3.5 h-3.5 text-gray-500" />
                          <span className="truncate">{selectedProspect.company}</span>
                        </span>
                        <span className="text-gray-600 shrink-0">•</span>
                        <span className="flex items-center gap-1.5 shrink-0">
                          <Mail className="w-3.5 h-3.5 text-gray-500" />
                          <span className="truncate">{selectedProspect.email}</span>
                        </span>
                      </DialogDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 border border-cyan-500/30 px-3 py-1.5 text-sm font-medium whitespace-nowrap">
                      <TrendingUp className="w-3.5 h-3.5 mr-1.5 inline-block" />
                      Score {selectedProspect.score}
                    </Badge>
                    <Badge className={`px-3 py-1.5 text-sm font-medium whitespace-nowrap ${
                      selectedProspect.priority === 'High' 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {selectedProspect.priority} Priority
                    </Badge>
                  </div>
                </div>
              </DialogHeader>

              {/* Content Container */}
              <div>
                <Tabs value={detailTab} onValueChange={setDetailTab} className="w-full">
                  <div className="px-6 pt-4 pb-2">
                    <TabsList className="bg-slate-800/30 border border-white/10 p-1.5 w-full grid grid-cols-4 gap-2 rounded-xl backdrop-blur-sm">
                    <TabsTrigger 
                      value="overview" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/30 rounded-lg py-3 transition-all duration-300"
                    >
                      <User className="w-4 h-4 mr-2" />
                      <span className="font-medium">Overview</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="email" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/30 rounded-lg py-3 transition-all duration-300"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="font-medium">Email</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="calling" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/30 rounded-lg py-3 transition-all duration-300"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      <span className="font-medium">Calling</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="activity" 
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/30 rounded-lg py-3 transition-all duration-300"
                    >
                      <Activity className="w-4 h-4 mr-2" />
                      <span className="font-medium">Activity</span>
                    </TabsTrigger>
                  </TabsList>
                  </div>

                {/* Overview Tab */}
                <TabsContent value="overview" className="max-h-[60vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="max-w-4xl mx-auto space-y-6">
                      {/* Contact Information Card */}
                      <Card className="border border-white/10 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm shadow-xl">
                        <CardHeader className="border-b border-white/10 bg-gradient-to-r from-slate-800/50 to-transparent p-5">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 shrink-0">
                                <User className="w-4 h-4 text-cyan-400" />
                              </div>
                              <CardTitle className="text-white font-semibold truncate">Contact Information</CardTitle>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setIsEditing(!isEditing)}
                              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-600/10 hover:from-cyan-500/20 hover:to-blue-600/20 border border-cyan-500/30 text-cyan-400 font-medium text-sm transition-all duration-300 whitespace-nowrap shrink-0"
                            >
                              {isEditing ? (
                                <>
                                  <Save className="w-4 h-4 mr-2 inline-block" />
                                  <span>Save</span>
                                </>
                              ) : (
                                <>
                                  <Edit className="w-4 h-4 mr-2 inline-block" />
                                  <span>Edit Info</span>
                                </>
                              )}
                            </motion.button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6">
                          {isEditing ? (
                            <div className="grid grid-cols-2 gap-5">
                              <div className="space-y-2">
                                <Label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                                  <User className="w-3 h-3 text-cyan-400" />
                                  Full Name
                                </Label>
                                <Input 
                                  defaultValue={selectedProspect.name} 
                                  className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all h-11 rounded-lg" 
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                                  <Building className="w-3 h-3 text-blue-400" />
                                  Company
                                </Label>
                                <Input 
                                  defaultValue={selectedProspect.company} 
                                  className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all h-11 rounded-lg" 
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                                  <Mail className="w-3 h-3 text-purple-400" />
                                  Email Address
                                </Label>
                                <Input 
                                  defaultValue={selectedProspect.email} 
                                  className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all h-11 rounded-lg" 
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                                  <Phone className="w-3 h-3 text-green-400" />
                                  Phone Number
                                </Label>
                                <Input 
                                  defaultValue={selectedProspect.phone} 
                                  className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all h-11 rounded-lg" 
                                />
                              </div>
                              <div className="space-y-2 col-span-2">
                                <Label className="text-gray-300 text-sm font-medium flex items-center gap-2">
                                  <Link2 className="w-3 h-3 text-orange-400" />
                                  LinkedIn URL
                                </Label>
                                <Input 
                                  defaultValue={selectedProspect.linkedinUrl} 
                                  className="bg-slate-800/50 border-white/10 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all h-11 rounded-lg" 
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/5 hover:border-cyan-500/30 transition-all min-w-0">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-lg bg-cyan-500/10 shrink-0">
                                      <Mail className="w-4 h-4 text-cyan-400" />
                                    </div>
                                    <Label className="text-gray-400 text-xs font-medium uppercase tracking-wide">Email</Label>
                                  </div>
                                  <p className="text-white font-medium ml-11 truncate" title={selectedProspect.email}>{selectedProspect.email}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/5 hover:border-purple-500/30 transition-all min-w-0">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-lg bg-purple-500/10 shrink-0">
                                      <Link2 className="w-4 h-4 text-purple-400" />
                                    </div>
                                    <Label className="text-gray-400 text-xs font-medium uppercase tracking-wide">LinkedIn</Label>
                                  </div>
                                  <a href={selectedProspect.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 font-medium ml-11 group truncate">
                                    <span className="truncate">View Profile</span>
                                    <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                                  </a>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/5 hover:border-blue-500/30 transition-all min-w-0">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-lg bg-blue-500/10 shrink-0">
                                      <Phone className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <Label className="text-gray-400 text-xs font-medium uppercase tracking-wide">Phone</Label>
                                  </div>
                                  <p className="text-white font-medium ml-11 truncate" title={selectedProspect.phone}>{selectedProspect.phone}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/5 hover:border-green-500/30 transition-all min-w-0">
                                  <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-lg bg-green-500/10 shrink-0">
                                      <Building className="w-4 h-4 text-green-400" />
                                    </div>
                                    <Label className="text-gray-400 text-xs font-medium uppercase tracking-wide">Website</Label>
                                  </div>
                                  <a href={selectedProspect.websiteUrl || '#'} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 font-medium ml-11 group truncate">
                                    <span className="truncate">Visit Site</span>
                                    <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Notes Card */}
                      <Card className="border border-white/10 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm shadow-xl">
                        <CardHeader className="border-b border-white/10 bg-gradient-to-r from-slate-800/50 to-transparent p-5">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30 shrink-0">
                              <FileText className="w-4 h-4 text-purple-400" />
                            </div>
                            <CardTitle className="text-white font-semibold truncate">Notes & Comments</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                          <Textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add your notes about this prospect..."
                            className="bg-slate-800/50 border-white/10 text-white min-h-[120px] focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all rounded-lg resize-none"
                          />
                          <Separator className="bg-white/10" />
                          <div className="flex gap-3">
                            <Input
                              placeholder="Quick note..."
                              value={newNote}
                              onChange={(e) => setNewNote(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter' && newNote.trim()) {
                                  setNotes(notes + '\n\n' + newNote);
                                  setNewNote('');
                                }
                              }}
                              className="flex-1 bg-slate-800/50 border-white/10 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all h-11 rounded-lg"
                            />
                            <Button
                              onClick={() => {
                                if (newNote.trim()) {
                                  setNotes(notes + '\n\n' + newNote);
                                  setNewNote('');
                                }
                              }}
                              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/30 h-11 px-5"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Quick Actions Card */}
                      <Card className="border border-white/10 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm shadow-xl">
                        <CardHeader className="border-b border-white/10 bg-gradient-to-r from-slate-800/50 to-transparent p-5">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shrink-0">
                              <Zap className="w-4 h-4 text-white" />
                            </div>
                            <CardTitle className="text-lg font-semibold text-white">Quick Actions</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="grid grid-cols-3 gap-4">
                            <Button
                              onClick={() => setDetailTab('email')}
                              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-cyan-500/25 transition-all h-12 text-base font-medium"
                            >
                              <Mail className="w-4 h-4 mr-2" />
                              Send Email
                            </Button>
                            <Button
                              onClick={() => setDetailTab('calling')}
                              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-500/25 transition-all h-12 text-base font-medium"
                            >
                              <Phone className="w-4 h-4 mr-2" />
                              Start Call
                            </Button>
                            <Button
                              variant="outline"
                              className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10 hover:text-orange-300 hover:border-orange-500/50 transition-all h-12 text-base font-medium"
                            >
                              <Calendar className="w-4 h-4 mr-2" />
                              Schedule Meeting
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* Email Tab */}
                <TabsContent value="email" className="max-h-[60vh] overflow-y-auto">
                  <div className="p-6 space-y-5">
                    <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-1">
                      <button
                        onClick={() => setEmailMode('automated')}
                        className={`px-3 py-1.5 rounded text-sm transition-all ${
                          emailMode === 'automated'
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <Zap className="w-3 h-3 inline mr-1" />
                        Automated
                      </button>
                      <button
                        onClick={() => setEmailMode('manual')}
                        className={`px-3 py-1.5 rounded text-sm transition-all ${
                          emailMode === 'manual'
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <Edit className="w-3 h-3 inline mr-1" />
                        Manual
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white text-xs">
                        <FileText className="w-3 h-3 mr-2" />
                        Save Draft
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-xs">
                        <Send className="w-3 h-3 mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label className="text-gray-400 mb-2 block text-xs">Offering</Label>
                      <Select value={selectedOffering} onValueChange={setSelectedOffering}>
                        <SelectTrigger className="bg-slate-800/50 border-white/10 text-white text-sm h-9">
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
                    </div>
                    <div>
                      <Label className="text-gray-400 mb-2 block text-xs">From</Label>
                      <Input 
                        placeholder="you@company.com"
                        defaultValue="sales@yourcompany.com"
                        className="bg-slate-800/50 border-white/10 text-white text-sm h-9"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-400 mb-2 block text-xs">To</Label>
                      <Input 
                        value={selectedProspect.email} 
                        readOnly 
                        className="bg-slate-800/50 border-white/10 text-white text-sm h-9"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-400 mb-2 block text-xs">Subject</Label>
                    <Input 
                      placeholder="Enter subject..."
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="bg-slate-800/50 border-white/10 text-white text-sm"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-gray-400 text-xs">Opening Email</Label>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={generateEmailFromTemplate}
                          className="text-blue-400 hover:text-blue-300 text-xs h-7"
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          Template
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => setShowAIPrompt(!showAIPrompt)}
                          className="text-cyan-400 hover:text-cyan-300 text-xs h-7"
                        >
                          <Sparkles className="w-3 h-3 mr-1" />
                          AI
                        </Button>
                      </div>
                    </div>
                    
                    {showAIPrompt && (
                      <div className="mb-3 p-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30">
                        <Label className="text-white text-xs mb-2 block">AI Prompt</Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="E.g., Focus on cost savings..."
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            className="flex-1 bg-slate-800/50 border-white/10 text-white text-sm h-9"
                          />
                          <Button onClick={generateWithAI} size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-600">
                            Go
                          </Button>
                          <Button onClick={() => setShowAIPrompt(false)} size="sm" variant="ghost">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    <Textarea 
                      placeholder="Type your opening message..."
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      className="bg-slate-800/50 border-white/10 text-white min-h-[120px] text-sm"
                    />
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-cyan-400" />
                      Follow-ups ({offerings.find(o => o.id === selectedOffering)?.followUpCount || 0})
                    </h3>
                    
                    {Array.from({ length: offerings.find(o => o.id === selectedOffering)?.followUpCount || 0 }).map((_, index) => (
                      <Card key={index} className="border-white/10 bg-slate-800/30">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-white text-xs">Follow-up #{index + 1}</CardTitle>
                            <Button size="sm" variant="ghost" className="text-cyan-400 hover:text-cyan-300 text-xs h-6">
                              <Sparkles className="w-3 h-3 mr-1" />
                              AI
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <Textarea
                            placeholder={`Follow-up email ${index + 1}...`}
                            value={followUpBodies[index] || ''}
                            onChange={(e) => {
                              const newBodies = [...followUpBodies];
                              newBodies[index] = e.target.value;
                              setFollowUpBodies(newBodies);
                            }}
                            className="bg-slate-800/50 border-white/10 text-white min-h-[80px] text-sm"
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Separator className="bg-white/10" />

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-gray-400 text-xs">Closing Email</Label>
                      <Button size="sm" variant="ghost" className="text-cyan-400 hover:text-cyan-300 text-xs h-7">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI
                      </Button>
                    </div>
                    <Textarea 
                      placeholder="Final closing message..."
                      value={closingBody}
                      onChange={(e) => setClosingBody(e.target.value)}
                      className="bg-slate-800/50 border-white/10 text-white min-h-[80px] text-sm"
                    />
                  </div>
                  </div>
                </TabsContent>

                {/* Calling Tab */}
                <TabsContent value="calling" className="max-h-[60vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="max-w-5xl mx-auto space-y-6">
                      {/* Demo Call Button (when no transcript) */}
                      {!callTranscript && (
                        <div className="flex justify-end">
                          <Button
                            onClick={() => {
                              setCallTranscript('John: Hello?\nYou: Hi John, this is [Name] from [Company]...\nJohn: Oh yes, what can I do for you?\nYou: I wanted to discuss our Enterprise Solutions that could help streamline your operations.\nJohn: That sounds interesting. What kind of benefits are we talking about?\nYou: Based on your company profile, I believe we can reduce your operational costs by 30% and improve efficiency significantly.');
                              setCallSummary('Call Duration: 4 minutes 23 seconds\nOutcome: Interested - Scheduled follow-up demo\nKey Points: Discussed pricing, enterprise features, and implementation timeline\nNext Action: Follow-up demo scheduled for next Tuesday at 2 PM');
                            }}
                            variant="outline"
                            className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
                          >
                            <PlayCircle className="w-4 h-4 mr-2" />
                            Simulate Completed Call (Demo)
                          </Button>
                        </div>
                      )}

                      {/* Call Transcript & Summary (Top Section) */}
                      {callTranscript && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <Card className="border border-white/10 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm shadow-xl">
                            <CardHeader className="border-b border-white/10 bg-gradient-to-r from-slate-800/50 to-transparent p-5">
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shrink-0">
                                  <MessageSquare className="w-4 h-4 text-white" />
                                </div>
                                <CardTitle className="text-lg font-semibold text-white">Call Transcript</CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent className="p-6">
                              <pre className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">{callTranscript}</pre>
                            </CardContent>
                          </Card>

                          {callSummary && (
                            <Card className="border border-white/10 bg-gradient-to-br from-green-500/10 to-emerald-600/10 backdrop-blur-sm shadow-xl">
                              <CardHeader className="border-b border-white/10 bg-gradient-to-r from-green-500/20 to-emerald-600/20 p-5">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shrink-0">
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                  </div>
                                  <CardTitle className="text-lg font-semibold text-white">Call Summary</CardTitle>
                                </div>
                              </CardHeader>
                              <CardContent className="p-6">
                                <pre className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">{callSummary}</pre>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      )}

                      {/* Script for Next Call */}
                      <Card className="border border-white/10 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm shadow-xl">
                        <CardHeader className="border-b border-white/10 bg-gradient-to-r from-slate-800/50 to-transparent p-5">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shrink-0">
                              <FileText className="w-4 h-4 text-white" />
                            </div>
                            <CardTitle className="text-lg font-semibold text-white">Script for Next Call</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                          <div className="flex gap-3">
                            <Input
                              placeholder="E.g., Focus on cost savings and ROI..."
                              value={scriptPrompt}
                              onChange={(e) => setScriptPrompt(e.target.value)}
                              className="flex-1 bg-slate-800/50 border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all h-11"
                            />
                            <Button 
                              onClick={generateScriptWithAI} 
                              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-cyan-500/25 h-11 px-6"
                            >
                              <Sparkles className="w-4 h-4 mr-2" />
                              Generate from AI
                            </Button>
                          </div>

                          {callScript && (
                            <div className="p-5 rounded-xl bg-slate-900/50 border border-white/10">
                              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">{callScript}</pre>
                            </div>
                          )}

                          {!callScript && (
                            <div className="text-center py-8">
                              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-600/20 flex items-center justify-center">
                                <FileText className="w-8 h-8 text-blue-400" />
                              </div>
                              <p className="text-gray-400 text-sm">Enter a prompt above and click "Generate from AI" to create your call script</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Notes Section */}
                      <Card className="border border-white/10 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm shadow-xl">
                        <CardHeader className="border-b border-white/10 bg-gradient-to-r from-slate-800/50 to-transparent p-5">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shrink-0">
                              <FileText className="w-4 h-4 text-white" />
                            </div>
                            <CardTitle className="text-lg font-semibold text-white">Call Notes</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                          <Textarea
                            placeholder="Add your notes during or after the call..."
                            value={callNotes}
                            onChange={(e) => setCallNotes(e.target.value)}
                            className="bg-slate-900/50 border-white/10 text-white placeholder:text-gray-500 min-h-[150px] focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                          />
                          <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-cyan-500/25 h-11">
                            <Plus className="w-4 h-4 mr-2" />
                            Save Note
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* Activity Tab */}
                <TabsContent value="activity" className="max-h-[60vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="space-y-4">
                      {activityLogs.map((log, index) => (
                        <motion.div
                          key={log.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Card className="border border-white/10 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-cyan-500/30 transition-all">
                            <CardContent className="p-5">
                              <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                                    <Activity className="w-5 h-5 text-white" />
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-3 mb-2">
                                    <h4 className="font-semibold text-white">{log.action}</h4>
                                    <Badge className="bg-gradient-to-r from-slate-700 to-slate-800 text-gray-300 text-xs border border-white/10 whitespace-nowrap shrink-0">
                                      {log.time}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-300 mb-2 leading-relaxed">{log.details}</p>
                                  <p className="text-xs text-gray-500 flex items-center gap-1.5">
                                    <User className="w-3 h-3" />
                                    <span>by {log.user}</span>
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                  </div>
                  </div>
                </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

