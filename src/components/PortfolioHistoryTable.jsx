import React, { useState } from "react";
import { format, parseISO, startOfYear, isValid } from "date-fns";
import { Card } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import { EditValueModal } from "./EditValueModal";
import { PortfolioTableRow } from "./PortfolioTableRow";
import { PortfolioTableHeader } from "./PortfolioTableHeader";

export function PortfolioHistoryTable({ data }) {
  const [editingRow, setEditingRow] = useState(null);

  const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));

  const calculateMoMChange = (currentValue, previousValue) => {
    const gain = currentValue - previousValue;
    const returnPercentage = previousValue ? (gain / previousValue) * 100 : 0;
    return { gain, returnPercentage };
  };

  const calculateYTDChange = (currentValue, startOfYearValue) => {
    const gain = currentValue - startOfYearValue;
    const returnPercentage = startOfYearValue
      ? (gain / startOfYearValue) * 100
      : 0;
    return { gain, returnPercentage };
  };

  const getStartOfYearValue = (date) => {
    try {
      const parsedDate = parseISO(date); // Directly parse ISO dates like "2023-12-01"
      if (!isValid(parsedDate)) {
        throw new Error(`Invalid date format: ${date}`);
      }

      const currentYear = parsedDate.getFullYear();
      const startOfYearDate = startOfYear(new Date(currentYear, 0));

      const startOfYearFormatted = format(startOfYearDate, "yyyy-MM-dd");

      const startOfYearDataEntry = data.find(
        (entry) => entry.date === startOfYearFormatted
      );

      return startOfYearDataEntry?.value || 0;
    } catch (error) {
      console.error(`Error in getStartOfYearValue: ${error.message}`);
      return 0; // Fallback for invalid dates
    }
  };

  const formattedData = sortedData.map((entry, index) => {
    const previousMonth = sortedData[index + 1]?.value ?? entry.value;
    const startOfYearValue = getStartOfYearValue(entry.date);

    const momChanges = calculateMoMChange(entry.value, previousMonth);
    const ytdChanges = calculateYTDChange(entry.value, startOfYearValue);

    return {
      type: "regular",
      date: entry.date,
      value: entry.value,
      formattedDate: isValid(parseISO(entry.date))
        ? format(parseISO(entry.date), "MMM yyyy")
        : "Invalid Date",
      formattedValue:
        (entry.value < 0 ? "-$" : "$") + Math.abs(entry.value).toLocaleString(),
      momGain: momChanges.gain,
      momReturn: momChanges.returnPercentage,
      ytdGain: ytdChanges.gain,
      ytdReturn: ytdChanges.returnPercentage,
    };
  });

  const handleEdit = (row) => {
    setEditingRow(row);
  };

  const handleSave = (newValue, newNetFlow) => {
    console.log("Saving new value:", newValue, "for row:", editingRow);
    setEditingRow(null);
  };

  const formatGain = (value) =>
    value < 0
      ? `-$${Math.abs(value).toLocaleString()}`
      : `$${Math.abs(value).toLocaleString()}`;

  const formatReturn = (value) =>
    `${value >= 0 ? "+" : "-"}${Math.abs(value).toFixed(2)}%`;

  const getValueColor = (value) =>
    value > 0 ? "text-green-600" : value < 0 ? "text-red-600" : "";

  return (
    <>
      <Card className="card-gradient">
        <Table>
          <PortfolioTableHeader />
          <TableBody>
            {formattedData.map((row, index) => {
              const isYearChange =
                index < formattedData.length - 1 &&
                parseISO(row.date).getFullYear() !==
                  parseISO(formattedData[index + 1].date).getFullYear();

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