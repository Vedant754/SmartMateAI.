import { Star } from "lucide-react";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div
      className="
      group

      w-97.5
      shrink-0

      rounded-3xl

      border

      border-gray-200/70

      bg-white/80

      backdrop-blur-xl

      p-7

      shadow-[0_10px_40px_rgba(0,0,0,.05)]

      transition-all

      duration-300

      hover:-translate-y-2

      hover:shadow-[0_20px_60px_rgba(99,102,241,.15)]
      "
    >
      <div className="flex gap-1 text-primary">
        {[...Array(testimonial.rating)].map((_, index) => (
          <Star
            key={index}
            size={18}
            fill="currentColor"
          />
        ))}
      </div>

      <p className="mt-6 text-[15px] leading-8 text-gray-600">
        "{testimonial.review}"
      </p>

      <div className="mt-7 border-t border-gray-200 pt-5 flex items-center gap-4">

        <img
          src={testimonial.image}
          className="h-14 w-14 rounded-full object-cover"
        />

        <div>

          <h4 className="font-semibold text-gray-900">
            {testimonial.name}
          </h4>

          <p className="text-sm text-gray-500">
            {testimonial.role}, {testimonial.company}
          </p>

        </div>

      </div>
    </div>
  );
};

export default TestimonialCard;