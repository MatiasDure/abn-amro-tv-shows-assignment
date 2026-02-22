import { useLocation, useParams } from "react-router-dom";
import type { Show } from "../types/show";

export default function ShowDetails() {
  const { state } = useLocation();
  const { id } = useParams();
  const show = state as Show;

  if(!show) {
    // todo: refetch show using id from api
  }

  return (
    <div>
        <div style={{backgroundImage: `url(${show.ImageUrl})`, filter: "blur(20px)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundColor: "red", width: "100%", height: "400px"}}>
        </div>
      <h1>{show.Name}</h1>
      <img src={show.ImageUrl} />
      <p>{show.Summary}</p>
    </div>
  );
}
