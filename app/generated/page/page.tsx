import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 flex flex-col items-center justify-center p-8">
      <h1 className="text-6xl font-extrabold text-white drop-shadow-lg mb-6 font-serif tracking-wide">
        Discover & Inspire
      </h1>
      <p className="max-w-xl text-center text-white text-lg mb-12 font-light">
        Aesthetic ideas and curated collections that spark your creativity. Dive into endless inspiration crafted for your vision.
      </p>
      <button className="px-8 py-3 bg-white bg-opacity-80 hover:bg-opacity-100 text-indigo-700 font-semibold rounded-lg shadow-lg transition-all duration-300">
        Explore Now
      </button>
      <div className="mt-16 grid grid-cols-3 gap-6 max-w-5xl w-full">
        {[
          '/images/aesthetic1.jpg',
          '/images/aesthetic2.jpg',
          '/images/aesthetic3.jpg',
          '/images/aesthetic4.jpg',
          '/images/aesthetic5.jpg',
          '/images/aesthetic6.jpg',
        ].map((src, idx) => (
          <div key={idx} className="overflow-hidden rounded-xl shadow-lg">
            <img
              src={src}
              alt={`Inspiration ${idx + 1}`}
              className="object-cover w-full h-48 hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default LandingPage;
