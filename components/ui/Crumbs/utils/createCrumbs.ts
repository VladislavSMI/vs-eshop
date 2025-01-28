import { Crumb } from '@/lib/types';

type LabelMap<T> = Partial<Record<keyof T, string>>;
type ValueTransformers<T> = Partial<Record<keyof T, (value: string) => string>>;

export const createCrumbs = <T extends Record<string, unknown>>({
  fields,
  labels,
  valueTransformers = {},
}: {
  fields: T;
  labels: LabelMap<T>;
  valueTransformers?: ValueTransformers<T>;
}): Crumb[] => {
  const transformValue = (key: keyof T, value: string): string =>
    valueTransformers[key] ? valueTransformers[key]!(value) : value;

  return (Object.entries(fields) as [keyof T, string][])
    .filter(([key, value]) => key in labels && value != null)
    .map(([key, value]) => ({
      id: String(key),
      label: labels[key] ?? String(key),
      value: transformValue(key, value),
    }));
};
