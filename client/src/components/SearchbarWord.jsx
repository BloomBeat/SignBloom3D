import React, { useState } from 'react';
import api from "../hooks/api"
import { useNavigate, useLocation } from "react-router-dom" 

const SearchBar = ({ placeholder = 'ค้นหาท่าภาษามือ', onSearch }) => {

    const [query, setQuery] = useState('');
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };
    const handleSearch = () => {
        if (onSearch) {
            onSearch(query);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    const navigate = useNavigate() // for React Router v6
    const location = useLocation() // Get the current location

    return (
        <div style={styles.container}>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                style={styles.input}
            />
            <button onClick={handleSearch} style={styles.button}>
                Search
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px 0',
    },
    input: {
        width: '300px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px 0 0 4px',
        border: '1px solid #ccc',
        borderRight: 'none',
        outline: 'none',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '0 4px 4px 0',
        border: '1px solid #ccc',
        borderLeft: 'none',
        cursor: 'pointer',
        backgroundColor: '#007BFF',
        color: '#fff',
        outline: 'none',
    }
};

export default SearchBar;
