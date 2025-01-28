'use client';

import React from 'react';

export const MenuDropdownSkeleton = () => (
  <div className="inline-block">
    <div className="btn btn-circle btn-ghost text-primary">
      <div className="h-6 w-6 rounded bg-gray-300" />
    </div>
    <div className="mt-2 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow-xl">
      <ul className="menu space-y-2 p-2">
        <li className="mb-2 flex items-center space-x-2 border-b-[0.5px] border-primary pb-2">
          <div className="h-6 w-6 rounded bg-gray-300" />
          <div className="h-4 w-16 rounded-md bg-gray-300" />
        </li>
        <li className="h-4 w-3/4 rounded-md bg-gray-300" />
        <li className="h-4 w-2/3 rounded-md bg-gray-300" />
        <li className="h-4 w-4/5 rounded-md bg-gray-300" />
        <li className="h-4 w-2/3 rounded-md bg-gray-300" />
      </ul>
    </div>
  </div>
);
