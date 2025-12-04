# 🛠️ Implementing the Acknowledgment Workflow in Visual Builder

## Quick Implementation Guide

This guide shows you exactly how to build the **recommended acknowledgment workflow** in your visual builder step-by-step.

---

## 🎯 Best Practice Workflow (Recommended)

We'll implement the **"Quick Win"** workflow - proven to convert 25-35% of acknowledgments into meetings.

---

## 📋 Step-by-Step Build Instructions

### Step 1: Create the Initial Outreach
```
1. Start with "Send an invite" or "Message"
2. Add delay: "Wait 2 days"
3. Add action: "Follow up message"
```

### Step 2: Add the Acknowledgment Condition
```
1. Click the "+" button after your follow-up message
2. Select "Add Condition (Branch)"
3. Choose "If user acknowledges / says yes"
4. When the dialog appears, choose "Build It Now"
```

### Step 3: Build the "YES" Path (Right Side)

**Immediate Response (Within 1 minute):**
```
1. Add delay: "Wait 0 hours" (immediate)
2. Add action: "Message"
3. Configure message:

Subject: Let's make this happen! 🎉

Message:
"Amazing, {{first_name}}! 🎉

I'm excited to show you how we can help with {{pain_point}}.

I've got availability:
• Tomorrow at 2pm
• Thursday at 10am  
• Friday at 3pm

Which works best? Or grab any time here: [calendar link]

Looking forward to it!

P.S. Here's a quick case study: [link]"
```

**First Follow-up (3 hours later):**
```
4. Add delay: "Wait 3 hours"
5. Add condition: "If viewed message"
   
   NO PATH (didn't view):
   6a. Add action: "Message"
   6b. Configure:
   
   "Hey {{first_name}},

   Haven't heard back - no worries!

   Would any of these help instead?
   1. 📧 Email with details
   2. 💬 Quick 10-min chat
   3. 📅 Pick a time: [calendar]

   What works better?"
   
   YES PATH (viewed):
   7a. Add action: "Send email"
   7b. Configure:
   
   "Hi {{first_name}},

   Just saw you viewed my message!
   
   Which time slot works best for you?
   Reply with a number:
   
   1. Tomorrow 2pm
   2. Thursday 10am
   3. Friday 3pm
   
   Talk soon!"
```

**Second Follow-up (Day 2):**
```
8. Add delay: "Wait 1 day"
9. Add action: "Message"
10. Configure:

"{{first_name}},

Quick share - we just helped {{similar_company}} achieve:
✓ 40% faster {{process}}
✓ 60% cost reduction
✓ 3x ROI in 6 months

They had the same challenges you mentioned.

Want to see how? [Calendar link]"
```

**Final Follow-up (Day 4):**
```
11. Add delay: "Wait 2 days"
12. Add action: "Message"
13. Configure:

"{{first_name}},

Last check-in - still interested?

I don't want to keep bugging you if timing isn't right.

If yes: [Calendar link]
If not now: Just reply 'Later' and I'll check back in 3 months.

Either way is fine - just let me know!

Best,
{{your_name}}"
```

**End Sequence:**
```
14. Add delay: "Wait 2 days"
15. Add action: "End of sequence"
```

---

### Step 4: Build the "NO" Path (Left Side)

**For those who DON'T acknowledge:**
```
1. Add delay: "Wait 3 days"
2. Add action: "View profile"
3. Add delay: "Wait 1 day"
4. Add action: "Like a post"
5. Add delay: "Wait 2 days"
6. Add action: "InMail"
7. Configure:

Subject: Quick question about {{company}}

Message:
"Hi {{first_name}},

I noticed {{company}} is working on {{area}}.

Quick question: What's your biggest challenge with {{pain_point}} right now?

I've helped {{industry}} companies solve this - happy to share what worked.

Interested?

Best,
{{your_name}}"

8. Add delay: "Wait 5 days"
9. Add action: "End of sequence"
```

