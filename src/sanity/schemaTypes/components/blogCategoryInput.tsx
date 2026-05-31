import { ReferenceInputProps } from 'sanity';

export const BlogCategoryInput = (props: ReferenceInputProps) => {
  return (
    <div className="space-y-2">
      {props.renderDefault(props)}
      {props.value && typeof props.value === 'string' ? (
        <p className="text-fs-300">This article falls into {props.value}.</p>
      ) : null}
    </div>
  );
};
