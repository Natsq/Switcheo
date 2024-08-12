// hooks/useWalletBalances.tsx
import { useState, useEffect } from 'react';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; 
}

const useWalletBalances = () => {
  const [balances, setBalances] = useState<WalletBalance[]>([]);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const response = await fetch('YOUR_OWN_API'); //replace with your own actual api endpoint 
        if (!response.ok) {
          throw new Error('Failed to fetch wallet balances');
        }
        const data = await response.json();
        setBalances(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBalances();
  }, []);

  return balances;
};

export default useWalletBalances;
