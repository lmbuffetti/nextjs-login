export const convertJsonToSelectOption = (json: { [val: string]: string }) => {
  const selectOptions: { label: string; value: string }[] = []
  Object.keys(json).forEach(key => {
    selectOptions.push({
      label: json[key],
      value: key,
    })
  })
  return selectOptions
}
