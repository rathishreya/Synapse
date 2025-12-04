# Outreach Campaign Builder - User Workflow

## Overview
The Outreach Campaign Builder is a LinkedIn automation tool that allows users to create multi-step outreach sequences with conditions, delays, and various LinkedIn actions.

## Main Components

### 1. Campaign Statistics Dashboard
**Location**: Statistics Tab

**Metrics Tracked**:
- **ALL LEADS**: Total number of prospects in the campaign (25)
- **IN PROGRESS**: Currently active sequences (0)
- **FINISHED**: Completed sequences (0)
- **AWAITING**: Sequences waiting for action (0)
- **PAUSED**: Manually paused sequences (0)
- **FAILED**: Sequences that encountered errors (0)
- **BLACKLISTED**: Prospects marked as blacklisted (0)

**Performance Metrics**:
- **Acceptance Rate**: Percentage of connection requests accepted (0%)
- **Response Rate**: Percentage of messages that received replies (0%)

---

## 2. Sequence Builder - Visual Flow

### Available Actions

#### **Connection Actions**
1. **Send an invite**
   - Sends LinkedIn connection request
   - Can include personalized message
   - First step in most sequences

2. **Follow**
   - Follow the prospect's profile
   - Alternative to connection request

3. **Withdraw invite**
   - Cancel pending connection request
   - Used in cleanup sequences

#### **Engagement Actions**
4. **View profile**
   - Visit the prospect's LinkedIn profile
   - Increases visibility

5. **Endorse skills**
   - Endorse top 3 skills on their profile
   - Builds rapport

6. **Like a post**
   - Like their recent post
   - Increases engagement

#### **Communication Actions**
7. **Message**
   - Send direct LinkedIn message (requires connection)
   - Supports personalization variables:
     - `{{first_name}}`
     - `{{last_name}}`
     - `{{position}}`
     - `{{company}}`
     - `{{country}}`
   - Character limit: 4,994

