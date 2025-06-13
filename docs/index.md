# Tutorial: mfe-project

This project demonstrates a **Micro Frontend (MFE)** architecture where a main **Shell Application** _hosts_ multiple independent mini-applications (the MFEs). It uses **Webpack Module Federation** to dynamically load these MFEs at runtime. Communication and shared data between the Shell and MFEs are handled via a global **Event Bus** and **Shared Context**. A mock **JSON Server** acts as the backend for user data, accessed by **User API Services** within both the Shell and MFEs, with updates being broadcast via the Event Bus.

```mermaid
flowchart TD
    A0["Micro Frontend (MFE)"]
    A1["Shell Application (Host)"]
    A2["Webpack Module Federation"]
    A3["Remote Micro Frontend (Exposed Module)"]
    A4["Event Bus (window.mfeEventBus)"]
    A5["Shared Context (window.mfeGlobalContext)"]
    A6["User API Service (UserApiService)"]
    A7["remoteEntry.js"]
    A8["Shared Modules/Libraries"]
    A9["JSON Server"]

    A1 -- "Hosts" --> A0
    A2 -- "Enables loading of" --> A0
    A0 -- "Exposes" --> A3
    A2 -- "Uses manifest" --> A7
    A1 -- "Initializes" --> A4
    A0 -- "Communicates via" --> A4
    A1 -- "Initializes & Manages" --> A5
    A0 -- "Accesses data from" --> A5
    A0 -- "Uses" --> A6
    A1 -- "Uses" --> A6
    A6 -- "Calls API on" --> A9
    A6 -- "Emits events to" --> A4
    A2 -- "Configures sharing of" --> A8
    A1 -- "Consumes" --> A8
    A0 -- "Consumes" --> A8

```

## Chapters

1. [Shell Application (Host)
   ](01_shell_application__host__.md)
2. [Micro Frontend (MFE)
   ](02_micro_frontend__mfe__.md)
3. [Webpack Module Federation
   ](03_webpack_module_federation_.md)
4. [Remote Micro Frontend (Exposed Module)
   ](04_remote_micro_frontend__exposed_module__.md)
5. [`remoteEntry.js`
   ](05__remoteentry_js__.md)
6. [Shared Modules/Libraries
   ](06_shared_modules_libraries_.md)
7. [Event Bus (`window.mfeEventBus`)
   ](07_event_bus___window_mfeeventbus___.md)
8. [Shared Context (`window.mfeGlobalContext`)
   ](08_shared_context___window_mfeglobalcontext___.md)
9. [User API Service (`UserApiService`)
   ](09_user_api_service___userapiservice___.md)
10. [JSON Server
    ](10_json_server_.md)
