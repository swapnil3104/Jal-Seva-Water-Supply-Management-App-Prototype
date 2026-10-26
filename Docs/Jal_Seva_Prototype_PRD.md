# PRD — जल सेवा (Jal Seva)
## Water Supply Management App — Prototype Only

**Document version:** 1.0  
**Date:** October 2026  
**Product type:** College-level clickable UI prototype  
**Primary language:** Marathi, with English labels where useful  
**Platform:** Responsive web prototype (mobile-first)  
**Status:** Prototype scope — not a production water utility system

---

## 1. Product Overview

**जल सेवा (Jal Seva)** is a citizen-focused water supply management app concept. It brings water-supply schedules, service notices, complaint registration, bill information, and tanker requests into one simple interface. A separate administration dashboard lets staff review sample complaints and update their statuses.

This project is being built **only as a demonstrable prototype**. The goal is to show the user journey, interface design, and simulated interactions—not to connect to a real municipality, process payments, or provide verified live water-supply information.

## 2. Problem Statement

Citizens may find it difficult to:
- Know when water is scheduled to arrive in their area.
- Report leaks, low pressure, dirty water, or a water outage.
- Find bill and payment-status information in one place.
- Receive timely updates about repairs and service interruptions.
- Follow the status of a complaint or tanker request.

Water-supply staff need a central view to review incoming complaints, monitor requests, and publish schedule updates.

## 3. Product Goal

Create an easy-to-understand prototype that demonstrates how citizens and water-supply staff could interact through one digital service.

### Success criteria for the prototype
- A reviewer can navigate all main screens without assistance.
- A user can submit a sample complaint and see a confirmation/reference ID.
- The complaint appears in the prototype's complaint-tracking view.
- A user can explore sample water schedules, bill details, notices, and tanker requests.
- An admin can change a sample complaint status in the demo.
- The interface works at common mobile and desktop screen sizes.

## 4. Target Users

### 4.1 Citizen / Resident
A resident who wants to view a schedule, check sample bill information, submit a complaint, or request a tanker.

### 4.2 Water Supply Administrator
A demo staff user who reviews complaints and requests, changes statuses, and updates sample schedules/notices.

### 4.3 Project Evaluator
A faculty member or stakeholder assessing the concept, interface, and user flow.

## 5. Scope

### 5.1 In Scope — Prototype Features

1. Welcome / landing screen.
2. Demo login or “Continue as Demo User” flow.
3. Citizen home dashboard.
4. Sample area-wise water supply schedule.
5. Complaint form with category, description, area/address, and optional photo-preview control.
6. Complaint confirmation and complaint-status tracking.
7. Sample bill details and payment status.
8. Mock “Pay Now” interaction that clearly says payment is not processed.
9. Tanker request form and mock request status.
10. Notices for planned maintenance, water interruption, and service updates.
11. Admin dashboard with sample KPIs and request lists.
12. Admin ability to change complaint status and edit demo schedule/notice data.
13. Marathi-first interface with optional English labels if practical.
14. Responsive navigation and realistic sample data.

### 5.2 Out of Scope

- Real OTP/SMS authentication.
- Real municipal or government integration.
- Live or sensor-based water-supply data.
- Real bill generation or customer account lookup.
- Real UPI, card, net-banking, or payment-gateway transactions.
- Real SMS, push notifications, or email delivery.
- Production-grade map/geolocation or reverse geocoding.
- Dispatching real water tankers.
- Production deployment, high availability, or formal security certification.
- Claims that sample information is official or live.

**Important:** All schedules, bills, customer numbers, notices, and request records must be labelled as demo/sample data.

## 6. Recommended Prototype Approach

Build a **responsive web app** rather than a fully native Android app, so it is quick to demonstrate on a laptop or mobile browser.

Suggested implementation:
- **Frontend:** React + Vite
- **Styling:** Tailwind CSS or a consistent CSS design system
- **Icons:** Lucide icons
- **Prototype data:** Local JSON/mock data
- **State:** React state or Context for demo interactions
- **Persistence:** Local storage only if needed to retain demo changes between refreshes
- **Backend:** Not required for the first prototype

The stack is a recommendation, not a requirement. If using a visual app builder, reproduce the same screens and interactions without building a production backend.

## 7. Information Architecture

### Citizen app
- Home
- Water Schedule
- Complaints
  - New Complaint
  - My Complaints / Track Status
