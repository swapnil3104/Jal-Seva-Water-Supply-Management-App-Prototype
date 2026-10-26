# Jal Seva — UI/UX Design Specification
## Design MD for Prototype Development

**Product:** जल सेवा (Jal Seva) — Water Supply Management App  
**Document type:** UI/UX design specification  
**Version:** 1.0  
**Date:** October 2026  
**Scope:** Clickable college-level prototype only  
**Primary language:** Marathi  
**Platform:** Responsive web app, mobile-first

---

## 1. Design Vision

Design Jal Seva as a simple, trustworthy, citizen-friendly water-supply service. The interface should help residents quickly find their water schedule, submit a complaint, view sample bill information, request a tanker, and read notices. A separate admin area should make sample complaints and schedules easy to manage.

### Design principles
1. **Clarity first:** Make the next action obvious on every screen.
2. **Marathi-first:** Use natural, readable Marathi for primary actions and labels.
3. **Trust and transparency:** Mark all sample content as demo data.
4. **Low friction:** Keep forms short and use sensible defaults.
5. **Consistent patterns:** Reuse cards, buttons, status badges, form fields, and navigation.
6. **Responsive by default:** Prioritize mobile layouts, then adapt to desktop.

## 2. Visual Direction

Use the supplied Jal Seva presentation as the visual reference: deep navy backgrounds, water-blue/cyan accents, pale blue surfaces, and clean rounded cards. Keep the interface modern and uncluttered rather than copying slide layouts literally.

### 2.1 Colour palette

| Token | Suggested value | Usage |
|---|---|---|
| `navy-900` | `#0B2545` | Main brand, headers, admin sidebar |
| `blue-700` | `#087DB8` | Primary buttons, links, selected navigation |
| `cyan-500` | `#2DBFD0` | Highlights, water-themed accents |
| `teal-600` | `#239F83` | Positive status, resolved state |
| `amber-500` | `#F4A340` | Warnings, pending attention |
| `sky-50` | `#EEF8FC` | Page background and light panels |
| `white` | `#FFFFFF` | Cards and form surfaces |
| `slate-900` | `#182B3A` | Main text |
| `slate-600` | `#5D6B78` | Secondary text |
| `border` | `#D7E5EC` | Borders and dividers |
| `danger` | `#C74646` | Errors and destructive actions |

Use colours consistently. Do not rely on colour alone to convey a status; pair each status with text and, where helpful, an icon.

### 2.2 Typography

- Use a Devanagari-compatible font such as **Noto Sans Devanagari** for Marathi.
- Use a clean sans-serif such as **Inter** for Latin text and numbers if the font pairing is supported.
- Page title: 24–30 px desktop, 22–26 px mobile.
- Section title: 18–22 px.
- Body: 14–16 px.
- Helper text: 12–14 px.
- Button text: 14–16 px, medium or semibold.
- Keep line height comfortable for Marathi text; avoid clipping matras or conjunct characters.

### 2.3 Shape, spacing, and elevation

- Use an 8 px base spacing scale: 4, 8, 16, 24, 32, 40.
- Cards: 16 px radius.
- Inputs and buttons: 10–12 px radius.
- Main content max width: approximately 1200 px.
- Card padding: 16–24 px.
- Borders should do most of the grouping; use soft shadows sparingly.
- Use consistent icon size, generally 18–22 px.

## 3. Layout System

### 3.1 Citizen experience

**Desktop**
- Top header with logo, selected area, notices icon, and profile menu.
- Main content area with a clear page title.
- Dashboard cards in a responsive grid.
- Optional left sidebar only if the page count makes it useful.

**Mobile**
- Compact top bar with logo and notification/profile actions.
- One-column content layout.
- Large touch targets.
- Fixed bottom navigation with four destinations: Home, Schedule, Complaints, Profile.
- Other services accessible from the home service grid.

### 3.2 Admin experience

**Desktop**
- Fixed or sticky navy sidebar.
- Main area with page title, KPI cards, tables, filters, and detail panels.
- Use a distinct “Demo Admin” label.

**Mobile**
- Sidebar becomes a drawer or compact menu.
- KPI cards become a two-column grid or horizontal scroll.
- Tables convert into stacked complaint/request cards.

## 4. Navigation and Screen Map

### Citizen
1. Welcome
2. Home Dashboard
3. Water Schedule
4. New Complaint
5. My Complaints / Complaint Details
6. Bills & Payments
7. Tanker Request
8. Notices
9. Profile / Demo Account

