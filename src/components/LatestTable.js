import React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 685px;
  box-sizing: border-box;
  padding: 20px 16px;
  background: #ffffff;

  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

export default function LatestTable({ title, columns, data }) {
  return (
    <Container>
      <h4>{title}</h4>
      <table>
        <thead>
          <tr>
            {columns &&
              Object.values(columns).map((name, index) => (
                <th key={index}>{name}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row, index) => (
              <tr key={index}>
                {Object.keys(columns).map((value, indexc) => (
                  <td key={`${index}-${indexc}`}>{row[value]}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </Container>
  );
}
