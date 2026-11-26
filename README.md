# UCU CAMPUS LOST AND FOUND SYSTEM

**Faculty of Engineering, Design and Technology**  
**Department of Computing and Technology**

**Course:** CSC1202 – Web and Mobile Applications Development  
**Project:** UCU Campus Lost and Found System  
**Date:** November 26, 2026

---

## 1. Project Links and Repository Details

- **GitHub Repository:** https://github.com/hadijahkaramagi7-ctrl/UCU_LOST_AND_FOUND
- **Live Frontend Application:** https://gilded-tanuki-5e2d9f.netlify.app
- **Live Backend API:** https://ucu-lost-and-found-api.onrender.com
- **Database Hosting:** Railway

## 2. Introduction and Problem Statement

At Uganda Christian University, lost items are commonly reported through disconnected WhatsApp groups, physical noticeboards, and word of mouth.

This makes it difficult for students who lose belongings to find students who may have found them. There is no centralized platform to search for items, verify ownership privately, or keep records of returned property.

These challenges lead to:
- Lost items remaining unrecovered.
- Delayed communication between students.
- Privacy risks, such as exposing students' phone numbers.
- Lack of official records of returned items.

### Project Solution

The UCU Campus Lost and Found System is a responsive full-stack web application designed to simplify the process of reporting, searching for, claiming, and recovering lost property.

Students can report lost and found items and submit private ownership evidence. Administrators can review claims, verify ownership, and confirm the return of items.

## 3. Requirements and System Design

The system was designed to meet the following requirements.

### Student Requirements
- Register and log in.
- Report lost and found items.
- Search for items using keyword filters.
- View reported item details.
- Submit private ownership claims for found items.

### Administrator Requirements
- View all pending claims.
- Review private ownership evidence.
- Approve or reject claims.
- Provide reasons when rejecting claims.
- Prevent multiple approvals for the same item.

### Security Requirements
- Hash passwords using BcryptJS.
- Protect backend API endpoints.
- Restrict administrative functions to authorized administrators.
- Ensure private claim details are not exposed on public item listings.

### System Architecture

The application uses a three-tier architecture:

1. **Frontend:** React with Vite.
2. **Backend:** Node.js and Express.js.
3. **Database:** MySQL.

### Database Design

The system uses three main database tables:

| Table | Purpose |
|---|---|
| `users` | Stores user information and account details. |
| `reports` | Stores lost and found item reports. |
| `claims` | Stores ownership claims and private evidence. |

Private claim evidence is linked to its specific claim and is not exposed through public search queries.

## 4. Implementation

The application was developed using JavaScript technologies, focusing on user experience, security, and full-stack integration.

### Frontend Development

The frontend was developed using:
- React.js for building the user interface.
- React Router for navigation between application pages.
- Axios for communicating with the backend API.
- Vite for development and building the application.

The login and registration pages were styled to resemble the official UCU Alpha MIS portal, including the university logo and a full-screen campus background.

### Backend Development

The backend uses Express.js and includes:

- JSON Web Tokens (JWT) for secure login sessions.
- BcryptJS for password hashing.
- Role-Based Access Control (RBAC).
- Protected administrative routes.
- Validation to prevent students from claiming items they reported as found.

### Database Implementation

The application uses MySQL hosted on Railway.

SQL JOIN operations are used to retrieve related information for the administrator dashboard. Private claim evidence and claimant details are restricted to authorized administrators.

## 5. Deployment and Configuration

The full-stack application is deployed using three cloud hosting platforms.

### Database – Railway

A MySQL database was provisioned on Railway and exposed through a public TCP proxy.

### Backend – Render

The Node.js backend was deployed on Render. Environment variables, including `DB_HOST` and `DB_PORT`, were configured to allow the backend to connect securely to the Railway database.

### Frontend – Netlify

The React frontend was deployed on Netlify. Axios API endpoints were updated to communicate with the live Render backend.

### Deployment Summary

| Component | Hosting Platform |
|---|---|
| Frontend | Netlify |
| Backend | Render |
| Database | Railway |
| Source Code | GitHub |

## 6. Testing and Evaluation

The application was tested through manual user interface testing and backend API checks.

The following tests were successfully performed:

1. **Claim Validation:** Verified that users cannot claim items they themselves reported as found. The backend returns a validation error when this rule is violated.

2. **Administrator Approval:** Tested that when an administrator approves a claim, the corresponding item's database status changes to `claimed`.

3. **Claim Button Visibility:** Confirmed that the claim button is automatically hidden from the public Item Details page after an item is claimed.

4. **Mobile Responsiveness:** Tested the application using a 375px mobile screen width in Chrome DevTools to ensure that forms and tables display responsively.

## 7. Limitations and Future Work

Although the core functionality of the application is complete, some limitations were identified during testing.

### Image Upload

The report form includes an optional image field, but actual file processing and server storage have not yet been implemented.

**Future improvement:** Implement Multer and cloud storage services such as AWS S3 to support actual image uploads.

### Email and SMS Notifications

Students currently need to log in to check the status of their ownership claims.

**Future improvement:** Implement automated email or SMS notifications to inform students when administrators approve or reject their claims.

## 8. Reflections and Acknowledgements

Developing the UCU Campus Lost and Found System helped our group understand the importance of full-stack application development, database integration, and version control.

One major challenge was managing Git merge conflicts when multiple team members were pushing code simultaneously. We addressed this by using feature branches, protecting the main branch, and creating Pull Requests for code reviews.

Another challenge was cloud deployment, especially resolving network connection issues between the Render backend and the Railway database.

### Acknowledgements

We acknowledge the use of AI tools, including ChatGPT and Meta AI, during the testing and deployment phases. These tools assisted with debugging connection errors, formatting documentation, and refining user interface code.

We also acknowledge the UCU Lost and Found scenario provided in the examination paper.

## 9. Group Members

| Name | Registration Number |
|---|---|
| Nakafeero Hadijah Karamagi | M26B13/032 |
| Aparo Olive Consolate | M26B13/007 |
| Ampumuza Esther | M26B13/086 |
| Nabukenya Sarah | M26B13/031 |
| Mirembe Norah | M26B13/025 |
| Winyi Melvin | M26B13/080 |

