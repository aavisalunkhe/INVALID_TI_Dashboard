import { createContext, forwardRef, useContext, useState } from 'react';
import { cn } from '@/lib/utils';

const TabsContext= createContext({});
const Tabs= forwardRef(({ defaultValue, onValueChange, className, children, ...props }, ref)=> {
  const [value, setValue]= useState(defaultValue);
  const handleValueChange= (newValue)=> {
    setValue(newValue);
    onValueChange?.(newValue);
  };
  return (
    <TabsContext.Provider value= {{ value, onValueChange: handleValueChange }}>
      <div ref= {ref} className= {cn('space-y-2', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
});
Tabs.displayName= 'Tabs';
const TabsList= forwardRef(({ className, ...props }, ref)=> {
  return (
    <div
      ref= {ref}
      className= {cn('inline-flex items-center justify-center rounded-md bg-gray-900 p-1', className)}
      {...props}
    />
  );
});
TabsList.displayName= 'TabsList';

const TabsTrigger= forwardRef(({ value, className, children, ...props }, ref)=> {
  const { value: selectedValue, onValueChange }= useContext(TabsContext);
  const isSelected= selectedValue=== value;
  return (
    <button
      ref= {ref}
      className= {cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50',
        isSelected
          ? 'bg-gray-800 text-white shadow'
          : 'text-gray-400 hover:text-gray-300',
        className
      )}
      onClick= {()=> onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  );
});
TabsTrigger.displayName= 'TabsTrigger';

const TabsContent= forwardRef(({ value, className, children, ...props }, ref)=> {
  const { value: selectedValue }= useContext(TabsContext);
  const isSelected= selectedValue=== value;
  if (!isSelected) return null;
  return (
    <div
      ref= {ref}
      className= {cn('mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500', className)}
      {...props}
    >
      {children}
    </div>
  );
});
TabsContent.displayName= 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };