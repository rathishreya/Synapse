// Data Models for Team Management System

export type UserRole = 'sales_rep' | 'sales_manager' | 'admin';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';

export type LeadPriority = 'hot' | 'warm' | 'cold';

export type ActivityType = 'call' | 'email' | 'meeting' | 'note' | 'task' | 'follow_up';

export type DealStage = 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed';

// User Model
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  region?: string;
  team?: string;
  createdAt: Date;
}

// Lead Model
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  title?: string;
  status: LeadStatus;
  priority: LeadPriority;
  score: number; // 0-100
  source: string;
  assignedTo: string; // User ID
  createdAt: Date;
  updatedAt: Date;
  lastContactDate?: Date;
  nextFollowUpDate?: Date;
  estimatedValue?: number;
  region?: string;
  industry?: string;
  tags?: string[];
  customFields?: Record<string, any>;
}

// Activity/Contact History Model
export interface Activity {
  id: string;
  leadId: string;
  userId: string;
  type: ActivityType;
  subject: string;
  description: string;
  duration?: number; // in minutes
  outcome?: string;
  scheduledAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  metadata?: {
    emailId?: string;
    callRecordingUrl?: string;
    meetingLink?: string;
    attachments?: string[];
  };
}

// Task Model
export interface Task {
  id: string;
  title: string;
  description?: string;
  leadId?: string;
  assignedTo: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  dueDate: Date;
  completedAt?: Date;
  createdAt: Date;
  automatedFollowUp?: boolean;
}

// Deal/Pipeline Model
export interface Deal {
  id: string;
  name: string;
  leadId: string;
  stage: DealStage;
  value: number;
  probability: number; // 0-100
  expectedCloseDate: Date;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
  wonAt?: Date;
  lostAt?: Date;
  lostReason?: string;
  products?: string[];
}

// Performance Metrics Model
export interface PerformanceMetrics {
  userId: string;
  period: 'day' | 'week' | 'month' | 'quarter' | 'year';
  startDate: Date;
  endDate: Date;
  metrics: {
    leadsCreated: number;
    leadsContacted: number;
    leadsQualified: number;
    leadsConverted: number;
    callsMade: number;
    emailsSent: number;
    meetingsScheduled: number;
    meetingsCompleted: number;
    dealsWon: number;
    dealsLost: number;
    revenue: number;
    quota: number;
    quotaAchievement: number; // percentage
    averageDealSize: number;
    averageSalesCycle: number; // in days
    conversionRate: number; // percentage
    responseRate: number; // percentage
    activityScore: number; // 0-100
  };
}

// Team Performance Model
export interface TeamPerformance {
  teamId: string;
  period: 'day' | 'week' | 'month' | 'quarter' | 'year';
  startDate: Date;
  endDate: Date;
  members: {
    userId: string;
    metrics: PerformanceMetrics['metrics'];
    rank: number;
  }[];
  totalMetrics: PerformanceMetrics['metrics'];
  topPerformers: string[]; // User IDs
  atRiskDeals: string[]; // Deal IDs
  stalledDeals: string[]; // Deal IDs
}

// Assignment Rule Model
export interface AssignmentRule {
  id: string;
  name: string;
  enabled: boolean;
  priority: number;
  conditions: {
    field: string;
    operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'in_range';
    value: any;
  }[];
  assignTo: {
    type: 'user' | 'team' | 'round_robin' | 'skill_based' | 'workload_based';
    value?: string; // User ID or Team ID
  };
  createdAt: Date;
  updatedAt: Date;
}

// Alert Model
export interface Alert {
  id: string;
  type: 'stalled_deal' | 'at_risk_kpi' | 'missed_follow_up' | 'quota_risk' | 'high_value_lead';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  entityId: string; // Lead ID or Deal ID
  userId?: string; // Assigned user
  createdAt: Date;
  readAt?: Date;
  resolvedAt?: Date;
  metadata?: Record<string, any>;
}

// Comment/Note Model
export interface Comment {
  id: string;
  entityType: 'lead' | 'deal' | 'task';
  entityId: string;
  userId: string;
  content: string;
  mentions?: string[]; // User IDs
  attachments?: string[];
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

// Email Template Model
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: 'follow_up' | 'introduction' | 'proposal' | 'closing' | 'thank_you';
  variables: string[]; // e.g., {{firstName}}, {{companyName}}
  createdBy: string;
  createdAt: Date;
  lastUsed?: Date;
  useCount: number;
}

// Filter/View Model
export interface FilterView {
  id: string;
  name: string;
  type: 'leads' | 'deals' | 'activities';
  filters: {
    field: string;
    operator: string;
    value: any;
  }[];
  sorting: {
    field: string;
    direction: 'asc' | 'desc';
  };
  columns?: string[];
  isDefault?: boolean;
  isShared?: boolean;
  createdBy: string;
  createdAt: Date;
}

// Export Configuration
export interface ExportConfig {
  format: 'csv' | 'xlsx' | 'pdf';
  type: 'leads' | 'deals' | 'activities' | 'performance';
  filters?: FilterView['filters'];
  columns: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// Real-time Event
export interface RealtimeEvent {
  id: string;
  type: 'lead_created' | 'lead_updated' | 'deal_won' | 'activity_completed' | 'task_completed' | 'comment_added';
  userId: string;
  entityType: 'lead' | 'deal' | 'activity' | 'task';
  entityId: string;
  data: any;
  timestamp: Date;
}

// AI Suggestion Model
export interface AISuggestion {
  id: string;
  type: 'next_action' | 'email_content' | 'lead_score' | 'close_probability' | 'optimal_time';
  leadId?: string;
  dealId?: string;
  confidence: number; // 0-1
  suggestion: string;
  reasoning?: string;
  actionable: boolean;
  createdAt: Date;
  appliedAt?: Date;
  dismissedAt?: Date;
}

// Gamification Model
export interface Achievement {
  id: string;
  userId: string;
  type: 'milestone' | 'streak' | 'competition' | 'skill';
  name: string;
  description: string;
  points: number;
  icon: string;
  unlockedAt: Date;
}

export interface Leaderboard {
  period: 'day' | 'week' | 'month' | 'quarter';
  metric: 'revenue' | 'deals_won' | 'activities' | 'conversion_rate';
  entries: {
    rank: number;
    userId: string;
    value: number;
    change: number; // rank change from previous period
  }[];
  updatedAt: Date;
}


