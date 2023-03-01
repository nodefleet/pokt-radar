import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  padding: 48px 84px;
  padding-bottom: 58px;
  background-color: #633813;
  color: #fff;

  .links {
    display: flex;
    justify-content: space-between;
  }

  .column {
    display: flex;
    width: 60%;
    flex-direction: column;
  }

  h6 {
    margin: 0;
    margin-bottom: 20px;
    width: fit-content;
    padding-bottom: 5px;
    padding-right: 20px;
    border-bottom: 1px solid #fff;

    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
  }

  a {
    margin-bottom: 12px;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    text-decoration: none;
    cursor: pointer;

    :visited {
      color: #fff;
    }
  }

  .social-media {
    display: flex;
    justify-content: space-between;

    p {
      font-weight: 300;
      font-size: 12px;
      line-height: 16px;
    }
  }
`;

export default function Footer() {
  return (
    <Container>
      <div className="links">
        <div className="column">
          <h6>Company</h6>
          <Link>About us</Link>
          <Link>Contact us</Link>
          <Link>Careers</Link>
          <Link>Terms of Service</Link>
        </div>
        <div className="column">
          <h6>Support</h6>
          <Link>Feedback & Bug Report</Link>
          <Link>Requests</Link>
        </div>
      </div>
      <hr />
      <div className="social-media">
        <div>{/* Discord/Twitter/Tg */}</div>
        <p>2023 Powered by Berachain</p>
      </div>
    </Container>
  );
}