---

## 🎨 Visual Layout

```
                        Send an invite
                              ↓
                         Wait 2 days
                              ↓
                       Follow-up message
                              ↓
                    Wait 3 days for reply
                              ↓
              IF USER ACKNOWLEDGES / SAYS YES?
                    ╱                    ╲
            NO PATH                    YES PATH
               ↓                           ↓
         View profile              Immediate message
               ↓                    (with calendar)
          Wait 1 day                      ↓
               ↓                      Wait 3 hours
         Like a post                      ↓
               ↓                   If viewed message?
          Wait 2 days               ╱           ╲
               ↓                 NO            YES
      Send InMail              Follow-up    Quick reply
               ↓                   ↓             ↓
          Wait 5 days          Wait 1 day   Wait 1 day
               ↓                   ↓             ↓
        End sequence         Social proof  Social proof
                                 ↓             ↓
                            Wait 2 days   Wait 2 days
                                 ↓             ↓
                            Final ask     Final ask
                                 ↓             ↓
                            Wait 2 days   Wait 2 days
                                 ↓             ↓
                            End sequence  End sequence
```

---

## 💡 Pro Tips for Your Workflow

### 1. **Timing Optimization**
- **0-5 minutes:** Immediate response (highest conversion)
- **3 hours:** First follow-up (catches those who missed it)
- **1 day:** Social proof follow-up (builds credibility)
- **2 days:** Final push (urgency)

### 2. **Message Hierarchy**
- **1st message:** Enthusiastic + Action (calendar link)
- **2nd message:** Alternative options (make it easier)
- **3rd message:** Social proof (credibility)
- **4th message:** Honest question (transparency)

### 3. **Multi-Channel Approach**
If you have multiple channels available:
- **Acknowledgment:** LinkedIn Message
- **Follow-up 1:** Email (different channel)
- **Follow-up 2:** LinkedIn Message (back to original)
- **Follow-up 3:** Email (final attempt)

### 4. **Personalization Variables**
Always use these:
- `{{first_name}}` - Personal touch
- `{{company}}` - Shows research
- `{{position}}` - Relevant to role
- `{{pain_point}}` - Specific to them
- `{{industry}}` - Contextual examples

---

## 🔧 Configuration Options

### Option A: High-Volume Sales (SDR)
**Goal:** Maximum efficiency
- Shorter messages
- Fewer follow-ups (3 max)
- Calendar link in every message
- Quick turnaround (5-day total sequence)

### Option B: Enterprise Sales (AE)
**Goal:** Relationship building
- Longer, value-packed messages
- More follow-ups (5-6)
- Mix of meetings, resources, and calls
- Extended sequence (14-day total)

### Option C: Product-Led Growth
**Goal:** Self-service conversion
- Focus on product demos and trials
- Automated video walkthroughs
- Interactive content (calculators, assessments)
- Medium sequence (7-10 days)

---

## 📊 Success Tracking

### Key Metrics to Monitor

**Immediate Metrics (Days 1-3):**
```
└─ Response Rate
   ├─ First message: Target 50%+
   ├─ Follow-up 1: Target 30%+
   └─ Follow-up 2: Target 15%+

└─ Booking Rate
   ├─ From first message: Target 20%+
   ├─ From follow-up 1: Target 10%+
   └─ From follow-up 2: Target 5%+
```

**Conversion Metrics (Week 1):**
```
└─ Meeting Show Rate: Target 70%+
└─ Demo-to-Trial: Target 40%+
└─ Total Acknowledgment-to-Meeting: Target 25-35%
```

---

## ⚡ Quick Start Checklist

