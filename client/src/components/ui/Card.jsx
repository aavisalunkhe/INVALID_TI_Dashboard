import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const Card= forwardRef(({ className, ...props }, ref)=> {
  return (
    <div
      ref= {ref}
      className= {cn('rounded-lg border border-gray-800 bg-gray-950 text-white shadow', className)}
      {...props}
    />
  );
});
Card.displayName= 'Card';

const CardHeader= forwardRef(({ className, ...props }, ref)=> {
  return (
    <div
      ref= {ref}
      className= {cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  );
});
CardHeader.displayName= 'CardHeader';

const CardTitle= forwardRef(({ className, ...props }, ref)=> {
  return (
    <h3
      ref= {ref}
      className= {cn('text-xl font-bold', className)}
      {...props}
    />
  );
});
CardTitle.displayName= 'CardTitle';

const CardDescription= forwardRef(({ className, ...props }, ref)=> {
  return (
    <p
      ref= {ref}
      className= {cn('text-sm text-gray-400', className)}
      {...props}
    />
  );
});
CardDescription.displayName= 'CardDescription';

const CardContent= forwardRef(({ className, ...props }, ref)=> {
  return (
    <div
      ref= {ref}
      className= {cn('p-6 pt-0', className)}
      {...props}
    />
  );
});
CardContent.displayName= 'CardContent';

const CardFooter= forwardRef(({ className, ...props }, ref)=> {
  return (
    <div
      ref= {ref}
      className= {cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  );
});
CardFooter.displayName= 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };