import { formatCurrency } from '@/lib/formatter';
import { NumberInputProps } from 'sanity';

export const MembershipPriceInput = (props: NumberInputProps) => {
  return (
    <div className="space-y-3">
      {props.renderDefault(props)}
      {props.value && typeof props.value === 'number' ? (
        <p className="text-fs-300">
          Monthly subscription cost {formatCurrency(props.value)}/month
        </p>
      ) : null}
    </div>
  );
};
