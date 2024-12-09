import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface SkillThresholdsProps {
  allSkills: string[];
  extractedSkills: string[];
  skillMatchThresholds: Record<string, number>;
  onSkillChange: (skill: string, threshold: number) => void;
  onSubmit: () => void;
  loadingApply: boolean;
}

export function SkillThresholds({
  allSkills,
  extractedSkills,
  skillMatchThresholds,
  onSkillChange,
  onSubmit,
  loadingApply,
}: SkillThresholdsProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Set Skill Matching Thresholds</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {allSkills.map((skill, index) => (
          <div key={index} className="space-y-2">
            <Label className="text-base">{skill}</Label>
            <RadioGroup
              disabled={!extractedSkills.includes(skill)}
              value={
                extractedSkills.includes(skill)
                  ? skillMatchThresholds[skill]?.toString() || "50"
                  : ""
              }
              onValueChange={(value) =>
                onSkillChange(skill, parseInt(value, 10))
              }
              className="flex flex-wrap gap-4"
            >
              {[50, 70, 80, 90].map((threshold) => (
                <div key={threshold} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={threshold.toString()}
                    id={`${skill}-${threshold}`}
                    disabled={!extractedSkills.includes(skill)}
                  />
                  <Label
                    htmlFor={`${skill}-${threshold}`}
                    className={
                      !extractedSkills.includes(skill)
                        ? "text-muted-foreground"
                        : ""
                    }
                  >
                    Above {threshold}%
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={onSubmit} disabled={loadingApply} className="w-full">
          {loadingApply ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
              <span>Applying...</span>
            </div>
          ) : (
            "Apply Thresholds"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
