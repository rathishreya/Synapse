'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ArrowLeft,
  Plus,
  Play,
  Save,
  Mail,
  Clock,
  UserPlus,
  Eye,
  CheckCircle,
  ThumbsUp,
  Send,
  MessageSquare,
  Heart,
  UserCheck,
  StopCircle,
  GitBranch,
  Settings,
  X,
  Pause,
  BarChart3,
  Users,
  Loader,
  XCircle,
  Ban,
  Link as LinkIcon,
  Sparkles,
  ChevronDown,
  Trash2,
  Edit,
  Copy,
  AlertCircle,
  Calendar,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import ChatAssistant from '@/components/chat-assistant';

type ActionType = 
  | 'send_invite' 
  | 'send_invite_with_note'
  | 'message' 
  | 'inmail' 
  | 'follow' 
  | 'send_email'
  | 'withdraw_invite';

type ConditionType = 
  | 'if_connected'
  | 'if_viewed_inmail'
  | 'if_responded'
  | 'if_user_acknowledges';

type SequenceNode = {
  id: string;
  type: ActionType | 'delay' | 'condition' | 'end';
  label: string;
  data: {
    message?: string;
    subject?: string;
    delay?: number;
    delayUnit?: 'hours' | 'days';
    conditionType?: ConditionType;
    conditionLabel?: string;
    personalizationVars?: string[];
  };
  children?: SequenceNode[];
  // For branching conditions
  trueBranch?: SequenceNode[];
  falseBranch?: SequenceNode[];
  position: { x: number; y: number };
};

