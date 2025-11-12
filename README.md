# 🚀 SalesAI (EZ Synapse) - AI-Powered Sales Intelligence Platform

<div align="center">

![SalesAI Banner](https://img.shields.io/badge/SalesAI-EZ%20Synapse-6366f1?style=for-the-badge&logo=sparkles&logoColor=white)

**Automate Your Sales — From Prospecting to Closing with AI**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Latest-000000?style=flat)](https://ui.shadcn.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-ff0055?style=flat)](https://www.framer.com/motion/)

[Demo](#) • [Documentation](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

## ✨ Overview

SalesAI (EZ Synapse) is an **all-in-one AI-powered Sales CRM + ERP** platform that revolutionizes how B2B SaaS companies handle their sales pipeline. By leveraging intelligent AI agents, the platform automates lead generation, outreach, forecasting, and analytics — allowing sales teams to focus on what matters: **closing deals**.

### 🎯 Built For
- **B2B SaaS Companies**
- **Sales Managers & Directors**
- **Founders & Entrepreneurs**
- **Sales Development Representatives (SDRs)**

---

## 🌟 Key Features

### 🧠 **AI-Powered Intelligence**
- **Lead Intelligence**: Automated scraping, enrichment, and ML-powered scoring
- **Agentic Outreach**: AI-personalized, multi-channel campaigns
- **Predictive Analytics**: Forecasting dashboards with sentiment analysis
- **Voice & Video AI**: Whisper AI summaries and video outreach integration

### 🤖 **Autonomous AI Agents**
1. **Lead Scraper Agent** - Finds and enriches leads automatically
2. **Outreach Agent** - Sends contextual, personalized messages
3. **Analytics Agent** - Tracks KPIs and predicts conversions
4. **Voice Agent** - Summarizes calls, MOMs, and transcripts

### 📊 **Intelligent Dashboards**
- Real-time lead scoring
- Sales forecasting
- Engagement heatmaps
- Conversion funnels
- Channel performance tracking

---

## 🎨 User Experience Flow

### 1. **Landing Page**
- Futuristic hero section with **3D animations** (Three.js)
- Interactive gradient orbs and particle effects
- Comprehensive feature showcase
- Social proof and testimonials
- Clear CTAs: "Book a Demo" | "Start Free Trial"

### 2. **Authentication**
- Google OAuth integration
- Beautiful animated background with floating particles
- Email-based authentication option

### 3. **Multi-Step Onboarding**
A guided setup process with smooth animations:

#### **Step 1: Lead Generation**
- Choose between Manual Import or AI-Generated
- **Manual**: CSV upload with template
- **AI**: Configure criteria
  - Industry selection
  - Offerings (multi-select)
  - Category (B2B/B2C/B2B2C)
  - Company size
  - Location
  - Keywords
  - Data sources (LinkedIn, Apollo, Clay)
  - Scraping frequency

#### **Step 2: Outreach Configuration**
- Choose between Manual or AI Automated
- **AI Automated** includes:
  - Channel selection (Cold Calling, Email, LinkedIn, WhatsApp)
  - Follow-up strategy configuration
  - Primary goals selection
  - Template customization

#### **Step 3: Template Editor**
- Dynamic templates based on selected offerings
- Manual editing or AI-generated options
- Rich text editor with personalization variables

#### **Step 4: Summary & Launch**
- Review all configurations
- AI setup progress animation
- Automatic redirect to dashboard

### 4. **Dashboard**
Comprehensive command center featuring:
- **Key Metrics**: Total leads, conversion rate, revenue, active campaigns
- **AI Agent Status**: Real-time monitoring of all agents
- **Today's Activity**: Engagement metrics and statistics
- **Upcoming Tasks**: Schedule and reminders
- **Active Leads**: AI-scored and prioritized lead list
- **Analytics**: Conversion funnel and channel performance
- **Activity Timeline**: Complete activity log

---

## 🛠️ Tech Stack

### **Core Framework**
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 19** - Latest React features

### **Styling & UI**
- **Tailwind CSS v4** - Utility-first CSS with modern features
- **shadcn/ui** - Beautiful, accessible components
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icon library

### **Animations & 3D**
- **Framer Motion** - Production-ready motion library
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber

### **Forms & Data**
- **React Hook Form** - Performant form validation
- **Recharts** - Composable charting library

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Synapse
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
Synapse/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page with hero & features
│   │   ├── login/
│   │   │   └── page.tsx          # Authentication page
│   │   ├── onboarding/
│   │   │   └── page.tsx          # Multi-step onboarding flow
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Main dashboard
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   └── hero-3d.tsx           # 3D hero animation
│   └── lib/
│       └── utils.ts              # Utility functions
├── public/                        # Static assets
├── components.json               # shadcn/ui config
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript config
└── package.json                  # Dependencies
```

---

## 🎨 Design System

### **Color Palette**
- **Primary**: Indigo (`#6366f1`) → Violet (`#8b5cf6`)
- **Background**: Deep slate (`#020617`) with gradients
- **Accents**: Blue, Cyan, Purple, Pink
- **Text**: White (`#ffffff`) with slate variants for secondary

### **Typography**
- **Headings**: Bold, tracking-tight, gradient text
- **Body**: Geist Sans font family
- **Code**: Geist Mono font family

### **Animations**
- Smooth page transitions (Framer Motion)
- 3D sphere with particle effects (Three.js)
- Gradient orb animations
- Hover effects and micro-interactions

---

## 📋 Features Breakdown

### Landing Page Sections
1. ✅ **Navigation** - Sticky header with CTA buttons
2. ✅ **Hero** - 3D animated background with gradient orbs
3. ✅ **Core Features** - 4-column grid with icons
4. ✅ **How It Works** - 5-step visual timeline
5. ✅ **Intelligent Dashboards** - Metric cards with animations
6. ✅ **AI Agents** - 4 agent profiles with descriptions
7. ✅ **Testimonials** - 3-column carousel-style grid
8. ✅ **Final CTA** - Prominent call-to-action section
9. ✅ **Footer** - Links, social icons, legal

### Authentication
- ✅ Google OAuth integration
- ✅ Email authentication
- ✅ Animated background effects
- ✅ Form validation

### Onboarding Flow
- ✅ Welcome animation
- ✅ Progress indicator
- ✅ Multi-step form with validation
- ✅ Conditional logic (Manual vs AI)
- ✅ Dynamic template generation
- ✅ Summary and confirmation
- ✅ Smooth transitions between steps

### Dashboard
- ✅ Real-time metrics
- ✅ AI agent status monitoring
- ✅ Lead management with AI scoring
- ✅ Conversion funnel visualization
- ✅ Channel performance analytics
- ✅ Activity timeline
- ✅ Task management

---

## 🎯 Component Library

### Available shadcn/ui Components
- ✅ Button
- ✅ Card
- ✅ Input
- ✅ Select
- ✅ Checkbox
- ✅ Label
- ✅ Textarea
- ✅ Badge
- ✅ Separator
- ✅ Tabs
- ✅ Progress

### Custom Components
- ✅ Hero3D - Interactive 3D animation
- ✅ Animated backgrounds
- ✅ Metric cards
- ✅ Lead cards
- ✅ Activity items

---

## 🔧 Configuration

### Adding More shadcn Components

```bash
npx shadcn@latest add [component-name]
```

Examples:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add table
```

### Environment Variables

Create a `.env.local` file:

```env
# Authentication
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=your_database_url

# API Keys
OPENAI_API_KEY=your_openai_key
```

---

## 🚧 Roadmap

### Phase 1: MVP ✅
- [x] Landing page with animations
- [x] Authentication flow
- [x] Onboarding wizard
- [x] Basic dashboard

### Phase 2: Core Features 🔄
- [ ] Backend API integration
- [ ] Database setup (PostgreSQL)
- [ ] Real Google OAuth
- [ ] Lead scraping functionality
- [ ] Email integration
- [ ] LinkedIn API integration

### Phase 3: AI Features 📋
- [ ] OpenAI integration for templates
- [ ] Lead scoring ML model
- [ ] Sentiment analysis
- [ ] Voice transcription (Whisper)
- [ ] Predictive analytics

### Phase 4: Advanced Features 📋
- [ ] Multi-tenant support
- [ ] Team collaboration
- [ ] Advanced reporting
- [ ] Mobile app
- [ ] API for third-party integrations

---

## 📚 Documentation

### Key Pages

- **Landing**: `/` - Main marketing page
- **Login**: `/login` - Authentication
- **Onboarding**: `/onboarding` - Setup wizard
- **Dashboard**: `/dashboard` - Main app interface

### API Routes (To be implemented)

```
/api/auth/[...nextauth]  - Authentication
/api/leads               - Lead management
/api/outreach            - Campaign management
/api/analytics           - Analytics data
/api/agents              - AI agent status
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **shadcn** - For the beautiful UI components
- **Vercel** - For the deployment platform
- **Three.js Team** - For 3D graphics capabilities
- **Framer** - For Motion animation library

---

## 📞 Support

- 📧 Email: support@salesai-synapse.com
- 💬 Discord: [Join our community](#)
- 📖 Docs: [docs.salesai-synapse.com](#)
- 🐦 Twitter: [@SalesAI](#)

---

<div align="center">

**Built with ❤️ using Next.js, TypeScript, and AI**

[⬆ Back to Top](#-salesai-ez-synapse---ai-powered-sales-intelligence-platform)

</div>
