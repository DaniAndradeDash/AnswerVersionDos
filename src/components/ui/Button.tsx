import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
  type ElementRef,
  isValidElement,
  cloneElement,
} from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary-light hover:shadow-lg hover:shadow-secondary/20',
        ghost:
          'bg-transparent text-foreground hover:bg-surface hover:text-primary border border-border',
        outline:
          'border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground',
        icon:
          'p-2 rounded-full hover:bg-surface text-foreground',
      },
      size: {
        sm: 'text-sm px-4 py-2 h-9',
        md: 'text-base px-6 py-3 h-11',
        lg: 'text-lg px-8 py-4 h-14',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

// Simple Slot component for asChild
function Slot({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  if (isValidElement(children)) {
    const child = children as React.ReactElement<React.HTMLAttributes<HTMLElement>>
    const childStyle = child.props.style || {}
    const childClassName = child.props.className || ''

    return cloneElement(child, {
      ...props,
      ...child.props,
      style: {
        ...childStyle,
        ...props.style,
      },
      className: cn(childClassName, props.className),
    })
  }
  return <span {...props}>{children}</span>
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode
  loading?: boolean
  fullWidth?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  asChild?: boolean
}

const Button = forwardRef<ElementRef<'button'>, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      loading = false,
      fullWidth = false,
      iconLeft,
      iconRight,
      disabled,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    const content = loading ? (
      <>
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Enviando...</span>
      </>
    ) : (
      <>
        {iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
        {children}
        {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
      </>
    )

    return (
      <Comp
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(
          buttonVariants({ variant, size, className }),
          fullWidth && 'w-full'
        )}
        disabled={!asChild && (disabled || loading)}
        aria-busy={loading}
        {...(asChild ? {} : props)}
      >
        {content}
      </Comp>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
