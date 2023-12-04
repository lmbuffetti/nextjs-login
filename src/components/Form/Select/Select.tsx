import ReactSelect, { MultiValue, SingleValue } from 'react-select'

type FormValue = {
  single: SingleValue<{ value: string; label: string }>
  multi: MultiValue<{ value: string; label: string }>
}

type Select<T extends boolean> = {
  className?: string
  isMulti: T
  label?: string
  name: string
  data?: T extends true ? FormValue['multi'] : FormValue['single']
  onChange: ({
    data,
    name,
  }: {
    data: T extends true ? FormValue['multi'] : FormValue['single']
    name: string
  }) => void
  options?: { value: string; label: string }[]
  optionGroups?:
    | { label: string; options: { value: string; label: string }[] }[]
    | undefined
}

export default function InputText<T extends boolean>({
  className,
  isMulti,
  label,
  name,
  onChange,
  optionGroups,
  options,
}: Select<T>) {
  const changeValue = (data: Select<T>['data']) => {
    if (data) {
      onChange({ data: data, name: name })
    }
  }
  if (!options && !optionGroups) {
    return <></>
  }
  return (
    <div className={className}>
      {label && <label>{label}</label>}
      <ReactSelect
        id={name}
        classNames={{
          control: () => 'select',
          input: () => 'selectInput',
          placeholder: () => 'p-4',
          valueContainer: () =>
            'bg-gray-700 text-gray-900 text-sm block w-full',
          singleValue: () => 'singleValue',
          multiValue: () => 'bg-green-500',
          multiValueLabel: () => '',
          multiValueRemove: () => 'bg-green-500',
          indicatorsContainer: () => 'bg-gray-700',
          clearIndicator: () => 'bg-red-500 cursor-pointer',
          indicatorSeparator: () => 'bg-green-500',
          dropdownIndicator: () => '',
          menu: () => 'dropdownSelect',
          groupHeading: () => 'groupHeadingSelect',
          option: ({ isFocused, isSelected }) =>
            `optionSelect ${isFocused && 'isFocused'} ${
              isSelected && 'isSelected'
            }`,
          noOptionsMessage: () => 'bg-blue-500',
        }}
        isMulti={isMulti}
        name={name}
        className="text-black"
        options={optionGroups || options}
        onChange={(val: any) => changeValue(val)}
      />
    </div>
  )
}
