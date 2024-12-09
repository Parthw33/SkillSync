"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";

interface Result {
  Name: string;
  Skills: string[];
  Custom_score: number;
  Skill_Match_Count: number;
}

interface ResultsTableProps {
  results: Result[];
}

export default function ResultsTable({
  results: initialResults,
}: ResultsTableProps) {
  const [results, setResults] = useState<Result[]>(initialResults);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/thresholds");
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching results:", error);
        toast.error("Failed to load results. Please try again.");
      }
    };

    if (initialResults.length === 0) {
      fetchResults();
    } else {
      setResults(initialResults);
    }
  }, [initialResults]);

  if (results.length === 0) return null;

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Results</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Custom Score</TableHead>
              <TableHead>Skill Match Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results?.map((result, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{result.Name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {result.Skills.map((skill, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{result.Custom_score.toFixed(2)}%</TableCell>
                <TableCell>{result.Skill_Match_Count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
