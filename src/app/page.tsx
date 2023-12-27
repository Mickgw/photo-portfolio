"use client";

import { gsap, Power2, Power3 } from "gsap";
import React, { useEffect, useState } from "react";
import Cursor from "./components/Cursor/Cursor";
import { AnimatePresence } from "framer-motion";
import { CursorElement } from "./components/Home/CursorElement";
import { HeaderText } from "./components/Home/LoadingComponents/InitialLoadingComponents/HeaderText";
import { LoadingCounter } from "./components/Home/LoadingComponents/InitialLoadingComponents/LoadingCounter";
import { NavButton } from "./components/Home/LoadingComponents/FinalLoadingComponents/NavButton";
import { Name } from "./components/Home/LoadingComponents/FinalLoadingComponents/Name";
import { IntroText } from "./components/Home/LoadingComponents/FinalLoadingComponents/IntroText";
import { ImagePlanes } from "./components/Home/ImagesPlanes/ImagePlanes";

export default function Home() {
    const [cursorType, setCursorType] = useState("");
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
                    autoAlpha: 1,
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
                "#header-text #text",
                {
                    display: "block",
                    y: -100,
                },
                {
                    y: 0,
                    duration: 1,
                    ease: Power2.easeInOut,
                },
                "-=1"
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
            .to("#counter--container, #header-text-wrapper", {
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
            <HeaderText />
            <LoadingCounter />

            <div className="z-10 w-full h-full absolute inset-0 bg-white">
                <ImagePlanes />

                <div className="absolute w-full h-full">
                    {timelineCompleted && (
                        <Cursor
                            name="name-hover-cursor"
                            width={200}
                            height={200}
                            className="z-10"
                        >
                            <AnimatePresence>
                                {cursorType === "nameHover" && (
                                    <CursorElement />
                                )}
                            </AnimatePresence>
                        </Cursor>
                    )}
                    <div className="h-full relative container flex items-center justify-center">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-center">
                            <IntroText />
                            <Name
                                onMouseEnter={() => setCursorType("nameHover")}
                                onMouseLeave={() => setCursorType("")}
                                nameLinkCursor={nameLinkCursor}
                            />
                        </div>
                    </div>
                    I
                </div>
            </div>

            <div className="z-20 absolute right-20 bottom-20 w-fit">
                <NavButton />
            </div>
        </div>
    );
}
