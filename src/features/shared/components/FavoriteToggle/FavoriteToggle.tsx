import { Heart } from "lucide-react";
import "./FavoriteToggle.scss";

type Props = {
  isFavorite: boolean;
  onToggle: () => void;
};

export function FavoriteToggle({
  isFavorite,
  onToggle,
}: Props) {
  return (
    <button className="favorite-button" onClick={onToggle}>
      <Heart
        className="favorite-button__icon"
        color={isFavorite ? "#f56565" : "black"}
        fill={isFavorite ? "#f56565" : "transparent"}
      />
    </button>
  );
}
