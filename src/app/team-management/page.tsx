'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Shield, UserCheck } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { UserRole } from '@/types/team-management';
import SalesRepView from '@/components/team-management/SalesRepView';
import SalesManagerView from '@/components/team-management/SalesManagerView';
import ChatAssistant from '@/components/chat-assistant';

export default function TeamManagementPage() {
  const [userRole, setUserRole] = useState<UserRole>('sales_rep');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-500/30 to-blue-600/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-500/30 to-pink-600/30 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      {/* Header */}
      <div className="border-b border-white/10 bg-slate-900/30 backdrop-blur-2xl sticky top-0 z-40 shadow-2xl">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-white/10 bg-slate-800/50 hover:border-cyan-500/50 hover:bg-slate-800/80 backdrop-blur-xl"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-300" />
                  </Button>
                </motion.div>
              </Link>

              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-lg blur opacity-75"></div>
                    <div className="relative p-2 bg-slate-900 rounded-lg">
                      <Users className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Team Management
                    </h1>
                    <p className="text-xs text-gray-500">
                      {userRole === 'sales_rep' ? 'Personal Dashboard' : 'Team Overview & Analytics'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Role Switcher */}
              <div className="flex items-center gap-2 p-1 bg-slate-800/50 rounded-xl border border-white/10">
                <Button
                  size="sm"
                  onClick={() => setUserRole('sales_rep')}
                  className={`${
                    userRole === 'sales_rep'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'bg-transparent text-gray-400 hover:text-white hover:bg-slate-700/50'
                  } transition-all`}
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Sales Rep
                </Button>
                <Button
                  size="sm"
                  onClick={() => setUserRole('sales_manager')}
                  className={`${
                    userRole === 'sales_manager'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                      : 'bg-transparent text-gray-400 hover:text-white hover:bg-slate-700/50'
                  } transition-all`}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Manager
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        {userRole === 'sales_rep' ? (
          <SalesRepView />
        ) : (
          <SalesManagerView />
        )}
      </div>

      <ChatAssistant />
    </div>
  );
}


