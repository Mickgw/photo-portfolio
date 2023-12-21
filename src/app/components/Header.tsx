import React from "react";

export const Header = () => {
    return (
        <>
            <div className="empty-div relative h-[100px]" />
            <header className="fixed top-0 inset-x-0 h-[100px] bg-black text-white">
                <h4>Header</h4>
            </header>
        </>
    );
};
