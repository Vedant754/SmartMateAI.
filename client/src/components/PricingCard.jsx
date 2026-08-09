import { Check } from "lucide-react";

const PricingCard = ({ plan }) => {
  const Icon = plan.icon;

  return (
    <div
      className={`
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        p-6
        lg:p-7
        transition-all
        duration-300
        hover:-translate-y-2

        ${
          plan.popular
            ? "border-primary bg-white scale-[1.03] shadow-[0_20px_60px_rgba(99,102,241,0.15)]"
            : "border-gray-200/80 bg-white hover:border-primary/40 hover:shadow-[0_16px_45px_rgba(0,0,0,0.08)]"
        }
      `}
    >
      {/* Popular Badge */}

      {plan.popular && (
        <span
          className="
            absolute
            right-5
            top-5
            rounded-full
            bg-primary
            px-3
            py-1
            text-[11px]
            font-semibold
            uppercase
            tracking-wide
            text-white
          "
        >
          Most Popular
        </span>
      )}

      {/* Icon */}

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon size={24} />
      </div>

      {/* Title */}

      <h3 className="mt-5 text-2xl font-bold tracking-tight text-gray-900">
        {plan.name}
      </h3>

      {/* Description */}

      <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
        {plan.description}
      </p>

      {/* Price */}

      <div className="mt-6 flex items-end">
        <span className="text-4xl font-bold text-gray-900 lg:text-5xl">
          {plan.price}
        </span>

        {plan.duration && (
          <span className="mb-1 ml-2 text-gray-500">
            {plan.duration}
          </span>
        )}
      </div>

      {/* Features */}

      <div className="mt-6 flex-1 space-y-3">
        {plan.features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-3"
          >
            <div className="mt-0.5 rounded-full bg-primary/10 p-1">
              <Check
                size={14}
                className="text-primary"
              />
            </div>

            <span className="text-[15px] leading-6 text-gray-600">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}

      <button
        className={`
          mt-7
          w-full
          rounded-xl
          py-3.5
          font-semibold
          transition-all
          duration-300

          ${
            plan.popular
              ? "bg-primary text-white hover:bg-primary/90 hover:shadow-lg"
              : "border border-gray-300 bg-white text-gray-700 hover:border-primary hover:bg-primary/5"
          }
        `}
      >
        {plan.button}
      </button>

      {/* Bottom Note */}

      <p className="mt-3 text-center text-xs text-gray-400">
        No hidden charges
      </p>
    </div>
  );
};

export default PricingCard;