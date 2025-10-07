// Stacks.js imports from CDN
const { AppConfig, UserSession, showConnect, openContractCall } = window.StacksConnect;
const {
    uintCV,
    stringAsciiCV,
    tupleCV,
    principalCV,
    standardPrincipalCV,
    callReadOnlyFunction,
    cvToValue
} = window.StacksTransactions;
const { StacksTestnet, StacksMainnet } = window.StacksNetwork;

// App Configuration
const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

// Network Configuration (using testnet for development)
const network = new StacksTestnet();
const contractAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'; // Replace with your deployed contract address
const contractName = 'stream';

// Application State
let currentUser = null;
let currentStreamId = null;

// DOM Elements
const connectWalletBtn = document.getElementById('connectWallet');
const walletStatus = document.getElementById('walletStatus');
const userAddress = document.getElementById('userAddress');
const userBalance = document.getElementById('userBalance');
const createStreamForm = document.getElementById('createStreamForm');
const loadStreamBtn = document.getElementById('loadStream');
const streamDetails = document.getElementById('streamDetails');
const statusMessages = document.getElementById('statusMessages');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Token Streaming Protocol Frontend Loaded');

    // Check if user is already signed in
    if (userSession.isSignInPending()) {
        userSession.handlePendingSignIn().then((userData) => {
            updateUI(userData);
        });
    } else if (userSession.isUserSignedIn()) {
        updateUI(userSession.loadUserData());
    }

    // Event Listeners
    connectWalletBtn.addEventListener('click', (e) => {
        console.log('Connect wallet button clicked');
        e.preventDefault();
        connectWallet();
    });
    createStreamForm.addEventListener('submit', handleCreateStream);
    loadStreamBtn.addEventListener('click', handleLoadStream);

    // Stream action buttons
    document.getElementById('pauseStream').addEventListener('click', () => handlePauseStream());
    document.getElementById('resumeStream').addEventListener('click', () => handleResumeStream());
    document.getElementById('withdrawStream').addEventListener('click', () => handleWithdraw());
    document.getElementById('refuelStream').addEventListener('click', () => handleRefuel());
    document.getElementById('checkBalance').addEventListener('click', () => handleCheckBalance());
});

// Wallet Connection
function connectWallet() {
    console.log('Connect wallet clicked');

    if (!window.StacksConnect) {
        showMessage('Stacks Connect library not loaded. Please refresh the page.', 'error');
        return;
    }

    try {
        showConnect({
            appDetails: {
                name: 'Token Streaming Protocol',
                icon: window.location.origin + '/favicon.ico',
            },
            redirectTo: window.location.href,
            onFinish: (authData) => {
                console.log('Authentication finished:', authData);
                showMessage('Wallet connected successfully!', 'success');
                window.location.reload();
            },
            onCancel: () => {
                console.log('Authentication cancelled');
                showMessage('Wallet connection cancelled', 'info');
            },
            userSession: userSession,
        });
    } catch (error) {
        console.error('Error connecting wallet:', error);
        showMessage('Error connecting wallet: ' + error.message, 'error');
    }
}

// Update UI after wallet connection
function updateUI(userData) {
    currentUser = userData;
    const address = userData.profile.stxAddress.testnet;

    connectWalletBtn.style.display = 'none';
    walletStatus.style.display = 'block';
    userAddress.textContent = `${address.slice(0, 8)}...${address.slice(-8)}`;

    // Get user balance
    getUserBalance(address);

    showMessage('Wallet connected successfully!', 'success');
}

// Get user STX balance
async function getUserBalance(address) {
    try {
        const balanceUrl = `https://stacks-node-api.testnet.stacks.co/extended/v1/address/${address}/balances`;
        const response = await fetch(balanceUrl);
        const data = await response.json();
        const balance = (data.stx.balance / 1000000).toFixed(2); // Convert microSTX to STX
        userBalance.textContent = balance;
    } catch (error) {
        console.error('Error fetching balance:', error);
        userBalance.textContent = 'Error';
    }
}

