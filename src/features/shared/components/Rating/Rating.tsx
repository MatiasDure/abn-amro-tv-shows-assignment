import { Star } from "lucide-react";
import "./Rating.scss";

type RatingProps = {
  value: number;
};

export function Rating({ value }: RatingProps) {
  const display = value >= 0 ? value.toString() : "N/A";

  return (
    <span className="rating">
      <Star className="rating__icon" />
      {display}
    </span>
  );
}
