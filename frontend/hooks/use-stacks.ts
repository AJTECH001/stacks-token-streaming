import {
  addLiquidity,
  createPool,
  multiHopSwap,
  Pool,
  removeLiquidity,
  swap,
} from "@/lib/amm";
import {
  openContractCall,
  type UserData,
} from "@stacks/connect";
import { PostConditionMode } from "@stacks/transactions";
import { useEffect, useState } from "react";

const appDetails = {
  name: "Stacks Token Streaming & DEX",
  icon: "https://cryptologos.cc/logos/stacks-stx-logo.png",
};

export function useStacks() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  function connectWallet() {
    setIsConnecting(true);
    
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      alert("Please run this in a browser environment");
      setIsConnecting(false);
      return;
    }

    // Check for wallet extensions
    const hasLeather = !!(window as any).LeatherProvider || !!(window as any).leather;
    const hasXverse = !!(window as any).XverseProviders;
    
    if (!hasLeather && !hasXverse) {
      alert("Please install a Stacks wallet extension like Hiro Wallet (formerly Stacks Wallet) or Xverse to connect your wallet.");
      setIsConnecting(false);
      return;
    }

   
    setTimeout(() => {
      const mockUserData: UserData = {
        profile: {
          stxAddress: {
            testnet: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
            mainnet: "SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
          }
        }
      } as UserData;
      
      setUserData(mockUserData);
      setIsConnecting(false);
      alert("Wallet connected! (Demo mode - using mock address)");
    }, 1000);
  }

  function disconnectWallet() {
    setUserData(null);
    setIsConnecting(false);
  }

  async function handleCreatePool(token0: string, token1: string, fee: number) {
    try {
      if (!userData) {
        alert("Please connect your wallet first");
        return;
      }
      const options = await createPool(token0, token1, fee);
      await openContractCall({
        ...options,
        appDetails,
        onFinish: (data) => {
          window.alert("Sent create pool transaction");
          console.log(data);
        },
        postConditionMode: PostConditionMode.Allow,
      });
    } catch (_err) {
      const err = _err as Error;
      console.log(err);
      window.alert(err.message);
      return;
    }
  }

  async function handleSwap(pool: Pool, amount: number, zeroForOne: boolean) {
    try {
      if (!userData) {
        alert("Please connect your wallet first");
        return;
      }
      const options = await swap(pool, amount, zeroForOne);
      await openContractCall({
        ...options,
        appDetails,
        onFinish: (data) => {
          window.alert("Sent swap transaction");
          console.log(data);
        },
        postConditionMode: PostConditionMode.Allow,
      });
    } catch (_err) {
      const err = _err as Error;
      console.log(err);
      window.alert(err.message);
      return;
    }
  }

  async function handleAddLiquidity(
    pool: Pool,
    amount0: number,
    amount1: number
  ) {
    try {
      if (!userData) {
        alert("Please connect your wallet first");
        return;
      }
      const options = await addLiquidity(pool, amount0, amount1);
      await openContractCall({
        ...options,
        appDetails,
        onFinish: (data) => {
          window.alert("Sent add liquidity transaction");
          console.log({ data });
        },
        postConditionMode: PostConditionMode.Allow,
      });
    } catch (_err) {
      const err = _err as Error;
      console.log(err);
      window.alert(err.message);
      return;
    }
  }

  async function handleRemoveLiquidity(pool: Pool, liquidity: number) {
    try {
      if (!userData) {
        alert("Please connect your wallet first");
        return;
      }
      const options = await removeLiquidity(pool, liquidity);
      await openContractCall({
        ...options,
        appDetails,
        onFinish: (data) => {
          window.alert("Sent remove liquidity transaction");
          console.log(data);
        },
        postConditionMode: PostConditionMode.Allow,
      });
    } catch (_err) {
      const err = _err as Error;
      console.log(err);
      window.alert(err.message);
      return;
    }
  }

  async function handleMultiHopSwap(tokens: string[], inputAmount: number, minOutput: number) {
    try {
      if (!userData) {
        alert("Please connect your wallet first");
        return;
      }
      const options = await multiHopSwap(tokens, inputAmount, minOutput);
      await openContractCall({
        ...options,
        appDetails,
        onFinish: (data) => {
          window.alert("Sent multi-hop swap transaction");
          console.log(data);
        },
        postConditionMode: PostConditionMode.Allow,
      });
    } catch (_err) {
      const err = _err as Error;
      console.log(err);
      window.alert(err.message);
      return;
    }
  }

  useEffect(() => {
   
    console.log("Wallet connection status would be checked here");
  }, []);

  return {
    userData,
    isConnecting,
    handleCreatePool,
    handleSwap,
    handleAddLiquidity,
    handleRemoveLiquidity,
    handleMultiHopSwap,
    connectWallet,
    disconnectWallet,
  };
}
