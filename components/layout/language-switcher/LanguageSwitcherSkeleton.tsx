import React from 'react';

export function LanguageSwitcherSkeleton() {
  return (
    <div className="flex animate-pulse items-center space-x-2">
      <div className="h-6 w-6 rounded-full bg-gray-300" />
      <div className="flex flex-col space-y-1">
        <div className="h-4 w-8 rounded-md bg-gray-300" />
        <div className="h-4 w-10 rounded-md bg-gray-300" />
      </div>
    </div>
  );
}
