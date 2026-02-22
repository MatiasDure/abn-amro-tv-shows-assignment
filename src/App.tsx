import { Routes, Route } from "react-router-dom";
import ShowsDashboard from "./features/shows/pages/ShowsDashboard";
import ShowDetails from "./features/shows/pages/ShowDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ShowsDashboard />} />
      <Route path="/show/:id" element={<ShowDetails />} />
    </Routes>
  )
}

export default App
