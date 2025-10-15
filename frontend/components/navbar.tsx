"use client";
import { useStacks } from "@/hooks/use-stacks";
import { abbreviateAddress } from "@/lib/stx-utils";
import Link from "next/link";

export function Navbar() {
  const { userData, isConnecting, connectWallet, disconnectWallet } = useStacks();

  return (
    <nav className="flex w-full items-center justify-between gap-4 p-4 h-16 border-b border-gray-500">
      <Link href="/" className="text-2xl font-bold">
        Stacks DeFi Suite
      </Link>

      <div className="flex items-center gap-8">
        <Link href="/" className="text-gray-300 hover:text-gray-50">
          Streaming
        </Link>
        <Link href="/dex" className="text-gray-300 hover:text-gray-50">
          DEX
        </Link>
        <Link href="/pools" className="text-gray-300 hover:text-gray-50">
          Pools
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {userData ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {abbreviateAddress(userData.profile.stxAddress.testnet)}
            </button>
            <button
              type="button"
              onClick={disconnectWallet}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={connectWallet}
            disabled={isConnecting}
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </button>
        )}
      </div>
    </nav>
  );
}
