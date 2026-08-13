// src/data/tcodes.ts

export interface TCode {
  code: string;
  desc: string;
  module: string; // ABAP, Basis, MM, SD, FI, Fiori, Security
  type: "Technical" | "Functional";
  summary: string;
  tip: string;
}

export const TCODES: TCode[] = [
  // ==========================================
  // ABAP Development & Tools (20 codes)
  // ==========================================
  {
    code: "SE11",
    desc: "ABAP Dictionary",
    module: "ABAP",
    type: "Technical",
    summary: "Define and manage global database tables, views, structures, data elements, domains, search helps, and lock objects centrally.",
    tip: "Always check the 'Where-Used List' before changing structure fields to avoid breaking dependent programs."
  },
  {
    code: "SE38",
    desc: "ABAP Editor",
    module: "ABAP",
    type: "Technical",
    summary: "Write, edit, check, and run source code for ABAP reports, executables, and module pool programs.",
    tip: "Use 'Ctrl + F2' for syntax check, 'Ctrl + F3' to activate, and 'Ctrl + Shift + F12' to toggle full-screen view."
  },
  {
    code: "SE80",
    desc: "Object Navigator",
    module: "ABAP",
    type: "Technical",
    summary: "The primary integrated development environment (IDE) for ABAP developers. Manage classes, packages, function groups, programs, and BSP applications hierarchically.",
    tip: "Use package groupings to coordinate development objects, making it easier to track transport requests."
  },
  {
    code: "SE37",
    desc: "Function Builder",
    module: "ABAP",
    type: "Technical",
    summary: "Define, configure, write, and test reusable Function Modules, remote-enabled RFCs, and standardized BAPIs.",
    tip: "When writing Remote Function Calls (RFCs), ensure all parameters are passed 'By Value' to prevent runtime errors."
  },
  {
    code: "SE24",
    desc: "Class Builder",
    module: "ABAP",
    type: "Technical",
    summary: "Create, declare, and implement Object-Oriented ABAP global classes, interfaces, inheritance hierarchies, and methods.",
    tip: "Use public read-only properties or standard getter/setter patterns to maintain encapsulation boundaries."
  },
  {
    code: "SE18",
    desc: "BAdI Definitions",
    module: "ABAP",
    type: "Technical",
    summary: "Review, define, and configure object-oriented Business Add-In (BAdI) enhancement spots to provide extension interfaces.",
    tip: "Prefer BAdIs over legacy User Exits because they support multiple active implementations concurrently."
  },
  {
    code: "SE19",
    desc: "BAdI Implementations",
    module: "ABAP",
    type: "Technical",
    summary: "Create and implement custom business logic methods inside standard SAP BAdI extension interfaces.",
    tip: "Implement standard checks carefully inside your method extensions to prevent infinite execution loops during updates."
  },
  {
    code: "SE93",
    desc: "Maintain Transactions",
    module: "ABAP",
    type: "Technical",
    summary: "Create custom transaction codes linking directly to ABAP reports, screen sequences, dialog programs, or classes.",
    tip: "Use 'Transaction with parameters' (Parameter Transaction) to call standard screens with preset field values."
  },
  {
    code: "SE10",
    desc: "Transport Organizer (Customizing)",
    module: "ABAP",
    type: "Technical",
    summary: "Manage, document, check, and release customizing transport requests representing configuration adjustments.",
    tip: "Always check transport logs after release to make sure no configuration elements are left locked."
  },
  {
    code: "SE01",
    desc: "Transport Organizer (Extended)",
    module: "ABAP",
    type: "Technical",
    summary: "Advanced transport administration dashboard. View and search database objects, manage task locks, and diagnose release issues.",
    tip: "Use the object search function to trace which transport request currently holds a lock on a development class."
  },
  {
    code: "SE09",
    desc: "Transport Organizer (Workbench)",
    module: "ABAP",
    type: "Technical",
    summary: "Review and manage transport requests for custom development workbench objects like tables, programs, and classes.",
    tip: "Always release tasks under a request first before attempting to release the main parent transport request."
  },
  {
    code: "SLG1",
    desc: "Application Log Viewer",
    module: "ABAP",
    type: "Technical",
    summary: "Query and inspect runtime application error messages, warning logs, and system exceptions grouped by application objects.",
    tip: "Filter by Object and Subobject keywords to isolate specific background job runs or API interface errors."
  },
  {
    code: "ST22",
    desc: "ABAP Dump Analysis",
    module: "ABAP",
    type: "Technical",
    summary: "Identify, analyze, and troubleshoot system runtime crashes. View variable values and find the exact code line that failed.",
    tip: "Scroll to the 'Active Calls' or 'Source Code Extract' sections to locate the offending line in your program."
  },
  {
    code: "SM37",
    desc: "Job Overview",
    module: "ABAP",
    type: "Technical",
    summary: "Query, monitor, schedule, or cancel background jobs. View execution logs and trace failed scheduler jobs.",
    tip: "For aborted jobs, click the 'Job Log' button to see system dump info and error message IDs."
  },
  {
    code: "SM50",
    desc: "Work Process Overview",
    module: "ABAP",
    type: "Technical",
    summary: "Inspect and manage active work processes in real-time. Identify slow database queries or lockouts.",
    tip: "If a custom report hangs the system, select its row and choose 'Program/Session -> Cancel' to end it safely."
  },
  {
    code: "SM51",
    desc: "SAP Servers List",
    module: "ABAP",
    type: "Technical",
    summary: "Display list of active application servers connected to the current SAP instance. Swap servers to inspect logs.",
    tip: "Double-click a server row to view local work processes running on that specific instance node."
  },
  {
    code: "SM12",
    desc: "Display Lock Entries",
    module: "ABAP",
    type: "Technical",
    summary: "Monitor active table lock entries preventing concurrent document updates. Release locks from crashed user sessions.",
    tip: "Ensure a lock's user is actually offline before deleting it to prevent database inconsistencies."
  },
  {
    code: "SM13",
    desc: "Update Records Monitor",
    module: "ABAP",
    type: "Technical",
    summary: "Monitor background database updates. Review and debug failed database update commits.",
    tip: "Examine cancelled items to check which update module ran into a rollback exception."
  },
  {
    code: "SE16",
    desc: "Data Browser",
    module: "ABAP",
    type: "Technical",
    summary: "Standard browser to view raw data table records, apply filters, and count occurrences.",
    tip: "Use this to quickly check values inside transparent tables without writing database scripts."
  },
  {
    code: "SAT",
    desc: "ABAP Runtime Analysis",
    module: "ABAP",
    type: "Technical",
    summary: "Trace program performance, check call hierarchies, and measure execution times. (Replaces transaction SE30).",
    tip: "Filter by execution threshold limit to focus on database and code performance bottlenecks."
  },

  // ==========================================
  // Basis & Administration (13 codes)
  // ==========================================
  {
    code: "SU01",
    desc: "User Maintenance",
    module: "Basis",
    type: "Technical",
    summary: "Create, change, copy, delete, lock, and unlock user master records. Manage defaults and parameters.",
    tip: "In S/4HANA systems, ensure user profiles are linked correctly to Business Partners (BP) for system consistency."
  },
  {
    code: "SU53",
    desc: "Authorization Failures",
    module: "Basis",
    type: "Technical",
    summary: "View detailed diagnostic logs of authorization checks that failed during active sessions.",
    tip: "Have the user execute '/nSU53' immediately after hitting an access check error to capture full context."
  },
  {
    code: "PFCG",
    desc: "Role Maintenance",
    module: "Basis",
    type: "Technical",
    summary: "Create, customize, and generate authorization profiles, roles, and user menu assignments.",
    tip: "Generate profiles using the yellow shield icon to finalize rules and role menu paths."
  },
  {
    code: "RZ10",
    desc: "Maintain Profile Parameters",
    module: "Basis",
    type: "Technical",
    summary: "View and edit SAP instance configuration profiles. Configure memory, processes, and network parameters.",
    tip: "Requires a system restart to apply parameter changes. Always backup active profiles before editing."
  },
  {
    code: "RZ11",
    desc: "Maintain Individual Parameters",
    module: "Basis",
    type: "Technical",
    summary: "Inspect and modify dynamic profile parameters instantly without restarting the application server.",
    tip: "Only use for testing or emergency work. Parameter values revert on system restart."
  },
  {
    code: "SM59",
    desc: "RFC Connections",
    module: "Basis",
    type: "Technical",
    summary: "Define, configure, and test Remote Function Call (RFC) destinations linking to other SAP systems, HTTP locations, or APIs.",
    tip: "Perform 'Connection Test' and 'Authorization Test' checks to troubleshoot integration errors."
  },
  {
    code: "SM21",
    desc: "System Log",
    module: "Basis",
    type: "Technical",
    summary: "Analyze system warning logs, database connection errors, lock timeouts, and security issues.",
    tip: "Filter by time range and process ID to isolate server failures."
  },
  {
    code: "ST03N",
    desc: "Workload Monitor",
    module: "Basis",
    type: "Technical",
    summary: "Display performance metrics, response times, database loads, and transaction usage statistics.",
    tip: "Use this transaction to identify slow reports or check overall server CPU load."
  },
  {
    code: "SICF",
    desc: "HTTP Service Tree",
    module: "Basis",
    type: "Technical",
    summary: "Configure and manage HTTP services, BSP applications, Web Dynpros, and OData service endpoints.",
    tip: "Make sure service nodes are activated (green) so web clients can access application endpoints."
  },
  {
    code: "SPRO",
    desc: "Customizing IMG",
    module: "Basis",
    type: "Technical",
    summary: "Customizing and configuration framework. Configure company codes, logistics paths, and module parameters.",
    tip: "Use the search feature inside the SPRO tree (Ctrl + F) to find customization paths."
  },
  {
    code: "SM02",
    desc: "System Messages",
    module: "Basis",
    type: "Technical",
    summary: "Create and broadcast system-wide messages. Informs users of system maintenance or restarts.",
    tip: "Messages show as popups or menu lines. Delete expired messages to clean up user screens."
  },
  {
    code: "SM04",
    desc: "User List",
    module: "Basis",
    type: "Technical",
    summary: "View active user sessions on the current application server. Monitor memory consumption and delete sessions.",
    tip: "Use this to see who is locked out or consuming system resources on a local instance."
  },
  {
    code: "AL08",
    desc: "Active Users List",
    module: "Basis",
    type: "Technical",
    summary: "Monitor active logged-in users across all application servers in the SAP system cluster.",
    tip: "Provides a system-wide view of active users. Useful for scheduling maintenance windows."
  },

  // ==========================================
  // Materials Management (MM) (10 codes)
  // ==========================================
  {
    code: "MM01",
    desc: "Create Material",
    module: "MM",
    type: "Functional",
    summary: "Configure and save material master records. Setup accounting views, sales profiles, and inventory settings.",
    tip: "Configure views matching your organizational units to ensure correct integration downstream."
  },
  {
    code: "MM02",
    desc: "Change Material",
    module: "MM",
    type: "Functional",
    summary: "Modify material settings, change units of measure, adjust descriptions, and expand organizational views.",
    tip: "Check the change history log to verify who updated key planning and purchasing parameters."
  },
  {
    code: "MM03",
    desc: "Display Material",
    module: "MM",
    type: "Functional",
    summary: "Read material master attributes without changing values. Inspect purchasing, plant stock, and sales views.",
    tip: "Select organizational levels carefully to ensure you display local plant configuration details."
  },
  {
    code: "ME21N",
    desc: "Create Purchase Order",
    module: "MM",
    type: "Functional",
    summary: "Create purchase orders referencing vendor records. Select plants, storage locations, pricing, and schedules.",
    tip: "Use the document overview panel on the left to copy items from old purchase requisitions."
  },
  {
    code: "ME22N",
    desc: "Change Purchase Order",
    module: "MM",
    type: "Functional",
    summary: "Update pricing, adjust items, change delivery dates, or cancel quantities in existing purchase orders.",
    tip: "Verify document release strategies to check which manager's approval is pending."
  },
  {
    code: "ME23N",
    desc: "Display Purchase Order",
    module: "MM",
    type: "Functional",
    summary: "View purchase order items, delivery schedules, release statuses, and downstream documents.",
    tip: "Open the 'Purchase Order History' tab to verify linked goods receipt (GR) postings."
  },
  {
    code: "MIGO",
    desc: "Goods Movement",
    module: "MM",
    type: "Functional",
    summary: "Standard interface to post goods receipts, goods issues, transfer postings, and inventory adjustments.",
    tip: "Verify the posting date carefully to ensure material documents log in the correct fiscal period."
  },
  {
    code: "MIRO",
    desc: "Verify Incoming Invoice",
    module: "MM",
    type: "Functional",
    summary: "Enter and match vendor invoices against purchase orders and posted goods receipts.",
    tip: "The balance indicator must be green (0.00 difference) before posting is allowed."
  },
  {
    code: "MB51",
    desc: "Material Document List",
    module: "MM",
    type: "Functional",
    summary: "Generate lists of material documents recording physical inventory receipts, issues, or transfers.",
    tip: "Filter by movement type and posting date to trace inventory movements."
  },
  {
    code: "MMBE",
    desc: "Stock Overview",
    module: "MM",
    type: "Functional",
    summary: "Display real-time inventory levels across company codes, plants, storage locations, and batches.",
    tip: "Double-click specific values to view unrestricted-use, reserved, or blocked stock details."
  },

  // ==========================================
  // Sales & Distribution (SD) (9 codes)
  // ==========================================
  {
    code: "VA01",
    desc: "Create Sales Order",
    module: "SD",
    type: "Functional",
    summary: "Log customer orders, set pricing schedules, select shipping points, and define billing terms.",
    tip: "Include the customer's purchase order reference in the header for tracking."
  },
  {
    code: "VA02",
    desc: "Change Sales Order",
    module: "SD",
    type: "Functional",
    summary: "Update quantities, release order blocks, change shipping points, or edit pricing conditions in sales orders.",
    tip: "Run an availability check (ATP) to verify shipping updates do not disrupt inventory allocations."
  },
  {
    code: "VA03",
    desc: "Display Sales Order",
    module: "SD",
    type: "Functional",
    summary: "Read customer sales orders. View items, delivery logs, partner roles, and billing conditions.",
    tip: "Use the 'Document Flow' button (Ctrl + F5) to visually trace items from quotation to billing."
  },
  {
    code: "VL01N",
    desc: "Create Outbound Delivery",
    module: "SD",
    type: "Functional",
    summary: "Generate delivery documents to initiate shipping, picking, and packing activities.",
    tip: "Ensure shipping points match order settings to prevent picking errors."
  },
  {
    code: "VF01",
    desc: "Create Billing Document",
    module: "SD",
    type: "Functional",
    summary: "Generate customer invoices referencing outbound deliveries or completed sales orders.",
    tip: "Set up billing profiles to group multiple deliveries into a single invoice."
  },
  {
    code: "VF02",
    desc: "Change Billing Document",
    module: "SD",
    type: "Functional",
    summary: "Update invoice details, print customer billing, and release invoices to financial accounting.",
    tip: "Check the document log to see if posting blocks prevent accounting documents from generating."
  },
  {
    code: "VD01",
    desc: "Create Customer (Sales)",
    module: "SD",
    type: "Functional",
    summary: "Create customer master records with sales views. (Legacy transaction, replaced by BP in S/4HANA).",
    tip: "Use role selections in the BP transaction to manage sales views in modern systems."
  },
  {
    code: "VD02",
    desc: "Change Customer (Sales)",
    module: "SD",
    type: "Functional",
    summary: "Update customer sales views, pricing rules, shipping addresses, and credit parameters. (Legacy transaction, replaced by BP).",
    tip: "Audit business partner history logs to check who changed credit limits."
  },
  {
    code: "XD01",
    desc: "Create Customer (Central)",
    module: "SD",
    type: "Functional",
    summary: "Create complete customer records including sales, finance, and company code views. (Legacy transaction, replaced by BP).",
    tip: "Maintain customer-material information records for faster order entry."
  },

  // ==========================================
  // Finance & Controlling (FI/CO) (10 codes)
  // ==========================================
  {
    code: "FB60",
    desc: "Post Vendor Invoice",
    module: "FI",
    type: "Functional",
    summary: "Post vendor invoices directly to general ledger accounts. Adjust balances manually.",
    tip: "Verify general ledger accounts and tax codes match before posting."
  },
  {
    code: "FB50",
    desc: "Post G/L Account Document",
    module: "FI",
    type: "Functional",
    summary: "Create manual ledger postings and journal entries. Adjust accounts or reallocate expenses.",
    tip: "Use document templates to make recurring journal entries faster."
  },
  {
    code: "FB03",
    desc: "Display Document",
    module: "FI",
    type: "Functional",
    summary: "View financial journal entries, ledger accounts, and document details.",
    tip: "Click the 'Call Up Document Overview' icon to see all line items."
  },
  {
    code: "F-02",
    desc: "Enter G/L Posting",
    module: "FI",
    type: "Functional",
    summary: "Legacy transaction to create manual general ledger postings with header details.",
    tip: "Choose posting keys carefully (e.g., 40 for debit, 50 for credit)."
  },
  {
    code: "FBL1N",
    desc: "Vendor Line Items",
    module: "FI",
    type: "Functional",
    summary: "Display open and cleared vendor invoices and payment due dates.",
    tip: "Use layout variants to group vendor entries by terms of payment."
  },
  {
    code: "FBL3N",
    desc: "G/L Account Line Items",
    module: "FI",
    type: "Functional",
    summary: "Display line-item postings, balances, and clearing details for G/L accounts.",
    tip: "Filter by cost center to run local department budget reviews."
  },
  {
    code: "FBL5N",
    desc: "Customer Line Items",
    module: "FI",
    type: "Functional",
    summary: "View open customer invoices, clearing history, and overdue bills.",
    tip: "Save layout variants to quickly show aging summaries."
  },
  {
    code: "KSB1",
    desc: "Cost Centers Actual Line Items",
    module: "FI",
    type: "Functional",
    summary: "Audit actual expense postings against cost center codes.",
    tip: "Extract report results to Excel for formatting."
  },
  {
    code: "KO01",
    desc: "Create Internal Order",
    module: "FI",
    type: "Functional",
    summary: "Create internal orders to track specific project expenses or temporary budgets.",
    tip: "Assign budget profiles to prevent spending overrun."
  },
  {
    code: "FS00",
    desc: "G/L Account Centrally",
    module: "FI",
    type: "Functional",
    summary: "Create, change, or block G/L accounts globally. Configure the chart of accounts.",
    tip: "Match the G/L account type to its balance sheet category to ensure correct reporting."
  },

  // ==========================================
  // Fiori & UI5 (6 codes)
  // ==========================================
  {
    code: "/UI2/FLP",
    desc: "Fiori Launchpad",
    module: "Fiori",
    type: "Technical",
    summary: "Launch the browser-based SAP Fiori Launchpad from the SAP GUI window interface.",
    tip: "Bookmark the URL from this transaction to access Fiori tiles directly."
  },
  {
    code: "/UI2/FLPCM",
    desc: "FLP Content Manager",
    module: "Fiori",
    type: "Technical",
    summary: "Configure and manage Fiori catalogs, spaces, pages, and tile mappings centrally.",
    tip: "Use the built-in catalog analyzer tool to verify roles and resolve configuration conflicts."
  },
  {
    code: "/IWFND/MAINT_SERVICE",
    desc: "OData Service Maintenance",
    module: "Fiori",
    type: "Technical",
    summary: "Register, activate, maintain, and test OData services exposed on the SAP Gateway hub.",
    tip: "Use the SAP Gateway Client interface to test service endpoints and inspect payloads."
  },
  {
    code: "/IWBEP/REG_SERVICE",
    desc: "Gateway Service Registration",
    module: "Fiori",
    type: "Technical",
    summary: "Register backend data models and classes to map them to OData services.",
    tip: "Ensure backend annotations match the client-side XML schema requirements."
  },
  {
    code: "/UI2/FLPD_CUST",
    desc: "Fiori Launchpad Designer (Customizing)",
    module: "Fiori",
    type: "Technical",
    summary: "Fiori Launchpad catalog designer for client-specific layout and tile configurations.",
    tip: "Create semantic objects under active catalogs to ensure smooth navigation between applications."
  },
  {
    code: "/UI2/FLPD_CONF",
    desc: "Fiori Launchpad Designer (Configuration)",
    module: "Fiori",
    type: "Technical",
    summary: "Global, client-independent Fiori Launchpad designer to configure standard SAP catalogs.",
    tip: "Avoid editing configuration catalogs directly. Build customized clones to deploy changes safely."
  }
];
