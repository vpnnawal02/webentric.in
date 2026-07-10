import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { images } from "../assets/imgs/assets.js"
import vid_1 from "../assets/videos/vid-1.mp4"
import vid_2 from "../assets/videos/vid-2.mp4"

const Hero = () => {
  return (
    <section className="bg-black text-white border-t border-white/10">
      <div className="w-full">
        {/* Top layout */}
        <div className="flex flex-col-reverse md:flex-row justify-center lg:gap-30 border-b border-white/40 lg:h-[50vh]">

          {/* Left intro block | Lower Block for Mobile */}
          <div className="border-b lg:border-b-0 lg:border-r border-white/40 px-5 sm:px-8 lg:px-10 py-10 sm:py-12 lg:py-14 flex items-center">
            <div className="max-w-[360px]">
              <p className="text-white/70 text-[18px] leading-6 mb-5 sm:mb-6">
                We’re a full-service website design and development agency crafting modern
                brands, websites, and products that drive results.
              </p>
              <Link to='/contact'>
                <button className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 text-sm font-medium hover:bg-neutral-200 transition-all duration-300">
                  Get Started
                  <FiArrowUpRight size={14} />
                </button></Link>

            </div>
          </div>

          {/* Right intro block | Upper Block for Mobile */}
          <div className="px-5 sm:px-8 lg:px-12 py-12 sm:py-14 lg:py-16 flex items-center">
            <div className="max-w-[560px]">
              <h1 className="text-[40px] md:text-[60px] text-left leading-[0.98] tracking-[-0.05em] font-medium">
                Your Next Great
                <br />
                Design Partnership
              </h1>
            </div>
          </div>
        </div>

        {/* Bottom cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          {/* Card 1 */}
          <article className="group border-b lg:border-b-0 lg:border-r border-white/30 lg:px-20">
            <div className="px-5 sm:px-8 lg:px-10 py-4 border-b border-white/20">
              <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-white/70 border border-white/20 px-3 py-1">
                Web Development
              </span>
              <span className="inline-block ml-2 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-white/70 border border-white/20 px-3 py-1">
                UX/UI Design
              </span>
            </div>

            <div className="relative overflow-hidden flex justify-center">
              <video controls autoPlay muted playsInline loop
                className="w-full h-auto"
              >
                <source src={vid_1} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute left-5 sm:left-8 bottom-5 sm:bottom-7 right-5 flex items-end justify-between gap-4">
                <h2 className="text-2xl sm:text-3xl leading-[1.02] tracking-[-0.04em] font-medium max-w-[260px]">
                  See About this
                  <br />
                  Project
                </h2>
                <Link to='/portfolio'>
                  <button className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-black flex items-center justify-center shrink-0 hover:scale-105 transition">
                    <FiArrowUpRight size={16} />
                  </button>
                </Link>

              </div>
            </div>
          </article>

          {/* Card 2 */}
          <article className="group border-white/20 lg:px-20">
            <div className="px-5 sm:px-8 lg:px-10 py-4 ">
              <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-white/70 border border-white/20 px-3 py-1">
                Brand Identity
              </span>
              <span className="inline-block ml-2 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-white/70 border border-white/20 px-3 py-1">
                Web Development
              </span>
            </div>

            <div className="relative overflow-hidden">
              <video controls autoPlay muted playsInline loop
                className="w-full h-auto"
              >
                <source src={vid_2} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute left-5 sm:left-8 bottom-5 sm:bottom-7 right-5 flex items-end justify-between gap-4">
                <h2 className="text-2xl sm:text-3xl leading-[1.02] tracking-[-0.04em] font-medium max-w-[260px]">
                  See About this
                  <br />
                  Project
                </h2>

                <Link to='/portfolio'>
                  <button className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-black flex items-center justify-center shrink-0 hover:scale-105 transition">
                    <FiArrowUpRight size={16} />
                  </button>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Hero;