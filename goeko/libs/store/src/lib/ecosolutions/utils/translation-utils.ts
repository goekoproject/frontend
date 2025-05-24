import { TranslatedProperties } from '../../model/field-translations.interface'

export function filterValidTranslations(items: Array<TranslatedProperties> | null | undefined): TranslatedProperties[] {
  if (!items) {
    return []
  }
  return items.filter(
    (item): item is TranslatedProperties => !!item && !!item.label && item.label.trim() !== '' && !!item.lang && item.lang.trim() !== '',
  )
}
