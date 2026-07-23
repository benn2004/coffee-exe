'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [scene, setScene] = useState(1);
  const [bgColor, setBgColor] = useState('#09090B'); 

  return (
    <main 
      className="min-h-screen text-white overflow-hidden selection:bg-[#D4A373] selection:text-black font-sans transition-colors duration-1000"
      style={{ backgroundColor: bgColor }}
    >
      <AnimatePresence mode="wait">
        
        {scene === 1 && <SceneOne key="scene1" onComplete={() => setScene(2)} />}
        {scene === 2 && <SceneTwo key="scene2" onComplete={() => setScene(3)} />}
        {scene === 3 && <SceneThree key="scene3" onComplete={() => setScene(4)} onChangeBg={(color) => setBgColor(color)} />}
        {scene === 4 && <SceneFour key="scene4" onComplete={() => setScene(5)} />}
        
        {/* SCENE 5: PLOT TWIST (BACKGROUND PUTIH) */}
        {scene === 5 && (
          <Scene5 
            key="scene5" 
            onComplete={() => setScene(6)} 
            onChangeBg={(color) => setBgColor(color)} 
          />
        )}

        {/* SCENE 6: FOTO LOKALE & PESAN HANGAT */}
        {scene === 6 && <SceneSix key="scene6" onComplete={() => setScene(7)} />}

        {/* SCENE 7: TIMELINE SEDERHANA */}
        {scene === 7 && <SceneSeven key="scene7" onComplete={() => setScene(8)} />}

        {/* SCENE 8: MISSION & INVITATION */}
        {scene === 8 && <SceneEight key="scene8" />}

      </AnimatePresence>
    </main>
  );
}

// === KOMPONEN SCENE 1 (BOOTING) ===
function SceneOne({ onComplete }: { onComplete: () => void }) {
  const [bootStep, setBootStep] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const sequence = async () => {
      await new Promise(res => setTimeout(res, 1000)); setBootStep(1);
      await new Promise(res => setTimeout(res, 1200)); setBootStep(2);
      await new Promise(res => setTimeout(res, 600)); setBootStep(3);
      await new Promise(res => setTimeout(res, 600)); setBootStep(4);
      await new Promise(res => setTimeout(res, 600)); setBootStep(5);
      await new Promise(res => setTimeout(res, 1800)); onComplete(); 
    };
    sequence();
  }, [onComplete]);

  return (
    <motion.div exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }} transition={{ duration: 0.8 }} className="flex flex-col items-start justify-center min-h-screen p-10 md:p-24 font-mono text-sm md:text-base text-gray-400">
      <div className="space-y-5">
        <p className="text-white font-bold text-xl tracking-wider">Coffee.exe</p>
        {bootStep < 2 && <p className="animate-pulse">Initializing...</p>}
        {bootStep >= 1 && (
          <div>
            <p className="text-gray-500 tracking-[0.2em]">{bootStep >= 2 ? "████████████████████" : "████████▒▒▒▒▒▒▒▒▒▒▒▒"}</p>
            {bootStep >= 2 && <p className="mt-2 text-white">100%</p>}
          </div>
        )}
        <div className="space-y-3 mt-6 text-[#D4A373]">
          {bootStep >= 3 && <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>✓ AI Ready</motion.p>}
          {bootStep >= 4 && <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>✓ Coffee Database Loaded</motion.p>}
          {bootStep >= 5 && <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>✓ Recommendation Engine Started</motion.p>}
        </div>
      </div>
    </motion.div>
  );
}

// === KOMPONEN SCENE 2 (GLASS CARD LOKASI) ===
function SceneTwo({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const sequence = async () => {
      await new Promise(res => setTimeout(res, 500)); setStep(1);
      await new Promise(res => setTimeout(res, 1500)); setStep(2);
      await new Promise(res => setTimeout(res, 1500)); setStep(3);
      await new Promise(res => setTimeout(res, 2000)); setStep(4);
    };
    sequence();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.8 }} className="flex flex-col items-center justify-center min-h-screen p-6 space-y-8">
      {step < 2 ? (
        <div className="text-center space-y-4">
          <p className="text-gray-400 animate-pulse tracking-widest uppercase text-sm">Searching nearby coffee shops...</p>
          {step === 1 && <p className="text-gray-500 tracking-[0.2em] font-mono">████████████████</p>}
        </div>
      ) : (
        <div className="w-full max-w-sm md:max-w-md space-y-6">
          {step >= 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl">
              <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest mb-2">Result Found</p>
              <h2 className="text-3xl font-bold text-white tracking-tight mb-1">Lokale Select</h2>
              <p className="text-[#D4A373]">MT Haryono</p>
            </motion.div>
          )}
          {step >= 3 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl shadow-2xl">
              <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest mb-4">Why this place?</p>
              <ul className="space-y-3 text-white/80 font-light">
                {['New', 'Cozy', 'Great Coffee', 'Worth Trying'].map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + (i * 0.2) }} className="flex items-center gap-4">
                    <span className="text-[#D4A373]">✓</span> {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      )}
      {step >= 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="pt-8 flex flex-col items-center gap-2 cursor-pointer group" onClick={onComplete}>
          <span className="text-xs text-gray-500 uppercase tracking-widest group-hover:text-[#D4A373] transition-colors">Tap to continue</span>
          <span className="animate-bounce text-gray-500 group-hover:text-[#D4A373]">↓</span>
        </motion.div>
      )}
    </motion.div>
  );
}

