export const NavbarSkeleton = () => {
  const skeletonClass = 'animate-pulse rounded bg-neutral-content/10';

  return (
    <nav className="sticky top-0 z-50 flex w-full items-center justify-between bg-base-100 p-3 shadow-md">
      <div className="flex items-center space-x-4 text-primary md:basis-1/4">
        <div className={`h-10 w-10 ${skeletonClass}`} />
        <div className={`hidden h-6 w-32 md:inline-flex ${skeletonClass}`} />
      </div>
      <div className="flex flex-grow justify-center pl-2 pr-2">
        <div className={`h-10 w-full max-w-lg ${skeletonClass}`} />
      </div>
      <div className="flex items-center justify-end space-x-2 md:basis-1/4">
        <div className={`h-10 w-10 ${skeletonClass}`} />
        <div className={`h-10 w-10 ${skeletonClass}`} />
      </div>
    </nav>
  );
};
