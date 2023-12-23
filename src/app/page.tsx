"use client";

import { gsap, Power2 } from "gsap";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import CursorContextProvider, {
    CursorContext,
} from "./components/Cursor/context/CursorContext";
import Cursor from "./components/Cursor/Cursor";

export default function Home() {
    const [cursorType, setCursorType] = useState("");
    const counterRef = useRef(null);

    useEffect(() => {
        const cont = { val: 0 };
        const newValue = 100;
        const timeline = gsap.timeline();

        timeline
            .fromTo(
                ".counter-wrapper",
                {
                    opacity: 0,
                    y: 160,
                    skewY: -20,
                },
                {
                    opacity: 1,
                    y: 0,
                    skewY: 0,
                    duration: 0.5,
                    ease: Power2.easeInOut,
                }
            )
            .to(cont, {
                duration: 3,
                val: newValue,
                roundProps: { val: 1 },
                onUpdate: function () {
                    const currentRef =
                        counterRef.current as HTMLDivElement | null;

                    if (currentRef) {
                        currentRef.innerHTML = cont.val.toFixed(0);
                    }
                },
            })
            .fromTo(
                ".counter-wrapper",
                {
                    opacity: 1,
                },
                {
                    opacity: 0,
                    duration: 0.5,
                    ease: Power2.easeInOut,
                }
            )
            .fromTo(
                ".name",
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                }
            );

        return () => {
            timeline.kill();
        };
    }, []);

    console.log("cursorType = ", cursorType);

    return (
        <CursorContextProvider>
            {cursorType === "nameHover" && (
                <Cursor
                    name="name-hover-cursor"
                    width={125}
                    height={125}
                    className="z-10"
                >
                    <div className="w-full h-full text-xl rounded-full z-10 text-white flex items-center justify-center text-center overflow-hidden bg-red-600">
                        explore
                    </div>
                </Cursor>
            )}

            <div className="w-screen h-screen relative overflow-hidden">
                <div className="h-[150px] overflow-hidden absolute right-10 bottom-10 ">
                    <div className="w-[300px] h-full relative">
                        <div className="counter-wrapper opacity-0 absolute inset-0 flex items-center justify-end gap-2 text-right">
                            <h1 ref={counterRef}>0</h1>
                            <h1>%</h1>
                        </div>
                    </div>
                </div>

                <div className="w-full h-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 inset-0">
                    <div className="w-full h-full container flex items-center justify-center">
                        <Link
                            href="/albums"
                            className="h-fit"
                            onMouseEnter={() => setCursorType("nameHover")}
                            onMouseLeave={() => setCursorType("")}
                        >
                            <h1 className="name leading-[.8] overflow-hidden opacity-0 text-[17vh] text-center">
                                <span className="letter">M</span>
                                <span className="letter">i</span>
                                <span className="letter">c</span>
                                <span className="letter">k</span>

                                <span className="letter">W</span>
                                <span className="letter">a</span>
                                <span className="letter">a</span>
                                <span className="letter">n</span>
                                <span className="letter">d</span>
                                <span className="letter">e</span>
                                <span className="letter">r</span>
                                <span className="letter">s</span>
                            </h1>
                        </Link>
                    </div>
                </div>
            </div>
        </CursorContextProvider>
    );
}