// === KOMPONEN SCENE 3 (FINDING COMPANION) ===
function SceneThree({ onComplete, onChangeBg }: { onComplete: () => void, onChangeBg: (color: string) => void }) {
  const [step, setStep] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasRun = useRef(false); 

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    audioRef.current = new Audio('/ding.mp3');

    const sequence = async () => {
      await new Promise(res => setTimeout(res, 1000)); setStep(1);
      await new Promise(res => setTimeout(res, 2000)); setStep(2);
      await new Promise(res => setTimeout(res, 800)); setStep(3);
      await new Promise(res => setTimeout(res, 800)); setStep(4);
      await new Promise(res => setTimeout(res, 800)); setStep(5);
      await new Promise(res => setTimeout(res, 2500));

      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      onChangeBg('#2A1B14');
      setStep(6);

      await new Promise(res => setTimeout(res, 2000)); setStep(7);
    };
    sequence();
  }, [onChangeBg]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.8 }} className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="text-center space-y-6 w-full max-w-sm">
        {step < 5 && (
          <motion.div exit={{ opacity: 0 }} className="text-gray-400 text-xs md:text-sm tracking-widest uppercase h-8">
            {step === 0 && <span className="animate-pulse">Finding Best Companion...</span>}
            {step >= 1 && <span className="animate-pulse">Analyzing Compatibility...</span>}
          </motion.div>
        )}
        <div className="space-y-4 min-h-[120px] flex flex-col justify-center">
          <AnimatePresence>
            {step >= 2 && step < 6 && <motion.div key="cand-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-green-500/50 font-mono">Unknown ps </motion.div>}
            {step >= 3 && step < 6 && <motion.div key="cand-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-green-500/50 font-mono">Jijaa </motion.div>}
            {step >= 4 && step < 6 && <motion.div key="cand-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-green-500/50 font-mono">Budi </motion.div>}
            {step >= 5 && step < 6 && <motion.div key="cand-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-green-500/50 font-mono">Njiyy </motion.div>}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {step >= 5 && (
            <motion.div key="jija-card" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: 1.5 }} className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(212,163,115,0.15)]">
              <h3 className="text-gray-400 text-xs mb-6 uppercase tracking-widest">Candidate Selected</h3>
              <h1 className="text-5xl font-bold text-white flex items-center justify-center gap-3 mb-8">
                Jija <span className="animate-pulse text-red-500">❤️</span>
              </h1>
              <div className="space-y-4 text-left text-sm md:text-base">
                <div className="flex justify-between text-white/80 border-b border-white/10 pb-3"><span>Coffee Compatibility</span> <span className="font-bold text-[#D4A373]">98%</span></div>
                <div className="flex justify-between text-white/80 border-b border-white/10 pb-3"><span>Conversation</span> <span className="font-bold text-[#D4A373]">100%</span></div>
                <div className="flex justify-between text-white/80"><span>Comfort Level</span> <span className="font-bold text-[#D4A373]">99%</span></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {step >= 6 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="mt-12 flex flex-col items-center gap-2 cursor-pointer group" onClick={onComplete}>
          <span className="text-xs text-white/50 uppercase tracking-widest group-hover:text-white transition-colors">Tap to proceed</span>
          <span className="animate-bounce text-white/50 group-hover:text-white">↓</span>
        </motion.div>
      )}
    </motion.div>
  );
}

