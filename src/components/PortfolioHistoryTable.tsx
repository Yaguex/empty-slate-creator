import { format, parse, startOfYear } from "date-fns";
import { Card } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import { EditValueModal } from "./EditValueModal";
import { PortfolioTableRow } from "./PortfolioTableRow";
import { PortfolioTableHeader } from "./PortfolioTableHeader";
import { useState } from "react";
import { FormattedDataRow } from "@/types/portfolio-table";

interface PortfolioHistoryTableProps {
  data: Array<{
    date: string;
    value: number;
  }>;
}

export function PortfolioHistoryTable({ data }: PortfolioHistoryTableProps) {
  const [editingRow, setEditingRow] = useState<FormattedDataRow | null>(null);

  const sortedData = [...data].sort((a, b) => b.date.localeCompare(a.date));

  const calculateMoMChange = (currentValue: number, previousValue: number) => {
    const gain = currentValue - previousValue;
    const returnPercentage = previousValue !== 0 ? (gain / previousValue) * 100 : 0;
    return { gain, returnPercentage };
  };

  const calculateYTDChange = (currentValue: number, startOfYearValue: number) => {
    const gain = currentValue - startOfYearValue;
    const returnPercentage = startOfYearValue !== 0 ? (gain / startOfYearValue) * 100 : 0;
    return { gain, returnPercentage };
  };

  const getStartOfYearValue = (date: string) => {
    try {
      const currentYear = parse(date, "yyyy-MM", new Date()).getFullYear();
      const startOfYearDate = startOfYear(new Date(currentYear, 0)).toISOString().slice(0, 7);
      const startOfYearDataEntry = data.find(entry => entry.date === startOfYearDate);
      return startOfYearDataEntry?.value ?? data[data.length - 1].value;
    } catch (error) {
      console.error("Error getting start of year value:", error);
      return 0;
    }
  };

  const formattedData = sortedData.map((entry, index) => {
    const artificialMultiplier = index % 3 === 0 ? -1 : 1;
    const previousMonth = sortedData[index + 1]?.value ?? entry.value;
    const startOfYearValue = getStartOfYearValue(entry.date);
    const momChanges = calculateMoMChange(entry.value, previousMonth);
    const ytdChanges = calculateYTDChange(entry.value, startOfYearValue);

    // Sample net flow data for specific months
    let netFlow = 0;
    if (entry.date === '2024-10') netFlow = 20000;
    if (entry.date === '2024-08') netFlow = -15000;

    return {
      type: "regular" as const,
      date: entry.date,
      value: entry.value,
      netFlow,
      formattedDate: format(parse(entry.date, "yyyy-MM", new Date()), "MMM yyyy"),
      formattedValue: (entry.value < 0 ? "-$" : "$") + Math.abs(entry.value).toLocaleString(),
      formattedNetFlow: netFlow === 0 ? "$0" : (netFlow < 0 ? "-$" : "+$") + Math.abs(netFlow).toLocaleString(),
      momGain: momChanges.gain * artificialMultiplier,
      momReturn: momChanges.returnPercentage * artificialMultiplier,
      ytdGain: ytdChanges.gain * artificialMultiplier,
      ytdReturn: ytdChanges.returnPercentage * artificialMultiplier,
    };
  });

  const handleEdit = (row: FormattedDataRow) => {
    console.log("Editing row:", row);
    setEditingRow(row);
  };

  const handleSave = (newValue: number, newNetFlow: number) => {
    console.log("Saving new value:", newValue, "and net flow:", newNetFlow, "for row:", editingRow);
    setEditingRow(null);
  };

  const formatGain = (value: number) => 
    value < 0 ? `-$${Math.abs(value).toLocaleString()}` : `$${Math.abs(value).toLocaleString()}`;
    
  const formatReturn = (value: number) => 
    `${value >= 0 ? "+" : "-"}${Math.abs(value).toFixed(2)}%`;

  const getValueColor = (value: number) =>
    value > 0 ? "text-green-600" : value < 0 ? "text-red-600" : "";

  return (
    <>
      <Card className="card-gradient">
        <Table>
          <PortfolioTableHeader />
          <TableBody>
            {formattedData.map((row, index) => {
              const isYearChange = index < formattedData.length - 1 && 
                parse(row.date, "yyyy-MM", new Date()).getFullYear() !==
                parse(formattedData[index + 1].date, "yyyy-MM", new Date()).getFullYear();

              return (
                <PortfolioTableRow
                  key={row.date}
                  row={row}
                  formatGain={formatGain}
                  formatReturn={formatReturn}
                  getValueColor={getValueColor}
                  onEdit={() => handleEdit(row)}
                  isYearChange={isYearChange}
                />
              );
            })}
          </TableBody>
        </Table>
      </Card>
      
      {editingRow && (
        <EditValueModal
          isOpen={true}
          onClose={() => setEditingRow(null)}
          onSave={handleSave}
          initialValue={editingRow.value}
          initialNetFlow={editingRow.netFlow}
        />
      )}
    </>
  );
}