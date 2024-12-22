export type RowType = "regular";

export interface FormattedDataRow {
  type: RowType;
  date: string;
  value: number;
  netFlow: number;
  formattedDate: string;
  formattedValue: string;
  formattedNetFlow: string;
  momGain: number;
  momReturn: number;
  ytdGain: number;
  ytdReturn: number;
}