// === KOMPONEN SCENE 4 (COFFEE SESSION HISTORY) ===
function SceneFour({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const sequence = async () => {
      await new Promise(res => setTimeout(res, 800)); setStep(1);
      await new Promise(res => setTimeout(res, 1500)); setStep(2);
      await new Promise(res => setTimeout(res, 2000)); setStep(3);
      await new Promise(res => setTimeout(res, 1500)); setStep(4);
    };
    sequence();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.8 }} className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-sm space-y-4">
        {step >= 1 && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex justify-between items-center">
            <span className="text-gray-400 text-sm">☕ Coffee Session</span>
            <span className="text-white font-medium text-sm">Not Recorded</span>
          </motion.div>
        )}
        {step >= 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col justify-center items-center text-center space-y-2">
            <span className="text-gray-400 text-sm uppercase tracking-widest">Last Visit Together</span>
            <span className="text-xl text-white font-semibold">A Few Weeks Ago</span>
          </motion.div>
        )}
        {step >= 3 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#D4A373]/10 border border-[#D4A373]/30 p-6 rounded-2xl text-center mt-8">
            <span className="text-[#D4A373] text-xs uppercase tracking-widest mb-2 block">Recommendation</span>
            <span className="text-2xl text-white font-bold leading-tight block">It&apos;s Time <br />For Another One.</span>
          </motion.div>
        )}
      </div>
      {step >= 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="mt-12 flex flex-col items-center gap-2 cursor-pointer group" onClick={onComplete}>
          <span className="text-xs text-white/50 uppercase tracking-widest group-hover:text-white transition-colors">Tap to continue</span>
          <span className="animate-bounce text-white/50 group-hover:text-white">👇</span>
        </motion.div>
      )}
    </motion.div>
  );
}

// === KOMPONEN SCENE 5 (PLOT TWIST - BACKGROUND PUTIH) ===
function Scene5({ onComplete, onChangeBg }: { onComplete: () => void, onChangeBg: (color: string) => void }) {
  const [step, setStep] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    // Ubah background jadi putih bersih saat masuk scene ini
    onChangeBg('#FFFFFF');

    const sequence = async () => {
      await new Promise(res => setTimeout(res, 800)); setStep(1); // Hi, Jija.
      await new Promise(res => setTimeout(res, 1800)); setStep(2); // Dashboard tadi...
      await new Promise(res => setTimeout(res, 1800)); setStep(3); // sebenarnya cuma alasan...
      await new Promise(res => setTimeout(res, 1800)); setStep(4); // biar kamu tetap scroll... 😂
      await new Promise(res => setTimeout(res, 2000)); setStep(5); // Karena... aku lagi cari cara lebih seru buat ngajak ngopi ☕
      await new Promise(res => setTimeout(res, 1800)); setStep(6); // Tombol lanjut
    };
    sequence();
  }, [onChangeBg]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 1 }} 
      className="flex flex-col items-center justify-center min-h-screen p-6 text-black text-center font-sans"
    >
      <div className="max-w-md space-y-6 text-xl md:text-2xl font-light tracking-tight">
        
        {step >= 1 && (
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="font-semibold text-3xl">
            Hi, Jija.
          </motion.p>
        )}

        {step >= 2 && (
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-gray-600">
            Dashboard tadi...
          </motion.p>
        )}

        {step >= 3 && (
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-gray-600">
            sebenarnya cuma alasan...
          </motion.p>
        )}

        {step >= 4 && (
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-gray-800 font-medium">
            biar kamu tetap scroll sampai sini. <span className="inline-block">😂</span>
          </motion.p>
        )}

        {step >= 5 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-2 text-gray-700">
            <p>Karena...</p>
            <p className="font-normal">aku lagi cari cara yang lebih seru...</p>
            <p className="font-semibold text-black">buat ngajak kamu ngopi. <span className="inline-block">☕</span></p>
          </motion.div>
        )}

      </div>

      {step >= 6 && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-2 cursor-pointer group"
          onClick={onComplete}
        >
          <span className="text-xs text-gray-400 uppercase tracking-widest group-hover:text-black transition-colors">Tap to continue</span>
          <span className="animate-bounce text-gray-400 group-hover:text-black">↓</span>
        </motion.div>
      )}
    </motion.div>
  );
}