### Admin
1. Admin Demo Entry
2. Overview Dashboard
3. Complaints List
4. Complaint Details / Update Status
5. Tanker Requests
6. Manage Water Schedules
7. Manage Notices

Navigation must not contain dead links. If a feature is not implemented, show a clearly labelled disabled or “Coming soon” state instead of a button that does nothing.

## 5. Screen-by-Screen Design

## 5.1 Welcome Screen

**Goal:** Explain the concept and let users enter the prototype.

Layout:
- Brand mark: simple water droplet or wave icon.
- Title: `जल सेवा`
- Subtitle: `पिण्याच्या पाण्याचा पुरवठा व्यवस्थापन ॲप`
- Tagline: `स्मार्ट • सोपी • पारदर्शक पाणीपुरवठा सेवा`
- Primary button: `नागरिक म्हणून पुढे जा`
- Secondary button: `Admin Demo`
- Footer note: `प्रोटोटाइप — नमुना माहिती`

Visual:
- Navy hero area with cyan/blue water accents.
- Light surface or pale blue background for supporting content.
- Keep the primary action visible without scrolling on common phone sizes.

Interactions:
- Citizen button opens Citizen Dashboard.
- Admin Demo opens Admin Dashboard directly; this is not secure authentication and must remain demo-only.

## 5.2 Citizen Home Dashboard

**Goal:** Make common services accessible immediately.

Recommended order:
1. Greeting: `नमस्कार! जल सेवेमध्ये आपले स्वागत आहे.`
2. Area chip: `परिसर: शिवाजी नगर (डेमो)`
3. Main schedule card: today's sample supply window and status.
4. Four primary service cards:
   - `पाणी वेळापत्रक`
   - `नवीन तक्रार`
   - `बिल व पेमेंट`
   - `टँकर विनंती`
5. Recent notices.
6. Recent complaint/request status.

Card design:
- Icon at the top or left.
- Short label and one-line explanation.
- Entire card clickable, with clear hover/focus states on desktop.

Empty and error states:
- If no complaint exists, show a friendly empty state and a `तक्रार नोंदवा` action.
- If sample schedule is unavailable, say `डेमो वेळापत्रक उपलब्ध नाही`; do not invent live status.

## 5.3 Water Schedule Screen

Elements:
- Page title: `पाणीपुरवठ्याचे वेळापत्रक`
- Area selector.
- Day selector: `आज`, `उद्या`, `पुढील दिवस`.
- Schedule card with date, start time, end time, and status.
- Notice panel for interruptions or maintenance.
- Small label: `नमुना वेळापत्रक — अधिकृत माहिती नाही`.

Status patterns:
- `नियोजित` — blue
- `विलंब` — amber
- `पुरवठा बंद` — red
- `पूर्ण` — teal

Interactions:
- Changing area/day updates local mock data.
- If no record matches, show an empty state rather than a fabricated schedule.

## 5.4 New Complaint Screen

Elements:
- Page title: `नवीन तक्रार नोंदवा`
- Step or helper text: `तक्रारीची माहिती भरा`
- Complaint category select:
  - पाणी गळती
  - कमी दाब
  - दूषित पाणी
  - पाणीपुरवठा बंद
  - इतर
- Area selector.
- Address/landmark input.
- Description textarea.
- Optional photo upload/preview.
- Primary button: `तक्रार सबमिट करा`
- Secondary action: `रद्द करा`

Form design:
- Single-column form on mobile.
- Two columns only for related short fields on wide desktop screens.
- Required fields have visible labels and clear validation messages.
- Show upload preview only; no external upload service is needed.

Success state:
- Check icon and heading: `तक्रार नोंदवली (डेमो)`
- Display generated ID, e.g. `JS-2026-001`.
- Copy/reference action if implemented.
- Button: `माझ्या तक्रारी पहा`.
- Disclaimer: `ही फक्त प्रोटोटाइप नोंद आहे. प्रत्यक्ष तक्रार दाखल झालेली नाही.`

## 5.5 My Complaints / Complaint Details

List item/card should display:
- Reference ID.
- Complaint type.
- Area.
- Date submitted.
- Current status badge.
- `तपशील पहा` action.

Detail page:
- Summary of complaint.
- Status timeline: Submitted → Under Review → In Progress → Resolved.
- Admin note/resolution note when present.
- Demo-only label.

