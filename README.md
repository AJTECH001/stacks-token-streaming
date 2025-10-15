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

### Mock Token Contract (`mock-token.clar`)
SIP-010 compliant token for testing:
- Standard ERC-20-like functionality
- `mint`: Create tokens for testing purposes
- Fully compatible with the DEX

## Frontend

Modern Next.js application with three main sections:

### Token Streaming Interface
- Create new payment streams
- Manage existing streams
- Monitor stream balances and status
- Withdraw available tokens

### DEX Interface
- **Swap Page**: Trade tokens between different pairs
- **Pools Page**: View all trading pools, create new ones, and manage liquidity
- Real-time price calculations using the AMM formula
- Liquidity position management

### Key Features
- Wallet integration with Stacks Connect
- Real-time transaction status
- Responsive design with Tailwind CSS
- TypeScript for type safety

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT