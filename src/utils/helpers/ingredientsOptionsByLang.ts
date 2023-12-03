import { LanguageList } from '@/@types/i18n'
import IngredientListEN from '@/i18n/dictionaries/ingredient-list-en.json'
import IngredientListIT from '@/i18n/dictionaries/ingredient-list-it.json'

export const ingredientsOptionsByLang = (
  type: keyof typeof IngredientListEN,
  lang: LanguageList['lang'],
) => {
  // Select the correct language json
  const json = lang === 'it' ? IngredientListIT : IngredientListEN
  // Initialize the expty array
  const selectOptions: { label: string; value: string }[] = []

  // Select
  const selectedIng: { [val: string]: string } = json[type]

  const sortable = Object.fromEntries(
    Object.entries(selectedIng).sort((a, b) =>
      a[1] < b[1] ? -1 : a[1] > a[1] ? 1 : 0,
    ),
  )

  if (sortable) {
    Object.keys(sortable).forEach((key: string) => {
      if (sortable[key]) {
        selectOptions.push({
          label: sortable[key].charAt(0).toUpperCase() + sortable[key].slice(1),
          value: key,
        })
      }
    })
    return selectOptions || [{ label: '', value: '' }]
  }
  return [{ label: '', value: '' }]
}
