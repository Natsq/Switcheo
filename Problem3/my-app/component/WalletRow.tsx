// components/WalletRow.tsx
import React from 'react';
import { Box } from '@mui/material';

interface WalletRowProps {
  className? :string
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

const WalletRow: React.FC<WalletRowProps> = ({className,  amount, usdValue, formattedAmount }) => {
  return (
   <Box
    sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid #ccc',
    }}
    >
      <Box>
        <strong>Amount:</strong> {formattedAmount}
      </Box>
      <Box>
        <strong>USD Value:</strong> ${usdValue.toFixed(2)}
      </Box>
    </Box>
  );
};

export default WalletRow;
