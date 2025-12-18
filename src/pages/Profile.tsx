import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAppStore } from "@/stores/useAppStore";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  User,
  GraduationCap,
  FileText,
  Upload,
  X,
  Plus,
  CheckCircle2,
  Circle,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const { user, setUser } = useAppStore();
  const [newSkill, setNewSkill] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const addSkill = () => {
    if (newSkill && !user.skills.includes(newSkill)) {
      setUser({ skills: [...user.skills, newSkill] });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setUser({ skills: user.skills.filter((s) => s !== skill) });
  };

  const simulateResumeUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUser({ resumeUploaded: true });
      toast({
        title: "Upload Resume ",
        description:
          "Upload Resume to get Personalized Scholarship recommendation!",
      });
    }, 2000);
  };

  const profileTips = [
    {
      text: "Add at least 5 skills to improve matching by 20%",
      complete: user.skills.length >= 5,
    },
    {
      text: "Upload your resume for AI-powered analysis",
      complete: user.resumeUploaded,
    },
    {
      text: "Complete your work experience section",
      complete: user.completedSections.includes("Experience"),
    },
    {
      text: "Add academic achievements for better matches",
      complete: user.completedSections.includes("Achievements"),
    },
  ];

  return (
    <MainLayout
      title="Profile"
      subtitle="Manage your profile and improve your matches"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>Your basic personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={user.name.split(" ")[0]}
                    onChange={(e) =>
                      setUser({
                        name: `${e.target.value} ${
                          user.name.split(" ")[1] || ""
                        }`,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={user.name.split(" ")[1] || ""}
                    onChange={(e) =>
                      setUser({
                        name: `${user.name.split(" ")[0]} ${e.target.value}`,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ email: e.target.value })}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={user.phone}
                    onChange={(e) => setUser({ phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    value={user.nationality}
                    onChange={(e) => setUser({ nationality: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Academic Information
              </CardTitle>
              <CardDescription>Your educational background</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="institution">Current Institution</Label>
                <Input
                  id="institution"
                  value={user.institution}
                  onChange={(e) => setUser({ institution: e.target.value })}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="gpa">GPA</Label>
                  <Input
                    id="gpa"
                    type="number"
                    step="0.1"
                    min="0"
                    max="4"
                    value={user.gpa}
                    onChange={(e) =>
                      setUser({ gpa: parseFloat(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Degree Level</Label>
                  <Select
                    value={user.degreeLevel}
                    onValueChange={(v) => setUser({ degreeLevel: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High School">High School</SelectItem>
                      <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                      <SelectItem value="Master's">Master's</SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input
                    value={user.field}
                    onChange={(e) => setUser({ field: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Skills
              </CardTitle>
              <CardDescription>
                Add skills to improve your match accuracy (minimum 5
                recommended)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                />
                <Button onClick={addSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="gap-1.5 px-3 py-1.5"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              {user.skills.length < 5 && (
                <p className="text-sm text-warning flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Add {5 - user.skills.length} more skill
                  {5 - user.skills.length > 1 ? "s" : ""} for better matching
                </p>
              )}
            </CardContent>
          </Card>

          {/* Resume Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Resume
              </CardTitle>
              <CardDescription>
                Upload your resume for AI-powered analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                  "hover:border-primary hover:bg-primary/5 cursor-pointer",
                  isUploading && "pointer-events-none opacity-50"
                )}
                onClick={simulateResumeUpload}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      Parsing your resume...
                    </p>
                  </div>
                ) : user.resumeUploaded ? (
                  <div className="flex flex-col items-center">
                    <CheckCircle2 className="h-12 w-12 text-success" />
                    <p className="mt-4 font-medium text-success">
                      Resume uploaded successfully!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Click to upload a new version
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 font-medium">
                      Drop your resume here or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PDF, DOC, DOCX up to 9MB
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} size="lg">
              Save Changes
            </Button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Profile Strength */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Strength</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ProgressRing
                value={user.profileStrength}
                size={160}
                strokeWidth={12}
                label="Complete"
              />
              <div className="mt-6 w-full space-y-2">
                {user.completedSections.map((section) => (
                  <div
                    key={section}
                    className="flex items-center gap-2 text-sm text-success"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{section}</span>
                  </div>
                ))}
                {user.pendingSections.map((section) => (
                  <div
                    key={section}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Circle className="h-4 w-4" />
                    <span>{section}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-warning" />
                Profile Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profileTips.map((tip, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-start gap-2 text-sm",
                      tip.complete ? "text-success" : "text-muted-foreground"
                    )}
                  >
                    {tip.complete ? (
                      <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    <span className={tip.complete ? "line-through" : ""}>
                      {tip.text}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
