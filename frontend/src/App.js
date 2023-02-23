/** @format */

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Sign from "./components/Auth/signin";
import { FronteggProvider } from "@frontegg/react";

console.log({ process: process.env });

function App() {
  const contextOptions = {
    baseUrl: process.env.REACT_APP_FRONTEGG_BASE_URL,
    clientId: process.env.REACT_APP_FRONTEGG_CLIENT_ID,
  };
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