- Bills & Payments
- Tanker Request
- Notices
- Profile / Demo Account

### Admin panel
- Overview Dashboard
- Complaints
- Tanker Requests
- Water Schedules
- Notices
- Demo Settings / Logout

## 8. Main User Flows

### 8.1 Citizen flow
1. Open Jal Seva.
2. Choose “Continue as Demo User” or enter the demo experience.
3. View the dashboard and sample area schedule.
4. Select a service: complaint, bill, tanker request, or notices.
5. Complete a form or open a sample record.
6. Submit the form.
7. See a success message and a generated demo reference ID.
8. Open “My Complaints” or “My Requests” to view the sample status.

### 8.2 Complaint flow
Home → New Complaint → Select category → Enter area/address → Add description → Optional photo preview → Submit → Confirmation → Track Status.

Complaint categories:
- Water leakage
- Low water pressure
- Dirty/contaminated water
- No water supply
- Other

Demo status values:
- Submitted
- Under Review
- Assigned
- In Progress
- Resolved
- Rejected (with a reason)

### 8.3 Admin flow
Admin Demo Login → Overview → Open Complaints → Select a complaint → Review details → Change status/add staff note → Save → Citizen tracking screen reflects the updated demo status.

### 8.4 Bill flow
Home → Bills & Payments → View sample bill, due date, and payment status → Tap “Pay Now” → Show a modal: “Demo only — no payment has been made.”

### 8.5 Tanker request flow
Home → Tanker Request → Enter area, address, reason, and preferred date → Submit → Generate request ID → View status such as “Received,” “Under Review,” or “Approved (Demo).”

## 9. Screen Requirements

### Screen 1 — Welcome / Landing
**Purpose:** Explain the app and start the demo.

Elements:
- Jal Seva name and water-themed logo/icon.
- Marathi tagline: “स्मार्ट • सोपी • पारदर्शक पाणीपुरवठा सेवा”
- Short description.
- “Continue as Citizen” and “Admin Demo” buttons.
- Small notice: “Prototype only — sample data.”

### Screen 2 — Citizen Home Dashboard
**Purpose:** Give quick access to the most-used services.

Elements:
- Greeting and selected demo area.
- Today’s sample water schedule card.
- Service cards: Water Schedule, New Complaint, Bills & Payments, Tanker Request.
- Recent notices.
- Recent request/status summary.
- Bottom navigation on mobile or sidebar on desktop.

### Screen 3 — Water Schedule
**Purpose:** Show a clear, area-specific sample schedule.

Elements:
- Area/ward selector.
- Today and upcoming days.
- Start/end time and sample status: Scheduled, Delayed, or Interrupted.
- Notice explaining schedule information is sample data.
- Admin-editable demo schedule.

### Screen 4 — New Complaint
**Purpose:** Let a resident submit a simulated service complaint.

Fields:
- Complaint category (required).
- Area/ward (required).
- Address or landmark (required).
- Description (required; sensible character limit).
- Photo attachment control (optional; preview only).
- Contact name/phone (use fictional demo details; avoid requiring real personal data).
- Submit button.

Validation:
- Required fields must be completed.
- Display readable inline validation.
- Prevent accidental repeated submissions while processing.
- On success, show a generated reference ID such as `JS-2026-001`.

### Screen 5 — My Complaints / Track Status
**Purpose:** Demonstrate transparency and follow-up.

Elements:
- List of sample complaints.
- Reference ID, category, area, submission date, and status.
- Status timeline.
- Admin note or resolution note when available.
- Empty state with a “Register Complaint” action.

### Screen 6 — Bills & Payments
**Purpose:** Demonstrate bill visibility without real financial activity.

Elements:
- Fictional customer number.
- Current sample bill amount and due date.
- Previous sample bills.
- Payment status: Paid / Pending.
- “View Bill” action to open a mock bill.
- “Pay Now” action opens a clear demo-only modal; no payment request is sent.
- Never ask for real card, UPI PIN, bank, or payment credentials.

### Screen 7 — Tanker Request
**Purpose:** Demonstrate a tanker request journey.

Fields:
- Area/ward (required).
- Address/landmark (required).
- Reason (required).
- Preferred date (optional).
- Notes (optional).
- Submit button.

After submission:
- Show a demo request ID.
- Show status and request summary.
- Clearly state that no real tanker has been dispatched.

