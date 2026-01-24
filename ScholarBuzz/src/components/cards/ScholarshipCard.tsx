import { Scholarship } from '@/stores/useAppStore';
import { cn } from '@/lib/utils';
import { Clock, MapPin, DollarSign, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  onViewDetails: (scholarship: Scholarship) => void;
  onApply?: (scholarship: Scholarship) => void;
}

export const ScholarshipCard = ({
  scholarship,
  onViewDetails,
  onApply,
}: ScholarshipCardProps) => {
  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 70) return 'text-primary';
    return 'text-warning';
  };

  const getMatchBgColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-success/10 border-success/20';
    if (percentage >= 70) return 'bg-primary/10 border-primary/20';
    return 'bg-warning/10 border-warning/20';
  };

  const getDeadlineColor = (daysLeft: number) => {
    if (daysLeft <= 7) return 'text-destructive bg-destructive/10';
    if (daysLeft <= 30) return 'text-warning bg-warning/10';
    return 'text-success bg-success/10';
  };

  return (
    <div
      className={cn(
        'group rounded-xl border bg-card p-6 shadow-card transition-all duration-200',
        'hover:shadow-lg hover:-translate-y-1 hover:border-primary/30'
      )}
    >
      <div className="flex items-start gap-4">
        {/* Match Score */}
        <div
          className={cn(
            'flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-xl border',
            getMatchBgColor(scholarship.matchPercentage)
          )}
        >
          <span className={cn('text-2xl font-bold', getMatchColor(scholarship.matchPercentage))}>
            {scholarship.matchPercentage}%
          </span>
          <span className="text-xs text-muted-foreground">Match</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {scholarship.name}
              </h3>
              <p className="text-sm text-muted-foreground">{scholarship.provider}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            {scholarship.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Details */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-4 w-4" />
              <span>{scholarship.amount}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{scholarship.location}</span>
            </div>
            <div className={cn('flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium', getDeadlineColor(scholarship.daysLeft))}>
              <Clock className="h-3.5 w-3.5" />
              <span>{scholarship.daysLeft} days left</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(scholarship)}
              className="group-hover:border-primary group-hover:text-primary"
            >
              View Details
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            {onApply && (
              <Button size="sm" onClick={() => onApply(scholarship)}>
                Apply Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
