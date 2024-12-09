import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Student {
  name: string;
  skills: Record<string, number>;
  "Match Count": number;
}

interface RecommendedStudentsProps {
  students: Student[];
  totalStudents: number;
}

export function RecommendedStudents({
  students,
  totalStudents,
}: RecommendedStudentsProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          Recommended Students ({students.length}/{totalStudents})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead className="text-right">Custom Score</TableHead>
                <TableHead className="text-right">Skill Match Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {Object.entries(student.skills).map(([skill, score]) => (
                        <div
                          key={skill}
                          className="flex justify-between text-sm"
                        >
                          <span>{skill}:</span>
                          <span className="font-medium">{score}%</span>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {(
                      Object.values(student.skills).reduce((a, b) => a + b) /
                      Object.keys(student.skills).length
                    ).toFixed(2)}
                    %
                  </TableCell>
                  <TableCell className="text-right">
                    {student["Match Count"]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
