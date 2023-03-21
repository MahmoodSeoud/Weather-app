import React from "react";
import '../App.css';

interface SearchProps {
    handleKeyDown: (event: any) => void;
    setName: (event: any) => void;
    name: string;
}
function Search(props: SearchProps) {
    
    return (
        <>
            <div>
                <input
                    className="search-input"
                    value={props.name}
                    onChange={(e) => props.setName(e.target.value)}
                    onKeyDown={props.handleKeyDown}
                    placeholder={'Another location'}
                />
                <hr className="search-underscore"></hr>
            </div>
        </>

    );

}

export default Search;
