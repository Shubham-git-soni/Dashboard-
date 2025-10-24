# Indus Dashboard - Modern Business Analytics Platform

A comprehensive, production-ready dashboard application built with Next.js 14, TypeScript, Tailwind CSS, and Recharts for manufacturing and business analytics.

## Features

### Dashboard Modules

1. **My Approvals & Actions**
   - Internal approvals tracking
   - Price approvals
   - Purchase requisition approvals
   - PO and invoice approvals
   - Critical inventory alerts
   - Paper requirement tracking
   - Interactive sparkline charts for trends

2. **My Daily Update**
   - Order BOM tracking
   - Production status monitoring
   - Real-time order details table
   - Pending sales POs, deliveries, and GRN tracking
   - Delay indicators

3. **My QC (Quality Control)**
   - Overall wastage analytics
   - Job-wise wastage breakdown
   - Machine-wise efficiency tracking
   - Interactive pie and bar charts

4. **My Business Health Overview**
   - Sales trends (current vs past periods)
   - Quotations and conversion tracking
   - Customer segmentation analysis
   - Top-selling products
   - Region-wise sales performance
   - Executive performance metrics
   - New vs old client analysis

5. **Purchases Summary**
   - Purchase growth trends
   - Purchase order tracking
   - Vendor-wise analysis
   - Category-wise purchase breakdown
   - Vendor performance ratings

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** React Icons & Lucide React
- **Date Handling:** date-fns
- **UI Components:** Custom components with shadcn/ui patterns

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
Dashboard/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── dashboard/            # Dashboard pages
│   │   ├── api/                  # API routes
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page
│   ├── components/
│   │   ├── layout/               # Layout components
│   │   │   ├── Sidebar.tsx
│   │   │   └── Topbar.tsx
│   │   ├── sections/             # Dashboard sections
│   │   │   ├── ApprovalsSection.tsx
│   │   │   ├── DailyUpdateSection.tsx
│   │   │   ├── QCSection.tsx
│   │   │   ├── BusinessHealthSection.tsx
│   │   │   └── PurchasesSection.tsx
│   │   └── ui/                   # Reusable UI components
│   │       ├── card.tsx
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── badge.tsx
│   │       └── select.tsx
│   └── lib/
│       └── utils.ts              # Utility functions
├── public/                       # Static assets
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json

```

## Features & Highlights

### Responsive Design
- Mobile-first approach
- Collapsible sidebar for smaller screens
- Adaptive grid layouts
- Touch-friendly navigation

### Interactive Visualizations
- Line charts for trend analysis
- Bar charts for comparisons
- Pie charts for distributions
- Area charts for growth tracking
- Sparklines for quick insights

### User Experience
- Clean, modern interface
- Intuitive navigation
- Real-time data updates
- Color-coded status indicators
- Priority badges for urgent items

### Performance
- Server-side rendering
- Optimized bundle size
- Lazy loading components
- Efficient data fetching

## API Routes

The dashboard includes mock API routes for demonstration:

- `/api/approvals` - Approval data
- `/api/daily-update` - Order tracking data
- `/api/qc` - Quality control metrics
- `/api/business-health` - Business analytics
- `/api/purchases` - Purchase data

Replace these with your actual backend API endpoints.

## Customization

### Colors
Update the color scheme in `tailwind.config.ts`:
```typescript
colors: {
  primary: { /* your color palette */ }
}
```

### Data Sources
Connect to your backend by updating the API routes in `src/app/api/` or by using data fetching in components.

### Branding
- Update logo in `src/components/layout/Sidebar.tsx`
- Modify company name and footer in layout components

## Future Enhancements

- [ ] User authentication with NextAuth.js
- [ ] Role-based access control
- [ ] Real-time notifications
- [ ] Export to PDF/CSV
- [ ] Dark mode theme
- [ ] Offline support with SWR
- [ ] Advanced filtering and search
- [ ] Custom date range selection
- [ ] Dashboard customization

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import repository in Vercel
3. Deploy automatically

### Other Platforms
- AWS Amplify
- Azure Static Web Apps
- Netlify
- Docker containerization

## License

MIT License - feel free to use this project for your business needs.

## Support

For issues or questions, please create an issue in the repository.

---

Built with ❤️ using Next.js and Tailwind CSS
