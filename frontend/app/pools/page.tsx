import { AddLiquidity } from "@/components/add-liquidity";
import { CreatePool } from "@/components/create-pool";
import { PoolsList } from "@/components/pools";
import { RemoveLiquidity } from "@/components/remove-liquidity";
import { getAllPools } from "@/lib/amm";

export default async function Pools() {
  const allPools = await getAllPools();

  return (
    <main className="flex min-h-screen flex-col gap-8 p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Trading Pools</h1>
        <p className="text-xl text-gray-300 mb-8">
          Create pools, add liquidity, and manage your positions
        </p>
      </div>
      
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6">Existing Pools</h2>
        {allPools.length > 0 ? (
          <PoolsList pools={allPools} />
        ) : (
          <div className="bg-gray-800 p-8 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-4">No Pools Created Yet</h3>
            <p className="text-gray-300">
              Create your first trading pool to get started with the DEX.
            </p>
          </div>
        )}
      </div>
      
      <hr className="border-gray-600" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CreatePool />
        {allPools.length > 0 && (
          <>
            <AddLiquidity pools={allPools} />
            <RemoveLiquidity pools={allPools} />
          </>
        )}
      </div>
      
      {allPools.length === 0 && (
        <div className="bg-blue-900/20 border border-blue-500 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Getting Started</h3>
          <p className="text-gray-300">
            To create your first pool, you'll need two SIP-010 compatible tokens. 
            You can use the mock tokens provided in this project for testing purposes.
          </p>
        </div>
      )}
    </main>
  );
}
