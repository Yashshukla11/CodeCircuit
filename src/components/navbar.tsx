import gsap from "gsap";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";

import { LINKS, NAV_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";

import { Button } from "./button";

export const Navbar = () => {
  const navContainerRef = useRef<HTMLDivElement>(null);
  const audioElementRef = useRef<HTMLAudioElement>(null);

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(false);

  const { y: currentScrollY } = useWindowScroll();

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prevAudioPlaying) => !prevAudioPlaying);
    setIsIndicatorActive((prevIndicatorActive) => !prevIndicatorActive);
  };

  useEffect(() => {
    if (isAudioPlaying) void audioElementRef.current?.play();
    else audioElementRef.current?.pause();
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.fromTo(
      navContainerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
    );
  }, []);

  return (
    <header
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none backdrop-blur-md bg-black/30 transition-all duration-700 sm:inset-x-6"
    >
      <div className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <a href="#hero" className="transition-transform hover:scale-110 hover:shadow-lg duration-300">
              <img src="/img/logo.png" alt="Logo" className="w-10" />
            </a>

            <Button
              id="product-button"
              rightIcon={TiLocationArrow}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1 transition-transform duration-300 hover:scale-105 hover:bg-yellow-300"
            >
              Products
            </Button>
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {NAV_ITEMS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="nav-hover-btn group relative overflow-hidden px-3 py-1"
                >
                  <span className="relative z-10">{label}</span>
                  <span className="absolute left-0 bottom-0 h-0.5 w-full scale-x-0 bg-yellow-300 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleAudioIndicator}
                className={cn(
                  "ml-10 flex items-center space-x-1 p-2 transition hover:opacity-75",
                  isIndicatorActive && "animate-pulse-audio"
                )}
                title="Play Audio"
              >
                <audio
                  ref={audioElementRef}
                  src="/audio/loop.mp3"
                  className="hidden"
                  loop
                />

                {Array(4)
                  .fill("")
                  .map((_, i) => {
                    return (
                      <div
                        key={i + 1}
                        className={cn(
                          "indicator-line",
                          isIndicatorActive && "active"
                        )}
                        style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                      />
                    );
                  })}
              </button>

              <a
                href={LINKS.sourceCode}
                target="_blank"
                rel="noreferrer noopener"
                className="transition-transform hover:rotate-12 hover:scale-125 duration-300"
                title="Source Code"
              >
                <FaGithub className="size-5 text-white" />
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
