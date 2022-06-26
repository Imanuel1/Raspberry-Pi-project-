import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import LoadingPage from "./pages/LoadingPage/LoadingPage";

const App = () => {
  const [loading, setLoading] = useState(true);
  const LOADING_TIME = 5000;

  useEffect(() => {
    setTimeout(() => setLoading(false), LOADING_TIME);
  }, []);

  return <div className="App">
    <LoadingPage />
    {/* { loading ? <LoadingPage /> : <HomePage/>} */}
  </div>;
};

export default App;
