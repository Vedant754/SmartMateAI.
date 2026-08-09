import { pricingPlans } from "../assets/assets";
import PricingCard from "./PricingCard";

const PricingSection = () => {
  return (
    <section className="relative overflow-hidden py-24 lg:py-28">

      {/* Background Glow */}

      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />

      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-blue-300/10 blur-[140px]" />

      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">

        {/* Badge */}

        <div className="flex justify-center">

          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary">

            💎 Pricing

          </span>

        </div>

        {/* Heading */}

        <div className="mt-6 text-center">

          <h2 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">

            Simple, Transparent Pricing

          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-gray-500">

            Choose the perfect plan for your content creation journey.
            Upgrade anytime as your workflow grows.

          </p>

        </div>

        {/* Pricing Cards */}

        <div className="mt-16 grid items-start gap-6 lg:grid-cols-3">

          {pricingPlans.map((plan) => (

            <PricingCard
              key={plan.name}
              plan={plan}
            />

          ))}

        </div>

        {/* Bottom Note */}

        <div className="mt-12 text-center">

          <p className="text-sm text-gray-500">

            ✨ All plans include secure cloud storage, regular updates,
            and access to the latest AI models.

          </p>

        </div>

      </div>

    </section>
  );
};

export default PricingSection;