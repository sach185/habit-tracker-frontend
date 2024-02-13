import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "components/Welcome";
import MyGoals from "components/MyGoals";
import Header from "components/Header";
import styled from "styled-components";
import Login from "components/User/Login";
import Register from "components/User/Register";
import MoodTracker from "components/MoodTracker";

const Footer = styled.div`
  min-height: 200px;
  background-color: #fcfcf7;
  margin-top: auto;
`;

const BodyRoot = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: center;
  padding-bottom: 50px;
`;

const InnerRoot = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  max-width: 1200px;
  flex-direction: column;
`;

function App() {
  return (
    <>
      {/* setup routes */}
      <BrowserRouter>
        <Header />
        <BodyRoot>
          <InnerRoot>
            <Routes>
              <Route path="/" element={<Welcome />} exact />
              <Route path="/habits" element={<MyGoals />} exact />
              <Route path="/login" element={<Login />} exact />
              <Route path="/register" element={<Register />} />
              <Route path="/mood" element={<MoodTracker />} exact />
            </Routes>
          </InnerRoot>
        </BodyRoot>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
