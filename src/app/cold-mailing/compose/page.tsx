'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ArrowLeft,
  Send,
  FileText,
  Sparkles,
  Paperclip
} from 'lucide-react';
import Link from 'next/link';

export default function ComposeEmailPage() {
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
                <h1 className="text-2xl font-bold text-white">Compose Email</h1>
                <p className="text-sm text-gray-400">Create a new outreach email</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-white/5 border-white/10 text-white">
                <FileText className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600">
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-6 max-w-4xl">
        <Card className="border-white/10 bg-slate-900/50 backdrop-blur-xl">
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300 mb-2 block">Select Offering</Label>
                <Select>
                  <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                    <SelectValue placeholder="Choose offering" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enterprise">Enterprise Solutions</SelectItem>
                    <SelectItem value="saas">SaaS Products</SelectItem>
                    <SelectItem value="consulting">Consulting Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300 mb-2 block">Template</Label>
                <Select>
                  <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                    <SelectValue placeholder="Choose template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="outreach">Outreach Template</SelectItem>
                    <SelectItem value="followup">Follow-up Template</SelectItem>
                    <SelectItem value="closing">Closing Template</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">To</Label>
              <Input 
                placeholder="recipient@company.com"
                className="bg-slate-800/50 border-white/10 text-white"
              />
            </div>

            <div>
              <Label className="text-gray-300 mb-2 block">Subject</Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter email subject..."
                  className="flex-1 bg-slate-800/50 border-white/10 text-white"
                />
                <Button size="sm" variant="outline" className="bg-white/5 border-white/10 text-white">
                  <Sparkles className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-gray-300">Message</Label>
                <Button size="sm" variant="ghost" className="text-cyan-400 hover:text-cyan-300">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Generate with AI
                </Button>
              </div>
              <Textarea 
                placeholder="Type your message..."
                className="bg-slate-800/50 border-white/10 text-white min-h-[300px]"
              />
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white">
                <Paperclip className="w-4 h-4 mr-2" />
                Attach File
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

