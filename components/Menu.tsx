"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useMenu } from "@/context/MenuContext";
import gsap from "gsap";
import Link from "next/link";

export default function Menu() {
  const { isOpen } = useMenu();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  // ---- TUNING ----
  const COLS = 12;         // augmente si tu veux + fluide
  const DUR = 0.32;        // durée d’une bande
  const COL_DELAY = 0.06;  // délai entre bandes (cascade)
  const LINKS_IN_EARLY = 0.5; // 0..1 : moment d’apparition des liens
  const LINKS_DUR = 0.28;
  const LINKS_STAG = 0.05;
  // -----------------

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const bands = Array.from(wrapper.querySelectorAll<HTMLDivElement>(".menu-band"));
    const links = Array.from(wrapper.querySelectorAll<HTMLAnchorElement>("nav a"));
    if (bands.length === 0) return;

    // État initial des éléments animés
    gsap.set(bands, {
      scaleY: 0,
      transformOrigin: "top center",
      willChange: "transform",
      backfaceVisibility: "hidden",
      force3D: true,
      z: 0.01,
    });
    gsap.set(links, { opacity: 0, y: 12, willChange: "transform" });

    const totalColsTime = DUR + COL_DELAY * (COLS - 1);
    const linksStart = Math.max(0, totalColsTime * LINKS_IN_EARLY);

    const t = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });
    tl.current = t;

    // OUVERTURE : bandes en cascade gauche → droite
    bands.forEach((band, i) => {
      t.to(band, { scaleY: 1, duration: DUR }, i * COL_DELAY);
    });

    // Apparition des liens
    t.to(
      links,
      { opacity: 1, y: 0, duration: LINKS_DUR, stagger: LINKS_STAG },
      linksStart
    );

    // Quand la fermeture est finie (timeline à 0), on masque le wrapper
    t.eventCallback("onReverseComplete", () => {
      if (!wrapper) return;
      gsap.set(wrapper, { autoAlpha: 0, visibility: "hidden", pointerEvents: "none" });
      document.body.style.overflow = "";
    });

    return () => {
      t.kill();
      tl.current = null;
    };
  }, []);

  // Pilotage ouverture/fermeture sans "set" dans la timeline
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !tl.current) return;

    if (isOpen) {
      // Rendre visible AVANT de jouer l’anim
      gsap.set(wrapper, { autoAlpha: 1, visibility: "visible", pointerEvents: "auto" });
      tl.current.timeScale(1).play(0);
      document.body.style.overflow = "hidden";
    } else {
      // L’eventCallback onReverseComplete cachera le wrapper + rendra le scroll
      tl.current.timeScale(1.15).reverse();
    }
  }, [isOpen]);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-40 overflow-hidden"
      // caché par défaut => évite tout flash au chargement
      style={{ opacity: 0, visibility: "hidden", pointerEvents: "none", contain: "layout paint" }}
    >
      {/* Bandes animées (derrière le contenu) */}
      <div className="absolute inset-0 flex z-[5]">
        {Array.from({ length: COLS }).map((_, i) => (
          <div
            key={i}
            className="menu-band flex-1 bg-primary"
            style={{
              // léger chevauchement pour gommer les seams sub-pixel
              marginRight: i < COLS - 1 ? "-1px" : 0,
              transform: "translateZ(0)",
            }}
          />
        ))}
      </div>

      {/* Contenu au-dessus */}
      <div className="relative z-[10] h-full flex items-center">
        <nav className="ml-10 flex flex-col gap-8 text-7xl md:text-8xl font-satoshi text-background">
          <Link href="/">Home</Link>
          <Link href="#about">About</Link>
          <Link href="#projects">Projects</Link>
          <Link href="#contact">Contact</Link>
        </nav>
      </div>
    </div>
  );
}
