import axios from "axios";
import Link from "next/link";
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
  const [dataSeach, setDataSearch] = useState<{
    type: string;
    data: any;
  } | null>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setDataSearch(null);
    setValue(newValue);
    if (setCurrentValue) setCurrentValue(newValue);
  };

  useEffect(() => {
    const searhData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      try {
        const blockResponse = await axios.get(
          `${apiUrl}/api/block?height=${Number(
            value.trim()
          )}&skip=${0}&take=${10}`
        );
        if (blockResponse.data.block) {
          return setDataSearch({
            type: "block",
            data: blockResponse.data.block,
          });
        }
      } catch (error) {
        console.error("Error al buscar datos:", error);
      }
      try {
        const addressResponse = await axios.get(
          `${apiUrl}/api/address?address=${value.trim()}&SKIP=${10}`
        );
        if (addressResponse.data.account) {
          return setDataSearch({
            type: "account",
            data: addressResponse.data.account,
          });
        }
      } catch (error) {
        console.error("Error al buscar datos:", error);
      }
      try {
        const transactionResponse = await axios.get(
          `${apiUrl}/api/transaction?hash=${value.trim()}`
        );
        if (transactionResponse.data.transation) {
          return setDataSearch({
            type: "transaction",
            data: transactionResponse.data.transation,
          });
        }
      } catch (error) {
        console.error("Error al buscar datos:", error);
      }
    };
    if (value.trim() !== "") {
      searhData();
    } else {
      setDataSearch(null);
    }
  }, [value]);

  return (
    <div className="w-full flex-col gap-6 justify-center items-center relative">
      <div
        className={`w-full flex justify-between ${
          search && "mb-2"
        } focus:border-black_custom border border-black rounded-bl-2xl rounded-tr-2xl placeholder:text-black-black text-black_custom bg-white `}
      >
        <select
          name=""
          id=""
          className="border-r border-black rounded-bl-2xl px-4"
        >
          <option value="">ALL FILTERS</option>
        </select>
        <input
          type="text"
          className={`${className}  outline-none w-full px-6 py-3`}
          name={name}
          placeholder={placeholder}
          value={currentValue}
          onChange={handleChange}
        />
        {!dataSeach && search && value.trim() !== "" ? (
          <i className="fas fa-spinner animate-spin relative right-8 pt-4"></i>
        ) : (
          <i
            className={`fa-solid fa-search ${classIconName} relative right-0 pt-4 px-4 group-hover:text-black_custom text-black border-l border-black bg-green_jade w-26 rounded-tr-2xl`}
          ></i>
        )}
      </div>
      {dataSeach && search && value.trim() !== "" && (
        <div className=" rounded-full fixed p-2 px-10 mx-5 mr-10 border border-black z-20">
          {dataSeach && (
            <Link
              href={`/${
                dataSeach?.type === "account" ? "address" : dataSeach?.type
              }/${value.trim()}`}
              onClick={() => {
                setValue("");
              }}
              className="capitalize font-medium text-xl hover:text-blue_primary"
            >
              {dataSeach?.type}
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default InputSearch;
