# Stacks DeFi Suite

A comprehensive DeFi platform built on Stacks blockchain featuring token streaming and decentralized exchange (DEX) functionality.

## Features

### Token Streaming
- **Continuous Payments**: Automatically distribute STX tokens over specified time periods
- **Flexible Scheduling**: Define start and stop blocks for payment streams
- **Pausable Streams**: Pause and resume streams as needed
- **Refuelable Balances**: Add more STX to existing streams
- **Permissionless**: No central authority controls the streaming protocol

### Decentralized Exchange (DEX)
- **Automated Market Maker (AMM)**: Constant Product Market Maker using x*y=k formula
- **Permissionless Pool Creation**: Anyone can create trading pools for SIP-010 tokens
- **Liquidity Provision**: Add and remove liquidity to earn trading fees
- **Token Swapping**: Swap between tokens with automated price discovery
- **Fee Distribution**: Trading fees are distributed to liquidity providers
- **🆕 STX Support**: Native STX token trading alongside SIP-010 tokens
- **🆕 Multi-Hop Swaps**: Foundation for complex routing (A→B→C swaps)
- **🆕 Enhanced UI**: Modern, responsive interface with advanced features

## Smart Contracts

### Stream Contract (`stream.clar`)
Implements the core streaming functionality:
- `stream-to`: Create a new payment stream
- `withdraw`: Recipients can withdraw available tokens
- `refuel`: Add more tokens to an existing stream
- `pause-stream`: Temporarily pause a stream
- `resume-stream`: Resume a paused stream
- `refund`: Withdraw excess tokens from completed streams

### AMM Contract (`amm.clar`)
Implements the decentralized exchange:
- `create-pool`: Create a new trading pool for two tokens
- `add-liquidity`: Add liquidity to existing pools
- `remove-liquidity`: Remove liquidity and withdraw tokens
- `swap`: Swap tokens using the constant product formula
- `get-pool-data`: Query pool information
- `get-position-liquidity`: Check user's liquidity position
- `🆕 multi-hop-swap`: Multi-hop token swaps (A→B→C) - foundation implemented
- `🆕 transfer-tokens`: Unified token transfer supporting both STX and SIP-010 tokens

### Mock Token Contract (`mock-token.clar`)
SIP-010 compliant token for testing:
- Standard ERC-20-like functionality
- `mint`: Create tokens for testing purposes
- Fully compatible with the DEX

## Frontend

Modern Next.js application with enhanced DeFi features:

### Token Streaming Interface
- Create new payment streams
- Manage existing streams
- Monitor stream balances and status
- Withdraw available tokens

### DEX Interface
- **Swap Page**: Trade tokens between different pairs (including STX)
- **Pools Page**: View all trading pools, create new ones, and manage liquidity
- **🆕 Multi-Hop Swaps**: Advanced routing interface for complex swaps
- Real-time price calculations using the AMM formula
- Liquidity position management
- **🆕 STX Integration**: Native STX token support in all operations

### Key Features
- Wallet integration with Stacks Connect
- Real-time transaction status
- Responsive design with Tailwind CSS
- TypeScript for type safety

## 🚀 Deployment Status

**✅ LIVE ON TESTNET!**

### Contract Addresses
- **Deployer Address**: `ST1PEM6ATK66PP1DC6FWMRVWNKR8MWRWD90GAAJQE`
- **AMM Contract**: `ST1PEM6ATK66PP1DC6FWMRVWNKR8MWRWD90GAAJQE.amm`
- **Stream Contract**: `ST1PEM6ATK66PP1DC6FWMRVWNKR8MWRWD90GAAJQE.stream`
- **Mock Token 1**: `ST1PEM6ATK66PP1DC6FWMRVWNKR8MWRWD90GAAJQE.mock-token`
- **Mock Token 2**: `ST1PEM6ATK66PP1DC6FWMRVWNKR8MWRWD90GAAJQE.mock-token-2`

### Deployment Details
- **Deployment Cost**: 0.263680 STX
- **Duration**: 3 blocks
- **Status**: ✅ Confirmed on Testnet
- **Deployment Date**: December 2024

### Transaction IDs
- **SIP-010 Trait**: `f595e75e2682028b6e5e9793911536f12edd63c3c164939142432ff00ecf2acc`
- **Mock Token 2**: `0d05a050cbb52271513026ece3e6daa18f11feeba636ca7e7e3b7159ed81290e`
- **AMM Contract**: `71e277fc5b2ad8ad1cf074b8106ac10f75dd007c6cf111c296124ea87e067afe`
- **Mock Token 1**: `a26e0c1e07d7ddd0329ecd906187bf518acb1484ced47964217dfdc388b574f0`
- **Stream Contract**: `b233f5a990dbbefe591192fab57c09015d1f8b654df72fb9b449796020350c3e`

