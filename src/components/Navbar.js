import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { ReactComponent as BerachainLogo } from "../assets/images/berachain.svg";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 40px 0 10px;
  position: sticky;
  z-index: 3;

  a {
    margin-right: 30px;

    color: #633813;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    text-decoration: none;

    :last-child {
      margin-right: 0;
    }
  }
`;

export default function Navbar() {
  return (
    <Container>
      <BerachainLogo />
      <div>
        <NavLink>Home</NavLink>
        <NavLink>Transactions</NavLink>
        <NavLink>Blocks</NavLink>
      </div>
    </Container>
  );
}
