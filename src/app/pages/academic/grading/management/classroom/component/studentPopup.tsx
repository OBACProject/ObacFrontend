import { Combobox } from "@/app/components/combobox/combobox";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface StudentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  student: { studentCode: string; name: string } | null;
  subjects: string[];
}

export function StudentPopup({
  isOpen,
  onClose,
  student,
  subjects,
}: StudentPopupProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [collectScore, setCollectScore] = useState({
    testScore: "",
    affectiveScore: "",
    midtermScore: "",
    finalScore: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setCollectScore({ ...collectScore, [field]: value });
  };

  const handleConfirm = () => {
    console.log("Collected Data:", {
      student,
      selectedSubject,
      collectScore,
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {student?.name} ({student?.studentCode})
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Combobox
            buttonLabel="เลือกวิชา"
            options={subjects.map((subject) => ({
              label: subject,
              value: subject,
            }))}
            onSelect={setSelectedSubject}
          />

          <Input
            placeholder="คะแนนเก็บ"
            value={collectScore.testScore}
            onChange={(e) => handleInputChange("testScore", e.target.value)}
          />
          <Input
            placeholder="คะแนนจิตพิสัย"
            value={collectScore.affectiveScore}
            onChange={(e) =>
              handleInputChange("affectiveScore", e.target.value)
            }
          />
          <Input
            placeholder="คะแนนกลางภาค"
            value={collectScore.midtermScore}
            onChange={(e) => handleInputChange("midtermScore", e.target.value)}
          />
          <Input
            placeholder="คะแนนปลายภาค"
            value={collectScore.finalScore}
            onChange={(e) => handleInputChange("finalScore", e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            กลับ
          </Button>
          <Button onClick={handleConfirm}>ยืนยัน</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
