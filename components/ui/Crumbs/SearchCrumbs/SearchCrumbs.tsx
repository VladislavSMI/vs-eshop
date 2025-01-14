'use client';

import { useTranslations } from 'next-intl';
import { Category, SearchParams } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { getCategoryName } from '@/lib/utils/getCategoryName';
import { createCrumbs } from '../utils/createCrumbs';
import { Crumbs } from '../Crumbs';

export const SearchCrumbs = ({
  searchParams,
  categories,
}: {
  searchParams?: SearchParams;
  categories: Category[];
}) => {
  const router = useRouter();
  const t = useTranslations('searchLabels');

  if (!searchParams) {
    return null;
  }

  const crumbs = createCrumbs({
    fields: searchParams,
    labels: {
      categoryId: t('categoryId'),
      query: t('query'),
    },
    valueTransformers: {
      categoryId: (value) => getCategoryName(Number(value), categories),
    },
  });

  const onRemoveCrumb = (id: string) => {
    const params = new URLSearchParams(window.location.search);
    params.delete(id);
    router.replace(`?${params.toString()}`);
  };

  return <Crumbs crumbs={crumbs} onRemove={onRemoveCrumb} />;
};
