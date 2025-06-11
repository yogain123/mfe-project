# Tutorial: mfe-project

This project demonstrates a Micro Frontend (MFE) architecture using Webpack Module Federation.
The **Shell** application acts as the _host_, loading and integrating different **MFEs**
(Micro Frontends) that represent independent parts of the application, like products or orders pages
(**Page MFEs**) or reusable components like a header or user profile (**Component MFEs**).
**Webpack Module Federation** is the technology that enables these independent parts to share code and dependencies,
loading each other at _runtime_ instead of build time.

**Source Repository:** [None](None)

```mermaid
flowchart TD
    A0["Micro Frontend (MFE)
"]
    A1["Shell (Host) Application
"]
    A2["Webpack Module Federation
"]
    A3["Exposed Modules
"]
    A4["Remotes Configuration
"]
    A5["Shared Dependencies
"]
    A6["Component MFE
"]
    A7["Page MFE
"]
    A8["Error Boundary
"]
    A1 -- "Integrates" --> A0
    A1 -- "Defines" --> A4
    A1 -- "Implements" --> A8
    A0 -- "Uses config from" --> A2
    A0 -- "Exposes" --> A3
    A0 -- "Can define" --> A4
    A0 -- "Utilizes" --> A5
    A2 -- "Enables" --> A3
    A2 -- "Enables" --> A4
    A2 -- "Manages" --> A5
    A8 -- "Protects" --> A0
    A6 -- "Is a type of" --> A0
    A7 -- "Is a type of" --> A0
    A7 -- "Integrates" --> A6
```

## Chapters

1. [Webpack Module Federation
   ](01_webpack_module_federation_.md)
2. [Micro Frontend (MFE)
   ](02_micro_frontend__mfe__.md)
3. [Shell (Host) Application
   ](03_shell__host__application_.md)
4. [Remotes Configuration
   ](04_remotes_configuration_.md)
5. [Exposed Modules
   ](05_exposed_modules_.md)
6. [Shared Dependencies
   ](06_shared_dependencies_.md)
7. [Component MFE
   ](07_component_mfe_.md)
8. [Page MFE
   ](08_page_mfe_.md)
9. [Error Boundary
   ](09_error_boundary_.md)
