import { Search, X } from "lucide-react"
import { useRef, useState } from "react";

type SearchBarProps = {
    input: string,
    placeholder: string,
    isFocused: boolean,
    onChange: (value: string) => void,
    onClear: () => void,
    onCancel: () => void,
    onFocus: () => void,
}

export default function SearchBar({input, placeholder, isFocused, onChange, onClear, onFocus, onCancel} : SearchBarProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleSearchBarClicked = () => {
        if(!inputRef.current) return;

        inputRef.current.focus();
        onFocus();
    }

    return (
        <div style={{display: "flex", gap: 16, border: "1px solid gray", padding: 8, borderRadius: 20, alignItems:"center", height: 42}}>
            <div
                style={{flex: 1, display: "flex", gap: 16, alignItems: "center"}}
                onClick={handleSearchBarClicked}
            >
                <Search
                    size={20}
                    strokeWidth={1.5}
                    color="Gray"
                    />
                <input
                    ref={inputRef}
                    value={input}
                    style={{border: "none", outline: "none", flex: 1}}
                    placeholder={placeholder}
                    onChange={e => onChange(e.target.value)}
                    onBlur={e => e.preventDefault()}
                />
            </div>
            {
                input.length > 0 && 
                <X 
                    onClick={onClear}
                />
            }
            {
                isFocused && 
                <button
                    onClick={onCancel}
                >
                    cancel
                </button>
            }
        </div>
    )
}