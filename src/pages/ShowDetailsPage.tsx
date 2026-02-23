import { useLocation, useParams, useNavigate } from "react-router-dom";

import type { Show } from "../features/shared/types/show";

export default function ShowDetailsPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();
  const show = state as Show;

  if(!show) {
    // todo: refetch show using id from api
  }

  return (
    <div>
        <button onClick={() => navigate(-1)}>Back</button>
        <div style={{backgroundImage: `url(${show.ImageUrl})`, filter: "blur(20px)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundColor: "red", width: "100%", height: "400px"}}>
        </div>
      <h1>{show.Name}</h1>
      <img src={show.ImageUrl} />
      <p>{show.Summary}</p>
    </div>
  );
}
