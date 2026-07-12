export interface Teacher {
  id: string;
  profileId?: string;
  nip?: string;
  nuptk?: string;
  fullName: string;
  subjectName: string;
  classNames: string[];
  username: string;
  status: "active" | "inactive";
}
