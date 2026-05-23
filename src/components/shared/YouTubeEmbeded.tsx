import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type YouTubeEmbededProps = {
  className?: string;
  videoId: string;
  title: string;
};

export const YouTubeEmbeded = ({
  className,
  videoId,
  title,
}: YouTubeEmbededProps) => {
  return (
    <div
      className={twMerge(
        clsx('min-w-full h-full aspect-video relative', className),
      )}
    >
      <div className="mask-[url(/video-embeded.png)] mask-[100%_auto] mask-center mask-no-repeat mask-alpha h-full">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&modestbranding=0&controls=0&fs=0&loop=1&playlist=${videoId}&disablekb=1&fs=0`}
          title={title}
          allow="accelerometer; autoplay; gyroscope; encrypted-media; picture-in-picture"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="w-full h-full pointer-events-none border-0 relative"
        />
      </div>
    </div>
  );
};