- [ ] Complete Step 1: Initial outreach setup
- [ ] Complete Step 2: Add acknowledgment condition
- [ ] Complete Step 3: Build YES path (5 messages)
- [ ] Complete Step 4: Build NO path (alternative route)
- [ ] Add personalization variables to all messages
- [ ] Test workflow with sample data
- [ ] Set up calendar integration
- [ ] Prepare resources (case studies, links)
- [ ] Brief team on response handling
- [ ] Launch to small test group (10 prospects)
- [ ] Monitor and optimize based on results
- [ ] Scale to full audience

---

## 🎯 Message Template Library

### Immediate Response Templates

**Template 1: Calendar-First**
```
Awesome, {{first_name}}! 🎉

Quick question: Tuesday at 2pm or Thursday at 10am?

Book here: [calendar link]

See you soon!
```

**Template 2: Value-First**
```
Perfect, {{first_name}}!

I put together 3 quick resources for you:
1. [Case Study] - {{similar_company}}'s results
2. [Video] - 2-min product overview
3. [Calculator] - Your potential ROI

Take a look, then let's chat: [calendar]
```

**Template 3: Question-First**
```
Great! Quick question, {{first_name}}:

What's your #1 priority?
A) {{option_1}}
B) {{option_2}}
C) {{option_3}}

Once I know, I can customize our call.
Book here: [calendar]
```

---

### Follow-Up Templates

**3-Hour Follow-Up (No Booking)**
```
{{first_name}},

Noticed you haven't booked yet - all good!

Here are 3 specific times I have:
• [Time 1]
• [Time 2]
• [Time 3]

Just reply with a number!
```

**Day 2 Follow-Up (Social Proof)**
```
BTW {{first_name}},

{{similar_company}} just shared this:

"[Testimonial quote about result]"

They had the same challenge you mentioned.

Curious how? Let's talk: [calendar]
```

**Day 4 Follow-Up (Final Attempt)**
```
Last check-in, {{first_name}} -

Still interested in [solving pain_point]?

YES → [Calendar link]
NOT NOW → Reply "Later" and I'll check in Q2

Either way is totally fine!
```

---

## 🚀 Advanced Workflow Enhancements

### Enhancement 1: Engagement Tracking
```
After each message, add:
└─ If clicked link
   ├─ YES → Immediate follow-up
   └─ NO → Wait for next scheduled message
```

### Enhancement 2: Multi-Path Branching
```
After acknowledgment, ask:
"What interests you most?"
└─ Pricing → Send pricing workflow
└─ Demo → Send demo workflow
└─ Case Studies → Send proof workflow
```

### Enhancement 3: Time-Based Optimization
```
Send messages based on best engagement times:
└─ Tuesday-Thursday
└─ 10am or 3pm (their timezone)
└─ Avoid Mondays, Fridays, weekends
```

---

## 📱 Implementation Checklist by Role

### For SDRs:
- [x] Use Template 1 (Quick Win)
- [x] 3-4 touchpoints max
- [x] Focus on booking meetings
- [x] Response time <5 minutes

### For AEs:
- [x] Use Template 2 (Value-First)
- [x] 5-6 touchpoints with resources
- [x] Mix of calls, demos, resources
- [x] Response time <30 minutes

### For Founders:
- [x] Use Template 3 (Personal)
- [x] Highly personalized messages
- [x] Video messages work great
- [x] Direct phone number sharing

---

## 🎓 Learning Resources

**Recommended Reading:**
1. "Fanatical Prospecting" by Jeb Blount
2. "The Sales Development Playbook" by Trish Bertuzzi
3. "Predictable Revenue" by Aaron Ross

**Tools to Use:**
- Calendly / Chili Piper for booking
- Loom for video messages
- HubSpot for tracking
- LinkedIn Sales Navigator

---

## ✅ You're Ready!

You now have:
✓ A proven workflow template
✓ Step-by-step implementation guide
✓ Message templates ready to use
✓ Metrics to track success
✓ Optimization tips

**Next Step:** Build it in your visual workflow builder!

---

*Need help? Check the main strategy document for more details.*
*Questions? Your team is ready to support!*

