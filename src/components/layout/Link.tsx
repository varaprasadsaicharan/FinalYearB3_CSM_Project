import React from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function Link({ href, children, className = '' }: LinkProps) {
  return (
    <a
      href={href}
      className={`text-gray-700 hover:text-gray-900 hover:border-b-2 hover:border-blue-500 px-1 py-2 text-sm font-medium ${className}`}
    >
      {children}
    </a>
  );
}