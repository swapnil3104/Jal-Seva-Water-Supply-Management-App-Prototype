# Jal Seva — Development Task Plan
## Prototype Implementation Tasks for Antigravity

**Project:** जल सेवा (Jal Seva) — Water Supply Management App  
**Document:** Task MD  
**Version:** 1.0  
**Date:** October 2026  
**Scope:** Clickable college-level prototype only  
**Primary objective:** Build a polished frontend demo using fictional data and simulated interactions.

---

## 1. Instructions for Implementation

Use these project documents as the source of truth:

1. `Jal_Seva_Prototype_PRD.md` — product requirements and scope.
2. `Jal_Seva_Design_Specification.md` — UI/UX and screen behaviour.
3. `Jal_Seva_Architecture.md` — code structure and state/data flow.

### Non-negotiable scope limits
- Build a **prototype only**.
- Use mock/sample data.
- Do not build a production backend unless explicitly requested.
- Do not integrate real OTP, payments, SMS, municipal APIs, or tanker dispatch.
- Do not claim sample schedules, complaints, bills, or notices are official or live.
- Mark prototype/sample information clearly in the UI.
- Prioritize working navigation and interactions over unnecessary infrastructure.

Before coding, inspect the existing project folder. Reuse working code where appropriate and avoid overwriting unrelated files.

## 2. Definition of Done

The prototype is considered complete when:
- Citizen and Admin demo entry points work.
- Every primary navigation item opens the correct screen.
- Users can view sample schedules, bills, and notices.
- Users can submit a complaint and receive a demo reference ID.
- The complaint appears in My Complaints.
- Admin can update complaint status and add a note.
- Citizen tracking reflects the admin's updated status.
- Users can submit and view a demo tanker request.
- The payment action only opens a demo disclaimer modal.
- Responsive layouts work on mobile and desktop.
- There are no dead primary buttons, broken routes, or obvious layout errors.

---

## 3. Task Breakdown

## Phase 0 — Project Inspection and Setup

### TASK-001: Inspect Existing Repository
**Priority:** Must  
**Tasks**
- [x] Inspect current folders, package files, framework, and existing components.
- [x] Identify existing routes, design tokens, and reusable code.
- [x] Check how to run the app locally.
- [x] Preserve unrelated or already-working functionality.
- [x] Report the current setup before making major structural changes.

**Acceptance criteria**
- Existing project structure is understood.
- The app's current run/build commands are identified.
- No unrelated files are deleted.

### TASK-002: Configure the Prototype Foundation
**Priority:** Must  
**Tasks**
- [x] Use React + Vite if no suitable existing frontend is present.
- [x] Configure the styling approach consistently (Tailwind CSS or CSS modules/plain CSS).
- [x] Add client-side routing.
- [x] Set up a shared layout and global styles.
- [x] Add a Devanagari-compatible font and Lucide icons if available.
- [x] Confirm the project starts without errors.

**Acceptance criteria**
- The app starts successfully.
- A basic route renders.
- Marathi text displays correctly.

---

## Phase 1 — Design System and Navigation

### TASK-003: Implement Design Tokens
**Priority:** Must  
**Tasks**
- [x] Add colour tokens: navy `#0B2545`, blue `#087DB8`, cyan `#2DBFD0`, teal `#239F83`, amber `#F4A340`, pale blue `#EEF8FC`.
- [x] Define typography, spacing, radii, borders, and shadow rules.
- [x] Create reusable button, card, input, status badge, modal, and toast styles.
- [x] Check text contrast and focus states.

**Acceptance criteria**
- Components use shared tokens instead of unrelated hard-coded values.
- The visual language is consistent across screens.

### TASK-004: Build Responsive Navigation and Layouts
**Priority:** Must  
**Tasks**
- [x] Build welcome layout.
- [x] Build citizen header and mobile bottom navigation.
- [x] Build admin sidebar or responsive drawer.
- [x] Add page title/header component.
- [x] Add visible “Prototype / Sample Data” banner.
- [x] Make navigation adapt to mobile, tablet, and desktop.

**Acceptance criteria**
- Navigation works across all main screens.
- No horizontal overflow at common mobile widths.
- Citizen and admin areas are visually distinguishable.

---

## Phase 2 — Citizen Screens

### TASK-005: Welcome and Demo Entry
**Priority:** Must  
**Tasks**
- [x] Show Jal Seva branding and Marathi tagline.
- [x] Add “नागरिक म्हणून पुढे जा” button.
- [x] Add “Admin Demo” button.
- [x] Add prototype-only notice.
- [x] Route each button to the correct dashboard.

**Acceptance criteria**
- Both entry buttons work.
- No real authentication is requested.

### TASK-006: Citizen Dashboard
**Priority:** Must  
**Tasks**
- [x] Add greeting and fictional selected area.
- [x] Add today's sample water schedule card.
- [x] Add service cards for schedule, complaint, bills, and tanker request.
- [x] Add recent sample notices.
- [x] Add recent complaint/request status summary.
- [x] Add sensible empty states.

