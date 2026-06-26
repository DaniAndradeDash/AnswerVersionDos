import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const sectionVariants = cva('w-full py-16 md:py-24', {
  variants: {
    variant: {
      default: 'bg-background',
      alt: 'bg-surface',
      dark: 'bg-slate-900 text-white dark:bg-slate-950',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface SectionProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  children: ReactNode
  id?: string
  containerClassName?: string
  /** Heading ID to associate via aria-labelledby for accessibility */
  headingId?: string
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant, id, children, containerClassName, headingId, ...props }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(sectionVariants({ variant, className }))}
        aria-labelledby={headingId}
        {...props}
      >
        <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', containerClassName)}>
          {children}
        </div>
      </section>
    )
  }
)

Section.displayName = 'Section'

export { Section, sectionVariants }
