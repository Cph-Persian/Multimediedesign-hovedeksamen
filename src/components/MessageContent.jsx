import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

/**
 * MessageContent — renderer for AI-beskeder.
 *
 * Understøtter:
 *   • Markdown (afsnit, lister, kode, fed/kursiv, overskrifter)
 *   • GFM (tabeller, gennemstreget tekst)
 *   • LaTeX inline ($x^2$) og display ($$x^2$$) via KaTeX
 *
 * Styling-konvention:
 *   • **fed tekst** → UVM-primary (#002B5C) — fagtermer fremhæves
 *   • Display-formler: centrerede med lidt vertikal margin
 *   • Inline-formler: arver linjehøjde fra surrounding text
 *
 * Importér KaTeX' CSS én gang (her, ikke i index.css, så den kun loades
 * når en chat-side faktisk bruger renderer).
 */
import 'katex/dist/katex.min.css'

const components = {
  // Fagtermer — render fed tekst i UVM-primary
  strong: ({ node, ...props }) => (
    <strong className="text-uvm-primary font-semibold" {...props} />
  ),

  // Overskrifter (fra koncept-svar med "## Andengradsligning")
  h1: ({ node, ...props }) => (
    <h3 className="font-heading text-base font-semibold text-uvm-ink mt-1 mb-2" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <h3 className="font-heading text-base font-semibold text-uvm-ink mt-1 mb-2" {...props} />
  ),
  h3: ({ node, ...props }) => (
    <h4 className="font-heading text-sm font-semibold text-uvm-ink mt-2 mb-1" {...props} />
  ),

  p: ({ node, ...props }) => (
    <p className="my-1.5 leading-7" {...props} />
  ),

  // Lister
  ol: ({ node, ...props }) => (
    <ol className="list-decimal pl-5 my-2 space-y-1" {...props} />
  ),
  ul: ({ node, ...props }) => (
    <ul className="list-disc pl-5 my-2 space-y-1" {...props} />
  ),
  li: ({ node, ...props }) => <li className="leading-6" {...props} />,

  // Inline + block kode
  code({ node, inline, className, children, ...props }) {
    if (inline) {
      return (
        <code
          className="bg-uvm-neutral text-uvm-ink rounded px-1.5 py-0.5 font-mono text-[0.9em]"
          {...props}
        >
          {children}
        </code>
      )
    }
    return (
      <pre className="bg-uvm-neutral rounded-md p-3 my-2 overflow-x-auto">
        <code className="font-mono text-[0.85em] text-uvm-ink" {...props}>
          {children}
        </code>
      </pre>
    )
  },

  // Citater
  blockquote: ({ node, ...props }) => (
    <blockquote
      className="border-l-2 accent-border pl-3 my-2 text-uvm-muted italic"
      {...props}
    />
  ),

  // Links — åbn i ny fane (ofte links til emu.dk)
  a: ({ node, ...props }) => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="text-uvm-primary underline hover:no-underline"
      {...props}
    />
  ),

  // Tabeller (GFM)
  table: ({ node, ...props }) => (
    <div className="overflow-x-auto my-2">
      <table className="min-w-full border-collapse text-c1" {...props} />
    </div>
  ),
  th: ({ node, ...props }) => (
    <th className="border border-uvm-border bg-uvm-neutral px-2 py-1 text-left font-semibold" {...props} />
  ),
  td: ({ node, ...props }) => (
    <td className="border border-uvm-border px-2 py-1" {...props} />
  ),
}

export default function MessageContent({ children }) {
  return (
    <div className="prose-mentor font-sans">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
