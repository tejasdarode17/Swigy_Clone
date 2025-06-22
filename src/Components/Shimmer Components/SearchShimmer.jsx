import React from 'react'

const SearchShimmer = () => {
    return (
        <div className="w-[60%] mx-auto">
            <div className="w-full grid grid-cols-2 gap-10 p-5 my-5">
                {Array(10).fill(0).map((_, i) => (
                    <div
                        key={i}
                        className="h-60 rounded-2xl bg-gray-300 myAnimation"
                    ></div>
                ))}
            </div>
        </div>
    );
};


export default SearchShimmer


