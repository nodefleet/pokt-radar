import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

export default function SearchBar() {
  return (
    <Container>
      <input placeholder="Search by Address, Txn Hash, Block Height..." />
    </Container>
  );
}
