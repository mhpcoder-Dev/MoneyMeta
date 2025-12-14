# MoneyMeta - Government Auction Explorer

A modern Next.js application for exploring government surplus auctions from various sources including GSA (General Services Administration).

## Features

- **Government Auction Integration**: Fetches real-time auction data from GSA
- **Search & Filter**: Advanced filtering by asset type, location, and search terms
- **Navy Blue Theme**: Professional design with navy blue accents
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modal Details**: Detailed auction information in responsive modal
- **Real-time Updates**: Live auction status and countdown timers

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom navy blue theme
- **UI Components**: Radix UI primitives with shadcn/ui
- **Icons**: Lucide React
- **API Integration**: GSA Auctions API with fallback mock data
- **TypeScript**: Full type safety (converted to JSX for simplicity)

## Project Structure

```
src/
├── app/
│   ├── api/auctions/gsa/    # API routes for GSA integration
│   ├── globals.css          # Global styles with navy theme
│   ├── layout.jsx           # Root layout with providers
│   └── page.jsx             # Main auction listing page
├── components/
│   ├── ui/                  # Base UI components (shadcn/ui)
│   ├── ItemCard.jsx         # Auction item card component
│   ├── SearchFilters.jsx    # Search and filter component
│   ├── ItemModal.jsx        # Detailed item modal
│   ├── Navbar.jsx           # Navigation component
│   └── Providers.jsx        # Theme and other providers
└── lib/
    └── utils.js             # Utility functions
```

## Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open Browser**: Navigate to [http://localhost:3000](http://localhost:3000)

## API Configuration

The application integrates with the GSA Auctions API. The API route `/api/auctions/gsa` handles:

- Fetching auction data from GSA
- Asset type classification
- Data transformation
- Fallback to mock data during development

## Design System

### Navy Blue Color Palette
- **Primary Navy**: `hsl(220, 65%, 25%)`
- **Navy Light**: `hsl(220, 40%, 40%)`
- **Navy Foreground**: `hsl(0, 0%, 98%)`

### Component Styling
- Cards with navy blue borders and hover effects
- Badges with navy blue background for asset types
- Buttons with navy blue theme
- Search filters with navy blue accents

## Features in Detail

### Auction Cards
- Image gallery with asset type badges
- Location and timing information
- Click to view detailed modal

### Search & Filtering
- Text search across titles and descriptions
- Filter by country/state
- Filter by asset type (vehicles, electronics, real estate, etc.)
- Clear all filters functionality

### Asset Classification
Automatic classification of auctions into categories:
- Real Estate & Land
- Vehicles (Cars, Trailers, Motorcycles)
- Electronics
- Industrial Equipment
- Furniture
- Collectibles

### Responsive Design
- Mobile-first approach
- Sticky navigation
- Grid layouts that adapt to screen size
- Touch-friendly interactions

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Components**: Add to `src/components/`
2. **New Pages**: Add to `src/app/`
3. **API Routes**: Add to `src/app/api/`
4. **Styling**: Extend `src/app/globals.css`

## Deployment

The application is configured for deployment on Vercel with:
- Automatic builds on git push
- Environment variable support
- Serverless API routes
- Static asset optimization

## Environment Variables

Create a `.env.local` file for local development:

```env
# Add any required environment variables here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.