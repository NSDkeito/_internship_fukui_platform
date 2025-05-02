export type UserType = 'student' | 'company' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  createdAt: string;
  updatedAt: string;
}

export interface StudentProfile extends User {
  university: string; // 大学名
  major: string; // 専攻
  graduationYear: number; // 卒業年
  skills: string[]; // スキル
  location: string; // 所在地
  bio: string; // 自己紹介
  avatarUrl?: string; // プロフィール画像URL
  resume?: string; // 履歴書
  preferredIndustries: string[]; // 希望業界
  preferredLocations: string[]; // 希望勤務地
}

export interface CompanyProfile extends User {
  companyName: string; // 会社名
  industry: string; // 業界
  size: string; // 会社規模
  location: string; // 所在地
  description: string; // 会社説明
  websiteUrl: string; // 会社URL
  logoUrl?: string; // ロゴURL
}

export interface Internship {
  id: string;
  companyId: string;
  title: string; // インターンシップタイトル
  description: string; // インターンシップ説明
  requirements: string[]; // 応募要件
  responsibilities: string[]; // 業務内容
  location: string; // 勤務地
  isRemote: boolean; // リモート可否
  salary: {
    amount: number; // 給与額
    period: 'hourly' | 'monthly'; // 給与期間
  };
  startDate: string; // 開始日
  endDate: string; // 終了日
  hoursPerWeek: number; // 週あたりの勤務時間
  applicationDeadline: string; // 応募締切
  industry: string; // 業界
  skills: string[]; // 必要なスキル
  status: 'draft' | 'published' | 'closed'; // ステータス
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  internshipId: string;
  studentId: string;
  status: 'pending' | 'reviewing' | 'interview' | 'accepted' | 'rejected'; // 応募ステータス
  coverLetter?: string; // カバーレター
  appliedAt: string; // 応募日
  updatedAt: string;
}

export interface Scout {
  id: string;
  companyId: string;
  studentId: string;
  internshipId?: string;
  message: string; // スカウトメッセージ
  status: 'sent' | 'read' | 'responded' | 'accepted' | 'rejected'; // スカウトステータス
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string; // メッセージ内容
  isRead: boolean; // 既読状態
  relatedTo?: {
    type: 'internship' | 'application' | 'scout'; // 関連タイプ
    id: string;
  };
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string; // 通知タイトル
  message: string; // 通知メッセージ
  type: 'info' | 'success' | 'warning' | 'error'; // 通知タイプ
  relatedTo?: {
    type: 'internship' | 'application' | 'scout' | 'message'; // 関連タイプ
    id: string;
  };
  isRead: boolean; // 既読状態
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean; // 認証状態
  isLoading: boolean; // ローディング状態
  error: string | null; // エラーメッセージ
}