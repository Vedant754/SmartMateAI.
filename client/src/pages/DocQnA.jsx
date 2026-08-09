import { useRef, useState } from 'react'
import { Bot, FileText, Paperclip, Send, Upload, User } from 'lucide-react'

const DocQnA = () => {
  const fileInputRef = useRef(null)
  const [document, setDocument] = useState(null)
  const [question, setQuestion] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [messages, setMessages] = useState([])

  const handleDocumentUpload = (event) => {
    const file = event.target.files?.[0]

    if (file) {
      setDocument(file)
      setMessages([])
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const cleanQuestion = question.trim()

    if (!cleanQuestion || !document || isGenerating) return

    setMessages((currentMessages) => [...currentMessages, { role: 'user', content: cleanQuestion }])
    setQuestion('')
    setIsGenerating(true)

    window.setTimeout(() => {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: 'bot',
          content: `I have reviewed your question about ${document.name}. Once the document service is connected, I will return a precise answer grounded in the uploaded content.`,
        },
      ])
      setIsGenerating(false)
    }, 900)
  }

  return (
    <div className='grid grid-cols-1 gap-5 overflow-y-auto p-6 text-slate-700'>
      <section className='rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-center gap-3'>
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-primary'>
              <FileText size={20} aria-hidden='true' />
            </div>
            <div>
              <h1 className='text-xl font-semibold tracking-tight text-slate-900'>Document Q&amp;A</h1>
              <p className='mt-1 text-xs text-slate-500'>Upload a document and ask questions about its content.</p>
            </div>
          </div>

          <input ref={fileInputRef} type='file' accept='.pdf,.doc,.docx,.txt' onChange={handleDocumentUpload} className='sr-only' />
          <button
            type='button'
            onClick={() => fileInputRef.current?.click()}
            className='flex items-center justify-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-violet-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-100'
          >
            <Upload size={17} aria-hidden='true' />
            {document ? 'Change document' : 'Upload document'}
          </button>
        </div>

        {document && (
          <div className='mt-4 flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5 text-sm'>
            <FileText size={17} className='text-primary' aria-hidden='true' />
            <span className='min-w-0 flex-1 truncate font-medium text-slate-700'>{document.name}</span>
            <span className='shrink-0 text-xs text-slate-400'>{Math.max(1, Math.round(document.size / 1024))} KB</span>
          </div>
        )}
      </section>

      <section className='flex min-h-[20rem] max-h-[36rem] min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
        <div className='flex items-center gap-3 border-b border-slate-100 px-4 py-3'>
          <div className='flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-primary'>
            <Bot size={19} aria-hidden='true' />
          </div>
          <div>
            <h2 className='text-sm font-semibold text-slate-900'>Document assistant</h2>
            <p className='text-xs text-slate-500'>{document ? 'Ready for your question' : 'Upload a document to begin'}</p>
          </div>
        </div>

        <div className='min-h-0 flex-1 space-y-4 overflow-y-auto p-5'>
          {!messages.length && !isGenerating && (
            <div className='flex h-full min-h-[12rem] flex-col items-center justify-center text-center'>
              <div className='mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400'>
                <Paperclip size={22} aria-hidden='true' />
              </div>
              <p className='text-sm font-medium text-slate-700'>Your document conversation will appear here</p>
              <p className='mt-1 max-w-sm text-xs leading-5 text-slate-500'>Upload a document, then ask a question using the message box below.</p>
            </div>
          )}

          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`flex items-end gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.role === 'bot' && <Bot size={18} className='mb-1 shrink-0 text-primary' aria-hidden='true' />}
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'rounded-br-sm bg-primary text-white' : 'rounded-bl-sm bg-slate-100 text-slate-700'}`}>
                {message.content}
              </div>
              {message.role === 'user' && <User size={18} className='mb-1 shrink-0 text-slate-400' aria-hidden='true' />}
            </div>
          ))}

          {isGenerating && (
            <div className='flex items-end gap-2'>
              <Bot size={18} className='mb-1 text-primary' aria-hidden='true' />
              <div className='rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-3 text-sm text-slate-500'>Thinking...</div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className='border-t border-slate-100 p-4'>
          <div className='flex items-end gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2 focus-within:border-primary focus-within:ring-4 focus-within:ring-violet-100'>
            <label htmlFor='document-question' className='sr-only'>Ask a question about the document</label>
            <textarea
              id='document-question'
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder={document ? 'Ask a question about this document...' : 'Upload a document first...'}
              disabled={!document || isGenerating}
              rows={1}
              className='max-h-24 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-60'
            />
            <button
              type='submit'
              disabled={!document || !question.trim() || isGenerating}
              aria-label={isGenerating ? 'Generating response' : 'Send question'}
              className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white transition hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-200 disabled:cursor-not-allowed disabled:bg-slate-300'
            >
              <Send size={17} aria-hidden='true' />
            </button>
          </div>
          <p className='mt-2 text-center text-[11px] text-slate-400'>Send is locked while the assistant is generating a response.</p>
        </form>
      </section>
    </div>
  )
}

export default DocQnA