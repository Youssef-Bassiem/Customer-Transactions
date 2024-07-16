const regex = /^[a-zA-Z0-9 ]+$/;

const TransactionsTable = ({
  setSelectedCustomerId,
  selectedCustomerId,
  searchValue,
  transactions,
  customers,
}) => {
  const mergedTransactions = transactions.map((transaction) => ({
    ...transaction,
    name: customers.find((customer) => customer.id === transaction.customer_id)
      ?.name,
  }));

  const filtered = () => {
    if (!regex.test(searchValue)) return mergedTransactions;

    return mergedTransactions.filter(({ amount, name }) =>
      isFinite(searchValue)
        ? amount.toString().includes(searchValue)
        : name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  };

  return (
    <>
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
            {filtered().map(({ id, customer_id, name, amount, date }) => {
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
                  <td className="border  md:px-5 px-2">{name}</td>
                  <td className="border py-4 md:px-5 px-2">{amount}</td>
                  <td className="border md:px-5 px-2">{date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TransactionsTable;
