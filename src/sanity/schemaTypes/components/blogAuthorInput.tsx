import { ReferenceInputProps } from 'sanity';

export const BlogAuthorInput = (props: ReferenceInputProps) => {
  return (
    <div className="space-y-2">
      {props.renderDefault(props)}
      {props.value && typeof props.value === 'string' ? (
        <p className="text-fs-300">This article was written by {props.value}</p>
      ) : null}
    </div>
  );
};