Status badges must use both text and colour:
- Submitted: blue
- Under Review: amber
- In Progress: cyan/blue
- Resolved: teal
- Rejected: red

## 5.6 Bills & Payments Screen

Elements:
- Page title: `बिल व पेमेंट`
- Fictional customer number.
- Current sample bill card with amount, billing period, due date, and payment status.
- Previous bill list.
- `बिल पहा` action.
- `Pay Now` / `पेमेंट करा` action.

Payment modal:
- Heading: `डेमो पेमेंट`
- Message: `हे प्रोटोटाइप आहे. कोणतेही पेमेंट केले जाणार नाही.`
- One button: `समजले`
- Do not show real payment fields or request a UPI PIN/card credentials.

## 5.7 Tanker Request Screen

Elements:
- Page title: `टँकर विनंती`
- Area and address fields.
- Reason selector, e.g. water shortage / interruption / other.
- Preferred date (optional).
- Notes (optional).
- Submit action.

Success state:
- Generated demo request ID.
- Status `विनंती प्राप्त (डेमो)`.
- Message: `प्रत्यक्ष टँकर पाठवलेला नाही.`
- Action to view requests.

## 5.8 Notices Screen

Each notice card contains:
- Notice type icon.
- Title.
- Affected area.
- Date.
- Short message.
- Status/priority where appropriate.

Categories:
- नियोजित दुरुस्ती
- पाणीपुरवठा खंडित
- पुरवठा पूर्ववत
- सामान्य सूचना

Use a pinned or highlighted style for important sample notices. Every notice must include a demo label or appear under a visible sample-data banner.

## 5.9 Profile Screen

Elements:
- Fictional demo name.
- Demo customer number.
- Area and address label.
- Edit profile (optional local-only interaction).
- Logout / back to welcome.

Avoid collecting real identity documents or unnecessary personal details.

## 5.10 Admin Dashboard

Header:
- `प्रशासन डॅशबोर्ड`
- `Demo Admin` label.

KPI cards:
- नवीन तक्रारी
- प्रगतीत
- निकाली
- टँकर विनंत्या

Below KPIs:
- Recent complaints list/table.
- Recent tanker requests.
- Quick actions: `वेळापत्रक व्यवस्थापित करा`, `सूचना व्यवस्थापित करा`.

Use sample metrics and label them as demo. Do not imply that they reflect actual municipal operations.

## 5.11 Admin Complaint Management

List view:
- Search by demo ID or area.
- Filter by status and category.
- Each row/card shows ID, category, area, date, and status.

Detail view:
- Full complaint summary.
- Status dropdown.
- Staff note textarea.
- Save changes button.
- Confirmation toast after saving.

Prototype behaviour:
- Updating status must update shared client-side state.
- Citizen tracking view should reflect the new status immediately.
- Persistence after refresh is optional; if implemented, use local storage only for non-sensitive demo records.

## 5.12 Admin Schedule and Notices

Schedule editor:
- Area.
- Date.
- Start/end time.
- Status.
- Notice text.
- Save/cancel.

Notice editor:
- Title.
- Area.
- Type.
- Date.
- Message.
- Save/cancel.

Saved changes should affect only local prototype data and should remain visibly marked as demo content.

## 6. Component Library

Create reusable components rather than custom styling each screen.

### Core components
- `AppHeader`
- `CitizenBottomNav`
- `AdminSidebar` / `AdminMobileMenu`
- `PageHeader`
- `ServiceCard`
- `ScheduleCard`
- `NoticeCard`
- `ComplaintCard`
- `BillCard`
- `TankerRequestCard`
- `StatusBadge`
- `KpiCard`
- `FormField`
- `SelectField`
- `TextAreaField`
- `PhotoPreview`
- `EmptyState`
- `ConfirmModal`
- `ToastMessage`
- `DemoDataBanner`
- `LoadingState` (optional for simulated interactions)

### Component rules
- Buttons have primary, secondary, and destructive variants.
- All form controls have persistent labels; placeholders are not labels.
- Status badge colours and wording stay consistent everywhere.
- Cards have consistent radius, padding, and border treatment.
- Modals can be closed with a clear button and keyboard escape where supported.
- Toast messages should be brief and readable.

## 7. Interaction and Motion

- Use subtle hover/focus states, not elaborate animations.
- Buttons show visible pressed/disabled states.
- Forms show inline validation near the relevant field.
- Use short success toasts after saving demo data.
- Keep motion brief and nonessential; respect reduced-motion preferences where supported.
- Never use animation as the only indicator of status or completion.

