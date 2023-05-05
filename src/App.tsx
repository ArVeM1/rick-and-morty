import React from "react";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import { CharacterDetails, HomePage } from "./pages";

function App() {
  return (
    <div className="App">
      <Header />
      <Container className="home-container">
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/character/:id"} element={<CharacterDetails />} />
          <Route path={"*"} element={<h1>Page not found</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
