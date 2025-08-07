# VSME ESG Dashboard - shadcn/ui Implementation Plan

## Application Structure Overview

→ Login Page Structure
  → login-01 (block)
  → input
  → button
  → checkbox
  → select
  → alert

→ Dashboard Page Structure
  → Header Navigation
    → sidebar-01 (block)
    → avatar
    → dropdown-menu
    → tabs
    → progress
    → badge
    → button
  → Overview Cards Section
    → card
    → progress
    → button
    → badge
    → separator
    → alert
  → Module Status Grid
    → card
    → progress
    → badge
    → tooltip
    → separator

→ Data Entry Workflow Structure
  → B0: General Company Setup
    → Company Information Section
      → input
      → select
      → textarea
      → button
      → form
      → label
    → Premises Management Interface
      → button
      → dialog
      → select
      → input
      → table
      → badge

  → B1: Basis for Preparation Module
    → Reporting Scope Selection
      → radio-group
      → select
      → textarea
      → form
    → Subsidiary Management Table
      → table
      → button
      → dialog
      → select
      → input
      → form
      → badge
    → Sustainability Certification Manager
      → table
      → button
      → dialog
      → input
      → calendar
      → form
      → alert

  → B2: Sustainability Practices Module
    → Interactive Matrix Table for 10 Sustainability Issues
      → table
      → switch
      → badge
      → tooltip
      → progress
      → accordion
      → form

  → B3: Energy and GHG Emissions Module
    → Scope 1 Emissions Interface
      → tabs
      → accordion
      → select
      → input
      → form
      → card
      → table
      → button
      → dialog
    → Scope 2 Emissions Interface
      → card
      → input
      → select
      → form
      → table
    → Scope 3 Emissions Interface (Agri-food specific)
      → accordion
      → tabs
      → table
      → input
      → select
      → form
      → card
      → dialog
      → button

  → B4: Pollution Module
    → Air Pollution Tracker
      → card
      → select
      → input
      → form
      → table
      → chart
    → Water Pollution Tracker
      → card
      → select
      → input
      → form
      → table
      → button
    → Soil Pollution Tracker
      → card
      → input
      → form
      → table
      → calendar

  → B5: Biodiversity Module
    → Land Use Assessment
      → card
      → input
      → form
      → progress
      → chart
    → Nature-oriented Area Tracker
      → card
      → input
      → form
      → textarea
      → table
    → Biodiversity-sensitive Area Checker
      → card
      → input
      → select
      → form
      → table

  → B6: Water Module
    → Water Withdrawal Assessment
      → card
      → input
      → select
      → form
      → table
      → calendar
    → High Water-stress Area Identification
      → card
      → input
      → badge
      → alert
      → chart
    → Water Consumption Calculator
      → card
      → input
      → form
      → table
      → progress

  → B7: Resource Use & Waste Module
    → Circular Economy Assessment
      → card
      → accordion
      → textarea
      → form
      → table
    → Waste Management Interface
      → accordion
      → tabs
      → input
      → select
      → form
      → table
      → card
    → Material Flow Tracker
      → select
      → input
      → form
      → table
      → card

  → B8: Workforce General Module
    → Employee Count Interface
      → card
      → radio-group
      → input
      → form
      → table
    → Demographics Breakdown
      → card
      → accordion
      → input
      → form
      → chart
      → table
    → Geographic Distribution
      → card
      → select
      → input
      → form
      → table
    → Turnover Rate Calculator
      → card
      → input
      → form
      → progress
      → chart

  → B9: Workforce Health & Safety Module
    → Work-related Accidents Tracker
      → card
      → input
      → select
      → form
      → table
      → chart
    → Fatalities Tracker
      → card
      → input
      → textarea
      → form
      → alert
    → Health and Safety Management System
      → accordion
      → textarea
      → form
      → table

  → B10: Workforce Remuneration Module
    → Minimum Wage Compliance Checker
      → card
      → switch
      → textarea
      → form
      → alert
    → Gender Pay Gap Calculator
      → card
      → input
      → form
      → progress
      → chart
    → Collective Bargaining Tracker
      → card
      → input
      → form
      → progress
      → table
    → Training Hours Tracker
      → card
      → input
      → form
      → chart
      → table

  → B11: Corruption & Bribery Module
    → Convictions Tracker
      → card
      → input
      → form
      → table
      → alert
    → Anti-corruption Management System
      → accordion
      → textarea
      → form
      → table
    → Compliance Monitoring
      → card
      → table
      → calendar
      → form

