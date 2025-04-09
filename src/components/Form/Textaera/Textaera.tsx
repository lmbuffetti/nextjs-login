import React from 'react'

type TextareaType = {
  className?: string
  label?: string
  name: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  value: string
}

export default function Textarea({
  className,
  label,
  name,
  value,
  onChange,
}: TextareaType) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <textarea
        className={`${className} textarea w-full`}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
