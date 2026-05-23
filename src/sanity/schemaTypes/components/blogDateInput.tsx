import { formatDate } from '@/lib/formatter';
import { DateInputProps } from 'sanity';

export const BlogDateInput = (props: DateInputProps) => {
  return (
    <div className="space-y-2">
      {props.renderDefault(props)}
      {props.value && (
        <p className="text-fs-300">
          This article was published on {formatDate(props.value)}
        </p>
      )}
    </div>
  );
};
