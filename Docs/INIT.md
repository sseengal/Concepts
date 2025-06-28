# Project Initialization Document

This document serves as the central reference point for the subscription-based educational web app project. It provides links to all relevant documentation, current project status, and features being worked on.

## Project Overview

We are building a subscription-based educational web app focused on primary school mathematics (Year 2 onwards), offering a mix of free and paid lessons, interactive exercises, and personalized learning experiences. The project emphasizes the core learning experience using no-code/low-code solutions for supporting features.

## Key Documentation

| Document | Purpose | Link |
|----------|---------|------|
| Product Requirements Document | Detailed description of the product requirements | [PRD.md](/Docs/PRD.md) |
| Feature Categories | Categorization of features into independent modules | [FeatureCategories.md](/Docs/FeatureCategories.md) |
| Task List | Sprint-wise task breakdown and progress tracking | [TaskList.md](/Docs/TaskList.md) |
| Information Architecture | Site structure and content organization | [InformationArchitecture.md](/Docs/InformationArchitecture.md) |
| User Flow | Complete user journey through the application | [UserFlow.md](/Docs/UserFlow.md) |

## MVP vs. Full Product

### MVP Focus
- Core learning experience (lessons, exercises, progress tracking)
- API-driven educational content
- Basic authentication via Supabase
- Simple payment integration via Stripe Payment Links
- Minimal viable administrative capabilities

### Full Product (Future)
- Advanced personalization and recommendations
- Comprehensive admin tools
- Multiple subscription tiers
- Parent and teacher dashboards
- Community features

## Current Project Status

**Overall Status:** Planning Phase

**Current Sprint:** Not Started

## Features Currently In Development

No features are currently in active development. The project is in the planning and setup phase.

## Technology Stack (No-Code/Low-Code Focus)

| Component | Technology | Rationale |
|-----------|------------|----------|
| Frontend | React.js with Tailwind CSS | Modern, component-based UI framework with utility-first CSS |
| Backend & Database | Supabase | Provides authentication, database, storage with minimal backend code |
| Content APIs | YouTube API, H5P, Open Education APIs | Leverage existing content rather than building from scratch |
| Authentication | Supabase Auth | Built-in authentication with minimal setup |
| Payments | Stripe Payment Links | No-code payment solution with simple integration |
| Hosting | Vercel/Netlify | Simplified deployment with CI/CD built-in |
| Analytics | Supabase Analytics | Built-in analytics capabilities |

## Next Steps

1. Finalize technology stack selection
2. Set up Supabase project
3. Initialize frontend project with React and Tailwind
4. Begin Sprint 1: Project Setup & Supabase Integration

## Team

Team members and roles will be defined as the project progresses.

## Important Links

- Repository: TBD
- Project Management: TBD
- Design Assets: TBD
- Development Environment: TBD
- Production Environment: TBD
- Supabase Dashboard: TBD
- Stripe Dashboard: TBD

---

*Last Updated: June 28, 2025*
