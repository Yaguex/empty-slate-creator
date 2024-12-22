export interface Investment {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
}

export interface PortfolioMetrics {
  totalValue: number;
  totalGain: number;
  gainPercentage: number;
}