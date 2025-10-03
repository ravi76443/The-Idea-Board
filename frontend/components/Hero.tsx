export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 pt-16 pb-20 sm:pt-24 sm:pb-32">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Share Your
          <span className="block text-primary-200">Brilliant Ideas</span>
        </h1>
        
        <p className="mt-6 text-xl sm:text-2xl text-primary-100 max-w-3xl mx-auto">
          Join a community of innovators, entrepreneurs, and creative minds. 
          Share your ideas, get feedback, and see which concepts resonate with others.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/app"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-primary-600 bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Start Sharing Ideas
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center px-8 py-4 border border-white text-lg font-medium rounded-lg text-white hover:bg-white hover:text-primary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
