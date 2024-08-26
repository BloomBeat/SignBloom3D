import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

function Searchbar({ setSearchbar }) {
  const [input, setInput] = useState('');


  const debouncedSetSearchbar = useCallback(
    debounce((value) => {
      setSearchbar(value);
    }, 200), 
    [setSearchbar]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    debouncedSetSearchbar(value);
  };

  return (
    <input
      className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      placeholder="ค้นหา..."
      value={input}
      onChange={handleChange}
    />
  );
}

export default Searchbar;