export default function SequenceBuilderPage() {
  const [campaignName, setCampaignName] = useState('');
  const [tempCampaignName, setTempCampaignName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [showDelayDialog, setShowDelayDialog] = useState(false);
  const [showConditionDialog, setShowConditionDialog] = useState(false);
  const [showBranchDialog, setShowBranchDialog] = useState(false);
  const [selectedBranchNodeId, setSelectedBranchNodeId] = useState<string | null>(null);
  const [selectedBranchPath, setSelectedBranchPath] = useState<'true' | 'false' | null>(null);
  const [showAddActionMenu, setShowAddActionMenu] = useState(false);
  const [showStartChoice, setShowStartChoice] = useState(false);
  const [showAudienceSelector, setShowAudienceSelector] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState('');
  const [currentAction, setCurrentAction] = useState<ActionType | null>(null);
  const [insertAfterNodeId, setInsertAfterNodeId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'sequence' | 'audience' | 'statistics' | 'settings'>('sequence');
  const [outreachType, setOutreachType] = useState<'single' | 'multichannel'>('single');
  const [singleChannelType, setSingleChannelType] = useState<'email' | 'linkedin'>('email');
  const [showWorkflowDecision, setShowWorkflowDecision] = useState(false);
  const [workflowDecision, setWorkflowDecision] = useState<'build' | 'manual' | 'later' | null>(null);
  const [pendingAcknowledgeNode, setPendingAcknowledgeNode] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Array<{id: string; message: string; type: 'info' | 'success' | 'warning'}>>([]);
  
  // Multichannel filtering states
  const [showMultichannelFilterDialog, setShowMultichannelFilterDialog] = useState(false);
  const [totalProspects, setTotalProspects] = useState(0);
  const [completeProspects, setCompleteProspects] = useState(0);
  const [incompleteProspects, setIncompleteProspects] = useState(0);
  const [showTemplateChoice, setShowTemplateChoice] = useState(false);
  const [templateChoice, setTemplateChoice] = useState<'template' | 'custom' | null>(null);
  
  // Prospect view states
  const [showProspectView, setShowProspectView] = useState(false);
  const [selectedNodeForProspects, setSelectedNodeForProspects] = useState<string | null>(null);
  
  // Campaign metadata states
  const [campaignDescription, setCampaignDescription] = useState('');
  const [scheduledDate, setScheduledDate] = useState<string | null>(null);
  const [createdDate] = useState(new Date());
  
  // Sending limits states
  const [dailyLinkedInInviteLimit, setDailyLinkedInInviteLimit] = useState(20);
  const [dailyEmailSendLimit, setDailyEmailSendLimit] = useState(50);
  const [dailyLinkedInDmLimit, setDailyLinkedInDmLimit] = useState(30);
  
  // Campaign status
  const [campaignStatus, setCampaignStatus] = useState<'active' | 'paused' | 'stopped'>('active');
  
  // Sending schedule states
  const [enabledDays, setEnabledDays] = useState<Record<string, boolean>>({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false
  });
  const [timeWindowStart, setTimeWindowStart] = useState('09:00');
  const [timeWindowEnd, setTimeWindowEnd] = useState('18:00');
  const [timezone, setTimezone] = useState('America/New_York');
  
  // Groups state
  const [groups, setGroups] = useState<Array<{
    id: string;
    name: string;
    description: string;
    offering: string;
    prospectCount: number;
    selected: boolean;
  }>>([
    { id: '1', name: 'Enterprise Q1 Prospects', description: 'High-value enterprise leads from Q1 campaign', offering: 'enterprise', prospectCount: 245, selected: false },
    { id: '2', name: 'SaaS Startup Founders', description: 'Founders of SaaS startups (Series A-B)', offering: 'saas', prospectCount: 189, selected: false },
    { id: '3', name: 'Marketing Directors - Tech', description: 'Marketing decision makers in tech companies', offering: 'consulting', prospectCount: 156, selected: false },
    { id: '4', name: 'Financial Services CTO', description: 'CTOs and tech leaders in financial sector', offering: 'enterprise', prospectCount: 92, selected: false },
    { id: '5', name: 'Healthcare IT Managers', description: 'IT managers and directors in healthcare', offering: 'enterprise', prospectCount: 134, selected: false },
    { id: '6', name: 'E-commerce Growth Teams', description: 'Growth and marketing teams in e-commerce', offering: 'saas', prospectCount: 203, selected: false },
  ]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [newGroupOffering, setNewGroupOffering] = useState('enterprise');
  const [selectedOfferingFilter, setSelectedOfferingFilter] = useState<string>('all');

  const stats = [
    { label: 'ALL LEADS', value: 25, icon: Users, color: 'from-slate-600 to-slate-700' },
    { label: 'IN PROGRESS', value: 0, icon: Loader, color: 'from-blue-500 to-blue-600' },
    { label: 'FINISHED', value: 0, icon: CheckCircle, color: 'from-green-500 to-green-600' },
    { label: 'AWAITING', value: 0, icon: Clock, color: 'from-yellow-500 to-yellow-600' },
    { label: 'PAUSED', value: 0, icon: Pause, color: 'from-orange-500 to-orange-600' },
    { label: 'FAILED', value: 0, icon: XCircle, color: 'from-red-500 to-red-600' },
    { label: 'BLACKLISTED', value: 0, icon: Ban, color: 'from-purple-500 to-purple-600' }
  ];

  // Default templates based on outreach type
  const getDefaultEmailTemplate = (): SequenceNode => ({
    id: 'start',
    type: 'send_email',
    label: 'Send Email',
    data: {
      subject: 'Introducing [Your Product]',
      message: 'Hi {{firstName}},\n\nI noticed your work at {{company}} and thought our solution could help...',
      personalizationVars: ['firstName', 'company']
    },
    position: { x: 0, y: 0 },
    children: [{
      id: 'delay-1',
      type: 'delay',
      label: 'Wait 3 Days',
      data: { delay: 3, delayUnit: 'days' },
      position: { x: 0, y: 150 },
      children: [{
        id: 'followup-1',
        type: 'send_email',
        label: 'Follow-up Email',
        data: {
          subject: 'Quick follow-up',
          message: 'Hi {{firstName}},\n\nJust checking if you had a chance to review my previous email...',
        },
        position: { x: 0, y: 300 },
        children: [{
          id: 'end',
          type: 'end',
          label: 'End Campaign',
          data: {},
          position: { x: 0, y: 450 }
        }]
      }]
    }]
  });

  const getDefaultLinkedInTemplate = (): SequenceNode => ({
    id: 'start',
    type: 'send_invite',
    label: 'Send Connection Request',
    data: {
      message: 'Hi {{firstName}}, I\'d love to connect and learn more about your work at {{company}}.',
      personalizationVars: ['firstName', 'company']
    },
    position: { x: 0, y: 0 },
    children: [{
      id: 'delay-1',
      type: 'delay',
      label: 'Wait 2 Days',
      data: { delay: 2, delayUnit: 'days' },
      position: { x: 0, y: 150 },
      children: [{
        id: 'condition-1',
        type: 'condition',
        label: 'If Connected?',
        data: {
          conditionType: 'if_connected',
          conditionLabel: 'Connection Accepted'
        },
        position: { x: 0, y: 300 },
        children: [{
          id: 'message-1',
          type: 'message',
          label: 'Send Message',
          data: {
            message: 'Thanks for connecting {{firstName}}! I wanted to share how we help companies like {{company}}...',
          },
          position: { x: -200, y: 450 },
          children: [{
            id: 'end',
            type: 'end',
            label: 'End Campaign',
            data: {},
            position: { x: -200, y: 600 }
          }]
        }]
      }]
    }]
  });

  const getDefaultMultichannelTemplate = (): SequenceNode => ({
    id: 'start',
    type: 'send_invite',
    label: 'Send LinkedIn Connection',
    data: {
      message: 'Hi {{firstName}}, I\'d love to connect!',
      personalizationVars: ['firstName']
    },
    position: { x: 0, y: 0 },
    children: [{
      id: 'delay-1',
      type: 'delay',
      label: 'Wait 1 Day',
      data: { delay: 1, delayUnit: 'days' },
      position: { x: 0, y: 150 },
      children: [{
        id: 'email-1',
        type: 'send_email',
        label: 'Send Email',
        data: {
          subject: 'Following up from LinkedIn',
          message: 'Hi {{firstName}},\n\nI just sent you a connection request on LinkedIn...',
        },
        position: { x: 0, y: 300 },
        children: [{
          id: 'delay-2',
          type: 'delay',
          label: 'Wait 3 Days',
          data: { delay: 3, delayUnit: 'days' },
          position: { x: 0, y: 450 },
          children: [{
            id: 'followup',
            type: 'message',
            label: 'LinkedIn Message',
            data: {
              message: 'Hi {{firstName}}, just wanted to follow up on my email...',
            },
            position: { x: 0, y: 600 },
            children: [{
              id: 'end',
              type: 'end',
              label: 'End Campaign',
              data: {},
              position: { x: 0, y: 750 }
            }]
          }]
        }]
      }]
    }]
  });

  // Default complex sequence with multiple branches
  const getDefaultComplexSequence = (): SequenceNode => ({
    id: '1',
    type: 'send_invite_with_note',
    label: 'Send LinkedIn Invite with note',
    data: {
      message: "Hi {{firstName}}, I came across your profile and was impressed by your work at {{company}}. Would love to connect!"
    },
    position: { x: 0, y: 0 },
    children: [{
      id: '2',
      type: 'delay',
      label: 'Wait 3 Days',
      data: { delay: 3, delayUnit: 'days' },
      position: { x: 0, y: 150 },
      children: [{
        id: '3',
        type: 'condition',
        label: 'If connected',
        data: { conditionType: 'if_connected', conditionLabel: 'If connected' },
        position: { x: 0, y: 300 },
        trueBranch: [{
          id: '4',
          type: 'message',
          label: 'LinkedIn Message',
          data: { message: "Thanks for connecting, {{firstName}}! I'd love to learn more about your work at {{company}}." },
          position: { x: -200, y: 450 },
          children: [{
            id: '5',
            type: 'delay',
            label: 'Wait 2 Days',
            data: { delay: 2, delayUnit: 'days' },
            position: { x: -200, y: 600 },
            children: [{
              id: '6',
              type: 'condition',
              label: 'If responded',
              data: { conditionType: 'if_responded', conditionLabel: 'If responded' },
              position: { x: -200, y: 750 },
              trueBranch: [{
                id: '7',
                type: 'send_email',
                label: 'Send Email',
                data: { subject: 'Great connecting with you!', message: 'Hi {{firstName}}, following up on our conversation...' },
                position: { x: -350, y: 900 },
                children: [{
                  id: '8',
                  type: 'end',
                  label: 'End Campaign',
                  data: {},
                  position: { x: -350, y: 1050 }
                }]
              }],
              falseBranch: [{
                id: '9',
                type: 'delay',
                label: 'Wait 3 Days',
                data: { delay: 3, delayUnit: 'days' },
                position: { x: -50, y: 900 },
                children: [{
                  id: '10',
                  type: 'follow',
                  label: 'Follow Profile',
                  data: {},
                  position: { x: -50, y: 1050 },
                  children: [{
                    id: '11',
                    type: 'delay',
                    label: 'Wait 2 Days',
                    data: { delay: 2, delayUnit: 'days' },
                    position: { x: -50, y: 1200 },
                    children: [{
                      id: '12',
                      type: 'inmail',
                      label: 'InMail',
                      data: { message: 'Hi {{firstName}}, wanted to reach out again...' },
                      position: { x: -50, y: 1350 },
                      children: [{
                        id: '13',
                        type: 'end',
                        label: 'End Campaign',
                        data: {},
                        position: { x: -50, y: 1500 }
                      }]
                    }]
                  }]
                }]
              }]
            }]
          }]
        }],
        falseBranch: [{
          id: '14',
          type: 'delay',
          label: 'Wait 2 Days',
          data: { delay: 2, delayUnit: 'days' },
          position: { x: 200, y: 450 },
          children: [{
            id: '15',
            type: 'follow',
            label: 'Follow Profile',
            data: {},
            position: { x: 200, y: 600 },
            children: [{
              id: '16',
              type: 'delay',
              label: 'Wait 3 Days',
              data: { delay: 3, delayUnit: 'days' },
              position: { x: 200, y: 750 },
              children: [{
                id: '17',
                type: 'send_email',
                label: 'Send Email',
                data: { subject: 'Connecting outside LinkedIn', message: 'Hi {{firstName}}, wanted to reach you via email...' },
                position: { x: 200, y: 900 },
                children: [{
                  id: '18',
                  type: 'delay',
                  label: 'Wait 4 Days',
                  data: { delay: 4, delayUnit: 'days' },
                  position: { x: 200, y: 1050 },
                  children: [{
                    id: '19',
                    type: 'condition',
                    label: 'If user acknowledges',
                    data: { conditionType: 'if_user_acknowledges', conditionLabel: 'If user acknowledges / says yes' },
                    position: { x: 200, y: 1200 },
                    trueBranch: [{
                      id: '20',
                      type: 'message',
                      label: 'LinkedIn Message',
                      data: { message: 'Thanks for your response!' },
                      position: { x: 50, y: 1350 },
                      children: [{
                        id: '21',
                        type: 'end',
                        label: 'End Campaign',
                        data: {},
                        position: { x: 50, y: 1500 }
                      }]
                    }],
                    falseBranch: [{
                      id: '22',
                      type: 'withdraw_invite',
                      label: 'Withdraw Invite',
                      data: {},
                      position: { x: 350, y: 1350 },
                      children: [{
                        id: '23',
                        type: 'end',
                        label: 'End Campaign',
                        data: {},
                        position: { x: 350, y: 1500 }
                      }]
                    }]
                  }]
                }]
              }]
            }]
          }]
        }]
      }]
    }]
  });

  const [sequenceTree, setSequenceTree] = useState<SequenceNode | null>(getDefaultComplexSequence());

  const [messageForm, setMessageForm] = useState({
    message: '',
    subject: '',
    personalizationVars: ['First name', 'Last name', 'Position', 'Company', 'Country']
  });

  const [delayForm, setDelayForm] = useState({
    value: 5,
    unit: 'days' as 'hours' | 'days'
  });

  const [conditionForm, setConditionForm] = useState<ConditionType>('if_connected');

  // Branch actions configuration
  const [branchConfig, setBranchConfig] = useState<{
    trueBranchAction: ActionType | 'delay' | 'none';
    falseBranchAction: ActionType | 'delay' | 'none';
    trueMessage?: string;
    falseMessage?: string;
    trueDelay?: number;
    falseDelay?: number;
  }>({
    trueBranchAction: 'none',
    falseBranchAction: 'none'
  });

  // Available audience groups
  const audienceGroups = [
    { value: 'all', label: 'All Prospects', count: 1250 },
    { value: 'tech-founders', label: 'Tech Founders & CEOs', count: 450 },
    { value: 'marketing-directors', label: 'Marketing Directors', count: 320 },
    { value: 'sales-managers', label: 'Sales Managers', count: 280 },
    { value: 'hr-professionals', label: 'HR Professionals', count: 200 }
  ];

  // Comprehensive template sequence with pre-filled messages
  const templateSequence: SequenceNode = {
    id: '1',
    type: 'send_invite_with_note',
    label: 'Send LinkedIn Invite with note',
    data: {
      message: "Hi {{First name}},\n\nI noticed your impressive work at {{Company}} and would love to connect! I believe we could share valuable insights about {{Position}}.\n\nLooking forward to connecting!\n\nBest regards"
    },
    position: { x: 400, y: 50 },
    children: [
      {
        id: '2',
        type: 'delay',
        label: 'Wait 5 days',
        data: { delay: 5, delayUnit: 'days' },
        position: { x: 400, y: 150 },
        children: [
          {
            id: '3',
            type: 'condition',
            label: 'If connected',
            data: { conditionType: 'if_connected', conditionLabel: 'If connected' },
            position: { x: 400, y: 250 },
            children: [
              // NOT CONNECTED PATH (LEFT)
              {
                id: '4',
                type: 'follow',
                label: 'Follow Profile',
                data: {},
                position: { x: 200, y: 350 },
                children: [
                  {
                    id: '5',
                    type: 'delay',
                    label: 'Wait 1 day',
                    data: { delay: 1, delayUnit: 'days' },
                    position: { x: 200, y: 450 },
                    children: [
                      {
                        id: '6',
                        type: 'follow',
                        label: 'Follow',
                        data: {},
                        position: { x: 200, y: 550 },
                        children: [
                          {
                            id: '7',
                            type: 'delay',
                            label: 'Wait 3 days',
                            data: { delay: 3, delayUnit: 'days' },
                            position: { x: 200, y: 650 },
                            children: [
                              {
                                id: '8',
                                type: 'inmail',
                                label: 'InMail',
                                data: {
                                  subject: 'Quick question about {{Company}}',
                                  message: "Hi {{First name}},\n\nI hope this message finds you well! I wanted to reach out as I've been following {{Company}}'s growth and I'm impressed by your approach to {{Position}}.\n\nI'd love to explore potential synergies between our organizations. Would you be open to a brief conversation?\n\nBest regards"
                                },
                                position: { x: 200, y: 750 },
                                children: [
                                  {
                                    id: '9',
                                    type: 'delay',
                                    label: 'Wait 7 days',
                                    data: { delay: 7, delayUnit: 'days' },
                                    position: { x: 200, y: 850 },
                                    children: [
                                      {
                                        id: '10',
                                        type: 'condition',
                                        label: 'If responded',
                                        data: { conditionType: 'if_responded', conditionLabel: 'If responded' },
                                        position: { x: 200, y: 950 },
                                        children: [
                                          {
                                            id: '11',
                                            type: 'end',
                                            label: 'End of sequence',
                                            data: {},
                                            position: { x: 100, y: 1050 },
                                            children: []
                                          },
                                          {
                                            id: '12',
                                            type: 'withdraw_invite',
                                            label: 'Withdraw invite',
                                            data: {},
                                            position: { x: 300, y: 1050 },
                                            children: [
                                              {
                                                id: '13',
                                                type: 'end',
                                                label: 'End of sequence',
                                                data: {},
                                                position: { x: 300, y: 1150 },
                                                children: []
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              // CONNECTED PATH (RIGHT)
              {
                id: '14',
                type: 'delay',
                label: 'Wait 1 hour',
                data: { delay: 1, delayUnit: 'hours' },
                position: { x: 600, y: 350 },
                children: [
                  {
                    id: '15',
                    type: 'message',
                    label: 'Message',
                    data: {
                      message: "Thanks for connecting, {{First name}}! 🎉\n\nI'm excited to have you in my network. I've been following {{Company}}'s work in the industry and it's truly impressive.\n\nI'd love to learn more about your approach to {{Position}}. Would you be open to a quick 15-minute call next week?\n\nLooking forward to your thoughts!"
                    },
                    position: { x: 600, y: 450 },
                    children: [
                      {
                        id: '16',
                        type: 'delay',
                        label: 'Wait 3 days',
                        data: { delay: 3, delayUnit: 'days' },
                        position: { x: 600, y: 550 },
                        children: [
                          {
                            id: '17',
                            type: 'condition',
                            label: 'If user acknowledges',
                            data: { conditionType: 'if_user_acknowledges', conditionLabel: 'If user acknowledges / says yes' },
                            position: { x: 600, y: 650 },
                            children: [
                              // NOT ACKNOWLEDGED PATH
                              {
                                id: '18',
                                type: 'follow',
                                label: 'Follow Profile',
                                data: {},
                                position: { x: 500, y: 750 },
                                children: [
                                  {
                                    id: '19',
                                    type: 'delay',
                                    label: 'Wait 2 days',
                                    data: { delay: 2, delayUnit: 'days' },
                                    position: { x: 500, y: 850 },
                                    children: [
                                      {
                                        id: '20',
                                        type: 'inmail',
                                        label: 'InMail',
                                        data: {
                                          message: "Hi {{First name}}, just wanted to follow up..."
                                        },
                                        position: { x: 500, y: 950 },
                                        children: [
                                          {
                                            id: '21',
                                            type: 'delay',
                                            label: 'Wait 1 day',
                                            data: { delay: 1, delayUnit: 'days' },
                                            position: { x: 500, y: 1050 },
                                            children: [
                                              {
                                                id: '22',
                                                type: 'message',
                                                label: 'Message',
                                                data: {
                                                  message: "Hi {{First name}},\n\nI wanted to follow up on my previous message. I understand you're busy, but I genuinely believe we could create something valuable together.\n\nWould you have 10 minutes this week for a quick chat?\n\nNo pressure at all - just let me know what works for you! 😊"
                                                },
                                                position: { x: 500, y: 1150 },
                                                children: [
                                                  {
                                                    id: '23',
                                                    type: 'delay',
                                                    label: 'Wait 5 days',
                                                    data: { delay: 5, delayUnit: 'days' },
                                                    position: { x: 500, y: 1250 },
                                                    children: [
                                                      {
                                                        id: '24',
                                                        type: 'end',
                                                        label: 'End of sequence',
                                                        data: {},
                                                        position: { x: 500, y: 1350 },
                                                        children: []
                                                      }
                                                    ]
                                                  }
                                                ]
                                              }
                                            ]
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              },
                              // ACKNOWLEDGED PATH
                              {
                                id: '25',
                                type: 'delay',
                                label: 'Wait 1 day',
                                data: { delay: 1, delayUnit: 'days' },
                                position: { x: 700, y: 750 },
                                children: [
                                  {
                                    id: '26',
                                    type: 'send_email',
                                    label: 'Send Email',
                                    data: {
                                      subject: 'Following up from LinkedIn - {{Company}}',
                                      message: "Hi {{First name}},\n\nI wanted to reach out via email as well to make sure we stay connected!\n\nI've been thinking about how we could collaborate, and I have a few ideas that might benefit {{Company}}.\n\nWould you be available for a brief call this week?\n\nBest regards"
                                    },
                                    position: { x: 700, y: 850 },
                                    children: [
                                      {
                                        id: '27',
                                        type: 'delay',
                                        label: 'Wait 7 days',
                                        data: { delay: 7, delayUnit: 'days' },
                                        position: { x: 700, y: 950 },
                                        children: [
                                          {
                                            id: '28',
                                            type: 'end',
                                            label: 'End of sequence',
                                            data: {},
                                            position: { x: 700, y: 1050 },
                                            children: []
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  // Blank sequence
  const blankSequence: SequenceNode = {
    id: '1',
    type: 'end',
    label: 'End of sequence',
    data: {},
    position: { x: 400, y: 50 },
    children: []
  };

  const handleContinueToChoice = () => {
    if (!selectedAudience) {
      alert('Please select a target audience first');
      return;
    }
    if (!tempCampaignName.trim()) {
      alert('Please enter a campaign name');
      return;
    }
    setCampaignName(tempCampaignName);
    setShowAudienceSelector(false);
    setShowStartChoice(true);
  };

  // Count nodes recursively
  const countNodes = (node: SequenceNode | null, type?: string): number => {
    if (!node) return 0;
    let count = 0;
    if (!type || node.type === type) count = 1;
    if (node.children) {
      node.children.forEach(child => {
        count += countNodes(child, type);
      });
    }
    return count;
  };

  // Generate preview summary
  const getPreviewSummary = () => {
    if (!sequenceTree) return null;
    
    const totalSteps = countNodes(sequenceTree) - countNodes(sequenceTree, 'end');
    const messages = countNodes(sequenceTree, 'message') + countNodes(sequenceTree, 'inmail') + countNodes(sequenceTree, 'send_email');
    const conditions = countNodes(sequenceTree, 'condition');
    const delays = countNodes(sequenceTree, 'delay');
    
    return {
      totalSteps,
      messages,
      conditions,
      delays,
      audience: audienceGroups.find(g => g.value === selectedAudience)
    };
  };

  const handleStartWithTemplate = () => {
    setSequenceTree(JSON.parse(JSON.stringify(templateSequence))); // Deep clone to allow editing
    setShowStartChoice(false);
    setViewMode('sequence'); // Switch to sequence tab
  };

  const handleStartFromScratch = () => {
    setSequenceTree(blankSequence);
    setShowStartChoice(false);
    setViewMode('sequence'); // Switch to sequence tab
    // Automatically open add action menu to let user add first step
    setInsertAfterNodeId('1');
    setTimeout(() => setShowAddActionMenu(true), 300);
  };

  const availableActions = [
    { type: 'send_invite' as const, label: 'Send LinkedIn Invite', icon: UserPlus, description: 'Send connection request' },
    { type: 'send_invite_with_note' as const, label: 'Send LinkedIn Invite with note', icon: UserPlus, description: 'Send connection request with personalized note' },
    { type: 'message' as const, label: 'LinkedIn Message', icon: MessageSquare, description: 'Send LinkedIn message' },
    { type: 'inmail' as const, label: 'InMail', icon: Mail, description: 'Send LinkedIn InMail' },
    { type: 'follow' as const, label: 'Follow Profile', icon: UserCheck, description: 'Follow their profile' },
    { type: 'send_email' as const, label: 'Send Email', icon: Send, description: 'Send email' },
    { type: 'withdraw_invite' as const, label: 'Withdraw Invite', icon: StopCircle, description: 'Withdraw connection request' }
  ];

  const availableConditions = [
    { type: 'if_connected' as const, label: 'If connected', icon: UserCheck },
    { type: 'if_viewed_inmail' as const, label: 'If viewed InMail', icon: Eye },
    { type: 'if_responded' as const, label: 'If responded', icon: MessageSquare },
    { type: 'if_user_acknowledges' as const, label: 'If user acknowledges / says yes', icon: ThumbsUp }
  ];

  const getActionIcon = (type: ActionType | 'delay' | 'condition' | 'end') => {
    switch(type) {
      case 'send_invite': return UserPlus;
      case 'send_invite_with_note': return UserPlus;
      case 'message': return MessageSquare;
      case 'inmail': return Mail;
      case 'follow': return UserCheck;
      case 'send_email': return Send;
      case 'withdraw_invite': return StopCircle;
      case 'delay': return Clock;
      case 'condition': return GitBranch;
      case 'end': return StopCircle;
      default: return Settings;
    }
  };

  // Find and update node in tree
  const updateNodeInTree = (tree: SequenceNode | null, nodeId: string, updates: Partial<SequenceNode>): SequenceNode | null => {
    if (!tree) return null;
    if (tree.id === nodeId) {
      return { ...tree, ...updates };
    }
    if (tree.children) {
      return {
        ...tree,
        children: tree.children
          .map(child => updateNodeInTree(child, nodeId, updates))
          .filter(child => child !== null) as SequenceNode[]
      };
    }
    return tree;
  };

  // Find and delete node from tree
  const deleteNodeFromTree = (tree: SequenceNode | null, nodeId: string): SequenceNode | null => {
    if (!tree) return null;
    if (tree.id === nodeId) {
      return null;
    }
    if (tree.children) {
      const filteredChildren = tree.children
        .map(child => deleteNodeFromTree(child, nodeId))
        .filter(child => child !== null) as SequenceNode[];
      return { ...tree, children: filteredChildren };
    }
    return tree;
  };

  // Insert node after specific node
  const insertNodeAfter = (tree: SequenceNode | null, afterId: string, newNode: SequenceNode): SequenceNode | null => {
    if (!tree) return null;
    if (tree.id === afterId) {
      return {
        ...tree,
        children: [newNode]
      };
    }
    if (tree.children) {
      return {
        ...tree,
        children: tree.children.map(child => insertNodeAfter(child, afterId, newNode)).filter((child): child is SequenceNode => child !== null)
      };
    }
    return tree;
  };

  // Helper function to add node to branch
  const insertNodeToBranch = (tree: SequenceNode | null, nodeId: string, newNode: SequenceNode, branchPath: 'true' | 'false'): SequenceNode | null => {
    if (!tree) return null;
    
    if (tree.id === nodeId) {
      if (branchPath === 'true') {
        return {
          ...tree,
          trueBranch: tree.trueBranch ? [...tree.trueBranch, newNode] : [newNode]
        };
      } else {
        return {
          ...tree,
          falseBranch: tree.falseBranch ? [...tree.falseBranch, newNode] : [newNode]
        };
      }
    }
    
    // Search in children
    if (tree.children) {
      return {
        ...tree,
        children: tree.children.map(child => insertNodeToBranch(child, nodeId, newNode, branchPath)).filter((child): child is SequenceNode => child !== null)
      };
    }
    
    // Search in trueBranch
    if (tree.trueBranch) {
      return {
        ...tree,
        trueBranch: tree.trueBranch.map(child => insertNodeToBranch(child, nodeId, newNode, branchPath)).filter((child): child is SequenceNode => child !== null)
      };
    }
    
    // Search in falseBranch
    if (tree.falseBranch) {
      return {
        ...tree,
        falseBranch: tree.falseBranch.map(child => insertNodeToBranch(child, nodeId, newNode, branchPath)).filter((child): child is SequenceNode => child !== null)
      };
    }
    
    return tree;
  };

  // Add action handlers
  const handleAddAction = (actionType: ActionType, afterNodeId: string) => {
    const needsMessageConfig = actionType === 'message' || actionType === 'inmail' || actionType === 'send_email' || actionType === 'send_invite_with_note';
    
    if (needsMessageConfig) {
      setCurrentAction(actionType);
      setInsertAfterNodeId(afterNodeId);
      setShowMessageDialog(true);
    } else {
      // Check if adding to branch
      if (selectedBranchNodeId && selectedBranchPath) {
        const newNode: SequenceNode = {
          id: Date.now().toString(),
          type: actionType,
          label: availableActions.find(a => a.type === actionType)?.label || actionType,
          data: {},
          position: { x: 0, y: 0 }
        };
        setSequenceTree(insertNodeToBranch(sequenceTree, selectedBranchNodeId, newNode, selectedBranchPath));
        setSelectedBranchNodeId(null);
        setSelectedBranchPath(null);
      } else {
        // Add action directly to regular flow
        const newNode: SequenceNode = {
          id: Date.now().toString(),
          type: actionType,
          label: availableActions.find(a => a.type === actionType)?.label || actionType,
          data: {},
          position: { x: 0, y: 0 }
        };
        setSequenceTree(insertNodeAfter(sequenceTree, afterNodeId, newNode));
      }
      setShowAddActionMenu(false);
    }
  };

  const handleAddDelay = (afterNodeId: string) => {
    setInsertAfterNodeId(afterNodeId);
    setShowDelayDialog(true);
  };

  const handleAddCondition = (afterNodeId: string) => {
    setInsertAfterNodeId(afterNodeId);
    setShowConditionDialog(true);
  };

  const handleSaveMessage = () => {
    if (!currentAction) return;

    if (selectedNode && insertAfterNodeId) {
      // Editing existing node
      const findNode = (tree: SequenceNode | null, id: string): SequenceNode | null => {
        if (!tree) return null;
        if (tree.id === id) return tree;
        if (tree.children) {
          for (const child of tree.children) {
            const found = findNode(child, id);
            if (found) return found;
          }
        }
        return null;
      };

      const nodeToUpdate = findNode(sequenceTree, insertAfterNodeId);
      if (nodeToUpdate && sequenceTree) {
        const updatedTree = updateNodeInTree(sequenceTree, insertAfterNodeId, {
          data: { ...nodeToUpdate.data, message: messageForm.message, subject: messageForm.subject }
        });
        if (updatedTree) setSequenceTree(updatedTree);
      }
      setSelectedNode(null);
    } else if (insertAfterNodeId || (selectedBranchNodeId && selectedBranchPath)) {
      // Adding new node
      const newNode: SequenceNode = {
        id: Date.now().toString(),
        type: currentAction,
        label: availableActions.find(a => a.type === currentAction)?.label || currentAction,
        data: {
          message: messageForm.message,
          subject: messageForm.subject
        },
        position: { x: 0, y: 0 }
      };

      // Check if adding to branch
      if (selectedBranchNodeId && selectedBranchPath) {
        setSequenceTree(insertNodeToBranch(sequenceTree, selectedBranchNodeId, newNode, selectedBranchPath));
        setSelectedBranchNodeId(null);
        setSelectedBranchPath(null);
      } else if (insertAfterNodeId) {
        setSequenceTree(insertNodeAfter(sequenceTree, insertAfterNodeId, newNode));
      }
    }
    
    setMessageForm({ message: '', subject: '', personalizationVars: messageForm.personalizationVars });
    setShowMessageDialog(false);
    setInsertAfterNodeId(null);
    setCurrentAction(null);
    setShowAddActionMenu(false);
  };

  const handleSaveDelay = () => {
    if (!insertAfterNodeId && !selectedBranchNodeId) return;

    const newNode: SequenceNode = {
      id: Date.now().toString(),
      type: 'delay',
      label: `${delayForm.value} ${delayForm.unit}`,
      data: {
        delay: delayForm.value,
        delayUnit: delayForm.unit
      },
      position: { x: 0, y: 0 }
    };

    // Check if adding to branch
    if (selectedBranchNodeId && selectedBranchPath) {
      setSequenceTree(insertNodeToBranch(sequenceTree, selectedBranchNodeId, newNode, selectedBranchPath));
      setSelectedBranchNodeId(null);
      setSelectedBranchPath(null);
    } else if (insertAfterNodeId) {
      setSequenceTree(insertNodeAfter(sequenceTree, insertAfterNodeId, newNode));
    }

    setShowDelayDialog(false);
    setInsertAfterNodeId(null);
    setShowAddActionMenu(false);
  };

  const handleSaveCondition = () => {
    if (!insertAfterNodeId) return;

    const conditionLabel = availableConditions.find(c => c.type === conditionForm)?.label || 'Condition';

    // Create nodes for branches based on configuration
    const createBranchNode = (actionType: ActionType | 'delay' | 'none', message?: string, delay?: number): SequenceNode[] => {
      if (actionType === 'none') return [];
      
      if (actionType === 'delay') {
        return [{
          id: Date.now().toString() + '-delay-' + Math.random(),
          type: 'delay',
          label: `Wait ${delay || 3} days`,
          data: { delay: delay || 3, delayUnit: 'days' as 'days' },
          position: { x: 0, y: 0 }
        }];
      }
      
      return [{
        id: Date.now().toString() + '-action-' + Math.random(),
        type: actionType,
        label: availableActions.find(a => a.type === actionType)?.label || actionType,
        data: message ? { message } : {},
        position: { x: 0, y: 0 }
      }];
    };

    const newNode: SequenceNode = {
      id: Date.now().toString(),
      type: 'condition',
      label: conditionLabel,
      data: {
        conditionType: conditionForm,
        conditionLabel: conditionLabel
      },
      position: { x: 0, y: 0 },
      trueBranch: createBranchNode(branchConfig.trueBranchAction, branchConfig.trueMessage, branchConfig.trueDelay),
      falseBranch: createBranchNode(branchConfig.falseBranchAction, branchConfig.falseMessage, branchConfig.falseDelay)
    };

    setSequenceTree(insertNodeAfter(sequenceTree, insertAfterNodeId, newNode));
    setShowConditionDialog(false);
    setInsertAfterNodeId(null);
    setShowAddActionMenu(false);
    
    // Reset branch config
    setBranchConfig({
      trueBranchAction: 'none',
      falseBranchAction: 'none'
    });

    // Check if it's the "if user acknowledges" condition
    if (conditionForm === 'if_user_acknowledges') {
      setPendingAcknowledgeNode(newNode.id);
      setShowWorkflowDecision(true);
    }
  };

  const handleEditNode = (nodeId: string, node: SequenceNode | null) => {
    if (!node) return;
    setSelectedNode(nodeId);
    if (node.type === 'message' || node.type === 'inmail' || node.type === 'send_email') {
      setCurrentAction(node.type);
      setMessageForm({
        message: node.data.message || '',
        subject: node.data.subject || '',
        personalizationVars: messageForm.personalizationVars
      });
      setInsertAfterNodeId(nodeId);
      setShowMessageDialog(true);
    } else if (node.type === 'delay') {
      setDelayForm({
        value: node.data.delay || 5,
        unit: node.data.delayUnit || 'days'
      });
      setInsertAfterNodeId(nodeId);
      setShowDelayDialog(true);
    }
  };

  const handleDeleteNode = (nodeId: string) => {
    if (!sequenceTree) return;
    const result = deleteNodeFromTree(sequenceTree, nodeId);
    if (result) {
      setSequenceTree(result);
    }
  };

  const insertVariable = (variable: string) => {
    const formatted = `{{${variable.toLowerCase().replace(' ', '_')}}}`;
    setMessageForm({
      ...messageForm,
      message: messageForm.message + formatted
    });
  };

  const handleWorkflowDecision = (decision: 'build' | 'manual' | 'later') => {
    setWorkflowDecision(decision);
    setShowWorkflowDecision(false);
    
    // Add notification based on decision
    const notificationId = Date.now().toString();
    let message = '';
    if (decision === 'build') {
      message = '✨ Great! You can now build the acknowledgment workflow by adding steps to the "Accepted" path.';
    } else if (decision === 'manual') {
      message = '📝 Noted! You\'ll handle responses manually when users acknowledge.';
    } else {
      message = '⏰ No problem! You can configure the acknowledgment workflow later.';
    }
    
    setNotifications([...notifications, { id: notificationId, message, type: 'info' }]);
    
    // Auto-dismiss notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    }, 5000);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const renderNode = (node: SequenceNode, depth: number = 0): React.JSX.Element => {
    const Icon = getActionIcon(node.type);
    const isDelay = node.type === 'delay';
    const isCondition = node.type === 'condition';
    const isEnd = node.type === 'end';

    return (
      <div key={node.id} className="flex flex-col items-center relative">
        {/* Node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="relative group"
        >
          {isDelay ? (
            <div className="flex flex-col items-center relative">
              <div
                onClick={() => handleEditNode(node.id, node)}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white flex items-center gap-2 shadow-lg hover:shadow-xl transition-all relative cursor-pointer"
              >
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">{node.label}</span>
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNode(node.id);
                    }}
                    className="p-1 rounded-full bg-red-500 hover:bg-red-600"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ) : isCondition ? (
            <div className="flex flex-col items-center relative">
              <div className="relative">
                <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-semibold shadow-lg border-2 border-orange-400/50 flex items-center gap-2">
                  <GitBranch className="w-5 h-5" />
                  <span>{node.data.conditionLabel || node.label}</span>
                </div>
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNode(node.id);
                    }}
                    className="p-1.5 rounded-full bg-red-500 hover:bg-red-600 shadow-lg"
                  >
                    <X className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">Decision Point</p>
            </div>
          ) : isEnd ? (
            <div className="flex flex-col items-center">
              <div className="px-6 py-3 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 text-white flex items-center gap-2 shadow-lg border-2 border-gray-500">
                <StopCircle className="w-4 h-4" />
                <span className="text-sm font-medium">End of sequence</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Wait until responded</p>
            </div>
          ) : (
            <div
              onClick={() => handleEditNode(node.id, node)}
              className="group/btn relative cursor-pointer"
            >
              <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white flex items-center gap-3 shadow-lg border border-slate-600 hover:border-slate-500 transition-all min-w-[200px]">
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{node.label}</span>
              </div>
              {(node.type === 'message' || node.type === 'inmail') && node.data.message && (
                <div className="absolute -bottom-2 -right-2 pointer-events-none">
                  <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-slate-900 flex items-center justify-center">
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              )}
              {/* View Prospects Icon */}
              <div className="absolute -top-2 -left-2 opacity-0 group-hover/btn:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNodeForProspects(node.id);
                    setShowProspectView(true);
                  }}
                  className="p-1.5 rounded-full bg-cyan-500 hover:bg-cyan-600 shadow-lg"
                  title="View Prospects"
                >
                  <Users className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              {/* Delete Icon */}
              <div className="absolute -top-2 -right-2 opacity-0 group-hover/btn:opacity-100 transition-opacity flex gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNode(node.id);
                  }}
                  className="p-1 rounded-full bg-red-500 hover:bg-red-600"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Add button with arrow */}
        {!isEnd && (
          <div className="relative flex flex-col items-center">
            <div className="w-1 h-4 bg-gradient-to-b from-slate-400 via-slate-500 to-slate-600 shadow-[0_0_8px_rgba(148,163,184,0.5)]"></div>
            <div className="relative">
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center"
              >
                <ChevronDown className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]" />
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.2 }}
                onClick={() => {
                  setInsertAfterNodeId(node.id);
                  setShowAddActionMenu(true);
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg opacity-0 hover:opacity-100 transition-opacity group-hover:opacity-100 z-10"
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>
            <div className="w-1 h-4 bg-gradient-to-b from-slate-600 to-slate-700"></div>
          </div>
        )}

        {/* Children or Branches */}
        {isCondition && (node.trueBranch || node.falseBranch) ? (
          <>
            {/* Connecting lines from condition to branches */}
            <div className="flex flex-col items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-slate-500 to-slate-600"></div>
              <div className="relative w-48 h-12">
                {/* Left diagonal line to TRUE */}
                <svg className="absolute top-0 left-0 w-full h-full" style={{ overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#64748b', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#22c55e', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <line 
                    x1="50%" 
                    y1="0" 
                    x2="0%" 
                    y2="100%" 
                    stroke="url(#greenGradient)" 
                    strokeWidth="2"
                    className="drop-shadow-[0_0_4px_rgba(34,197,94,0.3)]"
                  />
                </svg>
                {/* Right diagonal line to FALSE */}
                <svg className="absolute top-0 left-0 w-full h-full" style={{ overflow: 'visible' }}>
                  <defs>
                    <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#64748b', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <line 
                    x1="50%" 
                    y1="0" 
                    x2="100%" 
                    y2="100%" 
                    stroke="url(#redGradient)" 
                    strokeWidth="2"
                    className="drop-shadow-[0_0_4px_rgba(239,68,68,0.3)]"
                  />
                </svg>
              </div>
            </div>

            <div className="flex gap-24 relative">
              {/* True Branch */}
              <div className="flex-1 flex flex-col items-center relative">
                <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/50 text-green-400 text-xs font-semibold flex items-center gap-1 mb-2">
                  <CheckCircle className="w-3 h-3" />
                  TRUE / YES
                </div>
                <div className="flex flex-col items-center mb-2">
                  <motion.div
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronDown className="w-5 h-5 text-green-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                  </motion.div>
                  <div className="w-1 h-3 bg-gradient-to-b from-green-500 to-green-600"></div>
                </div>
              {node.trueBranch && node.trueBranch.length > 0 ? (
                node.trueBranch.map(child => renderNode(child, depth + 1))
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setSelectedBranchNodeId(node.id);
                    setSelectedBranchPath('true');
                    setShowAddActionMenu(true);
                  }}
                  className="px-6 py-3 rounded-xl border-2 border-dashed border-green-500/30 bg-green-500/5 hover:bg-green-500/10 text-green-400 flex items-center gap-2 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Add Action for TRUE path</span>
                </motion.button>
              )}
            </div>

              {/* False Branch */}
              <div className="flex-1 flex flex-col items-center relative">
                <div className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/50 text-red-400 text-xs font-semibold flex items-center gap-1 mb-2">
                  <XCircle className="w-3 h-3" />
                  FALSE / NO
                </div>
                <div className="flex flex-col items-center mb-2">
                  <motion.div
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ChevronDown className="w-5 h-5 text-red-400 drop-shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
                  </motion.div>
                  <div className="w-1 h-3 bg-gradient-to-b from-red-500 to-red-600"></div>
                </div>
              {node.falseBranch && node.falseBranch.length > 0 ? (
                node.falseBranch.map(child => renderNode(child, depth + 1))
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setSelectedBranchNodeId(node.id);
                    setSelectedBranchPath('false');
                    setShowAddActionMenu(true);
                  }}
                  className="px-6 py-3 rounded-xl border-2 border-dashed border-red-500/30 bg-red-500/5 hover:bg-red-500/10 text-red-400 flex items-center gap-2 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Add Action for FALSE path</span>
                </motion.button>
              )}
              </div>
            </div>
          </>
        ) : node.children && node.children.length > 0 && (
          <div className="flex flex-col items-center">
            {node.children.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <ChatAssistant />
      
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="bg-slate-800 border border-white/20 rounded-xl p-4 shadow-2xl backdrop-blur-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-sm text-white">{notification.message}</p>
                </div>
                <button
                  onClick={() => dismissNotification(notification.id)}
                  className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Audience Selection Dialog */}
      <Dialog open={showAudienceSelector} onOpenChange={setShowAudienceSelector}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white mb-2">
              Create New Campaign
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-base">
              Name your campaign and select your target audience
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Campaign Name */}
            <div>
              <Label className="text-gray-300 mb-2 block font-medium">Campaign Name *</Label>
              <Input
                value={tempCampaignName}
                onChange={(e) => setTempCampaignName(e.target.value)}
                placeholder="e.g., Q1 2024 Tech Founders Outreach"
                className="w-full bg-slate-800/50 border-white/10 text-white h-12 text-base"
              />
              <p className="text-xs text-gray-500 mt-1.5">
                Choose a descriptive name to help you identify this campaign later
              </p>
            </div>

            {/* Target Audience */}
            <div>
              <Label className="text-gray-300 mb-2 block font-medium">Target Audience *</Label>
              <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                <SelectTrigger className="w-full bg-slate-800/50 border-white/10 text-white h-12 text-base">
                  <SelectValue placeholder="Select a target group..." />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/10">
                  {audienceGroups.map((group) => (
                    <SelectItem key={group.value} value={group.value} className="text-white hover:bg-slate-700">
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium">{group.label}</span>
                        <Badge className="ml-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                          {group.count} prospects
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedAudience && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30"
              >
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-cyan-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      {audienceGroups.find(g => g.value === selectedAudience)?.label}
                    </p>
                    <p className="text-xs text-gray-400">
                      Your campaign will be sent to {audienceGroups.find(g => g.value === selectedAudience)?.count} prospects in this group
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleContinueToChoice}
                disabled={!selectedAudience || !tempCampaignName.trim()}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed h-12 text-base font-semibold"
              >
                Continue to Workflow Setup
                <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Initial Choice Dialog */}
      <Dialog open={showStartChoice} onOpenChange={(open) => {
        setShowStartChoice(open);
        if (!open && !sequenceTree) {
          // If closing without selection, go back to audience selector
          setShowAudienceSelector(true);
        }
      }}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white mb-2">
              Create Your Outreach Sequence
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-base">
              Choose how you'd like to start building your campaign
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6 mt-6">
            {/* Start with Template */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={handleStartWithTemplate}
              className="relative p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border-2 border-cyan-500/30 hover:border-cyan-500/50 cursor-pointer transition-all group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Start with Template</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Begin with a pre-built workflow and customize it to your needs
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span>Pre-configured LinkedIn sequence</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span>Best practices included</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span>Easy to customize</span>
                  </div>
                </div>
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                  Recommended
                </Badge>
              </div>
            </motion.div>

            {/* Start from Scratch */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={handleStartFromScratch}
              className="relative p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-600/10 border-2 border-purple-500/30 hover:border-purple-500/50 cursor-pointer transition-all group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Start from Scratch</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Build your workflow from the ground up with complete freedom
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <span>Blank canvas</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <span>Full creative control</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="w-4 h-4 text-purple-400" />
                    <span>Advanced users</span>
                  </div>
                </div>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  Advanced
                </Badge>
              </div>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/outreach">
                <motion.button
                  whileHover={{ x: -5 }}
                  className="p-2 rounded-lg hover:bg-white/5"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </motion.button>
              </Link>
              <div>
                {isEditingName ? (
                  <Input
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    onKeyPress={(e) => e.key === 'Enter' && setIsEditingName(false)}
                    className="bg-slate-800/50 border-cyan-500/50 text-white font-bold"
                    autoFocus
                  />
                ) : (
                  <h1 
                    className="text-xl font-bold text-white cursor-pointer hover:text-cyan-400 transition-colors"
                    onClick={() => setIsEditingName(true)}
                  >
                    {campaignName}
                  </h1>
                )}
                <p className="text-xs text-gray-500">Dec 3, 2025</p>
              </div>
            </div>

              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowPreview(true)}
                  disabled={!sequenceTree}
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                  <Play className="w-4 h-4 mr-2" />
                  Launch Campaign
                </Button>
              </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <Tabs value={viewMode} onValueChange={(val) => setViewMode(val as any)} className="space-y-6">
          <TabsList className="bg-slate-800/50 backdrop-blur-xl border border-white/10">
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="sequence" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600">
              Sequence
            </TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Statistics View */}
          <TabsContent value="statistics">
            <div className="space-y-6">
              <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Acceptance rate</span>
                      <span className="text-sm font-medium text-white">0%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Response rate</span>
                      <span className="text-sm font-medium text-white">0%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-7 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                      <CardContent className="p-4 text-center">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} w-fit mx-auto mb-2`}>
                          <stat.icon className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-xs text-gray-400 uppercase mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Sequence View */}
            <TabsContent value="sequence">
              <div className="relative">
                <div className="bg-slate-900/30 rounded-2xl border border-white/10 p-12 min-h-[800px] overflow-x-auto">
                  <div className="flex justify-center">
                    {sequenceTree ? renderNode(sequenceTree) : (
                      <div className="flex items-center justify-center h-[600px]">
                        <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl max-w-md">
                          <CardContent className="p-12 text-center">
                            <div className="p-4 rounded-full bg-cyan-500/10 w-fit mx-auto mb-4">
                              <Users className="w-12 h-12 text-cyan-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">No Sequence Generated Yet</h3>
                            <p className="text-gray-400 mb-6">
                              Start by selecting your audience and outreach type in the Audience tab. 
                              Then generate a sequence template to begin editing.
                            </p>
                            <Button
                              onClick={() => setViewMode('audience')}
                              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                            >
                              <Users className="w-4 h-4 mr-2" />
                              Go to Audience
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

          {/* Audience Tab */}
          <TabsContent value="audience">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Campaign Audience</h2>
                  <p className="text-gray-400">Select groups to include in this outreach campaign</p>
                </div>
                <Button
                  onClick={() => setShowCreateGroup(true)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Group
                </Button>
              </div>

              {/* Outreach Type Selection */}
              <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    Select Outreach Type
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Single Channel Option */}
                    <div 
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        outreachType === 'single' 
                          ? 'border-cyan-500 bg-cyan-500/10' 
                          : 'border-white/10 bg-slate-800/50 hover:border-white/20'
                      }`}
                      onClick={() => setOutreachType('single')}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          checked={outreachType === 'single'}
                          onChange={() => setOutreachType('single')}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="text-white font-semibold mb-1 flex items-center gap-2">
                            Single Channel
                            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">
                              Focused
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400 mb-3">Focus on one channel for targeted outreach</p>
                          
                          {outreachType === 'single' && (
                            <div className="mt-3 space-y-2 pl-6">
                              <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                  type="radio"
                                  name="singleChannel"
                                  checked={singleChannelType === 'email'}
                                  onChange={() => setSingleChannelType('email')}
                                  className="text-cyan-500"
                                />
                                <Mail className="w-4 h-4 text-gray-400 group-hover:text-cyan-400" />
                                <span className="text-white">Email Only</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                  type="radio"
                                  name="singleChannel"
                                  checked={singleChannelType === 'linkedin'}
                                  onChange={() => setSingleChannelType('linkedin')}
                                  className="text-cyan-500"
                                />
                                <LinkIcon className="w-4 h-4 text-gray-400 group-hover:text-cyan-400" />
                                <span className="text-white">LinkedIn Only</span>
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Multichannel Option */}
                    <div 
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        outreachType === 'multichannel' 
                          ? 'border-cyan-500 bg-cyan-500/10' 
                          : 'border-white/10 bg-slate-800/50 hover:border-white/20'
                      }`}
                      onClick={() => setOutreachType('multichannel')}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          checked={outreachType === 'multichannel'}
                          onChange={() => setOutreachType('multichannel')}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="text-white font-semibold mb-1 flex items-center gap-2">
                            Multichannel
                            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                              Maximum Reach
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400 mb-3">Combine Email + LinkedIn for maximum impact</p>
                          
                          {outreachType === 'multichannel' && (
                            <div className="mt-3 pl-6 flex items-center gap-2 text-sm text-gray-300">
                              <Mail className="w-4 h-4 text-cyan-400" />
                              <span>+</span>
                              <LinkIcon className="w-4 h-4 text-blue-400" />
                              <span className="text-xs text-gray-400">Both channels</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-cyan-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-300 font-medium mb-1">
                          Template will be generated based on your selection
                        </p>
                        <p className="text-xs text-gray-400">
                          {outreachType === 'single' 
                            ? `A ${singleChannelType} sequence template will be created with follow-ups and best practices`
                            : 'A multichannel sequence combining LinkedIn and Email touchpoints will be created'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Summary Card */}
              {groups.filter(g => g.selected).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-xl p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-cyan-500/20">
                      <Users className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">
                        {groups.filter(g => g.selected).length} Groups Selected
                      </h3>
                      <p className="text-sm text-gray-300">
                        Total audience: {groups.filter(g => g.selected).reduce((sum, g) => sum + g.prospectCount, 0)} prospects
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setGroups(groups.map(g => ({ ...g, selected: false })))}
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        Clear All
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          // Check if multichannel - show filter dialog
                          if (outreachType === 'multichannel') {
                            const total = groups.filter(g => g.selected).reduce((sum, g) => sum + g.prospectCount, 0);
                            // Simulate: 2/3 have both email and linkedin
                            const complete = Math.floor(total * 0.67);
                            const incomplete = total - complete;
                            setTotalProspects(total);
                            setCompleteProspects(complete);
                            setIncompleteProspects(incomplete);
                            setShowMultichannelFilterDialog(true);
                          } else {
                            // Single channel - generate directly
                            if (singleChannelType === 'email') {
                              setSequenceTree(getDefaultEmailTemplate());
                            } else {
                              setSequenceTree(getDefaultLinkedInTemplate());
                            }
                            // Switch to sequence tab
                            setViewMode('sequence');
                            // Show notification
                            const notificationId = Date.now().toString();
                            const templateType = singleChannelType === 'email' ? 'Email' : 'LinkedIn';
                            setNotifications([...notifications, {
                              id: notificationId,
                              message: `✨ ${templateType} sequence template created! You can now edit it.`,
                              type: 'success'
                            }]);
                            setTimeout(() => {
                              setNotifications(prev => prev.filter(n => n.id !== notificationId));
                            }, 5000);
                          }
                        }}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Generate Sequence
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Helper message when no groups selected */}
              {groups.filter(g => g.selected).length === 0 && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-white mb-1">💡 Get Started</p>
                      <p className="text-xs text-gray-400">
                        Select one or more groups below to define your campaign audience. Once selected, click "Start Workflow" to begin building your outreach sequence.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Filter */}
              <div className="flex items-center gap-3">
                <Label className="text-gray-300">Filter by offering:</Label>
                <Select value={selectedOfferingFilter} onValueChange={setSelectedOfferingFilter}>
                  <SelectTrigger className="w-[220px] bg-slate-800/50 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/10">
                    <SelectItem value="all">All Offerings</SelectItem>
                    <SelectItem value="enterprise">Enterprise Solutions</SelectItem>
                    <SelectItem value="saas">SaaS Products</SelectItem>
                    <SelectItem value="consulting">Consulting Services</SelectItem>
                  </SelectContent>
                </Select>
                <Badge variant="outline" className="ml-2 border-white/20 text-gray-300">
                  {groups.filter(g => selectedOfferingFilter === 'all' || g.offering === selectedOfferingFilter).length} groups
                </Badge>
              </div>

              {/* Groups Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groups
                  .filter(g => selectedOfferingFilter === 'all' || g.offering === selectedOfferingFilter)
                  .map(group => (
                    <motion.div
                      key={group.id}
                      whileHover={{ scale: 1.02 }}
                      className={`relative rounded-xl border-2 transition-all cursor-pointer ${
                        group.selected
                          ? 'border-cyan-500 bg-cyan-500/10'
                          : 'border-white/10 bg-slate-800/30 hover:border-white/20 hover:bg-slate-800/50'
                      }`}
                      onClick={() => {
                        if (!group.selected) {
                          // First click: select the group
                          setGroups(groups.map(g => 
                            g.id === group.id ? { ...g, selected: true } : g
                          ));
                        } else {
                          // Second click: go to sequence and show modal
                          setViewMode('sequence');
                          setTimeout(() => {
                            setShowStartChoice(true);
                          }, 300);
                        }
                      }}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`p-2 rounded-lg ${
                              group.selected
                                ? 'bg-cyan-500/20'
                                : 'bg-slate-700/50'
                            }`}>
                              <Users className={`w-5 h-5 ${
                                group.selected ? 'text-cyan-400' : 'text-gray-400'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-white">{group.name}</h3>
                                {group.selected && (
                                  <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">
                                    Selected
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-400 line-clamp-2">{group.description}</p>
                              {group.selected && (
                                <motion.p
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="text-xs text-cyan-400 mt-2 flex items-center gap-1"
                                >
                                  <Play className="w-3 h-3" />
                                  Click again to start workflow
                                </motion.p>
                              )}
                            </div>
                          </div>
                          {group.selected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="p-1 rounded-full bg-cyan-500"
                            >
                              <CheckCircle className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-white/10">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium text-white">{group.prospectCount}</span>
                              <span className="text-xs text-gray-500">prospects</span>
                            </div>
                            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                              {group.offering === 'enterprise' ? 'Enterprise' : group.offering === 'saas' ? 'SaaS' : 'Consulting'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-gray-400 hover:text-white hover:bg-white/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Deselect
                                setGroups(groups.map(g => 
                                  g.id === group.id ? { ...g, selected: false } : g
                                ));
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>

              {/* Empty State */}
              {groups.filter(g => selectedOfferingFilter === 'all' || g.offering === selectedOfferingFilter).length === 0 && (
                <Card className="border-white/10 bg-slate-900/50">
                  <CardContent className="p-12 text-center">
                    <Users className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                    <h3 className="text-xl font-semibold text-white mb-2">No Groups Found</h3>
                    <p className="text-gray-400 mb-4">
                      {selectedOfferingFilter === 'all' 
                        ? 'Create your first group to get started'
                        : 'No groups found for this offering'}
                    </p>
                    <Button
                      onClick={() => setShowCreateGroup(true)}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Group
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Campaign Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Campaign Basics */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">Campaign Name</h3>
                    <p className="text-xs text-gray-500 mb-3">Give your campaign a memorable name to easily identify it later</p>
                  </div>
                  <Input
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    placeholder="e.g., Q1 Enterprise Outreach Campaign"
                    className="bg-slate-800/50 border-white/10 text-white text-base h-11"
                  />
                </div>

                {/* Campaign Description */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">Campaign Description</h3>
                    <p className="text-xs text-gray-500 mb-3">Add notes or details about this campaign</p>
                  </div>
                  <Textarea
                    value={campaignDescription}
                    onChange={(e) => setCampaignDescription(e.target.value)}
                    placeholder="Describe the purpose, goals, or any important details about this campaign..."
                    className="bg-slate-800/50 border-white/10 text-white min-h-[100px]"
                    rows={4}
                  />
                </div>

                {/* Outreach Configuration - View Only */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">Outreach Channels</h3>
                    <p className="text-xs text-gray-500 mb-3">Campaign channel configuration (set during creation)</p>
                  </div>
                  <div className="p-4 bg-slate-800/30 rounded-lg border border-white/10">
                    <div className="flex items-center gap-3">
                      {outreachType === 'single' ? (
                        <>
                          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                            {singleChannelType === 'email' ? 'Email' : 'LinkedIn'} Template
                          </Badge>
                          <span className="text-gray-300 text-sm">Single Channel</span>
                        </>
                      ) : (
                        <>
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                            Multichannel Template
                          </Badge>
                          <span className="text-gray-300 text-sm">Email + LinkedIn</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {outreachType === 'single' 
                        ? `This campaign uses a ${singleChannelType} sequence template`
                        : 'This campaign combines Email and LinkedIn touchpoints'}
                    </p>
                  </div>
                </div>

                {/* Groups Included - View Only */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">Target Groups</h3>
                    <p className="text-xs text-gray-500 mb-3">Prospect groups included in this campaign</p>
                  </div>
                  <div className="p-4 bg-slate-800/30 rounded-lg border border-white/10">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-cyan-400" />
                      <div>
                        <p className="text-white font-semibold">
                          {groups.filter(g => g.selected).length} {groups.filter(g => g.selected).length === 1 ? 'Group' : 'Groups'} Included
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {groups.filter(g => g.selected).reduce((sum, g) => sum + g.prospectCount, 0)} total prospects
                        </p>
                      </div>
                    </div>
                    {groups.filter(g => g.selected).length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <div className="space-y-2">
                          {groups.filter(g => g.selected).map((group) => (
                            <div key={group.id} className="flex items-center justify-between text-sm">
                              <span className="text-gray-300">{group.name}</span>
                              <Badge variant="secondary" className="bg-slate-700/50 text-gray-300 border-slate-600/50">
                                {group.prospectCount} prospects
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sequence Summary */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">Sequence Overview</h3>
                    <p className="text-xs text-gray-500 mb-4">Quick stats about your outreach sequence</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-4 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-lg border border-cyan-500/20 text-center">
                      <Sparkles className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
                      <p className="text-2xl font-bold text-white mb-1">
                        {sequenceTree ? countNodes(sequenceTree) - countNodes(sequenceTree, 'end') : 0}
                      </p>
                      <p className="text-xs text-gray-400">Actions</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-lg border border-blue-500/20 text-center">
                      <Clock className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                      <p className="text-2xl font-bold text-white mb-1">
                        {sequenceTree ? countNodes(sequenceTree, 'delay') : 0}
                      </p>
                      <p className="text-xs text-gray-400">Delays</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-lg border border-purple-500/20 text-center">
                      <GitBranch className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                      <p className="text-2xl font-bold text-white mb-1">
                        {sequenceTree ? countNodes(sequenceTree, 'condition') : 0}
                      </p>
                      <p className="text-xs text-gray-400">Branches</p>
                    </div>
                  </div>
                </div>

                {/* Sending Limits */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">Sending Limits</h3>
                    <p className="text-xs text-gray-500 mb-4">Set daily limits to control outreach volume and maintain account health</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-300">Daily LinkedIn Invite Limit</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={dailyLinkedInInviteLimit}
                          onChange={(e) => setDailyLinkedInInviteLimit(parseInt(e.target.value) || 0)}
                          min="0"
                          className="bg-slate-800/50 border-white/10 text-white"
                        />
                        <span className="text-gray-400 text-sm">invites/day</span>
                      </div>
                      <p className="text-xs text-gray-500">Maximum LinkedIn connection requests per day</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-300">Daily Email Send Limit</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={dailyEmailSendLimit}
                          onChange={(e) => setDailyEmailSendLimit(parseInt(e.target.value) || 0)}
                          min="0"
                          className="bg-slate-800/50 border-white/10 text-white"
                        />
                        <span className="text-gray-400 text-sm">emails/day</span>
                      </div>
                      <p className="text-xs text-gray-500">Maximum emails to send per day</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-300">Daily LinkedIn DM Limit</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={dailyLinkedInDmLimit}
                          onChange={(e) => setDailyLinkedInDmLimit(parseInt(e.target.value) || 0)}
                          min="0"
                          className="bg-slate-800/50 border-white/10 text-white"
                        />
                        <span className="text-gray-400 text-sm">messages/day</span>
                      </div>
                      <p className="text-xs text-gray-500">Maximum LinkedIn direct messages per day</p>
                    </div>
                  </div>
                </div>

                {/* Sending Schedule */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      Sending Schedule
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">Control when your campaign sends messages to prospects</p>
                  </div>
                  
                  {/* Day-wise toggles */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-300">Active Days</Label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const allEnabled = Object.values(enabledDays).every(v => v);
                            setEnabledDays({
                              monday: !allEnabled,
                              tuesday: !allEnabled,
                              wednesday: !allEnabled,
                              thursday: !allEnabled,
                              friday: !allEnabled,
                              saturday: !allEnabled,
                              sunday: !allEnabled
                            });
                          }}
                          className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          {Object.values(enabledDays).every(v => v) ? 'Deselect All' : 'Select All'}
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {[
                        { key: 'monday', label: 'Mon', full: 'Monday' },
                        { key: 'tuesday', label: 'Tue', full: 'Tuesday' },
                        { key: 'wednesday', label: 'Wed', full: 'Wednesday' },
                        { key: 'thursday', label: 'Thu', full: 'Thursday' },
                        { key: 'friday', label: 'Fri', full: 'Friday' },
                        { key: 'saturday', label: 'Sat', full: 'Saturday' },
                        { key: 'sunday', label: 'Sun', full: 'Sunday' }
                      ].map((day) => (
                        <button
                          key={day.key}
                          onClick={() => {
                            setEnabledDays({ ...enabledDays, [day.key]: !enabledDays[day.key] });
                          }}
                          className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                            enabledDays[day.key]
                              ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                              : 'border-white/10 bg-slate-800/30 text-gray-400 hover:border-white/20 hover:bg-slate-800/50'
                          }`}
                          title={day.full}
                        >
                          <div className={`w-2 h-2 rounded-full ${
                            enabledDays[day.key] ? 'bg-cyan-400' : 'bg-gray-600'
                          }`} />
                          <span className="text-xs font-medium">{day.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time window */}
                  <div className="p-4 bg-slate-800/30 rounded-lg border border-white/10">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <Label className="text-sm font-medium text-gray-300">Sending Time Window</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-gray-400">From</Label>
                        <div className="relative">
                          <Input
                            type="time"
                            value={timeWindowStart}
                            onChange={(e) => setTimeWindowStart(e.target.value)}
                            className="bg-slate-700/50 border-white/10 text-white h-10 pr-10"
                          />
                          <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-gray-400">To</Label>
                        <div className="relative">
                          <Input
                            type="time"
                            value={timeWindowEnd}
                            onChange={(e) => setTimeWindowEnd(e.target.value)}
                            className="bg-slate-700/50 border-white/10 text-white h-10 pr-10"
                          />
                          <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      Messages will only be sent between {timeWindowStart} and {timeWindowEnd} on active days
                    </p>
                  </div>

                  {/* Timezone */}
                  <div className="p-4 bg-slate-800/30 rounded-lg border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <Globe className="w-4 h-4 text-purple-400" />
                      <Label className="text-sm font-medium text-gray-300">Timezone</Label>
                    </div>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger className="bg-slate-700/50 border-white/10 text-white h-10">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">🇺🇸 Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">🇺🇸 Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">🇺🇸 Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">🇺🇸 Pacific Time (PT)</SelectItem>
                        <SelectItem value="Europe/London">🇬🇧 London (GMT)</SelectItem>
                        <SelectItem value="Europe/Paris">🇫🇷 Paris (CET)</SelectItem>
                        <SelectItem value="Asia/Dubai">🇦🇪 Dubai (GST)</SelectItem>
                        <SelectItem value="Asia/Kolkata">🇮🇳 Mumbai (IST)</SelectItem>
                        <SelectItem value="Asia/Singapore">🇸🇬 Singapore (SGT)</SelectItem>
                        <SelectItem value="Asia/Tokyo">🇯🇵 Tokyo (JST)</SelectItem>
                        <SelectItem value="Australia/Sydney">🇦🇺 Sydney (AEST)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-3">
                      All times are calculated based on the selected timezone
                    </p>
                  </div>
                </div>

                {/* Campaign Actions */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-white">Campaign Controls</h3>
                    <Button
                      onClick={() => {
                        // Handle save logic here
                        const notificationId = Date.now().toString();
                        setNotifications([...notifications, {
                          id: notificationId,
                          message: 'Campaign settings saved successfully',
                          type: 'success'
                        }]);
                        setTimeout(() => {
                          setNotifications(prev => prev.filter(n => n.id !== notificationId));
                        }, 5000);
                      }}
                      size="sm"
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    >
                      <Save className="w-3.5 h-3.5 mr-1.5" />
                      Save
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {campaignStatus === 'active' ? (
                      <Button
                        onClick={() => setCampaignStatus('paused')}
                        variant="outline"
                        size="sm"
                        className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 hover:border-yellow-500"
                      >
                        <Pause className="w-3.5 h-3.5 mr-1.5" />
                        Pause
                      </Button>
                    ) : campaignStatus === 'paused' ? (
                      <Button
                        onClick={() => setCampaignStatus('active')}
                        variant="outline"
                        size="sm"
                        className="border-green-500/50 text-green-400 hover:bg-green-500/10 hover:border-green-500"
                      >
                        <Play className="w-3.5 h-3.5 mr-1.5" />
                        Resume
                      </Button>
                    ) : null}
                    
                    <Button
                      onClick={() => {
                        if (confirm('Are you sure you want to stop this campaign? This action cannot be undone.')) {
                          setCampaignStatus('stopped');
                        }
                      }}
                      variant="outline"
                      size="sm"
                      className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10 hover:border-orange-500"
                      disabled={campaignStatus === 'stopped'}
                    >
                      <StopCircle className="w-3.5 h-3.5 mr-1.5" />
                      Stop
                    </Button>
                    
                    <Button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
                          // Handle delete logic here
                          const notificationId = Date.now().toString();
                          setNotifications([...notifications, {
                            id: notificationId,
                            message: 'Campaign deleted successfully',
                            type: 'success'
                          }]);
                          setTimeout(() => {
                            setNotifications(prev => prev.filter(n => n.id !== notificationId));
                          }, 5000);
                        }
                      }}
                      variant="outline"
                      size="sm"
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Campaign Metadata - View Only */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div>
                    <h3 className="text-base font-semibold text-white mb-3">Campaign Information</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-800/30 rounded-lg border border-white/10">
                      <Label className="text-xs text-gray-500 mb-1 block">Created Date</Label>
                      <p className="text-white font-medium text-sm">
                        {createdDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-800/30 rounded-lg border border-white/10">
                      <Label className="text-xs text-gray-500 mb-1 block">Scheduled Date</Label>
                      <p className="text-white font-medium text-sm">
                        {scheduledDate 
                          ? new Date(scheduledDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : 'Not scheduled'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Action Menu Dialog */}
      <Dialog open={showAddActionMenu} onOpenChange={setShowAddActionMenu}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Add Step</DialogTitle>
            <DialogDescription className="text-gray-400">Choose what to add to your sequence</DialogDescription>
          </DialogHeader>

          <div className="space-y-2 mt-4">
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-400 mb-2">ACTIONS</p>
              {availableActions.map((action) => (
                <button
                  key={action.type}
                  onClick={() => handleAddAction(action.type, insertAfterNodeId!)}
                  className="w-full p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-white/10 hover:border-cyan-500/50 transition-all text-left mb-2"
                >
                  <div className="flex items-center gap-3">
                    <action.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-white">{action.label}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium text-gray-400 mb-2">FLOW CONTROL</p>
              <button
                onClick={() => handleAddDelay(insertAfterNodeId!)}
                className="w-full p-3 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-500/50 transition-all text-left mb-2"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-white">Add Delay</span>
                </div>
              </button>
              <button
                onClick={() => handleAddCondition(insertAfterNodeId!)}
                className="w-full p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <GitBranch className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-white">Add Condition (Branch)</span>
                </div>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              {currentAction === 'inmail' ? 'Input your InMail message' : currentAction === 'send_email' ? 'Input your Email' : 'Input your LinkedIn message'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="flex gap-2 border-b border-white/10 pb-4">
              <Button variant="default" size="sm" className="bg-purple-500 text-white">
                Primary message
              </Button>
              <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white">
                Alternative message (optional)
              </Button>
            </div>

            <div className="flex gap-2 flex-wrap">
              {messageForm.personalizationVars.map((variable) => (
                <button
                  key={variable}
                  onClick={() => insertVariable(variable)}
                  className="px-3 py-1 rounded-lg border-2 border-dashed border-purple-500/50 text-purple-400 text-sm hover:bg-purple-500/10 transition-colors"
                >
                  {variable}
                </button>
              ))}
              <button className="px-3 py-1 rounded-lg border-2 border-dashed border-white/20 text-gray-400 text-sm hover:bg-white/5 transition-colors flex items-center gap-1">
                More
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {(currentAction === 'inmail' || currentAction === 'send_email') && (
              <div>
                <Label className="text-gray-300 mb-2 block">Subject {currentAction === 'inmail' ? '(optional)' : ''} *</Label>
                <Input
                  value={messageForm.subject}
                  onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
                  placeholder="Subject"
                  className="bg-slate-800/50 border-purple-500/50 text-white focus:border-purple-500"
                />
              </div>
            )}

            <div>
              <Textarea
                value={messageForm.message}
                onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                placeholder="Write your message here..."
                className="bg-slate-800/50 border-white/10 text-white min-h-[200px] focus:border-purple-500"
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-500">
                  {messageForm.message.length} / {currentAction === 'inmail' ? 1896 : 4994}
                </p>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <LinkIcon className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <Sparkles className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <Settings className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {currentAction === 'inmail' && (
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                <p className="text-xs text-cyan-400">
                  InMails will be sent to Open Profiles only, therefore profiles that don't meet this criteria will be skipped. No InMail credits will be used with this feature. Learn more
                </p>
              </div>
            )}

            <div className="flex gap-3 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowMessageDialog(false);
                  setMessageForm({ message: '', subject: '', personalizationVars: messageForm.personalizationVars });
                }}
                className="bg-white/5 border-white/10 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveMessage}
                className="bg-gradient-to-r from-purple-500 to-purple-600"
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delay Dialog */}
      <Dialog open={showDelayDialog} onOpenChange={setShowDelayDialog}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">Delay before the next action:</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="flex gap-3">
              <Input
                type="number"
                value={delayForm.value}
                onChange={(e) => setDelayForm({ ...delayForm, value: parseInt(e.target.value) || 0 })}
                className="bg-slate-800/50 border-purple-500/50 text-white text-center text-2xl font-bold"
              />
              <Button
                variant={delayForm.unit === 'days' ? 'default' : 'outline'}
                onClick={() => setDelayForm({ ...delayForm, unit: 'days' })}
                className={delayForm.unit === 'days' ? 'bg-purple-500' : 'bg-white/5 border-white/10 text-white'}
              >
                Days
              </Button>
              <Button
                variant={delayForm.unit === 'hours' ? 'default' : 'outline'}
                onClick={() => setDelayForm({ ...delayForm, unit: 'hours' })}
                className={delayForm.unit === 'hours' ? 'bg-purple-500' : 'bg-white/5 border-white/10 text-white'}
              >
                Hours
              </Button>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSaveDelay}
                className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600"
              >
                Apply
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDelayDialog(false)}
                className="bg-white/5 border-white/10 text-white"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Condition Dialog with Branch Configuration */}
      <Dialog open={showConditionDialog} onOpenChange={setShowConditionDialog}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl flex items-center gap-2">
              <GitBranch className="w-6 h-6 text-orange-400" />
              Add Condition & Define Branches
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Select a condition and configure what happens in each scenario
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Condition Selection */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Select Condition Type</h3>
              <div className="grid grid-cols-2 gap-3">
                {availableConditions.map((condition) => (
                  <button
                    key={condition.type}
                    onClick={() => setConditionForm(condition.type)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      conditionForm === condition.type
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-white/10 bg-slate-800/50 hover:border-orange-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <condition.icon className={`w-4 h-4 ${conditionForm === condition.type ? 'text-orange-400' : 'text-gray-400'}`} />
                      <span className="text-xs font-medium text-white">{condition.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Branch Configuration */}
            <div className="grid grid-cols-2 gap-4">
              {/* TRUE Branch */}
              <div className="p-4 rounded-xl border-2 border-green-500/30 bg-green-500/5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <h3 className="text-sm font-bold text-green-400">TRUE / YES Path</h3>
                </div>
                <p className="text-xs text-gray-400 mb-3">What happens if condition is met?</p>
                
                <div className="space-y-2">
                  <Label className="text-xs text-gray-300">Next Action</Label>
                  <Select 
                    value={branchConfig.trueBranchAction} 
                    onValueChange={(val) => setBranchConfig({...branchConfig, trueBranchAction: val as any})}
                  >
                    <SelectTrigger className="bg-slate-800/50 border-green-500/30 text-white text-xs">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No action (add later)</SelectItem>
                      <SelectItem value="send_invite">Send LinkedIn Invite</SelectItem>
                      <SelectItem value="send_invite_with_note">Send LinkedIn Invite with note</SelectItem>
                      <SelectItem value="message">LinkedIn Message</SelectItem>
                      <SelectItem value="inmail">InMail</SelectItem>
                      <SelectItem value="follow">Follow Profile</SelectItem>
                      <SelectItem value="send_email">Send Email</SelectItem>
                      <SelectItem value="withdraw_invite">Withdraw Invite</SelectItem>
                      <SelectItem value="delay">Add Delay</SelectItem>
                    </SelectContent>
                  </Select>

                  {(branchConfig.trueBranchAction === 'send_email' || 
                    branchConfig.trueBranchAction === 'message' || 
                    branchConfig.trueBranchAction === 'inmail' ||
                    branchConfig.trueBranchAction === 'send_invite_with_note') && (
                    <div className="mt-2">
                      <Label className="text-xs text-gray-300">Message</Label>
                      <Textarea
                        value={branchConfig.trueMessage || ''}
                        onChange={(e) => setBranchConfig({...branchConfig, trueMessage: e.target.value})}
                        placeholder="Hi {{firstName}}, thanks for connecting..."
                        className="bg-slate-800/50 border-green-500/30 text-white text-xs mt-1"
                        rows={3}
                      />
                    </div>
                  )}

                  {branchConfig.trueBranchAction === 'delay' && (
                    <div className="mt-2">
                      <Label className="text-xs text-gray-300">Wait Days</Label>
                      <Input
                        type="number"
                        value={branchConfig.trueDelay || 3}
                        onChange={(e) => setBranchConfig({...branchConfig, trueDelay: parseInt(e.target.value)})}
                        className="bg-slate-800/50 border-green-500/30 text-white text-xs mt-1"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* FALSE Branch */}
              <div className="p-4 rounded-xl border-2 border-red-500/30 bg-red-500/5">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <h3 className="text-sm font-bold text-red-400">FALSE / NO Path</h3>
                </div>
                <p className="text-xs text-gray-400 mb-3">What happens if condition is not met?</p>
                
                <div className="space-y-2">
                  <Label className="text-xs text-gray-300">Next Action</Label>
                  <Select 
                    value={branchConfig.falseBranchAction} 
                    onValueChange={(val) => setBranchConfig({...branchConfig, falseBranchAction: val as any})}
                  >
                    <SelectTrigger className="bg-slate-800/50 border-red-500/30 text-white text-xs">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No action (add later)</SelectItem>
                      <SelectItem value="send_invite">Send LinkedIn Invite</SelectItem>
                      <SelectItem value="send_invite_with_note">Send LinkedIn Invite with note</SelectItem>
                      <SelectItem value="message">LinkedIn Message</SelectItem>
                      <SelectItem value="inmail">InMail</SelectItem>
                      <SelectItem value="follow">Follow Profile</SelectItem>
                      <SelectItem value="send_email">Send Email</SelectItem>
                      <SelectItem value="withdraw_invite">Withdraw Invite</SelectItem>
                      <SelectItem value="delay">Add Delay</SelectItem>
                    </SelectContent>
                  </Select>

                  {(branchConfig.falseBranchAction === 'send_email' || 
                    branchConfig.falseBranchAction === 'message' || 
                    branchConfig.falseBranchAction === 'inmail' ||
                    branchConfig.falseBranchAction === 'send_invite_with_note') && (
                    <div className="mt-2">
                      <Label className="text-xs text-gray-300">Message</Label>
                      <Textarea
                        value={branchConfig.falseMessage || ''}
                        onChange={(e) => setBranchConfig({...branchConfig, falseMessage: e.target.value})}
                        placeholder="Hi {{firstName}}, I wanted to reach out..."
                        className="bg-slate-800/50 border-red-500/30 text-white text-xs mt-1"
                        rows={3}
                      />
                    </div>
                  )}

                  {branchConfig.falseBranchAction === 'delay' && (
                    <div className="mt-2">
                      <Label className="text-xs text-gray-300">Wait Days</Label>
                      <Input
                        type="number"
                        value={branchConfig.falseDelay || 3}
                        onChange={(e) => setBranchConfig({...branchConfig, falseDelay: parseInt(e.target.value)})}
                        className="bg-slate-800/50 border-red-500/30 text-white text-xs mt-1"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Info Message */}
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-300 font-medium">You can always add more actions later</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Select "No action" if you want to configure branch steps manually in the visual builder
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleSaveCondition}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-600"
              >
                <GitBranch className="w-4 h-4 mr-2" />
                Create Branch
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowConditionDialog(false);
                  setBranchConfig({ trueBranchAction: 'none', falseBranchAction: 'none' });
                }}
                className="bg-white/5 border-white/10 text-white"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Workflow Decision Dialog */}
      <Dialog open={showWorkflowDecision} onOpenChange={setShowWorkflowDecision}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <ThumbsUp className="w-6 h-6 text-green-400" />
              User Acknowledgment Workflow
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-base">
              You've added a condition for when users acknowledge or say yes. How would you like to handle this scenario?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleWorkflowDecision('build')}
              className="w-full p-6 rounded-xl border-2 border-white/10 hover:border-green-500/50 bg-gradient-to-br from-green-500/10 to-green-600/5 transition-all text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 group-hover:from-green-500/30 group-hover:to-green-600/30 transition-all">
                  <Play className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">Build It Now</h3>
                  <p className="text-sm text-gray-400">
                    I want to configure the acknowledgment workflow right away. You can add steps to the "Accepted" path in the visual builder.
                  </p>
                </div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleWorkflowDecision('manual')}
              className="w-full p-6 rounded-xl border-2 border-white/10 hover:border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-blue-600/5 transition-all text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all">
                  <Edit className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">Handle Manually</h3>
                  <p className="text-sm text-gray-400">
                    I'll personally respond to each acknowledgment. The workflow will notify me when users say yes.
                  </p>
                </div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleWorkflowDecision('later')}
              className="w-full p-6 rounded-xl border-2 border-white/10 hover:border-purple-500/50 bg-gradient-to-br from-purple-500/10 to-purple-600/5 transition-all text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 group-hover:from-purple-500/30 group-hover:to-purple-600/30 transition-all">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">Decide Later</h3>
                  <p className="text-sm text-gray-400">
                    I'm not sure yet. Let me save the campaign and configure this workflow later when I'm ready.
                  </p>
                </div>
              </div>
            </motion.button>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-cyan-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-white mb-1">💡 Pro Tip</p>
                <p className="text-xs text-gray-400">
                  Building automated workflows for acknowledgments can significantly increase your conversion rate by engaging prospects at their peak interest moment.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Group Dialog */}
      <Dialog open={showCreateGroup} onOpenChange={setShowCreateGroup}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white mb-2">Create New Group</DialogTitle>
            <DialogDescription className="text-gray-400">
              Create a group to organize your prospects for this campaign
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            <div>
              <Label className="text-gray-300 mb-2 block font-medium">Group Name *</Label>
              <Input
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="e.g., Enterprise Q2 Prospects"
                className="bg-slate-800/50 border-white/10 text-white h-12"
              />
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block font-medium">Description</Label>
              <Textarea
                value={newGroupDescription}
                onChange={(e) => setNewGroupDescription(e.target.value)}
                placeholder="Describe this group and its purpose..."
                className="bg-slate-800/50 border-white/10 text-white min-h-[100px]"
              />
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block font-medium">Offering *</Label>
              <Select value={newGroupOffering} onValueChange={setNewGroupOffering}>
                <SelectTrigger className="bg-slate-800/50 border-white/10 text-white h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/10">
                  <SelectItem value="enterprise">Enterprise Solutions</SelectItem>
                  <SelectItem value="saas">SaaS Products</SelectItem>
                  <SelectItem value="consulting">Consulting Services</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-cyan-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white mb-1">💡 Pro Tip</p>
                  <p className="text-xs text-gray-400">
                    Create groups based on specific criteria like industry, company size, or engagement level
                    for more targeted campaigns.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateGroup(false);
                setNewGroupName('');
                setNewGroupDescription('');
                setNewGroupOffering('enterprise');
              }}
              className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (newGroupName.trim()) {
                  const newGroup = {
                    id: Date.now().toString(),
                    name: newGroupName,
                    description: newGroupDescription,
                    offering: newGroupOffering,
                    prospectCount: 0,
                    selected: true
                  };
                  setGroups([...groups, newGroup]);
                  setShowCreateGroup(false);
                  setNewGroupName('');
                  setNewGroupDescription('');
                  setNewGroupOffering('enterprise');
                  
                  // Show success notification
                  const notificationId = Date.now().toString();
                  setNotifications([...notifications, {
                    id: notificationId,
                    message: `✅ Group "${newGroupName}" created and added to campaign!`,
                    type: 'success'
                  }]);
                  setTimeout(() => {
                    setNotifications(prev => prev.filter(n => n.id !== notificationId));
                  }, 5000);
                }
              }}
              disabled={!newGroupName.trim()}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white mb-2">
              Campaign Preview
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-base">
              Review your campaign details before launching
            </DialogDescription>
          </DialogHeader>

          {sequenceTree && (
            <div className="space-y-6 mt-6">
              {/* Campaign Overview */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20">
                        <Sparkles className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-1">CAMPAIGN NAME</p>
                        <p className="text-lg font-bold text-white">{campaignName}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-600/20">
                        <Users className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-1">TARGET AUDIENCE</p>
                        <p className="text-lg font-bold text-white">
                          {getPreviewSummary()?.audience?.label}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {getPreviewSummary()?.audience?.count} prospects
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sequence Statistics */}
              <Card className="border-white/10 bg-slate-800/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Sequence Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center p-4 rounded-lg bg-slate-900/50">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center mx-auto mb-2">
                        <BarChart3 className="w-6 h-6 text-cyan-400" />
                      </div>
                      <p className="text-2xl font-bold text-white mb-1">
                        {getPreviewSummary()?.totalSteps}
                      </p>
                      <p className="text-xs text-gray-400">Total Steps</p>
                    </div>

                    <div className="text-center p-4 rounded-lg bg-slate-900/50">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center mx-auto mb-2">
                        <MessageSquare className="w-6 h-6 text-purple-400" />
                      </div>
                      <p className="text-2xl font-bold text-white mb-1">
                        {getPreviewSummary()?.messages}
                      </p>
                      <p className="text-xs text-gray-400">Messages</p>
                    </div>

                    <div className="text-center p-4 rounded-lg bg-slate-900/50">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center mx-auto mb-2">
                        <GitBranch className="w-6 h-6 text-red-400" />
                      </div>
                      <p className="text-2xl font-bold text-white mb-1">
                        {getPreviewSummary()?.conditions}
                      </p>
                      <p className="text-xs text-gray-400">Conditions</p>
                    </div>

                    <div className="text-center p-4 rounded-lg bg-slate-900/50">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 flex items-center justify-center mx-auto mb-2">
                        <Clock className="w-6 h-6 text-yellow-400" />
                      </div>
                      <p className="text-2xl font-bold text-white mb-1">
                        {getPreviewSummary()?.delays}
                      </p>
                      <p className="text-xs text-gray-400">Delays</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Messages Preview */}
              <Card className="border-white/10 bg-slate-800/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Message Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {(() => {
                      const messages: { type: string; label: string; content: string; subject?: string }[] = [];
                      const extractMessages = (node: SequenceNode) => {
                        if ((node.type === 'message' || node.type === 'inmail' || node.type === 'send_email') && node.data.message) {
                          messages.push({
                            type: node.type,
                            label: node.label,
                            content: node.data.message,
                            subject: node.data.subject
                          });
                        }
                        if (node.children) {
                          node.children.forEach(child => extractMessages(child));
                        }
                      };
                      extractMessages(sequenceTree);
                      return messages.map((msg, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-slate-900/50 border border-white/5">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                              {msg.type === 'inmail' ? 'InMail' : msg.type === 'send_email' ? 'Email' : 'Message'}
                            </Badge>
                            <span className="text-sm font-medium text-white">{msg.label}</span>
                          </div>
                          {msg.subject && (
                            <p className="text-xs text-gray-400 mb-1">
                              <span className="font-medium">Subject:</span> {msg.subject}
                            </p>
                          )}
                          <p className="text-xs text-gray-300 line-clamp-3">{msg.content}</p>
                        </div>
                      ));
                    })()}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-white/10">
                <Button
                  variant="outline"
                  onClick={() => setShowPreview(false)}
                  className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Continue Editing
                </Button>
                <Button
                  onClick={() => {
                    setShowPreview(false);
                    // Launch campaign logic here
                  }}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve & Launch
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Multichannel Filter Dialog */}
      <Dialog open={showMultichannelFilterDialog} onOpenChange={setShowMultichannelFilterDialog}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl flex items-center gap-2">
              <Users className="w-6 h-6 text-cyan-400" />
              Multichannel Audience Filter
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Stats Display */}
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/20">
                  <AlertCircle className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-3">Prospect Analysis</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Total Selected Prospects:</span>
                      <span className="font-bold text-white">{totalProspects}</span>
                    </div>
                    <div className="flex justify-between items-center text-green-400">
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Have Both LinkedIn & Email:
                      </span>
                      <span className="font-bold">{completeProspects}</span>
                    </div>
                    <div className="flex justify-between items-center text-amber-400">
                      <span className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Missing LinkedIn or Email:
                      </span>
                      <span className="font-bold">{incompleteProspects}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
              <p className="text-sm text-amber-200">
                <strong>Note:</strong> Multichannel outreach requires both LinkedIn and Email. {incompleteProspects} prospects are missing one or both channels.
              </p>
            </div>

            {/* Options */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <Button
                  onClick={() => {
                    setShowMultichannelFilterDialog(false);
                    setShowTemplateChoice(true);
                  }}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 h-auto py-4"
                >
                  <div className="flex items-center gap-3 w-full">
                    <CheckCircle className="w-5 h-5" />
                    <div className="text-left flex-1">
                      <div className="font-semibold">Continue with {completeProspects} Complete Prospects</div>
                      <div className="text-xs opacity-80">Start outreach for prospects with both channels</div>
                    </div>
                  </div>
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div className="flex-1 space-y-2">
                  <Label className="text-white text-sm">Create Group for Incomplete Prospects</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      placeholder="Enter group name..."
                      className="flex-1 bg-slate-800 border-white/10 text-white"
                    />
                    <Button
                      onClick={() => {
                        if (newGroupName.trim()) {
                          // Add new group for incomplete prospects
                          const newGroup = {
                            id: Date.now().toString(),
                            name: newGroupName,
                            description: 'Prospects missing LinkedIn or Email',
                            offering: 'mixed',
                            prospectCount: incompleteProspects,
                            selected: false
                          };
                          setGroups([...groups, newGroup]);
                          
                          // Show notification
                          const notificationId = Date.now().toString();
                          setNotifications([...notifications, {
                            id: notificationId,
                            message: `✅ Group "${newGroupName}" created with ${incompleteProspects} prospects`,
                            type: 'success'
                          }]);
                          setTimeout(() => {
                            setNotifications(prev => prev.filter(n => n.id !== notificationId));
                          }, 5000);
                          
                          setNewGroupName('');
                          setShowMultichannelFilterDialog(false);
                          setShowTemplateChoice(true);
                        }
                      }}
                      disabled={!newGroupName.trim()}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Create
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400">You can run a separate campaign for these prospects later</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Template Choice Dialog */}
      <Dialog open={showTemplateChoice} onOpenChange={setShowTemplateChoice}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              Choose Your Starting Point
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p className="text-gray-300 text-sm">
              Would you like to start with a pre-built template or create a custom sequence from scratch?
            </p>

            <div className="grid grid-cols-2 gap-4">
              {/* Template Option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setTemplateChoice('template');
                  setSequenceTree(getDefaultMultichannelTemplate());
                  setViewMode('sequence');
                  setShowTemplateChoice(false);
                  
                  // Show notification
                  const notificationId = Date.now().toString();
                  setNotifications([...notifications, {
                    id: notificationId,
                    message: '✨ Multichannel template loaded! Customize it to fit your needs.',
                    type: 'success'
                  }]);
                  setTimeout(() => {
                    setNotifications(prev => prev.filter(n => n.id !== notificationId));
                  }, 5000);
                }}
                className="p-6 rounded-xl border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-600/10 hover:from-green-500/20 hover:to-emerald-600/20 transition-all text-left"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-600/20 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Start with Template</h3>
                    <p className="text-xs text-gray-400">Pre-built multichannel sequence you can customize</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-green-400">
                    <CheckCircle className="w-3 h-3" />
                    <span>Recommended</span>
                  </div>
                </div>
              </motion.button>

              {/* Custom Option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setTemplateChoice('custom');
                  // Start with minimal sequence - first step
                  setSequenceTree({
                    id: '1',
                    type: 'send_email',
                    label: 'Send Email',
                    data: {
                      subject: '',
                      message: '',
                    },
                    children: [],
                    position: { x: 0, y: 0 }
                  });
                  setViewMode('sequence');
                  setShowTemplateChoice(false);
                  
                  // Show notification
                  const notificationId = Date.now().toString();
                  setNotifications([...notifications, {
                    id: notificationId,
                    message: '🎨 Custom sequence started! Build your flow step by step.',
                    type: 'info'
                  }]);
                  setTimeout(() => {
                    setNotifications(prev => prev.filter(n => n.id !== notificationId));
                  }, 5000);
                }}
                className="p-6 rounded-xl border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-600/10 hover:from-blue-500/20 hover:to-cyan-600/20 transition-all text-left"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-600/20 flex items-center justify-center">
                    <Edit className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Build Custom</h3>
                    <p className="text-xs text-gray-400">Start from scratch and create your own flow</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-blue-400">
                    <Sparkles className="w-3 h-3" />
                    <span>Full Control</span>
                  </div>
                </div>
              </motion.button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Prospect View Dialog */}
      <Dialog open={showProspectView} onOpenChange={setShowProspectView}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl flex items-center gap-2">
              <Users className="w-6 h-6 text-cyan-400" />
              Prospects at This Step
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              View-only list of prospects who are at or have passed through this action
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-auto mt-4">
            <div className="bg-slate-800/30 rounded-xl border border-white/10 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-800/50 border-b border-white/10">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-300 uppercase tracking-wider">Company</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-300 uppercase tracking-wider">Position</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-300 uppercase tracking-wider">Email</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-300 uppercase tracking-wider">LinkedIn</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-300 uppercase tracking-wider">Last Activity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { id: 1, name: 'Sarah Johnson', company: 'TechCorp Inc', position: 'VP of Marketing', email: 'sarah.j@techcorp.com', linkedin: 'linkedin.com/in/sarahjohnson', status: 'Active', lastActivity: '2 hours ago' },
                    { id: 2, name: 'Michael Chen', company: 'StartupXYZ', position: 'CEO & Founder', email: 'michael@startupxyz.io', linkedin: 'linkedin.com/in/michaelchen', status: 'Active', lastActivity: '5 hours ago' },
                    { id: 3, name: 'Emily Rodriguez', company: 'Enterprise Solutions', position: 'Director of Sales', email: 'e.rodriguez@enterprise.com', linkedin: 'linkedin.com/in/emilyrod', status: 'Responded', lastActivity: '1 day ago' },
                    { id: 4, name: 'David Park', company: 'Innovation Labs', position: 'CTO', email: 'david@innovationlabs.com', linkedin: 'linkedin.com/in/davidpark', status: 'Active', lastActivity: '3 hours ago' },
                    { id: 5, name: 'Jessica Thompson', company: 'Global Ventures', position: 'Head of Growth', email: 'jessica.t@globalventures.com', linkedin: 'linkedin.com/in/jessicathompson', status: 'Pending', lastActivity: '6 hours ago' },
                    { id: 6, name: 'Alex Kumar', company: 'CloudTech Systems', position: 'VP of Engineering', email: 'alex@cloudtech.com', linkedin: 'linkedin.com/in/alexkumar', status: 'Active', lastActivity: '4 hours ago' },
                    { id: 7, name: 'Rachel Martinez', company: 'Digital Dynamics', position: 'Marketing Manager', email: 'rachel.m@digitaldynamics.com', linkedin: 'linkedin.com/in/rachelmartinez', status: 'Responded', lastActivity: '8 hours ago' },
                    { id: 8, name: 'James Wilson', company: 'Fintech Solutions', position: 'Chief Revenue Officer', email: 'james@fintech.com', linkedin: 'linkedin.com/in/jameswilson', status: 'Active', lastActivity: '1 hour ago' },
                    { id: 9, name: 'Sophia Lee', company: 'AI Innovations', position: 'Product Director', email: 'sophia@aiinnovations.com', linkedin: 'linkedin.com/in/sophialee', status: 'Active', lastActivity: '7 hours ago' },
                    { id: 10, name: 'Thomas Anderson', company: 'SaaS Platform Co', position: 'VP of Business Dev', email: 'thomas@saasplatform.com', linkedin: 'linkedin.com/in/thomasanderson', status: 'Pending', lastActivity: '2 days ago' },
                    { id: 11, name: 'Olivia Brown', company: 'Marketing Pros', position: 'CMO', email: 'olivia@marketingpros.com', linkedin: 'linkedin.com/in/oliviabrown', status: 'Active', lastActivity: '5 hours ago' },
                    { id: 12, name: 'Daniel Kim', company: 'Tech Startups Inc', position: 'Founder', email: 'daniel@techstartups.com', linkedin: 'linkedin.com/in/danielkim', status: 'Responded', lastActivity: '12 hours ago' },
                  ].map((prospect) => (
                    <tr key={prospect.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                            {prospect.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-medium text-white">{prospect.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">{prospect.company}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{prospect.position}</td>
                      <td className="px-4 py-3 text-sm text-gray-400">{prospect.email}</td>
                      <td className="px-4 py-3 text-sm text-blue-400 hover:text-blue-300 cursor-pointer truncate max-w-[150px]">{prospect.linkedin}</td>
                      <td className="px-4 py-3">
                        <Badge className={`text-xs ${
                          prospect.status === 'Active' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          prospect.status === 'Responded' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                          'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        }`}>
                          {prospect.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-400">{prospect.lastActivity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              <Card className="border-white/10 bg-slate-800/30">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/20">
                      <Users className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">12</p>
                      <p className="text-xs text-gray-400">Total Prospects</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-white/10 bg-slate-800/30">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">8</p>
                      <p className="text-xs text-gray-400">Active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-white/10 bg-slate-800/30">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">3</p>
                      <p className="text-xs text-gray-400">Responded</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-white/10 bg-slate-800/30">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-yellow-500/20">
                      <Clock className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">2</p>
                      <p className="text-xs text-gray-400">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
            <Button
              variant="outline"
              onClick={() => setShowProspectView(false)}
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ChatAssistant />
    </div>
  );
}
