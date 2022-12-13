import React, {ReactNode} from 'react';

type ButtonProps = {
  children: ReactNode | string,
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
  type?: "button" | "submit" | "reset",
  disabled?: boolean
}
const Button = ({children, onClick, type, disabled}: ButtonProps) => {
  return (
    <button
      type={type}
      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4
      text-sm font-medium text-white shadow-sm
      hover:bg-indigo-700
      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
      disabled:opacity-75 disabled:cursor-not-allowed
      "

      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
