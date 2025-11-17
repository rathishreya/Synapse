'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Target, 
  LineChart, 
  Mic, 
  Users, 
  Zap, 
  TrendingUp, 
  MessageSquare,
  Bot,
  Search,
  Mail,
  BarChart3,
  Phone,
  ArrowRight,
  Check,
  Sparkles,
  LinkedinIcon,
  Twitter,
  Youtube
} from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Hero3D = dynamic(() => import('@/components/hero-3d'), { ssr: false });

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
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
      <nav className="fixed top-0 w-full z-50 bg-card/60 backdrop-blur-xl border-b border-border shadow-lg shadow-primary/5">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SalesAI
            </span>
            <Badge variant="secondary" className="ml-2">EZ Synapse</Badge>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition">Features</Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition">How It Works</Link>
            <Link href="#agents" className="text-muted-foreground hover:text-foreground transition">AI Agents</Link>
            <Link href="/auth" className="text-muted-foreground hover:text-foreground transition">Login</Link>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300" asChild>
              <Link href="/auth">Sign In</Link>
            </Button>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300" asChild>
              <Link href="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* 3D Background */}
        <div className="absolute inset-0 opacity-30">
          <Hero3D />
        </div>
        
        {/* Premium Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/30 to-primary/10 rounded-full filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-secondary/30 to-secondary/10 rounded-full filter blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-5xl mx-auto text-center"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <Badge className="bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 px-6 py-2 text-sm font-medium shadow-lg shadow-primary/10 backdrop-blur-sm">
                🚀 AI-Powered Sales Intelligence Platform
              </Badge>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent leading-tight tracking-tight"
            >
              Automate Your Sales — From Prospecting to Closing with AI
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-light"
            >
              SalesAI (EZ Synapse) is an all-in-one AI-powered Sales CRM + ERP that automates lead generation, 
              outreach, forecasting, and analytics through intelligent agents.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 px-10 py-7 text-lg font-semibold group" asChild>
                <Link href="/auth">
                  Book a Demo <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-10 py-7 text-lg font-semibold border-2 border-border hover:border-primary/40 hover:bg-primary/5 backdrop-blur-sm transition-all duration-300" asChild>
                <Link href="/auth">Start Free Trial</Link>
              </Button>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="mt-12 text-sm text-muted-foreground"
            >
              <p>✨ Trusted by 500+ B2B Teams</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">✨ Core Features</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
              Everything Your Sales Team Needs — <br/><span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">Powered by AI</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">Unified platform for modern sales teams</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: "Lead Intelligence",
                description: "Automated scraping, enrichment, and scoring with ML-powered insights",
                color: "from-primary to-secondary"
              },
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "Agentic Outreach",
                description: "AI-personalized, multi-channel campaigns across email, LinkedIn, WhatsApp",
                color: "from-secondary to-primary"
              },
              {
                icon: <LineChart className="w-8 h-8" />,
                title: "Forecasting & Insights",
                description: "Predictive dashboards and sentiment analysis for data-driven decisions",
                color: "from-primary/80 to-secondary/80"
              },
              {
                icon: <Mic className="w-8 h-8" />,
                title: "AI Voice & Video",
                description: "Whisper AI summaries + Loom video outreach integration",
                color: "from-secondary/80 to-primary/80"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:transform hover:scale-105 hover:-translate-y-2 h-full shadow-xl hover:shadow-2xl hover:shadow-primary/20 group">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 text-white shadow-lg shadow-primary/30 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-110`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-foreground text-xl font-bold mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground font-light leading-relaxed">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background"></div>
        <div className="container mx-auto px-6 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/30">🔄 Process</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">How It Works</h2>
            <p className="text-xl text-muted-foreground font-light">Five simple steps to sales automation</p>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            {[
              { step: 1, title: "Setup preferences & lead filters", icon: <Zap className="w-6 h-6" /> },
              { step: 2, title: "AI scrapes and enriches leads", icon: <Search className="w-6 h-6" /> },
              { step: 3, title: "Smart outreach via email, LinkedIn, WhatsApp", icon: <Mail className="w-6 h-6" /> },
              { step: 4, title: "AI tracks opens, replies, and engagement", icon: <BarChart3 className="w-6 h-6" /> },
              { step: 5, title: "Forecasts and insights auto-update dashboards", icon: <TrendingUp className="w-6 h-6" /> }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="flex gap-6 mb-8 items-start relative"
              >
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-primary/40 group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                </div>
                <Card className="flex-1 bg-card/70 backdrop-blur-sm border-border hover:border-primary/40 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group hover:scale-105">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">{item.icon}</div>
                    <CardTitle className="text-foreground text-lg font-bold">{item.title}</CardTitle>
                  </CardHeader>
                </Card>
                {index < 4 && (
                  <div className="absolute left-9 w-1 h-8 bg-gradient-to-b from-primary via-secondary to-primary mt-20 z-0 rounded-full"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intelligent Dashboards Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">📊 Analytics</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">Intelligent Dashboards</h2>
            <p className="text-xl text-muted-foreground font-light">Real-time insights at your fingertips</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Lead Scoring", value: "87%", change: "+12%", icon: <Target className="w-6 h-6" /> },
              { title: "Conversion Rate", value: "34%", change: "+8%", icon: <TrendingUp className="w-6 h-6" /> },
              { title: "Engagement", value: "2.4K", change: "+24%", icon: <Users className="w-6 h-6" /> },
              { title: "Revenue", value: "$124K", change: "+18%", icon: <LineChart className="w-6 h-6" /> }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Card className="bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm border-border hover:border-primary/40 relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl group-hover:blur-2xl transition-all"></div>
                  <CardHeader className="relative">
                    <div className="flex justify-between items-start">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary group-hover:scale-110 transition-transform">{metric.icon}</div>
                      <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/30 shadow-sm">
                        {metric.change}
                      </Badge>
                    </div>
                    <CardTitle className="text-4xl font-bold text-foreground mt-6 group-hover:text-primary transition-colors">{metric.value}</CardTitle>
                    <CardDescription className="text-muted-foreground font-light text-sm mt-2">{metric.title}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section id="agents" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background"></div>
        <div className="container mx-auto px-6 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/30">🤖 AI Workforce</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">Meet the AI Agents</h2>
            <p className="text-xl text-muted-foreground font-light">Your autonomous sales workforce</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Lead Scraper Agent",
                description: "Finds & enriches leads automatically from multiple sources",
                icon: <Search className="w-10 h-10" />,
                color: "from-primary to-secondary"
              },
              {
                name: "Outreach Agent",
                description: "Sends contextual, personalized AI messages across channels",
                icon: <Bot className="w-10 h-10" />,
                color: "from-secondary to-primary"
              },
              {
                name: "Analytics Agent",
                description: "Tracks KPIs and predicts conversions with ML models",
                icon: <Brain className="w-10 h-10" />,
                color: "from-primary/80 to-secondary/80"
              },
              {
                name: "Voice Agent",
                description: "Summarizes calls, MOMs, and transcripts automatically",
                icon: <Phone className="w-10 h-10" />,
                color: "from-secondary/80 to-primary/80"
              }
            ].map((agent, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="bg-card/60 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:transform hover:scale-105 hover:-translate-y-2 h-full group shadow-xl hover:shadow-2xl hover:shadow-primary/20">
                  <CardHeader className="text-center">
                    <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${agent.color} flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-2xl shadow-primary/40 group-hover:shadow-primary/60`}>
                      {agent.icon}
                    </div>
                    <CardTitle className="text-foreground text-xl font-bold mb-3 group-hover:text-primary transition-colors">{agent.name}</CardTitle>
                    <CardDescription className="text-muted-foreground font-light leading-relaxed">{agent.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/30">💬 Testimonials</Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground font-light">Trusted by sales teams worldwide</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                quote: "SalesAI replaced 5 of our sales tools — now we focus on closing, not admin.",
                author: "Sarah Johnson",
                role: "VP of Sales, TechCorp",
                rating: 5
              },
              {
                quote: "Our outreach reply rate jumped 3x after switching to AI-driven sequences.",
                author: "Michael Chen",
                role: "Sales Director, GrowthLabs",
                rating: 5
              },
              {
                quote: "The AI agents work 24/7. It's like having a team of 10 SDRs for the price of one.",
                author: "Emily Rodriguez",
                role: "Founder, SalesBoost",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <Card className="bg-card/70 backdrop-blur-sm border-border hover:border-primary/30 h-full shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105 group">
                  <CardHeader className="relative">
                    <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-2xl"></div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Sparkles key={i} className="w-5 h-5 text-secondary fill-secondary group-hover:scale-110 transition-transform" />
                      ))}
                    </div>
                    <CardDescription className="text-foreground text-lg mb-6 italic font-light leading-relaxed relative">
                      "{testimonial.quote}"
                    </CardDescription>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/40"></div>
                      <div>
                        <p className="text-foreground font-bold">{testimonial.author}</p>
                        <p className="text-muted-foreground text-sm font-light">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-secondary/20 to-transparent rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-8 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 px-6 py-2 text-sm font-medium shadow-lg shadow-primary/10 backdrop-blur-sm">
              🎯 Get Started Today
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-foreground leading-tight tracking-tight">
              Your Sales Team, <br/><span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">Supercharged by AI</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 font-light leading-relaxed">
              Stop juggling tools — let AI automate your sales growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-2xl shadow-primary/30 hover:shadow-3xl hover:shadow-primary/50 transition-all duration-300 px-12 py-8 text-lg font-semibold group" asChild>
                <Link href="/auth">
                  Book a Demo <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-12 py-8 text-lg font-semibold border-2 border-border hover:border-primary/40 hover:bg-primary/5 backdrop-blur-sm transition-all duration-300" asChild>
                <Link href="/auth">Start Free Trial</Link>
              </Button>
            </div>
            <p className="mt-10 text-muted-foreground flex items-center justify-center gap-2 text-lg">
              <Check className="w-6 h-6 text-secondary" />
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-xl border-t border-border py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-foreground font-bold mb-6 text-lg">Product</h3>
              <ul className="space-y-3">
                <li><Link href="#features" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-light">Features</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-light">Pricing</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-light">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-foreground font-bold mb-6 text-lg">Company</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-light">About</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-light">Careers</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-light">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-foreground font-bold mb-6 text-lg">Resources</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-light">Docs</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-light">Blog</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-light">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-foreground font-bold mb-6 text-lg">Legal</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-light">Privacy</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-light">Terms</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-light">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/30">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-foreground font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">SalesAI (EZ Synapse)</span>
            </div>
            
            <div className="flex gap-6">
              <Link href="#" className="p-3 rounded-xl bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110">
                <LinkedinIcon className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-3 rounded-xl bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-3 rounded-xl bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-10 text-muted-foreground text-sm font-light">
            © 2025 SalesAI (EZ Synapse). All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
