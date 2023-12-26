"use client";

import { gsap, Power2, Power3 } from "gsap";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cursor from "./components/Cursor/Cursor";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "./components/svgs/ArrowUpRight";

export default function Home() {
    const [cursorType, setCursorType] = useState("");
    const [timelineCompleted, setTimelineCompleted] = useState(false);
    const nameLinkCursor = timelineCompleted ? "cursor-pointer" : "cursor-wait";
    const mainCursor = timelineCompleted ? "cursor-default" : "cursor-wait";
    let timelineNavButton = gsap.timeline({ paused: true });

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
                    display: "flex",
                    y: 200,
                },
                {
                    y: 0,
                    duration: 1,
                    ease: Power2.easeInOut,
                }
            )
            // Minus delay so that the counter and header are shown at the same time
            .fromTo(
                "#header-text",
                {
                    display: "block",
                    y: -100,
                },
                {
                    y: 0,
                    duration: 1,
                    ease: Power2.easeInOut,
                },
                "-=.8"
            )
            .to(cont, {
                duration: 3,
                val: newValue,
                roundProps: { val: 1 },
                onUpdate: function () {
                    const currentElement = document.getElementById("count");

                    if (currentElement) {
                        currentElement.innerHTML = cont.val.toFixed(0);
                    }
                },
            })
            .fromTo(
                "#counter-wrapper",
                {
                    y: 0,
                },
                {
                    y: 160,
                    opacity: 0,
                    duration: 0.8,
                    ease: Power2.easeInOut,
                }
            )
            // Minus delay so that the counter and header are hidden again at the same time
            .fromTo(
                "#header-text",
                {
                    y: 0,
                },
                {
                    y: -100,
                    duration: 0.8,
                    ease: Power2.easeInOut,
                },
                "-=0.8"
            )
            // Completely hide the counter and header
            .to("#counter--container, #header-text", {
                display: "none",
                duration: 0,
            })
            .fromTo(
                "#intro-text, #name-wrapper",
                {
                    display: "none",
                },
                {
                    display: "flex",
                }
            )
            .fromTo(
                "#intro-text #text",
                {
                    skewY: 10,
                    y: 80,
                },
                {
                    skewY: 0,
                    y: 0,
                    duration: 1.3,
                    ease: Power2.easeInOut,
                },
                "-=1"
            )

            .fromTo(
                "#name-wrapper #firstname .letter",
                {
                    y: -50,
                    rotateX: -92,
                    opacity: 0,
                },
                {
                    y: 0,
                    rotateX: 0,
                    opacity: 1,
                    stagger: 0.05,
                    duration: 2,
                    ease: Power3.easeInOut,
                },
                "=-1"
            )

            .fromTo(
                "#nav-button-wrapper",
                {
                    display: "block",
                    y: 20,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: Power3.easeInOut,
                },
                "=-.8"
            );

        return () => {
            timeline.kill();
        };
    }, []);

    return (
        <div
            className={`w-screen h-screen relative overflow-hidden bg-white ${mainCursor}`}
        >
            <div
                id="counter--container"
                className="z-20 overflow-hidden absolute right-8 lg:right-12 bottom-8 lg:bottom-12"
            >
                <div className="w-[300px] h-[45px] sm:h-[60px] lg:h-[110px] overflow-hidden relative">
                    <div
                        id="counter-wrapper"
                        className="absolute leading-[.8] inset-0 hidden flex items-center justify-end gap-2 text-right"
                    >
                        <h1 id="count">0</h1>
                        <h1>%</h1>
                    </div>
                </div>
            </div>

            <div
                id="header-text"
                className="hidden z-20 absolute left-8 lg:left-12 top-8 lg:top-12"
            >
                <h2 className="font-bold leading-[.8]">
                    <span id="text">portfolio 2023</span>
                </h2>
            </div>

            <div></div>

            <div className="z-10 w-full h-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 inset-0 bg-white">
                {timelineCompleted && (
                    <Cursor
                        name="name-hover-cursor"
                        width={200}
                        height={200}
                        className="z-10"
                    >
                        <AnimatePresence>
                            {cursorType === "nameHover" && (
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="w-full h-full z-10 rounded-full font-semibold flex items-center justify-center text-center overflow-hidden text-white bg-black"
                                >
                                    <div className="h-fit flex items-center text-[28px]">
                                        <span>explore</span>
                                        <ArrowUpRight
                                            className="-mb-[7px]"
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Cursor>
                )}
                <div className="h-full relative container flex items-center justify-center">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-center">
                        <h4
                            id="intro-text"
                            className="z-10 hidden text-[24px] lg:text-2xl leading-[.8] overflow-hidden flex xl:mb-8 pb-2 text-white mix-blend-difference"
                        >
                            <span id="text" className="!normal-case">
                                Pictures by
                            </span>
                        </h4>

                        <Link
                            href="/albums"
                            id="name-wrapper"
                            className={`z-10 text-white mix-blend-difference h-fit hidden relative flex items-center gap-[2vw] ${nameLinkCursor}`}
                            onMouseEnter={() => setCursorType("nameHover")}
                            onMouseLeave={() => setCursorType("")}
                        >
                            <h1
                                id="firstname"
                                className=" leading-[.9] !font-bold overflow-hidden text-[12vh] sm:text-[15vh] lg:text-[25vh] xl:text-[28vh] flex text-white"
                            >
                                {Array.from("MICK.").map((letter, index) => (
                                    <div key={index} className="letter">
                                        {letter}
                                    </div>
                                ))}
                            </h1>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="z-20 absolute right-20 bottom-20 w-fit">
                <Link id="nav-button-wrapper" href="/albums" className="hidden">
                    <motion.div
                        whileTap={{ scale: 0.9 }}
                        className="nav-button min-w-[220px] bg-white flex gap-1 items-center justify-center text-black w-fit py-3 text-[20px] px-8 rounded-full border-[1px] border-solid border-black font-semibold hover:bg-black hover:text-white transition-colors duration-300 ease-in-out"
                    >
                        <span>explore</span>
                        <ArrowUpRight
                            className="-mb-[2px]"
                            width={24}
                            height={24}
                        />
                    </motion.div>
                </Link>
            </div>
        </div>
    );
}
