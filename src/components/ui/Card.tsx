import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  'rounded-2xl border border-border bg-card text-card-foreground transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'shadow-sm',
        hover: 'shadow-sm hover:shadow-lg hover:border-secondary/50 hover:-translate-y-1 hover:shadow-glow',
        selected: 'border-2 border-secondary shadow-md shadow-secondary/20',
        glass: 'backdrop-blur-sm bg-card/80 shadow-sm border-border/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export { Card, cardVariants }
