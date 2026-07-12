import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Card } from "@/components/common/Card";
import { Modal } from "@/components/common/Modal";
import { AssignmentForm } from "@/components/forms/AssignmentForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { AssignmentTable } from "@/components/tables/AssignmentTable";
import { dummyAssignments } from "@/data/dummyAssignments";

export function TeacherAssignments() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <PageHeader title="Tugas" description="Buat tugas, upload file tugas, atau tambahkan link." actions={<Button onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" />Buat Tugas</Button>} />
      <Card><AssignmentTable assignments={dummyAssignments} /></Card>
      {modalOpen && <Modal title="Buat Tugas" onClose={() => setModalOpen(false)}><AssignmentForm /></Modal>}
    </div>
  );
}
