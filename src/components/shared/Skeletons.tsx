import { Skeleton } from '../ui/skeleton';

// Hero Skeleton
export const HeroSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Skeleton className="w-full h-100" />
      <div className="space-y-3">
        <Skeleton className="w-full h-30" />
        <Skeleton className="w-full h-30" />
        <Skeleton className="w-full h-30" />
      </div>
    </div>
  );
};

// Featured Brands
export const FeaturedBrandsSkeleton = () => {
  return (
    <div className="space-y-5">
      <Skeleton className="w-30 h-10 mx-auto" />
      <div className="flex gap-x-5">
        <Skeleton className="w-30 h-10" />
        <Skeleton className="w-30 h-10" />
        <Skeleton className="w-30 h-10" />
        <Skeleton className="w-30 h-10" />
        <Skeleton className="w-30 h-10" />
      </div>
    </div>
  );
};

// Member Access Feature
export const MemberAccessFeatureSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Skeleton className="w-full h-100" />
      <div className="space-y-3">
        <div className="space-y-1">
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-full h-10" />
        </div>
        <div className="space-y-1">
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-full h-10" />
        </div>
        <div className="space-y-1">
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-full h-10" />
        </div>
        <div className="space-y-1">
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-full h-10" />
        </div>
      </div>
    </div>
  );
};

// members card
export const MemberCardSkeleton = () => {
  return (
    <div className="space-y-3">
      <Skeleton className="w-full h-75" />
      <Skeleton className="w-full h-3" />
      <Skeleton className="w-full h-3" />
      <Skeleton className="w-full h-3" />
    </div>
  );
};
