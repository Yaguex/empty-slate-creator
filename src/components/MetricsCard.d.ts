interface MetricsCardProps {
    title: string;
    value: string;
    trend?: "up" | "down";
    valueColor?: string;
}
export declare function MetricsCard({ title, value, trend, valueColor }: MetricsCardProps): import("react/jsx-runtime").JSX.Element;
export {};
