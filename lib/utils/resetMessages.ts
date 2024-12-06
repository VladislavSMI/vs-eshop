import { Dispatch, SetStateAction } from 'react';

export function resetMessages(
  ...setters: Array<
    | Dispatch<SetStateAction<string | null>>
    | Dispatch<SetStateAction<Record<string, string> | null>>
  >
) {
  setters.forEach((setter) => setter(null));
}