// Create Stream Handler
async function handleCreateStream(event) {
    event.preventDefault();

    if (!userSession.isUserSignedIn()) {
        showMessage('Please connect your wallet first', 'error');
        return;
    }

    const formData = new FormData(event.target);
    const recipient = document.getElementById('recipient').value;
    const initialBalance = parseInt(document.getElementById('initialBalance').value);
    const paymentPerBlock = parseFloat(document.getElementById('paymentPerBlock').value);
    const startBlock = parseInt(document.getElementById('startBlock').value);
    const stopBlock = parseInt(document.getElementById('stopBlock').value);

    // Validation
    if (stopBlock <= startBlock) {
        showMessage('Stop block must be greater than start block', 'error');
        return;
    }

    try {
        // Convert STX to microSTX (multiply by 1,000,000)
        const initialBalanceMicroSTX = initialBalance * 1000000;
        const paymentPerBlockMicroSTX = Math.floor(paymentPerBlock * 1000000);

        const functionArgs = [
            principalCV(recipient),
            uintCV(initialBalanceMicroSTX),
            tupleCV({
                'start-block': uintCV(startBlock),
                'stop-block': uintCV(stopBlock)
            }),
            uintCV(paymentPerBlockMicroSTX)
        ];

        openContractCall({
            network,
            contractAddress,
            contractName,
            functionName: 'stream-to',
            functionArgs,
            onFinish: (data) => {
                console.log('Transaction submitted:', data);
                showMessage('Stream creation transaction submitted!', 'success');
                // Reset form
                createStreamForm.reset();
            },
            onCancel: () => {
                showMessage('Transaction cancelled', 'info');
            },
        });

    } catch (error) {
        console.error('Error creating stream:', error);
        showMessage('Error creating stream: ' + error.message, 'error');
    }
}

// Load Stream Handler
async function handleLoadStream() {
    const streamId = document.getElementById('streamId').value;

    if (!streamId && streamId !== '0') {
        showMessage('Please enter a stream ID', 'error');
        return;
    }

    try {
        // Call read-only function to get stream details
        const streamData = await callReadOnlyFunction({
            network,
            contractAddress,
            contractName,
            functionName: 'get-stream',
            functionArgs: [uintCV(parseInt(streamId))],
            senderAddress: currentUser?.profile.stxAddress.testnet || contractAddress,
        });

        const streamValue = cvToValue(streamData);

        if (!streamValue || streamValue.type === 'none') {
            showMessage('Stream not found', 'error');
            return;
        }

        // Update UI with stream details
        currentStreamId = parseInt(streamId);
        displayStreamDetails(streamValue.value, streamId);

        // Check if stream is paused
        await checkStreamPauseStatus(streamId);

    } catch (error) {
        console.error('Error loading stream:', error);
        showMessage('Error loading stream: ' + error.message, 'error');
    }
}

// Display Stream Details
function displayStreamDetails(stream, streamId) {
    document.getElementById('detailStreamId').textContent = streamId;
    document.getElementById('detailSender').textContent = `${stream.sender.slice(0, 8)}...${stream.sender.slice(-8)}`;
    document.getElementById('detailRecipient').textContent = `${stream.recipient.slice(0, 8)}...${stream.recipient.slice(-8)}`;
    document.getElementById('detailBalance').textContent = (stream.balance / 1000000).toFixed(2);
    document.getElementById('detailWithdrawn').textContent = (stream['withdrawn-balance'] / 1000000).toFixed(2);
    document.getElementById('detailPaymentPerBlock').textContent = (stream['payment-per-block'] / 1000000).toFixed(6);
    document.getElementById('detailPausedBlocks').textContent = stream['total-paused-blocks'];

    // Set status badge
    const statusBadge = document.getElementById('detailStatus');
    if (stream['is-paused']) {
        statusBadge.textContent = 'PAUSED';
        statusBadge.className = 'status-badge paused';
    } else {
        statusBadge.textContent = 'ACTIVE';
        statusBadge.className = 'status-badge active';
    }

    // Show/hide action buttons based on user role
    const isUserSender = currentUser && stream.sender === currentUser.profile.stxAddress.testnet;
    const isUserRecipient = currentUser && stream.recipient === currentUser.profile.stxAddress.testnet;

    document.getElementById('pauseStream').style.display = isUserSender ? 'block' : 'none';
    document.getElementById('resumeStream').style.display = isUserSender ? 'block' : 'none';
    document.getElementById('withdrawStream').style.display = isUserRecipient ? 'block' : 'none';
    document.getElementById('refuelStream').style.display = isUserSender ? 'block' : 'none';

    streamDetails.style.display = 'block';
    showMessage('Stream loaded successfully!', 'success');
}

// Check Stream Pause Status
async function checkStreamPauseStatus(streamId) {
    try {
        const pausedData = await callReadOnlyFunction({
            network,
            contractAddress,
            contractName,
            functionName: 'is-stream-paused',
            functionArgs: [uintCV(parseInt(streamId))],
            senderAddress: currentUser?.profile.stxAddress.testnet || contractAddress,
        });

        const isPaused = cvToValue(pausedData);

        // Update button states
        document.getElementById('pauseStream').disabled = isPaused;
        document.getElementById('resumeStream').disabled = !isPaused;

    } catch (error) {
        console.error('Error checking pause status:', error);
    }
}

