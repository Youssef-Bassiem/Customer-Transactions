const Search = ({ onSearch, value }) => {
  return (
    <>
      <label className="font-medium">Search by Name or Amount</label>
      <input
        onChange={onSearch}
        type="text"
        value={value}
        className="text-black px-2 mb-4 mt-1 rounded-md outline-none"
      />
    </>
  );
};

export default Search;
