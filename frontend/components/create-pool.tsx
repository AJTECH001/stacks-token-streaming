"use client";

import { useStacks } from "@/hooks/use-stacks";
import { useState } from "react";

export function CreatePool() {
  const { handleCreatePool } = useStacks();
  const [token0, setToken0] = useState("STX");
  const [token1, setToken1] = useState("");
  const [fee, setFee] = useState(500);

  const commonTokens = [
    { value: "STX", label: "🟡 STX (Native)" },
    { value: "ST1PEM6ATK66PP1DC6FWMRVWNKR8MWRWD90GAAJQE.mock-token", label: "🪙 Mock Token 1" },
    { value: "ST1PEM6ATK66PP1DC6FWMRVWNKR8MWRWD90GAAJQE.mock-token-2", label: "🪙 Mock Token 2" }
  ];

  return (
    <div className="flex flex-col max-w-md w-full gap-4 p-6 border border-gray-500 rounded-md">
      <h1 className="text-xl font-bold">Create New Pool</h1>
      <div className="bg-green-900/20 border border-green-500 p-3 rounded-lg">
        <p className="text-sm text-green-300">
          🆕 <strong>STX Support:</strong> Create pools with native STX tokens alongside SIP-010 tokens!
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-bold">Token 0</span>
        <select
          className="border-2 border-gray-500 rounded-lg px-4 py-2 text-black"
          value={token0}
          onChange={(e) => setToken0(e.target.value)}
        >
          {commonTokens.map((token) => (
            <option key={token.value} value={token.value}>
              {token.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="border-2 border-gray-500 rounded-lg px-4 py-2 text-black mt-2"
          placeholder="Or enter custom token address"
          value={token0}
          onChange={(e) => setToken0(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-bold">Token 1</span>
        <select
          className="border-2 border-gray-500 rounded-lg px-4 py-2 text-black"
          value={token1}
          onChange={(e) => setToken1(e.target.value)}
        >
          <option value="">Select Token 1</option>
          {commonTokens.map((token) => (
            <option key={token.value} value={token.value}>
              {token.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="border-2 border-gray-500 rounded-lg px-4 py-2 text-black mt-2"
          placeholder="Or enter custom token address"
          value={token1}
          onChange={(e) => setToken1(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-bold">Fee</span>
        <input
          type="number"
          className="border-2 border-gray-500 rounded-lg px-4 py-2 text-black"
          placeholder="Fee"
          max={10_000}
          min={0}
          value={fee}
          onChange={(e) => setFee(parseInt(e.target.value))}
        />
      </div>

      <button
        onClick={() => handleCreatePool(token0, token1, fee)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Pool
      </button>
    </div>
  );
}
