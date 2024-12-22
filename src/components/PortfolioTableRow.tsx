import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { TableActionButtons } from "./TableActionButtons";

interface PortfolioTableRowProps {
  row: {
    type: "regular";
    formattedDate: string;
    formattedValue: string;
    formattedNetFlow: string;
    momGain?: number;
    momReturn?: number;
    ytdGain?: number;
    ytdReturn?: number;
  };
  formatGain: (value: number) => string;
  formatReturn: (value: number) => string;
  getValueColor: (value: number) => string;
  onEdit: () => void;
  isYearChange?: boolean;
}

export function PortfolioTableRow({
  row,
  formatGain,
  formatReturn,
  getValueColor,
  onEdit,
  isYearChange,
}: PortfolioTableRowProps) {
  return (
    <TableRow className={`group relative ${isYearChange ? "border-b-2 border-gray-300" : ""}`}>
      <TableCell>{row.formattedDate}</TableCell>
      <TableCell className="text-right">{row.formattedValue}</TableCell>
      <TableCell className={`text-right ${getValueColor(parseFloat(row.formattedNetFlow.replace(/[^0-9.-]/g, '')))}`}>
        {row.formattedNetFlow}
      </TableCell>
      <TableCell className={`text-right ${getValueColor(row.momGain || 0)}`}>
        {formatGain(row.momGain || 0)}
      </TableCell>
      <TableCell className={`text-right ${getValueColor(row.momReturn || 0)}`}>
        {formatReturn(row.momReturn || 0)}
      </TableCell>
      <TableCell className={`text-right ${getValueColor(row.ytdGain || 0)}`}>
        {formatGain(row.ytdGain || 0)}
      </TableCell>
      <TableCell className={`text-right ${getValueColor(row.ytdReturn || 0)}`}>
        {formatReturn(row.ytdReturn || 0)}
      </TableCell>
      <TableCell>
        <TableActionButtons onEdit={onEdit} />
      </TableCell>
    </TableRow>
  );
}