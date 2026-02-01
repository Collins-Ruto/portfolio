import Image from "next/image";

export default function AboutPhoto() {
  const photoPath = "/img/grad3.webp";

  return (
    <div className="group relative -mr-4 h-[32rem] w-full bg-transparent md:mr-0 md:h-[42rem] lg:w-1/2">
      {/* 1. LAYER 0: THE ACCENT FOUNDATION (Indigo Strip) */}
      <div
        className="rounde-2xl absolute inset-0 z-0 bg-slate-300
                   transition-all duration-700 dark:bg-indigo-600/30"
        style={{
          // Move it down and left
          transform: "translate(-10px, 10px)",
          // Wider polygon for a more substantial "strip" look
          clipPath: "polygon(0 100%, 60% 100%, 0 40%)",
        }}
      />

      {/* 2. LAYER 1: THE DARK BASE (Clipped 15% on the right) */}
      <div
        className="rounde-2xl absolute inset-0 z-10 overflow-hidden bg-zinc-950 shadow-xl transition-transform duration-700"
        style={{
          // This creates the gap on the right for the "float"
          clipPath: "inset(5% 15% 0 0)",
        }}
      >
        <Image
          src={photoPath}
          fill
          alt="Background"
          className="object-cover brightness-[0.7] contrast-[1.1] grayscale transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.20] mix-blend-overlay" />
      </div>

      {/* 2. THE FLOATING COLOR SQUARE (Top-Right) */}
      {/* This layer is NOT clipped on the right, so it "hangs" over the edge */}
      <div
        className="rounde-xl absolute inset-0 z-20 overflow-hidden shadow-2xl transition-all duration-700 ease-in-out"
        style={{
          // This defines the size of the clear square.
          // Because the layer below is shorter, this will look like it's floating.
          clipPath: "inset(0% 8% 35% 18%)",
        }}
      >
        <Image
          src={photoPath}
          fill
          alt="Color Spotlight"
          className="object-cover brightness-110 saturate-[1.2] transition-transform duration-700 group-hover:scale-110"
        />
        {/* Subtle border to define the floating edge */}
        <div className="absolute inset-0 border-r border-t border-white/20" />
      </div>

      {/* 3. FLOATING TECH ACCENTS */}
      {/* Positioned in that empty 10% gap to emphasize the float */}
      <div className="absolute right-2 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-4">
        <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        <span className="font-mono text-[10px] tracking-widest text-blue-500/50 [writing-mode:vertical-rl]">
          GRAD_ENG_01
        </span>
      </div>

      {/* 4. TEXT CONTENT */}
      <div className="absolute bottom-10 left-5 z-30 md:left-10">
        <h2 className="text-2xl font-black leading-tight tracking-tighter text-white drop-shadow-2xl md:text-3xl">
          SOFTWARE <br />
          <span className="text-blue-500">ENGINEER</span>
        </h2>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-zinc-400">
          FRONTEND • SYSTEMS • BACKEND
        </p>
      </div>

      {/* Corner Viewfinders */}
      <div className="absolute left-4 top-10 z-30 h-4 w-4 border-l-2 border-t-2 border-white/30" />
      <div className="absolute bottom-4 right-[4.5rem]  z-30 h-4 w-4 border-b-2 border-r-2 border-white/30 md:right-[6rem]" />
    </div>
  );
}
