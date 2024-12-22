import React, { useEffect, useState } from "react";
import { MetricsCard } from "@/components/MetricsCard";
import { PortfolioHistoryTable } from "@/components/PortfolioHistoryTable";
import { PortfolioValueChart } from "@/components/PortfolioValueChart";
import { supabase } from "@/integrations/supabase/supabaseClient";

interface MonthlyData {
  id: number;
  month: string; // YYYY-MM-DD format
  balance: number;
  flows: number;
  mom_gain: number;
  mom_return: number;
  ytd_gain: number;
  ytd_return: number;
}

const Dashboard = () => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [portfolios, setPortfolios] = useState<{ id: string; name: string }[]>([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user?.id;

        if (!userId) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const { data: portfolios, error: portfolioError } = await supabase
          .from("portfolios")
          .select("id, name")
          .eq("user_id", userId);

        if (portfolioError) {
          throw new Error(portfolioError.message);
        }

        console.log("Fetched Portfolios:", portfolios);
        setPortfolios(portfolios || []);

        if (portfolios?.length) {
          setSelectedPortfolioId(portfolios[0].id);
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching portfolios.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      if (!selectedPortfolioId) return;

      setLoading(true);
      setError(null);

      try {
        const { data: monthlyData, error: dataError } = await supabase
          .from("monthly_portfolio_data")
          .select("*")
          .eq("portfolio_id", selectedPortfolioId);

        if (dataError) {
          throw new Error(dataError.message);
        }

        console.log("Fetched Monthly Data:", monthlyData);
        setMonthlyData(monthlyData || []);
      } catch (err) {
        setError(err.message || "An error occurred while fetching monthly data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyData();
  }, [selectedPortfolioId]);

  // Sort data in ascending order (oldest to newest) for the chart
  const chartData = React.useMemo(() => {
    if (!monthlyData.length) return [];
    
    const sorted = [...monthlyData].sort(
      (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
    );
    console.log("Dashboard - Chart Data (Ascending Order):", sorted);
    
    return sorted.map((entry) => ({
      date: entry.month,
      value: entry.balance,
    }));
  }, [monthlyData]);

  // Keep table data sorting in descending order (newest to oldest)
  const tableData = React.useMemo(() => {
    if (!monthlyData.length) return [];
    
    const sorted = [...monthlyData].sort(
      (a, b) => new Date(b.month).getTime() - new Date(a.month).getTime()
    );
    console.log("Dashboard - Table Data (Descending Order):", sorted);
    
    return sorted.map((entry) => ({
      date: entry.month,
      value: entry.balance,
    }));
  }, [monthlyData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  const latestMonthData = monthlyData[monthlyData.length - 1];

  const ytdGain = latestMonthData?.ytd_gain || 0;
  const ytdReturn = latestMonthData?.ytd_return || 0;

  return (
    <div className="container mx-auto py-4 px-4">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="mb-4">
        <label
          htmlFor="portfolio-select"
          className="block text-sm font-medium text-gray-700"
        >
          Select Portfolio
        </label>
        <select
          id="portfolio-select"
          value={selectedPortfolioId || ""}
          onChange={(e) => setSelectedPortfolioId(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          {portfolios.map((portfolio) => (
            <option key={portfolio.id} value={portfolio.id}>
              {portfolio.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <MetricsCard
          title="Portfolio Value"
          value={`$${latestMonthData?.balance.toLocaleString() || "0"}`}
        />
        <MetricsCard
          title="YTD Gain"
          value={`$${ytdGain.toLocaleString() || "0"}`}
          trend={ytdGain >= 0 ? "up" : "down"}
          valueColor={ytdGain >= 0 ? "text-green-600" : "text-red-600"}
        />
        <MetricsCard
          title="YTD Return"
          value={`${ytdReturn >= 0 ? "+" : ""}${ytdReturn.toFixed(2)}%`}
          trend={ytdReturn >= 0 ? "up" : "down"}
          valueColor={ytdReturn >= 0 ? "text-green-600" : "text-red-600"}
        />
      </div>

      <div className="mb-8">
        <PortfolioValueChart data={chartData} />
      </div>

      <div className="mb-8">
        <PortfolioHistoryTable data={tableData} />
      </div>
    </div>
  );
};

export default Dashboard;
