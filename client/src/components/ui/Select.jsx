import { createContext, forwardRef, useContext, useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

const SelectContext= createContext({});
const Select= forwardRef(({ defaultValue, onValueChange, children, ...props }, ref)=> {
  const [value, setValue]= useState(defaultValue);
  const [open, setOpen]= useState(false);
  const handleValueChange= (newValue)=> {
    setValue(newValue);
    onValueChange?.(newValue);
    setOpen(false);
  };
  return (
    <SelectContext.Provider value= {{ value, onValueChange: handleValueChange, open, setOpen }}>
      <div ref= {ref} className= "relative" {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  );
});
Select.displayName= 'Select';

const SelectTrigger= forwardRef(({ className, children, ...props }, ref)=> {
  const { value, setOpen, open }= useContext(SelectContext);
  return (
    <button
      ref= {ref}
      className= {cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      onClick={()=> setOpen(!open)}
      {...props}
    >
      {children}
      <ChevronDown className= "h-4 w-4 opacity-50" />
    </button>
  );
});
SelectTrigger.displayName= 'SelectTrigger';

const SelectValue= forwardRef(({ className, placeholder, ...props }, ref)=> {
  const { value }= useContext(SelectContext);

  return (
    <span ref= {ref} className= {cn('flex-grow', className)} {...props}>
      {value|| placeholder}
    </span>
  );
});
SelectValue.displayName= 'SelectValue';

const SelectContent= forwardRef(({ className, children, ...props }, ref)=> {
  const { open, setOpen }= useContext(SelectContext);
  const contentRef= useRef(null);
  useEffect(()=> {
    const handleClickOutside= (event)=> {
      if (contentRef.current&& !contentRef.current.contains(event.target)){
        setOpen(false);
      }
    };
    if(open){
      document.addEventListener('mousedown', handleClickOutside);
    }
    return ()=> {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      ref={(node) => {
        contentRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={cn(
        'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-700 bg-gray-900 text-gray-300 shadow-md',
        className
      )}
      {...props}
    >
      <div className="p-1">{children}</div>
    </div>
  );
});
SelectContent.displayName= 'SelectContent';

const SelectItem= forwardRef(({ className, value, children, ...props }, ref)=> {
  const { onValueChange, value: selectedValue }= useContext(SelectContext);
  const isSelected= selectedValue=== value;
  return (
    <div
      ref= {ref}
      className= {cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-gray-800 focus:bg-gray-800',
        isSelected && 'bg-gray-800 font-medium',
        className
      )}
      onClick= {()=> onValueChange(value)}
      {...props}
    >
      {children}
    </div>
  );
});
SelectItem.displayName= 'SelectItem';

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };