import { type CSSProperties } from 'react'

export function HoverRoll({ children }: { children: string }) {
  return (
    <span className="roll-text">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  )
}

export function LetterRoll({ children }: { children: string }) {
  return (
    <span aria-label={children} className="inline-block">
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {children.split(' ').map((word, wordIndex) => (
          <span className="mr-[0.22em] inline-block whitespace-nowrap" key={`${word}-${wordIndex}`}>
            {[...word].map((letter, index) => (
              <span className="roll-character" key={`${letter}-${index}`} style={{ '--letter-delay': `${index * 18}ms` } as CSSProperties}>
                <span>{letter}</span>
                <span>{letter}</span>
              </span>
            ))}
          </span>
        ))}
      </span>
    </span>
  )
}
