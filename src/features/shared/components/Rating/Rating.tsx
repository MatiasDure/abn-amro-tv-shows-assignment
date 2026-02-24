import { Star } from "lucide-react";
import "./Rating.scss";

type RatingProps = {
  value: string;
};

export function Rating({ value }: RatingProps) {
  return (
    <span className="rating">
      <Star className="rating__icon" />
      {value}
    </span>
  );
}