### Screen 8 — Notices & Alerts
**Purpose:** Display service messages.

Elements:
- Notice title, area, date, type, and message.
- Types: Planned Maintenance, Supply Interruption, Restoration Update, General Notice.
- Read/unread visual treatment is optional.
- Use only clearly marked sample notices.

### Screen 9 — Profile / Demo Account
**Purpose:** Display non-sensitive demo account details.

Elements:
- Fictional name, demo customer number, area, and contact placeholder.
- Edit profile can be a visual-only action or update local demo state.
- Logout returns to the welcome screen.
- Do not collect or store real identity documents or sensitive information.

### Screen 10 — Admin Dashboard
**Purpose:** Demonstrate a staff overview.

KPI cards using sample values:
- New Complaints
- In Progress
- Resolved
- Tanker Requests

Other elements:
- Recent complaints table/list.
- Recent tanker requests.
- Schedule and notice shortcuts.
- Status badges.
- Clear “Demo Admin” label.

### Screen 11 — Admin Complaint Details
**Purpose:** Demonstrate basic complaint handling.

Elements:
- Complaint ID, category, area, description, submitted date, and photo preview if provided.
- Status dropdown.
- Staff note field.
- Save Changes button.
- Success toast after saving.
- Update shared prototype state so the citizen tracking screen shows the new status.

### Screen 12 — Admin Schedule & Notices
**Purpose:** Demonstrate management of sample public information.

Elements:
- List of demo schedules and notices.
- Add/edit form for area, date, time, status, title, and message.
- Save changes to local prototype state.
- Do not present updates as actual municipal announcements.

## 10. Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | User can enter the citizen demo experience | Must |
| FR-02 | User can navigate between main services | Must |
| FR-03 | User can view sample water schedules | Must |
| FR-04 | User can submit a complaint with validation | Must |
| FR-05 | App generates a unique demo complaint ID | Must |
| FR-06 | User can view complaint status and timeline | Must |
| FR-07 | Admin can change a complaint's demo status | Must |
| FR-08 | Citizen view reflects status changes in shared prototype state | Must |
| FR-09 | User can view a sample bill | Must |
| FR-10 | Payment action displays a demo-only message and never processes payment | Must |
| FR-11 | User can submit a tanker request | Should |
| FR-12 | User can view sample notices | Should |
| FR-13 | Admin can edit sample schedules and notices | Should |
| FR-14 | Prototype is responsive on mobile and desktop | Must |
| FR-15 | Interface uses Marathi-first copy | Must |
| FR-16 | Demo data is labelled clearly | Must |

## 11. Non-Functional Requirements

- **Usability:** Primary actions should be easy to find and use.
- **Responsiveness:** Support mobile, tablet, and desktop layouts.
- **Accessibility:** Readable contrast, clear labels, visible focus states, and keyboard-friendly controls.
- **Performance:** Main prototype screens should feel fast with local/mock data.
- **Reliability:** Form validation and demo status changes should behave consistently.
- **Privacy:** Use fictional data; do not request real personal or financial information.
- **Transparency:** Show a persistent “Prototype / Sample Data” label on relevant screens.
- **Language:** Marathi-first content; avoid broken or inconsistent Marathi typography.

## 12. Visual Design Direction

- **Style:** Clean, friendly, civic-service dashboard.
- **Primary colour:** Deep navy blue.
- **Secondary colours:** Water blue and cyan.
- **Accent:** Teal/green for positive statuses; amber for warnings.
- **Background:** White or very light blue.
- **Components:** Rounded cards, clear icons, simple status badges, readable forms, and consistent spacing.
- **Typography:** Use a Devanagari-supporting font for Marathi and a legible sans-serif for English.
- **Layout:** Mobile-first citizen experience; wider sidebar/table layout for admin.
- Avoid excessive shadows, crowded cards, or too many colours.

### Sample interface copy
- “नमस्कार! जल सेवेमध्ये आपले स्वागत आहे.”
- “आजचे पाणीपुरवठ्याचे वेळापत्रक”
- “नवीन तक्रार नोंदवा”
- “माझ्या तक्रारी”
- “बिल व पेमेंट”
- “टँकर विनंती”
- “सूचना व अपडेट्स”
- “तक्रार यशस्वीरीत्या नोंदवली (डेमो)”
- “ही फक्त प्रोटोटाइप नोंद आहे. प्रत्यक्ष तक्रार दाखल झालेली नाही.”
- “डेमो मोड — पेमेंट झालेले नाही.”

