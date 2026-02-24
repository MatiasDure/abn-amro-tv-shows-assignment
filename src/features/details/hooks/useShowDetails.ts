import { useEffect, useState } from "react";
import { getShowById } from "../api/getShowById";
import { type DetailedShow } from "../types/detailedShow";
import { mapDetailedShowResponse } from "../utils/mappers/mapDetailedShowResponse";

export function useShowDetails(showId: string) {
    const [result, setResult] = useState<DetailedShow | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchShowById = async () => {
        setIsLoading(true);
        try {
            var res = await getShowById(showId);

            setResult(mapDetailedShowResponse(res));
        } catch(error){
            console.error((error as Error).message);
            setError(`Something went wrong when fetching a show by id: ${showId}`);
        } finally {
            setIsLoading(false);
        }
      }

      fetchShowById();
    }, []);

    return {
        result,
        isLoading,
        error
    }
}