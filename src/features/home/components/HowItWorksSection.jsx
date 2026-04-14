const steps = [
  {
    number: "1",
    icon: "/home/Vector.png",
    title: "Choose Location",
    description:
      "Enter your delivery address or postal code to see which menus are available in your area for office or home delivery",
  },
  {
    number: "2",
    icon: "/home/Vector-1.png",
    title: "Browse Menus",
    description:
      "Browse our varied menu options. Pick from flexible corporate lunch plans or delicious catering packages for your private events",
  },
  {
    number: "3",
    icon: "/home/Vector-2.png",
    title: "Get Delivered",
    description:
      "Sit back and relax. Our team delivers fresh, chef-prepared meals directly to your door, exactly when you need them",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-20 lg:py-14">
      <div className="mx-auto w-full max-w-7xl">
        <p className="mb-6 text-center text-3xl font-black uppercase tracking-tight text-black sm:mb-8 sm:text-5xl lg:text-[48px]">
          How It Works
        </p>

        <div
          className="overflow-hidden rounded-[28px] bg-cover bg-center shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.28), rgba(0,0,0,0.28)), url('/home/bg-image.png')",
          }}
        >
          <div className="px-4 py-10 sm:px-6 sm:py-14 lg:px-6 lg:py-40">
            <div className="grid gap-5 md:grid-cols-2 lg:items-end xl:grid-cols-3 xl:gap-8">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="relative rounded-[20px] bg-white px-4 pb-5 pt-8 text-center text-black shadow-[0_16px_28px_rgba(0,0,0,0.16)] sm:px-5 sm:pb-6 sm:pt-9 lg:min-h-[210px] lg:px-4 lg:pb-5 lg:pt-7"
                >
                  <img
                    src={step.icon}
                    className="mx-auto mb-3 h-9 w-auto sm:h-10 lg:h-9"
                    alt=""
                  />

                  <p className="type-h3 mt-3 mb-2 text-[22px] sm:text-[24px] lg:text-[28px]">
                    {step.title}
                  </p>

                  <p className="type-para mx-auto max-w-[34ch] text-sm leading-6 sm:text-base lg:max-w-[30ch]">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
