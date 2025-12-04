# Interactive Sequence Builder - Complete Guide

## 🎯 Overview

The Sequence Builder is now **fully interactive** with modals for configuration, the ability to add/delete steps anywhere, and branch out with conditions.

---

## ✨ Key Interactive Features

### 1. **Click Any Node to Edit**

**How it works**:
- Click on any action node to open its configuration dialog
- Click on delay nodes to modify timing
- Click on message/InMail nodes to edit content

**What happens**:
- **Message/InMail nodes**: Opens message dialog with existing content pre-filled
- **Delay nodes**: Opens delay dialog with current timing
- **Other actions**: Can be clicked and configured in future updates

---

### 2. **Add New Steps Anywhere**

**The "+" Button**:
- Appears between every node on hover
- Click to open the "Add Step" menu
- Insert actions, delays, or conditions at any point

**Add Step Menu Options**:

#### **ACTIONS Section**:
- Send an invite
- Message
- InMail
- View profile
- Endorse skills
- Follow
- Like a post
- Find email
- Send email (NEW)
- Withdraw invite

#### **FLOW CONTROL Section**:
- **Add Delay**: Insert wait time (hours/days)
- **Add Condition (Branch)**: Create if/then logic with multiple paths

---

### 3. **Delete Any Step**

**Delete Button**:
- Small "X" button appears on node hover (top-right corner)
- Click to remove that step and all its children
- Red background indicates destructive action

**What gets deleted**:
- The selected node
- All child nodes below it
- Branch paths if it's a condition node

---

### 4. **Create Conditional Branches**

**How to Branch**:
1. Click the "+" button after any action
2. Select "Add Condition (Branch)"
3. Choose condition type from dialog
4. Two paths are automatically created:
   - **Left path**: Condition not met
   - **Right path**: Condition met (labeled "Accepted")

**Available Conditions**:
- If connected
- If not accepted
- If viewed message
- If email available
- If open profile
- If responded to InMail

**Branch Structure**:
```
[Action]
   ↓
[Condition] ─────→ Splits into 2 paths
   │
   ├─── Path A (Not met)
   │      ↓
   │    [End]
   │
   └─── Path B (Met/Accepted)
          ↓
        [End]
```

Each path can then have its own sequence of actions!

---

## 🎨 Dialog Types

### 1. **Message/InMail/Email Dialog**

**When it opens**:
- Clicking message/InMail nodes
- Adding new message/InMail/email action
- Edit mode when clicking configured nodes

**Features**:
- **Tabs**: Primary message / Alternative message
- **Personalization buttons**: Quick-insert variables
  - First name → `{{first_name}}`
  - Last name → `{{last_name}}`
  - Position → `{{position}}`
  - Company → `{{company}}`
  - Country → `{{country}}`
  - More... (expandable)
- **Subject field**: For InMail and Email only
- **Message textarea**: 
  - LinkedIn Message: 4,994 char limit
  - InMail: 1,896 char limit
- **Toolbar icons**: Link, AI generate, Settings
- **Character counter**: Live count
- **Warning**: InMail-specific notice about Open Profiles

**Actions**:
- **Cancel**: Close without saving
- **Save**: Apply changes to node

---

### 2. **Delay Dialog**

**When it opens**:
- Clicking delay nodes
- Adding new delay from "+" menu

**Features**:
- **Number input**: Enter delay duration (large text)
- **Unit toggles**: Days or Hours (purple when selected)
- Visual feedback on selection

**Actions**:
- **Apply**: Save delay configuration
- **Cancel**: Close without saving

---

### 3. **Condition Dialog**

**When it opens**:
- Selecting "Add Condition (Branch)" from "+" menu

**Features**:
- List of all available conditions
- Click to select (red highlight)
- Icon for each condition type
- Full description of what condition checks

**Actions**:
- **Add Condition**: Create branch with 2 paths
- **Cancel**: Close without adding

---

### 4. **Add Step Menu**

**When it opens**:
- Clicking any "+" button between nodes

**Structure**:
- **ACTIONS section**: All LinkedIn actions
- **FLOW CONTROL section**: Delay and Condition options
- Scrollable if content is long
- Visual grouping by type

---

## 🔄 Complete Workflow Examples

### Example 1: Adding a Message

```
1. Click "+" after "Send an invite" node
2. "Add Step" dialog opens
3. Click "Message" from actions
4. Message dialog opens
5. Type your message
6. Click personalization buttons to insert variables
7. Click "Save"
8. Message node appears with green checkmark ✓
```

### Example 2: Adding a Delay

```
1. Click "+" after any action
2. "Add Step" dialog opens
3. Click "Add Delay"
4. Delay dialog opens
5. Enter "5" and select "Days"
6. Click "Apply"
7. Purple delay badge appears: "5 days"
```

### Example 3: Creating a Branch

```
1. Click "+" after "Send an invite"
2. "Add Step" dialog opens
3. Click "Add Condition (Branch)"
4. Condition dialog opens
5. Select "If not accepted"
6. Click "Add Condition"
7. Sequence splits into 2 paths
8. Left path: Still not accepted
9. Right path: Accepted (with label)
10. Add different actions to each path
```

### Example 4: Editing Existing Node

