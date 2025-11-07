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

//리포트 상세 타입
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
  reportedContent?: {
    id: number;
    type: "TEXT" | "VOICE";
    textContent: string | null;
    audioUrl: string | null;
    topicBox: {
      title: string;
      content: string;
    };
  };
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
  linkUrl?: string; // [추가]
  imageUrl?: string; // [추가]
}
