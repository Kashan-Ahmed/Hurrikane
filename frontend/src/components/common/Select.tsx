import ReactSelect, { MultiValue, SingleValue } from 'react-select';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

export interface IOption {
  readonly value: string | number;
  readonly label: string;
  readonly color?: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

type TProps = {
  label?: string;
  value: string | number | number[];
  options: IOption[];
  isDisabled?: boolean;
  onValueChange: (val: number | string | number[] | null) => void;
  errorMsg?: string;
  placeholder?: string;
  isClearable?: boolean;
  isLoading?: boolean;
  isMulti?: boolean;
  closeOnSelect?: boolean;
  styles?: {
    container?: string;
    control?: string;
    singleValue?: string;
    label?: string;
    placeholder?: string;
  };
  menuPlacement?: 'top' | 'bottom' | 'auto';
} & (
  | { required: boolean; optional?: never }
  | { optional: boolean; required?: never }
  | { required?: never; optional?: never }
);

const Select = (props: TProps) => {
  const {
    label,
    value,
    options,
    isDisabled = false,
    onValueChange,
    errorMsg,
    styles,
    menuPlacement = 'auto',
    placeholder,
    isClearable = false,
    isLoading = false,
    isMulti = false,
    closeOnSelect = true,
  } = props;
  const isRequired = 'required' in props && props.required;
  const isOptional = 'optional' in props && props.optional;

  const defaultValue = useMemo(() => {
    if (Array.isArray(value) && isMulti) {
      return options?.filter(function (option) {
        return value.includes(option.value as number);
      });
    } else {
      return options?.filter(function (option) {
        return option.value === value;
      });
    }
  }, [value, isMulti]);

  const isIOption = (val: unknown): val is IOption => {
    return typeof val === 'object' && val !== null && 'value' in val && 'label' in val;
  };

  const handleChangeValue = (val: MultiValue<IOption> | SingleValue<IOption>) => {
    if (isMulti && Array.isArray(val)) {
      const values = val.map((item) => item.value);
      onValueChange(values);
    } else {
      if (isIOption(val) && !Array.isArray(val)) {
        onValueChange(val.value);
      } else {
        if (isClearable) {
          onValueChange(null);
        }
      }
    }
  };

  return (
    <div className={cn('relative', styles?.container && styles?.container)}>
      {label && (
        <label className={cn('mb-1 block text-[13px] text-black', styles?.label && styles?.label)}>
          {label}
          {isRequired && '*'}
          {isOptional && <span className="ml-1 text-gray-400">(Optional)</span>}
        </label>
      )}
      <ReactSelect
        classNames={{
          menu: () => '!rounded-lg',
          container: () => 'outline-none',
          valueContainer: () => cn('!px-2 !py-0'),
          control: ({ isDisabled }) =>
            cn(
              '!min-h-[32px] !border-gray-400 !rounded-lg px-0 !outline-none !outline-offset-0 !shadow-none',
              isDisabled && '!bg-gray-200/30',
              styles?.control && styles.control
            ),
          singleValue: ({}) =>
            cn('!text-sm !capitalize !font-medium', styles?.singleValue && styles.singleValue),
          placeholder: () =>
            cn('!text-xs !text-secondary/90', styles?.placeholder && styles.placeholder),
          menuList: () => 'p-1 !rounded-md',
          input: () => '!capitalize',
          // menuPortal: (base) => '!z-50',
          option: ({ isSelected }) =>
            cn('!text-sm !capitalize !text-typo !rounded-md', isSelected && '!bg-primary'),
          indicatorsContainer: () => '!min-h-[32px] !h-[32px]',
          multiValue: () => '!m-[1px] !mx-[4px]',
          multiValueLabel: () => '!text-[12px] !leading-none !p-[5px] !pl-[8px] !font-medium',
          multiValueRemove: () =>
            '!text-[12px] !leading-none !p-[2px] !px-[4px] hover:!bg-primary/10 hover:!text-primary',
        }}
        classNamePrefix="select"
        value={defaultValue}
        isDisabled={isDisabled}
        isLoading={isLoading}
        name="select"
        placeholder={placeholder || 'Select...'}
        options={options}
        onChange={(val) => handleChangeValue(val)}
        components={{
          IndicatorSeparator: () => null,
        }}
        menuPlacement={menuPlacement}
        // menuPortalTarget={document.body}
        isClearable={isClearable}
        isMulti={isMulti}
        closeMenuOnSelect={closeOnSelect}
        isOptionDisabled={() => false}
      />
      {errorMsg && <p className="mt-1 text-xs text-red-600">* {errorMsg}</p>}
    </div>
  );
};

export default Select;
