import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "components/Welcome";
import MyHabits from "components/MyHabits";
import Header from "components/Header";
import styled from "styled-components";

const Footer = styled.div`
  height: 200px;
  background-color: black;
`;

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="body-root">
          <div className="inner-root">
            <Routes>
              <Route path="/" element={<Welcome />} exact />
              <Route path="/habits" element={<MyHabits />} exact />
            </Routes>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