**Acceptance criteria**
- All service cards open the appropriate screen.
- Dashboard content is clearly marked as sample data.

### TASK-007: Water Schedule
**Priority:** Must  
**Tasks**
- [x] Display area selector and day/date selector.
- [x] Show sample start/end time and status.
- [x] Display relevant sample maintenance/interruption notice.
- [x] Handle areas/dates with no schedule using an empty state.
- [x] Add demo data label.

**Acceptance criteria**
- Area/date controls update the displayed mock data.
- The screen never suggests the data is live or official.

### TASK-008: Complaint Registration
**Priority:** Must  
**Tasks**
- [x] Build complaint form with category, area, address/landmark, and description.
- [x] Make required fields explicit.
- [x] Add optional photo attachment preview if feasible.
- [x] Add inline validation.
- [x] Create a unique demo complaint ID on successful submit.
- [x] Show a success state and explicit prototype disclaimer.

**Acceptance criteria**
- Invalid form does not submit.
- Valid form creates a complaint in shared state.
- User sees the new reference ID.

### TASK-009: My Complaints and Tracking
**Priority:** Must  
**Tasks**
- [x] List sample and newly created complaints.
- [x] Display ID, category, area, date, and status.
- [x] Add complaint detail view.
- [x] Show status timeline and staff note.
- [x] Add an empty state with a register-complaint action.

**Acceptance criteria**
- Newly submitted complaints appear without manual refresh.
- Opening a complaint shows the correct record.

### TASK-010: Bills and Payment Demo
**Priority:** Must  
**Tasks**
- [x] Display fictional customer number and sample bill.
- [x] Show amount, billing period, due date, and payment status.
- [x] Add view-bill interaction.
- [x] Make the payment action open a demo-only modal.
- [x] Never request payment credentials or call a payment service.

**Acceptance criteria**
- Bill details are visible.
- Payment modal clearly says no payment is processed.

### TASK-011: Tanker Request
**Priority:** Should  
**Tasks**
- [x] Build form for area, address, reason, preferred date, and notes.
- [x] Validate required fields.
- [x] Generate a demo request ID.
- [x] Show confirmation and demo status.
- [x] Make the request visible in the admin view if implemented.

**Acceptance criteria**
- Valid submission creates a visible mock request.
- UI explicitly says no real tanker is dispatched.

### TASK-012: Notices and Profile
**Priority:** Should  
**Tasks**
- [x] Display sample notices by area, type, date, and message.
- [x] Build a fictional demo profile screen.
- [x] Add logout/back-to-welcome interaction.
- [x] Avoid collecting real personal information.

**Acceptance criteria**
- Notices are easy to read and clearly labelled as samples.
- Profile uses fictional data only.

---

## Phase 3 — Admin Demo

### TASK-013: Admin Dashboard
**Priority:** Must  
**Tasks**
- [x] Add KPI cards for new, in-progress, and resolved complaints.
- [x] Add tanker request count.
- [x] Add recent complaint list.
- [x] Add shortcuts to complaint, schedule, notice, and tanker sections.
- [x] Add “Demo Admin” label.

**Acceptance criteria**
- KPIs are derived from mock state where practical.
- Admin content is clearly marked as demo.

### TASK-014: Complaint Management
**Priority:** Must  
**Tasks**
- [x] Build complaint list with status/category filters.
- [x] Add complaint details page.
- [x] Add status selector and staff note.
- [x] Save updates to shared state.
- [x] Show success feedback.

**Acceptance criteria**
- Admin can change a complaint status.
- Citizen tracking reflects the updated status immediately.

### TASK-015: Schedule and Notice Management
**Priority:** Should  
**Tasks**
- [x] Build sample schedule list and editor.
- [x] Build sample notice list and editor.
- [x] Save changes to shared prototype state.
- [x] Reflect edits on citizen-facing screens.
- [x] Keep all edited records marked as demo content.

**Acceptance criteria**
- Admin can create/update sample schedules or notices.
- Citizen views reflect saved demo changes.

### TASK-016: Tanker Request Admin View
**Priority:** Should  
**Tasks**
- [x] List demo tanker requests.
- [x] Show request ID, area, reason, date, and status.
- [x] Allow a simulated status update if time permits.

**Acceptance criteria**
- Submitted demo requests can be reviewed in the admin interface.

---

## Phase 4 — State and Mock Services

### TASK-017: Shared Prototype State
**Priority:** Must  
**Tasks**
- [x] Store schedules, complaints, bills, tanker requests, notices, and demo profile in one shared state layer.
- [x] Use React Context + `useReducer` or an equivalent simple approach.
- [x] Ensure citizen and admin pages read from the same state.
- [x] Provide a reset-demo-data action if persistent changes are used.

**Acceptance criteria**
- Creating or editing a record updates all relevant screens consistently.