```
1. Click on message node
2. Message dialog opens with existing content
3. Modify message text
4. Add more personalization
5. Click "Save"
6. Node updates with new content
```

### Example 5: Deleting a Step

```
1. Hover over any node
2. "X" button appears (top-right)
3. Click "X"
4. Node and children are removed
5. Sequence reconnects automatically
```

---

## 🎯 Advanced Patterns

### Multi-Step Engagement Sequence

```
Send invite
   ↓ (+)
5 days delay
   ↓ (+)
If not accepted ─────→ Branch
   │
   ├─── Follow
   │      ↓ (+)
   │    2 days delay
   │      ↓ (+)
   │    View profile
   │      ↓
   │    End
   │
   └─── Endorse skills (Accepted)
          ↓ (+)
        1 hour delay
          ↓ (+)
        Message
          ↓
        End
```

### How to build it:
1. Start with "Send invite" (default)
2. Click "+", add 5 days delay
3. Click "+", add "If not accepted" condition
4. Left path: Add "Follow" → delay → "View profile"
5. Right path: Add "Endorse skills" → delay → "Message"
6. Configure each message node with content

---

## 💡 Tips & Best Practices

### Building Sequences

1. **Start Simple**: Begin with basic linear flow
2. **Add Delays**: Always add delays between actions
3. **Test Logic**: Use conditions to handle different scenarios
4. **Configure Messages**: Click nodes to add personalized content
5. **Review Flow**: Zoom out to see full sequence

### Using Personalization

1. Click variable buttons in message dialog
2. Variables insert as `{{variable_name}}`
3. Use 3-5 variables per message
4. Most effective: First name, Company, Position

### Managing Complexity

1. **Keep branches short**: 3-5 steps per path
2. **End paths properly**: Always have "End" nodes
3. **Label clearly**: Use descriptive condition names
4. **Test incrementally**: Build and test in stages

### Optimization

1. **Click to edit**: Refine messages based on results
2. **Adjust delays**: Test different timings
3. **A/B test**: Use alternative messages
4. **Delete unused**: Remove ineffective steps

---

## 🎨 Visual Indicators

### Node States

| Indicator | Meaning |
|-----------|---------|
| Green checkmark | Message configured |
| Purple badge | Delay node |
| Red box | Condition node |
| Gray circle | End node |
| "+" button | Insert point (visible on hover) |
| "X" button | Delete (visible on hover) |

### Color Coding

- **Purple**: Delays (time-based)
- **Red**: Conditions (logic-based)
- **Dark gray**: Actions (LinkedIn activities)
- **Gray**: End nodes (terminal points)
- **Cyan**: Add buttons (interaction points)

---

## ⚡ Keyboard Shortcuts (Future)

*Coming soon*:
- `Ctrl/Cmd + Z`: Undo
- `Ctrl/Cmd + Y`: Redo
- `Delete`: Remove selected node
- `Escape`: Close dialog
- `Enter`: Save dialog

---

## 🔧 Technical Details

### Data Structure

Each node contains:
```typescript
{
  id: string;              // Unique identifier
  type: ActionType;        // Action, delay, condition, or end
  label: string;           // Display name
  data: {                  // Configuration
    message?: string;      // For message nodes
    subject?: string;      // For InMail/email
    delay?: number;        // For delay nodes
    delayUnit?: string;    // hours or days
    conditionType?: string; // For condition nodes
  };
  children?: Node[];       // Child nodes (branches)
  position: { x, y };      // Visual position
}
```

### Tree Operations

- **Insert**: Adds node after specified ID
- **Update**: Modifies node data in place
- **Delete**: Removes node and children
- **Branch**: Creates multiple children

---

## 🚀 Coming Soon

### Planned Features

1. **Drag & Drop**: Reorder nodes by dragging
2. **Templates**: Save and load sequence templates
3. **Duplicate**: Copy entire branches
4. **Undo/Redo**: Full history support
5. **Zoom Controls**: Pan and zoom canvas
6. **Mini-map**: Overview of large sequences
7. **Validation**: Check for logical errors
8. **Preview Mode**: See what prospects experience
9. **Version History**: Track changes over time
10. **Collaboration**: Share and comment

---

## 📊 Best Performing Sequences

### High-Conversion Pattern

```
Send invite (personalized)
   ↓
5 days wait
   ↓
If not accepted:
   ├─── Follow + View profile + InMail
   └─── (Accepted) Message + Endorse + Message
```

**Why it works**:
- Multiple touchpoints
- Personalized at each step
- Fallback path for non-responders
- Builds rapport before asking

### Quick Engagement

```
Send invite
   ↓
1 day wait
   ↓
If accepted:
   Endorse skills → Message (same day)
```

**Why it works**:
- Fast response to acceptance
- Immediate value (endorsement)
- Strike while interest is high

---

## 📝 Summary

The Interactive Sequence Builder gives you complete control:

✅ **Click** any node to edit
✅ **Add** steps anywhere with "+" button
✅ **Delete** steps with "X" button
✅ **Branch** with conditions for if/then logic
✅ **Configure** everything through intuitive dialogs
✅ **Personalize** messages with variable buttons
✅ **Visualize** entire flow at a glance

Build sophisticated LinkedIn automation sequences with ease!

