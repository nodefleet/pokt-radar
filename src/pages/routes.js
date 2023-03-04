import * as React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "./Home";

const Elem = () => <div>Home</div>;

export default function routes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}
