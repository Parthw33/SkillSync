"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

interface Skill {
  name: string;
  threshold: number;
  active: boolean;
}

interface SkillThresholdsProps {
  skills: Skill[];
  onThresholdChange: (value: number[], index: number) => void;
  onSubmitThresholds: () => void;
  showSubmit: boolean;
  isLoading: boolean;
}

export default function SkillThresholds({
  skills,
  onThresholdChange,
  onSubmitThresholds,
  showSubmit,
  isLoading,
}: SkillThresholdsProps) {
  return (
    <Card className="p-8 mb-8">
      <h2 className="text-2xl font-semibold mb-6">Skill Thresholds</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: skill.active ? 1 : 0.5 }}
            animate={{ opacity: skill.active ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            <label className="text-sm font-medium">{skill.name}</label>
            <div className="flex items-center gap-4">
              <Slider
                value={[skill.threshold]}
                onValueChange={(value) => onThresholdChange(value, index)}
                min={0}
                max={100}
                step={1}
                disabled={!skill.active}
              />
              <span className="min-w-[3rem] text-sm">{skill.threshold}%</span>
            </div>
          </motion.div>
        ))}
      </div>
      {showSubmit && (
        <Button
          className="mt-6"
          onClick={onSubmitThresholds}
          disabled={isLoading}
        >
          Apply Thresholds
        </Button>
      )}
    </Card>
  );
}