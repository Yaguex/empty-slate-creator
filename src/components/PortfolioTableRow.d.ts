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
export declare function PortfolioTableRow({ row, formatGain, formatReturn, getValueColor, onEdit, isYearChange, }: PortfolioTableRowProps): import("react/jsx-runtime").JSX.Element;
export {};
