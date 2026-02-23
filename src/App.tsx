import { Routes, Route } from "react-router-dom";
import ShowsDashboardPage from "./pages/ShowsDashboardPage";
import ShowDetails from "./pages/ShowDetailsPage";
import { ShowsBrowseProvider } from "./features/browse/context/ShowsBrowseContext";
import { ShowsSearchProvider } from "./features/search/context/ShowsSearchContext";

function App() {
  return (
    <ShowsBrowseProvider>
      <ShowsSearchProvider>
        <Routes>
          <Route path="/" element={<ShowsDashboardPage />} />
          <Route path="/show/:id" element={<ShowDetails />} />
        </Routes>
      </ShowsSearchProvider>
    </ShowsBrowseProvider>
  )
}

export default App
