# Tutorial: mfe-project

This project is a learning demo showcasing **Micro Frontend (MFE)** architecture
using **Webpack Module Federation**. A main **Shell** application loads and
orchestrates several independent MFEs (like Products, Orders, Header).
They communicate using a shared **Event Bus** and access common data via a
**Global Context**, while sharing libraries through **Shared Dependencies**.
An AI **Chatbot** demonstrates **Semantic Actions** by interpreting requests
and triggering application behaviors via the Event Bus.

```mermaid
flowchart TD
    %% Define Styles
    classDef shell fill:#e3f2fd,stroke:#2196f3,stroke-width:2px,font-size:16px,color:#0d47a1
    classDef remote fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px,font-size:16px,color:#4a148c
    classDef core fill:#fff3e0,stroke:#ff9800,stroke-width:2px,font-size:16px,color:#e65100
    classDef infra fill:#e8f5e9,stroke:#4caf50,stroke-width:2px,font-size:16px,color:#1b5e20
    classDef comm fill:#fce4ec,stroke:#e91e63,stroke-width:2px,font-size:16px,color:#880e4f
    classDef ctx fill:#ede7f6,stroke:#673ab7,stroke-width:2px,font-size:16px,color:#311b92

    %% Nodes
    A0["Micro Frontend (MFE)"]
    A1["Shell (Host) Application"]
    A2["Remote Module<br/>(Exposed Module)"]
    A3["Webpack Module Federation Plugin"]
    A4["Shared Dependencies"]
    A5["Event Bus<br/>(window.mfeEventBus)"]
    A6["Global Context<br/>(window.mfeGlobalContext)"]
    A7["API Service Pattern"]
    A8["Bootstrap Pattern"]
    A9["Semantic Actions"]

    %% Classes
    class A0,A2 remote
    class A1 shell
    class A3,A4 infra
    class A5,A6 comm
    class A7,A8 core
    class A9 ctx

    %% Edges
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
