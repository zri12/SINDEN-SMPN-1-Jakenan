import type { Teacher } from "@/types/teacher";

export const dummyTeachers: Teacher[] = [
  { id: "teacher-1", nip: "198501012010011001", fullName: "Bapak Fauzan", subjectName: "Matematika", classNames: ["7A", "7B", "8A"], username: "fauzan", status: "active" },
  { id: "teacher-2", nip: "197803152005012002", fullName: "Ibu Siti Aminah", subjectName: "Bahasa Indonesia", classNames: ["7A", "7C", "8B"], username: "siti.aminah", status: "active" },
  { id: "teacher-3", nip: "198209202008011003", fullName: "Bapak Andi Prasetyo", subjectName: "IPA", classNames: ["8A", "8B", "9A"], username: "andi.prasetyo", status: "active" },
  { id: "teacher-4", nip: "198411302009012004", fullName: "Ibu Rina Marlina", subjectName: "IPS", classNames: ["7B", "9B", "9C"], username: "rina.marlina", status: "active" },
  { id: "teacher-5", nip: "197602082003011005", fullName: "Bapak Dedi Santoso", subjectName: "Bahasa Inggris", classNames: ["7A", "8A", "9A"], username: "dedi.santoso", status: "active" },
  { id: "teacher-6", nip: "198907112014012006", fullName: "Ibu Wulandari", subjectName: "PPKn", classNames: ["7B", "8B", "9B"], username: "wulandari", status: "active" }
];