// Pause Stream Handler
async function handlePauseStream() {
    if (!currentStreamId && currentStreamId !== 0) {
        showMessage('Please load a stream first', 'error');
        return;
    }

    try {
        openContractCall({
            network,
            contractAddress,
            contractName,
            functionName: 'pause-stream',
            functionArgs: [uintCV(currentStreamId)],
            onFinish: (data) => {
                console.log('Pause transaction submitted:', data);
                showMessage('Stream pause transaction submitted!', 'success');
                // Reload stream details after a delay
                setTimeout(() => handleLoadStream(), 3000);
            },
            onCancel: () => {
                showMessage('Transaction cancelled', 'info');
            },
        });
    } catch (error) {
        console.error('Error pausing stream:', error);
        showMessage('Error pausing stream: ' + error.message, 'error');
    }
}

// Resume Stream Handler
async function handleResumeStream() {
    if (!currentStreamId && currentStreamId !== 0) {
        showMessage('Please load a stream first', 'error');
        return;
    }

    try {
        openContractCall({
            network,
            contractAddress,
            contractName,
            functionName: 'resume-stream',
            functionArgs: [uintCV(currentStreamId)],
            onFinish: (data) => {
                console.log('Resume transaction submitted:', data);
                showMessage('Stream resume transaction submitted!', 'success');
                // Reload stream details after a delay
                setTimeout(() => handleLoadStream(), 3000);
            },
            onCancel: () => {
                showMessage('Transaction cancelled', 'info');
            },
        });
    } catch (error) {
        console.error('Error resuming stream:', error);
        showMessage('Error resuming stream: ' + error.message, 'error');
    }
}

// Withdraw Handler
async function handleWithdraw() {
    if (!currentStreamId && currentStreamId !== 0) {
        showMessage('Please load a stream first', 'error');
        return;
    }

    try {
        openContractCall({
            network,
            contractAddress,
            contractName,
            functionName: 'withdraw',
            functionArgs: [uintCV(currentStreamId)],
            onFinish: (data) => {
                console.log('Withdraw transaction submitted:', data);
                showMessage('Withdraw transaction submitted!', 'success');
                // Reload stream details after a delay
                setTimeout(() => handleLoadStream(), 3000);
            },
            onCancel: () => {
                showMessage('Transaction cancelled', 'info');
            },
        });
    } catch (error) {
        console.error('Error withdrawing:', error);
        showMessage('Error withdrawing: ' + error.message, 'error');
    }
}

// Refuel Handler
async function handleRefuel() {
    if (!currentStreamId && currentStreamId !== 0) {
        showMessage('Please load a stream first', 'error');
        return;
    }

    const amount = prompt('Enter amount to refuel (STX):');
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        showMessage('Invalid amount', 'error');
        return;
    }

    try {
        const amountMicroSTX = Math.floor(parseFloat(amount) * 1000000);

        openContractCall({
            network,
            contractAddress,
            contractName,
            functionName: 'refuel',
            functionArgs: [uintCV(currentStreamId), uintCV(amountMicroSTX)],
            onFinish: (data) => {
                console.log('Refuel transaction submitted:', data);
                showMessage('Refuel transaction submitted!', 'success');
                // Reload stream details after a delay
                setTimeout(() => handleLoadStream(), 3000);
            },
            onCancel: () => {
                showMessage('Transaction cancelled', 'info');
            },
        });
    } catch (error) {
        console.error('Error refueling:', error);
        showMessage('Error refueling: ' + error.message, 'error');
    }
}

// Check Balance Handler
async function handleCheckBalance() {
    const streamId = document.getElementById('balanceStreamId').value;
    const address = document.getElementById('balanceAddress').value;

    if (!streamId && streamId !== '0') {
        showMessage('Please enter a stream ID', 'error');
        return;
    }

    if (!address) {
        showMessage('Please enter an address', 'error');
        return;
    }

    try {
        const balanceData = await callReadOnlyFunction({
            network,
            contractAddress,
            contractName,
            functionName: 'balance-of',
            functionArgs: [uintCV(parseInt(streamId)), principalCV(address)],
            senderAddress: currentUser?.profile.stxAddress.testnet || contractAddress,
        });

        const balance = cvToValue(balanceData);
        const balanceSTX = (balance / 1000000).toFixed(6);

        document.getElementById('availableBalance').textContent = balanceSTX;
        document.getElementById('balanceResult').style.display = 'block';

        showMessage('Balance retrieved successfully!', 'success');

    } catch (error) {
        console.error('Error checking balance:', error);
        showMessage('Error checking balance: ' + error.message, 'error');
    }
}

// Utility Functions
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `status-message ${type}`;
    messageDiv.textContent = message;

    statusMessages.appendChild(messageDiv);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 5000);
}

// Helper function to format address
function formatAddress(address) {
    if (!address) return 'N/A';
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
}

// Export for debugging
window.app = {
    userSession,
    currentUser,
    network,
    contractAddress,
    contractName
};