## 8. Responsive Behaviour

### Mobile: 320–767 px
- One-column forms and cards.
- Bottom navigation for primary destinations.
- Full-width primary buttons where helpful.
- Admin tables become stacked cards.
- Avoid horizontal overflow.
- Keep important actions within easy thumb reach.

### Tablet: 768–1023 px
- Two-column card grids where appropriate.
- Compact admin navigation.
- Forms may use two columns for short related fields.

### Desktop: 1024 px and above
- Center content with a max-width around 1200 px.
- Three- or four-column service grid depending on space.
- Admin sidebar and data table layout.
- Maintain readable line lengths.

## 9. Accessibility and Content Rules

- Use semantic headings and labelled form controls.
- Maintain adequate text/background contrast.
- Provide visible keyboard focus.
- Make touch targets approximately 44 × 44 px or larger where possible.
- Icons with meaning need text labels or accessible names.
- Error messages explain how to fix the issue.
- Use simple Marathi language; keep terminology consistent.
- Check Devanagari rendering at all breakpoints.
- Do not communicate status by colour alone.
- Use fictional demo data only.

## 10. Prototype State and Navigation Behaviour

- Citizen and Admin Demo entry points work.
- All service cards navigate to the matching screen.
- Browser back and in-app navigation should behave predictably.
- Complaint submission adds a new record to the local mock dataset.
- Generated IDs should be unique within the current demo session.
- Complaint tracking reads from the same client-side state as Admin.
- Admin status updates are reflected in citizen tracking.
- Schedule and notice edits update the local UI state.
- Payment action always shows the demo-only modal and never initiates a transaction.
- Tanker submission displays confirmation but never dispatches a vehicle.
- Use clear empty states if there are no records.

## 11. Recommended Folder Structure

```text
src/
  app/
    App.jsx
    routes.jsx
  components/
    layout/
      AppHeader.jsx
      CitizenBottomNav.jsx
      AdminSidebar.jsx
    common/
      PageHeader.jsx
      StatusBadge.jsx
      DemoDataBanner.jsx
      EmptyState.jsx
      ConfirmModal.jsx
      ToastMessage.jsx
    dashboard/
      ServiceCard.jsx
      ScheduleCard.jsx
      KpiCard.jsx
      NoticeCard.jsx
    complaints/
      ComplaintForm.jsx
      ComplaintCard.jsx
      ComplaintTimeline.jsx
    bills/
      BillCard.jsx
    tanker/
      TankerRequestForm.jsx
  pages/
    WelcomePage.jsx
    CitizenDashboard.jsx
    WaterSchedulePage.jsx
    NewComplaintPage.jsx
    MyComplaintsPage.jsx
    BillsPage.jsx
    TankerRequestPage.jsx
    NoticesPage.jsx
    ProfilePage.jsx
    AdminDashboard.jsx
    AdminComplaintsPage.jsx
    AdminComplaintDetailPage.jsx
    AdminSchedulesPage.jsx
    AdminNoticesPage.jsx
  data/
    mockData.js
  styles/
    tokens.css
    global.css
```

This is a suggested structure; adapt it to the chosen framework or builder.

## 12. Design QA Checklist

- [ ] Visual style matches the navy, water-blue, cyan, and pale-blue reference.
- [ ] Marathi labels are readable and not clipped.
- [ ] Every screen has a clear title and primary action.
- [ ] Primary and secondary buttons are visually distinct.
- [ ] Cards, forms, and status badges are consistent.
- [ ] All navigation and primary actions work.
- [ ] Empty, validation, success, and modal states are designed.
- [ ] Citizen and Admin flows are distinguishable.
- [ ] Sample/demo disclaimer is visible.
- [ ] No real payment or authentication fields appear.
- [ ] Layout is checked at mobile, tablet, and desktop widths.
- [ ] No horizontal overflow or broken text wrapping.
- [ ] Keyboard focus and form labels are usable.
- [ ] No screen falsely claims to show live or official data.

## 13. Final Design Deliverable

Deliver a polished, responsive, clickable **Jal Seva prototype** with:
- A citizen-facing mobile-first interface.
- A basic admin dashboard.
- Consistent reusable UI components.
- Working mock complaint and tanker request flows.
- Sample schedule, bill, and notice screens.
- Simulated admin status updates.
- Clear demo-only messaging throughout.

**Do not build beyond prototype scope unless explicitly requested.**
