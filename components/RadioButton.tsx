"use client";

import { useState } from "react";

export function RadioButtonGroup({
  data,
}: {
  data: { label: string; value: string }[];
}) {
  const [value, setValue] = useState("1");
  return (
    <div>
      <ul className="w-full flex flex-row divide-x-2 border border-neutral-300 rounded-full shadow-md ">
        {data &&
          data.map((row, index) => (
            <li
              key={index}
              onClick={() => {
                setValue(row.value);
              }}
            >
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
                  value === row.value
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
