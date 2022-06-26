import "./App.css";
import { useEffect, useState } from "react";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import HomePage from "./pages/HomePage/HomePage";

const LOADING_TIME = 5000;

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), LOADING_TIME);
  }, []);

  return <div className="App">
    { loading ? <LoadingPage /> : <HomePage />}
  </div>;
};

export default App;
