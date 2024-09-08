import { Taskpriority, Taskstatus } from "@prisma/client";

export function statusThai(data: Taskstatus): string {
  switch (data) {
    case "PENDING":
      return "ยังไม่ดำเนินการ";
    case "IN_PROGRESS":
      return "กำลังดำเนินการ";
    case "COMPLETED":
      return "ดำเนินการเสร็จสิ้น";
    default:
      return "Unknown Status";
  }
}

export function prtyThai(data: Taskpriority): string {
  switch (data) {
    case "LOW":
      return "ช้า";
    case "MEDIUM":
      return "ปานกลาง";
    case "HIGH":
      return "เร่งด่วน";
    default:
      return "Unknown Status";
  }
}
