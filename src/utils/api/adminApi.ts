// 관리자용 api 모음
import { ReportDetailType, SanctionType, NotificationType } from "../type";
import instance from "./axios";

// 1. 관리자 로그인
export const getAdminLogin = async (email: string, password: string) => {
  const { data } = await instance.post(`/auth/admin/login`, {
    email,
    password,
  });
  return data;
};

// 2. 관리자 로그아웃
export const getAdminLogout = async () => {
  const { data } = await instance.post(`/auth/admin/logout`);
  return data;
};

// 3. 관리자 대시보드 조회
export const getAdminDashboard = async () => {
  const { data } = await instance.get(`/admin/dashboard`);
  return data;
};

// 4. 관리자 신고 조회
export const getAdminReports = async () => {
  const { data } = await instance.get(`/admin/reports`);
  return data;
};

// 5. 관리자 신고 상세 조회
export const getAdminReportDetail = async (id: string) => {
  const { data } = await instance.get<ReportDetailType>(`/admin/reports/${id}`);
  return data;
};

// 6. 관리자 신고 기반 제재 생성
export const postAdminSanction = async (body: SanctionType) => {
  const { data } = await instance.post(`/admin/sanctions`, body);
  return data;
};

// 7. 관리자 신고를 문제 없음으로 종결 처리
export const resolveAdminReport = async (id: number) => {
  const { data } = await instance.post(`/admin/reports/${id}/resolve`);
  return data;
};

// 8. 전체알림 [시그니처 수정]
export const sendBroadcastNotification = async (
  payload: NotificationType // [수정] 개별 파라미터 대신 DTO 객체를 받도록 변경
) => {
  const { data } = await instance.post(
    `/admin/notifications/broadcast`,
    payload // [수정] 객체 전체를 전송
  );
  return data;
};
