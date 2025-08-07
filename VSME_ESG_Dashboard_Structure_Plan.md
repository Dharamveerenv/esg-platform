# VSME ESG Reporting Dashboard Structure Plan

## Application Structure Overview

→ Login Page Structure
  → Company login credentials input
  → User profile dropdown with avatar display
  → "Remember me" functionality checkbox
  → Password reset workflow interface
  → Multi-factor authentication option
  → Language selection dropdown
  → Terms and conditions acceptance

→ Dashboard Page Structure
  → Header Navigation
    → Company logo and name display
    → User profile dropdown with settings
    → Main navigation tabs: Dashboard, Reporting, Data Entry, Settings
    → Progress indicators for incomplete sections
    → Notification bell with alert count
    → Help and support access button
  → Overview Cards Section
    → Reporting status overview (Basic Module vs Comprehensive Module)
    → Progress cards showing completion percentage for each module (B1-B11, C1-C9)
    → Quick action buttons: "New Report", "Continue Draft", "Export Report"
    → Recent activity feed with timestamps
    → Deadline tracker with countdown timers
    → Compliance status indicators
  → Module Status Grid
    → B0: General Company Information
      --- Completion status indicator
      --- Last updated timestamp
      --- Required fields counter
    → B1: Basis for Preparation
      --- Completion status indicator
      --- Module type selection status
      --- Subsidiary count display
    → B2: Practices & Policies
      --- Completion status indicator
      --- Policy count tracker
      --- Public availability status
    → B3: Energy and GHG Emissions
      --- Completion status indicator
      --- Scope 1/2/3 breakdown status
      --- Total emissions display
    → B4: Pollution
      --- Completion status indicator
      --- Pollutant categories tracked
      --- Location count display
    → B5: Biodiversity
      --- Completion status indicator
      --- Total land area input status
      --- Protected area count
    → B6: Water
      --- Completion status indicator
      --- Total withdrawal status
      --- Water stress assessment status
    → B7: Resource Use & Waste
      --- Completion status indicator
      --- Waste categories tracked
      --- Circular economy practices count
    → B8: Workforce General
      --- Completion status indicator
      --- Employee count status
      --- Demographics breakdown status
    → B9: Workforce Health & Safety
      --- Completion status indicator
      --- Accident tracking status
      --- Safety metrics display
    → B10: Workforce Remuneration
      --- Completion status indicator
      --- Pay gap calculation status
      --- Compliance indicator
    → B11: Corruption & Bribery
      --- Completion status indicator
      --- Incident tracking status
      --- Compliance verification

