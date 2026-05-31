import { NumberInputProps } from 'sanity';

export const BlogMinReadInput = (props: NumberInputProps) => {
  return (
    <div className="space-y-2">
      {props.renderDefault(props)}
      {props.value && typeof props.value === 'number' ? (
        <p className="text-fs-300">
          This article takes {props.value} minutes to read
        </p>
      ) : null}
    </div>
  );
};
