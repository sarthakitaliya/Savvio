
export default function HowItWorks() {
  const steps = [
    {
      title: "Add the Extension",
      description: "Install Savvio with one click. Log in once to sync bookmarks and notes across the extension and dashboard.",
      videoSrc: "https://res.cloudinary.com/dc0r1vikq/video/upload/v1755609550/add_to_browser_qmdgt6.mp4",
    },
    {
      title: "Save Bookmarks & Notes",
      description: "Use the floating button or popup to save links and quick notes from anywhere.",
      videoSrc: "https://res.cloudinary.com/dc0r1vikq/video/upload/v1755609105/Add_bookmarks_kx1sbs.mp4",
    },
    {
      title: "Organize & Search",
      description: "Access everything on your dashboard. Organize with folders and search instantly.",
      videoSrc: "https://res.cloudinary.com/dc0r1vikq/video/upload/v1755610301/search_and_organize_hlcnqz.mp4",
    },
  ];

  return (
    <section className=" px-7 sm:p-10 sm:px-6 lg:px-8 space-y-15 md:space-y-24">
      <div className="text-center">
        <h1 className="text-3xl sm:text-5xl font-bold">How Savvio Works</h1>
        <p className="text-[#696969] text-sm mt-1">Just 3 steps to a more organized digital life.</p>
      </div>

      {steps.map((step, index) => (
        <div
          key={step.title}
          className={`flex flex-col-reverse md:flex-row items-center gap-10 lg:px-20 ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Text */}
          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-2 mb-7">
              <span
                className="text-lg text-[#5D43E7]"
                style={{ fontFamily: "'Shantell Sans', cursive" }}
              >
                Step {index + 1}
              </span>
            </div>
            <h2 className="text-3xl font-semibold">{step.title}</h2>
            <p className="text-[#696969] text-base leading-5">{step.description}</p>
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
                preload="none"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
