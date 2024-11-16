// pages/api/tokenPrices.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const HELIUS_API = process.env.NEXT_PUBLIC_SOLANA_API;
const TOKEN_ADDRESSES = [
  'So11111111111111111111111111111111111111112', // Native SOL
  'HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC', // AI16Z
  'Gu3LDkn7Vx3bmCzLafYNKcDxv2mH7YN44NJZFXnyai16z',
  '7wM4MnbsPsG95A3WhZgbrPWvMtydKmJjqKr2ZVJVpump'
];

interface TokenPrice {
  address: string;
  usdPrice: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!HELIUS_API) {
      throw new Error('Helius API key not configured');
    }

    const response = await fetch(`https://api.helius.xyz/v0/token-metadata?api-key=${HELIUS_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mintAccounts: TOKEN_ADDRESSES,
        includeOffChain: true,
        disableCache: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Helius API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform data to expected format
    const prices: TokenPrice[] = data.map((token: any) => ({
      address: token.account,
      usdPrice: token.price || 0
    }));

    res.status(200).json({ prices });
  } catch (error) {
    console.error('Token price API error:', error);
    // Return fallback prices if API fails
    res.status(200).json({ 
      prices: TOKEN_ADDRESSES.map(address => ({
        address,
        usdPrice: 0
      }))
    });
  }
}