## 13. Prototype Data Model

Use local mock data only.

### Citizen
- `id`
- `name` (fictional)
- `demoCustomerNumber`
- `area`
- `addressLabel`

### WaterSchedule
- `id`
- `area`
- `date`
- `startTime`
- `endTime`
- `status`
- `notice`

### Complaint
- `id`
- `category`
- `area`
- `address`
- `description`
- `photoPreview`
- `createdAt`
- `status`
- `staffNote`

### Bill
- `id`
- `demoCustomerNumber`
- `billingPeriod`
- `amount`
- `dueDate`
- `paymentStatus`

### TankerRequest
- `id`
- `area`
- `address`
- `reason`
- `preferredDate`
- `createdAt`
- `status`

### Notice
- `id`
- `title`
- `area`
- `type`
- `message`
- `date`

## 14. Sample Demo Records

Use fictional records such as:
- Area: “शिवाजी नगर (Demo)”
- Water schedule: “सकाळी ७:०० ते ८:०० — नमुना वेळापत्रक”
- Complaint: “पाणी कमी दाबाने येत आहे”
- Bill amount: “₹450 — Sample Bill”
- Notice: “दुरुस्तीमुळे पुरवठा तात्पुरता बंद — Demo Notice”

Every screen containing these values must make clear that they are examples, not official information.

## 15. Acceptance Criteria

The prototype is ready to present when:

- [ ] Welcome screen provides citizen and admin demo entry points.
- [ ] Citizen dashboard links to every in-scope citizen service.
- [ ] Sample schedule can be viewed by area/date.
- [ ] Invalid complaint forms show validation messages.
- [ ] Valid complaint submission shows a generated ID and confirmation.
- [ ] Submitted complaint appears in the tracking list.
- [ ] Admin can update complaint status and add a note.
- [ ] Updated status is visible in the citizen tracking screen.
- [ ] Bill details are visible and the payment action is safely simulated.
- [ ] Tanker request can be submitted and tracked in demo state.
- [ ] Notices are visible and clearly labelled as samples.
- [ ] Admin can edit demo schedules/notices if this feature is implemented.
- [ ] Layout works at mobile and desktop widths.
- [ ] There are no broken navigation links or dead primary buttons.
- [ ] Sample-data and no-real-payment disclaimers are visible.

## 16. Suggested Development Plan

This is a prototype plan, not a production delivery estimate.

### Phase 1 — UI foundation
- Set up app and design tokens.
- Build navigation, landing screen, and shared components.
- Add responsive citizen and admin layouts.

### Phase 2 — Citizen screens
- Dashboard and schedule.
- Complaint form and tracking.
- Bills, tanker request, notices, and profile.

### Phase 3 — Admin demo interactions
- Admin dashboard and complaint detail.
- Status update flow.
- Sample schedule and notice editing.

### Phase 4 — Demo polish
- Add realistic fictional data.
- Validate all buttons and navigation.
- Test mobile and desktop layouts.
- Check Marathi text rendering.
- Ensure demo-only disclaimers are clear.

## 17. Risks and Constraints

- Without an official data source, water schedules and notices are illustrative only.
- Without a backend, changes may only persist in the current browser/session.
- Real payments, OTP, SMS, and municipal integrations require separate services, approvals, and secure implementation.
- A clickable prototype does not prove operational readiness or real-world accuracy.
- Avoid using actual citizen names, phone numbers, account numbers, bills, or addresses in the demo.

## 18. Future Enhancements — Not Required for Prototype

- Verified municipal/ward data integration.
- Real authentication and role-based access.
- Secure backend and database.
- Official payment-gateway integration.
- SMS/push notification service.
- Map-based leak and maintenance reporting.
- Real tanker dispatch workflow.
- Analytics and exportable reports.
- Multilingual and accessibility improvements.

## 19. Final Definition of Done

**Deliverable:** A polished, clickable Jal Seva prototype demonstrating the citizen journey and a basic admin workflow.

The prototype must use mock data, clearly identify itself as a demo, and avoid claiming that complaints, payments, tanker requests, schedules, or notices are connected to real public services.

**The immediate objective is to demonstrate the idea—not to build the complete production application.**
