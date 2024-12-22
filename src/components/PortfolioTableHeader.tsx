import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function PortfolioTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Date</TableHead>
        <TableHead className="text-right">Portfolio Value</TableHead>
        <TableHead className="text-right">Net Flow</TableHead>
        <TableHead className="text-right">MoM Gain</TableHead>
        <TableHead className="text-right">MoM Return</TableHead>
        <TableHead className="text-right">YTD Gain</TableHead>
        <TableHead className="text-right">YTD Return</TableHead>
        <TableHead className="w-[100px]"></TableHead>
      </TableRow>
    </TableHeader>
  );
}