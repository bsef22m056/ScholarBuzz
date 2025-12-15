import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    label: string;
  };
  icon?: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

export const StatCard = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  variant = 'default',
}: StatCardProps) => {
  const variantStyles = {
    default: 'border-border',
    primary: 'border-primary/20 bg-primary/5',
    success: 'border-success/20 bg-success/5',
    warning: 'border-warning/20 bg-warning/5',
    danger: 'border-destructive/20 bg-destructive/5',
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    if (trend.value > 0) return <TrendingUp className="h-4 w-4 text-success" />;
    if (trend.value < 0) return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div
      className={cn(
        'rounded-xl border bg-card p-6 shadow-card transition-all duration-200',
        'hover:shadow-md hover:-translate-y-0.5',
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center gap-1.5">
              {getTrendIcon()}
              <span
                className={cn(
                  'text-sm font-medium',
                  trend.value > 0
                    ? 'text-success'
                    : trend.value < 0
                    ? 'text-destructive'
                    : 'text-muted-foreground'
                )}
              >
                {trend.value > 0 ? '+' : ''}
                {trend.value}%
              </span>
              <span className="text-sm text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};
