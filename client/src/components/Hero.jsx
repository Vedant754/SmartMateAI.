import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Sparkles, PlayCircle } from "lucide-react";
import AItoolsSection from "./AItoolsSection";
import AnimatedCounter from "./AnimatedCounter";
import Testimonials from "./Testimonials";
import { useUser } from "@clerk/react";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <section
      className="
      relative
      overflow-hidden
      pt-32
      pb-24
      bg-[url('/gradientBackground.png')]
      bg-cover
      bg-center
      bg-no-repeat
      "
    >
      {/* Background Glow */}

      <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />

      <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-blue-300/10 blur-[150px]" />

      <div className="absolute left-1/2 bottom-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-300/10 blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Badge */}

        <div className="flex justify-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-sm font-medium text-primary">

            <Sparkles size={16} />

            AI Powered Content Platform

          </div>

        </div>

        {/* Heading */}

        <div className="mx-auto mt-8 max-w-5xl text-center">

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">

            Create Amazing Content

            <br />

            with the

            <span className="ml-3 bg-linear-to-r from-primary to-violet-500 bg-clip-text text-transparent">

              Power of AI

            </span>

          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-500">

            Transform your workflow with intelligent AI tools.
            Generate blogs, emails, social media captions,
            resumes and marketing content within seconds.

          </p>

        </div>

        {/* Buttons */}

        <div className="mt-12 flex flex-wrap justify-center gap-5">

          <button
            onClick={() => user && navigate("/ai")}
            className="
            flex items-center
            gap-2
            rounded-xl
            bg-primary
            px-8
            py-4
            text-white
            font-semibold
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
            hover:bg-primary/90
            active:scale-95
            "
          >
            <Sparkles size={18} />

            Start Creating
          </button>

          <button
            onClick={() => user && navigate("/demo")}
            className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-gray-300
            bg-white/80
            backdrop-blur
            px-8
            py-4
            font-semibold
            text-gray-700
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
            "
          >
            <PlayCircle size={18} />

            Watch Demo
          </button>

        </div>

        {/* Trusted */}

        <div className="mt-12 flex flex-col items-center">

          <div className="flex items-center gap-3">

            <img
              src={assets.user_group}
              alt=""
              className="h-10"
            />

            <p className="font-medium text-gray-600">

              Trusted by

              <span className="mx-2 font-bold text-primary">

                10,000+

              </span>

              creators worldwide

            </p>

          </div>

        </div>

        {/* Stats */}

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-6 rounded-2xl border border-gray-200/70 bg-white/70 p-8 shadow-lg backdrop-blur lg:grid-cols-4">

          <div className="text-center">

            <h3 className="text-3xl font-bold text-gray-900">
                <AnimatedCounter
                    from={0}
                    to={50}
                    suffix="K+"
                />
            </h3>

            <p className="mt-2 text-sm text-gray-500">

              AI Generations

            </p>

          </div>

          <div className="text-center">

            <h3 className="text-3xl font-bold text-gray-900">
              <AnimatedCounter
                    from={0}
                    to={20}
                    suffix="+"
                />
            </h3>

            <p className="mt-2 text-sm text-gray-500">

              AI Tools

            </p>

          </div>

          <div className="text-center">

            <h3 className="text-3xl font-bold text-gray-900">

              99%

            </h3>

            <p className="mt-2 text-sm text-gray-500">

              Accuracy

            </p>

          </div>

          <div className="text-center">

            <h3 className="text-3xl font-bold text-gray-900">

              24/7

            </h3>

            <p className="mt-2 text-sm text-gray-500">

              AI Available

            </p>

          </div>

        </div>

        {/* AI Tool Section */}

        {/* <div className="mt-18">
          <AItoolsSection />
        </div>

        <div className="mt-18">
          <Testimonials />
        </div> */}

      </div>
    </section>
  );
};

export default Hero;