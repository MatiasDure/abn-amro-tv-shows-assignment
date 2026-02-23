import type { Show } from "../../../shared/types/show"

type ShowCardProps = {
    show: Show,
    onCardClicked: (show: Show) => void
}

export default function ShowCard({show, onCardClicked} : ShowCardProps) {
    return (
        <div
            style={{
                position: "relative",
                scrollSnapAlign: "start"
            }}
        >
            <button
                onClick={() => onCardClicked(show)}
                style={{ border: "none", background: "none" }}
                >
                <img src={show.ImageUrl} />
            </button>
            <span
                style={{
                    position: "absolute",
                    bottom: 30,
                    left: 0,
                    fontSize: 28,
                    backgroundColor: "rgba(0,0,0,0.7)",
                    color: "white",
                    padding: 12,
                    borderRadius: 8
                }}
                >
                ⭐ {show.Rating}
            </span>
        </div>
    )
}