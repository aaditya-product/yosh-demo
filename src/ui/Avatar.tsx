type Size = 'sm' | 'md' | 'lg';

const sizes: Record<Size, string> = {
  sm: 'h-avatarSm w-avatarSm',
  md: 'h-avatarMd w-avatarMd',
  lg: 'h-avatarLg w-avatarLg',
};

export function Avatar({
  initials,
  size = 'md',
  ...rest
}: {
  initials: string;
  size?: Size;
  'data-id'?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-circle bg-primaryFill text-metaBold text-primary ${sizes[size]}`}
      {...rest}
    >
      {initials}
    </span>
  );
}
