/* 1. Added the necessary import statements

- Import BoxProps if using Material UI
- Added the hook for useWalletBalances which was missing
- Added the WalletRow component which was missing

*/

import React, { useState, useEffect, useMemo } from 'react';
import { Box, BoxProps } from '@mui/material'; 
import useWalletBalances from '../hooks/useWalletBalances'; 
import WalletRow from '../component/WalletRow'; 


/* 2. Make the Interface more clean and efficient 

- Added the blockchain property which was missing in WalletBalance
-  Extended FormattedWalletBalance to WalletBalance since we don't want to 
   repeat currency and amount again in the code

*/

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; 
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

/* 3. Implemented the Datasource class */

class Datasource {
  
  // variable for the json string 
  private url: string;

  // set the class property with the json string 
  constructor(url: string) {
    this.url = url;
  }

  //method for the Datasource class to return the prices from the JSON
  async getPrices(): Promise<{ [key: string]: number }> {
    const response = await fetch(this.url);
    if (!response.ok) {
      throw new Error('Failed to fetch prices');
    }
    return response.json();
  }
}

interface Props extends BoxProps {}

/* 4. Modified the code, with modifications in comments to solve the errors and more
      make it more efficient 

      - Missing Key in useState [prices, setPrices]
      - Simplified the useEffect for efficiency (the datasource useEffect one)
      - wrong variable lhsPriority changed to balancedPriority && combined IF statements 
        for efficiency 
      - Missing return 0 under .sort() 
      - const rows used wrong balance to map changed to the correct one which is 
        formattedBalances 
      - WalletRow classname changed to row since we not using any CSS classes 
      - return div changed to Box to follow materialUI themeing 
      - Add

*/

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();

  // added the key inside the useState so to be able to pass the "balance.currency" inside it 
  const [prices, setPrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const datasource = new Datasource('https://interview.switcheo.com/prices.json');
    datasource.getPrices()
    .then(setPrices)  // Directly setting prices without the need for an extra arrow function
    .catch(console.error);  // Simplified error handling;
  }, []);


  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':2
        return 20;
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        //changed it to Balance Priority && combined If statement
        if (balancePriority > -99 && balance.amount > 0) {
          return true;  
        }
       return false
      
      }) .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
        //Added 0 to ensure it returns correctly 
        return 0;
      });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => ({
    ...balance,
    formatted: balance.amount.toFixed(2),
  }));

  //Changed sortedBalances to formattedBalances so to be able to map 
  const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
      //No CSS file directly use row instead
        className="row"
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return (
    //Changed div to Box to follow Material-UI
    <Box {...rest}>
      {rows}
    </Box>
  )
};

//For allow the App.tsx to import this page 
export default WalletPage;
