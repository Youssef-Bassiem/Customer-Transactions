import { useEffect, useState } from "react";

import Search from "./Components/Search";
import Chart from "./Components/Chart";
import TransactionsTable from "./Components/TransactionsTable";

const Base_Url = location.href;

function App() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    function fetchApi(url) {
      setisLoading(true);
      fetch(`${Base_Url}api/${url}`)
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
    setSearchValue(e.target.value);
  }

  if (isLoading) {
    return <h1 className="text-center">Loading...</h1>;
  }
  return (
    <div className="py-2 flex flex-col items-center justify-between h-full">
      <Search onSearch={handleSearch} value={searchValue} />
      <div className="flex max-lg:flex-col gap-10 justify-around w-full h-full items-center">
        {
          <TransactionsTable
            customers={customers}
            transactions={transactions}
            searchValue={searchValue}
            selectedCustomerId={selectedCustomerId}
            setSelectedCustomerId={setSelectedCustomerId}
          />
        }
        <Chart
          transactions={transactions}
          selectedCustomerId={selectedCustomerId}
        />
      </div>
    </div>
  );
}

export default App;
