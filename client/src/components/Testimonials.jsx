import TestimonialCard from "./TestimonialCard";
import { testimonials } from "../assets/assets";

const Testimonials = () => {

  const cards = [...testimonials, ...testimonials];

  return (

    <section className="relative overflow-hidden py-28">

      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-primary/10 blur-[130px]" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-300/10 blur-[140px]" />

      <div className="relative">

        <div className="text-center">

          <span className="rounded-full bg-primary/10 px-5 py-2 text-sm font-semibold text-primary">

            Testimonials

          </span>

          <h2 className="mt-6 text-5xl font-bold tracking-tight">

            Loved by Creators

          </h2>

          <p className="mx-auto mt-5 max-w-xl text-gray-500 leading-7">

            Don't just take our word for it.
            Here's what our customers have to say.

          </p>

        </div>

        <div className="relative mt-20 overflow-hidden">

          <div
            className="
            flex

            gap-7

            w-max

            animate-[scroll_35s_linear_infinite]

            hover:[animation-play-state:paused]
            "
          >

            {cards.map((testimonial, index) => (

              <TestimonialCard

                key={index}

                testimonial={testimonial}

              />

            ))}

          </div>

          <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-linear-to-r from-white to-transparent" />

          <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-linear-to-l from-white to-transparent" />

        </div>

      </div>

    </section>

  );
};

export default Testimonials;