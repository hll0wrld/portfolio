"use client";

import { useEffect, useRef } from "react";
import { useMenu } from "@/context/MenuContext";
import gsap from "gsap";

export default function HamburgerButton() {
  const { isOpen, toggleMenu } = useMenu();
  const topBar = useRef<HTMLSpanElement>(null);
  const midBar = useRef<HTMLSpanElement>(null);
  const bottomBar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const duration = 0.4;
    const ease = "power3.inOut";
    const barOffset = 11; // Ajuste ici selon ton rendu

    if (isOpen) {
      gsap.to(topBar.current, {
        y: barOffset,
        rotate: 45,
        transformOrigin: "center center", // pivot plus naturel
        duration,
        ease,
      });

      gsap.to(midBar.current, {
        opacity: 0,
        duration: 0.3,
        ease,
      });

      gsap.to(bottomBar.current, {
        y: -barOffset,
        rotate: -45,
        transformOrigin: "center center", // pivot inverse
        duration,
        ease,
      });
    } else {
      gsap.to(topBar.current, {
        y: 0,
        rotate: 0,
        transformOrigin: "center bottom",
        duration,
        ease,
      });

      gsap.to(midBar.current, {
        opacity: 1,
        duration: 0.3,
        ease,
      });

      gsap.to(bottomBar.current, {
        y: 0,
        rotate: 0,
        transformOrigin: "center top",
        duration,
        ease,
      });
    }
  }, [isOpen]);


  const slowColor = "block h-0.5 w-8 rounded bg-primary transition-colors";

  return (
    <button
  onClick={toggleMenu}
  className="relative w-8 h-6 flex flex-col justify-between items-center cursor-pointer z-50"
>
  <span
    ref={topBar}
    className={`${slowColor} ${
      isOpen ? "invert" : "invert-0"
    }`}
  ></span>
  <span
    ref={midBar}
    className={`${slowColor} ${
      isOpen ? "invert" : "invert-0"
    }`}
  ></span>
  <span
    ref={bottomBar}
    className={`${slowColor} ${
      isOpen ? "invert" : "invert-0"
    }`}
  ></span>
</button>
  );
}
