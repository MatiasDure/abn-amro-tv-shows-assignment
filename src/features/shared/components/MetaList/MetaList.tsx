import type { MetaInfo } from "../../types/metaInfo";
import MetaItem from "../MetaItem/MetaItem";
import "./MetaList.scss"

type Props = {
  metaListItems: MetaInfo[];
};

export function MetaList({ metaListItems }: Props) {
  return (
    <ul className="meta-list">
        {
            metaListItems.map(li => <MetaItem key={li.label} label={li.label} info={li.info} />)
        }
    </ul>
  );
}
