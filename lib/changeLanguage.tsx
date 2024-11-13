import { useRouter } from 'next/navigation';

export const changeLanguage = (
  router: ReturnType<typeof useRouter>,
  newLocale: string,
  pathname: string,
  searchParams: URLSearchParams,
) => {
  const path = pathname.split('/').slice(2).join('/');
  const query = Object.fromEntries(searchParams.entries());

  const url = `/${newLocale}/${path}?${new URLSearchParams(query).toString()}`;
  router.push(url);
};
