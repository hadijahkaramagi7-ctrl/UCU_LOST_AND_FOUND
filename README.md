# UCU CAMPUS LOST AND FOUND SYSTEM

## Uganda Christian University
**Faculty of Engineering, Design and Technology**  
**Department of Computing and Technology**  
**Course:** CSC1202 – Web and Mobile Applications Development



## 1. Project Overview

The UCU Campus Lost and Found System is a responsive full-stack web application developed to help students at Uganda Christian University report, search for, and recover lost property.

The system provides a centralized platform where students can report lost or found items, search for reported items, and submit private ownership claims. Administrators can review submitted claims, verify ownership evidence, and approve or reject claims.

The main goal is to make the process of recovering lost property easier, safer, and more organized within the university.

## 2. Problem Statement

At Uganda Christian University, lost and found items are commonly reported through WhatsApp groups, physical noticeboards, and word of mouth.

These methods make it difficult for students to find information about lost property. They also create privacy risks because personal contact information may be exposed.

The system addresses these challenges by providing one centralized platform for reporting, searching, claiming, and managing lost and found items.

## 3. Project Objectives

- To provide a centralized platform for reporting lost and found items.
- To enable students to search for reported items.
- To allow students to submit private ownership claims.
- To enable administrators to review and manage claims.
- To protect students' personal information and claim evidence.
- To improve the efficiency of returning lost property to its rightful owners.

## 4. Main System Features

### Student Features

- User registration and login.
- Reporting lost and found items.
- Searching for items using keywords and filters.
- Viewing reported item details.
- Submitting private ownership claims.
- Checking the status of submitted claims.

### Administrator Features

- Viewing submitted ownership claims.
- Reviewing private ownership evidence.
- Approving or rejecting claims.
- Providing reasons when rejecting claims.
- Preventing multiple approvals for the same item.
- Managing the claim verification process.

## 5. Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Frontend development and build tool |
| React Router | Page navigation |
| JavaScript | Application functionality |
| Axios | Communication with the backend API |
| Node.js | Backend runtime environment |
| Express.js | Backend framework |
| MySQL | Database management |
| Railway | Database hosting |
| Render | Backend hosting |
| Netlify | Frontend hosting |
| Git and GitHub | Version control and collaboration |

## 6. System Architecture

The system uses a three-tier architecture:

1. **Presentation Layer:** React.js frontend where students and administrators interact with the application.
2. **Application Layer:** Node.js and Express.js backend that processes requests, validates information, and enforces access control.
3. **Data Layer:** MySQL database that stores users, item reports, and ownership claims.

### Main Database Tables

- `users` – Stores user account information.
- `reports` – Stores lost and found item reports.
- `claims` – Stores ownership claims and private evidence.

## 7. Security Features

The system includes the following security measures:

- Password hashing using BcryptJS.
- JSON Web Tokens (JWT) for secure login sessions.
- Protected API endpoints.
- Role-based access control for students and administrators.
- Private ownership evidence restricted to authorized administrators.
- Validation to prevent students from claiming items they reported as found.
- Prevention of multiple approvals for the same item.

## 8. Deployment and Live Links

The application is deployed using cloud hosting services.

- **GitHub Repository:** https://github.com/hadijahkaramagi7-ctrl/UCU_LOST_AND_FOUND
- **Live Frontend Application:** https://gilded-tanuki-5e2d9f.netlify.app
- **Live Backend API:** https://ucu-lost-and-found-api.onrender.com
- **Database Hosting:** Railway

### Deployment Structure

| Component | Hosting Platform |
|---|---|
| Frontend | Netlify |
| Backend API | Render |
| Database | Railway |

## 9. Testing and Evaluation

The application was tested using manual user interface testing and backend API checks.

The following tests were performed:

- Verified that students cannot claim items they reported as found.
- Verified that administrators can approve ownership claims.
- Confirmed that approving a claim updates the item's status to `claimed`.
- Confirmed that the claim button is hidden from the public item details page after an item is claimed.
- Tested the application on a mobile screen with a width of 375px to check responsiveness.

## 10. Limitations and Future Improvements

Although the core functionality is complete, some improvements can be made in future versions.

### Image Uploads
The report form includes an optional image field, but actual file processing and server storage are not yet implemented. Future development may use Multer and cloud storage such as AWS S3.

### Email and SMS Notifications
Students currently need to log in to check their claim status. Future versions could include automated email or SMS notifications when administrators approve or reject claims.

## 11. Team Collaboration

The project was developed by a group of six students. GitHub was used for version control and team collaboration.

Feature branches, protected main branches, and Pull Requests were used to manage contributions and review code changes.

## 12. Group Members

| Name | Registration Number |
|---|---|
| Nakafeero Hadijah Karamagi | M26B13/032 |
| Aparo Olive Consolate | M26B13/007 |
| Ampumuza Esther | M26B13/086 |
| Nabukenya Sarah | M26B13/031 |
| Mirembe Norah | M26B13/025 |
| Winyi Melvin | M26B13/080 |

## 13. Acknowledgements

We acknowledge the use of AI tools, including ChatGPT and Meta AI, during the testing and deployment phases to assist with debugging connection errors, formatting documentation, and refining user interface code.

We also acknowledge the UCU Lost and Found scenario provided in the examination paper.

