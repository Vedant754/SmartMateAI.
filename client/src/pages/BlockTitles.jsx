import { useState } from 'react'
import { ArrowRight, Check, FileText, Sparkles } from 'lucide-react'

const BlockTitles = () => {
  const [topic, setTopic] = useState('')
  const [titleCount, setTitleCount] = useState('5')
  const [tone, setTone] = useState('Professional')
  const [generatedTitles, setGeneratedTitles] = useState(null)

  const titleIdeas = [
    'The Complete Guide to {topic}',
    'What the Future of {topic} Looks Like',
    'How {topic} Is Changing the Way We Work',
    'The Essential Ideas Everyone Should Know About {topic}',
    'A Practical Approach to Understanding {topic}',
    'Why {topic} Matters More Than Ever',
    'The Smart Beginner\'s Guide to {topic}',
    '7 Important Lessons {topic} Can Teach Us',
    'From Challenge to Opportunity: Rethinking {topic}',
    'The Next Chapter of {topic}',
  ]

  const handleSubmit = (event) => {
    event.preventDefault()
    const cleanTopic = topic.trim()

    setGeneratedTitles({
      topic: cleanTopic,
      tone,
      titles: titleIdeas
        .slice(0, Number(titleCount))
        .map((title) => title.replace('{topic}', cleanTopic)),
    })
  }

  return (
    <div className='grid grid-cols-1 gap-6 overflow-y-auto p-6 text-slate-700'>
      <form
        onSubmit={handleSubmit}
        className='w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'
      >
        <div className='mb-4 flex items-start gap-3'>
          <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-primary'>
            <Sparkles size={18} aria-hidden='true' />
          </div>
          <div>
            <h1 className='text-xl font-semibold tracking-tight text-slate-900'>
              AI Blog Title Generator
            </h1>
            <p className='mt-1 text-xs leading-5 text-slate-500'>
              Create clear, engaging title ideas for your next piece of content.
            </p>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='grid grid-cols-1 items-end gap-3 sm:grid-cols-[minmax(0,1fr)_auto]'>
            <div>
              <label htmlFor='title-topic' className='mb-1 block text-sm font-medium text-slate-800'>
                Topic
              </label>
              <input
                id='title-topic'
                type='text'
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                placeholder='e.g. Sustainable living for busy families'
                minLength={3}
                required
                className='w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-violet-100'
              />
            </div>
            <button
              type='submit'
              className='flex min-h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-200 active:scale-[0.99]'
            >
              Generate titles
              <ArrowRight size={17} aria-hidden='true' />
            </button>
          </div>

          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            <div>
              <label htmlFor='title-count' className='mb-1 block text-sm font-medium text-slate-800'>
                Number of title ideas
              </label>
              <select
                id='title-count'
                value={titleCount}
                onChange={(event) => setTitleCount(event.target.value)}
                className='w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-violet-100'
              >
                <option value='3'>3 ideas</option>
                <option value='5'>5 ideas</option>
                <option value='7'>7 ideas</option>
                <option value='10'>10 ideas</option>
              </select>
            </div>

            <div>
              <label htmlFor='title-tone' className='mb-1 block text-sm font-medium text-slate-800'>
                Writing style
              </label>
              <select
                id='title-tone'
                value={tone}
                onChange={(event) => setTone(event.target.value)}
                className='w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-violet-100'
              >
                <option>Professional</option>
                <option>Creative</option>
                <option>SEO-friendly</option>
                <option>Conversational</option>
              </select>
            </div>
          </div>
        </div>
      </form>

      <div className='w-full max-h-[32rem] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8'>
        {generatedTitles ? (
          <section aria-labelledby='generated-titles-heading'>
            <div className='mb-6 border-b border-slate-100 pb-5'>
              <div className='mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary'>
                <FileText size={15} aria-hidden='true' />
                Generated title ideas
              </div>
              <h2 id='generated-titles-heading' className='text-2xl font-semibold leading-tight text-slate-900'>
                Titles for {generatedTitles.topic}
              </h2>
              <p className='mt-2 text-sm text-slate-500'>
                {generatedTitles.tone} style · {generatedTitles.titles.length} ideas
              </p>
            </div>

            <ol className='space-y-3'>
              {generatedTitles.titles.map((title, index) => (
                <li key={title} className='flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3'>
                  <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-primary'>
                    {index + 1}
                  </span>
                  <span className='pt-0.5 text-sm font-medium leading-6 text-slate-700'>{title}</span>
                </li>
              ))}
            </ol>

            <div className='mt-6 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700'>
              <Check size={17} aria-hidden='true' />
              Title ideas generated successfully
            </div>
          </section>
        ) : (
          <div className='flex min-h-[12rem] flex-col items-center justify-center text-center'>
            <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400'>
              <FileText size={26} aria-hidden='true' />
            </div>
            <h2 className='text-lg font-semibold text-slate-800'>Your title ideas will appear here</h2>
            <p className='mt-2 max-w-sm text-sm leading-6 text-slate-500'>
              Add a topic and choose your preferred style to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlockTitles