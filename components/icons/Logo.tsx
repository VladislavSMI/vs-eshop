import Image from 'next/image';

export function Logo({
  height = 30,
  width = 30,
}: {
  height?: number;
  width?: number;
}) {
  return (
    <Image
      src="/assets/logo_v1.png"
      height={height}
      width={width}
      alt="logo"
      priority
    />
  );
}
