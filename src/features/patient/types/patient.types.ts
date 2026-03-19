export interface Patient {
  id: string; 
  patientCode: string;
  fullName: string;
  age: number;
  gender: 'Nam' | 'Nữ' | 'Khác';
  lastVisit: string;
  status: 'Bình thường' | 'Cần theo dõi' | 'Nguy cơ cao';
  avatarUrl?: string;
}