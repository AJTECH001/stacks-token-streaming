"use client";

import { useStacks } from "@/hooks/use-stacks";
import { useState } from "react";

export function StreamForm() {
  const { userData, connectWallet } = useStacks();
  const [recipient, setRecipient] = useState("");
  const [initialBalance, setInitialBalance] = useState("");
  const [paymentPerBlock, setPaymentPerBlock] = useState("");
  const [startBlock, setStartBlock] = useState("");
  const [stopBlock, setStopBlock] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userData) {
      connectWallet();
      return;
    }

    // TODO: Implement stream creation logic
    alert("Stream creation functionality will be implemented with the stream contract integration");
  };

  return (
    <div className="flex flex-col max-w-2xl w-full gap-6 p-6 border border-gray-500 rounded-md">
      <h1 className="text-2xl font-bold">Create Token Stream</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="recipient" className="font-bold">Recipient Address</label>
          <input
            type="text"
            id="recipient"
            className="border-2 border-gray-500 rounded-lg px-4 py-2 text-black"
            placeholder="SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="initialBalance" className="font-bold">Initial Balance (STX)</label>
            <input
              type="number"
              id="initialBalance"
              className="border-2 border-gray-500 rounded-lg px-4 py-2 text-black"
              placeholder="100"
              min="1"
              value={initialBalance}
              onChange={(e) => setInitialBalance(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="paymentPerBlock" className="font-bold">STX per Block</label>
            <input
              type="number"
              id="paymentPerBlock"
              className="border-2 border-gray-500 rounded-lg px-4 py-2 text-black"
              placeholder="1"
              min="0.1"
              step="0.1"
              value={paymentPerBlock}
              onChange={(e) => setPaymentPerBlock(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="startBlock" className="font-bold">Start Block</label>
            <input
              type="number"
              id="startBlock"
              className="border-2 border-gray-500 rounded-lg px-4 py-2 text-black"
              placeholder="1000"
              min="1"
              value={startBlock}
              onChange={(e) => setStartBlock(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="stopBlock" className="font-bold">Stop Block</label>
            <input
              type="number"
              id="stopBlock"
              className="border-2 border-gray-500 rounded-lg px-4 py-2 text-black"
              placeholder="2000"
              min="1"
              value={stopBlock}
              onChange={(e) => setStopBlock(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
        >
          {userData ? "Create Stream" : "Connect Wallet & Create Stream"}
        </button>
      </form>
    </div>
  );
}