## 🎮 Testing the Deployed Contracts

You can test the deployed contracts in several ways:

### 1. Using the Frontend (Recommended)
1. Start the frontend: `cd frontend && npm run dev`
2. Open http://localhost:3002
3. Connect your Hiro Wallet (make sure it's in testnet mode)
4. Create pools, add liquidity, and trade tokens!

### 2. Using Clarinet Console
```bash
clarinet console --testnet
# Then interact with the contracts:
(contract-call? .amm get-pool-data 0x...)
(contract-call? .stream balance-of u0 'ST1PEM6ATK66PP1DC6FWMRVWNKR8MWRWD90GAAJQE)
```

### 3. Using Stacks Explorer
- **AMM Contract**: https://explorer.stacks.co/txid/71e277fc5b2ad8ad1cf074b8106ac10f75dd007c6cf111c296124ea87e067afe?chain=testnet
- **Stream Contract**: https://explorer.stacks.co/txid/b233f5a990dbbefe591192fab57c09015d1f8b654df72fb9b449796020350c3e?chain=testnet
- **Mock Token 1**: https://explorer.stacks.co/txid/a26e0c1e07d7ddd0329ecd906187bf518acb1484ced47964217dfdc388b574f0?chain=testnet
- **Mock Token 2**: https://explorer.stacks.co/txid/0d05a050cbb52271513026ece3e6daa18f11feeba636ca7e7e3b7159ed81290e?chain=testnet
- **SIP-010 Trait**: https://explorer.stacks.co/txid/f595e75e2682028b6e5e9793911536f12edd63c3c164939142432ff00ecf2acc?chain=testnet

### 🆕 Advanced Features Deployed
This deployment includes the latest advanced features:
- **STX Support**: Native STX token trading alongside SIP-010 tokens
- **Multi-Hop Swaps**: Foundation for complex routing (A→B→C swaps)
- **Enhanced AMM**: Unified token transfer supporting both STX and SIP-010 tokens
- **Modern Frontend**: Updated UI showcasing all new capabilities

## Getting Started

### Prerequisites
- Node.js 18+
- Clarinet 2.11.2+
- Stacks wallet (Hiro Wallet recommended)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run smart contract tests:
   ```bash
   npm test
   ```

3. Start the frontend development server:
   ```bash
   cd frontend
npm install
npm run dev
```

### Testing

The project includes comprehensive tests covering:

#### Stream Contract Tests
- Stream creation and management
- Token withdrawal functionality
- Stream pausing and resuming
- Refueling streams
- Signature verification for stream modifications

#### AMM Contract Tests
- Pool creation and management
- Liquidity addition and removal
- Token swapping functionality
- Fee distribution to liquidity providers
- Error handling and edge cases

Run all tests with:
```bash
npm test
```

### Deployment

Deploy to Stacks testnet using Clarinet:

```bash
clarinet deployments apply --testnet
```

After deployment, update the contract addresses in `frontend/lib/amm.ts` with your deployed contract addresses.

## Architecture

### AMM Implementation
The DEX uses the constant product market maker formula (x * y = k) where:
- x = amount of token X in the pool
- y = amount of token Y in the pool  
- k = constant that must remain the same before and after trades

### Fee Structure
- Trading fees are configurable per pool (default 0.5%)
- Fees are automatically distributed to liquidity providers
- Minimum liquidity is locked to prevent complete pool drainage

### Token Support
- Fully compatible with SIP-010 token standard
- Mock tokens included for testing
- Support for any SIP-010 compliant tokens

## Usage Examples

### Creating a Stream
1. Navigate to the homepage
2. Fill in recipient address, initial balance, payment rate, and time period
3. Connect wallet and confirm transaction

### Trading on the DEX
1. Go to the DEX page
2. Select tokens to swap
3. Enter amount and see estimated output
4. Confirm swap transaction

### Providing Liquidity
1. Go to the Pools page
2. Create a new pool or select existing one
3. Add liquidity in the required ratio
4. Earn fees from trading activity

## Security Considerations

- All contracts use standard Stacks security patterns
- Input validation and error handling throughout
- Signature verification for stream modifications
- Minimum liquidity locks to prevent manipulation

