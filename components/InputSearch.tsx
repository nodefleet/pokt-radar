"use client";

interface InputSearchProps {
  name: string;
  className?: string;
  placeholder: string;
}

export default function InputSearch(props: InputSearchProps) {
  const { className, placeholder, name } = props;
  return (
    <div className="w-full group flex justify-between">
      <input
        type="text"
        className={`${className} border outline-none focus:border-black_custom  border-gray-400 placeholder:text-gray-400 text-black_custom rounded-full w-full px-6 py-3`}
        name={name}
        placeholder={placeholder}
      />
      <i className="fa-solid fa-search relative right-8 pt-4 group-hover:text-black_custom text-gray-400"></i>
    </div>
  );
}
