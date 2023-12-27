import React from "react";

export const HeaderText = () => {
    return (
        <div
            id="header-text-wrapper"
            className=" z-20 items-center gap-2 absolute left-8 lg:left-12 top-8 lg:top-12"
        >
            <h2
                id="header-text"
                className=" font-bold leading-[.8] overflow-hidden flex items-center"
            >
                <span id="text" className="hidden">
                    23' edition
                </span>
            </h2>
        </div>
    );
};
