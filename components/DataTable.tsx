export default function DataTable({
  children,
  headers,
  small,
}: {
  headers: string[];
  children: JSX.Element[];
  small?: boolean;
}) {
  return (
    <table className={`table ${small && "table-small"} w-full text-gray-4`}>
      <thead className="bg-gray-10 rounded-t-xl text-gray-3">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="capitalize text-base">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
