"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import classNames from "classnames/bind";
import styles from "../../adminPage.module.scss"; // Reusing dashboard styles
import {
  getAdminReportDetail,
  postAdminSanction,
  resolveAdminReport,
} from "@/utils/api/adminApi";
import {
  ReportDetailType,
  ReportedVoiceResponse,
  ReportedProfileAnswer,
} from "@/utils/type";
const cn = classNames.bind(styles);

const ReportDetailPage = () => {
  const [report, setReport] = useState<ReportDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;

    const fetchReportDetail = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/sr-adm/login");
        return;
      }

      try {
        // API 응답을 ReportDetailType으로 타입 단언
        const data = (await getAdminReportDetail(
          id as string
        )) as ReportDetailType;
        setReport(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchReportDetail();
  }, [id, router]);

  const handleSanction = async () => {
    if (!report) return; //  신고 유형에 따라 제재 사유 placeholder 변경
    // 신고 유형에 따라 제재 사유 placeholder 변경
    const defaultReason =
      report.type === "USER_PROFILE"
        ? "프로필 가이드라인 위반 (사칭 또는 부적절한 내용)"
        : "커뮤니티 가이드라인 위반 (부적절한 답변)";

    const reason = window.prompt("제재 사유를 입력하세요:", defaultReason);
    if (!reason) return;

    setIsProcessing(true);
    setError("");
    try {
      await postAdminSanction({
        reportId: report.id,
        type: "CONTENT_REMOVAL", // 백엔드가 report.type에 따라 조치함
        reason,
      });
      setReport((prev) => (prev ? { ...prev, status: "RESOLVED" } : prev));
      alert("처리가 완료되었습니다.");
    } catch (err: unknown) {
      const axiosMessage =
        typeof (err as { response?: { data?: { message?: unknown } } })
          ?.response?.data?.message === "string"
          ? ((err as { response?: { data?: { message?: unknown } } })?.response
              ?.data?.message as string)
          : undefined;
      const message =
        axiosMessage ??
        (err instanceof Error ? err.message : "작업에 실패했습니다.");
      setError(message);
      alert(`오류: ${message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResolve = async () => {
    if (!report) return;
    if (!window.confirm("정말로 이 신고를 '문제 없음'으로 처리하시겠습니까?"))
      return;

    setIsProcessing(true);
    setError("");
    try {
      await resolveAdminReport(report.id);
      setReport((prev) => (prev ? { ...prev, status: "RESOLVED" } : prev));
      alert("처리가 완료되었습니다.");
    } catch (err: unknown) {
      const axiosMessage =
        typeof (err as { response?: { data?: { message?: unknown } } })
          ?.response?.data?.message === "string"
          ? ((err as { response?: { data?: { message?: unknown } } })?.response
              ?.data?.message as string)
          : undefined;
      const message =
        axiosMessage ??
        (err instanceof Error ? err.message : "작업에 실패했습니다.");
      setError(message);
      alert(`오류: ${message}`);
    } finally {
      setIsProcessing(false);
    }
  }; // 신고 유형에 따라 제재 버튼 텍스트를 동적으로 반환하는 함수
  const getSanctionButtonText = () => {
    if (isProcessing) return "처리 중...";
    if (report?.type === "USER_PROFILE") {
      return "제재하기 (프로필 조치)";
    }
    if (report?.type === "VOICE_RESPONSE") {
      return "제재하기 (답변 삭제)";
    }
    return "제재하기"; // 기본값
  }; // 타입 가드 함수 (TypeScript의 타입 추론을 돕기 위함)

  const isVoiceResponse = (content: any): content is ReportedVoiceResponse => {
    // 'topicBox'는 ReportedVoiceResponse에만 있는 고유 속성
    return (
      report?.type === "VOICE_RESPONSE" && content && "topicBox" in content
    );
  };

  const isProfileAnswerArray = (
    content: any
  ): content is ReportedProfileAnswer[] => {
    // 'USER_PROFILE'일 경우 content는 배열임
    return report?.type === "USER_PROFILE" && Array.isArray(content);
  };

  return (
    <div className={cn("pageContent")}>
      <div className={cn("pageHeader")}>
        <h1 className={cn("title")}>신고 상세 정보 (ID: {id})</h1>

        <Link href="/sr-adm/reports" className={cn("backButton")}>
          목록으로 돌아가기
        </Link>
      </div>
      {isLoading && <p>로딩 중...</p>}
      {error && <p className={cn("error")}>오류: {error}</p>}
      {report && (
        <div className={cn("grid")}>
          {/* 신고 정보 */}
          <div className={cn("card")}>
            <h2 className={cn("cardTitle")}>신고 정보</h2>
            <div className={cn("detailList")}>
              <p>
                <strong>상태:</strong>
                <span className={cn("status", `status${report.status}`)}>
                  {report.status}
                </span>
              </p>
              <p>
                <strong>유형:</strong> {report.type}
              </p>
              <p>
                <strong>사유:</strong> {report.reason}
              </p>
              <p>
                <strong>상세 내용:</strong>
                {report.details || "(없음)"}
              </p>
              <p>
                <strong>신고일:</strong>
                {new Date(report.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          {/* 신고자 정보 */}
          <div className={cn("card")}>
            <h2 className={cn("cardTitle")}>신고자 정보</h2>
            <div className={cn("detailList")}>
              <p>
                <strong>유저 ID:</strong> {report.reporter.id}
              </p>
              <p>
                <strong>닉네임:</strong>
                {report.reporter.nickname}
              </p>
            </div>
          </div>
          {/* 피신고자 정보 */}
          <div className={cn("card")}>
            <h2 className={cn("cardTitle")}>피신고자 정보</h2>
            <div className={cn("detailList")}>
              <p>
                <strong>유저 ID:</strong> {report.reported.id}
              </p>
              <p>
                <strong>닉네임:</strong>
                {report.reported.nickname}
              </p>
            </div>
          </div>
          {/* ---  신고된 콘텐츠 (동적 렌더링) --- */}
          {report.reportedContent && (
            <div className={cn("card", "fullWidth")}>
              <h2 className={cn("cardTitle")}>신고된 콘텐츠</h2>
              {/* Case 1: 음성 답변 신고 */}
              {report.type === "VOICE_RESPONSE" && (
                <div className={cn("reportedContent")}>
                  <p className={cn("topicTitle")}>
                    주제:
                    {(report.reportedContent as ReportedVoiceResponse).topicBox
                      ?.title || "(알 수 없음)"}
                  </p>

                  <div className={cn("answerContent")}>
                    {(report.reportedContent as ReportedVoiceResponse)
                      .textContent && (
                      <p>
                        <strong>답변 내용:</strong>

                        {
                          (report.reportedContent as ReportedVoiceResponse)
                            .textContent
                        }
                      </p>
                    )}

                    {(report.reportedContent as ReportedVoiceResponse)
                      .audioUrl && (
                      <audio
                        controls
                        src={
                          (report.reportedContent as ReportedVoiceResponse)
                            .audioUrl as string
                        }
                        style={{ width: "100%", marginTop: "1rem" }}
                      >
                        Your browser does not support the audio element.
                      </audio>
                    )}
                  </div>
                </div>
              )}
              {/* Case 2: 프로필 신고 */}
              {report.type === "USER_PROFILE" && (
                <div className={cn("reportedContent")}>
                  <p className={cn("topicTitle")}>
                    피신고자의 닉네임:
                    {report.reported.nickname}
                  </p>

                  <p>
                    <strong>프로필 답변 목록:</strong>
                  </p>

                  {(report.reportedContent as ReportedProfileAnswer[]).length >
                  0 ? (
                    (report.reportedContent as ReportedProfileAnswer[]).map(
                      (answer) => (
                        <div
                          key={answer.id}
                          className={cn("profileAnswerItem")}
                        >
                          <strong className={cn("question")}>
                            Q.
                            {answer.question.content}
                          </strong>

                          <p className={cn("answer")}>A. {answer.content}</p>
                        </div>
                      )
                    )
                  ) : (
                    <p>(작성된 프로필 답변이 없습니다.)</p>
                  )}
                </div>
              )}

              {/* Case 3: 기타 (채팅 등. 현재는 표시할 콘텐츠 없음) */}

              {report.type !== "VOICE_RESPONSE" &&
                report.type !== "USER_PROFILE" && (
                  <p>(표시할 신고 콘텐츠가 없습니다.)</p>
                )}
            </div>
          )}
          {/* --- [콘텐츠 섹션 끝] --- */}
          {/* 신고 처리 (PENDING 상태일 때만 보임) */}
          {report.status === "PENDING" && (
            <div className={cn("card", "fullWidth", "actions")}>
              <h2 className={cn("cardTitle")}>신고 처리</h2>
              <div className={cn("buttonGroup")}>
                <button
                  onClick={handleSanction}
                  className={cn("actionButton", "sanction")}
                  disabled={isProcessing}
                >
                  {/*  동적 버튼 텍스트 적용 */}
                  {getSanctionButtonText()}
                </button>
                <button
                  onClick={handleResolve}
                  className={cn("actionButton", "resolve")}
                  disabled={isProcessing}
                >
                  {isProcessing ? "처리 중..." : "문제 없음으로 처리"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportDetailPage;
