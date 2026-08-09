import {AiToolsData} from "../assets/assets";
import { ArrowUpRight } from 'lucide-react'
import { useUser } from "@clerk/react";
import { useNavigate } from "react-router-dom";

const AItoolsSection = () => {

    const {user} = useUser()
    const navigate = useNavigate()
  return (
    <section className="relative w-full py-24 overflow-hidden">

      {/* Background Glow */}

      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />

      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-blue-300/10 blur-[140px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center">

          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary">

            🚀 AI Powered Tools

          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">

            Powerful AI Tools

          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-gray-500">

            Everything you need to create, enhance and optimize your
            content with cutting-edge AI technology.

          </p>

        </div>

        {/* Cards */}

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

          {AiToolsData.map((tool, index) => {
            {console.log(tool)}

            const Icon = tool.Icon;

            return (

              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-gray-200/70 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_20px_60px_rgba(99,102,241,0.12)]"
                onClick={()=> user && navigate(tool.path)}
              >

                {/* Gradient Overlay */}

                <div className="absolute inset-0 bg-linear-to-br from-primary/0 via-primary/3 to-blue-100/20 opacity-0 transition duration-300 group-hover:opacity-100" />

                {/* Popular Badge */}

                {tool.popular && (

                  <span className="absolute right-5 top-5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow">

                    Popular

                  </span>

                )}

                {/* Icon */}

                <div
                  className='relative flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6'
                  style={{
                    background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`
                    }}
                >

                  <Icon size={22} />

                </div>

                {/* Title */}

                <h3 className="relative mt-6 text-lg font-semibold tracking-tight text-gray-900">

                  {tool.title}

                </h3>

                {/* Description */}

                <p className="relative mt-3 text-[15px] leading-relaxed text-gray-500">

                  {tool.description}

                </p>

                {/* Divider */}

                <div className="relative mt-6 border-t border-gray-100" />

                {/* CTA */}

                <div className="relative mt-5 flex items-center justify-between">

                  <button className="text-sm font-semibold text-primary transition-all duration-300 group-hover:tracking-wide">

                    Open Tool

                  </button>

                  <ArrowUpRight
                    size={18}
                    className="text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
};

export default AItoolsSection;