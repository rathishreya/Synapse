'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Sparkles,
  TrendingUp,
  Users,
  Mail,
  Phone,
  Target,
  Calendar,
  MessageSquare,
  CheckCircle2,
  ArrowUpRight,
  Plus,
  X,
  Linkedin,
  ExternalLink,
  Send,
  Video,
  Mic,
  Clock,
  User,
  Building2,
  Pencil,
  Trash2,
  Download,
  Filter,
  Search,
  MoreVertical,
  Bot,
  Zap,
  Award,
  Bell
} from 'lucide-react';
import Link from 'next/link';

type Lead = {
  lead_id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  linkedin_url: string;
  source: 'LinkedIn_Scrape' | 'Website' | 'CSV_Import' | 'Manual_Entry';
  offering: 'New' | 'Contacted' | 'Follow-up' | 'Meeting' | 'Proposal' | 'Won' | 'Lost';
  status: string;
  priority: 'High' | 'Medium' | 'Low';
  assigned_to: string;
  lead_score: number;
  created_at: string;
  updated_at: string;
  notes?: string;
  next_steps?: string;
};

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: string;
};

type TeamTask = {
  id: string;
  task: string;
  status: 'completed' | 'in-progress' | 'pending';
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  completedAt?: string;
};

type TeamMember = {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  status: 'Active' | 'Away' | 'Offline';
  currentTask: string;
  tasksAssigned: number;
  tasksCompleted: number;
  tasksPending: number;
  tasksInProgress: number;
  dailyCompletion: number;
  weeklyCompletion: number;
  monthlyCompletion: number;
  tasks: TeamTask[];
};

