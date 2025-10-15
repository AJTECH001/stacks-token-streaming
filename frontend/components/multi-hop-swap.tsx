"use client";

import { useStacks } from "@/hooks/use-stacks";
import { multiHopSwap, Pool } from "@/lib/amm";
import { useEffect, useState } from "react";

export interface MultiHopSwapProps {
  pools: Pool[];
}

export function MultiHopSwap({ pools }: MultiHopSwapProps) {
  const { userData, handleMultiHopSwap } = useStacks();
  const [tokenPath, setTokenPath] = useState<string[]>([]);
  const [inputAmount, setInputAmount] = useState<number>(0);
  const [minOutput, setMinOutput] = useState<number>(0);
  const [estimatedOutput, setEstimatedOutput] = useState<number>(0);

  // Get unique tokens from all pools
  const uniqueTokens = pools.reduce((acc, pool) => {
    const token0 = pool["token-0"];
    const token1 = pool["token-1"];

    if (!acc.includes(token0)) {
      acc.push(token0);
    }

    if (!acc.includes(token1)) {
      acc.push(token1);
    }

    return acc;
  }, [] as string[]);

  // Add STX as an option
  if (!uniqueTokens.includes("STX")) {
    uniqueTokens.unshift("STX");
  }

  function estimateMultiHopOutput() {
    if (tokenPath.length < 2 || inputAmount === 0) {
      setEstimatedOutput(0);
      return;
    }

    // Simple estimation - in a real app, you'd calculate this properly
    // For demo purposes, we'll use a rough estimate
    let currentAmount = inputAmount;
    
    // Apply a rough fee reduction for each hop (0.5% per hop)
    for (let i = 0; i < tokenPath.length - 1; i++) {
      currentAmount = currentAmount * 0.995; // 0.5% fee per hop
    }
    
    setEstimatedOutput(Math.floor(currentAmount));
  }

  useEffect(() => {
    estimateMultiHopOutput();
  }, [tokenPath, inputAmount]);

  const addTokenToPath = (token: string) => {
    if (tokenPath.length < 5) { // Limit to 5 tokens max
      setTokenPath([...tokenPath, token]);
    }
  };

  const removeTokenFromPath = (index: number) => {
    setTokenPath(tokenPath.filter((_, i) => i !== index));
  };

  const clearPath = () => {
    setTokenPath([]);
  };

  return (
    <div className="flex flex-col max-w-2xl w-full gap-4 p-6 border border-gray-500 rounded-md">
      <h1 className="text-xl font-bold">🔄 Multi-Hop Swap</h1>
      <div className="bg-blue-900/20 border border-blue-500 p-3 rounded-lg">
        <p className="text-sm text-blue-300">
          <strong>🚧 Under Development:</strong> Multi-hop swaps are coming soon! This interface shows the foundation for complex routing (A→B→C swaps).
        </p>
      </div>

      {/* Token Path */}
      <div className="flex flex-col gap-2">
        <label className="font-bold">Swap Path</label>
        <div className="flex flex-wrap gap-2 items-center">
          {tokenPath.map((token, index) => (
            <div key={index} className="flex items-center gap-2 bg-blue-600 px-3 py-1 rounded-full">
              <span className="text-sm">{token}</span>
              <button
                onClick={() => removeTokenFromPath(index)}
                className="text-red-300 hover:text-red-100"
              >
                ×
              </button>
            </div>
          ))}
          {tokenPath.length < 5 && (
            <span className="text-gray-400">→</span>
          )}
        </div>
        {tokenPath.length === 0 && (
          <p className="text-sm text-gray-400">Select tokens to build your swap path</p>
        )}
      </div>

      {/* Token Selection */}
      <div className="flex flex-col gap-2">
        <label className="font-bold">Available Tokens</label>
        <div className="flex flex-wrap gap-2">
          {uniqueTokens.map((token) => (
            <button
              key={token}
              onClick={() => addTokenToPath(token)}
              disabled={tokenPath.length >= 5}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded text-sm"
            >
              {token}
            </button>
          ))}
        </div>
        <button
          onClick={clearPath}
          className="self-start px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
        >
          Clear Path
        </button>
      </div>

      {/* Input Amount */}
      <div className="flex flex-col gap-1">
        <label className="font-bold">
          Input Amount ({tokenPath[0] || "Token"})
        </label>
        <input
          type="number"
          className="border-2 border-gray-500 rounded-lg px-4 py-2 text-black"
          placeholder="Enter amount"
          value={inputAmount}
          onChange={(e) => setInputAmount(parseInt(e.target.value) || 0)}
        />
      </div>

      {/* Minimum Output */}
      <div className="flex flex-col gap-1">
        <label className="font-bold">
          Minimum Output ({tokenPath[tokenPath.length - 1] || "Token"})
        </label>
        <input
          type="number"
          className="border-2 border-gray-500 rounded-lg px-4 py-2 text-black"
          placeholder="Minimum expected output"
          value={minOutput}
          onChange={(e) => setMinOutput(parseInt(e.target.value) || 0)}
        />
      </div>

      {/* Estimated Output */}
      {estimatedOutput > 0 && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-sm text-gray-300">
            Estimated Output: <span className="font-bold">{estimatedOutput}</span> {tokenPath[tokenPath.length - 1]}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            * This is a rough estimate. Actual output may vary based on current pool liquidity and fees.
          </p>
        </div>
      )}

      {/* Execute Button */}
      <button
        onClick={() => {
          if (!userData) {
            alert("Please connect your wallet first");
            return;
          }
          if (tokenPath.length < 2) {
            alert("Please select at least 2 tokens for the swap path");
            return;
          }
          handleMultiHopSwap(tokenPath, inputAmount, minOutput);
        }}
        disabled={tokenPath.length < 2 || inputAmount <= 0 || minOutput <= 0}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded disabled:bg-gray-700 disabled:cursor-not-allowed"
      >
        Execute Multi-Hop Swap
      </button>

      {/* Info */}
      <div className="bg-blue-900/20 border border-blue-500 p-4 rounded-lg">
        <h3 className="font-bold mb-2">How Multi-Hop Swaps Work</h3>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Execute multiple swaps in a single transaction</li>
          <li>• Reduce slippage by finding better routes</li>
          <li>• Each hop incurs a 0.5% trading fee</li>
          <li>• Minimum output protects against unexpected price changes</li>
        </ul>
      </div>
    </div>
  );
}
