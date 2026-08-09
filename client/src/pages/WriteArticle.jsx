import { useState } from 'react'
import { ArrowRight, Check, FileText, Sparkles } from 'lucide-react'

const WriteArticle = () => {
  const [topic, setTopic] = useState('')
  const [wordCount, setWordCount] = useState('500 - 800')
  const [generatedArticle, setGeneratedArticle] = useState(null)

  const wordCountOptions = ['300 - 500', '500 - 800', '800 - 1200', '1200+']

  const handleSubmit = (event) => {
    event.preventDefault()
    setGeneratedArticle({
      title: topic.trim(),
      length: wordCount,
    })
  }

  return (
    <div className='grid grid-cols-1 gap-6 overflow-y-auto p-6 text-slate-700'>
      {/* 1st Col */}
      <form
        onSubmit={handleSubmit}
        className='max-h-[24rem] w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'
      >
        <div className='mb-3 flex items-start gap-3'>
          <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-primary'>
            <Sparkles size={18} aria-hidden='true' />
          </div>
          <div>
            <h1 className='text-xl font-semibold tracking-tight text-slate-900'>
              AI Article Write
            </h1>
            <p className='mt-1 text-xs leading-5 text-slate-500'>
              Turn an idea into a polished, well-structured article.
            </p>
          </div>
        </div>

        <div className='space-y-3'>
          <div>
            <label htmlFor='article-topic' className='mb-1 block text-sm font-medium text-slate-800'>
              Article topic
            </label>
            <input
              id='article-topic'
              type='text'
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder='e.g. The future of renewable energy'
              required
              className='w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-violet-100'
            />
          </div>

          <fieldset>
            <legend className='mb-2 text-sm font-medium text-slate-800'>
              Article length
            </legend>
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
              {wordCountOptions.map((option) => (
                <label key={option} className='cursor-pointer'>
                  <input
                    type='radio'
                    name='word-count'
                    value={option}
                    checked={wordCount === option}
                    onChange={(event) => setWordCount(event.target.value)}
                    className='peer sr-only'
                  />
                  <span className='flex min-h-9 items-center justify-center rounded-lg border border-slate-200 px-2 py-1.5 text-center text-xs font-medium text-slate-600 transition hover:border-violet-300 hover:text-primary peer-checked:border-primary peer-checked:bg-violet-50 peer-checked:text-primary peer-focus-visible:ring-4 peer-focus-visible:ring-violet-100'>
                    {option} words
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type='submit'
            className='flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-200 active:scale-[0.99]'
          >
            Generate article
            <ArrowRight size={18} aria-hidden='true' />
          </button>
        </div>
      </form>

      {/* 2nd Col */}
      <div className='w-full max-h-[21rem] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8'>
        {generatedArticle ? (
          <article>
            <div className='mb-7 flex items-start justify-between gap-4 border-b border-slate-100 pb-5'>
              <div>
                <div className='mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary'>
                  <FileText size={15} aria-hidden='true' />
                  Generated article
                </div>
                <h2 className='text-2xl font-semibold leading-tight text-slate-900'>
                  {generatedArticle.title}
                </h2>
                <p className='mt-2 text-sm text-slate-500'>
                  {generatedArticle.length} words
                </p>
              </div>
            </div>

            <div className='space-y-4 text-sm leading-7 text-slate-600'>
              <p>
                {generatedArticle.title} is shaping the way people think about progress, possibility, and the choices that define what comes next.
              </p>
              <p>
                As this topic continues to evolve, understanding its opportunities and challenges becomes increasingly important. The strongest results come from combining thoughtful planning with practical action.
              </p>
              <h3 className='pt-2 text-lg font-semibold text-slate-900'>Looking ahead</h3>
              <p>
                By staying curious, adapting to change, and focusing on meaningful outcomes, individuals and organizations can turn new ideas into lasting value.
              </p>
            </div>

            <div className='mt-8 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700'>
              <Check size={17} aria-hidden='true' />
              Article generated successfully
            </div>
          </article>
        ) : (
          <div className='flex min-h-[10rem] flex-col items-center justify-center text-center'>
            <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400'>
              <FileText size={26} aria-hidden='true' />
            </div>
            <h2 className='text-lg font-semibold text-slate-800'>Your article will appear here</h2>
            <p className='mt-2 max-w-sm text-sm leading-6 text-slate-500'>
              Enter a topic and choose a length to generate your article preview.
            </p>
          </div>
        )}
      </div>
      
    </div>
  )
}

export default WriteArticle