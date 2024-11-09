import TokenSaleBuilder from '@/components/TokenSaleBuilder';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Token Sale Smart Contract Builder',
  description: 'Create and customize your ERC20 token sale smart contract',
};

export default function Home() {
  return <TokenSaleBuilder />;
}