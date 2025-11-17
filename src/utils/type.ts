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
  type: string; // "USER_PROFILE" | "VOICE_RESPONSE" | "CHAT_MESSAGE"
  status: "PENDING" | "RESOLVED";
  createdAt: string;
  reporter: {
    id: number;
    nickname: string;
  };
  reported: {
    id: number;
    nickname: string;
  }; // reportedContent 타입을 Union 타입으로 변경
  reportedContent?: ReportedVoiceResponse | ReportedProfileAnswer[];
}

//제재 타입
export interface SanctionType {
  reportId: number;
  type: string;
  reason: string;
}

// 전체 푸시 알림 타입
export interface NotificationType {
  title: string;
  body: string;
  linkUrl?: string;
  imageUrl?: string;
}