→ Comprehensive Module (C1-C9) Structure
  → C1: Business Model Strategy
    → Business Model Documentation
      → card
      → textarea
      → select
      → form
      → table
    → Market Analysis
      → card
      → textarea
      → input
      → form
    → Business Relationships Mapping
      → card
      → table
      → form
      → select
    → Sustainability Strategy Integration
      → card
      → textarea
      → form
      → table

  → C2: Enhanced Practices Description
    → Detailed Policy Framework
      → accordion
      → textarea
      → form
      → table
      → calendar
    → Senior Responsibility Assignment
      → card
      → select
      → form
      → table
    → Governance Integration
      → card
      → textarea
      → form
      → table

  → C3: GHG Reduction Targets
    → Target Setting Interface
      → accordion
      → tabs
      → input
      → select
      → calendar
      → form
      → card
      → textarea
    → Target Performance Tracking
      → card
      → chart
      → progress
      → table
      → alert

  → C4: Climate Risks Assessment
    → Physical Risks Identification
      → accordion
      → textarea
      → select
      → form
      → card
      → input
    → Transition Risks Tracking
      → accordion
      → textarea
      → form
      → card
      → table
    → Adaptation Actions Tracker
      → card
      → textarea
      → form
      → table
      → calendar

  → C5: Additional Workforce Characteristics
    → Management Diversity Analysis
      → card
      → input
      → form
      → chart
      → progress
    → Extended Workforce Tracking
      → card
      → input
      → form
      → table
    → Leadership Development
      → card
      → textarea
      → form
      → table

  → C6: Human Rights Policies
    → Policy Existence Framework
      → accordion
      → switch
      → form
      → card
      → textarea
    → Implementation and Monitoring
      → card
      → form
      → table
      → calendar
    → Complaints Mechanism Tracker
      → card
      → textarea
      → form
      → table

  → C7: Human Rights Incidents
    → Incident Tracking Interface
      → card
      → select
      → calendar
      → textarea
      → form
    → Action Management
      → card
      → textarea
      → form
      → table
      → calendar
    → Value Chain Incident Tracker
      → card
      → form
      → table
      → alert

  → C8: Sector Revenue Tracking
    → Controversial Sector Revenue Assessment
      → accordion
      → input
      → select
      → form
      → card
    → Revenue Analysis and Justification
      → card
      → textarea
      → form
      → table
    → EU Taxonomy Alignment
      → card
      → switch
      → form
      → table
      → alert

  → C9: Governance Gender Diversity
    → Governing Body Composition Analysis
      → card
      → input
      → form
      → chart
      → table
    → Governance Effectiveness
      → card
      → textarea
      → form
      → table
    → Leadership Accountability
      → card
      → form
      → table
      → select

→ Reporting & Export Structure
  → Report Generation Interface
    → Export Functionality
      → card
      → button
      → dropdown-menu
      → progress
      → alert
    → Report Customization
      → card
      → select
      → form
      → textarea
    → Compliance Verification
      → card
      → table
      → alert
      → progress
    → Distribution Management
      → card
      → button
      → form
      → table

  → Data Visualization Dashboard
    → dashboard-01 (block)
    → Performance Analytics
      → card
      → chart
      → progress
      → table
    → KPI Monitoring
      → card
      → chart
      → alert
      → badge
    → Stakeholder Reporting
      → card
      → button
      → table
      → select

  → Quality Assurance System
    → Data Validation Framework
      → card
      → table
      → alert
      → progress
    → Audit Trail System
      → card
      → table
      → calendar
      → badge
    → External Verification Integration
      → card
      → form
      → table
      → button

→ System Administration Structure
  → User Management Interface
    → Role-based Access Control
      → card
      → table
      → select
      → form
      → switch
    → User Activity Monitoring
      → card
      → table
      → calendar
      → badge
  → System Configuration
    → Company Profile Management
      → card
      → input
      → form
      → avatar
      → select
    → Integration Management
      → card
      → form
      → table
      → switch
  → Support and Training
    → Help Documentation System
      → accordion
      → input
      → card
      → table
    → Training Management
      → card
      → form
      → table
      → progress