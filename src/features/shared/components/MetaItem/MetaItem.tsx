import "./MetaItem.scss";

type MetaItemProps = {
  label: string;
  info: string;
};

export default function MetaItem({ label, info }: MetaItemProps) {
  return (
    <li className="meta-item">
      <span className="meta-item__label">{label}:</span>
      <span>{info}</span>
    </li>
  );
}
