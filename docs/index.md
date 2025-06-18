# Tutorial: mfe-project

This project is a learning demo showcasing **Micro Frontend (MFE)** architecture
using **Webpack Module Federation**. A main **Shell** application loads and
orchestrates several independent MFEs (like Products, Orders, Header).
They communicate using a shared **Event Bus** and access common data via a
**Global Context**, while sharing libraries through **Shared Dependencies**.
An AI **Chatbot** demonstrates **Semantic Actions** by interpreting requests
and triggering application behaviors via the Event Bus.

**Source Repository:** [None](None)

```mermaid
flowchart TD
    A0["Micro Frontend (MFE)
"]
    A1["Shell (Host) Application
"]
    A2["Remote Module (Exposed Module)
"]
    A3["Webpack Module Federation Plugin
"]
    A4["Shared Dependencies
"]
    A5["Event Bus (window.mfeEventBus)
"]
    A6["Global Context (window.mfeGlobalContext)
"]
    A7["API Service Pattern
"]
    A8["Bootstrap Pattern
"]
    A9["Semantic Actions
"]
    A1 -- "Orchestrates" --> A0
    A1 -- "Loads" --> A2
    A1 -- "Provides" --> A5
    A1 -- "Provides" --> A6
    A1 -- "Handles Actions" --> A9
    A0 -- "Exposes" --> A2
    A0 -- "Configured by" --> A3
    A0 -- "Uses" --> A4
    A0 -- "Communicates via" --> A5
    A0 -- "Reads" --> A6
    A0 -- "Uses" --> A7
    A0 -- "Uses" --> A8
    A3 -- "Manages" --> A4
    A7 -- "Notifies via" --> A5
    A9 -- "Triggers events via" --> A5
```

## Chapters

1. [Micro Frontend (MFE)
   ](01_micro_frontend__mfe__.md)
2. [Shell (Host) Application
   ](02_shell__host__application_.md)
3. [Remote Module (Exposed Module)
   ](03_remote_module__exposed_module__.md)
4. [Webpack Module Federation Plugin
   ](04_webpack_module_federation_plugin_.md)
5. [Shared Dependencies
   ](05_shared_dependencies_.md)
6. [Bootstrap Pattern
   ](06_bootstrap_pattern_.md)
7. [Event Bus (window.mfeEventBus)
   ](07_event_bus__window_mfeeventbus__.md)
8. [Global Context (window.mfeGlobalContext)
   ](08_global_context__window_mfeglobalcontext__.md)
9. [API Service Pattern
   ](09_api_service_pattern_.md)
10. [Semantic Actions
    ](10_semantic_actions_.md)
