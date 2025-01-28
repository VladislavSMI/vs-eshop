import clsx from 'clsx';

interface MessageProps {
  message: string | null;
  type: 'success' | 'error' | 'info' | 'warning';
  className?: string;
}

export const Message = ({ message, type, className }: MessageProps) => {
  if (!message) return null;

  return (
    <p
      className={clsx(
        'mt-4 text-center text-sm',
        {
          'text-success': type === 'success',
          'text-error': type === 'error',
          'text-info': type === 'info',
          'text-warning': type === 'warning',
        },
        className,
      )}
    >
      {message}
    </p>
  );
};
