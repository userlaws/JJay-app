# JJAY Market

A React Native marketplace app for John Jay College students to buy and sell items on campus.

> **Note**: This was my first app I built while learning how to build mobile applications. It was a great learning experience!

## Features

- **Today Tab**: Campus events, open facilities, and sponsored offers
- **Events Tab**: Browse and filter campus events with calendar integration
- **Queues Tab**: Join virtual queues for campus offices
- **Market Tab**: Browse listings with category filters and search
- **Profile Tab**: User profile and account management

### Core Functionality

- **Listing Management**: Create, browse, and manage marketplace listings
- **Reservation System**: Reserve items with platform fee calculation
- **QR Handoff**: In-person transaction completion with QR codes
- **Messaging**: Direct communication between buyers and sellers
- **Safety Features**: Built-in safety tips and escrow protection

## Tech Stack

- **React Native** with Expo
- **Expo Router** for navigation
- **NativeWind** (Tailwind CSS for React Native)
- **Zustand** for state management
- **FlashList** for performant scrolling
- **QR Code** generation and scanning

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Run on device/simulator:
   ```bash
   npm run ios     # iOS
   npm run android # Android
   npm run web     # Web
   ```

## Project Structure

```
app/
├── (tabs)/           # Tab navigation screens
├── listing/          # Listing details and creation
├── handoff/          # QR handoff flows
└── _layout.tsx       # Root layout

components/
├── AppCard.tsx       # Base card component
├── ListingCard.tsx  # Marketplace listing card
├── ReserveSheet.tsx # Reservation modal
└── MessageDrawer.tsx # Messaging interface

stores/
└── reservations.ts  # Zustand store for reservations

lib/
└── fees.ts          # Platform fee calculation
```

## Key Components

### AppCard

Reusable card component with dark mode support and consistent styling.

### ListingCard

Marketplace listing display with price, seller info, and action buttons.

### ReserveSheet

Multi-step reservation flow with pricing breakdown and meetup scheduling.

### QR Handoff

- **Seller**: Display QR code for transaction completion
- **Buyer**: Scan QR code to complete payment

## State Management

Uses Zustand for simple, efficient state management:

- Reservation tracking
- Transaction status updates
- User preferences

## Styling

Built with NativeWind (Tailwind CSS for React Native):

- Consistent design system
- Dark mode support
- Responsive layouts
- Mobile-first approach

## Future Enhancements

- Payment integration (Stripe)
- Authentication (Supabase)
- Push notifications
- Image upload
- Advanced search and filters
- Rating and review system

## Development

The app is built with modern React Native practices:

- TypeScript for type safety
- Expo for rapid development
- File-based routing
- Component composition
- Custom hooks for logic

## Testing

Test the app by:

1. Browsing the market listings
2. Creating a new listing
3. Testing the reservation flow
4. Scanning QR codes (use two devices)
5. Using the messaging system

## Deployment

Ready for Expo EAS Build:

```bash
eas build --platform ios
eas build --platform android
```
