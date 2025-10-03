export function CTA() {
  return (
    <section className="bg-primary-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Ready to Share Your Ideas?
        </h2>
        <p className="mt-4 text-xl text-primary-100 max-w-2xl mx-auto">
          Join thousands of innovators who are already sharing their ideas and 
          building the tomorrow today.
        </p>
        <div className="mt-8">
          <a
            href="/app"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-primary-600 bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Start Sharing Ideas →
          </a>
        </div>
      </div>
    </section>
  );
} 
