import { StreamForm } from "@/components/stream-form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Stacks DeFi Suite
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Token Streaming and Decentralized Exchange on Bitcoin Layer 2
        </p>
      </div>
      
      <StreamForm />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full mt-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Token Streaming</h2>
          <p className="text-gray-300 mb-4">
            Create continuous payment streams that automatically distribute STX tokens over time.
          </p>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>• Automated payments per block</li>
            <li>• Pausable and resumable streams</li>
            <li>• Refuelable stream balances</li>
            <li>• Built on Bitcoin Layer 2</li>
          </ul>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Decentralized Exchange</h2>
          <p className="text-gray-300 mb-4">
            Trade tokens permissionlessly with automated market making and liquidity provision.
          </p>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>• Automated Market Maker (AMM)</li>
            <li>• Liquidity provider rewards</li>
            <li>• Permissionless pool creation</li>
            <li>• SIP-010 token support</li>
          </ul>
        </div>
      </div>
    </main>
  );
}