### TASK-018: Mock Service Functions
**Priority:** Must  
**Tasks**
- [x] Implement mock functions for list, create, read, and update operations.
- [x] Centralize demo ID generation.
- [x] Handle missing records and invalid updates gracefully.
- [x] Do not add network requests or real API dependencies.

**Acceptance criteria**
- Data operations are separated from page presentation.
- The prototype can run without backend credentials.

### TASK-019: Optional Local Persistence
**Priority:** Optional  
**Tasks**
- [x] Persist non-sensitive demo records in local storage only if useful.
- [x] Handle invalid/unavailable stored data gracefully.
- [x] Provide reset functionality.
- [x] Do not store passwords, real phone numbers, or payment data.

**Acceptance criteria**
- Demo edits survive refresh if persistence is enabled.
- App remains usable if persistence is disabled.

---

## Phase 5 — Quality Assurance and Delivery

### TASK-020: Responsive and Visual QA
**Priority:** Must  
**Tasks**
- [x] Test widths around 320 px, 375 px, 768 px, 1024 px, and desktop.
- [x] Check cards, forms, navigation, modals, and tables.
- [x] Check Marathi text wrapping and Devanagari rendering.
- [x] Check button contrast, focus states, and touch target sizes.
- [x] Fix horizontal overflow and clipping.

**Acceptance criteria**
- Main flows work at mobile and desktop sizes.
- No major layout defects remain.

### TASK-021: Functional QA
**Priority:** Must  
**Tasks**
- [x] Test citizen and admin entry.
- [x] Test all primary navigation links.
- [x] Test invalid and valid complaint submissions.
- [x] Test tracking after complaint creation.
- [x] Test admin status update and citizen status reflection.
- [x] Test tanker request submission.
- [x] Test bill and demo-payment modal.
- [x] Test schedule/notice editing if implemented.
- [x] Check empty states and missing IDs.

**Acceptance criteria**
- No broken primary actions or critical flow blockers.

### TASK-022: Final Demo Preparation
**Priority:** Must  
**Tasks**
- [x] Add realistic but fictional demo records.
- [x] Confirm all sample data is labelled.
- [x] Remove debug text and obvious placeholder defects.
- [x] Add README with setup/run instructions.
- [x] Verify the app starts from a clean install.
- [x] Prepare a short demonstration path.

**Acceptance criteria**
- Project can be launched and presented without external service credentials.
- Demo flows can be completed reliably.

---

## 4. Priority Summary

### Must have
- Project setup and route foundation.
- Design tokens and responsive navigation.
- Welcome screen and citizen dashboard.
- Water schedule.
- Complaint registration and tracking.
- Bills with safe demo-only payment interaction.
- Admin dashboard and complaint status update.
- Shared mock state and mock services.
- Responsive and functional QA.

### Should have
- Tanker request submission and admin review.
- Notices and profile screens.
- Schedule and notice editors.

### Optional
- Local storage persistence.
- Photo preview for complaint attachments.
- Advanced filters, animations, or extra reporting.

## 5. Recommended Build Order

1. Inspect the existing codebase.
2. Set up routes, design tokens, and shared layout.
3. Build the welcome screen and citizen dashboard.
4. Implement mock data and shared state early.
5. Build water schedule and complaint submission.
6. Build complaint tracking and admin status update.
7. Add bills and the demo payment modal.
8. Add tanker requests, notices, and profile.
9. Complete admin schedule/notice tools if time permits.
10. Test responsive layouts and all key interactions.
11. Prepare demo data and README.

## 6. Suggested Demo Walkthrough

Use this sequence when presenting the prototype:

1. Open the welcome page.
2. Enter as a citizen.
3. View the sample water schedule.
4. Submit a complaint about low water pressure.
5. Copy or note the generated demo complaint ID.
6. Open My Complaints and show the submitted record.
7. Return to welcome and enter Admin Demo.
8. Open the complaint and change its status to “In Progress” or “Resolved.”
9. Return to citizen tracking and show the updated status.
10. Open Bills & Payments and demonstrate the safe payment modal.
11. Submit a tanker request and show its demo confirmation.

## 7. Antigravity Execution Instructions

Implement this task plan in the existing repository.

- Follow the PRD, Design Specification, and Architecture documents.
- Work in small, verifiable steps.
- Run the app and fix build/runtime errors after each major phase.
- Do not replace existing working code without inspection.
- Do not add features outside the defined prototype scope.
- Do not create fake integrations or claim actions succeeded in real public systems.
- Use fictional data and visible demo labels.
- At the end, report completed tasks, incomplete tasks, run commands, and any known limitations.

## 8. Final Deliverable

A responsive, clickable Jal Seva prototype with:
- Citizen and Admin demo entry.
- Sample water schedule, bills, and notices.
- Working complaint creation and tracking.
- Admin complaint status updates reflected in citizen view.
- Simulated tanker requests.
- Demo-only payment behaviour.
- Consistent Marathi-first UI.
- No requirement for a production backend or real service integrations.

**Build the smallest polished prototype that demonstrates the core concept reliably.**
