import { Search, X } from "lucide-react"
import { useRef } from "react";
import "./SearchBar.scss"

type SearchBarProps = {
    input: string,
    placeholder: string,
    isFocused: boolean,
    onChange: (value: string) => void,
    onCancel: () => void,
    onFocus: () => void,
}

export default function SearchBar({input, placeholder, isFocused, onChange, onFocus, onCancel} : SearchBarProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleSearchBarClicked = () => {
        if(!inputRef.current) return;

        inputRef.current.focus();
        onFocus();
    }

    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <div
                    className="search-bar__input-container"
                    onClick={handleSearchBarClicked}
                    >
                    <Search
                        size={20}
                        strokeWidth={1.5}
                        color="Gray"
                    />
                    <input
                        className="search-bar__input"
                        ref={inputRef}
                        value={input}
                        placeholder={placeholder}
                        onChange={e => onChange(e.target.value)}
                        onBlur={e => e.preventDefault()}
                    />
                </div>
                {
                    isFocused &&
                    <button
                        className="search-bar__clear-button"
                        onClick={onCancel}
                    >
                        <X/>
                    </button> 
                }
            </div>
        </div>
    )
}