8. **InMail**
   - Send LinkedIn InMail (doesn't require connection)
   - Only sent to Open Profiles
   - Includes subject line
   - Character limit: 1,896
   - No InMail credits consumed

9. **Send email** (NEW)
   - Send email to prospect
   - Requires email to be found first

10. **Find email**
    - Attempt to find prospect's email address
    - Used before "Send email" action

---

### Delay Configuration

**Purpose**: Add wait time between actions to appear more human

**Options**:
- **Hours**: 1-24 hours
- **Days**: 1-30 days

**Common Patterns**:
- 5 days after connection request
- 1 hour before follow-up message
- 1 day between messages
- 20 days before InMail

---

### Conditional Branching

**Purpose**: Create different paths based on prospect behavior

**Available Conditions**:

1. **If connected**
   - Prospect accepted connection request
   - Path: Continue with message sequence

2. **If not accepted** (Still not accepted)
   - Connection request still pending
   - Path: Try alternative engagement (follow, view profile, endorse)

3. **If viewed message**
   - Prospect opened your message
   - Path: Send follow-up

4. **If email available**
   - Email address found successfully
   - Path: Send email outreach

5. **If open profile**
   - Prospect has Open Profile setting
   - Path: Send InMail

6. **If responded to InMail**
   - Prospect replied to InMail
   - Path: End sequence (success)

---

## 3. Complete Workflow Example

### Scenario: LinkedIn Outreach Campaign

```
START
  ↓
[Send an invite] (with personalized message)
  ↓
[Delay: 5 days]
  ↓
[Condition: If not accepted] ─────→ Split into 2 paths
  │
  ├─── Path A (Not Accepted):
  │      ↓
  │    [Follow]
  │      ↓
  │    [Delay: 5 days]
  │      ↓
  │    [Condition: If not accepted]
  │      ↓
  │    [View profile]
  │      ↓
  │    [Delay: 20 days]
  │      ↓
  │    [Condition: If not accepted]
  │      ↓
  │    [InMail] (with subject + message)
  │      ↓
  │    [Delay: 1 day]
  │      ↓
  │    [Condition: If not responded to InMail]
  │      ↓
  │    [End of sequence]
  │
  └─── Path B (Accepted):
         ↓
       [Endorse skills]
         ↓
       [Delay: 1 hour]
         ↓
       [Message] (first message)
         ↓
       [Delay: No delay]
         ↓
       [Message] (second message)
         ↓
       [Delay: 1 day]
         ↓
       [End of sequence]
```

---

## 4. Message Configuration

### LinkedIn Message Dialog

**Components**:
1. **Message Type Tabs**
   - Primary message (required)
   - Alternative message (optional, for A/B testing)

2. **Personalization Variables** (Quick Insert Buttons):
   - First name
   - Last name
   - Position
   - Company
   - Country
   - More... (expandable)

3. **Message Editor**:
   - Rich text area
   - Character counter (0 / 4994)
   - Insert link button
   - AI generate button
   - Settings button

4. **Actions**:
   - Cancel: Discard changes
   - Save: Save message configuration

### InMail Configuration

**Additional Features**:
- Subject line field (optional)
- Character limit: 1,896
- Warning message: "InMails will be sent to Open Profiles only"

---

## 5. Campaign Tabs

### **Audience Tab**
- Select target prospects
- Define filters and criteria
- Import prospect lists
- Manage prospect groups

### **Sequence Tab** (Main Builder)
- Visual sequence builder
- Drag-and-drop nodes
- Configure actions
- Set up conditions
- Add delays

### **Statistics Tab**
- View campaign performance
- Track lead status
- Monitor acceptance/response rates
- Analyze results

### **Settings Tab**
- Campaign configuration
- Working hours
- Daily limits
- Safety settings

---

## 6. User Journey

### Step 1: Create Campaign
1. Click "Visual Builder" from dashboard or outreach page
2. Enter campaign name (e.g., "LinkedIn Outreach Campaign")
3. Set campaign date

### Step 2: Define Audience
1. Go to "Audience" tab
2. Select target prospects
3. Apply filters (industry, location, company size, etc.)
4. Import CSV or select from CRM

### Step 3: Build Sequence
1. Go to "Sequence" tab
2. Start with initial action (usually "Send an invite")
3. Add delay before next action
4. Add condition to handle acceptance
5. Create branching paths:
   - **If Accepted**: Engagement sequence (message, endorse)
   - **If Not Accepted**: Alternative path (follow, view profile, InMail)
6. Configure each action:
   - Write personalized messages
   - Set appropriate delays
   - Add conditions for branching

### Step 4: Configure Messages
1. Click on message/InMail nodes
2. Write primary message
3. Insert personalization variables
4. Use AI to optimize (optional)
5. Add alternative message for A/B testing (optional)
6. Save configuration

### Step 5: Review & Launch
1. Review entire sequence in visual builder
2. Check message configurations (green checkmarks)
3. Verify delays are appropriate
4. Test with small audience first (optional)
5. Click "Launch Campaign"

### Step 6: Monitor Performance
1. Go to "Statistics" tab
2. Track lead progression through sequence
3. Monitor acceptance and response rates
4. Adjust sequence based on performance
5. Pause/resume as needed

---

## 7. Best Practices

### Message Guidelines
- **Keep it short**: 150-300 characters ideal
- **Personalize**: Use at least 3 variables
- **Clear CTA**: Specific call-to-action
- **Value first**: Lead with benefit to prospect

### Delay Recommendations
- **After connection request**: 5-7 days
- **Between messages**: 2-3 days minimum
- **Before InMail**: 15-20 days
- **Engagement actions**: 1-2 hours apart

### Sequence Structure
- **Start gentle**: Connection request first
- **Build rapport**: View profile, endorse skills
- **Gradual escalation**: Message → InMail → Email
- **Multiple touchpoints**: 5-7 interactions max
- **Clear end**: Define success/failure exits

### Condition Usage
- **Check acceptance**: Before sending messages
- **Verify engagement**: Before escalating
- **Alternative paths**: Always have Plan B
- **Success exits**: End when goal achieved

---

## 8. Safety Features

### Built-in Protections
- **Daily limits**: Prevent account flags
- **Human-like delays**: Random variations
- **Working hours**: Only during business hours
- **Withdrawal triggers**: Auto-withdraw old invites
- **Blacklist management**: Exclude opted-out prospects

### LinkedIn Compliance
- **InMail targeting**: Open Profiles only
- **No credit usage**: Free InMail feature
- **Connection limits**: Respects LinkedIn limits
- **Engagement pacing**: Natural interaction patterns

---

## 9. Success Metrics

### Key Performance Indicators (KPIs)
- **Acceptance Rate**: >40% is excellent
- **Response Rate**: >15% is good
- **InMail Response**: >25% is strong
- **Conversion Rate**: Track to final goal
- **Time to Response**: Average response time

### Optimization Tips
1. **A/B Test Messages**: Use alternative messages
2. **Adjust Delays**: Find optimal timing
3. **Refine Audience**: Target more specifically
4. **Personalize More**: Increase variable usage
5. **Follow Patterns**: Copy successful sequences

---

## 10. Common Workflows

### Workflow 1: Basic Connection + Message
```
Send invite → Wait 5 days → If accepted → Message → End
                          → If not accepted → End
```

### Workflow 2: Multi-Touch Engagement
```
Send invite → Wait 5 days → If not accepted:
  → Follow → Endorse → View profile → Wait 20 days → InMail
```

### Workflow 3: Message Sequence
```
If accepted → Message 1 → Wait 3 days → Message 2 → Wait 5 days → Message 3
```

### Workflow 4: Email Fallback
```
If not connected → Find email → If email found → Send email → End
```

---

## Conclusion

The Outreach Builder provides a powerful, visual way to automate LinkedIn outreach while maintaining a human touch. By combining actions, delays, and conditions, users can create sophisticated campaigns that adapt to prospect behavior and maximize response rates.

**Key Takeaways**:
- Use visual builder for complex sequences
- Personalize all messages
- Set appropriate delays
- Create branching paths
- Monitor and optimize continuously