export default function DashboardPage() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showLeadDetail, setShowLeadDetail] = useState(false);
  const [showAddLead, setShowAddLead] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [emailTemplate, setEmailTemplate] = useState('');
  const [isGeneratingEmail, setIsGeneratingEmail] = useState(false);
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [emailPrompt, setEmailPrompt] = useState('');
  const [meetingAgenda, setMeetingAgenda] = useState('');
  const [showMeetingPrompt, setShowMeetingPrompt] = useState(false);
  const [meetingPrompt, setMeetingPrompt] = useState('');
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Follow up with Acme Corp', completed: false, dueDate: '2025-11-12' },
    { id: '2', text: 'Send proposal to TechStart Inc', completed: false, dueDate: '2025-11-13' },
    { id: '3', text: 'Schedule demo call', completed: true, dueDate: '2025-11-11' }
  ]);
  const [newTodo, setNewTodo] = useState('');

  const [leads, setLeads] = useState<Lead[]>([
    {
      lead_id: 'LD001',
      name: 'John Smith',
      company: 'Acme Corp',
      email: 'john@acme.com',
      phone: '+1 (555) 123-4567',
      linkedin_url: 'https://linkedin.com/in/johnsmith',
      source: 'LinkedIn_Scrape',
      offering: 'Follow-up',
      status: 'Active',
      priority: 'High',
      assigned_to: 'You',
      lead_score: 95,
      created_at: '2025-11-01',
      updated_at: '2025-11-11',
      notes: 'Interested in our enterprise plan',
      next_steps: 'Schedule product demo'
    },
    {
      lead_id: 'LD002',
      name: 'Sarah Johnson',
      company: 'TechStart Inc',
      email: 'sarah@techstart.com',
      phone: '+1 (555) 234-5678',
      linkedin_url: 'https://linkedin.com/in/sarahjohnson',
      source: 'Website',
      offering: 'Proposal',
      status: 'Active',
      priority: 'High',
      assigned_to: 'You',
      lead_score: 88,
      created_at: '2025-10-28',
      updated_at: '2025-11-10',
      notes: 'Requested pricing information',
      next_steps: 'Send detailed proposal'
    },
    {
      lead_id: 'LD003',
      name: 'Mike Chen',
      company: 'Global Solutions',
      email: 'mike@global.com',
      phone: '+1 (555) 345-6789',
      linkedin_url: 'https://linkedin.com/in/mikechen',
      source: 'CSV_Import',
      offering: 'New',
      status: 'Active',
      priority: 'Medium',
      assigned_to: 'Team',
      lead_score: 72,
      created_at: '2025-11-05',
      updated_at: '2025-11-11',
      notes: 'Cold lead from imported list',
      next_steps: 'Initial outreach email'
    },
    {
      lead_id: 'LD004',
      name: 'Emily Rodriguez',
      company: 'Innovation Labs',
      email: 'emily@innovation.com',
      phone: '+1 (555) 456-7890',
      linkedin_url: 'https://linkedin.com/in/emilyrodriguez',
      source: 'LinkedIn_Scrape',
      offering: 'Meeting',
      status: 'Active',
      priority: 'High',
      assigned_to: 'You',
      lead_score: 92,
      created_at: '2025-10-25',
      updated_at: '2025-11-09',
      notes: 'Demo call scheduled for next week',
      next_steps: 'Prepare demo presentation'
    },
    {
      lead_id: 'LD005',
      name: 'David Lee',
      company: 'Future Tech',
      email: 'david@future.com',
      phone: '+1 (555) 567-8901',
      linkedin_url: 'https://linkedin.com/in/davidlee',
      source: 'Website',
      offering: 'Contacted',
      status: 'Active',
      priority: 'Medium',
      assigned_to: 'Team',
      lead_score: 78,
      created_at: '2025-11-03',
      updated_at: '2025-11-08',
      notes: 'Responded to initial email positively',
      next_steps: 'Schedule qualification call'
    },
    {
      lead_id: 'LD006',
      name: 'Jessica Martinez',
      company: 'DataFlow Systems',
      email: 'jessica@dataflow.com',
      phone: '+1 (555) 678-9012',
      linkedin_url: 'https://linkedin.com/in/jessicamartinez',
      source: 'Manual_Entry',
      offering: 'Proposal',
      status: 'Active',
      priority: 'High',
      assigned_to: 'You',
      lead_score: 85,
      created_at: '2025-10-20',
      updated_at: '2025-11-07',
      notes: 'Reviewing our proposal, decision expected soon',
      next_steps: 'Follow up on proposal status'
    },
    {
      lead_id: 'LD007',
      name: 'Robert Taylor',
      company: 'CloudNine Inc',
      email: 'robert@cloudnine.com',
      phone: '+1 (555) 789-0123',
      linkedin_url: 'https://linkedin.com/in/roberttaylor',
      source: 'LinkedIn_Scrape',
      offering: 'Won',
      status: 'Active',
      priority: 'High',
      assigned_to: 'You',
      lead_score: 98,
      created_at: '2025-09-15',
      updated_at: '2025-11-05',
      notes: 'Deal closed! Starting implementation',
      next_steps: 'Onboarding kickoff meeting'
    },
    {
      lead_id: 'LD008',
      name: 'Amanda White',
      company: 'SecureNet Solutions',
      email: 'amanda@securenet.com',
      phone: '+1 (555) 890-1234',
      linkedin_url: 'https://linkedin.com/in/amandawhite',
      source: 'Website',
      offering: 'New',
      status: 'Active',
      priority: 'Low',
      assigned_to: 'Team',
      lead_score: 45,
      created_at: '2025-11-08',
      updated_at: '2025-11-08',
      notes: 'Downloaded whitepaper, low engagement',
      next_steps: 'Add to nurture campaign'
    },
    {
      lead_id: 'LD009',
      name: 'Christopher Brown',
      company: 'Quantum Analytics',
      email: 'chris@quantum.com',
      phone: '+1 (555) 901-2345',
      linkedin_url: 'https://linkedin.com/in/christopherbrown',
      source: 'CSV_Import',
      offering: 'Follow-up',
      status: 'Active',
      priority: 'Medium',
      assigned_to: 'You',
      lead_score: 68,
      created_at: '2025-10-30',
      updated_at: '2025-11-06',
      notes: 'Interested but waiting for budget approval',
      next_steps: 'Follow up in 2 weeks'
    },
    {
      lead_id: 'LD010',
      name: 'Michelle Davis',
      company: 'NextGen Enterprises',
      email: 'michelle@nextgen.com',
      phone: '+1 (555) 012-3456',
      linkedin_url: 'https://linkedin.com/in/michelledavis',
      source: 'LinkedIn_Scrape',
      offering: 'Meeting',
      status: 'Active',
      priority: 'High',
      assigned_to: 'You',
      lead_score: 90,
      created_at: '2025-10-18',
      updated_at: '2025-11-04',
      notes: 'Had initial call, very interested',
      next_steps: 'Send pricing and case studies'
    },
    {
      lead_id: 'LD011',
      name: 'James Wilson',
      company: 'Velocity Dynamics',
      email: 'james@velocity.com',
      phone: '+1 (555) 123-7890',
      linkedin_url: 'https://linkedin.com/in/jameswilson',
      source: 'Website',
      offering: 'Contacted',
      status: 'Active',
      priority: 'Medium',
      assigned_to: 'Team',
      lead_score: 75,
      created_at: '2025-11-02',
      updated_at: '2025-11-10',
      notes: 'Filled out contact form, awaiting response',
      next_steps: 'Initial discovery call'
    },
    {
      lead_id: 'LD012',
      name: 'Patricia Anderson',
      company: 'Alpha Industries',
      email: 'patricia@alpha.com',
      phone: '+1 (555) 234-8901',
      linkedin_url: 'https://linkedin.com/in/patriciaanderson',
      source: 'Manual_Entry',
      offering: 'Lost',
      status: 'Inactive',
      priority: 'Low',
      assigned_to: 'Team',
      lead_score: 35,
      created_at: '2025-09-20',
      updated_at: '2025-10-15',
      notes: 'Chose competitor, keep for future',
      next_steps: 'Add to quarterly check-in list'
    },
    {
      lead_id: 'LD013',
      name: 'Daniel Martinez',
      company: 'Bright Future Corp',
      email: 'daniel@brightfuture.com',
      phone: '+1 (555) 345-9012',
      linkedin_url: 'https://linkedin.com/in/danielmartinez',
      source: 'LinkedIn_Scrape',
      offering: 'Proposal',
      status: 'Active',
      priority: 'High',
      assigned_to: 'You',
      lead_score: 87,
      created_at: '2025-10-22',
      updated_at: '2025-11-09',
      notes: 'Reviewing custom proposal for enterprise plan',
      next_steps: 'Schedule follow-up call'
    }
  ]);

  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null);
  const [showTeamDetail, setShowTeamDetail] = useState(false);
  const [performancePeriod, setPerformancePeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  // Quick Actions State
  const [showQuickEmail, setShowQuickEmail] = useState(false);
  const [showQuickMeeting, setShowQuickMeeting] = useState(false);
  const [showQuickCall, setShowQuickCall] = useState(false);
  const [showQuickTask, setShowQuickTask] = useState(false);
  const [showQuickCampaign, setShowQuickCampaign] = useState(false);
  
  const [quickEmailFrom, setQuickEmailFrom] = useState('');
  const [quickEmailTo, setQuickEmailTo] = useState('');
  const [quickEmailSubject, setQuickEmailSubject] = useState('');
  const [quickEmailBody, setQuickEmailBody] = useState('');
  const [showQuickEmailPrompt, setShowQuickEmailPrompt] = useState(false);
  const [quickEmailPrompt, setQuickEmailPrompt] = useState('');
  const [isGeneratingQuickEmail, setIsGeneratingQuickEmail] = useState(false);

  const [quickMeetingTitle, setQuickMeetingTitle] = useState('');
  const [quickMeetingPlatform, setQuickMeetingPlatform] = useState('');
  const [quickMeetingAttendees, setQuickMeetingAttendees] = useState('');
  const [quickMeetingAgenda, setQuickMeetingAgenda] = useState('');
  const [showQuickMeetingPrompt, setShowQuickMeetingPrompt] = useState(false);
  const [quickMeetingPrompt, setQuickMeetingPrompt] = useState('');
  const [isGeneratingQuickMeeting, setIsGeneratingQuickMeeting] = useState(false);

  const [quickCallLeadName, setQuickCallLeadName] = useState('');
  const [quickCallNumber, setQuickCallNumber] = useState('');
  const [quickCallTranscript, setQuickCallTranscript] = useState('');
  const [showQuickCallPrompt, setShowQuickCallPrompt] = useState(false);
  const [quickCallPrompt, setQuickCallPrompt] = useState('');
  const [isGeneratingQuickCall, setIsGeneratingQuickCall] = useState(false);

  const [quickTaskMembers, setQuickTaskMembers] = useState<string[]>([]);
  const [quickTaskDescription, setQuickTaskDescription] = useState('');
  const [quickTaskDateTime, setQuickTaskDateTime] = useState('');
  const [quickTaskScheduled, setQuickTaskScheduled] = useState(false);

  const [quickCampaignLeads, setQuickCampaignLeads] = useState<string[]>([]);
  const [quickCampaignFrom, setQuickCampaignFrom] = useState('');
  const [quickCampaignSubject, setQuickCampaignSubject] = useState('');
  const [quickCampaignBody, setQuickCampaignBody] = useState('');
  const [showQuickCampaignPrompt, setShowQuickCampaignPrompt] = useState(false);
  const [quickCampaignPrompt, setQuickCampaignPrompt] = useState('');
  const [isGeneratingQuickCampaign, setIsGeneratingQuickCampaign] = useState(false);
  const [quickCampaignScheduled, setQuickCampaignScheduled] = useState(false);
  const [quickCampaignDateTime, setQuickCampaignDateTime] = useState('');

  const [showNotifications, setShowNotifications] = useState(false);
  const [userName] = useState('John Doe'); // You can make this dynamic

  // AI Sales Assistant State
  const [showAssistant, setShowAssistant] = useState(false);
  const [assistantMessages, setAssistantMessages] = useState<Array<{id: string; text: string; sender: 'user' | 'assistant'; timestamp: string}>>([
    {
      id: '1',
      text: "Hi! I'm your Sales AI Assistant 🚀 I can help you with:\n\n• Scheduling meetings\n• Managing leads\n• Creating campaigns\n• Analyzing your dashboard data\n• Assigning tasks to your team\n\nWhat would you like to do today?",
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [assistantInput, setAssistantInput] = useState('');

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 'TM001',
      name: 'Alex Thompson',
      role: 'Senior Sales Executive',
      email: 'alex@salesai.com',
      avatar: 'AT',
      status: 'Active',
      currentTask: 'Following up with 3 high-priority leads',
      tasksAssigned: 8,
      tasksCompleted: 6,
      tasksPending: 1,
      tasksInProgress: 1,
      dailyCompletion: 75,
      weeklyCompletion: 82,
      monthlyCompletion: 88,
      tasks: [
        { id: 'T1', task: 'Send proposal to Acme Corp', status: 'completed', priority: 'High', dueDate: '2025-11-11', completedAt: '2025-11-11 10:30 AM' },
        { id: 'T2', task: 'Follow up with TechStart Inc', status: 'in-progress', priority: 'High', dueDate: '2025-11-11' },
        { id: 'T3', task: 'Demo call preparation', status: 'completed', priority: 'Medium', dueDate: '2025-11-11', completedAt: '2025-11-11 2:15 PM' },
        { id: 'T4', task: 'Update CRM records', status: 'pending', priority: 'Low', dueDate: '2025-11-12' },
        { id: 'T5', task: 'Review new leads', status: 'completed', priority: 'Medium', dueDate: '2025-11-10', completedAt: '2025-11-10 4:00 PM' }
      ]
    },
    {
      id: 'TM002',
      name: 'Sophia Chen',
      role: 'Sales Representative',
      email: 'sophia@salesai.com',
      avatar: 'SC',
      status: 'Active',
      currentTask: 'Preparing demo presentation for Innovation Labs',
      tasksAssigned: 10,
      tasksCompleted: 8,
      tasksPending: 2,
      tasksInProgress: 0,
      dailyCompletion: 80,
      weeklyCompletion: 85,
      monthlyCompletion: 83,
      tasks: [
        { id: 'T6', task: 'Schedule meeting with Global Solutions', status: 'completed', priority: 'High', dueDate: '2025-11-11', completedAt: '2025-11-11 9:00 AM' },
        { id: 'T7', task: 'Send follow-up emails', status: 'completed', priority: 'Medium', dueDate: '2025-11-11', completedAt: '2025-11-11 11:45 AM' },
        { id: 'T8', task: 'Prepare demo slides', status: 'pending', priority: 'High', dueDate: '2025-11-12' },
        { id: 'T9', task: 'Client research for Innovation Labs', status: 'completed', priority: 'Medium', dueDate: '2025-11-10', completedAt: '2025-11-10 3:30 PM' },
        { id: 'T10', task: 'Update pipeline status', status: 'pending', priority: 'Low', dueDate: '2025-11-12' }
      ]
    },
    {
      id: 'TM003',
      name: 'Marcus Williams',
      role: 'Sales Development Rep',
      email: 'marcus@salesai.com',
      avatar: 'MW',
      status: 'Active',
      currentTask: 'Cold outreach to new prospects',
      tasksAssigned: 12,
      tasksCompleted: 9,
      tasksPending: 1,
      tasksInProgress: 2,
      dailyCompletion: 75,
      weeklyCompletion: 78,
      monthlyCompletion: 80,
      tasks: [
        { id: 'T11', task: 'Qualify 15 new leads', status: 'completed', priority: 'High', dueDate: '2025-11-11', completedAt: '2025-11-11 1:00 PM' },
        { id: 'T12', task: 'Cold calling campaign', status: 'in-progress', priority: 'High', dueDate: '2025-11-11' },
        { id: 'T13', task: 'LinkedIn outreach', status: 'in-progress', priority: 'Medium', dueDate: '2025-11-11' },
        { id: 'T14', task: 'Update lead scores', status: 'pending', priority: 'Low', dueDate: '2025-11-12' },
        { id: 'T15', task: 'Email sequence setup', status: 'completed', priority: 'Medium', dueDate: '2025-11-10', completedAt: '2025-11-10 5:00 PM' }
      ]
    },
    {
      id: 'TM004',
      name: 'Emma Rodriguez',
      role: 'Account Executive',
      email: 'emma@salesai.com',
      avatar: 'ER',
      status: 'Away',
      currentTask: 'Client meeting - Back at 3 PM',
      tasksAssigned: 7,
      tasksCompleted: 5,
      tasksPending: 2,
      tasksInProgress: 0,
      dailyCompletion: 71,
      weeklyCompletion: 80,
      monthlyCompletion: 85,
      tasks: [
        { id: 'T16', task: 'Negotiate contract with DataFlow', status: 'completed', priority: 'High', dueDate: '2025-11-11', completedAt: '2025-11-11 10:00 AM' },
        { id: 'T17', task: 'Client meeting presentation', status: 'completed', priority: 'High', dueDate: '2025-11-11', completedAt: '2025-11-11 2:00 PM' },
        { id: 'T18', task: 'Send pricing breakdown', status: 'pending', priority: 'Medium', dueDate: '2025-11-12' },
        { id: 'T19', task: 'Follow up with CloudNine', status: 'pending', priority: 'Medium', dueDate: '2025-11-12' },
        { id: 'T20', task: 'Update account notes', status: 'completed', priority: 'Low', dueDate: '2025-11-10', completedAt: '2025-11-10 4:30 PM' }
      ]
    },
    {
      id: 'TM005',
      name: 'Liam Parker',
      role: 'Sales Representative',
      email: 'liam@salesai.com',
      avatar: 'LP',
      status: 'Active',
      currentTask: 'Processing inbound leads',
      tasksAssigned: 9,
      tasksCompleted: 7,
      tasksPending: 1,
      tasksInProgress: 1,
      dailyCompletion: 78,
      weeklyCompletion: 81,
      monthlyCompletion: 79,
      tasks: [
        { id: 'T21', task: 'Respond to demo requests', status: 'completed', priority: 'High', dueDate: '2025-11-11', completedAt: '2025-11-11 9:30 AM' },
        { id: 'T22', task: 'Qualify website leads', status: 'in-progress', priority: 'Medium', dueDate: '2025-11-11' },
        { id: 'T23', task: 'Send welcome emails', status: 'completed', priority: 'Medium', dueDate: '2025-11-11', completedAt: '2025-11-11 11:00 AM' },
        { id: 'T24', task: 'Schedule discovery calls', status: 'pending', priority: 'High', dueDate: '2025-11-12' },
        { id: 'T25', task: 'Update lead statuses', status: 'completed', priority: 'Low', dueDate: '2025-11-10', completedAt: '2025-11-10 3:00 PM' }
      ]
    }
  ]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now().toString(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const generateEmailTemplate = () => {
    if (!showEmailPrompt) {
      setShowEmailPrompt(true);
      return;
    }
    
    setIsGeneratingEmail(true);
    setShowEmailPrompt(false);
    setTimeout(() => {
      const customContext = emailPrompt ? `\n\nContext: ${emailPrompt}` : '';
      setEmailTemplate(`Hi ${selectedLead?.name},

I hope this email finds you well. I wanted to reach out regarding ${selectedLead?.company}'s potential interest in our solution.${customContext}

Based on our analysis, I believe our platform could help you achieve:
• Increased sales productivity by 40%
• Automated lead generation and qualification
• AI-powered insights and forecasting

Would you be available for a 15-minute call next week to discuss how we can help ${selectedLead?.company} scale its sales operations?

Best regards,
John Doe
Sales Executive`);
      setIsGeneratingEmail(false);
      setEmailPrompt('');
    }, 1500);
  };

  const generateMeetingAgenda = () => {
    if (!showMeetingPrompt) {
      setShowMeetingPrompt(true);
      return;
    }
    
    setShowMeetingPrompt(false);
    const customContext = meetingPrompt ? `\n\nFocus Areas: ${meetingPrompt}\n` : '';
    setMeetingAgenda(`Meeting Agenda: ${selectedLead?.company} - Product Demo
${customContext}
1. Introduction (5 min)
   - Brief overview of attendees
   - Meeting objectives

2. Company Overview (10 min)
   - About SalesAI
   - Our key differentiators

3. Product Demo (20 min)
   - Core features walkthrough
   - Live demonstration
   - Use cases relevant to ${selectedLead?.company}

4. Q&A Session (15 min)
   - Address questions and concerns
   - Technical requirements discussion

5. Next Steps (10 min)
   - Proposal timeline
   - Implementation roadmap
   - Pricing discussion`);
    setMeetingPrompt('');
  };

  const updateLeadStatus = (leadId: string, field: 'status' | 'assigned_to', value: string) => {
    setLeads(leads.map(lead => 
      lead.lead_id === leadId ? { ...lead, [field]: value, updated_at: new Date().toISOString().split('T')[0] } : lead
    ));
  };

  // Quick Actions Handlers
  const generateQuickEmailTemplate = () => {
    if (!showQuickEmailPrompt) {
      setShowQuickEmailPrompt(true);
      return;
    }
    
    setIsGeneratingQuickEmail(true);
    setShowQuickEmailPrompt(false);
    setTimeout(() => {
      const customContext = quickEmailPrompt ? `\n\n${quickEmailPrompt}` : '';
      setQuickEmailBody(`Dear Recipient,
      
I hope this email finds you well.${customContext}

I wanted to reach out regarding our platform and how it can help accelerate your sales process. Our solution offers:

• AI-powered lead generation and qualification
• Automated outreach campaigns  
• Intelligent meeting scheduling
• Real-time analytics and insights

Would you be available for a brief call next week to discuss how we can help your team achieve its goals?

Best regards,
Your Name
SalesAI`);
      setIsGeneratingQuickEmail(false);
      setQuickEmailPrompt('');
    }, 1500);
  };

  const generateQuickMeetingAgenda = () => {
    if (!showQuickMeetingPrompt) {
      setShowQuickMeetingPrompt(true);
      return;
    }
    
    setIsGeneratingQuickMeeting(true);
    setShowQuickMeetingPrompt(false);
    setTimeout(() => {
      const customContext = quickMeetingPrompt ? `\n\nFocus: ${quickMeetingPrompt}\n` : '';
      setQuickMeetingAgenda(`Meeting Agenda${customContext}

1. Introduction (5 min)
   - Brief overview of attendees
   - Meeting objectives

2. Product Overview (15 min)
   - Key features demonstration
   - Use cases and benefits
   - ROI discussion

3. Q&A Session (10 min)
   - Address questions and concerns
   - Technical requirements

4. Next Steps (10 min)
   - Implementation timeline
   - Pricing discussion
   - Follow-up actions`);
      setIsGeneratingQuickMeeting(false);
      setQuickMeetingPrompt('');
    }, 1500);
  };

  const generateQuickCallScript = () => {
    if (!showQuickCallPrompt) {
      setShowQuickCallPrompt(true);
      return;
    }
    
    setIsGeneratingQuickCall(true);
    setShowQuickCallPrompt(false);
    setTimeout(() => {
      const customContext = quickCallPrompt ? `\nFocus: ${quickCallPrompt}\n\n` : '';
      setQuickCallTranscript(`Call Script for ${quickCallLeadName || 'Lead'}
${customContext}
Opening:
"Hi ${quickCallLeadName || '[Name]'}, this is [Your Name] from SalesAI. I hope I'm not catching you at a bad time?"

Value Proposition:
"I wanted to reach out because we help sales teams like yours increase productivity by 40% through AI-powered automation. Would you have a few minutes to discuss how this could benefit your team?"

Discovery Questions:
- What's your current process for lead generation?
- How much time does your team spend on manual outreach?
- What are your biggest sales challenges right now?

Next Steps:
- Schedule detailed demo
- Send follow-up email with resources
- Add to CRM for tracking`);
      setIsGeneratingQuickCall(false);
      setQuickCallPrompt('');
    }, 1500);
  };

  const generateQuickCampaignContent = () => {
    if (!showQuickCampaignPrompt) {
      setShowQuickCampaignPrompt(true);
      return;
    }
    
    setIsGeneratingQuickCampaign(true);
    setShowQuickCampaignPrompt(false);
    setTimeout(() => {
      const customContext = quickCampaignPrompt ? `\n\n${quickCampaignPrompt}` : '';
      setQuickCampaignBody(`Hi {{Name}},

I hope you're having a great week!${customContext}

I wanted to reach out because {{Company}} could benefit significantly from our AI-powered sales platform. We're helping companies like yours:

✓ Increase lead generation by 3x
✓ Automate 80% of repetitive tasks
✓ Close deals 40% faster
✓ Gain real-time insights into pipeline

I'd love to show you how we can help {{Company}} achieve similar results.

Would you be open to a quick 15-minute demo next week?

Best regards,
{{Your_Name}}
SalesAI

P.S. Here's a case study showing how we helped a company similar to yours increase revenue by 60% in just 3 months.`);
      setIsGeneratingQuickCampaign(false);
      setQuickCampaignPrompt('');
    }, 1500);
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // AI Assistant Handler
  const handleAssistantMessage = () => {
    if (!assistantInput.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: assistantInput,
      sender: 'user' as const,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAssistantMessages(prev => [...prev, userMessage]);
    setAssistantInput('');

    // Simulate AI response
    setTimeout(() => {
      let responseText = '';
      const input = assistantInput.toLowerCase();

      if (input.includes('schedule') || input.includes('meeting')) {
        responseText = "I'd be happy to help you schedule a meeting! 📅\n\nPlease provide me with:\n• Who should attend? (Email addresses)\n• What's the meeting about? (Subject)\n• When would you like to schedule it? (Date & Time)\n• Which platform? (Zoom, Google Meet, or Teams)\n\nYou can also use the Quick Actions panel to schedule meetings instantly!";
      } else if (input.includes('lead') || input.includes('prospect')) {
        responseText = `Based on your dashboard data:\n\n📊 Total Leads: 1,247 (+12.5%)\n🎯 Conversion Rate: 34.2%\n⭐ Top Priority Leads: ${leads.filter(l => l.priority === 'High').length}\n\nWould you like me to:\n• Show you high-priority leads\n• Add a new lead\n• Filter leads by status\n• Create an outreach campaign?`;
      } else if (input.includes('campaign')) {
        responseText = "I can help you create an email campaign! 📧\n\nYou currently have 8 active campaigns. Would you like to:\n• Create a new campaign\n• View campaign performance\n• Schedule a campaign\n\nJust click the 'Email Campaign' button in Quick Actions to get started!";
      } else if (input.includes('task') || input.includes('assign')) {
        responseText = `I can help you assign tasks to your team! 👥\n\nYour team members:\n${teamMembers.map(m => `• ${m.name} - ${m.role}`).join('\n')}\n\nWho would you like to assign a task to? You can also use the Quick Actions panel to assign tasks directly!`;
      } else if (input.includes('performance') || input.includes('analytics')) {
        responseText = "Here's your performance overview:\n\n✅ Win Rate: 67% (+15%)\n📈 Active Campaigns: 8\n⏰ Follow-ups Due: 23\n🎯 Conversion Rate: 34.2%\n\nYou're performing great! Your win rate is up 15% from last month. Would you like detailed analytics?";
      } else if (input.includes('team')) {
        responseText = `Your team is performing well! 👏\n\n${teamMembers.slice(0, 3).map(m => `• ${m.name}: ${m.dailyCompletion}% daily completion`).join('\n')}\n\nWould you like to see the full team tracker or assign new tasks?`;
      } else {
        responseText = "I'm here to help! I can assist you with:\n\n📅 Scheduling meetings\n📊 Analyzing dashboard metrics\n📧 Creating campaigns\n👥 Managing your team\n🎯 Working with leads\n\nWhat specific task can I help you with?";
      }

      const assistantResponse = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'assistant' as const,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setAssistantMessages(prev => [...prev, assistantResponse]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-l from-primary/10 to-transparent rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-secondary/10 to-transparent rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-card/60 backdrop-blur-xl border-b border-border shadow-lg shadow-primary/5">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SalesAI
            </span>
            <Badge variant="secondary" className="ml-2">Dashboard</Badge>
          </div>
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="hover:bg-primary/10 relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-2xl shadow-primary/20 z-50 backdrop-blur-xl"
                >
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">Notifications</h3>
                      <Badge className="bg-primary/20 text-primary border-primary/30">3 new</Badge>
                    </div>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {[
                      {
                        id: 1,
                        title: 'New lead assigned',
                        message: 'John Smith from Acme Corp has been assigned to you',
                        time: '5 minutes ago',
                        unread: true,
                        icon: <User className="w-4 h-4" />
                      },
                      {
                        id: 2,
                        title: 'Meeting reminder',
                        message: 'Product demo with TechStart Inc in 30 minutes',
                        time: '25 minutes ago',
                        unread: true,
                        icon: <Calendar className="w-4 h-4" />
                      },
                      {
                        id: 3,
                        title: 'Email campaign completed',
                        message: 'Your campaign reached 150 leads with 45% open rate',
                        time: '2 hours ago',
                        unread: true,
                        icon: <Mail className="w-4 h-4" />
                      },
                      {
                        id: 4,
                        title: 'Task completed',
                        message: 'Alex Thompson completed "Send proposal to Global Solutions"',
                        time: '3 hours ago',
                        unread: false,
                        icon: <CheckCircle2 className="w-4 h-4" />
                      },
                      {
                        id: 5,
                        title: 'New message',
                        message: 'Sarah Johnson replied to your email',
                        time: '5 hours ago',
                        unread: false,
                        icon: <MessageSquare className="w-4 h-4" />
                      }
                    ].map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-border hover:bg-card/50 cursor-pointer transition-colors ${
                          notification.unread ? 'bg-primary/5' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            notification.unread 
                              ? 'bg-gradient-to-br from-primary to-secondary text-white' 
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {notification.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground mb-1">
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-border">
                    <Button variant="ghost" className="w-full text-primary hover:bg-primary/10" size="sm">
                      View all notifications
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
            
            <Link href="/settings">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-sm font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 cursor-pointer hover:scale-110">
                JD
              </div>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-muted-foreground text-lg font-light">
            Here's what's happening with your sales today
          </p>
        </motion.div>

        {/* Key Metrics - 5 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            {
              title: 'Total Leads',
              value: '1,247',
              change: '+12.5%',
              trend: 'up',
              icon: <Users className="w-5 h-5" />,
              color: 'from-primary to-secondary'
            },
            {
              title: 'Conversion Rate',
              value: '34.2%',
              change: '+8.1%',
              trend: 'up',
              icon: <Target className="w-5 h-5" />,
              color: 'from-secondary to-primary'
            },
            {
              title: 'Active Campaigns',
              value: '8',
              change: '+2',
              trend: 'up',
              icon: <Zap className="w-5 h-5" />,
              color: 'from-primary/80 to-secondary/80'
            },
            {
              title: 'Follow-ups Due',
              value: '23',
              change: '-5',
              trend: 'down',
              icon: <Clock className="w-5 h-5" />,
              color: 'from-secondary/80 to-primary/80'
            },
            {
              title: 'Win Rate',
              value: '67%',
              change: '+15%',
              trend: 'up',
              icon: <Award className="w-5 h-5" />,
              color: 'from-primary to-secondary'
            }
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card/70 backdrop-blur-sm border-border hover:border-primary/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary/20 group hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardDescription className="text-muted-foreground font-light text-sm">{metric.title}</CardDescription>
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${metric.color} text-white shadow-lg shadow-primary/30 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-110`}>
                    {metric.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{metric.value}</div>
                  <div className="flex items-center gap-1 text-xs">
                    {metric.trend === 'up' ? (
                      <ArrowUpRight className="w-3 h-3 text-secondary" />
                    ) : (
                      <ArrowUpRight className="w-3 h-3 text-red-500 rotate-90" />
                    )}
                    <span className={metric.trend === 'up' ? 'text-secondary font-medium' : 'text-red-500 font-medium'}>
                      {metric.change}
                    </span>
                    <span className="text-muted-foreground font-light">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-8"
        >
          <Card className="bg-card/70 backdrop-blur-sm border-border shadow-2xl shadow-primary/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-primary" />
                <div>
                  <CardTitle className="text-2xl">Quick Actions</CardTitle>
                  <CardDescription>Fast access to your most used tools</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {/* Send Email */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowQuickEmail(true)}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 group hover:shadow-xl hover:shadow-primary/30"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/40 group-hover:shadow-xl group-hover:shadow-primary/50 transition-all duration-300 group-hover:scale-110">
                    <Mail className="w-7 h-7" />
                  </div>
                  <span className="text-sm font-semibold text-foreground text-center">Send Email</span>
                </motion.button>

                {/* Cold Call */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowQuickCall(true)}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 group hover:shadow-xl hover:shadow-primary/30"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-green-500/40 group-hover:shadow-xl group-hover:shadow-green-500/50 transition-all duration-300 group-hover:scale-110">
                    <Phone className="w-7 h-7" />
                  </div>
                  <span className="text-sm font-semibold text-foreground text-center">Cold Call</span>
                </motion.button>

                {/* Schedule Meeting */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowQuickMeeting(true)}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 group hover:shadow-xl hover:shadow-primary/30"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/40 group-hover:shadow-xl group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-110">
                    <Video className="w-7 h-7" />
                  </div>
                  <span className="text-sm font-semibold text-foreground text-center">Schedule Meeting</span>
                </motion.button>

                {/* Assign Task */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowQuickTask(true)}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 group hover:shadow-xl hover:shadow-primary/30"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/40 group-hover:shadow-xl group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
                    <User className="w-7 h-7" />
                  </div>
                  <span className="text-sm font-semibold text-foreground text-center">Assign Task</span>
                </motion.button>

                {/* Email Campaign */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowQuickCampaign(true)}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 group hover:shadow-xl hover:shadow-primary/30"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/40 group-hover:shadow-xl group-hover:shadow-orange-500/50 transition-all duration-300 group-hover:scale-110">
                    <Send className="w-7 h-7" />
                  </div>
                  <span className="text-sm font-semibold text-foreground text-center">Email Campaign</span>
                </motion.button>

                {/* Add Lead */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddLead(true)}
                  className="flex flex-col items-center gap-3 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 group hover:shadow-xl hover:shadow-primary/30"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/40 group-hover:shadow-xl group-hover:shadow-primary/50 transition-all duration-300 group-hover:scale-110">
                    <Plus className="w-7 h-7" />
                  </div>
                  <span className="text-sm font-semibold text-foreground text-center">Add Lead</span>
                </motion.button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* To-Do List & AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* To-Do List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-card/70 backdrop-blur-sm border-border shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    To-Do List
                  </CardTitle>
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {todos.filter(t => !t.completed).length} pending
                  </Badge>
                </div>
                <CardDescription className="font-light">Manage your daily tasks and priorities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a new task..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    className="bg-background/50 border-2 border-border hover:border-primary/30 focus:border-primary/50"
                  />
                  <Button 
                    onClick={addTodo}
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/30"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {todos.map((todo) => (
                    <motion.div
                      key={todo.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 transition-all group"
                    >
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="w-4 h-4 rounded border-2 border-primary text-primary focus:ring-primary cursor-pointer"
                      />
                      <span className={`flex-1 ${todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {todo.text}
                      </span>
                      {todo.dueDate && (
                        <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                          {todo.dueDate}
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTodo(todo.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 hover:text-red-500"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-card/70 backdrop-blur-sm border-border shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 h-full">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Bot className="w-5 h-5 text-secondary" />
                  AI Insights
                </CardTitle>
                <CardDescription className="font-light">Intelligent recommendations from your data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    type: 'success',
                    title: 'High Conversion Opportunity',
                    description: '3 leads with 90+ scores haven\'t been contacted in 48 hours',
                    action: 'Review Now',
                    icon: <TrendingUp className="w-4 h-4" />
                  },
                  {
                    type: 'warning',
                    title: 'Follow-up Required',
                    description: '12 leads are waiting for follow-up emails this week',
                    action: 'Send Emails',
                    icon: <Mail className="w-4 h-4" />
                  },
                  {
                    type: 'info',
                    title: 'Best Time to Call',
                    description: 'Optimal calling window: Today 2-4 PM based on historical data',
                    action: 'View Schedule',
                    icon: <Phone className="w-4 h-4" />
                  },
                  {
                    type: 'success',
                    title: 'Pipeline Health',
                    description: 'Your pipeline is 23% above target for this quarter',
                    action: 'View Details',
                    icon: <Target className="w-4 h-4" />
                  }
                ].map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 hover:border-primary/40 transition-all group cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30">
                        {insight.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground font-light mb-2">{insight.description}</p>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-secondary hover:bg-primary/10 p-0 h-auto font-semibold">
                          {insight.action} →
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Leads Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-card/70 backdrop-blur-xl border-border shadow-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground text-2xl">Active Leads</CardTitle>
                  <CardDescription className="font-light">Manage and track all your sales leads</CardDescription>
                </div>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search leads..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-background/50 border-2 border-border hover:border-primary/30 focus:border-primary/50 w-64"
                    />
                  </div>
                  <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Dialog open={showAddLead} onOpenChange={setShowAddLead}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Lead
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-border max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Lead</DialogTitle>
                        <DialogDescription>Enter the lead information below</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                          <Label>Name</Label>
                          <Input className="bg-background/50 border-2 border-border" />
                        </div>
                        <div className="space-y-2">
                          <Label>Company</Label>
                          <Input className="bg-background/50 border-2 border-border" />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input type="email" className="bg-background/50 border-2 border-border" />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone</Label>
                          <Input className="bg-background/50 border-2 border-border" />
                        </div>
                        <div className="space-y-2">
                          <Label>LinkedIn URL</Label>
                          <Input className="bg-background/50 border-2 border-border" />
                        </div>
                        <div className="space-y-2">
                          <Label>Source</Label>
                          <Select>
                            <SelectTrigger className="bg-background/50 border-2 border-border">
                              <SelectValue placeholder="Select source" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="LinkedIn_Scrape">LinkedIn Scrape</SelectItem>
                              <SelectItem value="Website">Website</SelectItem>
                              <SelectItem value="CSV_Import">CSV Import</SelectItem>
                              <SelectItem value="Manual_Entry">Manual Entry</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Priority</Label>
                          <Select>
                            <SelectTrigger className="bg-background/50 border-2 border-border">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="High">High</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Assigned To</Label>
                          <Select>
                            <SelectTrigger className="bg-background/50 border-2 border-border">
                              <SelectValue placeholder="Select assignee" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="You">You</SelectItem>
                              <SelectItem value="Team">Team</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setShowAddLead(false)}>Cancel</Button>
                        <Button className="bg-gradient-to-r from-primary to-secondary">Add Lead</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Lead ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Company</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Phone</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Source</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Stage</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Priority</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Assigned</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Score</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr 
                        key={lead.lead_id}
                        className="border-b border-border/50 hover:bg-card/50 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedLead(lead);
                          setShowLeadDetail(true);
                        }}
                      >
                        <td className="py-3 px-4 text-sm">
                          <span className="font-mono text-primary">{lead.lead_id}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-semibold shadow-lg shadow-primary/30">
                              {lead.name.charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-foreground">{lead.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-foreground">{lead.company}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{lead.email}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{lead.phone}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                            {lead.source.replace('_', ' ')}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={`text-xs ${
                            lead.offering === 'Won' ? 'bg-secondary text-white' :
                            lead.offering === 'Lost' ? 'bg-red-500 text-white' :
                            'bg-primary/20 text-primary border-primary/30'
                          }`}>
                            {lead.offering}
                          </Badge>
                        </td>
                        <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                          <Select value={lead.status} onValueChange={(value) => updateLeadStatus(lead.lead_id, 'status', value)}>
                            <SelectTrigger className="h-8 text-xs border-border bg-background/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Inactive">Inactive</SelectItem>
                              <SelectItem value="On Hold">On Hold</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={`text-xs ${
                            lead.priority === 'High' ? 'bg-red-500 text-white' :
                            lead.priority === 'Medium' ? 'bg-secondary text-white' :
                            'bg-primary/20 text-primary'
                          }`}>
                            {lead.priority}
                          </Badge>
                        </td>
                        <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                          <Select value={lead.assigned_to} onValueChange={(value) => updateLeadStatus(lead.lead_id, 'assigned_to', value)}>
                            <SelectTrigger className="h-8 text-xs border-border bg-background/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="You">You</SelectItem>
                              <SelectItem value="Team">Team</SelectItem>
                              <SelectItem value="Sales">Sales</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Progress value={lead.lead_score} className="h-2 w-16" />
                            <span className="text-sm font-semibold text-foreground">{lead.lead_score}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Team Tracker Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-card/70 backdrop-blur-sm border-border shadow-2xl shadow-primary/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary" />
                  <div>
                    <CardTitle className="text-2xl">Team Tracker</CardTitle>
                    <CardDescription>Monitor your team's activity and performance</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-border overflow-hidden bg-background/30">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-border">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Team Member</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Role</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Status</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Current Task</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Assigned</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Completed</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Pending</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">In Progress</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Completion %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr
                        key={member.id}
                        className="border-b border-border/50 hover:bg-card/50 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedTeamMember(member);
                          setShowTeamDetail(true);
                        }}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold shadow-lg shadow-primary/30">
                              {member.avatar}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{member.name}</p>
                              <p className="text-xs text-muted-foreground">{member.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-foreground">{member.role}</td>
                        <td className="py-4 px-4">
                          <Badge className={`${
                            member.status === 'Active' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                            member.status === 'Away' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                            'bg-gray-500/20 text-gray-400 border-gray-500/30'
                          } border shadow-md`}>
                            {member.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground max-w-xs truncate">{member.currentTask}</td>
                        <td className="py-4 px-4 text-sm text-center font-semibold text-foreground">{member.tasksAssigned}</td>
                        <td className="py-4 px-4 text-sm text-center font-semibold text-green-400">{member.tasksCompleted}</td>
                        <td className="py-4 px-4 text-sm text-center font-semibold text-yellow-400">{member.tasksPending}</td>
                        <td className="py-4 px-4 text-sm text-center font-semibold text-blue-400">{member.tasksInProgress}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={performancePeriod === 'daily' ? member.dailyCompletion : 
                                     performancePeriod === 'weekly' ? member.weeklyCompletion : 
                                     member.monthlyCompletion} 
                              className="h-2 flex-1"
                            />
                            <span className="text-sm font-semibold text-foreground w-12 text-right">
                              {performancePeriod === 'daily' ? member.dailyCompletion : 
                               performancePeriod === 'weekly' ? member.weeklyCompletion : 
                               member.monthlyCompletion}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Lead Detail Dialog */}
      <Dialog open={showLeadDetail} onOpenChange={setShowLeadDetail}>
        <DialogContent className="bg-card border-border max-w-7xl max-h-[90vh] overflow-y-auto">
          {selectedLead && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold shadow-2xl shadow-primary/40">
                      {selectedLead.name.charAt(0)}
                    </div>
                    <div>
                      <DialogTitle className="text-2xl">{selectedLead.name}</DialogTitle>
                      <DialogDescription className="text-lg">{selectedLead.company}</DialogDescription>
                    </div>
                  </div>
                  <Badge className={`${
                    selectedLead.priority === 'High' ? 'bg-red-500 text-white' :
                    selectedLead.priority === 'Medium' ? 'bg-secondary text-white' :
                    'bg-primary/20 text-primary'
                  }`}>
                    {selectedLead.priority} Priority
                  </Badge>
                </div>
              </DialogHeader>

              <Tabs defaultValue="overview" className="mt-6">
                <TabsList className="grid w-full grid-cols-5 bg-card/70 backdrop-blur-sm border border-border">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
                    <User className="w-4 h-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="email" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="meeting" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
                    <Video className="w-4 h-4 mr-2" />
                    Meeting
                  </TabsTrigger>
                  <TabsTrigger value="calling" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    Calling
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white">
                    <Clock className="w-4 h-4 mr-2" />
                    Activity
                  </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6 mt-6">
                  <Card className="bg-card/50 backdrop-blur-sm border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-sm">Email</Label>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-primary" />
                          <span className="text-foreground">{selectedLead.email}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-sm">Phone</Label>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-primary" />
                          <span className="text-foreground">{selectedLead.phone}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-sm">LinkedIn</Label>
                        <a href={selectedLead.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:text-secondary">
                          <Linkedin className="w-4 h-4" />
                          <span>View Profile</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-sm">Lead Score</Label>
                        <div className="flex items-center gap-2">
                          <Progress value={selectedLead.lead_score} className="h-2 flex-1" />
                          <span className="text-foreground font-bold">{selectedLead.lead_score}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Pencil className="w-5 h-5 text-primary" />
                        Notes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Add notes about this lead..."
                        defaultValue={selectedLead.notes}
                        className="bg-background/50 border-2 border-border min-h-[100px]"
                      />
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        Next Steps
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Define next steps..."
                        defaultValue={selectedLead.next_steps}
                        className="bg-background/50 border-2 border-border min-h-[80px]"
                      />
                      <Button className="mt-4 bg-gradient-to-r from-primary to-secondary">
                        Update
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Email Tab */}
                <TabsContent value="email" className="space-y-6 mt-6">
                  <Card className="bg-card/50 backdrop-blur-sm border-border">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Mail className="w-5 h-5 text-primary" />
                          Compose Email
                        </CardTitle>
                        <Button 
                          onClick={generateEmailTemplate}
                          disabled={isGeneratingEmail}
                          variant="outline"
                          className="border-primary/20 hover:bg-primary/10"
                        >
                          <Bot className="w-4 h-4 mr-2" />
                          {isGeneratingEmail ? 'Generating...' : 'Generate Template'}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {showEmailPrompt && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-3 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Bot className="w-5 h-5 text-primary" />
                            <Label className="text-base font-semibold text-foreground">AI Prompt</Label>
                          </div>
                          <Textarea
                            placeholder="Describe what you want the email to focus on... (e.g., 'Emphasize ROI and cost savings' or 'Focus on technical capabilities')"
                            value={emailPrompt}
                            onChange={(e) => setEmailPrompt(e.target.value)}
                            className="bg-background/50 border-2 border-border min-h-[100px]"
                          />
                          <div className="flex gap-2">
                            <Button 
                              onClick={generateEmailTemplate}
                              disabled={isGeneratingEmail}
                              className="bg-gradient-to-r from-primary to-secondary"
                            >
                              {isGeneratingEmail ? 'Generating...' : 'Generate'}
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setShowEmailPrompt(false);
                                setEmailPrompt('');
                              }}
                              className="border-primary/20"
                            >
                              Cancel
                            </Button>
                          </div>
                        </motion.div>
                      )}
                      <div className="space-y-2">
                        <Label>To</Label>
                        <Input value={selectedLead.email} disabled className="bg-background/50 border-2 border-border" />
                      </div>
                      <div className="space-y-2">
                        <Label>Subject</Label>
                        <Input placeholder="Email subject..." className="bg-background/50 border-2 border-border" />
                      </div>
                      <div className="space-y-2">
                        <Label>Message</Label>
                        <Textarea
                          placeholder="Write your email..."
                          value={emailTemplate}
                          onChange={(e) => setEmailTemplate(e.target.value)}
                          className="bg-background/50 border-2 border-border min-h-[300px]"
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button className="bg-gradient-to-r from-primary to-secondary flex-1">
                          <Send className="w-4 h-4 mr-2" />
                          Send Email
                        </Button>
                        <Button variant="outline" className="border-primary/20">
                          Save Draft
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Meeting Tab */}
                <TabsContent value="meeting" className="space-y-6 mt-6">
                  <Card className="bg-card/50 backdrop-blur-sm border-border">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Video className="w-5 h-5 text-primary" />
                          Schedule Meeting
                        </CardTitle>
                        <Button 
                          onClick={generateMeetingAgenda}
                          variant="outline"
                          className="border-primary/20 hover:bg-primary/10"
                        >
                          <Bot className="w-4 h-4 mr-2" />
                          Generate Agenda
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {showMeetingPrompt && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-3 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Bot className="w-5 h-5 text-primary" />
                            <Label className="text-base font-semibold text-foreground">AI Prompt</Label>
                          </div>
                          <Textarea
                            placeholder="Describe what you want to focus on in the meeting... (e.g., 'Include discussion about integrations' or 'Focus on security and compliance')"
                            value={meetingPrompt}
                            onChange={(e) => setMeetingPrompt(e.target.value)}
                            className="bg-background/50 border-2 border-border min-h-[100px]"
                          />
                          <div className="flex gap-2">
                            <Button 
                              onClick={generateMeetingAgenda}
                              className="bg-gradient-to-r from-primary to-secondary"
                            >
                              Generate
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => {
                                setShowMeetingPrompt(false);
                                setMeetingPrompt('');
                              }}
                              className="border-primary/20"
                            >
                              Cancel
                            </Button>
                          </div>
                        </motion.div>
                      )}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Meeting Title</Label>
                          <Input placeholder="Product Demo" className="bg-background/50 border-2 border-border" />
                        </div>
                        <div className="space-y-2">
                          <Label>Platform</Label>
                          <Select>
                            <SelectTrigger className="bg-background/50 border-2 border-border">
                              <SelectValue placeholder="Select platform" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="zoom">Zoom</SelectItem>
                              <SelectItem value="gmeet">Google Meet</SelectItem>
                              <SelectItem value="teams">Microsoft Teams</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Date</Label>
                          <Input type="date" className="bg-background/50 border-2 border-border" />
                        </div>
                        <div className="space-y-2">
                          <Label>Time</Label>
                          <Input type="time" className="bg-background/50 border-2 border-border" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Attendees</Label>
                        <Input 
                          placeholder={`${selectedLead.email}, team@company.com`}
                          className="bg-background/50 border-2 border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Agenda / Description</Label>
                        <Textarea
                          placeholder="Meeting agenda..."
                          value={meetingAgenda}
                          onChange={(e) => setMeetingAgenda(e.target.value)}
                          className="bg-background/50 border-2 border-border min-h-[200px]"
                        />
                      </div>
                      <Button className="bg-gradient-to-r from-primary to-secondary w-full">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Meeting
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        Meeting Notes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">Notes from previous meetings will appear here</p>
                      <div className="space-y-3">
                        <div className="p-4 rounded-lg bg-card border border-border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-foreground">Product Demo Call</span>
                            <span className="text-xs text-muted-foreground">Nov 8, 2025</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Discussed enterprise features and pricing. Follow-up: Send proposal by Nov 12.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Cold Calling Tab */}
                <TabsContent value="calling" className="space-y-6 mt-6">
                  <Card className="bg-card/50 backdrop-blur-sm border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Mic className="w-5 h-5 text-primary" />
                        Call Transcript & Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-lg bg-background/50 border border-border">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-semibold text-foreground">Last Call: Nov 10, 2025 - 15 min</span>
                          <Badge className="bg-secondary text-white">Completed</Badge>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-foreground">Summary</h4>
                          <p className="text-sm text-muted-foreground">
                            Discussed current sales challenges. Lead is interested in automation features. 
                            Expressed concerns about implementation timeline. Next step: Technical demo scheduled.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Pencil className="w-5 h-5 text-primary" />
                        Call Notes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea
                        placeholder="Add notes from your call..."
                        className="bg-background/50 border-2 border-border min-h-[150px]"
                      />
                      <Button className="bg-gradient-to-r from-primary to-secondary">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Note
                      </Button>
                      
                      <div className="space-y-3 mt-6">
                        <h4 className="text-sm font-semibold text-foreground">Previous Notes</h4>
                        <div className="p-3 rounded-lg bg-card border border-border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-muted-foreground">Nov 10, 2025 - 2:30 PM</span>
                          </div>
                          <p className="text-sm text-foreground">Lead mentioned budget approval needed from CFO. Follow up next week.</p>
                        </div>
                        <div className="p-3 rounded-lg bg-card border border-border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-muted-foreground">Nov 5, 2025 - 10:00 AM</span>
                          </div>
                          <p className="text-sm text-foreground">Initial contact made. Positive response. Requested more information.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Activity Tab */}
                <TabsContent value="activity" className="space-y-6 mt-6">
                  <Card className="bg-card/50 backdrop-blur-sm border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        Activity Timeline
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { type: 'email', action: 'Email sent', time: '2 hours ago', icon: <Mail className="w-4 h-4" /> },
                          { type: 'meeting', action: 'Meeting scheduled', time: '1 day ago', icon: <Video className="w-4 h-4" /> },
                          { type: 'call', action: 'Call completed', time: '1 day ago', icon: <Phone className="w-4 h-4" /> },
                          { type: 'note', action: 'Note added', time: '2 days ago', icon: <Pencil className="w-4 h-4" /> },
                          { type: 'status', action: 'Status changed to Follow-up', time: '3 days ago', icon: <Target className="w-4 h-4" /> },
                          { type: 'created', action: 'Lead created', time: '10 days ago', icon: <Plus className="w-4 h-4" /> }
                        ].map((activity, index) => (
                          <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-card/50 transition-all">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                              {activity.icon}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">{activity.action}</p>
                              <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        Next Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle2 className="w-4 h-4 text-secondary" />
                          Send follow-up email by Nov 13
                        </li>
                        <li className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle2 className="w-4 h-4 text-secondary" />
                          Schedule technical demo
                        </li>
                        <li className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle2 className="w-4 h-4 text-secondary" />
                          Prepare pricing proposal
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Team Member Detail Dialog */}
      <Dialog open={showTeamDetail} onOpenChange={setShowTeamDetail}>
        <DialogContent className="bg-card border-border max-w-6xl max-h-[90vh] overflow-y-auto">
          {selectedTeamMember && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold shadow-2xl shadow-primary/40">
                      {selectedTeamMember.avatar}
                    </div>
                    <div>
                      <DialogTitle className="text-2xl">{selectedTeamMember.name}</DialogTitle>
                      <DialogDescription className="text-lg">{selectedTeamMember.role}</DialogDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`${
                      selectedTeamMember.status === 'Active' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                      selectedTeamMember.status === 'Away' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                      'bg-gray-500/20 text-gray-400 border-gray-500/30'
                    } border shadow-md px-4 py-2 text-sm`}>
                      {selectedTeamMember.status}
                    </Badge>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-6 space-y-6">
                {/* Current Task */}
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Target className="w-5 h-5 text-primary" />
                      Current Focus
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground">{selectedTeamMember.currentTask}</p>
                  </CardContent>
                </Card>

                {/* Performance Analysis */}
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Performance Analysis
                      </CardTitle>
                      <Select value={performancePeriod} onValueChange={(value) => setPerformancePeriod(value as 'daily' | 'weekly' | 'monthly')}>
                        <SelectTrigger className="w-32 bg-background/50 border-2 border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Overall Completion Rate */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">
                          {performancePeriod.charAt(0).toUpperCase() + performancePeriod.slice(1)} Completion Rate
                        </span>
                        <span className="text-2xl font-bold text-foreground">
                          {performancePeriod === 'daily' ? selectedTeamMember.dailyCompletion :
                           performancePeriod === 'weekly' ? selectedTeamMember.weeklyCompletion :
                           selectedTeamMember.monthlyCompletion}%
                        </span>
                      </div>
                      <Progress 
                        value={performancePeriod === 'daily' ? selectedTeamMember.dailyCompletion :
                               performancePeriod === 'weekly' ? selectedTeamMember.weeklyCompletion :
                               selectedTeamMember.monthlyCompletion} 
                        className="h-3"
                      />
                    </div>

                    {/* Task Statistics */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                        <p className="text-xs text-muted-foreground mb-1">Assigned</p>
                        <p className="text-2xl font-bold text-foreground">{selectedTeamMember.tasksAssigned}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
                        <p className="text-xs text-muted-foreground mb-1">Completed</p>
                        <p className="text-2xl font-bold text-green-400">{selectedTeamMember.tasksCompleted}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                        <p className="text-xs text-muted-foreground mb-1">In Progress</p>
                        <p className="text-2xl font-bold text-blue-400">{selectedTeamMember.tasksInProgress}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20">
                        <p className="text-xs text-muted-foreground mb-1">Pending</p>
                        <p className="text-2xl font-bold text-yellow-400">{selectedTeamMember.tasksPending}</p>
                      </div>
                    </div>

                    {/* Work Assigned vs Done */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Work Progress</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-foreground min-w-24">Assigned</span>
                        <div className="flex-1 bg-background/50 rounded-full h-6 overflow-hidden border border-border">
                          <div className="h-full bg-gradient-to-r from-primary to-secondary" style={{ width: '100%' }}></div>
                        </div>
                        <span className="text-sm font-semibold text-foreground min-w-12 text-right">{selectedTeamMember.tasksAssigned}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-foreground min-w-24">Completed</span>
                        <div className="flex-1 bg-background/50 rounded-full h-6 overflow-hidden border border-border">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500" 
                            style={{ width: `${(selectedTeamMember.tasksCompleted / selectedTeamMember.tasksAssigned) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-green-400 min-w-12 text-right">{selectedTeamMember.tasksCompleted}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Task List */}
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      Task Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="all" className="w-full">
                      <TabsList className="grid w-full grid-cols-4 bg-background/50">
                        <TabsTrigger value="all">All ({selectedTeamMember.tasks.length})</TabsTrigger>
                        <TabsTrigger value="completed">Completed ({selectedTeamMember.tasksCompleted})</TabsTrigger>
                        <TabsTrigger value="in-progress">In Progress ({selectedTeamMember.tasksInProgress})</TabsTrigger>
                        <TabsTrigger value="pending">Pending ({selectedTeamMember.tasksPending})</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="all" className="space-y-3 mt-4">
                        {selectedTeamMember.tasks.map((task) => (
                          <div key={task.id} className="flex items-start gap-3 p-4 rounded-lg bg-background/30 border border-border hover:bg-card/50 transition-all">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                              task.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {task.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> :
                               task.status === 'in-progress' ? <Clock className="w-5 h-5" /> :
                               <Calendar className="w-5 h-5" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-4">
                                <p className="font-medium text-foreground">{task.task}</p>
                                <Badge className={`${
                                  task.priority === 'High' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                  task.priority === 'Medium' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                                  'bg-gray-500/20 text-gray-400 border-gray-500/30'
                                } border shadow-md`}>
                                  {task.priority}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Due: {task.dueDate}
                                </span>
                                {task.completedAt && (
                                  <span className="flex items-center gap-1 text-green-400">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Completed: {task.completedAt}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </TabsContent>

                      <TabsContent value="completed" className="space-y-3 mt-4">
                        {selectedTeamMember.tasks.filter(t => t.status === 'completed').map((task) => (
                          <div key={task.id} className="flex items-start gap-3 p-4 rounded-lg bg-background/30 border border-border hover:bg-card/50 transition-all">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-green-500/20 text-green-400">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-4">
                                <p className="font-medium text-foreground">{task.task}</p>
                                <Badge className={`${
                                  task.priority === 'High' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                  task.priority === 'Medium' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                                  'bg-gray-500/20 text-gray-400 border-gray-500/30'
                                } border shadow-md`}>
                                  {task.priority}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 mt-2 text-xs">
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <Calendar className="w-3 h-3" />
                                  Due: {task.dueDate}
                                </span>
                                <span className="flex items-center gap-1 text-green-400">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Completed: {task.completedAt}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </TabsContent>

                      <TabsContent value="in-progress" className="space-y-3 mt-4">
                        {selectedTeamMember.tasks.filter(t => t.status === 'in-progress').map((task) => (
                          <div key={task.id} className="flex items-start gap-3 p-4 rounded-lg bg-background/30 border border-border hover:bg-card/50 transition-all">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-500/20 text-blue-400">
                              <Clock className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-4">
                                <p className="font-medium text-foreground">{task.task}</p>
                                <Badge className={`${
                                  task.priority === 'High' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                  task.priority === 'Medium' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                                  'bg-gray-500/20 text-gray-400 border-gray-500/30'
                                } border shadow-md`}>
                                  {task.priority}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Due: {task.dueDate}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </TabsContent>

                      <TabsContent value="pending" className="space-y-3 mt-4">
                        {selectedTeamMember.tasks.filter(t => t.status === 'pending').map((task) => (
                          <div key={task.id} className="flex items-start gap-3 p-4 rounded-lg bg-background/30 border border-border hover:bg-card/50 transition-all">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-yellow-500/20 text-yellow-400">
                              <Calendar className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-4">
                                <p className="font-medium text-foreground">{task.task}</p>
                                <Badge className={`${
                                  task.priority === 'High' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                  task.priority === 'Medium' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                                  'bg-gray-500/20 text-gray-400 border-gray-500/30'
                                } border shadow-md`}>
                                  {task.priority}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Due: {task.dueDate}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Quick Action: Send Email Dialog */}
      <Dialog open={showQuickEmail} onOpenChange={setShowQuickEmail}>
        <DialogContent className="bg-card border-border max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Send Email
            </DialogTitle>
            <DialogDescription>Compose and send email with Gmail integration</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {showQuickEmailPrompt && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-3 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-5 h-5 text-primary" />
                  <Label className="text-base font-semibold">AI Prompt</Label>
                </div>
                <Textarea
                  placeholder="Describe what you want the email to focus on..."
                  value={quickEmailPrompt}
                  onChange={(e) => setQuickEmailPrompt(e.target.value)}
                  className="bg-background/50 border-2 border-border min-h-[100px]"
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={generateQuickEmailTemplate}
                    disabled={isGeneratingQuickEmail}
                    className="bg-gradient-to-r from-primary to-secondary"
                  >
                    {isGeneratingQuickEmail ? 'Generating...' : 'Generate'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowQuickEmailPrompt(false);
                      setQuickEmailPrompt('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>From</Label>
                <Input
                  placeholder="your@email.com"
                  value={quickEmailFrom}
                  onChange={(e) => setQuickEmailFrom(e.target.value)}
                  className="bg-background/50 border-2 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>To</Label>
                <Input
                  placeholder="recipient@email.com"
                  value={quickEmailTo}
                  onChange={(e) => setQuickEmailTo(e.target.value)}
                  className="bg-background/50 border-2 border-border"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input
                placeholder="Email subject..."
                value={quickEmailSubject}
                onChange={(e) => setQuickEmailSubject(e.target.value)}
                className="bg-background/50 border-2 border-border"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Body</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateQuickEmailTemplate}
                  disabled={isGeneratingQuickEmail}
                >
                  <Bot className="w-4 h-4 mr-2" />
                  {isGeneratingQuickEmail ? 'Generating...' : 'AI Generate'}
                </Button>
              </div>
              <Textarea
                placeholder="Write your email..."
                value={quickEmailBody}
                onChange={(e) => setQuickEmailBody(e.target.value)}
                className="bg-background/50 border-2 border-border min-h-[250px]"
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowQuickEmail(false)}>Cancel</Button>
              <Button className="bg-gradient-to-r from-primary to-secondary">
                <Send className="w-4 h-4 mr-2" />
                Send Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quick Action: Schedule Meeting Dialog */}
      <Dialog open={showQuickMeeting} onOpenChange={setShowQuickMeeting}>
        <DialogContent className="bg-card border-border max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-primary" />
              Schedule Meeting
            </DialogTitle>
            <DialogDescription>Schedule meeting with Zoom or Google Meet</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {showQuickMeetingPrompt && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-3 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-5 h-5 text-primary" />
                  <Label className="text-base font-semibold">AI Prompt</Label>
                </div>
                <Textarea
                  placeholder="Describe the meeting focus areas..."
                  value={quickMeetingPrompt}
                  onChange={(e) => setQuickMeetingPrompt(e.target.value)}
                  className="bg-background/50 border-2 border-border min-h-[100px]"
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={generateQuickMeetingAgenda}
                    disabled={isGeneratingQuickMeeting}
                    className="bg-gradient-to-r from-primary to-secondary"
                  >
                    {isGeneratingQuickMeeting ? 'Generating...' : 'Generate'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowQuickMeetingPrompt(false);
                      setQuickMeetingPrompt('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Meeting Title</Label>
                <Input
                  placeholder="Product Demo"
                  value={quickMeetingTitle}
                  onChange={(e) => setQuickMeetingTitle(e.target.value)}
                  className="bg-background/50 border-2 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>Platform</Label>
                <Select value={quickMeetingPlatform} onValueChange={setQuickMeetingPlatform}>
                  <SelectTrigger className="bg-background/50 border-2 border-border">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zoom">Zoom</SelectItem>
                    <SelectItem value="gmeet">Google Meet</SelectItem>
                    <SelectItem value="teams">Microsoft Teams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Attendees</Label>
              <Input
                placeholder="email1@example.com, email2@example.com"
                value={quickMeetingAttendees}
                onChange={(e) => setQuickMeetingAttendees(e.target.value)}
                className="bg-background/50 border-2 border-border"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Agenda / Description</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateQuickMeetingAgenda}
                  disabled={isGeneratingQuickMeeting}
                >
                  <Bot className="w-4 h-4 mr-2" />
                  {isGeneratingQuickMeeting ? 'Generating...' : 'AI Generate'}
                </Button>
              </div>
              <Textarea
                placeholder="Meeting agenda..."
                value={quickMeetingAgenda}
                onChange={(e) => setQuickMeetingAgenda(e.target.value)}
                className="bg-background/50 border-2 border-border min-h-[200px]"
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowQuickMeeting(false)}>Cancel</Button>
              <Button className="bg-gradient-to-r from-primary to-secondary">
                <Video className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quick Action: Cold Call Dialog */}
      <Dialog open={showQuickCall} onOpenChange={setShowQuickCall}>
        <DialogContent className="bg-card border-border max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              Cold Call
            </DialogTitle>
            <DialogDescription>Prepare and execute cold calling with AI assistance</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Lead Name</Label>
                <Input
                  placeholder="John Doe"
                  value={quickCallLeadName}
                  onChange={(e) => setQuickCallLeadName(e.target.value)}
                  className="bg-background/50 border-2 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  placeholder="+1 (555) 123-4567"
                  value={quickCallNumber}
                  onChange={(e) => setQuickCallNumber(e.target.value)}
                  className="bg-background/50 border-2 border-border"
                />
              </div>
            </div>
            
            {showQuickCallPrompt && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-3 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-5 h-5 text-primary" />
                  <Label className="text-base font-semibold">AI Prompt</Label>
                </div>
                <Textarea
                  placeholder="Describe the call focus or topics to cover..."
                  value={quickCallPrompt}
                  onChange={(e) => setQuickCallPrompt(e.target.value)}
                  className="bg-background/50 border-2 border-border min-h-[100px]"
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={generateQuickCallScript}
                    disabled={isGeneratingQuickCall}
                    className="bg-gradient-to-r from-primary to-secondary"
                  >
                    {isGeneratingQuickCall ? 'Generating...' : 'Generate'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowQuickCallPrompt(false);
                      setQuickCallPrompt('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Call Script / Transcript</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateQuickCallScript}
                  disabled={isGeneratingQuickCall}
                >
                  <Bot className="w-4 h-4 mr-2" />
                  {isGeneratingQuickCall ? 'Generating...' : 'AI Generate'}
                </Button>
              </div>
              <Textarea
                placeholder="Call script or transcript..."
                value={quickCallTranscript}
                onChange={(e) => setQuickCallTranscript(e.target.value)}
                className="bg-background/50 border-2 border-border min-h-[300px]"
              />
            </div>
            
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="text-sm">Call Summary & Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Review call transcript above</p>
                <p>• Identify key pain points and objections</p>
                <p>• Schedule follow-up meeting or demo</p>
                <p>• Send follow-up email with resources</p>
                <p>• Update lead status in CRM</p>
              </CardContent>
            </Card>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowQuickCall(false)}>Cancel</Button>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500">
                <Phone className="w-4 h-4 mr-2" />
                Start Call
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quick Action: Assign Task Dialog */}
      <Dialog open={showQuickTask} onOpenChange={setShowQuickTask}>
        <DialogContent className="bg-card border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Assign Task
            </DialogTitle>
            <DialogDescription>Assign tasks to team members</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Team Members</Label>
              <div className="grid grid-cols-2 gap-2">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      quickTaskMembers.includes(member.id)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => {
                      if (quickTaskMembers.includes(member.id)) {
                        setQuickTaskMembers(quickTaskMembers.filter(id => id !== member.id));
                      } else {
                        setQuickTaskMembers([...quickTaskMembers, member.id]);
                      }
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-semibold">
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Task Description</Label>
              <Textarea
                placeholder="Describe the task..."
                value={quickTaskDescription}
                onChange={(e) => setQuickTaskDescription(e.target.value)}
                className="bg-background/50 border-2 border-border min-h-[100px]"
              />
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border">
              <input
                type="checkbox"
                id="schedule-task"
                checked={quickTaskScheduled}
                onChange={(e) => setQuickTaskScheduled(e.target.checked)}
                className="w-4 h-4 rounded border-2 border-primary text-primary focus:ring-primary cursor-pointer"
              />
              <Label htmlFor="schedule-task" className="cursor-pointer flex-1">Schedule for later</Label>
            </div>
            
            {quickTaskScheduled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2"
              >
                <Label>Date & Time</Label>
                <Input
                  type="datetime-local"
                  value={quickTaskDateTime}
                  onChange={(e) => setQuickTaskDateTime(e.target.value)}
                  className="bg-background/50 border-2 border-border"
                />
              </motion.div>
            )}
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowQuickTask(false)}>Cancel</Button>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {quickTaskScheduled ? 'Schedule Task' : 'Assign Task'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quick Action: Email Campaign Dialog */}
      <Dialog open={showQuickCampaign} onOpenChange={setShowQuickCampaign}>
        <DialogContent className="bg-card border-border max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" />
              Email Campaign
            </DialogTitle>
            <DialogDescription>Create and launch email campaigns to multiple leads</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Select Leads</Label>
              <div className="max-h-[200px] overflow-y-auto border border-border rounded-lg p-3 space-y-2 bg-background/30">
                {leads.map((lead) => (
                  <div
                    key={lead.lead_id}
                    className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-all ${
                      quickCampaignLeads.includes(lead.lead_id)
                        ? 'bg-primary/10 border border-primary'
                        : 'hover:bg-card/50'
                    }`}
                    onClick={() => {
                      if (quickCampaignLeads.includes(lead.lead_id)) {
                        setQuickCampaignLeads(quickCampaignLeads.filter(id => id !== lead.lead_id));
                      } else {
                        setQuickCampaignLeads([...quickCampaignLeads, lead.lead_id]);
                      }
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-semibold">
                      {lead.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.company} • {lead.email}</p>
                    </div>
                    {quickCampaignLeads.includes(lead.lead_id) && (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{quickCampaignLeads.length} leads selected</p>
            </div>
            
            {showQuickCampaignPrompt && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-3 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-5 h-5 text-primary" />
                  <Label className="text-base font-semibold">AI Prompt</Label>
                </div>
                <Textarea
                  placeholder="Describe the campaign focus and key messages..."
                  value={quickCampaignPrompt}
                  onChange={(e) => setQuickCampaignPrompt(e.target.value)}
                  className="bg-background/50 border-2 border-border min-h-[100px]"
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={generateQuickCampaignContent}
                    disabled={isGeneratingQuickCampaign}
                    className="bg-gradient-to-r from-primary to-secondary"
                  >
                    {isGeneratingQuickCampaign ? 'Generating...' : 'Generate'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowQuickCampaignPrompt(false);
                      setQuickCampaignPrompt('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>From</Label>
                <Input
                  placeholder="your@company.com"
                  value={quickCampaignFrom}
                  onChange={(e) => setQuickCampaignFrom(e.target.value)}
                  className="bg-background/50 border-2 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input
                  placeholder="Campaign subject..."
                  value={quickCampaignSubject}
                  onChange={(e) => setQuickCampaignSubject(e.target.value)}
                  className="bg-background/50 border-2 border-border"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Email Body</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateQuickCampaignContent}
                  disabled={isGeneratingQuickCampaign}
                >
                  <Bot className="w-4 h-4 mr-2" />
                  {isGeneratingQuickCampaign ? 'Generating...' : 'AI Generate'}
                </Button>
              </div>
              <Textarea
                placeholder="Campaign email body... Use {{Name}}, {{Company}} for personalization"
                value={quickCampaignBody}
                onChange={(e) => setQuickCampaignBody(e.target.value)}
                className="bg-background/50 border-2 border-border min-h-[250px]"
              />
              <p className="text-xs text-muted-foreground">
                💡 Use variables: {`{{Name}}, {{Company}}, {{Email}}`} for personalization
              </p>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border">
              <input
                type="checkbox"
                id="schedule-campaign"
                checked={quickCampaignScheduled}
                onChange={(e) => setQuickCampaignScheduled(e.target.checked)}
                className="w-4 h-4 rounded border-2 border-primary text-primary focus:ring-primary cursor-pointer"
              />
              <Label htmlFor="schedule-campaign" className="cursor-pointer flex-1">Schedule campaign for later</Label>
            </div>
            
            {quickCampaignScheduled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2"
              >
                <Label>Schedule Date & Time</Label>
                <Input
                  type="datetime-local"
                  value={quickCampaignDateTime}
                  onChange={(e) => setQuickCampaignDateTime(e.target.value)}
                  className="bg-background/50 border-2 border-border"
                />
              </motion.div>
            )}
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowQuickCampaign(false)}>Cancel</Button>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500">
                <Send className="w-4 h-4 mr-2" />
                {quickCampaignScheduled ? 'Schedule Campaign' : 'Launch Campaign'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Sales Assistant - Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => setShowAssistant(!showAssistant)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-primary via-secondary to-primary bg-size-200 animate-gradient shadow-2xl shadow-primary/50 hover:shadow-primary/70 transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center group"
      >
        {showAssistant ? (
          <X className="w-7 h-7 text-white group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <motion.div
            animate={{ 
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Sparkles className="w-7 h-7 text-white" />
          </motion.div>
        )}
        {!showAssistant && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse"></span>
        )}
      </motion.button>

      {/* AI Sales Assistant - Chat Panel */}
      <AnimatePresence>
        {showAssistant && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-8 right-28 w-96 h-[600px] bg-card/95 backdrop-blur-2xl border-2 border-primary/30 rounded-3xl shadow-2xl shadow-primary/30 z-50 flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 animate-gradient p-6 border-b border-primary/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Sales AI Assistant</h3>
                    <p className="text-xs text-white/80 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      Online & Ready to Help
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {assistantMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'assistant' 
                        ? 'bg-gradient-to-br from-primary to-secondary' 
                        : 'bg-gradient-to-br from-purple-500 to-pink-500'
                    }`}>
                      {message.sender === 'assistant' ? (
                        <Bot className="w-5 h-5 text-white" />
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className={`px-4 py-3 rounded-2xl ${
                        message.sender === 'assistant'
                          ? 'bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20'
                          : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20'
                      }`}>
                        <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                          {message.text}
                        </p>
                      </div>
                      <span className="text-[10px] text-muted-foreground px-2">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions Suggestions */}
            <div className="px-4 py-2 border-t border-border/50">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[
                  { icon: Calendar, text: 'Schedule Meeting', action: 'schedule a meeting' },
                  { icon: Users, text: 'View Leads', action: 'show me leads' },
                  { icon: Send, text: 'Create Campaign', action: 'create campaign' },
                  { icon: TrendingUp, text: 'Analytics', action: 'show performance' }
                ].map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setAssistantInput(suggestion.action);
                      setTimeout(() => handleAssistantMessage(), 100);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card/50 border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 whitespace-nowrap group"
                  >
                    <suggestion.icon className="w-3 h-3 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-xs text-foreground">{suggestion.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border/50 bg-card/50">
              <div className="flex gap-2">
                <Input
                  value={assistantInput}
                  onChange={(e) => setAssistantInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAssistantMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-background/50 border-2 border-border focus:border-primary/50 rounded-xl"
                />
                <Button
                  onClick={handleAssistantMessage}
                  disabled={!assistantInput.trim()}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 text-center">
                Powered by AI • Context-aware • Real-time
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
