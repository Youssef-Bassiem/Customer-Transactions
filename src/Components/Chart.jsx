import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  ComposedChart,
  ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const formatXAxis = (tickItem) => {
  const date = new Date(tickItem);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const Chart = ({ transactions, selectedCustomerId }) => {
  const selectedTransactions = transactions.filter(
    ({ customer_id }) => customer_id === selectedCustomerId
  );

  const summedTransactions = Object.values(
    selectedTransactions.reduce((acc, { date, amount }) => {
      if (!acc[date]) {
        acc[date] = { date, amount };
      } else {
        acc[date].amount += amount;
      }
      return acc;
    }, {})
  );
  summedTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <>
      {selectedCustomerId && (
        <div className="w-2/5 bg-[#0000002c] flex items-center justify-center pt-7 pb-3 pr-7 rounded-lg max-lg:w-3/4 h-full">
          <ResponsiveContainer height={350}>
            <ComposedChart data={summedTransactions}>
              <CartesianGrid />
              <XAxis
                stroke="#fff"
                dataKey="date"
                tickFormatter={formatXAxis}
                fontSize="13"
              />
              <YAxis fontSize="13" stroke="#fff" />
              <Tooltip content={<CustomTooltip />} />
              <Bar maxBarSize={60} dataKey="amount" fill="#8884d8" />
              <Line
                type="monotone"
                strokeWidth="2"
                stroke="#3b0764"
                dataKey="amount"
                fill="#6b21a8"
                activeDot={{ stroke: "#6b21a8", strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart;
