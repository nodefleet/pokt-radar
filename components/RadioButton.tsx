export function RadioButtonGroup({
  data,
  currentValue,
  setCurrentValue,
}: {
  data: { label: string; value: string }[];
  currentValue: string;
  setCurrentValue: (newValue: string) => void;
}) {
  const handleChange = (newValue: string) => {
    setCurrentValue(newValue);
  };

  return (
    <div>
      <ul className="w-full flex flex-row divide-x-2 border border-neutral-300 rounded-full shadow-md ">
        {data &&
          data.map((row, index) => (
            <li key={index} onClick={() => handleChange(row.value)}>
              <input
                type="radio"
                id={`radio${index + 1}`}
                name="hosting"
                value={row.value}
                className="hidden peer"
              />
              <label
                htmlFor="hosting-small"
                className={`flex items-center justify-center py-2 px-4 transition-all text-black w-16 border-0  cursor-pointer ${
                  currentValue === row.value
                    ? "bg-neutral-300 text-white"
                    : "bg-transparent"
                } ${
                  data.length === index + 1
                    ? "rounded-r-full"
                    : index === 0 && "rounded-l-full"
                }`}
              >
                <div className="block">
                  <div className="w-full text-sm truncate font-semibold">
                    {row.label}
                  </div>
                </div>
              </label>
            </li>
          ))}
      </ul>
    </div>
  );
}
