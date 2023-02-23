/** @format */

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Sign from "./components/Auth/signin";
import { FronteggProvider } from "@frontegg/react";

const contextOptions = {
  baseUrl: "https://app-5omj9h9oozk4.frontegg.com",
  clientId: "b85b111c-47f0-4ce8-bcc9-e2fed2085d8e",
};

function App() {
  return (
    <BrowserRouter>
      <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true}>
        <Routes>
          <Route path='/chat' element={<Chat />} />
          <Route path='/' element={<Sign />} />
        </Routes>
      </FronteggProvider>
    </BrowserRouter>
  );
}

export default App;
