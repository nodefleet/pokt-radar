import axios from "axios";
import React, { useEffect, useState } from "react";

interface InputSearchProps {
  name: string;
  className?: string;
  placeholder?: string;
  classIconName?: string;
  currentValue?: string;
  setCurrentValue?: (newValue: string) => void;
  search?: boolean;
}

const InputSearch: React.FC<InputSearchProps> = ({
  name,
  className,
  placeholder,
  classIconName,
  currentValue,
  setCurrentValue,
  search,
}) => {
  const [value, setValue] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (setCurrentValue) setCurrentValue(newValue);
  };

  useEffect(() => {
    const searhData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const blockResponse = await axios.get(
          `${apiUrl}/api/block?height=${Number(
            value.trim()
          )}&skip=${0}&take=${10}`
        );
        const addressResponse = await axios.get(
          `${apiUrl}/api/address?address=${value.trim()}&SKIP=${10}`
        );
        const transactionResponse = await axios.get(
          `${apiUrl}/api/transaction?hash=${value.trim()}`
        );

        console.log("Datos de bloque:", blockResponse.data);
        console.log("Datos de dirección:", addressResponse.data);
        console.log("Datos de transacción:", transactionResponse.data);
      } catch (error) {
        console.log(error);
        console.error("Error al buscar datos:", error);
      }
    };
    if (value.trim() !== "") {
      searhData();
    }
  }, [value]);

  return (
    <div className="w-full flex-col gap-6 justify-center items-center relative">
      <div className={`w-full flex justify-between ${search && "mb-2"}`}>
        <input
          type="text"
          className={`${className} border outline-none focus:border-black_custom  border-gray-400 placeholder:text-gray-400 text-black_custom rounded-full w-full px-6 py-3`}
          name={name}
          placeholder={placeholder}
          value={currentValue}
          onChange={handleChange}
        />
        <i
          className={`fa-solid fa-search ${classIconName} relative right-8 pt-4 group-hover:text-black_custom text-gray-400`}
        ></i>
      </div>
      {search && (
        <div className="bg-white rounded-lg p-4 mx-5 mr-10 border border-black z-20">
          <h2 className="">Transaction</h2>
        </div>
      )}
    </div>
  );
};

export default InputSearch;
