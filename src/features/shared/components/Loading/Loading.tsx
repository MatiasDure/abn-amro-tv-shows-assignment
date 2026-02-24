import "./Loading.scss";

export function Loading() {
  return (
    <div className="loading">
      <div className="loading__spinner" />
      <span className="loading__text">Loading…</span>
    </div>
  );
}
