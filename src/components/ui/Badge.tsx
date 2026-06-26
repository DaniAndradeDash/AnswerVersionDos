import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium transition-colors duration-200',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary',
        success: 'bg-secondary/10 text-secondary',
        warning: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
        info: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
        outline: 'border border-border text-muted-foreground',
      },
      size: {
        sm: 'text-xs px-2.5 py-0.5',
        md: 'text-sm px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: ReactNode
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge, badgeVariants }