→ Data Entry Workflow Structure
  → B0: General Company Setup
    → Company Information Section
      --- Company name input field
      --- Registration number input
      --- NACE code dropdown (industry classification)
      --- Staff count (FTE) calculator with validation
      --- Revenue input (€) with currency selector
      --- Reporting period date picker
      --- Contact information fields
    → Premises Management Interface
      --- Add/remove multiple locations functionality
      --- Geolocation picker for each premise
      --- Premise type dropdown (Office, Warehouse, Production, Retail)
      --- Premise size input (M3) with unit converter
      --- Address validation system
      --- Map integration for location verification
      --- Photo upload for premise documentation

  → B1: Basis for Preparation Module
    → Reporting Scope Selection
      --- Module selection interface (Basic only vs Basic + Comprehensive)
      --- Sensitive information omission tracker with justification
      --- Individual vs Consolidated reporting selector
      --- Reporting boundaries definition
    → Subsidiary Management Table
      --- Add/remove subsidiary functionality
      --- Legal form dropdown with validation
      --- NACE sector classification with search
      --- Balance sheet input (€) with validation
      --- Turnover input (€) with trend analysis
      --- Employee count (FTE) with breakdown options
      --- Country selection dropdown with flag display
      --- Location input (Eircode/Postcode/Geolocation)
      --- Ownership percentage calculator
      --- Control mechanism selector
    → Sustainability Certification Manager
      --- Add/remove certification functionality
      --- Provider input field with autocomplete
      --- Description/Name field with character limit
      --- Date picker for evaluation with validation
      --- Rating/score input with scale definition
      --- Certificate upload functionality
      --- Expiry date tracking
      --- Renewal notification system

  → B2: Sustainability Practices Module
    → Interactive Matrix Table for 10 Sustainability Issues
      --- Climate Change policy tracker
        ---- Policy existence toggle
        ---- Public availability indicator
        ---- Target setting status
        ---- Implementation timeline
      --- Pollution management tracker
        ---- Air pollution policy status
        ---- Water pollution policy status
        ---- Soil pollution policy status
        ---- Prevention measures documentation
      --- Water & Marine Resources tracker
        ---- Water management policy status
        ---- Conservation measures documentation
        ---- Marine impact assessment status
      --- Biodiversity & Ecosystems tracker
        ---- Biodiversity policy status
        ---- Conservation initiatives tracker
        ---- Impact assessment status
      --- Circular Economy tracker
        ---- Circular economy principles application
        ---- Waste reduction initiatives
        ---- Resource efficiency measures
      --- Own Workforce tracker
        ---- Employment policy status
        ---- Health and safety policy status
        ---- Training and development programs
      --- Workers in Value Chain tracker
        ---- Supplier code of conduct status
        ---- Value chain assessment status
        ---- Third-party worker protection
      --- Affected Communities tracker
        ---- Community engagement policy
        ---- Impact assessment procedures
        ---- Grievance mechanism status
      --- Consumers and End-users tracker
        ---- Product safety policy status
        ---- Consumer protection measures
        ---- Product information transparency
      --- Business Conduct tracker
        ---- Ethics policy status
        ---- Anti-corruption measures
        ---- Compliance monitoring system
    → Yes/No toggle switches for each category with validation
    → Public availability status indicators with links
    → Target tracking toggles with deadline management

  → B3: Energy and GHG Emissions Module
    → Scope 1 Emissions Interface
      --- Stationary Combustion Tracker
        ---- Fuel type dropdown (Petrol, Diesel, Fuel Oil, Coal, Natural Gas)
        ---- Quantity input (kg/l) with unit converter
        ---- Auto-calculation display for kgCO2e
        ---- Emission factor database integration
        ---- Monthly breakdown option
        ---- Equipment tracking system
      --- Mobile Combustion Tracker
        ---- Vehicle fleet management interface
        ---- Fuel consumption inputs by vehicle type
        ---- Distance tracking system
        ---- Fuel efficiency calculator
        ---- Business vs personal use separator
      --- Fugitive Emissions Tracker
        ---- Refrigerant type dropdown (R-404a, R-134a, R-407C, R-410A, R-507A)
        ---- Quantity leaked input (kg) with detection method
        ---- Leakage assumption calculator
        ---- Equipment maintenance tracking
        ---- Replacement schedule management
    → Scope 2 Emissions Interface
      --- Location-based Electricity Consumption
        ---- Location input (Eircode/geolocation) with validation
        ---- Total energy consumption (MWh) with breakdown
        ---- Electricity consumption breakdown (MWh) by source
        ---- On-site renewable energy input (MWh)
        ---- Grid emission factor integration with regional data
        ---- Energy efficiency measures tracking
      --- Market-based Calculation Option
        ---- Renewable electricity contract details uploader
        ---- RECs tracking interface with verification
        ---- Green tariff documentation system
        ---- Supplier emission factor input
    → Scope 3 Emissions Interface (Agri-food specific)
      --- Supplier Farm Data Collection
        ---- Farm name/ID input with search functionality
        ---- Location input (Eircode) with map integration
        ---- SBLAS/SDAS participation toggle with verification
        ---- Farm scope 1 & 2 GHG input (tCO2e) with validation
        ---- Revenue allocation calculator with percentage breakdown
        ---- Supplier assessment questionnaire
      --- Purchased Goods Tracking
        ---- Milk Procurement Interface
          ----- Quantity input (kg/l) with seasonal tracking
          ----- Country of origin dropdown with flag display
          ----- Breed selection dropdown with characteristics
          ----- Quality grade classification
          ----- Transport distance calculator
        ---- Cattle/Sheep Procurement Interface
          ----- Quantity input with unit selector (kg/head)
          ----- Category selector (carcass/liveweight) with conversion
          ----- Country of origin dropdown with traceability
          ----- Age and breed classification
          ----- Welfare certification tracking
      --- Tier 1/2/3 Methodology Selector
        ---- Emission factor database integration with search
        ---- Calculation methodology display with explanations
        ---- Data quality assessment indicators
        ---- Uncertainty range calculations
        ---- Third-party verification options

  → B4: Pollution Module
    → Air Pollution Tracker
      --- Pollutant type dropdown (Ammonia, Particulate matter, NOx, SO2, VOCs)
      --- Quantity input (kg/l) with measurement method
      --- Location input (Eircode/Geolocation) with facility mapping
      --- Fuel-based calculation interface with emission factors
      --- Monitoring equipment tracking
      --- Regulatory limit comparison
      --- Trend analysis visualization
    → Water Pollution Tracker
      --- Effluent type dropdown (Meat, Dairy, General)
      --- Flow rate input (kg/l) with measurement frequency
      --- BOD/COD concentration input (mg/L) with lab results upload
      --- Location input (Eircode/Geolocation) with water body identification
      --- Treatment system documentation
      --- Discharge permit tracking
      --- Water quality monitoring results
    → Soil Pollution Tracker
      --- Heavy metals tracking with concentration levels
      --- Nitrates/Phosphates monitoring with regulatory limits
      --- Location-specific input interface with soil type
      --- Contamination assessment results
      --- Remediation measures tracking
      --- Soil testing schedule management

  → B5: Biodiversity Module
    → Land Use Assessment
      --- Total land use input (ha) with verification
      --- Land use category breakdown (agricultural, forest, urban)
      --- Sealed area calculator (ha) with percentage calculation
      --- Land use change tracking over time
    → Nature-oriented Area Tracker
      --- On-site area input (ha) with habitat classification
      --- Off-site area input (ha) with conservation projects
      --- Biodiversity action plan documentation
      --- Species monitoring programs
      --- Habitat restoration initiatives
    → Biodiversity-sensitive Area Checker
      --- Site name input with official designation
      --- Location input (Eircode/geolocation) with boundary mapping
      --- Protected area classification with IUCN categories
      --- EEA Protected Areas map integration with overlay
      --- Impact assessment documentation
      --- Conservation measure tracking

  → B6: Water Module
    → Water Withdrawal Assessment
      --- Total water withdrawal input (L) with source breakdown
      --- Water source classification (surface, groundwater, municipal)
      --- Withdrawal permits tracking with renewal dates
      --- Seasonal variation monitoring
      --- Water quality parameters input
    → High Water-stress Area Identification
      --- Location-based stress assessment with risk levels
      --- WRI Aqueduct Water Risk Atlas integration with visualization
      --- Area-specific withdrawal tracking with limits
      --- Water scarcity risk indicators
      --- Alternative source evaluation
    → Water Consumption Calculator
      --- Production process water usage breakdown
      --- Discharge calculation interface with treatment levels
      --- Water recycling and reuse tracking
      --- Water efficiency measures documentation
      --- Consumption intensity calculations

  → B7: Resource Use & Waste Module
    → Circular Economy Assessment
      --- Circular economy principles application tracker
        ---- Design for circularity assessment
        ---- Material selection criteria
        ---- Product lifecycle extension measures
        ---- Sharing economy participation
      --- Narrative input interface for practices with examples
      --- Circular economy KPIs tracking
      --- Partnership documentation for circular initiatives
    → Waste Management Interface
      --- Total waste generation input (kg/tonne) with production correlation
      --- Waste Categorization System
        ---- Non-hazardous Waste Tracker
          ----- Paper and cardboard quantities
          ----- Plastic waste breakdown by type
          ----- Organic waste quantities
          ----- Metal waste quantities
        ---- Hazardous Waste Tracker
          ----- Chemical waste classification
          ----- Contaminated materials quantities
          ----- Special handling requirements
          ----- Disposal method documentation
        ---- Radioactive Waste Tracker (if applicable)
          ----- Activity level classification
          ----- Storage requirements
          ----- Disposal authorization tracking
      --- Waste Diversion Tracking
        ---- Recycling quantities with material breakdown
        ---- Reuse quantities with application description
        ---- ESRS disposal category assignment with justification
        ---- Waste-to-energy quantities
        ---- Composting quantities
    → Material Flow Tracker
      --- Material type dropdown with sustainability ratings
      --- Mass input interface with density calculations
      --- Supplier relationship mapping with assessment scores
      --- Material traceability system
      --- Substitution opportunities identification

  → B8: Workforce General Module
    → Employee Count Interface
      --- Headcount vs FTE selector with conversion factors
      --- Permanent employee tracker with contract types
      --- Part-time employee tracker with hour calculations
      --- Temporary and seasonal worker tracking
      --- Contractor and consultant tracking
    → Demographics Breakdown
      --- Gender Distribution Interface
        ---- Male employee count with age breakdown
        ---- Female employee count with age breakdown
        ---- Other gender option (where applicable) with privacy protection
        ---- Not reporting category with anonymization
      --- Age group distribution tracking
      --- Educational level breakdown
      --- Disability inclusion tracking
    → Geographic Distribution (multi-country operations)
      --- Country dropdown selector with regional grouping
      --- Employee count per country with local regulations
      --- Remote work tracking by location
      --- International assignment tracking
    → Turnover Rate Calculator
      --- Employees departed input with reason categorization
      --- New hires tracking with source analysis
      --- Average employee count input with calculation method
      --- Auto-calculation display with industry benchmarking
      --- Retention rate analysis by department

  → B9: Workforce Health & Safety Module
    → Work-related Accidents Tracker
      --- Recordable accidents count input with severity classification
      --- Near-miss incident tracking
      --- Total hours worked input with verification method
      --- Accident rate auto-calculation (per 200,000 hours)
      --- Accident investigation documentation
      --- Corrective action tracking
      --- Safety training hours tracking
    → Fatalities Tracker
      --- Work-related fatality count with investigation status
      --- Incident details interface with timeline
      --- Root cause analysis documentation
      --- Preventive measures implementation
      --- Regulatory reporting compliance
    → Health and Safety Management System
      --- Safety policy documentation
      --- Risk assessment procedures
      --- Emergency response planning
      --- Health surveillance programs
      --- Occupational health metrics

  → B10: Workforce Remuneration Module
    → Minimum Wage Compliance Checker
      --- Yes/No toggle for compliance with verification
      --- Jurisdiction-specific minimum wage tracking
      --- Additional narrative explanation field with examples
      --- Exception documentation with justification
      --- Compliance monitoring schedule
    → Gender Pay Gap Calculator
      --- Average male hourly pay input (€) with breakdown by level
      --- Average female hourly pay input (€) with breakdown by level
      --- Auto-calculation of pay gap percentage with statistical significance
      --- Bonus and benefits inclusion option
      --- Action plan for gap reduction
    → Collective Bargaining Tracker
      --- Employees covered count with union representation
      --- Coverage percentage auto-calculation with trend analysis
      --- Collective agreement documentation
      --- Negotiation timeline tracking
      --- Labor relations quality assessment
    → Training Hours Tracker
      --- Total training hours by gender with course categorization
      --- Average hours per employee calculation with benchmarking
      --- Training effectiveness measurement
      --- Skills development tracking
      --- Career progression correlation analysis

  → B11: Corruption & Bribery Module
    → Convictions Tracker
      --- Number of convictions input with case classification
      --- Total fines amount input (€) with payment status
      --- Incident details interface with timeline and impact
      --- Legal proceedings tracking
      --- Reputational impact assessment
    → Anti-corruption Management System
      --- Anti-corruption policy documentation
      --- Training program tracking
      --- Risk assessment procedures
      --- Whistleblowing mechanism management
      --- Third-party due diligence processes
    → Compliance Monitoring
      --- Internal audit schedule and results
      --- External compliance assessments
      --- Corrective action tracking
      --- Regulatory interaction logging

