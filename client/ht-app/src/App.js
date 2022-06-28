import "./App.css";
import { useEffect, useState } from "react";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import HomePage from "./pages/HomePage/HomePage";
import { LOADING_TIME } from "./utils/environment";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => setLoading(false), LOADING_TIME);
    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  return <div className="App">{loading ? <LoadingPage /> : <HomePage />}</div>;
}
