
export default function HowItWorks() {
  const steps = [
    {
      title: "Add the Extension",
      description:
        "Install Savvio with one click. Log in once to sync bookmarks and notes across the extension and dashboard.",
      videoSrc:
        "https://res.cloudinary.com/dc0r1vikq/video/upload/f_auto,q_auto/v1755614332/add_to_browser_cmp_kiplxf.mp4",
      poster:
        "https://res.cloudinary.com/dc0r1vikq/video/upload/f_auto,q_auto/v1755614332/add_to_browser_cmp_kiplxf.jpg",
    },
    {
      title: "Save Bookmarks & Notes",
      description:
        "Use the floating button or popup to save links and quick notes from anywhere.",
      videoSrc:
        "https://res.cloudinary.com/dc0r1vikq/video/upload/f_auto,q_auto/v1755614339/Add_bookmarks_cmp_u7fswn.mp4",
      poster:
        "https://res.cloudinary.com/dc0r1vikq/video/upload/f_auto,q_auto/v1755614339/Add_bookmarks_cmp_u7fswn.jpg",
    },
    {
      title: "Organize & Search",
      description:
        "Access everything on your dashboard. Organize with folders and search instantly.",
      videoSrc:
        "https://res.cloudinary.com/dc0r1vikq/video/upload/f_auto,q_auto/v1755614335/search_and_organize_cmp_vj1wsf.mp4",
      poster:
        "https://res.cloudinary.com/dc0r1vikq/video/upload/f_auto,q_auto/v1755614335/search_and_organize_cmp_vj1wsf.jpg",
    },
  ];

  return (
    <section className=" px-7 sm:p-10 sm:px-6 lg:px-8 space-y-15 md:space-y-24">
      <div className="text-center">
        <h1 className="text-3xl sm:text-5xl font-bold">How Savvio Works</h1>
        <p className="text-[#696969] text-sm mt-1">
          Just 3 steps to a more organized digital life.
        </p>
      </div>

      {steps.map((step, index) => (
        <Step key={step.title} step={step} index={index} />
      ))}
    </section>
  );
}

function Step({ step, index }: { step: any; index: number }) {

  return (
    <div
      className={`flex flex-col-reverse md:flex-row items-center gap-10 lg:px-20 ${
        index % 2 !== 0 ? "md:flex-row-reverse" : ""
      }`}
    >

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

      <div className="w-full md:w-1/2">
        <div className="aspect-video bg-gray-100 rounded-xl shadow overflow-hidden relative">
            <video
              src={step.videoSrc}
              poster={step.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className={`w-full h-full object-cover transition-opacity duration-700`}
            />
        </div>
      </div>
    </div>
  );
}
