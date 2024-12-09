"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FileUpload } from "@/components/FileUpload";
import { SkillThresholds } from "@/components/SkillThresholds";
import { RecommendedStudents } from "@/components/RecommendedStudents";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Brain } from "lucide-react";
import Navbar from "@/components/Navbar";

function App() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [recommendedStudents, setRecommendedStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [allSkills, setAllSkills] = useState<string[]>([]);
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [skillMatchThresholds, setSkillMatchThresholds] = useState<
    Record<string, number>
  >({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingApply, setLoadingApply] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/get_skills");
        setAllSkills(response.data.skills || []);
      } catch (error) {
        console.error("Error fetching skills:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch skills. Please try again later.",
        });
      }
    };
    fetchSkills();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleSkillChange = (skill: string, threshold: number) => {
    setSkillMatchThresholds((prev) => ({
      ...prev,
      [skill]: threshold,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdfFile) return;

    setLoadingSubmit(true);
    const formData = new FormData();
    formData.append("pdf", pdfFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/recommend",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setRecommendedStudents(response.data.students || []);
      setExtractedSkills(response.data.extracted_skills || []);
      setSkillMatchThresholds({});
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process the PDF. Please try again.",
      });
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleThresholdsSubmit = async () => {
    setLoadingApply(true);
    const thresholds = extractedSkills.reduce((acc, skill) => {
      acc[skill] =
        skillMatchThresholds[skill] !== undefined
          ? skillMatchThresholds[skill]
          : 0;
      return acc;
    }, {} as Record<string, number>);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/recommend_with_thresholds",
        { thresholds },
        { headers: { "Content-Type": "application/json" } }
      );
      setRecommendedStudents(response.data.students || []);
      setTotalStudents(response.data.total_students || 0);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to apply thresholds. Please try again.",
      });
    } finally {
      setLoadingApply(false);
    }
  };

  return (
    <>
      <main className="relative isolate top-20">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="container mx-auto px-4 py-8 space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <Brain className="h-12 w-12 text-primary" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                AI Candidate Recommendation Engine
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Upload a job description PDF and let our AI engine find the best
              matching candidates based on their skills and experience.
            </p>
          </div>

          <FileUpload
            pdfFile={pdfFile}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
            loadingSubmit={loadingSubmit}
          />

          {allSkills.length > 0 && (
            <SkillThresholds
              allSkills={allSkills}
              extractedSkills={extractedSkills}
              skillMatchThresholds={skillMatchThresholds}
              onSkillChange={handleSkillChange}
              onSubmit={handleThresholdsSubmit}
              loadingApply={loadingApply}
            />
          )}

          {recommendedStudents.length > 0 && (
            <RecommendedStudents
              students={recommendedStudents}
              totalStudents={totalStudents}
            />
          )}
        </div>
        <Toaster />
      </main>
    </>
  );
}

export default App;
