# VISUAL STUDIO IDE में ASPX PROJECT कैसे बनाएं - Complete Step-by-Step Guide

## 📋 Table of Contents
1. [Prerequisites - क्या-क्या चाहिए](#prerequisites)
2. [Visual Studio Installation](#visual-studio-installation)
3. [New Project Creation](#new-project-creation)
4. [Project Structure Setup](#project-structure-setup)
5. [Master Page Creation](#master-page-creation)
6. [ASPX Pages Creation](#aspx-pages-creation)
7. [CSS & JavaScript Files](#css-javascript-files)
8. [API Endpoints Setup](#api-endpoints-setup)
9. [Testing & Running](#testing-running)
10. [Troubleshooting](#troubleshooting)

---

## 1️⃣ Prerequisites - क्या-क्या चाहिए

### A. Software Requirements

**Visual Studio 2019/2022 Community Edition** (Free)
- Download Link: https://visualstudio.microsoft.com/downloads/
- Size: ~3-5 GB
- Installation Time: 30-45 minutes

**Workloads needed:**
- ✅ ASP.NET and web development
- ✅ .NET desktop development

---

## 2️⃣ Visual Studio Installation (Screenshots के साथ)

### Step 1: Download Visual Studio

1. **Browser open karo** → https://visualstudio.microsoft.com/downloads/
2. **"Community 2022" download karo** (Free version)
3. **Installer run karo** (vs_community.exe)

### Step 2: Select Workloads

Visual Studio Installer खुलेगा:

```
┌─────────────────────────────────────────────────┐
│   Visual Studio Installer                       │
├─────────────────────────────────────────────────┤
│                                                 │
│  ☐ Desktop & Mobile                            │
│  ☑ ASP.NET and web development  ← Check this  │
│  ☑ .NET desktop development     ← Check this  │
│  ☐ Azure development                           │
│  ☐ Node.js development                         │
│  ☐ Python development                          │
│  ☐ Data storage and processing                 │
│                                                 │
│  [Install]  [Modify]  [Cancel]                 │
└─────────────────────────────────────────────────┘
```

3. **"ASP.NET and web development"** को check karo
4. **"Install"** button click karo
5. **Wait for installation** (30-45 minutes)

### Step 3: Launch Visual Studio

1. Installation complete hone ke baad **"Launch"** click karo
2. **Sign in** (optional - skip kar sakte ho)
3. **Theme select karo** (Blue/Dark/Light)
4. **"Start Visual Studio"** click karo

---

## 3️⃣ New Project Creation - Step by Step

### Step 1: Create New Project

Visual Studio open karne ke baad:

```
File → New → Project
```

**Ya shortcut:** `Ctrl + Shift + N`

### Step 2: Select Project Template

**Search box mein type karo:** `ASP.NET Web Application`

```
┌──────────────────────────────────────────────────┐
│  Create a new project                            │
├──────────────────────────────────────────────────┤
│  Search: [ASP.NET Web Application         ]  🔍  │
│                                                   │
│  ┌─────────────────────────────────────────┐    │
│  │  ASP.NET Web Application (.NET Framework)│    │
│  │  C#  Windows  Web                        │    │
│  │  ⭐⭐⭐⭐⭐                              │    │
│  └─────────────────────────────────────────┘    │
│                                                   │
│  [Next]  [Back]  [Cancel]                        │
└──────────────────────────────────────────────────┘
```

**Select karo:**
- Template: **"ASP.NET Web Application (.NET Framework)"**
- Language: **C#**
- Click: **"Next"**

### Step 3: Configure Project

```
┌──────────────────────────────────────────────────┐
│  Configure your new project                      │
├──────────────────────────────────────────────────┤
│                                                   │
│  Project name:                                    │
│  [DashboardASPX                           ]      │
│                                                   │
│  Location:                                        │
│  [E:\Projects\                            ] 📁    │
│                                                   │
│  Solution name:                                   │
│  [DashboardASPX                           ]      │
│                                                   │
│  ☑ Place solution and project in same directory  │
│                                                   │
│  [Create]  [Back]  [Cancel]                      │
└──────────────────────────────────────────────────┘
```

**Fill karo:**
- Project name: `DashboardASPX`
- Location: `E:\Projects\` (ya koi bhi folder)
- Solution name: `DashboardASPX`
- Check: "Place solution and project in same directory"

**Click:** "Create"

### Step 4: Select Template Type

```
┌──────────────────────────────────────────────────┐
│  Create a new ASP.NET Web Application            │
├──────────────────────────────────────────────────┤
│                                                   │
│  Select a template:                               │
│                                                   │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐           │
│  │Empty│  │ MVC │  │ Web │  │ API │  ← Select  │
│  │     │  │     │  │Forms│  │     │            │
│  └─────┘  └─────┘  └─────┘  └─────┘           │
│                        ▲                          │
│                        │                          │
│                   Select Empty                    │
│                                                   │
│  Framework: [.NET Framework 4.7.2  ▼]           │
│                                                   │
│  Add folders and references for:                  │
│  ☐ Web Forms                                     │
│  ☐ MVC                                           │
│  ☐ Web API                                       │
│                                                   │
│  [Create]  [Back]  [Cancel]                      │
└──────────────────────────────────────────────────┘
```

**Select karo:**
- Template: **"Empty"** (clean start ke liye)
- Framework: **".NET Framework 4.7.2"** (ya higher)
- **DON'T check** any boxes (Web Forms, MVC, API)

**Click:** "Create"

**Wait...** Project create ho raha hai (10-15 seconds)

---

## 4️⃣ Project Structure Setup

Project create hone ke baad, aapko **Solution Explorer** mein ye dikhega:

```
Solution 'DashboardASPX'
└── DashboardASPX
    ├── Properties
    ├── References
    ├── Web.config
    └── packages.config
```

### Step 1: Create Folder Structure

**Solution Explorer** mein **DashboardASPX** project pe **right-click** karo:

#### Create Folders:

1. **css folder:**
   ```
   Right-click on "DashboardASPX" → Add → New Folder
   Name: css
   ```

2. **js folder:**
   ```
   Right-click on "DashboardASPX" → Add → New Folder
   Name: js
   ```

3. **api folder:**
   ```
   Right-click on "DashboardASPX" → Add → New Folder
   Name: api
   ```

4. **images folder:**
   ```
   Right-click on "DashboardASPX" → Add → New Folder
   Name: images
   ```

**Final Structure:**
```
DashboardASPX
├── Properties
├── References
├── css/              ← New
├── js/               ← New
├── api/              ← New
├── images/           ← New
├── Web.config
└── packages.config
```

---

## 5️⃣ Master Page Creation

### Step 1: Add Master Page

1. **Right-click on "DashboardASPX" project**
2. **Add → New Item** (या `Ctrl + Shift + A`)

```
┌──────────────────────────────────────────────────┐
│  Add New Item - DashboardASPX                    │
├──────────────────────────────────────────────────┤
│  Search: [master                          ]  🔍  │
│                                                   │
│  Installed                                        │
│  ├─ Visual C#                                    │
│  │  ├─ Web                                       │
│  │  │  ├─ Web Form                               │
│  │  │  ├─ Master Page        ← Select this      │
│  │  │  ├─ User Control                           │
│  │  │  └─ Web Service                            │
│                                                   │
│  Name: [Site.Master                      ]       │
│                                                   │
│  [Add]  [Cancel]                                 │
└──────────────────────────────────────────────────┘
```

3. **Select:** "Master Page"
4. **Name:** `Site.Master`
5. **Click:** "Add"

### Step 2: Replace Site.Master Code

`Site.Master` file automatically open hogi. **Sab delete karo** aur ye code paste karo:

```aspx
<%@ Master Language="C#" AutoEventWireup="true" CodeBehind="Site.Master.cs" Inherits="DashboardASPX.SiteMaster" %>

<!DOCTYPE html>
<html lang="en">
<head runat="server">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%: Page.Title %> - Indus Dashboard</title>

    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Custom Tailwind Config -->
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: '#f0f9ff',
                            100: '#e0f2fe',
                            200: '#bae6fd',
                            300: '#7dd3fc',
                            400: '#38bdf8',
                            500: '#0ea5e9',
                            600: '#0284c7',
                            700: '#0369a1',
                            800: '#075985',
                            900: '#0c4a6e',
                        }
                    }
                }
            }
        }
    </script>

    <!-- Global CSS -->
    <link href="css/globals.css" rel="stylesheet" />

    <!-- Feather Icons -->
    <script src="https://unpkg.com/feather-icons"></script>

    <asp:ContentPlaceHolder ID="head" runat="server">
    </asp:ContentPlaceHolder>
</head>
<body>
    <form id="form1" runat="server">
        <div class="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">

            <!-- Mobile Toggle Button -->
            <button id="mobile-menu-toggle" type="button"
                    class="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <i data-feather="menu" class="w-5 h-5 text-gray-700"></i>
            </button>

            <!-- Sidebar -->
            <aside id="sidebar"
                   class="fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out -translate-x-full lg:translate-x-0 w-56">
                <div class="flex flex-col h-full">

                    <!-- Header -->
                    <div class="h-14 border-b border-gray-200 flex items-center px-3 flex-shrink-0">
                        <div class="flex items-center gap-2.5 min-w-0">
                            <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                                <span class="text-white font-bold text-xs">ID</span>
                            </div>
                            <div class="sidebar-text overflow-hidden transition-all duration-300">
                                <h1 class="text-sm font-bold text-gray-900 whitespace-nowrap">Dashboard</h1>
                            </div>
                        </div>
                    </div>

                    <!-- Filters -->
                    <div class="border-b border-gray-200 sidebar-filters">
                        <div class="p-3 space-y-2.5">
                            <div>
                                <label class="text-[10px] font-semibold text-gray-600 mb-1 block uppercase tracking-wider">Year</label>
                                <select id="yearFilter" class="w-full text-xs h-8 px-2 rounded-md border border-gray-300 bg-white focus:border-sky-400 transition-all">
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                </select>
                            </div>
                            <div>
                                <label class="text-[10px] font-semibold text-gray-600 mb-1 block uppercase tracking-wider">Region</label>
                                <select id="regionFilter" class="w-full text-xs h-8 px-2 rounded-md border border-gray-300 bg-white focus:border-sky-400 transition-all">
                                    <option value="all">All Regions</option>
                                    <option value="indore">Indore</option>
                                    <option value="pithampur">Pithampur</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Navigation -->
                    <nav class="flex-1 overflow-y-auto py-2">
                        <ul class="px-2 space-y-0.5">
                            <li>
                                <a href="Dashboard.aspx"
                                   class="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-200 bg-sky-600 text-white font-medium shadow-sm">
                                    <i data-feather="home" class="flex-shrink-0 w-4 h-4"></i>
                                    <span class="sidebar-text text-xs font-medium">Dashboard</span>
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <!-- Toggle Button -->
                    <div class="border-t border-gray-200 p-2">
                        <button id="sidebar-toggle" type="button"
                                class="hidden lg:flex items-center gap-2 w-full px-2.5 py-2 rounded-lg text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
                            <i data-feather="chevron-left" class="w-4 h-4"></i>
                            <span class="sidebar-text">Collapse</span>
                        </button>
                    </div>

                </div>
            </aside>

            <!-- Overlay for mobile -->
            <div id="sidebar-overlay" class="lg:hidden fixed inset-0 bg-black/50 z-30 hidden"></div>

            <!-- Main Content Area -->
            <div id="main-content" class="flex-1 transition-all duration-300 ease-in-out flex flex-col lg:ml-56">

                <!-- Topbar -->
                <header class="sticky top-0 z-30 bg-white border-b border-gray-200">
                    <div class="h-14 px-4 sm:px-6 flex items-center justify-between gap-4">
                        <div class="flex items-center gap-4 flex-1 ml-12 lg:ml-0">
                            <div class="hidden md:block">
                                <h1 class="text-sm font-bold text-gray-900">Dashboard</h1>
                                <p class="text-[11px] text-gray-500" id="current-date"></p>
                            </div>
                            <div class="flex-1 max-w-md">
                                <div class="relative">
                                    <i data-feather="search" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"></i>
                                    <input type="text" placeholder="Search..."
                                           class="w-full pl-9 pr-3 h-9 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-sky-400 transition-all" />
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <button type="button" class="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100">
                                <i data-feather="bell" class="w-4 h-4 text-gray-600"></i>
                                <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-500 rounded-full"></span>
                            </button>
                            <div class="w-px h-6 bg-gray-200"></div>
                            <div class="flex items-center gap-2">
                                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                                    AD
                                </div>
                                <div class="hidden lg:block">
                                    <p class="text-xs font-semibold text-gray-900">Admin User</p>
                                    <p class="text-[10px] text-gray-500">Administrator</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <!-- Main Content -->
                <main class="flex-1 p-6 overflow-auto">
                    <div class="max-w-[1600px] mx-auto">
                        <asp:ContentPlaceHolder ID="MainContent" runat="server">
                        </asp:ContentPlaceHolder>
                    </div>
                </main>

            </div>

        </div>
    </form>

    <!-- Scripts -->
    <script src="js/sidebar.js"></script>
    <script>
        feather.replace();
        const dateEl = document.getElementById('current-date');
        if (dateEl) {
            dateEl.textContent = new Date().toLocaleDateString('en-US', {
                weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
            });
        }
    </script>

    <asp:ContentPlaceHolder ID="scripts" runat="server">
    </asp:ContentPlaceHolder>
</body>
</html>
```

### Step 3: Update Site.Master.cs (Code-behind)

`Site.Master.cs` file open karo aur ye code paste karo:

```csharp
using System;
using System.Web.UI;

namespace DashboardASPX
{
    public partial class SiteMaster : MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // Page load logic here
        }
    }
}
```

**Save karo:** `Ctrl + S`

---

## 6️⃣ ASPX Pages Creation

### Step 1: Add Dashboard Page

1. **Right-click on "DashboardASPX" project**
2. **Add → New Item** (`Ctrl + Shift + A`)
3. **Select:** "Web Form with Master Page"

```
┌──────────────────────────────────────────────────┐
│  Add New Item - DashboardASPX                    │
├──────────────────────────────────────────────────┤
│  Installed                                        │
│  ├─ Visual C#                                    │
│  │  ├─ Web                                       │
│  │  │  ├─ Web Form                               │
│  │  │  ├─ Web Form with Master Page  ← Select   │
│  │  │  ├─ Master Page                            │
│                                                   │
│  Name: [Dashboard.aspx                   ]       │
│                                                   │
│  [Add]  [Cancel]                                 │
└──────────────────────────────────────────────────┘
```

4. **Name:** `Dashboard.aspx`
5. **Click:** "Add"

### Step 2: Select Master Page

Popup aayega:

```
┌──────────────────────────────────────────────────┐
│  Select a Master Page                            │
├──────────────────────────────────────────────────┤
│                                                   │
│  Contents of folder:                              │
│  ┌────────────────────────────────────────────┐ │
│  │  📄 Site.Master            ← Select this   │ │
│  │                                             │ │
│  └────────────────────────────────────────────┘ │
│                                                   │
│  [OK]  [Cancel]                                  │
└──────────────────────────────────────────────────┘
```

**Click:** "OK"

### Step 3: Replace Dashboard.aspx Code

File open hogi, **sab delete karo** aur ye paste karo:

```aspx
<%@ Page Title="Dashboard" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Dashboard.aspx.cs" Inherits="DashboardASPX.Dashboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="min-h-screen">

        <!-- Metric Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">

            <!-- Card 1: Approvals -->
            <div class="metric-card cursor-pointer" data-section="approvals">
                <div class="border-2 border-transparent bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all">
                    <div class="bg-gradient-to-br from-orange-500 to-red-500 p-4">
                        <div class="flex justify-between mb-3">
                            <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                <i data-feather="check-square" class="text-white w-5 h-5"></i>
                            </div>
                            <span class="bg-red-600 text-white text-xs px-2 py-1 rounded-full">12</span>
                        </div>
                        <div class="text-white">
                            <div class="text-3xl font-bold">63</div>
                            <div class="text-xs opacity-90">Pending actions</div>
                        </div>
                    </div>
                    <div class="p-4 bg-white">
                        <h3 class="text-sm font-bold text-gray-900 mb-2">Approvals</h3>
                        <span class="text-xs text-gray-600">+8 today</span>
                    </div>
                </div>
            </div>

            <!-- Card 2: Daily Operations -->
            <div class="metric-card cursor-pointer" data-section="daily-update">
                <div class="border-2 border-transparent bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all">
                    <div class="bg-gradient-to-br from-blue-500 to-cyan-500 p-4">
                        <div class="flex justify-between mb-3">
                            <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                <i data-feather="calendar" class="text-white w-5 h-5"></i>
                            </div>
                            <span class="bg-red-600 text-white text-xs px-2 py-1 rounded-full">5</span>
                        </div>
                        <div class="text-white">
                            <div class="text-3xl font-bold">28</div>
                            <div class="text-xs opacity-90">Active orders</div>
                        </div>
                    </div>
                    <div class="p-4 bg-white">
                        <h3 class="text-sm font-bold text-gray-900 mb-2">Daily Operations</h3>
                        <span class="text-xs text-gray-600">5 delayed</span>
                    </div>
                </div>
            </div>

            <!-- Card 3: Quality Control -->
            <div class="metric-card cursor-pointer" data-section="qc">
                <div class="border-2 border-transparent bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all">
                    <div class="bg-gradient-to-br from-purple-500 to-pink-500 p-4">
                        <div class="flex justify-between mb-3">
                            <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                <i data-feather="activity" class="text-white w-5 h-5"></i>
                            </div>
                            <span class="bg-red-600 text-white text-xs px-2 py-1 rounded-full">2</span>
                        </div>
                        <div class="text-white">
                            <div class="text-3xl font-bold">15%</div>
                            <div class="text-xs opacity-90">Wastage rate</div>
                        </div>
                    </div>
                    <div class="p-4 bg-white">
                        <h3 class="text-sm font-bold text-gray-900 mb-2">Quality Control</h3>
                        <span class="text-xs text-gray-600">85% efficiency</span>
                    </div>
                </div>
            </div>

            <!-- Card 4: Business Health -->
            <div class="metric-card cursor-pointer" data-section="business-health">
                <div class="border-2 border-transparent bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all">
                    <div class="bg-gradient-to-br from-green-500 to-emerald-500 p-4">
                        <div class="flex justify-between mb-3">
                            <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                <i data-feather="trending-up" class="text-white w-5 h-5"></i>
                            </div>
                        </div>
                        <div class="text-white">
                            <div class="text-3xl font-bold">₹67.5L</div>
                            <div class="text-xs opacity-90">Total sales</div>
                        </div>
                    </div>
                    <div class="p-4 bg-white">
                        <h3 class="text-sm font-bold text-gray-900 mb-2">Business Health</h3>
                        <span class="text-xs text-gray-600">+12.5% growth</span>
                    </div>
                </div>
            </div>

            <!-- Card 5: Purchases -->
            <div class="metric-card cursor-pointer" data-section="purchases">
                <div class="border-2 border-transparent bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all">
                    <div class="bg-gradient-to-br from-indigo-500 to-blue-600 p-4">
                        <div class="flex justify-between mb-3">
                            <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                <i data-feather="shopping-cart" class="text-white w-5 h-5"></i>
                            </div>
                        </div>
                        <div class="text-white">
                            <div class="text-3xl font-bold">₹55.2L</div>
                            <div class="text-xs opacity-90">Total spend</div>
                        </div>
                    </div>
                    <div class="p-4 bg-white">
                        <h3 class="text-sm font-bold text-gray-900 mb-2">Purchases</h3>
                        <span class="text-xs text-gray-600">68 POs raised</span>
                    </div>
                </div>
            </div>

        </div>

        <!-- Expanded Section -->
        <div id="expanded-section" class="hidden">
            <div class="border-2 border-sky-400 rounded-lg shadow-2xl bg-white p-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 id="section-title" class="text-xl font-bold text-gray-900">Section Details</h2>
                    <button id="close-section" type="button"
                            class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium">
                        Close View
                    </button>
                </div>
                <div id="section-content"></div>
            </div>
        </div>

        <!-- Help Text -->
        <div id="help-text" class="text-center py-12">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-200">
                <div class="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></div>
                <span class="text-sm text-gray-600">Click any card above to view detailed analytics</span>
            </div>
        </div>

    </div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="scripts" runat="server">
    <script src="js/dashboard.js"></script>
</asp:Content>
```

### Step 4: Update Dashboard.aspx.cs

```csharp
using System;
using System.Web.UI;

namespace DashboardASPX
{
    public partial class Dashboard : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // Page load logic
        }
    }
}
```

**Save:** `Ctrl + S`

---

## 7️⃣ CSS & JavaScript Files

### A. Create globals.css

1. **Right-click on "css" folder**
2. **Add → New Item**
3. **Select:** "Style Sheet"
4. **Name:** `globals.css`
5. **Add this code:**

```css
@layer base {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }
}

