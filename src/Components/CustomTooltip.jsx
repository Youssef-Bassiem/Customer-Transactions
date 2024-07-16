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
export default CustomTooltip;
