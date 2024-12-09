import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef } from "react";

interface FileUploadProps {
  pdfFile: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loadingSubmit: boolean;
}

export function FileUpload({
  pdfFile,
  onFileChange,
  onSubmit,
  loadingSubmit,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === "application/pdf") {
      const event = {
        target: {
          files: files,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onFileChange(event);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          Upload Job Description PDF
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full gap-4">
          <input
            ref={fileInputRef}
            type="file"
            onChange={onFileChange}
            className="hidden"
            id="upload-file"
            accept="application/pdf"
          />
          <div
            onClick={handleButtonClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="relative cursor-pointer"
          >
            <Button
              variant="outline"
              className="w-full border-dashed border-2 h-32 hover:border-primary hover:bg-primary/5 transition-colors"
              type="button"
            >
              <div className="flex flex-col items-center space-y-4">
                <UploadCloud className="h-8 w-8 text-muted-foreground" />
                <div className="space-y-2 text-center">
                  <p className="text-sm text-muted-foreground">
                    {pdfFile
                      ? pdfFile.name
                      : "Drag & drop your PDF here or click to browse"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF files only (max 10MB)
                  </p>
                </div>
              </div>
            </Button>
          </div>
          <Button
            onClick={onSubmit}
            disabled={!pdfFile || loadingSubmit}
            className="w-full"
          >
            {loadingSubmit ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                <span>Processing...</span>
              </div>
            ) : (
              "Upload and Get Recommendations"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
