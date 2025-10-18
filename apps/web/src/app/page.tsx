export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-900 via-purple-900 to-secondary-900">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-primary-500 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-secondary-500 blur-3xl animation-delay-2000" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <h1 className="mb-4 text-6xl font-bold text-white md:text-8xl">
            InnovateX <span className="text-primary-400">2025</span>
          </h1>
          <p className="mb-2 text-xl text-gray-300 md:text-2xl">
            College of Engineering
          </p>
          <p className="mb-8 text-lg text-gray-400">
            Build. Innovate. Transform.
          </p>

          {/* Countdown Timer */}
          <div className="mb-12 flex justify-center gap-4">
            <CountdownBox value="45" label="Days" />
            <CountdownBox value="12" label="Hours" />
            <CountdownBox value="34" label="Minutes" />
            <CountdownBox value="56" label="Seconds" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/register"
              className="rounded-lg bg-primary-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-primary-700 hover:scale-105"
            >
              Register Now
            </a>
            <a
              href="/about"
              className="rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white hover:text-primary-900"
            >
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 flex justify-center gap-8">
            <StatBox value="500+" label="Participants" />
            <StatBox value="₹10L" label="Prize Pool" />
            <StatBox value="48hrs" label="Duration" />
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="bg-black/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon="🚀"
              title="Innovation"
              description="Build cutting-edge solutions to real-world problems"
            />
            <FeatureCard
              icon="🤝"
              title="Collaboration"
              description="Team up with talented developers and designers"
            />
            <FeatureCard
              icon="🏆"
              title="Win Big"
              description="Compete for amazing prizes and recognition"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function CountdownBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
      <div className="text-4xl font-bold text-white">{value}</div>
      <div className="text-sm text-gray-300">{label}</div>
    </div>
  );
}

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10">
      <div className="mb-4 text-5xl">{icon}</div>
      <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