// === KOMPONEN SCENE 6 (FOTO & PESAN HANGAT) ===
function SceneSix({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const sequence = async () => {
      await new Promise(res => setTimeout(res, 800)); setStep(1); 
      await new Promise(res => setTimeout(res, 1800)); setStep(2); 
      await new Promise(res => setTimeout(res, 1800)); setStep(3); 
      await new Promise(res => setTimeout(res, 1800)); setStep(4); 
      await new Promise(res => setTimeout(res, 1800)); setStep(5); 
      await new Promise(res => setTimeout(res, 1500)); setStep(6); 
    };
    sequence();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-black bg-white"
    >
      {/* Efek Parallax Sederhana pada Foto */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 2, ease: "easeOut" }}
        className="w-full max-w-md h-64 overflow-hidden rounded-3xl shadow-xl mb-10 relative"
      >
        {/* Pastikan file lokale.jpg ada di folder /public */}
        <img src="/lokale.jpg" alt="Lokale Select" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </motion.div>

      <div className="max-w-md w-full space-y-5 text-lg md:text-xl font-light text-center px-4">
        {step >= 1 && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-gray-500">Katanya...</motion.p>}
        {step >= 2 && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-medium">Lokale Select MT Haryono lagi enak.</motion.p>}
        {step >= 3 && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-gray-600">Aku belum sempat nyoba.</motion.p>}
        {step >= 4 && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-gray-500 mt-6">Dan entah kenapa...</motion.p>}
        {step >= 5 && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-semibold text-2xl text-black">
            orang pertama yang kepikiran buat nemenin ya kamu. <span className="text-red-500 animate-pulse inline-block">❤️</span>
          </motion.p>
        )}
      </div>

      {step >= 6 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="mt-12 flex flex-col items-center gap-2 cursor-pointer group" onClick={onComplete}>
          <span className="text-xs text-gray-400 uppercase tracking-widest group-hover:text-black transition-colors">Tap to continue</span>
          <span className="animate-bounce text-gray-400 group-hover:text-black">↓</span>
        </motion.div>
      )}
    </motion.div>
  );
}

// === KOMPONEN SCENE 7 (TIMELINE) ===
function SceneSeven({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const sequence = async () => {
      await new Promise(res => setTimeout(res, 800)); setStep(1); // Timeline muncul
      await new Promise(res => setTimeout(res, 2000)); setStep(2); // Sesederhana itu
      await new Promise(res => setTimeout(res, 1000)); setStep(3); // Ngopi
      await new Promise(res => setTimeout(res, 1000)); setStep(4); // Ngobrol
      await new Promise(res => setTimeout(res, 1000)); setStep(5); // Terus pulang
      await new Promise(res => setTimeout(res, 1500)); setStep(6); // Tapi biasanya...
      await new Promise(res => setTimeout(res, 1500)); setStep(7); // Hal sederhana...
      await new Promise(res => setTimeout(res, 1000)); setStep(8); // Button
    };
    sequence();
  }, []);

  const timelineItems = [
    { emoji: "☕", label: "Coffee" },
    { emoji: "💬", label: "Random Talks" },
    { emoji: "😂", label: "Laugh" },
    { emoji: "📸", label: "Maybe A Photo" },
    { emoji: "🏠", label: "Go Home" }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 1 }} className="flex flex-col items-center justify-center min-h-screen p-6 bg-white text-black">
      
      {/* Timeline UI */}
      {step >= 1 && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center mb-12">
          {timelineItems.map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.3 }} className="flex flex-col items-center">
                <span className="text-3xl mb-1">{item.emoji}</span>
                <span className="text-xs text-gray-400 font-mono tracking-wider uppercase mb-2">{item.label}</span>
              </motion.div>
              {i !== timelineItems.length - 1 && (
                <motion.div initial={{ height: 0 }} animate={{ height: 24 }} transition={{ delay: (i * 0.3) + 0.1, duration: 0.5 }} className="w-[1px] bg-gray-200 mb-2" />
              )}
            </div>
          ))}
        </motion.div>
      )}

      {/* Teks Pendukung */}
      <div className="max-w-sm text-center space-y-4 text-lg">
        {step >= 2 && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-gray-500">Sesederhana itu kok.</motion.p>}
        {step >= 3 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block text-gray-800 font-medium px-1">Ngopi.</motion.span>}
        {step >= 4 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block text-gray-800 font-medium px-1">Ngobrol.</motion.span>}
        {step >= 5 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block text-gray-800 font-medium px-1">Terus pulang.</motion.span>}
        
        {step >= 6 && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-gray-500 mt-6">Tapi biasanya...</motion.p>}
        {step >= 7 && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-semibold text-xl text-black">hal-hal sederhana justru yang paling enak diingat. ❤️</motion.p>}
      </div>

      {step >= 8 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="mt-10 flex flex-col items-center gap-2 cursor-pointer group" onClick={onComplete}>
          <span className="text-xs text-gray-400 uppercase tracking-widest group-hover:text-black transition-colors">Tap to proceed</span>
          <span className="animate-bounce text-gray-400 group-hover:text-black">↓</span>
        </motion.div>
      )}
    </motion.div>
  );
}

// === KOMPONEN SCENE 8 (MISSION & CLOSING) ===
function SceneEight() {
  const [clicked, setClicked] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const hasRunClick = useRef(false);

  const handleLetGo = () => {
    if (hasRunClick.current) return;
    hasRunClick.current = true;
    setClicked(true);

    const sequence = async () => {
      await new Promise(res => setTimeout(res, 500)); setLoadingStep(1); // Preparing...
      await new Promise(res => setTimeout(res, 1500)); setLoadingStep(2); // 100%
      await new Promise(res => setTimeout(res, 1000)); setLoadingStep(3); // Hide progress
      await new Promise(res => setTimeout(res, 500)); setLoadingStep(4); // Show Final Text
      await new Promise(res => setTimeout(res, 2000)); setLoadingStep(5);
      await new Promise(res => setTimeout(res, 2500)); setLoadingStep(6);
      await new Promise(res => setTimeout(res, 2500)); setLoadingStep(7);
      await new Promise(res => setTimeout(res, 2500)); setLoadingStep(8);
    };
    sequence();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-screen p-6 bg-white text-black relative">
      
      {!clicked ? (
        <motion.div exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-sm flex flex-col items-center">
          {/* Mission Card */}
          <div className="w-full bg-gray-50 border border-gray-100 p-8 rounded-3xl shadow-lg mb-8">
            <p className="text-center text-gray-400 text-xs font-mono uppercase tracking-widest mb-6">Mission</p>
            <h2 className="text-2xl font-bold text-center mb-6">Try New Coffee</h2>
            
            <div className="space-y-4">
              {/* --- LOCATION --- */}
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <span className="text-gray-500 text-sm">Location</span>
                <span className="font-medium text-right flex flex-col">
                  📍 Lokale Select <span className="text-xs text-gray-400">MT Haryono</span>
                </span>
              </div>
              
              {/* --- DATE --- */}
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <span className="text-gray-500 text-sm">Date</span>
                <span className="font-medium text-right flex flex-col">
                  🗓️ Saturday, 25th July 2026 <span className="text-xs text-gray-400">at afternoon</span>
                </span>
              </div>

              {/* --- COMPANION --- */}
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Companion</span>
                <span className="font-medium text-lg text-black">Jija</span>
              </div>
            </div>
          </div>

          {/* Button Let's Go */}
          <div className="group flex flex-col items-center">
            <button 
              onClick={handleLetGo}
              className="bg-black text-white px-10 py-4 rounded-full font-medium text-lg hover:bg-gray-800 transition-all active:scale-95 shadow-xl hover:shadow-2xl"
            >
              ❤️ Let&apos;s Go
            </button>
            <span className="mt-4 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Coffee tastes better with good company.
            </span>
          </div>
        </motion.div>

      ) : (
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center w-full max-w-md text-center px-4">
          
          {/* Confetti Animation */}
          {loadingStep < 3 && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1.5, opacity: 0 }} transition={{ duration: 1.5 }} className="absolute text-6xl">
              🎉
            </motion.div>
          )}

          {loadingStep >= 1 && loadingStep < 3 && (
            <div className="font-mono text-gray-500 flex flex-col items-center space-y-4">
              <p className="animate-pulse">Preparing Coffee...</p>
              <p className="tracking-[0.2em]">{loadingStep >= 2 ? "████████████████████" : "██████████▒▒▒▒▒▒▒▒▒▒"}</p>
              {loadingStep >= 2 && <p className="text-black font-bold">100%</p>}
            </div>
          )}

          {/* FINAL MESSAGE */}
          {loadingStep >= 4 && (
            <div className="space-y-6">
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-gray-400 text-sm mb-12">Coffee.exe</motion.p>
              
              <div className="space-y-6 text-lg font-light text-gray-700">
                {loadingStep >= 5 && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>Makasih udah scroll sampai bawah.</motion.p>}
                
                {loadingStep >= 6 && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>Semoga ini jadi cara paling random...</motion.p>}
                
                {loadingStep >= 7 && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>yang pernah dipakai seseorang...</motion.p>}
                
                {loadingStep >= 8 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <p>buat ngajak kamu ngopi. 😂</p>
                    <div className="w-12 h-[1px] bg-gray-300 mx-auto my-6"></div>
                    <p className="font-medium text-black">Kalau kamu lagi ada waktu minggu ini...</p>
                    <p className="font-bold text-2xl text-black">yuk nyobain Lokale Select bareng. ❤️</p>
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      )}

    </motion.div>
  );
}