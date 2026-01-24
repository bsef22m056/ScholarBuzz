import { cn } from '@/lib/utils';

interface ProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showValue?: boolean;
  label?: string;
}

export const ProgressRing = ({
  value,
  size = 120,
  strokeWidth = 8,
  className,
  showValue = true,
  label,
}: ProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const getColor = (val: number) => {
    if (val >= 80) return 'stroke-success';
    if (val >= 50) return 'stroke-primary';
    return 'stroke-warning';
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-muted"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn('transition-all duration-500 ease-out', getColor(value))}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{value}%</span>
          {label && <span className="text-xs text-muted-foreground">{label}</span>}
        </div>
      )}
    </div>
  );
};
