import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface subjectData {
  subject_name: string;
  subject_code: string;
  credit: string;
  finalGrade: string;
  collectScore: number;
  affectiveScore: number;
  testScore: number;
  gradeId: number;
}

interface StudentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  student: { studentCode: string; name: string } | null;
  subjects: subjectData | null;
}

export function StudentPopup({
  isOpen,
  onClose,
  student,
  subjects,
}: StudentPopupProps) {
  const [score, setScore] = useState({
    collectScore: 0,
    affectiveScore: 0,
    finalScore: 0,
  });
  console.log(subjects?.gradeId);
  const handleInputChange = (field: string, value: string) => {
    setScore({ ...score, [field]: value });
  };

  const handleConfirm = () => {
    console.log("Collected Data:", {
      student,
      subjects,
      score,
    });

    onClose();
  };

  useEffect(() => {
    setScore({
      collectScore: subjects?.collectScore || 0,
      affectiveScore: subjects?.affectiveScore || 0,
      finalScore: subjects?.testScore || 0,
    });
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {student?.name} ({student?.studentCode})
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Display subjects as a string */}
          <div className="flex justify-between">
            <h1>วิชา: {subjects?.subject_name || "ไม่มีข้อมูลวิชา"}</h1>
            <h1>รหัสวิชา: {subjects?.subject_code || "ไม่มีข้อมูล"}</h1>
          </div>
          <div className="flex justify-between">
            <h1>หน่วยกิต: {subjects?.credit || "ไม่มีข้อมูล"}</h1>
            <h1>เกรด: {subjects?.finalGrade || "ไม่มีข้อมูล"}</h1>
          </div>
          <div className="p-2">
            <h1>คะแนนเก็บ</h1>
            <Input
              placeholder="คะแนนเก็บ"
              value={score.collectScore}
              onChange={(e) => handleInputChange("testScore", e.target.value)}
            />
          </div>

          <div className="p-2">
            <h1>คะแนนจิตพิสัย</h1>
            <Input
              placeholder="คะแนนจิตพิสัย"
              value={score.affectiveScore}
              onChange={(e) =>
                handleInputChange("affectiveScore", e.target.value)
              }
            />
          </div>
          <div className="p-2">
            <h1>คะแนนสอบ</h1>
            <Input
              placeholder="คะแนนสอบ"
              value={score.finalScore}
              onChange={(e) => handleInputChange("finalScore", e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            กลับ
          </Button>
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={handleConfirm}
          >
            ยืนยัน
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
