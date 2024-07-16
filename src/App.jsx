import { useEffect, useState } from "react";
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

const formatXAxis = (tickItem) => {
  const date = new Date(tickItem);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const Base_Url = location.href;
const regex = /^[a-zA-Z0-9 ]+$/;
function App() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const filtered = function () {
    if (regex.test(search)) {
      if (isFinite(search)) {
        return transactions.filter(({ amount }) =>
          amount.toString().includes(search)
        );
      } else {
        const filteredIds = customers.filter(({ name }) =>
          name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        );
        return transactions.filter((transaction) => {
          for (let j = 0; j < filteredIds.length; j++) {
            if (transaction.customer_id === filteredIds[j].id) {
              return true;
            }
          }
        });
      }
    } else return transactions;
  };
  const filteredTransactions = transactions.filter(
    ({ customer_id }) => customer_id === selectedCustomerId
  );
  const summedTransactions = Object.values(
    filteredTransactions.reduce((acc, { date, amount }) => {
      if (!acc[date]) {
        acc[date] = { date, amount };
      } else {
        acc[date].amount += amount;
      }
      return acc;
    }, {})
  );
  summedTransactions.sort((a, b) => new Date(a.date) - new Date(b.date));

  useEffect(() => {
    function fetchApi(url) {
      const controller = new AbortController();
      setisLoading(true);
      fetch(`${Base_Url}api/${url}`, { signal: controller.signal })
        .then((res) => res.json())
        .then((data) => {
          url === "customers" ? setCustomers(data) : setTransactions(data);
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => setisLoading(false));
    }
    fetchApi("customers");
    fetchApi("transactions");
    return;
  }, []);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  if (isLoading) {
    return <h1 className="text-center">Loading...</h1>;
  }
  return (
    <div className="py-2 flex flex-col items-center justify-between h-full">
      <label className="font-medium">Search by Name or Amount</label>
      <input
        onChange={handleSearch}
        type="text"
        value={search}
        className="text-black px-2 mb-4 mt-1 rounded-md outline-none"
      />
      <div className="flex max-lg:flex-col gap-10 justify-around w-full h-full items-center">
        {!filtered().length > 0 ? (
          <p>Empty Table</p>
        ) : (
          <table className="w-1/2 max-lg:w-3/4 border text-left">
            <thead className="border">
              <tr className="">
                <th className="py-4 md:px-5 px-2">Name</th>
                <th className="border md:px-5 px-2">Amount</th>
                <th className="border md:px-5 px-2">Date</th>
              </tr>
            </thead>
            <tbody className="">
              {filtered().map(({ id, customer_id, date, amount }) => {
                return (
                  <tr
                    className="border bg-purple-950 max-md:text-sm items-center px-4  cursor-pointer hover:bg-purple-800 hover:duration-1000"
                    key={id}
                    onClick={() =>
                      setSelectedCustomerId(
                        customer_id === selectedCustomerId ? null : customer_id
                      )
                    }
                  >
                    <td className="border  md:px-5 px-2">
                      <div>
                        {
                          customers.filter(
                            (customer) => customer.id === customer_id
                          )[0].name
                        }
                      </div>
                    </td>
                    <td className="border py-4 md:px-5 px-2">
                      <div>{amount}</div>
                    </td>
                    <td className="border md:px-5 px-2">
                      <div>{date}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
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
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md p-2 opacity-85  bg-[#5b56ad]">
        <p className="text-sm max-md:text-xs">Date: {label}</p>
        <p className="text-sm max-md:text-xs">Amount: {payload[0].value}</p>
      </div>
    );
  }

  return null;
};
export default App;
