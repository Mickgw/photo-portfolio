import React from "react";

export const LoadingCounter = () => {
    return (
        <div
            id="counter--container"
            className="z-20 overflow-hidden absolute right-8 lg:right-12 bottom-8 lg:bottom-12"
        >
            <div className="w-[300px] h-[45px] sm:h-[60px] lg:h-[110px] overflow-hidden relative">
                <div
                    id="counter-wrapper"
                    className="absolute leading-[.8] inset-0 hidden items-center justify-end gap-2 text-right"
                >
                    <h1 id="count">0</h1>
                    <h1>%</h1>
                </div>
            </div>
        </div>
    );
};
