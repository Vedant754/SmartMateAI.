import { useState } from "react";
import { AiToolsData, dummyCreationData } from "../assets/assets";
import { useUser } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  FileText,
  Image,
  MoreHorizontal,
  PenLine,
  Plus,
  Sparkles,
  TrendingUp,
  Users,
  WandSparkles,
} from "lucide-react";

const chartBars = [42, 58, 47, 72, 64, 82, 68, 91, 76, 98, 84, 100];

const activityItems = [
  { label: "Article generated", detail: "AI and Coding: A Symbiotic Partnership", time: "12 min ago", icon: FileText, color: "text-sky-600 bg-sky-50" },
  { label: "Image created", detail: "Editorial workspace concept", time: "2 hours ago", icon: Image, color: "text-emerald-600 bg-emerald-50" },
  { label: "Resume reviewed", detail: "Product Designer resume", time: "Yesterday", icon: CheckCircle2, color: "text-violet-600 bg-violet-50" },
];

const statCards = [
  { label: "Total creations", value: "24", change: "+18.2%", note: "vs. last month", icon: Sparkles, tone: "from-indigo-500 to-blue-500" },
  { label: "Words generated", value: "18.4k", change: "+24.6%", note: "vs. last month", icon: PenLine, tone: "from-emerald-500 to-teal-500" },
  { label: "Images created", value: "86", change: "+12.4%", note: "vs. last month", icon: WandSparkles, tone: "from-orange-400 to-rose-500" },
  { label: "Time saved", value: "12.8h", change: "+9.8%", note: "this month", icon: Clock3, tone: "from-violet-500 to-fuchsia-500" },
];

const Dashboard = () => {
  const [creations] = useState(dummyCreationData);
  const { user } = useUser();
  const navigate = useNavigate();

  const firstName = user?.firstName || user?.fullName?.split(" ")[0] || "Creator";
  const recentProjects = creations.slice(0, 4);

  return (
    <div className="w-full max-w-[1500px] overflow-x-hidden pb-8">
      <section className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#312e81] via-primary to-[#1685d8] px-5 py-7 text-white shadow-xl shadow-primary/15 sm:px-8 sm:py-8">
        <div className="absolute -right-12 -top-20 h-56 w-56 rounded-full border-[28px] border-white/10" />
        <div className="absolute bottom-[-70px] right-28 h-40 w-40 rounded-full bg-cyan-300/15 blur-2xl" />
        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-medium text-blue-100">Your creative workspace</p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Hello, {firstName} <span aria-hidden="true">&#10024;</span></h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-blue-100">Turn your next idea into something remarkable. Your AI toolkit is ready when you are.</p>
          </div>
          <button onClick={() => navigate("/ai/write-article")} className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-primary shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"><Plus size={17} /> Start creating</button>
        </div>
      </section>

      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ label, value, change, note, icon: Icon, tone }) => (
          <div key={label} className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between"><div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${tone} text-white shadow-md`}><Icon size={21} /></div><span className="flex items-center gap-1 text-xs font-semibold text-emerald-600"><TrendingUp size={14} /> {change}</span></div>
            <p className="mt-5 text-sm font-medium text-slate-500">{label}</p>
            <div className="mt-1 flex items-baseline gap-2"><p className="text-2xl font-bold tracking-tight text-slate-900">{label === "Total creations" ? creations.length : value}</p><span className="text-xs text-slate-400">{note}</span></div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-3"><div><h2 className="font-semibold text-slate-900">AI usage</h2><p className="mt-1 text-sm text-slate-500">Your generation activity this month</p></div><button className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="More usage options"><MoreHorizontal size={20} /></button></div>
          <div className="mt-7 flex items-end justify-between gap-3"><div><p className="text-3xl font-bold text-slate-900">68%</p><p className="mt-1 flex items-center gap-1 text-xs text-emerald-600"><TrendingUp size={13} /> 14.8% from last month</p></div><div className="rounded-lg bg-indigo-50 px-3 py-2 text-right"><p className="text-xs text-slate-500">Plan usage</p><p className="text-sm font-semibold text-primary">68 / 100 credits</p></div></div>
          <div className="mt-6 flex h-36 items-end gap-2 border-b border-slate-100 pb-0 sm:gap-3">{chartBars.map((height, index) => <div key={index} className="group flex h-full flex-1 items-end"><div style={{ height: `${height}%` }} className={`w-full rounded-t-md transition duration-300 group-hover:bg-primary ${index > 8 ? "bg-primary/80" : "bg-indigo-100"}`} /></div>)}</div>
          <div className="mt-3 flex justify-between text-[11px] text-slate-400"><span>01 May</span><span>08 May</span><span>15 May</span><span>22 May</span><span>Today</span></div>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6"><div className="flex items-center justify-between"><div><h2 className="font-semibold text-slate-900">Recent activity</h2><p className="mt-1 text-sm text-slate-500">Your latest workspace updates</p></div><BarChart3 className="text-slate-300" size={22} /></div><div className="mt-6 space-y-5">{activityItems.map(({ label, detail, time, icon: Icon, color }) => <div key={label} className="flex gap-3"><div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${color}`}><Icon size={17} /></div><div className="min-w-0 flex-1"><p className="text-sm font-medium text-slate-800">{label}</p><p className="truncate text-xs text-slate-500">{detail}</p></div><time className="shrink-0 text-[11px] text-slate-400">{time}</time></div>)}</div><button className="mt-6 flex items-center gap-1 text-xs font-semibold text-primary transition hover:gap-2">View all activity <ArrowUpRight size={14} /></button></section>
      </div>

      <section className="mt-6"><div className="mb-4 flex items-center justify-between"><div><h2 className="font-semibold text-slate-900">Quick actions</h2><p className="mt-1 text-sm text-slate-500">Jump back into your favorite tools</p></div><Users className="text-slate-300" size={22} /></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{AiToolsData.map(({ title, Icon, path, bg }) => <button key={title} onClick={() => navigate(path)} className="group flex min-h-28 flex-col items-start justify-between rounded-2xl border border-slate-200/80 bg-white p-4 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"><span style={{ background: `linear-gradient(135deg, ${bg.from}, ${bg.to})` }} className="flex h-9 w-9 items-center justify-center rounded-lg text-white shadow-sm transition group-hover:scale-110"><Icon size={17} /></span><span className="text-xs font-semibold leading-4 text-slate-700">{title}</span></button>)}</div></section>

      <section className="mt-6 rounded-2xl border border-slate-200/80 bg-white shadow-sm"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6"><div><h2 className="font-semibold text-slate-900">Recent projects</h2><p className="mt-1 text-sm text-slate-500">Pick up where you left off</p></div><button className="text-xs font-semibold text-primary transition hover:text-indigo-700">View all</button></div><div className="divide-y divide-slate-100">{recentProjects.map((project) => <div key={project.id} className="flex items-center gap-3 px-5 py-4 transition hover:bg-slate-50 sm:px-6"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-primary"><FileText size={18} /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-slate-800">{project.prompt.replace("Generate a blog title for the keyword ", "")}</p><p className="mt-1 text-xs capitalize text-slate-400">{project.type.replace("-", " ")} &middot; {new Date(project.created_at).toLocaleDateString()}</p></div><span className="hidden rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-600 sm:inline-flex">Completed</span><button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label={`Open ${project.type}`}><ArrowUpRight size={17} /></button></div>)}</div></section>
    </div>
  );
};

export default Dashboard;

 