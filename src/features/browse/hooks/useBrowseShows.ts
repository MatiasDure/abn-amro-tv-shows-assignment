import { useContext } from "react";
import { ShowsBrowseContext } from "../context/ShowsBrowseContext";

export function useShowsBrowse() {
    return useContext(ShowsBrowseContext);
}