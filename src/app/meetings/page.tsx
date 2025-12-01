'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ChatAssistant from '@/components/chat-assistant';
import {
  ArrowLeft,
  Calendar,
  Plus,
  Video,
  MapPin,
  Clock,
  User,
  Mail,
  FileText,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Send,
  Eye,
  Edit
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function MeetingsPage() {
  const [view, setView] = useState<'upcoming' | 'past'>('upcoming');
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showMOMDialog, setShowMOMDialog] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  
  const [meetingForm, setMeetingForm] = useState({
    title: '',
    prospect: '',
    email: '',
    platform: 'google-meet',
    date: '',
    time: '',
    duration: '30',
    agenda: '',
    sendEmail: true
  });

  const upcomingMeetings = [
    { 
      id: 1, 
      title: 'Demo Call with Acme Corp', 
      prospect: 'John Smith', 
      email: 'john@acme.com',
      time: '10:00 AM', 
      date: 'Today', 
      platform: 'Google Meet',
      duration: '30 min',
      meetingLink: 'https://meet.google.com/abc-defg-hij'
    },
    { 
      id: 2, 
      title: 'Follow-up Discussion', 
      prospect: 'Emily Chen', 
      email: 'emily@techstart.com',
      time: '2:00 PM', 
      date: 'Tomorrow', 
      platform: 'Zoom',
      duration: '45 min',
      meetingLink: 'https://zoom.us/j/123456789'
    },
    { 
      id: 3, 
      title: 'Contract Review', 
      prospect: 'Robert Williams', 
      email: 'robert@global.com',
      time: '11:30 AM', 
      date: 'Jan 25', 
      platform: 'MS Teams',
      duration: '1 hour',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/...'
    }
  ];

  const pastMeetings = [
    { 
      id: 4, 
      title: 'Initial Consultation', 
      prospect: 'Sarah Johnson',
      company: 'Innovate Labs',
      email: 'sarah.j@innovatelabs.com',
      time: '3:00 PM', 
      date: 'Jan 15, 2025', 
      platform: 'Google Meet',
      duration: '45 min',
      outcome: 'Positive',
      attendees: ['Sarah Johnson', 'Mike Wilson', 'You'],
      mom: {
        summary: 'Discussed product features and implementation timeline. Sarah showed strong interest in our AI capabilities and automation features.',
        keyPoints: [
          'Client needs implementation by Q2 2025',
          'Budget approved: $50,000',
          'Interested in Enterprise tier with custom integrations',
          'Technical team will join next meeting',
          'Concerns about data security addressed'
        ],
        decisions: [
          'Proceed with Enterprise proposal',
          'Schedule technical deep-dive for next week',
          'Provide case studies from similar companies'
        ],
        actionItems: [
          { task: 'Send detailed proposal', owner: 'Sales Team', deadline: 'Jan 18' },
          { task: 'Schedule technical demo', owner: 'Sarah Johnson', deadline: 'Jan 20' },
          { task: 'Share security documentation', owner: 'You', deadline: 'Jan 17' }
        ],
        nextSteps: [
          'Follow up with proposal by Wednesday',
          'Coordinate with technical team for deep-dive demo',
          'Prepare customized pricing based on their requirements',
          'Set up trial environment for testing'
        ]
      }
    },
    { 
      id: 5, 
      title: 'Product Walkthrough', 
      prospect: 'Michael Brown',
      company: 'DataFlow Systems',
      email: 'mbrown@dataflow.com',
      time: '10:00 AM', 
      date: 'Jan 12, 2025', 
      platform: 'Zoom',
      duration: '1 hour',
      outcome: 'Positive',
      attendees: ['Michael Brown', 'Lisa Anderson', 'You'],
      mom: {
        summary: 'Comprehensive product demonstration showcasing key features. Client impressed with reporting capabilities and user interface.',
        keyPoints: [
          'Current solution is outdated and manual',
          'Team of 50 users across 3 locations',
          'Primary pain point: Data consolidation',
          'Budget cycle starts in February',
          'Decision timeline: End of Q1'
        ],
        decisions: [
          'Move forward with 30-day trial',
          'Include advanced reporting module',
          'Schedule weekly check-ins during trial'
        ],
        actionItems: [
          { task: 'Set up trial account', owner: 'You', deadline: 'Jan 15' },
          { task: 'Provide training materials', owner: 'Customer Success', deadline: 'Jan 16' },
          { task: 'Review with internal team', owner: 'Michael Brown', deadline: 'Jan 20' }
        ],
        nextSteps: [
          'Activate trial by end of week',
          'Schedule onboarding session with their team',
          'Weekly progress calls starting Jan 22',
          'Prepare final proposal for February board meeting'
        ]
      }
    },
    { 
      id: 6, 
      title: 'Quarterly Review Meeting', 
      prospect: 'Lisa Anderson',
      company: 'CloudTech Solutions',
      email: 'l.anderson@cloudtech.com',
      time: '2:30 PM', 
      date: 'Jan 10, 2025', 
      platform: 'MS Teams',
      duration: '1.5 hours',
      outcome: 'Positive',
      attendees: ['Lisa Anderson', 'Team Leads', 'You'],
      mom: {
        summary: 'Quarterly business review covering performance metrics, upcoming features, and expansion opportunities.',
        keyPoints: [
          'Usage increased 45% quarter-over-quarter',
          'All KPIs exceeded targets',
          'Interest in additional modules',
          'Considering enterprise-wide rollout',
          'Renewal coming up in March'
        ],
        decisions: [
          'Upgrade to Enterprise plan',
          'Add 25 more user licenses',
          'Early renewal with 20% discount'
        ],
        actionItems: [
          { task: 'Prepare expansion proposal', owner: 'Account Manager', deadline: 'Jan 15' },
          { task: 'Process license expansion', owner: 'Operations', deadline: 'Jan 18' },
          { task: 'Schedule training for new users', owner: 'Training Team', deadline: 'Jan 25' }
        ],
        nextSteps: [
          'Send renewal paperwork by Jan 20',
          'Coordinate expansion rollout plan',
          'Schedule success story interview for marketing',
          'Plan next QBR for April'
        ]
      }
    }
  ];

  const handleScheduleMeeting = () => {
    console.log('Scheduling meeting:', meetingForm);
    // Here you would typically:
    // 1. Create calendar event
    // 2. Generate meeting link (Google Meet/Zoom/MS Teams)
    // 3. Send email invitation
    setShowScheduleDialog(false);
    setMeetingForm({
      title: '',
      prospect: '',
      email: '',
      platform: 'google-meet',
      date: '',
      time: '',
      duration: '30',
      agenda: '',
      sendEmail: true
    });
  };

  const getPlatformIcon = (platform: string) => {
    return <Video className="w-4 h-4" />;
  };

  const getPlatformColor = (platform: string) => {
    switch(platform.toLowerCase()) {
      case 'google meet': return 'bg-green-500/20 text-green-400';
      case 'zoom': return 'bg-blue-500/20 text-blue-400';
      case 'ms teams': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

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
                <h1 className="text-2xl font-bold text-white">Meetings</h1>
                <p className="text-sm text-gray-400">Schedule and manage your meetings</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowScheduleDialog(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Schedule Meeting
            </Button>
          </div>

          {/* View Toggle */}
          <div className="mt-4 flex gap-2">
            <Button
              variant={view === 'upcoming' ? 'default' : 'outline'}
              className={view === 'upcoming' ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-white/5 border-white/10 text-white'}
              onClick={() => setView('upcoming')}
            >
              Upcoming
            </Button>
            <Button
              variant={view === 'past' ? 'default' : 'outline'}
              className={view === 'past' ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-white/5 border-white/10 text-white'}
              onClick={() => setView('past')}
            >
              Past
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-6">
        {view === 'upcoming' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMeetings.map((meeting, index) => (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl hover:border-cyan-500/30 transition-all overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-600" />
                  <CardHeader className="border-b border-white/10">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <CardTitle className="text-white mb-2">{meeting.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <User className="w-4 h-4" />
                          {meeting.prospect}
                        </div>
                      </div>
                      <Badge className={getPlatformColor(meeting.platform)}>
                        {getPlatformIcon(meeting.platform)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      {meeting.date} at {meeting.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Clock className="w-4 h-4 text-blue-400" />
                      {meeting.duration}
                    </div>
                    <Badge className="bg-slate-800 text-gray-300 text-xs">{meeting.platform}</Badge>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-xs">
                        <Video className="w-3 h-3 mr-1" />
                        Join
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-white/5 border-white/10 text-white text-xs">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {pastMeetings.map((meeting, index) => (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl hover:border-cyan-500/30 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-lg shrink-0 ${
                          meeting.outcome === 'Positive' 
                            ? 'bg-green-500/20' 
                            : 'bg-orange-500/20'
                        } flex items-center justify-center`}>
                          <Calendar className={`w-6 h-6 ${
                            meeting.outcome === 'Positive' 
                              ? 'text-green-400' 
                              : 'text-orange-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white text-lg mb-1">{meeting.title}</h3>
                          <p className="text-sm text-gray-400 mb-2">{meeting.prospect} • {meeting.company}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {meeting.date} at {meeting.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Video className="w-3 h-3" />
                              {meeting.platform}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {meeting.attendees.length} attendees
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${
                          meeting.outcome === 'Positive'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                        }`}>
                          {meeting.outcome}
                        </Badge>
                        <Button 
                          size="sm"
                          onClick={() => {
                            setSelectedMeeting(meeting);
                            setShowMOMDialog(true);
                          }}
                          className="bg-gradient-to-r from-cyan-500 to-blue-600"
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          View MOM
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Schedule Meeting Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">Schedule New Meeting</DialogTitle>
            <DialogDescription className="text-gray-400">
              Schedule a meeting and send calendar invites
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300 mb-2 block">Meeting Title *</Label>
                <Input
                  value={meetingForm.title}
                  onChange={(e) => setMeetingForm({...meetingForm, title: e.target.value})}
                  placeholder="e.g., Product Demo"
                  className="bg-slate-800/50 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">Prospect Name *</Label>
                <Input
                  value={meetingForm.prospect}
                  onChange={(e) => setMeetingForm({...meetingForm, prospect: e.target.value})}
                  placeholder="e.g., John Doe"
                  className="bg-slate-800/50 border-white/10 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">Email Address *</Label>
              <Input
                type="email"
                value={meetingForm.email}
                onChange={(e) => setMeetingForm({...meetingForm, email: e.target.value})}
                placeholder="john@company.com"
                className="bg-slate-800/50 border-white/10 text-white"
              />
            </div>

            <div>
              <Label className="text-gray-300 mb-3 block">Meeting Platform *</Label>
              <div className="grid grid-cols-3 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMeetingForm({...meetingForm, platform: 'google-meet'})}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    meetingForm.platform === 'google-meet'
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-white/10 bg-slate-800/30'
                  }`}
                >
                  <Video className={`w-6 h-6 mx-auto mb-2 ${
                    meetingForm.platform === 'google-meet' ? 'text-green-400' : 'text-gray-400'
                  }`} />
                  <p className="text-sm font-medium text-white">Google Meet</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMeetingForm({...meetingForm, platform: 'zoom'})}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    meetingForm.platform === 'zoom'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-white/10 bg-slate-800/30'
                  }`}
                >
                  <Video className={`w-6 h-6 mx-auto mb-2 ${
                    meetingForm.platform === 'zoom' ? 'text-blue-400' : 'text-gray-400'
                  }`} />
                  <p className="text-sm font-medium text-white">Zoom</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setMeetingForm({...meetingForm, platform: 'ms-teams'})}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    meetingForm.platform === 'ms-teams'
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-white/10 bg-slate-800/30'
                  }`}
                >
                  <Video className={`w-6 h-6 mx-auto mb-2 ${
                    meetingForm.platform === 'ms-teams' ? 'text-purple-400' : 'text-gray-400'
                  }`} />
                  <p className="text-sm font-medium text-white">MS Teams</p>
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-gray-300 mb-2 block">Date *</Label>
                <Input
                  type="date"
                  value={meetingForm.date}
                  onChange={(e) => setMeetingForm({...meetingForm, date: e.target.value})}
                  className="bg-slate-800/50 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">Time *</Label>
                <Input
                  type="time"
                  value={meetingForm.time}
                  onChange={(e) => setMeetingForm({...meetingForm, time: e.target.value})}
                  className="bg-slate-800/50 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">Duration</Label>
                <Select value={meetingForm.duration} onValueChange={(val) => setMeetingForm({...meetingForm, duration: val})}>
                  <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 min</SelectItem>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="45">45 min</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">Agenda (Optional)</Label>
              <Textarea
                value={meetingForm.agenda}
                onChange={(e) => setMeetingForm({...meetingForm, agenda: e.target.value})}
                placeholder="Meeting agenda and topics to discuss..."
                className="bg-slate-800/50 border-white/10 text-white min-h-[100px]"
              />
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={meetingForm.sendEmail}
                  onChange={(e) => setMeetingForm({...meetingForm, sendEmail: e.target.checked})}
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-cyan-400 mb-1 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Calendar Invite
                  </p>
                  <p className="text-xs text-gray-400">
                    Automatically send meeting invite with {meetingForm.platform === 'google-meet' ? 'Google Meet' : meetingForm.platform === 'zoom' ? 'Zoom' : 'MS Teams'} link to participant's email
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowScheduleDialog(false)}
                className="bg-white/5 border-white/10 text-white"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleScheduleMeeting}
                disabled={!meetingForm.title || !meetingForm.prospect || !meetingForm.email || !meetingForm.date || !meetingForm.time}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 disabled:opacity-50"
              >
                <Send className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* MOM (Minutes of Meeting) Dialog */}
      <Dialog open={showMOMDialog} onOpenChange={setShowMOMDialog}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedMeeting && (
            <>
              <DialogHeader className="border-b border-white/10 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-white text-2xl mb-2">{selectedMeeting.title}</DialogTitle>
                    <DialogDescription className="text-gray-400 flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {selectedMeeting.prospect}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {selectedMeeting.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {selectedMeeting.duration}
                      </span>
                    </DialogDescription>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    {selectedMeeting.outcome}
                  </Badge>
                </div>
              </DialogHeader>

              <div className="space-y-6 py-6">
                {/* Summary */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <div className="p-2 rounded-lg bg-cyan-500/20 mr-3">
                      <FileText className="w-4 h-4 text-cyan-400" />
                    </div>
                    Meeting Summary
                  </h3>
                  <p className="text-gray-300 bg-slate-800/30 p-4 rounded-lg leading-relaxed">
                    {selectedMeeting.mom.summary}
                  </p>
                </div>

                {/* Attendees */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <div className="p-2 rounded-lg bg-purple-500/20 mr-3">
                      <User className="w-4 h-4 text-purple-400" />
                    </div>
                    Attendees
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMeeting.attendees.map((attendee: string, idx: number) => (
                      <Badge key={idx} className="bg-slate-800 text-gray-300">
                        {attendee}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Key Discussion Points */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <div className="p-2 rounded-lg bg-blue-500/20 mr-3">
                      <AlertCircle className="w-4 h-4 text-blue-400" />
                    </div>
                    Key Discussion Points
                  </h3>
                  <div className="space-y-2">
                    {selectedMeeting.mom.keyPoints.map((point: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mt-2" />
                        <p className="text-gray-300 text-sm flex-1">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decisions Made */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <div className="p-2 rounded-lg bg-green-500/20 mr-3">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                    Decisions Made
                  </h3>
                  <div className="space-y-2">
                    {selectedMeeting.mom.decisions.map((decision: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <p className="text-gray-300 text-sm flex-1">{decision}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Items */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <div className="p-2 rounded-lg bg-orange-500/20 mr-3">
                      <Clock className="w-4 h-4 text-orange-400" />
                    </div>
                    Action Items
                  </h3>
                  <div className="space-y-3">
                    {selectedMeeting.mom.actionItems.map((item: any, idx: number) => (
                      <div key={idx} className="p-4 rounded-lg bg-slate-800/30 border border-white/5">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-white font-medium">{item.task}</p>
                          <Badge className="bg-orange-500/20 text-orange-400 text-xs">
                            Due: {item.deadline}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400">Owner: {item.owner}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Steps (AI Recommendations) */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 mr-3">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    Next Steps & Recommendations
                    <Badge className="ml-2 bg-purple-500/20 text-purple-400 text-xs">
                      AI Powered
                    </Badge>
                  </h3>
                  <div className="space-y-2">
                    {selectedMeeting.mom.nextSteps.map((step: string, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all"
                      >
                        <div className="p-1.5 rounded-md bg-purple-500/20">
                          <TrendingUp className="w-4 h-4 text-purple-400" />
                        </div>
                        <p className="text-gray-300 text-sm flex-1">{step}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 flex justify-end gap-2">
                <Button variant="outline" className="bg-white/5 border-white/10 text-white">
                  <Mail className="w-4 h-4 mr-2" />
                  Email MOM
                </Button>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600">
                  <FileText className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* AI Chat Assistant */}
      <ChatAssistant />
    </div>
  );
}
