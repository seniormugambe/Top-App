# 🛍️ TopUp Shop - Web3 E-commerce Platform

A modern, decentralized e-commerce platform built with React and integrated with Base Wallet for secure cryptocurrency payments. Shop premium physical products using ETH on the Base blockchain network.

![Web3 E-commerce](https://img.shields.io/badge/Web3-E--commerce-blue)
![Base Network](https://img.shields.io/badge/Base-Network-0052FF)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

## ✨ Features

### 🔐 Web3 Authentication
- **Base Wallet Integration** - Seamless connection with Coinbase's Smart Wallet
- **No Passwords Required** - Secure blockchain-based authentication
- **Multi-Network Support** - Base Mainnet and Base Sepolia testnet
- **Auto Network Switching** - Intelligent network detection and switching

### 🛒 E-commerce Functionality
- **Premium Product Catalog** - 15+ curated physical products across 5 categories
- **Advanced Filtering** - Search, category, and price-based filtering
- **Responsive Design** - Mobile-first, modern UI with smooth animations
- **Product Details** - Comprehensive product pages with features and specifications

### 💳 Crypto Payments
- **ETH Payments** - Secure transactions on Base network
- **Flexible Payment Options** - Full or partial payment support
- **Transaction Tracking** - Real-time payment status and confirmations
- **Gas Optimization** - Efficient smart contract interactions

### 🎨 Modern UI/UX
- **Gradient Designs** - Beautiful, modern interface with smooth animations
- **Dark/Light Mode** - Automatic theme switching support
- **Mobile Responsive** - Optimized for all device sizes
- **Accessibility** - WCAG compliant design patterns

## 🏗️ Tech Stack

### Frontend
- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library

### Web3 Integration
- **Wagmi** - React hooks for Ethereum
- **Viem** - TypeScript interface for Ethereum
- **Coinbase Wallet SDK** - Base Wallet integration
- **Base Network** - Layer 2 Ethereum scaling solution

### State Management
- **React Query** - Server state management
- **React Router** - Client-side routing
- **Custom Hooks** - Wallet authentication and connection management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git
- Coinbase Wallet browser extension or mobile app

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd topup-shop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Environment Setup

Create a `.env` file in the root directory:

```env
# Supabase Configuration (optional - for user data)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key

# Base Network Configuration (built-in)
# No additional environment variables required for Base Wallet
```

## 📱 Usage

### For Customers

1. **Browse Products**
   - Visit the homepage to see all available products
   - Use filters to find specific categories or price ranges
   - Click on any product to view detailed information

2. **Connect Wallet**
   - Click "Connect Wallet" to authenticate with Base Wallet
   - Approve the connection in your Coinbase Wallet
   - Ensure you're on Base Mainnet or Base Sepolia

3. **Make Purchases**
   - Select products and choose payment amount
   - Confirm transaction in your wallet
   - Track payment status in real-time

4. **Manage Orders**
   - View order history in the dashboard
   - Track transaction details and confirmations
   - Manage wallet connections and settings

### For Developers

1. **Add New Products**
   ```typescript
   // src/data/products.ts
   export const products: Product[] = [
     {
       id: 'unique-id',
       name: 'Product Name',
       description: 'Product description',
       price: 99.99,
       image_url: 'https://example.com/image.jpg',
       category: 'electronics',
       features: ['Feature 1', 'Feature 2'],
       popular: true,
       discount: 10 // Optional 10% discount
     }
   ];
   ```

2. **Customize Styling**
   ```bash
   # Edit Tailwind configuration
   vim tailwind.config.js
   
   # Modify component styles
   vim src/components/ui/
   ```

3. **Add New Categories**
   ```typescript
   // src/data/products.ts
   export const productCategories = [
     { id: 'new-category', name: 'New Category', icon: '🆕' }
   ];
   ```

## 🏪 Product Categories

### 📱 Electronics
- Wireless Bluetooth Headphones
- Smart Fitness Watches
- Portable Speakers
- Wireless Chargers

### 👕 Fashion
- Premium Cotton T-Shirts
- Designer Denim Jeans
- Leather Accessories
- Seasonal Collections

### 🏠 Home & Garden
- Smart LED Lighting
- Ceramic Planters
- Memory Foam Pillows
- Home Decor

### ⚽ Sports & Fitness
- Yoga Equipment
- Adjustable Dumbbells
- Resistance Bands
- Fitness Accessories

### 📚 Books & Media
- Bestselling Novels
- Vintage Vinyl Records
- Educational Materials
- Collectibles

## 🔧 Development

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── BaseWalletConnect.tsx
│   ├── ProductCard.tsx
│   └── ...
├── pages/              # Route components
│   ├── Products.tsx
│   ├── ProductDetail.tsx
│   ├── Dashboard.tsx
│   └── Auth.tsx
├── hooks/              # Custom React hooks
│   └── use-wallet-auth.ts
├── lib/                # Utility libraries
│   └── web3.ts
├── data/               # Static data
│   └── products.ts
└── integrations/       # External service integrations
    └── supabase/
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks

# Deployment
npm run build:dev    # Build for development environment
```

### Adding New Features

1. **New Payment Methods**
   ```typescript
   // Extend the payment system in src/lib/web3.ts
   // Add new connector configurations
   ```

2. **Additional Networks**
   ```typescript
   // Add new chains to src/lib/web3.ts
   import { arbitrum, polygon } from 'wagmi/chains';
   ```

3. **Enhanced UI Components**
   ```bash
   # Add new shadcn/ui components
   npx shadcn-ui@latest add [component-name]
   ```

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables
5. Enable automatic deployments

### Manual Deployment
```bash
# Build the project
npm run build

# Deploy the dist/ folder to your hosting provider
# The built files will be in the dist/ directory
```

## 🔒 Security

### Smart Contract Security
- All transactions are processed through established Base network protocols
- No custom smart contracts - using standard ETH transfers
- Transaction validation through Wagmi and Viem libraries

### Frontend Security
- Input validation and sanitization
- XSS protection through React's built-in escaping
- CSRF protection through SameSite cookies
- Secure wallet connection handling

### Best Practices
- Never store private keys in the application
- All sensitive operations require wallet confirmation
- Network validation before transaction processing
- Error handling for failed transactions

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests if applicable**
5. **Commit your changes**
   ```bash
   git commit -m 'feat: Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Add JSDoc comments for complex functions
- Ensure responsive design compatibility
- Test wallet integration thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [Base Network Docs](https://docs.base.org/)
- [Wagmi Documentation](https://wagmi.sh/)
- [Coinbase Wallet SDK](https://docs.cloud.coinbase.com/wallet-sdk/docs)

### Community
- [GitHub Issues](../../issues) - Bug reports and feature requests
- [GitHub Discussions](../../discussions) - Community discussions

### Troubleshooting

**Wallet Connection Issues**
- Ensure Coinbase Wallet is installed and updated
- Check that you're on a supported network (Base/Base Sepolia)
- Clear browser cache and try reconnecting

**Transaction Failures**
- Verify sufficient ETH balance for gas fees
- Check network congestion and try again
- Ensure wallet is connected to the correct network

**Build Issues**
- Delete `node_modules` and run `npm install`
- Check Node.js version compatibility (18+)
- Verify all environment variables are set correctly

## 🚀 Roadmap

### Phase 1 (Current)
- ✅ Base Wallet integration
- ✅ Product catalog and filtering
- ✅ Responsive design
- ✅ Basic payment processing

### Phase 2 (Upcoming)
- 🔄 Order tracking and management
- 🔄 Inventory management system
- 🔄 Multi-currency support
- 🔄 Advanced analytics dashboard

### Phase 3 (Future)
- 📋 NFT integration for loyalty programs
- 📋 Cross-chain payment support
- 📋 Decentralized reviews and ratings
- 📋 Mobile app development

---

**Built with ❤️ using React, TypeScript, and Base Network**

*For more information about Web3 integration, see [BASE_WALLET_INTEGRATION.md](BASE_WALLET_INTEGRATION.md)*