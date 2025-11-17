'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Activity,
  Edit,
  Save,
  ExternalLink,
  Sparkles,
  Send,
  FileText,
  Clock,
  CheckCircle2,
  Plus,
  PlayCircle,
  StopCircle,
  Mic,
  User,
  Building,
  Link2,
  MessageSquare,
  Zap,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ProspectDetailPage({ params }: { params: { id: string } }) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [notes, setNotes] = useState('Interested in enterprise package. Discussed pricing.');
  const [nextSteps, setNextSteps] = useState(['Follow up with pricing details', 'Schedule demo for next week', 'Send case studies']);
  const [newNote, setNewNote] = useState('');
  
  // Email state
  const [emailMode, setEmailMode] = useState<'automated' | 'manual'>('automated');
  const [selectedOffering, setSelectedOffering] = useState('enterprise');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [followUpBodies, setFollowUpBodies] = useState<string[]>(['', '', '']);
  const [closingBody, setClosingBody] = useState('');
  
  // Calling state
  const [callingMode, setCallingMode] = useState<'automated' | 'manual'>('manual');
  const [callScript, setCallScript] = useState('');
  const [callNotes, setCallNotes] = useState('');
  const [showScriptAI, setShowScriptAI] = useState(false);
  const [scriptPrompt, setScriptPrompt] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [callTranscript, setCallTranscript] = useState('');
  const [callSummary, setCallSummary] = useState('');
  
  // Activity logs
  const activityLogs = [
    { id: 1, action: 'Prospect created', user: 'System', time: '2025-01-15 10:30 AM', details: 'Lead imported from LinkedIn scrape' },
    { id: 2, action: 'Status changed', user: 'Sarah J.', time: '2025-01-16 02:15 PM', details: 'Status changed from "New" to "Contacted"' },
    { id: 3, action: 'Email sent', user: 'System (AI)', time: '2025-01-16 02:20 PM', details: 'Outreach email sent via automated campaign' },
    { id: 4, action: 'Email opened', user: 'John Smith', time: '2025-01-16 03:45 PM', details: 'Prospect opened the email' },
    { id: 5, action: 'Note added', user: 'Sarah J.', time: '2025-01-17 11:00 AM', details: 'Added note: "Interested in enterprise package"' },
    { id: 6, action: 'Priority changed', user: 'Mike W.', time: '2025-01-18 09:30 AM', details: 'Priority changed from "Medium" to "High"' },
  ];

  // Mock data
  const prospect = {
    id: params.id,
    name: 'John Smith',
    company: 'Acme Corp',
    email: 'john@acme.com',
    phone: '+1 555-0101',
    linkedinUrl: 'https://linkedin.com/in/johnsmith',
    websiteUrl: 'https://acme.com',
    status: 'Contacted',
    priority: 'High',
    offering: 'Enterprise Solutions',
    score: 85
  };

  const offerings = [
    { id: 'enterprise', name: 'Enterprise Solutions', followUpCount: 3 },
    { id: 'saas', name: 'SaaS Products', followUpCount: 2 },
    { id: 'consulting', name: 'Consulting Services', followUpCount: 4 }
  ];

  const generateEmailFromTemplate = () => {
    const offering = offerings.find(o => o.id === selectedOffering);
    setEmailBody(`Hi ${prospect.name},

I hope this email finds you well. I noticed that ${prospect.company} might benefit from our ${offering?.name}.

[Your value proposition here]

Would you be open to a quick 15-minute call to discuss how we can help?

Best regards,
Your Name`);
  };

  const generateWithAI = () => {
    // Simulate AI generation
    setEmailBody(`Hi ${prospect.name},

${aiPrompt ? `Based on your request: "${aiPrompt}"` : 'AI-generated personalized message based on prospect data'}

I've been following ${prospect.company}'s growth and believe our Enterprise Solutions could significantly impact your operations.

Would love to schedule a brief call to explore potential synergies.

Best,
Your Name`);
    setShowAIPrompt(false);
    setAiPrompt('');
  };

  const generateScriptWithAI = () => {
    setCallScript(`Call Script for ${prospect.name} at ${prospect.company}

OPENING (5 seconds):
"Hi ${prospect.name}, this is [Your Name] from [Company]. Do you have a quick minute?"

VALUE PROPOSITION (15 seconds):
"I noticed ${prospect.company} is in the [industry] space. We help similar companies [specific benefit]. 

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
              <Link href="/prospects">
                <motion.button
                  whileHover={{ x: -5 }}
                  className="p-2 rounded-lg hover:bg-white/5"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </motion.button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">{prospect.name}</h1>
                <p className="text-sm text-gray-400">{prospect.company}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                Score: {prospect.score}
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-slate-900/50 border border-white/10 p-1 mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
              <User className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="email" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </TabsTrigger>
            <TabsTrigger value="calling" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
              <Phone className="w-4 h-4 mr-2" />
              Calling
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600">
              <Activity className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                  <CardHeader className="border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">Contact Information</CardTitle>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setIsEditing(!isEditing)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white"
                      >
                        {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                      </motion.button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {isEditing ? (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-400 text-sm mb-2 block">Name</Label>
                          <Input defaultValue={prospect.name} className="bg-slate-800/50 border-white/10 text-white" />
                        </div>
                        <div>
                          <Label className="text-gray-400 text-sm mb-2 block">Company</Label>
                          <Input defaultValue={prospect.company} className="bg-slate-800/50 border-white/10 text-white" />
                        </div>
                        <div>
                          <Label className="text-gray-400 text-sm mb-2 block">Email</Label>
                          <Input defaultValue={prospect.email} className="bg-slate-800/50 border-white/10 text-white" />
                        </div>
                        <div>
                          <Label className="text-gray-400 text-sm mb-2 block">Phone</Label>
                          <Input defaultValue={prospect.phone} className="bg-slate-800/50 border-white/10 text-white" />
                        </div>
                        <div>
                          <Label className="text-gray-400 text-sm mb-2 block">LinkedIn URL</Label>
                          <Input defaultValue={prospect.linkedinUrl} className="bg-slate-800/50 border-white/10 text-white" />
                        </div>
                        <div>
                          <Label className="text-gray-400 text-sm mb-2 block">Website URL</Label>
                          <Input defaultValue={prospect.websiteUrl} className="bg-slate-800/50 border-white/10 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-cyan-400" />
                          <div>
                            <Label className="text-gray-400 text-xs">Email</Label>
                            <p className="text-white text-sm">{prospect.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-blue-400" />
                          <div>
                            <Label className="text-gray-400 text-xs">Phone</Label>
                            <p className="text-white text-sm">{prospect.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Link2 className="w-4 h-4 text-purple-400" />
                          <div>
                            <Label className="text-gray-400 text-xs">LinkedIn</Label>
                            <a href={prospect.linkedinUrl} target="_blank" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-sm">
                              View Profile <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Building className="w-4 h-4 text-green-400" />
                          <div>
                            <Label className="text-gray-400 text-xs">Website</Label>
                            <a href={prospect.websiteUrl} target="_blank" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-sm">
                              Visit Site <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                  <CardHeader className="border-b border-white/10">
                    <CardTitle className="text-white">Notes</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {isEditing ? (
                      <Textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="bg-slate-800/50 border-white/10 text-white min-h-[100px]"
                      />
                    ) : (
                      <p className="text-gray-300">{notes}</p>
                    )}
                    
                    <Separator className="my-4 bg-white/10" />
                    
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a new note..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className="flex-1 bg-slate-800/50 border-white/10 text-white"
                      />
                      <Button
                        onClick={() => {
                          if (newNote.trim()) {
                            setNotes(notes + '\n\n' + newNote);
                            setNewNote('');
                          }
                        }}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                  <CardHeader className="border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-sm">Next Steps</CardTitle>
                      <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI Generate
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {nextSteps.map((step, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{step}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                  <CardHeader className="border-b border-white/10">
                    <CardTitle className="text-white text-sm">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2">
                    {[
                      { icon: Mail, label: 'Send Email', color: 'from-blue-500 to-blue-600', tab: 'email' },
                      { icon: Phone, label: 'Call Now', color: 'from-green-500 to-green-600', tab: 'calling' },
                      { icon: Calendar, label: 'Schedule Meeting', color: 'from-purple-500 to-purple-600', tab: 'overview' }
                    ].map((action) => (
                      <motion.button
                        key={action.label}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab(action.tab)}
                        className={`w-full p-3 rounded-lg bg-gradient-to-r ${action.color} text-white text-sm font-medium flex items-center gap-2 shadow-lg`}
                      >
                        <action.icon className="w-4 h-4" />
                        {action.label}
                      </motion.button>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Email Tab */}
          <TabsContent value="email">
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader className="border-b border-white/10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Compose Email</CardTitle>
                  <div className="flex items-center gap-3">
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
                    <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white">
                      <FileText className="w-4 h-4 mr-2" />
                      Save Draft
                    </Button>
                    <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-600">
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Email Metadata */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-gray-400 mb-2 block">Select Offering</Label>
                    <Select value={selectedOffering} onValueChange={setSelectedOffering}>
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
                    <Label className="text-gray-400 mb-2 block">From</Label>
                    <Input 
                      placeholder="you@company.com"
                      defaultValue="sales@yourcompany.com"
                      className="bg-slate-800/50 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-400 mb-2 block">To</Label>
                    <Input 
                      value={prospect.email} 
                      readOnly 
                      className="bg-slate-800/50 border-white/10 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-gray-400 mb-2 block">Subject</Label>
                  <Input 
                    placeholder="Enter subject..."
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="bg-slate-800/50 border-white/10 text-white"
                  />
                </div>

                {/* Opening/First Email */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-gray-400">Opening Email</Label>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={generateEmailFromTemplate}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        Use Template
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => setShowAIPrompt(!showAIPrompt)}
                        className="text-cyan-400 hover:text-cyan-300"
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        Generate with AI
                      </Button>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {showAIPrompt && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-3 p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30"
                      >
                        <Label className="text-white text-sm mb-2 block">AI Prompt</Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="E.g., Focus on cost savings and ROI..."
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            className="flex-1 bg-slate-800/50 border-white/10 text-white"
                          />
                          <Button onClick={generateWithAI} size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-600">
                            Generate
                          </Button>
                          <Button onClick={() => setShowAIPrompt(false)} size="sm" variant="ghost">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Textarea 
                    placeholder="Type your opening message..."
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="bg-slate-800/50 border-white/10 text-white min-h-[150px]"
                  />
                </div>

                <Separator className="bg-white/10" />

                {/* Follow-up Templates */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-cyan-400" />
                    Follow-up Emails ({offerings.find(o => o.id === selectedOffering)?.followUpCount || 0})
                  </h3>
                  
                  {Array.from({ length: offerings.find(o => o.id === selectedOffering)?.followUpCount || 0 }).map((_, index) => (
                    <Card key={index} className="border-white/10 bg-slate-800/30">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-white text-sm">Follow-up #{index + 1}</CardTitle>
                          <Button size="sm" variant="ghost" className="text-cyan-400 hover:text-cyan-300 text-xs">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Generate
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Textarea
                          placeholder={`Follow-up email ${index + 1}...`}
                          value={followUpBodies[index] || ''}
                          onChange={(e) => {
                            const newBodies = [...followUpBodies];
                            newBodies[index] = e.target.value;
                            setFollowUpBodies(newBodies);
                          }}
                          className="bg-slate-800/50 border-white/10 text-white min-h-[120px]"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Separator className="bg-white/10" />

                {/* Closing Template */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-gray-400">Closing Email</Label>
                    <Button size="sm" variant="ghost" className="text-cyan-400 hover:text-cyan-300">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Generate with AI
                    </Button>
                  </div>
                  <Textarea 
                    placeholder="Final closing message..."
                    value={closingBody}
                    onChange={(e) => setClosingBody(e.target.value)}
                    className="bg-slate-800/50 border-white/10 text-white min-h-[120px]"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calling Tab */}
          <TabsContent value="calling">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Call Control */}
              <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader className="border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Call Management</CardTitle>
                    <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-1">
                      <button
                        onClick={() => setCallingMode('automated')}
                        className={`px-3 py-1.5 rounded text-sm transition-all ${
                          callingMode === 'automated'
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <Zap className="w-3 h-3 inline mr-1" />
                        Automated
                      </button>
                      <button
                        onClick={() => setCallingMode('manual')}
                        className={`px-3 py-1.5 rounded text-sm transition-all ${
                          callingMode === 'manual'
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <Phone className="w-3 h-3 inline mr-1" />
                        Manual
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="text-center py-8">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                      {isCallActive ? (
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <Mic className="w-12 h-12 text-white" />
                        </motion.div>
                      ) : (
                        <User className="w-12 h-12 text-white" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{prospect.name}</h3>
                    <p className="text-gray-400">{prospect.phone}</p>
                    {isCallActive && (
                      <Badge className="mt-3 bg-green-500/20 text-green-400">
                        Call in Progress • 00:45
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3">
                    {!isCallActive ? (
                      <>
                        <Button 
                          onClick={() => setIsCallActive(true)}
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 py-6 text-lg"
                        >
                          <PlayCircle className="w-5 h-5 mr-2" />
                          Start Call
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setShowScriptAI(!showScriptAI)}
                          className="w-full bg-white/5 border-white/10 text-white"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          {callScript ? 'Regenerate Script' : 'Generate Script with AI'}
                        </Button>
                      </>
                    ) : (
                      <Button 
                        onClick={() => {
                          setIsCallActive(false);
                          setCallTranscript('John: Hello?\nYou: Hi John, this is [Name] from [Company]...\nJohn: Oh yes, what can I do for you?\nYou: I wanted to discuss our Enterprise Solutions...');
                          setCallSummary('Call Duration: 4 minutes 23 seconds\nOutcome: Interested - Scheduled follow-up demo\nKey Points: Discussed pricing, enterprise features, and implementation timeline\nNext Steps: Send pricing deck and schedule demo for next week');
                        }}
                        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 py-6 text-lg"
                      >
                        <StopCircle className="w-5 h-5 mr-2" />
                        End Call
                      </Button>
                    )}
                  </div>

                  <AnimatePresence>
                    {showScriptAI && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30"
                      >
                        <Label className="text-white text-sm mb-2 block">Script Focus (Optional)</Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="E.g., Focus on cost savings..."
                            value={scriptPrompt}
                            onChange={(e) => setScriptPrompt(e.target.value)}
                            className="flex-1 bg-slate-800/50 border-white/10 text-white"
                          />
                          <Button onClick={generateScriptWithAI} size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-600">
                            Generate
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>

              {/* Call Script & Notes */}
              <div className="space-y-6">
                {callScript && (
                  <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                    <CardHeader className="border-b border-white/10">
                      <CardTitle className="text-white text-sm">Call Script</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                        {callScript}
                      </pre>
                    </CardContent>
                  </Card>
                )}

                <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                  <CardHeader className="border-b border-white/10">
                    <CardTitle className="text-white text-sm">Call Notes</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-3">
                    <Textarea
                      placeholder="Add notes during or after the call..."
                      value={callNotes}
                      onChange={(e) => setCallNotes(e.target.value)}
                      className="bg-slate-800/50 border-white/10 text-white min-h-[120px]"
                    />
                    <Button size="sm" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Save Note
                    </Button>
                  </CardContent>
                </Card>

                {callTranscript && (
                  <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                    <CardHeader className="border-b border-white/10">
                      <CardTitle className="text-white text-sm">Call Transcript</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap">{callTranscript}</pre>
                    </CardContent>
                  </Card>
                )}

                {callSummary && (
                  <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
                    <CardHeader className="border-b border-white/10 bg-gradient-to-r from-green-500/10 to-green-600/10">
                      <CardTitle className="text-white text-sm flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        Call Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap">{callSummary}</pre>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-white">Activity Log</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {activityLogs.map((log, index) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4 p-4 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                          <Activity className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-semibold text-white">{log.action}</h4>
                          <Badge className="bg-slate-700 text-gray-300 text-xs">{log.time}</Badge>
                        </div>
                        <p className="text-sm text-gray-400 mb-1">{log.details}</p>
                        <p className="text-xs text-gray-500">by {log.user}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
