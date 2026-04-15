export default function Logo() {
  return (
    <div className="relative group cursor-pointer">

      {/* 🌫️ AMBIENT GLOW */}
      <div className="absolute inset-0 rounded-3xl bg-white/10 blur-2xl opacity-30 group-hover:opacity-60 transition duration-500"></div>

      {/* MAIN LOGO */}
      <div
        className="relative w-16 h-16 rounded-3xl 
        bg-gradient-to-br from-white/80 to-white/5 
        backdrop-blur-2xl border border-white/20 
        shadow-[0_10px_40px_rgba(0,0,0,0.25)] 
        flex items-center justify-center 
        transition-all duration-500 
        group-hover:scale-[1.08] group-hover:rotate-[4deg]"
        
        style={{
          animation: "logoFloat 4s ease-in-out infinite",
        }}
      >

        {/* INNER LAYER */}
        <div className="absolute inset-[1px] rounded-3xl 
          bg-gradient-to-br from-white/40 to-transparent opacity-40"></div>

        {/* ⚡ KANBAN BARS (ANIMATED) */}
        <div className="flex gap-[4px] relative z-10">

          <div className="w-1.5 h-6 rounded-full bg-black/80 animate-bar1"></div>
          <div className="w-1.5 h-8 rounded-full bg-black/60 animate-bar2"></div>
          <div className="w-1.5 h-5 rounded-full bg-black/40 animate-bar3"></div>

        </div>

        {/* ✨ LIGHT SWEEP */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 animate-sweep"></div>
        </div>
      </div>
    </div>
  );
}