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
  Plus,
  Edit,
  Trash2,
  Zap,
  FileText,
  Copy,
  Eye,
  Search,
  Filter,
  Mail,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function TemplatesPage() {
  const [showAddTemplate, setShowAddTemplate] = useState(false);
  const [showEditTemplate, setShowEditTemplate] = useState(false);
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [selectedOffering, setSelectedOffering] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [aiPrompt, setAiPrompt] = useState('');
  
  const [templateForm, setTemplateForm] = useState({
    name: '',
    offering: 'enterprise',
    type: 'outreach',
    subject: '',
    body: ''
  });

  const offerings = [
    { id: 'enterprise', name: 'Enterprise Solutions' },
    { id: 'saas', name: 'SaaS Products' },
    { id: 'consulting', name: 'Consulting Services' }
  ];

  // Templates data
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Enterprise - Outreach',
      offering: 'enterprise',
      type: 'outreach',
      subject: 'Transform Your Operations with Enterprise Solutions',
      body: 'Hi {{name}},\n\nI noticed {{company}} is expanding rapidly. Our Enterprise Solutions have helped similar companies reduce costs by 30%.\n\nWould you be open to a quick 15-minute call?\n\nBest regards,\n{{sender}}',
      aiGenerated: true,
      stats: { sent: 342, opened: 256, replied: 89 },
      lastUsed: '2 hours ago'
    },
    {
      id: 2,
      name: 'Enterprise - Follow-up 1',
      offering: 'enterprise',
      type: 'followup',
      subject: 'Following up on Enterprise Solutions',
      body: 'Hi {{name}},\n\nI wanted to follow up on my previous email about how we can help {{company}}.\n\nOur clients typically see ROI within 3 months.\n\nAre you available for a brief call this week?\n\nBest,\n{{sender}}',
      aiGenerated: false,
      stats: { sent: 256, opened: 178, replied: 67 },
      lastUsed: '5 hours ago'
    },
    {
      id: 3,
      name: 'Enterprise - Closing',
      offering: 'enterprise',
      type: 'closing',
      subject: 'Final thoughts on our proposal',
      body: 'Hi {{name}},\n\nThank you for considering our proposal. We\'re excited about the possibility of working with {{company}}.\n\nIs there anything else you need from us to move forward?\n\nLooking forward to hearing from you,\n{{sender}}',
      aiGenerated: false,
      stats: { sent: 89, opened: 67, replied: 34 },
      lastUsed: '1 day ago'
    },
    {
      id: 4,
      name: 'SaaS - Outreach',
      offering: 'saas',
      type: 'outreach',
      subject: 'Streamline {{company}}\'s Workflow with Our SaaS',
      body: 'Hi {{name}},\n\nI came across {{company}} and thought our SaaS platform could significantly improve your team\'s productivity.\n\nWe\'ve helped companies like yours save 20+ hours per week.\n\nInterested in seeing a demo?\n\nBest,\n{{sender}}',
      aiGenerated: true,
      stats: { sent: 412, opened: 278, replied: 98 },
      lastUsed: '3 hours ago'
    },
    {
      id: 5,
      name: 'SaaS - Follow-up 1',
      offering: 'saas',
      type: 'followup',
      subject: 'Quick follow-up about {{company}}',
      body: 'Hi {{name}},\n\nJust checking in to see if you had a chance to review our SaaS solution.\n\nI\'d love to show you how it works in a quick 10-minute demo.\n\nWhat does your schedule look like this week?\n\nBest regards,\n{{sender}}',
      aiGenerated: true,
      stats: { sent: 324, opened: 215, replied: 76 },
      lastUsed: '6 hours ago'
    },
    {
      id: 6,
      name: 'Consulting - Outreach',
      offering: 'consulting',
      type: 'outreach',
      subject: 'Expert Consulting for {{company}}',
      body: 'Hi {{name}},\n\nI specialize in helping companies like {{company}} optimize their operations.\n\nI\'d love to share some strategies that could benefit your team.\n\nWould you be open to a conversation?\n\nBest,\n{{sender}}',
      aiGenerated: false,
      stats: { sent: 234, opened: 156, replied: 54 },
      lastUsed: '4 hours ago'
    }
  ]);

  const filteredTemplates = selectedOffering === 'all' 
    ? templates 
    : templates.filter(t => t.offering === selectedOffering);

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'outreach': return 'bg-cyan-500/20 text-cyan-400';
      case 'followup': return 'bg-purple-500/20 text-purple-400';
      case 'closing': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleAddTemplate = () => {
    const newTemplate = {
      id: templates.length + 1,
      name: templateForm.name,
      offering: templateForm.offering,
      type: templateForm.type,
      subject: templateForm.subject,
      body: templateForm.body,
      aiGenerated: false,
      stats: { sent: 0, opened: 0, replied: 0 },
      lastUsed: 'Never'
    };
    setTemplates([...templates, newTemplate]);
    setShowAddTemplate(false);
    setTemplateForm({ name: '', offering: 'enterprise', type: 'outreach', subject: '', body: '' });
  };

  const handleEditTemplate = () => {
    if (selectedTemplate) {
      setTemplates(templates.map(t => 
        t.id === selectedTemplate.id 
          ? { ...t, ...templateForm, aiGenerated: false } 
          : t
      ));
      setShowEditTemplate(false);
      setSelectedTemplate(null);
    }
  };

  const handleDeleteTemplate = (id: number) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  const handleGenerateWithAI = () => {
    // Simulate AI generation
    const aiGeneratedBody = `Hi {{name}},\n\nBased on your prompt: "${aiPrompt}"\n\n[AI-generated personalized content for ${templateForm.offering}]\n\nI believe our ${templateForm.offering} offering can help {{company}} achieve significant results.\n\nWould you be interested in learning more?\n\nBest regards,\n{{sender}}`;
    
    setTemplateForm({ ...templateForm, body: aiGeneratedBody });
    setShowAIPrompt(false);
    setAiPrompt('');
  };

  const handleDuplicate = (template: any) => {
    const duplicated = {
      ...template,
      id: templates.length + 1,
      name: `${template.name} (Copy)`,
      stats: { sent: 0, opened: 0, replied: 0 },
      lastUsed: 'Never'
    };
    setTemplates([...templates, duplicated]);
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
              <Link href="/cold-mailing">
                <motion.button
                  whileHover={{ x: -5 }}
                  className="p-2 rounded-lg hover:bg-white/5"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </motion.button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Email Templates</h1>
                <p className="text-sm text-gray-400">Manage your email templates across all offerings</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedOffering} onValueChange={setSelectedOffering}>
                <SelectTrigger className="w-48 bg-slate-800/50 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Offerings</SelectItem>
                  {offerings.map(offering => (
                    <SelectItem key={offering.id} value={offering.id}>
                      {offering.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={() => setShowAddTemplate(true)}
                className="bg-gradient-to-r from-cyan-500 to-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Template
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-6">
        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl hover:border-cyan-500/30 transition-all h-full flex flex-col">
                <CardHeader className="border-b border-white/10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg mb-2">{template.name}</CardTitle>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={getTypeColor(template.type)}>
                          {template.type.charAt(0).toUpperCase() + template.type.slice(1)}
                        </Badge>
                        {template.aiGenerated && (
                          <Badge className="bg-purple-500/20 text-purple-400">
                            <Zap className="w-3 h-3 mr-1" />
                            AI
                          </Badge>
                        )}
                        <Badge className="bg-slate-800 text-gray-300 text-xs">
                          {offerings.find(o => o.id === template.offering)?.name}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    <strong className="text-white">Subject:</strong> {template.subject}
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <div className="flex-1 mb-4">
                    <Label className="text-gray-400 text-xs mb-2 block">Preview</Label>
                    <div className="p-3 rounded-lg bg-slate-800/30 border border-white/5 text-sm text-gray-300 line-clamp-4 whitespace-pre-wrap">
                      {template.body}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-lg bg-slate-800/20">
                    <div className="text-center">
                      <p className="text-lg font-bold text-white">{template.stats.sent}</p>
                      <p className="text-xs text-gray-400">Sent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-400">{template.stats.opened}</p>
                      <p className="text-xs text-gray-400">Opened</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-cyan-400">{template.stats.replied}</p>
                      <p className="text-xs text-gray-400">Replied</p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mb-3">
                    Last used: {template.lastUsed}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedTemplate(template);
                        setTemplateForm({
                          name: template.name,
                          offering: template.offering,
                          type: template.type,
                          subject: template.subject,
                          body: template.body
                        });
                        setShowEditTemplate(true);
                      }}
                      className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDuplicate(template)}
                      className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Duplicate
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-semibold text-white mb-2">No templates found</h3>
              <p className="text-gray-400 mb-6">Create your first template to get started</p>
              <Button 
                onClick={() => setShowAddTemplate(true)}
                className="bg-gradient-to-r from-cyan-500 to-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Template Dialog */}
      <Dialog open={showAddTemplate} onOpenChange={setShowAddTemplate}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">Create New Template</DialogTitle>
            <DialogDescription className="text-gray-400">
              Design a new email template for your campaigns
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300 mb-2 block">Template Name *</Label>
                <Input
                  value={templateForm.name}
                  onChange={(e) => setTemplateForm({...templateForm, name: e.target.value})}
                  placeholder="e.g., Enterprise - Follow-up 2"
                  className="bg-slate-800/50 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">Offering *</Label>
                <Select value={templateForm.offering} onValueChange={(val) => setTemplateForm({...templateForm, offering: val})}>
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
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">Template Type *</Label>
              <Select value={templateForm.type} onValueChange={(val) => setTemplateForm({...templateForm, type: val})}>
                <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="outreach">Outreach (First Contact)</SelectItem>
                  <SelectItem value="followup">Follow-up</SelectItem>
                  <SelectItem value="closing">Closing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">Email Subject *</Label>
              <Input
                value={templateForm.subject}
                onChange={(e) => setTemplateForm({...templateForm, subject: e.target.value})}
                placeholder="e.g., Transform Your Operations with {{company}}"
                className="bg-slate-800/50 border-white/10 text-white"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-gray-300">Email Body *</Label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowAIPrompt(true)}
                  className="bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Generate with AI
                </Button>
              </div>
              <Textarea
                value={templateForm.body}
                onChange={(e) => setTemplateForm({...templateForm, body: e.target.value})}
                placeholder="Write your email template here. Use {{name}}, {{company}}, {{sender}} for personalization"
                className="bg-slate-800/50 border-white/10 text-white min-h-[200px] font-mono text-sm"
              />
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-400 mb-1">Personalization Tags</p>
                  <p className="text-xs text-gray-400">
                    Use <code className="bg-slate-800/50 px-1 py-0.5 rounded text-cyan-400">{'{{name}}'}</code>, 
                    <code className="bg-slate-800/50 px-1 py-0.5 rounded text-cyan-400 ml-1">{'{{company}}'}</code>, 
                    <code className="bg-slate-800/50 px-1 py-0.5 rounded text-cyan-400 ml-1">{'{{sender}}'}</code> for dynamic content
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAddTemplate(false);
                  setTemplateForm({ name: '', offering: 'enterprise', type: 'outreach', subject: '', body: '' });
                }}
                className="bg-white/5 border-white/10 text-white"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddTemplate}
                disabled={!templateForm.name || !templateForm.subject || !templateForm.body}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 disabled:opacity-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Template Dialog */}
      <Dialog open={showEditTemplate} onOpenChange={setShowEditTemplate}>
        <DialogContent className="bg-slate-900 border-white/10 max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">Edit Template</DialogTitle>
            <DialogDescription className="text-gray-400">
              Update your email template
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300 mb-2 block">Template Name *</Label>
                <Input
                  value={templateForm.name}
                  onChange={(e) => setTemplateForm({...templateForm, name: e.target.value})}
                  className="bg-slate-800/50 border-white/10 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">Offering *</Label>
                <Select value={templateForm.offering} onValueChange={(val) => setTemplateForm({...templateForm, offering: val})}>
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
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">Template Type *</Label>
              <Select value={templateForm.type} onValueChange={(val) => setTemplateForm({...templateForm, type: val})}>
                <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="outreach">Outreach (First Contact)</SelectItem>
                  <SelectItem value="followup">Follow-up</SelectItem>
                  <SelectItem value="closing">Closing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">Email Subject *</Label>
              <Input
                value={templateForm.subject}
                onChange={(e) => setTemplateForm({...templateForm, subject: e.target.value})}
                className="bg-slate-800/50 border-white/10 text-white"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-gray-300">Email Body *</Label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowAIPrompt(true)}
                  className="bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Regenerate with AI
                </Button>
              </div>
              <Textarea
                value={templateForm.body}
                onChange={(e) => setTemplateForm({...templateForm, body: e.target.value})}
                className="bg-slate-800/50 border-white/10 text-white min-h-[200px] font-mono text-sm"
              />
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowEditTemplate(false);
                  setSelectedTemplate(null);
                }}
                className="bg-white/5 border-white/10 text-white"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleEditTemplate}
                className="bg-gradient-to-r from-cyan-500 to-blue-600"
              >
                <Edit className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Prompt Dialog */}
      <Dialog open={showAIPrompt} onOpenChange={setShowAIPrompt}>
        <DialogContent className="bg-slate-900 border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              Generate with AI
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Describe what you want the email to focus on
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label className="text-gray-300 mb-2 block">AI Prompt</Label>
              <Textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g., Focus on cost savings and ROI, mention recent industry trends, keep tone professional but friendly"
                className="bg-slate-800/50 border-white/10 text-white min-h-[120px]"
              />
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-sm text-purple-400 font-medium mb-1">AI will generate content based on:</p>
              <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
                <li>Your prompt instructions</li>
                <li>Selected offering: {offerings.find(o => o.id === templateForm.offering)?.name}</li>
                <li>Template type: {templateForm.type}</li>
              </ul>
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAIPrompt(false);
                  setAiPrompt('');
                }}
                className="bg-white/5 border-white/10 text-white"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleGenerateWithAI}
                disabled={!aiPrompt.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-600 disabled:opacity-50"
              >
                <Zap className="w-4 h-4 mr-2" />
                Generate
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Chat Assistant */}
      <ChatAssistant />
    </div>
  );
}

