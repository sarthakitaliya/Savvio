
export default function HowItWorks() {
  const steps = [
    {
      title: "Add the Extension",
      description: "Install Savvio with one click. Log in once to sync bookmarks and notes across the extension and dashboard.",
      videoSrc: "/videos/temp.mp4",
    },
    {
      title: "Save Bookmarks & Notes",
      description: "Use the floating button or popup to save links and quick notes from anywhere.",
      videoSrc: "/videos/temp.mp4",
    },
    {
      title: "Organize & Search",
      description: "Access everything on your dashboard. Organize with folders and search instantly.",
      videoSrc: "/videos/temp.mp4",
    },
  ];

  return (
    <section className="mt-10 px-7 sm:p-10 sm:px-6 lg:px-8 space-y-24">
      <div className="text-center">
        <h1 className="text-3xl sm:text-5xl font-bold">How Savvio Works</h1>
        <p className="text-[#696969] text-sm mt-2">Just 3 steps to a more organized digital life.</p>
      </div>

      {steps.map((step, index) => (
        <div
          key={step.title}
          className={`flex flex-col-reverse md:flex-row items-center gap-10 lg:px-20 ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Text */}
          <div className="w-full md:w-1/2 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-lg text-[#5D43E7]"
                style={{ fontFamily: "'Shantell Sans', cursive" }}
              >
                Step {index + 1}
              </span>
            </div>
            <h2 className="text-3xl font-semibold">{step.title}</h2>
            <p className="text-[#696969] text-base">{step.description}</p>
          </div>

          {/* Video */}
          <div className="w-full md:w-1/2">
            <div className="aspect-video bg-gray-100 rounded-xl shadow overflow-hidden">
              <video
                src={step.videoSrc}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