→ Comprehensive Module (C1-C9) Structure
  → C1: Business Model Strategy
    → Business Model Documentation
      --- Products/services description interface with categorization
      --- Value proposition articulation with stakeholder mapping
      --- Revenue model breakdown with sustainability integration
      --- Key resources and capabilities assessment
    → Market Analysis
      --- Market description input with size and growth
      --- Competitive landscape analysis
      --- Customer segment identification
      --- Geographic market presence mapping
    → Business Relationships Mapping
      --- Stakeholder identification and prioritization
      --- Partnership documentation with sustainability criteria
      --- Supply chain relationship assessment
      --- Customer relationship management integration
    → Sustainability Strategy Integration
      --- Sustainability objectives alignment with business strategy
      --- Material topics identification and prioritization
      --- Sustainability governance structure
      --- Performance measurement framework

  → C2: Enhanced Practices Description
    → Detailed Policy Framework
      --- Policy description interface with version control
      --- Policy effectiveness assessment
      --- Implementation timeline tracking
      --- Stakeholder consultation documentation
    → Senior Responsibility Assignment
      --- Management level dropdown with role definition
      --- Accountability tracking with performance metrics
      --- Decision-making authority mapping
      --- Reporting line documentation
    → Governance Integration
      --- Board oversight documentation
      --- Risk management integration
      --- Performance incentive alignment
      --- External assurance arrangements

  → C3: GHG Reduction Targets
    → Target Setting Interface
      --- Scope 1 & 2 Targets
        ---- Target year selector with interim milestones
        ---- Base year establishment with data verification
        ---- Reduction percentage or absolute target
        ---- Coverage percentage input with boundary definition
      --- Scope 3 Targets (if applicable)
        ---- Category-specific targets with materiality assessment
        ---- Supplier engagement requirements
        ---- Value chain collaboration initiatives
      --- Unit measurement dropdown with conversion factors
      --- Science-based target validation
      --- Action plan description interface with resource allocation
    → Target Performance Tracking
      --- Progress monitoring dashboard
      --- Variance analysis with corrective actions
      --- Milestone achievement tracking
      --- External verification integration

  → C4: Climate Risks Assessment
    → Physical Risks Identification
      --- Climate hazard description interface with scenario analysis
      --- Exposure assessment input with asset mapping
      --- Sensitivity analysis interface with vulnerability factors
      --- Time horizon consideration (short, medium, long-term)
      --- Financial impact quantification
    → Transition Risks Tracking
      --- Policy/legal risks input with regulatory change monitoring
      --- Technology risks assessment with disruption potential
      --- Market risks evaluation with demand shift analysis
      --- Reputation risks tracking with stakeholder sentiment
      --- Stranded asset assessment
    → Adaptation Actions Tracker
      --- Action description interface with implementation roadmap
      --- Investment requirements with cost-benefit analysis
      --- Implementation timeline with milestone tracking
      --- Effectiveness monitoring with KPIs
      --- Integration with business continuity planning

  → C5: Additional Workforce Characteristics
    → Management Diversity Analysis
      --- Management gender ratio calculator with level breakdown
      --- Male management count with seniority classification
      --- Female management count with seniority classification
      --- Ratio auto-calculation with trend analysis
      --- Diversity targets and action plans
    → Extended Workforce Tracking
      --- Self-employed contractor tracker with engagement terms
      --- Temporary agency worker monitoring
      --- Intern and apprentice programs
      --- Volunteer program participation
    → Leadership Development
      --- Succession planning documentation
      --- Leadership pipeline assessment
      --- Diversity in recruitment and promotion
      --- Mentorship program tracking

  → C6: Human Rights Policies
    → Policy Existence Framework
      --- Child labor policy toggle with implementation measures
      --- Forced labor policy toggle with monitoring mechanisms
      --- Human trafficking policy toggle with due diligence procedures
      --- Discrimination policy toggle with reporting mechanisms
      --- Accident prevention policy toggle with safety protocols
      --- Other policies specification with custom categories
    → Implementation and Monitoring
      --- Policy communication and training tracking
      --- Compliance monitoring procedures
      --- Regular policy review and update schedule
      --- Stakeholder feedback integration
    → Complaints Mechanism Tracker
      --- Grievance procedure documentation
      --- Anonymous reporting system setup
      --- Investigation process tracking
      --- Resolution timeline monitoring
      --- Corrective action implementation

  → C7: Human Rights Incidents
    → Incident Tracking Interface
      --- Incident type classification with severity levels
      --- Date and location documentation
      --- Stakeholder impact assessment
      --- Root cause analysis documentation
    → Action Management
      --- Action taken description with timeline
      --- Responsible party assignment
      --- Progress monitoring with milestones
      --- Effectiveness evaluation
    → Value Chain Incident Tracker
      --- Supplier incident reporting
      --- Customer complaint integration
      --- Third-party incident monitoring
      --- Systemic issue identification

  → C8: Sector Revenue Tracking
    → Controversial Sector Revenue Assessment
      --- Weapons sector revenue (€) with activity breakdown
      --- Tobacco sector revenue (€) with product categorization
      --- Fossil fuel sector revenue (€)
        ---- Coal revenue breakdown with mining vs power generation
        ---- Oil revenue breakdown with upstream vs downstream
        ---- Gas revenue breakdown with conventional vs unconventional
      --- Chemical/pesticide revenue (€) with hazard classification
      --- Gambling sector revenue (€)
      --- Adult entertainment revenue (€)
    → Revenue Analysis and Justification
      --- Business rationale documentation
      --- Transition planning for controversial sectors
      --- Alternative revenue stream development
      --- Stakeholder communication strategy
    → EU Taxonomy Alignment
      --- EU benchmark exclusion checker with screening criteria
      --- Taxonomy eligibility assessment
      --- Alignment evaluation with technical criteria
      --- Do no significant harm assessment

  → C9: Governance Gender Diversity
    → Governing Body Composition Analysis
      --- Board member demographic tracking
      --- Male members count with tenure and expertise
      --- Female members count with tenure and expertise
      --- Diversity ratio auto-calculation with target comparison
      --- Skills matrix and experience mapping
    → Governance Effectiveness
      --- Board evaluation process documentation
      --- Diversity policy implementation
      --- Nomination committee composition
      --- Director education and development
    → Leadership Accountability
      --- ESG responsibility assignment
      --- Performance evaluation integration
      --- Compensation alignment with sustainability
      --- Stakeholder engagement oversight

