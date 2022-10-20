import type {FC} from 'react';
import {Control, useController} from 'react-hook-form';
import clsx from 'clsx';

interface Props {
  control: Control;
  name: string;
  label?: string;
  defaultValue?: string | number | string[];
  type?: 'text' | 'search' | 'number' | 'password' | 'email' | 'tel';
  placeholder?: string;
}

const TextInput: FC<Props> = ({control, name, label, defaultValue, type = 'text', placeholder}) => {
  const {
    field,
    fieldState: {error}
  } = useController({name, control, defaultValue});

  return (
    <div className="w-full has-validation">
      {!!label && (
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        {...field}
        id={name}
        type={type}
        placeholder={placeholder}
        className={clsx('form-control me-2 w-full form-control-sm', {'is-invalid': !!error?.message})}
        aria-label={placeholder}
        formNoValidate={!!error?.message}
      />
      <div className="invalid-feedback">{error?.message}</div>
    </div>
  );
};

export default TextInput;
