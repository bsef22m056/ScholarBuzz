import { useState, useMemo } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAppStore, Scholarship } from '@/stores/useAppStore';
import { ScholarshipCard } from '@/components/cards/ScholarshipCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Search, Filter, X, CheckCircle2, XCircle, ChevronDown, Sparkles, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const Scholarships = () => {
  const { scholarships, user } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedDegree, setSelectedDegree] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('match');
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(true);
  
  // Profile-based matching toggle
  const [useProfileMatching, setUseProfileMatching] = useState(true);
  
  // Additional manual filters
  const [minMatchScore, setMinMatchScore] = useState(0);
  const [maxDaysLeft, setMaxDaysLeft] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const countries = ['all', 'USA', 'UK', 'Germany', 'Pakistan', 'Global'];
  const degrees = ['all', 'Undergraduate', 'Graduate', 'PhD', 'Postdoctoral'];
  const deadlineOptions = ['all', '7', '14', '30', '60'];
  
  // Extract unique tags from scholarships
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    scholarships.forEach(s => s.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [scholarships]);

  // Profile-based filtering logic
  const profileMatchedScholarships = useMemo(() => {
    if (!useProfileMatching || !user) return scholarships;
    
    return scholarships.filter(scholarship => {
      const ruleBased = scholarship.eligibility.ruleBased;
      
      // Check GPA requirement
      if (ruleBased.gpa) {
        const requiredGpa = typeof ruleBased.gpa.required === 'number' 
          ? ruleBased.gpa.required 
          : parseFloat(String(ruleBased.gpa.required));
        if (user.gpa < requiredGpa) return false;
      }
      
      // Check nationality (if required and doesn't match)
      if (ruleBased.nationality) {
        const required = String(ruleBased.nationality.required).toLowerCase();
        const userNat = user.nationality.toLowerCase();
        // Allow if global or matches
        if (!required.includes('global') && !required.includes(userNat) && !userNat.includes(required.split(' ')[0])) {
          // Still show but with lower priority - don't filter out completely
        }
      }
      
      // Check degree level match
      if (ruleBased.degreeLevel || ruleBased.degree) {
        const degreeReq = ruleBased.degreeLevel || ruleBased.degree;
        const required = String(degreeReq.required).toLowerCase();
        const userDegree = user.degreeLevel.toLowerCase();
        // Match if contains similar terms
        if (!required.includes('any') && !userDegree.includes(required.split(' ')[0]) && !required.includes(userDegree.split("'")[0])) {
          // Still include but flag
        }
      }
      
      return true;
    });
  }, [scholarships, useProfileMatching, user]);

  const filteredScholarships = useMemo(() => {
    return profileMatchedScholarships
      .filter((s) => {
        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.provider.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCountry = selectedCountry === 'all' || s.location === selectedCountry;
        const matchesDegree = selectedDegree === 'all' || 
          s.tags.some((t) => t.toLowerCase().includes(selectedDegree.toLowerCase()));
        const matchesScore = s.matchPercentage >= minMatchScore;
        const matchesDeadline = maxDaysLeft === 'all' || s.daysLeft <= parseInt(maxDaysLeft);
        const matchesTags = selectedTags.length === 0 || 
          selectedTags.some(tag => s.tags.includes(tag));
        
        return matchesSearch && matchesCountry && matchesDegree && matchesScore && matchesDeadline && matchesTags;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'match':
            return b.matchPercentage - a.matchPercentage;
          case 'deadline':
            return a.daysLeft - b.daysLeft;
          case 'amount':
            return 0;
          default:
            return 0;
        }
      });
  }, [profileMatchedScholarships, searchQuery, selectedCountry, selectedDegree, sortBy, minMatchScore, maxDaysLeft, selectedTags]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCountry('all');
    setSelectedDegree('all');
    setSortBy('match');
    setMinMatchScore(0);
    setMaxDaysLeft('all');
    setSelectedTags([]);
  };

  const hasActiveFilters = searchQuery || selectedCountry !== 'all' || selectedDegree !== 'all' || 
    minMatchScore > 0 || maxDaysLeft !== 'all' || selectedTags.length > 0;

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <MainLayout title="Scholarships" subtitle="Find your perfect scholarship match">
      <div className="space-y-6">
        {/* Profile Matching Banner */}
        <div className="rounded-xl border bg-gradient-to-r from-primary/5 to-primary/10 p-4 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Profile-Based Matching</h3>
                <p className="text-sm text-muted-foreground">
                  {useProfileMatching 
                    ? `Showing scholarships matching your profile (GPA: ${user?.gpa || 'N/A'}, ${user?.nationality || 'N/A'})`
                    : 'Showing all scholarships regardless of eligibility'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch 
                id="profile-match" 
                checked={useProfileMatching}
                onCheckedChange={setUseProfileMatching}
              />
              <Label htmlFor="profile-match" className="text-sm font-medium">
                {useProfileMatching ? 'On' : 'Off'}
              </Label>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search scholarships..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country === 'all' ? 'All Countries' : country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDegree} onValueChange={setSelectedDegree}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Degree Level" />
                </SelectTrigger>
                <SelectContent>
                  {degrees.map((degree) => (
                    <SelectItem key={degree} value={degree}>
                      {degree === 'all' ? 'All Degrees' : degree}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">Best Match</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button variant="ghost" onClick={clearFilters} className="gap-2">
                  <X className="h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Advanced Filters */}
          <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen} className="mt-4">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                <Filter className="h-4 w-4" />
                Advanced Filters
                <ChevronDown className={cn("h-4 w-4 transition-transform", filtersOpen && "rotate-180")} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4 space-y-4">
              {/* Match Score Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Minimum Match Score</Label>
                  <span className="text-sm font-medium text-primary">{minMatchScore}%</span>
                </div>
                <Slider
                  value={[minMatchScore]}
                  onValueChange={([value]) => setMinMatchScore(value)}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Deadline Filter */}
              <div className="space-y-2">
                <Label className="text-sm">Deadline Within</Label>
                <div className="flex flex-wrap gap-2">
                  {deadlineOptions.map((days) => (
                    <Button
                      key={days}
                      variant={maxDaysLeft === days ? "default" : "outline"}
                      size="sm"
                      onClick={() => setMaxDaysLeft(days)}
                    >
                      {days === 'all' ? 'Any' : `${days} days`}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Tag Filters */}
              <div className="space-y-2">
                <Label className="text-sm">Categories</Label>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/80"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Results count */}
          <div className="mt-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Showing {filteredScholarships.length} of {scholarships.length} scholarships
              {useProfileMatching && ` (profile-matched)`}
            </span>
          </div>
        </div>

        {/* Scholarship Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredScholarships.map((scholarship) => (
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
              onViewDetails={setSelectedScholarship}
              onApply={() => {}}
            />
          ))}
        </div>

        {filteredScholarships.length === 0 && (
          <div className="rounded-xl border bg-card p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No scholarships found</h3>
            <p className="mt-2 text-muted-foreground">
              {useProfileMatching 
                ? 'Try turning off profile matching or adjusting your filters'
                : 'Try adjusting your search or filters'}
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
              {useProfileMatching && (
                <Button onClick={() => setUseProfileMatching(false)} variant="secondary">
                  Show All Scholarships
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Scholarship Detail Modal */}
        <Dialog open={!!selectedScholarship} onOpenChange={() => setSelectedScholarship(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedScholarship && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl">{selectedScholarship.name}</DialogTitle>
                  <p className="text-muted-foreground">{selectedScholarship.provider}</p>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  {/* Match Score */}
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
                    <div className={cn(
                      'flex h-20 w-20 flex-col items-center justify-center rounded-xl border-2',
                      selectedScholarship.matchPercentage >= 90 ? 'border-success bg-success/10' :
                      selectedScholarship.matchPercentage >= 70 ? 'border-primary bg-primary/10' :
                      'border-warning bg-warning/10'
                    )}>
                      <span className={cn(
                        'text-3xl font-bold',
                        selectedScholarship.matchPercentage >= 90 ? 'text-success' :
                        selectedScholarship.matchPercentage >= 70 ? 'text-primary' :
                        'text-warning'
                      )}>
                        {selectedScholarship.matchPercentage}%
                      </span>
                      <span className="text-xs text-muted-foreground">Match</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Hybrid Match Score</h4>
                      <p className="text-sm text-muted-foreground">
                        Rule-based (60%) + AI-based (40%)
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-medium mb-2">About this Scholarship</h4>
                    <p className="text-muted-foreground">{selectedScholarship.description}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {selectedScholarship.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Rule-based Eligibility */}
                  <div>
                    <h4 className="font-medium mb-3">Eligibility Criteria (Rule-based)</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedScholarship.eligibility.ruleBased).map(([key, value]) => (
                        <div
                          key={key}
                          className={cn(
                            'flex items-center justify-between rounded-lg border p-3',
                            value.met ? 'border-success/30 bg-success/5' : 'border-destructive/30 bg-destructive/5'
                          )}
                        >
                          <div className="flex items-center gap-2">
                            {value.met ? (
                              <CheckCircle2 className="h-5 w-5 text-success" />
                            ) : (
                              <XCircle className="h-5 w-5 text-destructive" />
                            )}
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Required: <span className="font-medium">{String(value.required)}</span> | 
                            Yours: <span className={cn('font-medium', value.met ? 'text-success' : 'text-destructive')}>
                              {String(value.userValue)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI-based Matching */}
                  <div>
                    <h4 className="font-medium mb-3">AI Analysis</h4>
                    <div className="space-y-3">
                      {Object.entries(selectedScholarship.eligibility.aiBased).map(([key, value]) => (
                        <div key={key} className="rounded-lg border p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="capitalize font-medium">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </span>
                            <Badge
                              className={cn(
                                value.score >= 85 ? 'bg-success/10 text-success border-success/20' :
                                value.score >= 70 ? 'bg-primary/10 text-primary border-primary/20' :
                                'bg-warning/10 text-warning border-warning/20'
                              )}
                            >
                              {value.score}%
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{value.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t">
                    <Button className="flex-1">Apply Now</Button>
                    <Button variant="outline" onClick={() => setSelectedScholarship(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Scholarships;
