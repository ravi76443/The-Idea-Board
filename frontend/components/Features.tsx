export function Features() {
  const features = [
    {
      title: 'Share Ideas',
      description: 'Post your innovative thoughts and concepts in a clean, intuitive interface. Perfect for capturing those lightbulb moments.',
      icon: '💡',
    },
    {
      title: 'Community Voting',
      description: 'Let the community decide which ideas have the most potential. Cast votes to show support for promising concepts.',
      icon: '🗳️',
    },
    {
      title: 'Real-time Updates',
      description: 'See ideas and votes appear instantly. No refreshing needed - everything updates automatically as it happens.',
      icon: '⚡',
    },
    {
      title: 'Simple & Clean',
      description: 'Focus on ideas, not complexity. Our minimalist design keeps you focused on what matters most - your creativity.',
      icon: '🎨',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Why Choose Idea Board?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            A platform built for thinkers, makers, and innovators who want to 
            share ideas and build something amazing together.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-primary-100 text-4xl">
                <span aria-hidden="true">{feature.icon}</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
