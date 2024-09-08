import { Taskstatus } from "@prisma/client";

export function statusThai(status: Taskstatus): string {
  switch (status) {
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