→ Reporting & Export Structure
  → Report Generation Interface
    → Export Functionality
      --- PDF export functionality with branded template
      --- Excel export option with data validation
      --- Markdown export option for documentation
      --- XML export for regulatory submission
      --- API integration for data sharing
    → Report Customization
      --- Executive summary auto-generation
      --- Materiality assessment integration
      --- Stakeholder-specific reporting formats
      --- Multi-language support options
    → Compliance Verification
      --- Compliance checklist generator with regulatory requirements
      --- Gap analysis reporting
      --- Audit trail generation
      --- Data quality assessment report
    → Distribution Management
      --- Print-friendly layout selector with pagination
      --- Digital signature integration
      --- Secure sharing with access controls
      --- Version control and approval workflow

  → Data Visualization Dashboard
    → Performance Analytics
      --- Progress charts for each module with trend analysis
      --- Emission trend analysis with forecasting
      --- Benchmark comparison tools with peer analysis
      --- Interactive sustainability metrics display
    → KPI Monitoring
      --- Real-time dashboard with alerts
      --- Target vs actual performance tracking
      --- Risk indicator monitoring
      --- Materiality heat map visualization
    → Stakeholder Reporting
      --- Investor-grade reporting interface
      --- Regulatory submission formatting
      --- Public disclosure preparation
      --- Sustainability rating agency integration

  → Quality Assurance System
    → Data Validation Framework
      --- Automated data validation rules
      --- Cross-reference checking between modules
      --- Outlier detection and flagging
      --- Completeness assessment tools
    → Audit Trail System
      --- Data change tracking with user identification
      --- Version control interface with rollback capability
      --- User activity logging with time stamps
      --- Submission workflow management with approvals
    → External Verification Integration
      --- Third-party assurance provider interface
      --- Evidence documentation system
      --- Assurance opinion integration
      --- Continuous monitoring setup

→ System Administration Structure
  → User Management Interface
    → Role-based Access Control
      --- Administrator privileges with system configuration
      --- Data entry user permissions with module restrictions
      --- View-only access with report generation rights
      --- External auditor access with read-only permissions
    → User Activity Monitoring
      --- Login/logout tracking with session management
      --- Data modification logging with change history
      --- Report generation tracking with download logs
      --- System access attempts with security monitoring
  → System Configuration
    → Company Profile Management
      --- Logo and branding customization
      --- Contact information maintenance
      --- Regulatory jurisdiction settings
      --- Language and localization preferences
    → Integration Management
      --- Third-party system connections
      --- Data import/export configurations
      --- API key management
      --- Automated backup settings
  → Support and Training
    → Help Documentation System
      --- Module-specific guidance with examples
      --- Video tutorial integration
      --- FAQ database with search functionality
      --- Best practice guidelines
    → Training Management
      --- User onboarding workflow
      --- Feature update notifications
      --- Certification tracking for users
      --- Feedback collection and analysis