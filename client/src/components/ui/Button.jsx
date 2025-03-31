import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Button= forwardRef(({ 
  className, 
  variant= 'default', 
  size= 'default', 
  children, 
  ...props 
}, ref)=> {
  const variants= {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-800',
    ghost: 'text-gray-400 hover:text-white',
    link: 'text-blue-500 underline-offset-4 hover:underline',
  };

  const sizes= {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 px-3 text-sm',
    lg: 'h-12 px-6 text-lg',
    icon: 'h-10 w-10 p-0',
  };

  return (
    <button
      ref= {ref}
      className= {cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName= 'Button';

export default Button;