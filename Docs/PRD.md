

## Product Requirements Document (PRD): Subscription-Based Educational Web App (MVP)

**Product Name:** (TBD)  
**Date:** June 28, 2025  
**Prepared by:** Senior Engineer

## 1. **Objective**

Build a subscription-based educational web app, inspired by Khan Academy and IXL Learning, focusing initially on primary school mathematics (Year 2 onwards). The app will offer a mix of free and paid lessons, interactive exercises, and personalized, self-paced learning outside the classroom. The MVP will lay the groundwork for future expansion into other subjects and assessment features.

## 2. **Target Users**

- **Primary:** Students (Year 2–Year 6) seeking supplementary learning resources.
- **Secondary:** Parents and guardians (for progress tracking and subscription management).
- **Tertiary (Future):** Teachers (for monitoring and assigning content).

## 3. **User Needs & Value Proposition**

- Access to high-quality, curriculum-aligned math lessons and exercises.
- Self-paced, interactive learning outside school.
- Progress tracking and personalized recommendations.
- Affordable, flexible subscription options.
- Free tier for accessibility; premium for advanced content and features.

## 4. **Key Features (MVP)**

### **A. User Management**
- Student and parent registration (email, Google, or Apple sign-in)[4].
- User profiles with basic info and progress tracking[4][9].

### **B. Course & Content Management**
- Structured math curriculum (Year 2 onwards), organized by topic and difficulty[3][4].
- Content types:  
  - Short instructional videos[2][4][7]
  - Text explanations and worked examples
  - Practice exercises (multiple-choice, short answer)[3][4][7]
- Free and paid lesson segmentation[3][4].

### **C. Learning Experience**
- Lesson flow:  
  1. Concept introduction (video/text)
  2. Examples
  3. Practice exercises with instant feedback[3][4][7]
- Progress tracking dashboard (lessons completed, scores, streaks)[5][9].
- Personalized recommendations based on performance (basic rules-based for MVP)[9].

### **D. Subscription & Payments**
- Free tier with limited access.
- Paid subscription for full access to lessons and exercises.
- Simple payment integration (Stripe/PayPal).

### **E. Admin Panel**
- Course/content upload and management (videos, exercises, explanations)[4].
- User management and analytics (basic usage stats).

## 5. **Out of Scope (for MVP, but planned for future phases)**

- Additional subjects (English, Science, etc.)
- Advanced gamification (badges, leaderboards)
- Adaptive AI-driven learning paths
- Teacher dashboards and assignment tools
- Community forums or live classes
- Offline access and mobile app
- Multilingual support

## 6. **User Flows**

**Student:**
- Sign up/log in → Choose grade → Browse curriculum → Select lesson → Watch video/read explanation → Complete exercises → View feedback and progress

**Parent:**
- Register/log in → Link to child’s account → View child’s progress → Manage subscription

## 7. **Phased Rollout Plan**

| Phase         | Focus                                      | Features                                                                                 |
|---------------|--------------------------------------------|------------------------------------------------------------------------------------------|
| **MVP Phase 1** | Core Learning Experience                    | Frontend setup, curriculum structure, lesson flow UI, content API integration, interactive exercises |
| **MVP Phase 2** | Supporting Features                         | Basic Supabase integration, simple authentication, progress tracking, Stripe payment links |
| **MVP Phase 3** | Launch Preparation                          | Testing, optimization, basic analytics, feedback collection |
| **Full Phase 1** | Enhanced Learning Experience                | Advanced personalization, expanded content, basic gamification, parent dashboards |
| **Full Phase 2** | Advanced Features                           | Teacher tools, assessments, advanced analytics, community features |
| **Full Phase 3** | Platform Expansion                          | Mobile app, offline mode, additional subjects, multilingual support |

## 8. **Success Metrics (MVP)**

- Number of registered users (students/parents)
- Lesson completion rates
- Conversion rate (free to paid)
- User retention (30/60/90 days)
- Average time spent per session

## 9. **Technical Requirements & Stack**

| Layer          | Technology (No-Code/Low-Code Focus)        | Rationale                                    |
|----------------|-------------------------------------------|----------------------------------------------|
| Frontend       | React.js (JavaScript with ES modules), Tailwind CSS (UI) | Modern, component-based UI framework with simplified JavaScript architecture |
| Backend        | Minimal custom backend                    | Leverage APIs and services instead           |
| Database       | Supabase (PostgreSQL)                     | Low-code database with built-in functionality |
| Content        | Educational APIs, YouTube API, H5P        | Leverage existing content rather than build  |
| Authentication | Supabase Auth                             | Built-in authentication with minimal setup   |
| Payments       | Stripe Payment Links                      | No-code payment solution with simple setup   |
| Hosting        | Vercel/Netlify                            | Simplified deployment with CI/CD built-in    |
| Analytics      | Supabase Analytics                        | Built-in analytics capabilities              |

## 10. **UX/UI Principles**

- Simple, clean, and child-friendly interface[1][2].
- Clear navigation by grade, topic, and lesson.
- Visual progress indicators and instant feedback.
- Responsive design for tablets and desktops.

## 11. **Risks & Mitigations**

- **Content quality:** Partner with educators for curriculum alignment.
- **User engagement:** Start with core features, add gamification in future.
- **Payment friction:** Use trusted payment gateways.
- **Scalability:** Modular backend, cloud hosting.

## 12. **Dependencies**

- Curriculum experts for content creation.
- Video production resources.
- Payment gateway setup.
- Legal: Privacy policy, parental consent for minors.

## 13. **Appendix: Future Feature Ideas**

- AI-driven adaptive learning paths
- Gamified rewards and leaderboards
- Parent/teacher notifications
- In-app messaging and community forums
- Mobile app (iOS/Android)
- Multilingual content

**Summary:**  
This MVP PRD outlines a focused, scalable web app for primary school math learning, blending free and paid content, interactive exercises, and basic personalization. The phased approach ensures rapid delivery of core value, with a clear path for future growth and feature expansion[4][7][9].

[1] https://www.netsolutions.com/insights/effective-features-of-best-educational-apps/
[2] https://appwrk.com/educational-app-development-15-must-have-features-for-smart-and-systematic-learning
[3] https://theninehertz.com/blog/how-to/build-an-app-like-khan-academy
[4] https://www.truevalueinfosoft.com/build-app-like-khan-academy.html
[5] https://www.formaloo.com/blog/top-education-apps-of-2024-their-advantages
[6] https://www.reddit.com/r/ProductManagement/comments/jn1og3/a_pm_noob_how_do_i_write_a_prd_and_launching_plan/
[7] https://upstackstudio.com/blog/how-to-create-e-learning-app/
[8] https://files.eric.ed.gov/fulltext/ED627597.pdf
[9] https://www.techugo.com/blog/how-to-build-an-education-app-like-khan-academy-and-revolutionize-education/