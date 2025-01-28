import { CodedField, DropdownOption } from 'lib/types';

export const toDropdownSelection = ({
  id,
  name,
}: CodedField): DropdownOption => ({
  label: name,
  value: id,
});
