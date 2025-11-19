export type GalleryItemTypes = {
  id: string;
  label: string; // 작은 카테고리 라벨
  title: string;
  desc: string;
  imageSrc?: string; // 추후 이미지가 들어오면 사용
};

//대시보드 타입
export interface DashboardType {
  message: string;
}

//리포트 타입
export interface ReportType {
  id: number;
  type: string; // Added type field
  reason: string;
  status: "PENDING" | "RESOLVED" | "SANCTIONED";
  createdAt: string;
  reporter: {
    id: number;
    nickname: string;
  };
  reported: {
    id: number;
    nickname: string;
  };
}

// ---  신고 상세 조회를 위한 상세 타입 ---
// 1. 음성 답변 (VOICE_RESPONSE) 타입
export type ReportedVoiceResponse = {
  id: number;
  type: "TEXT" | "VOICE";
  textContent: string | null;
  audioUrl: string | null;
  topicBox: {
    id: number; // admin.service.ts에서 선택함
    title: string;
  };
};

// 2. 프로필 답변 (USER_PROFILE) 타입
export type ReportedProfileAnswer = {
  id: number;
  content: string;
  isPrimary: boolean;
  question: {
    id: number;
    content: string; // 질문 내용
  };
};

// 리포트 상세 타입
export interface ReportDetailType {
  id: number;
  reason: string;
  details: string;
  type: string;
  status: "PENDING" | "RESOLVED";
  createdAt: string;
  reporter: {
    id: number;
    nickname: string;
  };
  reported: {
    id: number;
    nickname: string;
  };
  reportedContent?: ReportedVoiceResponse | ReportedProfileAnswer[];
  //  제재 정보 (null이면 '문제 없음' 처리된 것)
  sanction: SanctionDetail | null;
}

//제재 타입
export interface SanctionType {
  reportId: number;
  type: string;
  reason: string;
  duration?: number; // 선택적 필드
}

// 전체 푸시 알림 타입
export interface NotificationType {
  title: string;
  body: string;
  linkUrl?: string;
  imageUrl?: string;
}

//  제재 상세 정보 타입 (DB의 Sanction 모델과 일치)
export interface SanctionDetail {
  id: number;
  type: "CONTENT_REMOVAL" | "WARNING" | "TEMPORARY_BAN" | "PERMANENT_BAN";
  reason: string;
  expiresAt: string | null; // ISO Date string
  createdAt: string;
}
