import { Fragment } from 'react';

function Searchbar({ setSearchbar }) {
    return (
        <>
            <input
                className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="ค้นหา..."
                onChange={(e) => setSearchbar(e.target.value)}
            />
        </>
    );
}

export default Searchbar;
