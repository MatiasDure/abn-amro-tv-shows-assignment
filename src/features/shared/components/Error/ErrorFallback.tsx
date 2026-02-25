import { TriangleAlert } from "lucide-react";
import "./ErrorFallback.scss";

type ErrorFallbackProps = {
  message: string;
};

export function ErrorFallback({ message }: ErrorFallbackProps) {
  return (
    <div className="error" data-testid="error">
      <TriangleAlert className="error__icon" />
      <span className="error__text">{message}</span>
    </div>
  );
}
