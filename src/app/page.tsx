"use client";

import { gsap, Power2, Power3 } from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Cursor from "./components/Cursor/Cursor";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
    const [cursorType, setCursorType] = useState("");
    const counterRef = useRef(null);
    const [timelineCompleted, setTimelineCompleted] = useState(false);
    const nameLinkCursor = timelineCompleted ? "cursor-pointer" : "cursor-wait";
    const mainCursor = timelineCompleted ? "cursor-default" : "cursor-wait";

    useEffect(() => {
        const cont = { val: 0 };
        const newValue = 100;
        const timeline = gsap.timeline({
            onComplete: () => setTimelineCompleted(true),
        });

        timeline
            .fromTo(
                "#counter-wrapper",
                {
                    opacity: 0,
                    y: 200,
                    skewY: -20,
                    skewX: 10,
                },
                {
                    opacity: 1,
                    y: 0,
                    skewY: 0,
                    skewX: 0,
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
                "#counter-wrapper",
                {
                    opacity: 1,
                    y: 0,
                },
                {
                    y: 160,
                    opacity: 0,
                    duration: 0.5,
                    ease: Power2.easeInOut,
                }
            )
            .fromTo(
                "#intro-text",
                {
                    display: "none",
                },
                {
                    display: "flex",
                }
            )
            .fromTo(
                "#name-wrapper",
                {
                    display: "none",
                },
                {
                    display: "flex",
                }
            )
            .fromTo(
                "#intro-text .intro-word .letter",
                {
                    y: 100,
                    skewY: 20,
                    skewX: -20,
                    x: -10,
                },
                {
                    x: 0,
                    skewY: 0,
                    skewX: 0,
                    stagger: 0.1,
                    y: 0,
                    duration: 0.8,
                    ease: Power3.easeInOut,
                },
                "-=.75"
            )

            .fromTo(
                "#firstname .letter",
                {
                    y: 500,
                    skewY: 20,
                    skewX: -20,
                    x: -10,
                },
                {
                    x: 0,
                    skewY: 0,
                    skewX: 0,
                    stagger: 0.05,
                    y: 0,
                    duration: 1.3,
                    ease: Power3.easeInOut,
                },
                "-=0.7"
            );

        return () => {
            timeline.kill();
        };
    }, []);

    console.log("timelineCompleted = ", timelineCompleted);

    return (
        <div
            className={`w-screen h-screen relative overflow-hidden bg-white ${mainCursor}`}
        >
            <div className="z-10 h-[110px] overflow-hidden absolute right-10 bottom-10 bg-white">
                <div className="w-[300px] h-full relative">
                    <div
                        id="counter-wrapper"
                        className="opacity-0 absolute inset-0 flex items-center justify-end gap-2 text-right"
                    >
                        <h1 ref={counterRef}>0</h1>
                        <h1>%</h1>
                    </div>
                </div>
            </div>

            <div className="w-full h-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 inset-0 bg-white">
                {timelineCompleted && (
                    <Cursor
                        name="name-hover-cursor"
                        width={125}
                        height={125}
                        className="z-10"
                    >
                        <AnimatePresence>
                            {cursorType === "nameHover" && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full text-xl rounded-full z-10 font-semibold text-white flex items-center justify-center text-center overflow-hidden bg-black"
                                >
                                    <span>explore</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Cursor>
                )}

                <div className="w-full h-full relative container flex items-center justify-center">
                    <div className="flex items-end justify-center">
                        <div
                            id="intro-text"
                            className="z-10 text-white mix-blend-difference h-fit hidden flex gap-2 items-center"
                        >
                            <h4 className="intro-word leading-[.8] overflow-hidden pb-10 flex">
                                {Array.from("Pictures").map((letter, index) => (
                                    <div key={index} className="letter">
                                        {letter}
                                    </div>
                                ))}
                            </h4>

                            <h4 className="intro-word leading-[.8] overflow-hidden pb-10 flex">
                                {Array.from("by").map((letter, index) => (
                                    <div key={index} className="letter ">
                                        {letter}
                                    </div>
                                ))}
                            </h4>
                        </div>
                        <Link
                            href="/albums"
                            id="name-wrapper"
                            className={`z-10 text-white  mix-blend-difference h-fit hidden relative flex items-center gap-[2vw] ${nameLinkCursor}`}
                            onMouseEnter={() => setCursorType("nameHover")}
                            onMouseLeave={() => setCursorType("")}
                        >
                            <h1
                                id="firstname"
                                className="leading-[.9] overflow-hidden text-[30vh] flex "
                            >
                                {Array.from("Mick.").map((letter, index) => (
                                    <div key={index} className="letter ">
                                        {letter}
                                    </div>
                                ))}
                            </h1>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
