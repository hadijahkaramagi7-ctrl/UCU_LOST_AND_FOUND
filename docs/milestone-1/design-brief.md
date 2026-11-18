# UCU Campus Lost and Found — Design Brief

## 1. Problem Statement

At Uganda Christian University (UCU), lost items are currently reported through disconnected WhatsApp groups, word of mouth, and physical noticeboards. When a student loses an item (like Okello losing his keys), and another student finds it (like Namusoke), their messages often reach different audiences. There is no shared, centralized place to search, match, verify ownership privately, or record that the item has been successfully returned.

The current process leads to:

- Duplicate effort and missed connections.
- Privacy risks (students sharing phone numbers or photos publicly).
- No secure way to prove an item belongs to you without exposing private details.
- No official record of returns.

## 2. Users and Personas

Our system serves three distinct user roles:

### Persona A — Okello (Student, Reporter of a Loss)

- **Needs:** Search for items by keyword, location (e.g., N5B), and date. Submit a _private_ claim describing a detail only the owner would know. Track claim status and get instructions on where to collect the item.
- **Frustrations:** WhatsApp messages scroll away quickly; anyone can see and claim an item; no way to prove ownership without giving away all the details.

### Persona B — Namusoke (Student, Reporter of a Find)

- **Needs:** Post a found item with a photo and public description _without_ exposing the private identifying detail. Receive claims and safely hand the item over to an administrator.
- **Frustrations:** Dealing with multiple people claiming the same item; fear of handing it to the wrong person.

### Persona C — Administrator (Lost-and-Found Office)

- **Needs:** Review reports and claims, view private evidence submitted by students, approve/reject claims with a reason, and confirm when an item has been physically collected.
- **Frustrations:** No audit trail; dealing with disputes between students.

## 3. User Stories & Acceptance Criteria

| ID   | As a...  | I want to...                         | So that...                         | Acceptance Criteria                                                                       |
| ---- | -------- | ------------------------------------ | ---------------------------------- | ----------------------------------------------------------------------------------------- |
| US1  | Student  | Register and log in                  | I can manage my reports securely   | Register with name/email/password; login with valid credentials; logout ends the session. |
| US2  | Student  | Post a lost or found report          | Others can find or return the item | Type, title, category, description, date, location, and photo are saved to the database.  |
| US3  | Student  | Add a private detail to a found item | Only the true owner can claim it   | Private detail is saved but NEVER shown publicly or via the public API.                   |
| US4  | Student  | Search and filter reports            | I can find a match quickly         | Keyword, category, location, date, and type filters all work correctly.                   |
| US5  | Student  | Claim a found item privately         | I can prove ownership to the admin | Claim evidence is saved and visible ONLY to the claimant and the admin.                   |
| US6  | Student  | View my claim status                 | I know what to do next             | Status (pending/approved/rejected) and the admin's response are visible to the claimant.  |
| US7  | Student  | Edit only my own reports             | My data stays accurate             | Attempting to edit another student's report returns a 403 Forbidden error.                |
| US8  | Admin    | Approve or reject claims             | I control the handover process     | Only one approved claim per item is allowed; rejecting a claim requires a reason.         |
| US9  | Admin    | Confirm an item return               | The listing closes properly        | Report status changes to 'returned'; no further claims can be submitted.                  |
| US10 | Student  | Not claim my own found item          | The process stays fair             | The system blocks the user from claiming an item they reported as found.                  |
| US11 | Any User | Use the app on my phone or keyboard  | I can access it anywhere           | Fully responsive at 375px; keyboard navigation works with visible focus states.           |

## 4. Functional Requirements

| FR  | Requirement         | Acceptance Criteria                                                                   |
| --- | ------------------- | ------------------------------------------------------------------------------------- |
| FR1 | Authentication      | Valid login grants access; logout terminates session.                                 |
| FR2 | Role-based Access   | Students cannot access admin endpoints (returns 403).                                 |
| FR3 | Report Creation     | Users can create reports with images and descriptions.                                |
| FR4 | Data Privacy        | `private_details` are stripped from all public API responses.                         |
| FR5 | Search & Filtering  | Search works across title and description; filters work correctly.                    |
| FR6 | Claim Submission    | Users can submit claims; system prevents duplicate open claims.                       |
| FR7 | Admin Review        | Admin can approve/reject; system enforces a maximum of one approved claim per report. |
| FR8 | Return Confirmation | Admin can mark an item as returned; system blocks new claims afterward.               |

## 5. Non-Functional Requirements

- **Security:** Passwords hashed with bcrypt; JWT for session management; secrets kept in `.env`.
- **Accessibility:** WCAG AA contrast, labelled forms, visible focus, full keyboard navigation.
- **Responsiveness:** Mobile-first design, fully usable on a 375px screen.
- **Validation:** Both frontend and backend validation with clear error messages.
- **Persistence:** MySQL database; data survives server restarts.

## 6. Group Roles (6 Members)

To ensure individual contribution is verifiable via Git history, work is divided as follows:

1. **Nakafeero Hadijah Karamagi (`@hadijahkaramagi7-ctrl`):** Homepage and Navigation (`/frontend/src/components/`).
2. **Aparo Olive Consolate (`@aparoolive9-blip`):** Overall Project Responsibility, Claims and Administration (`/frontend/src/pages/claims/` and `/frontend/src/pages/admin/`).
3. **Ampumuza Esther (`@ampumuzaesther783`):** Backend and Database (`/backend/` and `/database/`).
4. **Nabukenya Sarah (`@sarahsashaw26-oss`):** Authentication (`/frontend/src/pages/auth/`).
5. **Mirembe Norah (`@mirembenorah`):** Lost and Found Reports (`/frontend/src/pages/reports/`).
6. **Winyi Melvin:** QA, Testing, and Documentation.

## 7. Database Design and Wireframes

### Database Entity-Relationship Diagram (ERD)

Our database design uses a relational structure with three main tables: Users, Reports, and Claims. The system ensures data privacy by separating public report details from private claim evidence.

### Wireframes

We designed mobile and desktop wireframes for the main workflows:

1. **Authentication:** Login and Register pages.
2. **Search & Browse:** Filtering by location, date, and item type.
3. **Reporting:** Forms for lost items and found items (with private identification fields).
4. **Admin Dashboard:** Reviewing claims and confirming returns.
