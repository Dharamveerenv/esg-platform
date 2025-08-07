# ESG Platform Dashboard

A comprehensive Environmental, Social, and Governance (ESG) reporting and analytics platform built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Dashboard Interface**: Built with shadcn/ui components and Tailwind CSS
- **Comprehensive ESG Analytics**: Multiple dashboard views for different ESG metrics
- **Responsive Design**: Mobile-first responsive design for all screen sizes
- **Type-Safe**: Built with TypeScript for enhanced developer experience
- **Performance Optimized**: Leverages Next.js 15 with Turbopack for fast development

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **UI Components**: shadcn/ui with Radix UI primitives
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

## 📊 Dashboard Views

The platform includes multiple specialized dashboard views:

- **Main Dashboard** (`/dashboard`) - Overview of key ESG metrics
- **Business Dashboards** (`/dashboard/b0-b11`) - Business-specific ESG analytics
- **Category Dashboards** (`/dashboard/c1-c9`) - Category-specific ESG reporting

## 🏗️ Project Structure

```
src/
├── app/
│   ├── dashboard/          # Dashboard routes
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Login page
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── app-sidebar.tsx    # Navigation sidebar
│   ├── company-switcher.tsx
│   ├── login-form.tsx     # Authentication form
│   └── search-form.tsx    # Search functionality
├── hooks/
│   └── use-mobile.ts      # Mobile detection hook
└── lib/
    └── utils.ts           # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/esg-platform.git
cd esg-platform
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run shadcn:*` - shadcn/ui helper scripts

## 🎨 Design System

The project uses a comprehensive design system built on:

- **shadcn/ui**: Pre-built, accessible components
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Low-level UI primitives
- **Lucide Icons**: Consistent iconography

### Custom Components

- Sidebar navigation with company switching
- Responsive search functionality  
- Comprehensive form components with validation
- Chart components for data visualization

## 🔧 Development

### Adding New Dashboard Views

1. Create a new route in `src/app/dashboard/`
2. Follow the existing pattern for consistency
3. Use the established component library

### Customizing the UI

The project uses shadcn/ui components that can be customized via:
- `components.json` - Component configuration
- `src/components/ui/` - Component implementations
- Tailwind CSS classes for styling

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Other Platforms

The app can be deployed to any platform that supports Node.js:
- Netlify
- AWS Amplify
- Google Cloud Platform
- Azure Static Web Apps

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 ESG Reporting Standards

This platform supports various ESG reporting frameworks:
- GRI (Global Reporting Initiative)
- SASB (Sustainability Accounting Standards Board)
- TCFD (Task Force on Climate-related Financial Disclosures)
- UN Global Compact

## 🔒 Security & Privacy

- Type-safe data handling with TypeScript and Zod
- Form validation and sanitization
- Secure authentication patterns
- GDPR compliance considerations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support, please open an issue on GitHub or contact the development team.

---

Built with ❤️ for sustainable business practices