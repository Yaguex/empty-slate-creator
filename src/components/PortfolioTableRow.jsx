import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { TableActionButtons } from "./TableActionButtons";

export function PortfolioTableRow({
  row,
  formatGain = (value) =>
    value < 0 ? `-$${Math.abs(value).toLocaleString()}` : `$${Math.abs(value).toLocaleString()}`,
  formatReturn = (value) =>
    `${value >= 0 ? "+" : "-"}${Math.abs(value).toFixed(2)}%`,
  getValueColor = () => "",
  onEdit,
  isYearChange,
}) {
  // Safely parse formattedNetFlow to a number
  const netFlowValue = parseFloat(
    row.formattedNetFlow?.replace(/[^0-9.-]/g, "") || "0"
  );

  return (
    <TableRow
      className={`group relative ${
        isYearChange ? "border-b-2 border-gray-300" : ""
      }`}
    >
      <TableCell>{row.formattedDate}</TableCell>
      <TableCell className="text-right">{row.formattedValue}</TableCell>
      <TableCell
        className={`text-right ${getValueColor(netFlowValue)}`}
      >
        {row.formattedNetFlow}
      </TableCell>
      <TableCell
        className={`text-right ${getValueColor(row.momGain || 0)}`}
      >
        {formatGain(row.momGain || 0)}
      </TableCell>
      <TableCell
        className={`text-right ${getValueColor(row.momReturn || 0)}`}
      >
        {formatReturn(row.momReturn || 0)}
      </TableCell>
      <TableCell
        className={`text-right ${getValueColor(row.ytdGain || 0)}`}
      >
        {formatGain(row.ytdGain || 0)}
      </TableCell>
      <TableCell
        className={`text-right ${getValueColor(row.ytdReturn || 0)}`}
      >
        {formatReturn(row.ytdReturn || 0)}
      </TableCell>
      <TableCell>
        <TableActionButtons onEdit={onEdit} />
      </TableCell>
    </TableRow>
  );
}