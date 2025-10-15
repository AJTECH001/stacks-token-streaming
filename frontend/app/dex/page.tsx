import { MultiHopSwap } from "@/components/multi-hop-swap";
import { Swap } from "@/components/swap";
import { getAllPools } from "@/lib/amm";

export const dynamic = "force-dynamic";

export default async function DEX() {
  const allPools = await getAllPools();

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          🚀 Advanced DEX
        </h1>
        <p className="text-xl text-gray-300 mb-4">
          Trade tokens permissionlessly with automated market making
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="bg-green-600 px-3 py-1 rounded-full">🟡 STX Support</span>
          <span className="bg-blue-600 px-3 py-1 rounded-full">🔄 Multi-Hop Ready</span>
          <span className="bg-purple-600 px-3 py-1 rounded-full">⚡ AMM Trading</span>
        </div>
      </div>
      
      {allPools.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
          <Swap pools={allPools} />
          <MultiHopSwap pools={allPools} />
        </div>
      ) : (
        <div className="bg-gray-800 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">No Pools Available</h2>
          <p className="text-gray-300 mb-6">
            There are currently no trading pools available. Create a pool first to start trading.
          </p>
          <a
            href="/pools"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg inline-block"
          >
            Go to Pools
          </a>
        </div>
      )}
      
      {allPools.length > 0 && (
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Available Pools</h2>
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="grid grid-cols-4 place-items-center w-full bg-gray-700 p-4 font-semibold">
              <span>Pool ID</span>
              <span>Token Pair</span>
              <span>Fee</span>
              <span>Liquidity</span>
            </div>
            {allPools.map((pool) => (
              <div
                key={`pool-${pool["token-0"]}-${pool["token-1"]}`}
                className="grid grid-cols-4 place-items-center w-full p-4 border-t border-gray-600"
              >
                <span className="text-sm">{pool.id.substring(0, 8)}...</span>
                <div className="flex items-center gap-2">
                  <span>{pool["token-0"].split(".")[1]}</span>
                  <span>/</span>
                  <span>{pool["token-1"].split(".")[1]}</span>
                </div>
                <span>{(pool.fee / 10000 * 100).toFixed(2)}%</span>
                <div className="text-sm">
                  {pool["balance-0"]} / {pool["balance-1"]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
