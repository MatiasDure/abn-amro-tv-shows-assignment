import { Routes, Route } from "react-router-dom";
import ShowsDashboardPage from "./pages/ShowsDashboardPage";
import ShowDetails from "./pages/ShowDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ShowsDashboardPage />} />
      <Route path="/show/:id" element={<ShowDetails />} />
    </Routes>
  )
}

export default App