/* Sidebar transitions */
.sidebar-collapsed {
  width: 4rem !important;
}

.sidebar-collapsed .sidebar-text {
  display: none;
}

.sidebar-collapsed .sidebar-filters {
  display: none;
}

/* Metric card active state */
.metric-card.active > div {
  border-color: #0ea5e9 !important;
  transform: scale(1.05);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### B. Create sidebar.js

1. **Right-click on "js" folder**
2. **Add → New Item**
3. **Select:** "JavaScript File"
4. **Name:** `sidebar.js`
5. **Add this code:**

```javascript
(function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mainContent = document.getElementById('main-content');
    const overlay = document.getElementById('sidebar-overlay');
    const mobileToggle = document.getElementById('mobile-menu-toggle');

    let isCollapsed = false;

    // Desktop toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            isCollapsed = !isCollapsed;
            if (isCollapsed) {
                sidebar.classList.add('sidebar-collapsed');
            } else {
                sidebar.classList.remove('sidebar-collapsed');
            }
        });
    }

    // Mobile toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('-translate-x-full');
            overlay.classList.toggle('hidden');
        });
    }

    // Close on overlay click
    if (overlay) {
        overlay.addEventListener('click', function() {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        });
    }
})();
```

### C. Create dashboard.js

1. **Right-click on "js" folder**
2. **Add → JavaScript File**
3. **Name:** `dashboard.js`
4. **Add this code:**

```javascript
(function() {
    const cards = document.querySelectorAll('.metric-card');
    const expandedSection = document.getElementById('expanded-section');
    const sectionContent = document.getElementById('section-content');
    const sectionTitle = document.getElementById('section-title');
    const closeBtn = document.getElementById('close-section');
    const helpText = document.getElementById('help-text');

    let activeSection = null;

    // Initialize Feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // Card click handler
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const section = this.getAttribute('data-section');

            if (activeSection === section) {
                closeSection();
                return;
            }

            cards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            activeSection = section;

            const title = this.querySelector('h3').textContent;
            sectionTitle.textContent = title + ' Details';

            expandedSection.classList.remove('hidden');
            helpText.classList.add('hidden');

            loadSection(section);
        });
    });

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSection);
    }

    function closeSection() {
        cards.forEach(c => c.classList.remove('active'));
        expandedSection.classList.add('hidden');
        helpText.classList.remove('hidden');
        activeSection = null;
    }

    function loadSection(section) {
        sectionContent.innerHTML = '<div class="text-center py-8"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto"></div></div>';

        // Simulate API call
        setTimeout(() => {
            sectionContent.innerHTML = `
                <div class="bg-white rounded-lg border p-4">
                    <h3 class="text-lg font-bold mb-4">${section} Data</h3>
                    <p class="text-gray-600">Data for ${section} section will be displayed here.</p>
                </div>
            `;
        }, 500);
    }
})();
```

---

## 8️⃣ API Endpoints Setup

### Create ApprovalsAPI.aspx

1. **Right-click on "api" folder**
2. **Add → New Item**
3. **Select:** "Web Form"
4. **Name:** `ApprovalsAPI.aspx`
5. **Add**

**ApprovalsAPI.aspx** - Delete everything, add:

```aspx
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ApprovalsAPI.aspx.cs" Inherits="DashboardASPX.api.ApprovalsAPI" %>
```

**ApprovalsAPI.aspx.cs** - Add this code:

```csharp
using System;
using System.Collections.Generic;
using System.Web.Script.Serialization;
using System.Web.UI;

namespace DashboardASPX.api
{
    public partial class ApprovalsAPI : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.Clear();
            Response.ContentType = "application/json";

            var data = new {
                totalApprovals = 63,
                pending = 12,
                items = new[] {
                    new { id = 1, title = "Budget Approval", urgent = true },
                    new { id = 2, title = "PO Approval", urgent = false }
                }
            };

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            Response.Write(serializer.Serialize(data));
            Response.End();
        }
    }
}
```

---

## 9️⃣ Testing & Running

### Step 1: Set Dashboard.aspx as Start Page

1. **Solution Explorer** mein `Dashboard.aspx` pe **right-click**
2. **"Set As Start Page"** select karo

### Step 2: Build Project

```
Build → Build Solution
```

**Shortcut:** `Ctrl + Shift + B`

**Output window** mein dekhoge:
```
Build started...
1>------ Build started: Project: DashboardASPX
1>  DashboardASPX -> E:\Projects\DashboardASPX\bin\DashboardASPX.dll
========== Build: 1 succeeded, 0 failed ==========
```

### Step 3: Run Project

**Click:** Green play button (▶️) ya `F5`

```
┌─────────────────────────────────────┐
│  ▶️ IIS Express                     │
└─────────────────────────────────────┘
```

**Browser automatically open hoga** with:
```
http://localhost:xxxxx/Dashboard.aspx
```

---

## 🔧 Troubleshooting Common Issues

### Issue 1: Tailwind CSS not working

**Solution:**
- Check internet connection (CDN ke liye)
- Browser console check karo (`F12`)

### Issue 2: Icons not showing

**Solution:**
- Feather icons CDN link check karo
- `feather.replace()` call ho raha hai verify karo

### Issue 3: Build errors

**Solution:**
```
Build → Clean Solution
Build → Rebuild Solution
```

### Issue 4: JavaScript not working

**Solution:**
- Browser console check karo (`F12`)
- File paths correct hain verify karo
- `type="button"` buttons mein add karo

### Issue 5: Master Page not found

**Solution:**
- `MasterPageFile="~/Site.Master"` path check karo
- Namespace correct hai verify karo

---

## 🎯 Final Project Structure

```
DashboardASPX/
├── Properties/
├── References/
├── api/
│   ├── ApprovalsAPI.aspx
│   └── ApprovalsAPI.aspx.cs
├── css/
│   └── globals.css
├── js/
│   ├── sidebar.js
│   └── dashboard.js
├── images/
├── Site.Master
├── Site.Master.cs
├── Site.Master.designer.cs
├── Dashboard.aspx
├── Dashboard.aspx.cs
├── Dashboard.aspx.designer.cs
├── Web.config
└── packages.config
```

---

## ✅ Checklist

- [ ] Visual Studio installed with ASP.NET workload
- [ ] Project created (ASP.NET Web Application)
- [ ] Folder structure created (css, js, api, images)
- [ ] Master Page created (Site.Master)
- [ ] Dashboard.aspx created with Master Page
- [ ] CSS file created (globals.css)
- [ ] JavaScript files created (sidebar.js, dashboard.js)
- [ ] API endpoint created (ApprovalsAPI.aspx)
- [ ] Project builds successfully
- [ ] Project runs in browser
- [ ] UI displays correctly with Tailwind CSS
- [ ] Icons showing (Feather Icons)
- [ ] Sidebar toggle working
- [ ] Cards clickable

---

## 🚀 Next Steps

1. **More ASPX pages banao:** Approvals.aspx, Purchases.aspx, etc.
2. **More API endpoints:** PurchasesAPI, QC API, etc.
3. **Database connection:** SQL Server se data fetch karo
4. **Authentication:** Login page add karo
5. **Deploy to IIS:** Production server pe deploy karo

---

## 📚 Helpful Resources

- **Visual Studio Docs:** https://docs.microsoft.com/visualstudio/
- **ASP.NET Web Forms:** https://docs.microsoft.com/aspnet/web-forms/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Feather Icons:** https://feathericons.com/

---

**Happy Coding! 🎉**

**Created:** 2025
**Version:** 1.0
**For:** Complete Visual Studio IDE Setup Guide
