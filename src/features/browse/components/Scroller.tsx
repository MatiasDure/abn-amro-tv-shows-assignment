type ScrollProps = {
    children: React.ReactNode,
    scrollRef: React.RefObject<HTMLDivElement | null>
}

export default function Scroller({children, scrollRef} : ScrollProps)  {
    return(
        <div
            ref={scrollRef}
            style={{
                overflowX: "hidden",
                display: "flex",
                gap: "1rem",
                scrollSnapType: "x mandatory",
            }}
        >
            {children}
        </div>
    )
}