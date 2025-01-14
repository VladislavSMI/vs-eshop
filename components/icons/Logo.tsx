import Image from 'next/image';

export const Logo = ({
  height = 30,
  width = 30,
}: {
  height?: number;
  width?: number;
}) => (
  <Image
    src="/assets/logo_v2.png"
    height={height}
    width={width}
    alt="logo"
    priority
  />
);
