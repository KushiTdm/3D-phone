'use client';

export default function ScrollSequence() {
  return (
    <div>
      <section className="scroll-section" id="seq-1">
        <div className="section-content text-center max-w-3xl px-8">
          <span className="text-sm font-mono text-blue-400 tracking-widest uppercase mb-4 block">
            apparition
          </span>
          <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Neuraweb
          </h2>
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            Une expérience immersive où le scroll devient narration
          </p>
        </div>
      </section>

      <section className="scroll-section" id="seq-2">
        <div className="section-content text-right max-w-2xl px-8 ml-auto mr-12">
          <span className="text-sm font-mono text-green-400 tracking-widest uppercase mb-4 block">
            reduction-gauche
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
            Transformation
          </h2>
          <p className="text-lg text-gray-400">
            Le téléphone se réduit et pivote sur son axe
          </p>
        </div>
      </section>

      <section className="scroll-section" id="seq-3">
        <div className="section-content text-center max-w-3xl px-8">
          <span className="text-sm font-mono text-purple-400 tracking-widest uppercase mb-4 block">
            basculement
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Basculement
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            De la gauche vers la droite, le téléphone traverse l'écran
          </p>
        </div>
      </section>

      <section className="scroll-section" id="seq-4">
        <div className="section-content text-center max-w-3xl px-8">
          <span className="text-sm font-mono text-orange-400 tracking-widest uppercase mb-4 block">
            disparition
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
            L'Aventure Continue
          </h2>
          <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
            Découvrir le projet
          </button>
        </div>
      </section>
    </div>
  );
}