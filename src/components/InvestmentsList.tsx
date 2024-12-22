import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Investment } from "@/types/portfolio";

interface InvestmentsListProps {
  investments: Investment[];
}

export function InvestmentsList({ investments }: InvestmentsListProps) {
  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle>Investments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Purchase Price</TableHead>
              <TableHead>Current Price</TableHead>
              <TableHead>Total Value</TableHead>
              <TableHead>Gain/Loss</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investments.map((investment) => {
              const totalValue = investment.quantity * investment.currentPrice;
              const gainLoss = totalValue - (investment.quantity * investment.purchasePrice);
              const gainLossPercent = (gainLoss / (investment.quantity * investment.purchasePrice)) * 100;

              return (
                <TableRow key={investment.id}>
                  <TableCell className="font-medium">{investment.symbol}</TableCell>
                  <TableCell>{investment.name}</TableCell>
                  <TableCell>{investment.quantity}</TableCell>
                  <TableCell>${investment.purchasePrice.toFixed(2)}</TableCell>
                  <TableCell>${investment.currentPrice.toFixed(2)}</TableCell>
                  <TableCell>${totalValue.toFixed(2)}</TableCell>
                  <TableCell className={gainLoss >= 0 ? "text-green-500" : "text-red-500"}>
                    ${gainLoss.toFixed(2)} ({gainLossPercent.toFixed(2)}%)
                  </TableCell>
                </TableRow>
              )})}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}