# Token Streaming Protocol

A decentralized token streaming protocol built on Stacks, enabling continuous STX payments between parties with advanced pause/resume functionality.

##  Overview

The Token Streaming Protocol allows users to create continuous payment streams where tokens are released over time based on block progression. This is ideal for freelance payments, grants, salaries, and any scenario requiring time-based token distribution.

### Key Features

-  **Continuous Payments**: Stream STX tokens over custom time periods
-  **Pause/Resume**: Full control over stream flow with precise time tracking
-  **Secure**: Built on Bitcoin's security through Stacks Layer 2
-  **Precise Accounting**: Block-based calculations with pause-time exclusion
-  **Fully Tested**: Comprehensive test suite with 14 test cases
-  **Clarity Smart Contracts**: Written in Clarity for predictable execution

##  Architecture

### Core Functions

#### Stream Management
- `stream-to`: Create a new payment stream
- `refuel`: Add additional STX to an existing stream
- `withdraw`: Recipients withdraw available tokens
- `refund`: Senders reclaim excess tokens after stream completion

#### Pause/Resume System
- `pause-stream`: Temporarily halt token streaming
- `resume-stream`: Restart a paused stream
- `is-stream-paused`: Check if a stream is currently paused
- `get-total-paused-blocks`: Get total blocks stream was paused

#### Read-Only Functions
- `balance-of`: Check withdrawable balance for any party
- `get-stream`: Retrieve complete stream details
- `calculate-active-block-delta`: Calculate active streaming blocks

### Stream Structure

```clarity
{
  sender: principal,
  recipient: principal,
  balance: uint,
  withdrawn-balance: uint,
  payment-per-block: uint,
  timeframe: (tuple (start-block uint) (stop-block uint)),
  is-paused: bool,
  paused-at-block: (optional uint),
  total-paused-blocks: uint
}
```

## 🛠️ Installation & Setup

### Prerequisites

- [Clarinet](https://docs.hiro.so/clarinet/) v3.7.0+
- [Node.js](https://nodejs.org/) v18+
- [Git](https://git-scm.com/)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/AJTECH001/stacks-token-streaming
   cd stacks-token-streaming
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run tests**
   ```bash
   npm test
   ```

4. **Check contract syntax**
   ```bash
   clarinet check
   ```

##  Frontend Demo

A complete web interface is available in the `frontend/` directory, providing:

- **Wallet Connection**: Connect with Leather, Xverse, and other Stacks wallets
- **Stream Creation**: User-friendly form to create new payment streams
- **Stream Management**: Load, pause, resume, and manage existing streams
- **Balance Checking**: Real-time balance verification for any address
- **Transaction Integration**: Direct contract interaction through Stacks.js

### Running the Frontend

1. **Serve the files**
   ```bash
   cd frontend
   python -m http.server 8000
   # or use any static file server
   ```

2. **Open in browser**
   ```
   http://localhost:8000
   ```

3. **Connect your wallet** and start streaming tokens!

> **Note**: Update the `contractAddress` in `app.js` to match your deployed contract.

##  Usage Examples

### Creating a Stream

```clarity
;; Create a stream paying 1 STX per block for 100 blocks
(contract-call? .stream stream-to
  'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7  ;; recipient
  u100                                           ;; initial balance (100 STX)
  { start-block: u1000, stop-block: u1100 }     ;; timeframe
  u1                                             ;; 1 STX per block
)
```

### Pausing a Stream

```clarity
;; Only the sender can pause
(contract-call? .stream pause-stream u0)  ;; stream-id 0
```

### Withdrawing Tokens

```clarity
;; Recipients can withdraw available balance
(contract-call? .stream withdraw u0)  ;; stream-id 0
```

## 🧪 Testing

The protocol includes comprehensive testing covering:

- ✅ Stream creation and initialization
- ✅ Refueling and balance management
- ✅ Withdrawal mechanics and authorization
- ✅ Pause/resume functionality
- ✅ Balance calculations with pause accounting
- ✅ Error handling and edge cases
- ✅ Access control and permissions

```bash
npm test  # Run all tests
```

### Test Coverage

- **14 test cases** covering all functionality
- **Authorization testing** for all privileged functions
- **Error case validation** for robust error handling
- **Balance calculation verification** including pause scenarios

##  Security Features

### Access Control
- Only stream senders can pause/resume streams
- Only recipients can withdraw their allocated tokens
- Only senders can refuel or refund streams

### Error Handling
- `ERR_UNAUTHORIZED` (u0): Insufficient permissions
- `ERR_INVALID_SIGNATURE` (u1): Invalid cryptographic signature
- `ERR_STREAM_STILL_ACTIVE` (u2): Stream hasn't ended yet
- `ERR_INVALID_STREAM_ID` (u3): Stream doesn't exist
- `ERR_STREAM_ALREADY_PAUSED` (u4): Cannot pause already paused stream
- `ERR_STREAM_NOT_PAUSED` (u5): Cannot resume non-paused stream

### Predictable Execution
- Written in Clarity for deterministic smart contract execution
- No compiler bugs - code deployed as written
- Immutable data structures prevent unexpected state changes

##  Use Cases

###  Freelance Payments
- Clients stream payments to freelancers over project duration
- Pause capability for project delays or scope changes
- Automatic release based on time progression

###  Grant Distribution
- Organizations distribute grants over time to ensure milestone completion
- Pause grants if requirements aren't met
- Transparent, on-chain payment tracking

###  Salary Payments
- Employers stream salaries to employees in real-time
- Pause during leave periods
- Eliminate traditional payroll delays

###  Service Subscriptions
- Service providers receive continuous payments
- Pause during service interruptions
- Fair compensation based on actual service time

##  Future Enhancements

### Planned Features
- [ ] **Multi-token Support**: Support for SIP-010 tokens beyond STX
- [ ] **Stream Templates**: Save and reuse common stream configurations
- [ ] **Milestone-based Releases**: Conditional payments based on external triggers
- [ ] **Stream Cancellation**: Early termination with prorated refunds
- [ ] **Notification System**: Alert when streams need attention

### Frontend Integration
- ✅ **Web Interface**: Complete HTML/CSS/JS frontend with Stacks.js
- ✅ **Wallet Integration**: Connect with Leather, Xverse, and other Stacks wallets
- ✅ **Stream Management**: Create, pause, resume, and withdraw from streams
- ✅ **Real-time Balance Checking**: Check withdrawable balances for any address
- [ ] **React Dashboard**: Migrate to React for enhanced user experience
- [ ] **Transaction History**: Complete audit trail of all stream activities

##  Technical Specifications

- **Language**: Clarity
- **Platform**: Stacks (Bitcoin Layer 2)
- **Token Standard**: STX (Native Stacks Token)
- **Block Time**: ~10 minutes (Bitcoin finality)
- **Gas Optimization**: Efficient storage patterns and minimal external calls


##  Acknowledgments

- Built following the [LearnWeb3 Stacks Developer Degree](https://learnweb3.io/degrees/stacks-developer-degree/)
- Inspired by the Stacks ecosystem and Bitcoin's programmability vision
- Thanks to the Clarity language designers for predictable smart contract execution


---

**Built with ❤️ for the Stacks ecosystem and Bitcoin's future as a programmable platform.**

