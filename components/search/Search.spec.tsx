import { useSearchParams } from 'next/navigation';
import { render, fireEvent, act } from '@testing-library/react';
import { Search } from './Search';

const mockReplace = jest.fn();
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

jest.useFakeTimers();

describe('Search Component', () => {
  beforeEach(() => {
    mockReplace.mockClear();
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  it('calls router with the correct query after debouncing', async () => {
    const { getByLabelText } = render(
      <Search placeholder="Search" pathname="some-path" />,
    );

    const input = getByLabelText('Search') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.change(input, { target: { value: 'final search term' } });

    act(() => {
      jest.runAllTimers();
    });

    expect(mockReplace).toHaveBeenCalledWith(
      '/some-path?query=final+search+term',
    );
  });

  it('calls router with the correct URL when the input is cleared', async () => {
    const { getByLabelText } = render(
      <Search placeholder="Search" pathname="some-path" />,
    );

    const input = getByLabelText('Search') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.change(input, { target: { value: '' } });

    act(() => {
      jest.runAllTimers();
    });

    expect(mockReplace).toHaveBeenCalledWith('/some-path?');
  });

  it('does not call router until the debounced delay has passed', () => {
    const { getByLabelText } = render(
      <Search placeholder="Search" pathname="some-path" />,
    );

    const input = getByLabelText('Search') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test' } });

    expect(mockReplace).not.toHaveBeenCalled();

    act(() => {
      jest.runAllTimers();
    });

    expect(mockReplace).toHaveBeenCalledWith('/some-path?query=test');
  });
});
