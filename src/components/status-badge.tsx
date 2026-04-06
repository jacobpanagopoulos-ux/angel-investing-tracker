interface StatusBadgeProps {
  bg: string;
  text: string;
  label: string;
}

export default function StatusBadge({ bg, text, label }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${bg} ${text}`}>
      {label}
    </span>
  );
}
