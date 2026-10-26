# Jal Seva — Project Rules
## AI Coding Agent Rules for Antigravity

**Project:** जल सेवा (Jal Seva) — Water Supply Management App  
**Scope:** Clickable college-level prototype only  
**Version:** 1.0  
**Date:** October 2026

These rules apply throughout implementation. Follow them together with:
- `Jal_Seva_Prototype_PRD.md`
- `Jal_Seva_Design_Specification.md`
- `Jal_Seva_Architecture.md`
- `Jal_Seva_Task_Plan.md`

If two instructions conflict, preserve the prototype-only scope and do not add production integrations without explicit approval.

---

## 1. Core Project Rules

1. Build a **prototype only**, not a production water utility platform.
2. Prioritize a polished, clickable UI and demonstrable user flows.
3. Use fictional mock data for all citizens, schedules, bills, complaints, tanker requests, and notices.
4. Keep all primary buttons and navigation functional.
5. Follow the supplied PRD, Design Specification, Architecture, and Task Plan.
6. Inspect the existing repository before changing its structure or replacing code.
7. Reuse working components and established conventions where possible.
8. Do not add features beyond the agreed scope unless explicitly requested.
9. Keep implementation straightforward and easy for a college project to run and demonstrate.
10. Document any incomplete feature or known limitation honestly.

## 2. Prototype Boundaries

Do **not** implement or claim:
- Real OTP or SMS authentication.
- Real municipal or government API integration.
- Live water-supply or sensor data.
- Real customer-account or bill lookup.
- Real payment processing or payment-gateway integration.
- Real SMS, email, or push notification delivery.
- Real tanker dispatch.
- Production user authorization or security certification.
- Official status for sample schedules, complaints, bills, or notices.

Any future production work must be treated as a separate scope requiring explicit approval.

## 3. Data and Privacy Rules

- Use clearly fictional names, addresses, customer numbers, amounts, and dates.
- Do not request real passwords, OTPs, UPI PINs, card details, identity documents, or unnecessary personal information.
- Do not include real citizen records in source code or screenshots.
- Label demo data clearly in the interface.
- Do not state that a complaint has reached a municipal office.
- Do not state that a payment succeeded or a tanker was dispatched.
- If local storage is used, store only non-sensitive prototype records.
- Provide a way to reset demo data if edits persist and could affect a presentation.

## 4. UI/UX Rules

- Use a Marathi-first interface with readable Devanagari typography.
- Follow the reference visual style: deep navy, water blue, cyan, teal, amber, and pale-blue surfaces.
- Use consistent design tokens for colours, spacing, typography, borders, and radii.
- Reuse common components for buttons, cards, inputs, status badges, modals, and toasts.
- Keep screens clean, uncluttered, and easy to understand.
- Make primary actions visually obvious.
- Use persistent labels for form fields; do not rely on placeholders alone.
- Display validation messages close to the relevant fields.
- Design empty, success, and error states.
- Do not use colour alone to communicate status; include text.
- Ensure controls are keyboard-friendly and have visible focus states.
- Avoid horizontal overflow, clipped Marathi characters, and tiny touch targets.
- Make the layout responsive for mobile, tablet, and desktop.
- Use subtle animation only where it improves feedback; do not overdesign.

## 5. Navigation and Interaction Rules

- Citizen and Admin Demo entry points must work.
- Every primary navigation item must open the intended screen.
- Avoid dead buttons, placeholder links, and misleading controls.
- If a feature is not implemented, mark it as disabled or “Coming soon.”
- Complaint submission must validate required fields before creating a record.
- Successful complaint submission must show a unique demo reference ID.
- Newly submitted complaints must appear in the tracking list.
- Admin complaint status updates must be reflected in citizen tracking through shared prototype state.
- Tanker request submission must show a demo confirmation and request ID.
- The payment action must show a demo-only modal and never initiate a transaction.
- Schedule and notice edits, if implemented, must update the local prototype UI.
- Show success feedback only after the local prototype state has actually updated.
- Handle missing records and empty lists with clear messages.

## 6. Architecture and Code Rules

- Prefer React + Vite if there is no suitable existing frontend.
- Use the existing project stack if it is already working and appropriate.
- Keep page components, reusable components, mock data, state, and mock service functions logically separated.
- Use one shared state source for records that appear in both citizen and admin views.
- Use local mock service functions; do not add real network calls for prototype features.
- Keep code readable, consistently formatted, and easy to maintain.
- Use descriptive names for components, variables, functions, and routes.
- Avoid unnecessary dependencies, abstractions, and complex infrastructure.
- Do not duplicate large blocks of UI when a reusable component is appropriate.
- Handle errors and loading states where relevant, including simulated interactions.
- Do not put secrets, API keys, or credentials in the repository.
- Do not create a backend merely to make a simple mock interaction work.

## 7. Task Execution Rules

1. Read the four project documents before implementation.
2. Inspect the existing codebase and identify the current run/build commands.
3. Follow the Task Plan in order, resolving dependencies before later tasks.
4. Complete one logical task or phase at a time.
5. After each major phase, run the app and check for build/runtime errors.
6. Test the actual user flow, not just whether a component renders.
7. Preserve unrelated working features and files.
8. Do not silently remove existing functionality.
9. Do not claim a task is complete if it was not implemented and checked.
10. If blocked, explain the blocker and continue with independent tasks where possible.

## 8. Quality and Testing Rules

Before marking the prototype complete:
- [ ] App starts using documented commands.
- [ ] Citizen and Admin Demo entry points work.
- [ ] All primary routes and buttons work.
- [ ] Invalid forms show clear validation messages.
- [ ] Valid complaint submissions create a record and reference ID.
- [ ] Complaint appears in citizen tracking.
- [ ] Admin status update appears in citizen tracking.
- [ ] Tanker request creates a visible demo record.
- [ ] Payment modal clearly states that no payment is processed.
- [ ] Schedule and notice screens show sample-data labels.
- [ ] Empty states and missing-record states are handled.
- [ ] Marathi text renders correctly.
- [ ] Mobile and desktop layouts are checked.
- [ ] No major console, build, or runtime errors remain.
- [ ] No real credentials or personal data are required.
- [ ] README explains setup and run commands.
- [ ] Known limitations are documented.

## 9. Git and File Safety Rules

- Do not delete or overwrite unrelated files.
- Do not replace project configuration without checking current dependencies.
- Do not commit secrets, local environment files, or real personal data.
- Do not run destructive commands unless required and understood.
- Keep file names and folder structure consistent.
- If a requested change requires a large refactor, explain the reason and make it incrementally.

## 10. Definition of “Done”

The project is done when it provides a reliable, responsive, clickable prototype that demonstrates:
- Citizen entry and dashboard.
- Sample water schedule.
- Complaint registration and tracking.
- Admin complaint status management.
- Sample bills and a safe demo-payment modal.
- Simulated tanker request.
- Sample notices.
- Clear demo-only labels.
- Working primary navigation.
- No requirement for a real backend or external service credentials.

The goal is to demonstrate the Jal Seva concept clearly—not to claim that a real public water-supply service is operational.

---

## Final Instruction to Antigravity

**Follow these rules strictly.** Build only the prototype described in the project documents. Inspect before editing, reuse working code, use fictional mock data, test every primary interaction, and report what is complete versus incomplete. Do not add real integrations or expand the scope without asking.
