import React from 'react';

type InputType = {
  type: 'file' | 'text' | 'number' | 'password' | 'email' | 'tel' | 'url'
}

type InputTextType<T extends InputType['type']> = {
  className?: string
  classNameInput?: string
  type: T
  label?: string
  labelUploadFile?: string
  id: T extends 'file' ? string : undefined
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputText<T extends InputType['type']>({
  className,
  classNameInput,
  label,
  id,
  name,
  onChange,
  labelUploadFile,
  type,
  value,
}: InputTextType<T>) {
  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <div className="relative">
        {type === 'file' && (
          <div className="absolute flex h-full cursor-pointer items-center justify-center px-5 text-white">
            <label
              htmlFor={id}
              className="block items-center"
            >
              {labelUploadFile}
            </label>
            <input
              id={id}
              style={{ display: 'none' }}
              className=""
              type={type}
              name={name}
              value=""
              onChange={onChange}
            />
          </div>
        )}
        <input
          onKeyDown={evt =>
            type === 'number'
              ? ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
              : ''
          }
          style={{ paddingLeft: type === 'file' ? '130px' : '' }}
          className={`${classNameInput} input w-full`}
          type={type === 'file' ? 'text' : type}
          name={name}
          id={name}
          value={value || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            type !== 'file' ? onChange(e) : ''
          }
        />
      </div>
    </div>
  )
}
