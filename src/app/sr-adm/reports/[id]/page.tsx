"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import classNames from "classnames/bind";
import styles from "../../adminPage.module.scss";
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

  // [추가] 제재 유형을 한글로 변환하는 헬퍼 함수
  const getSanctionTypeText = (type: string) => {
    switch (type) {
      case "CONTENT_REMOVAL":
        return "콘텐츠 삭제/변경(닉네임 변경 포함)";
      case "WARNING":
        return "경고 (콘텐츠 조치)"; // WARNING일 때 표시될 텍스트
      case "TEMPORARY_BAN":
        return "일시 정지";
      case "PERMANENT_BAN":
        return "영구 정지";
      default:
        return type;
    }
  };

  //  제재 유형(type)을 인자로 받도록 변경
  const handleSanction = async (
    sanctionType: "CONTENT_REMOVAL" | "PERMANENT_BAN" | "TEMPORARY_BAN", // TEMPORARY_BAN 추가
    duration?: number // duration 인자 추가
  ) => {
    if (!report) return;

    let defaultReason = "";
    let promptTitle = "";

    if (sanctionType === "CONTENT_REMOVAL") {
      promptTitle = "콘텐츠 제재 사유";
      defaultReason =
        report.type === "USER_PROFILE"
          ? "프로필 가이드라인 위반 (사칭 또는 부적절한 내용)"
          : "커뮤니티 가이드라인 위반 (부적절한 답변)";
    } else if (sanctionType === "PERMANENT_BAN") {
      promptTitle = "영구 정지 사유";
      defaultReason = "운영 정책 위반 누적 (영구 정지)";
    } else if (sanctionType === "TEMPORARY_BAN") {
      promptTitle = `${duration}일 정지 사유`;
      defaultReason = `커뮤니티 가이드라인 위반 (${duration}일 이용 제한)`;
    }

    const reason = window.prompt(`${promptTitle}를 입력하세요:`, defaultReason);
    if (!reason) return;

    setIsProcessing(true);
    setError("");
    try {
      await postAdminSanction({
        reportId: report.id,
        type: sanctionType,
        reason,
        duration, // duration 값이 있으면 함께 전송됨 (없으면 undefined)
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
  };

  const getSanctionButtonText = () => {
    if (report?.type === "USER_PROFILE") {
      return "닉네임 강제 변경 - 예) 변경된닉네임1";
    }
    if (report?.type === "VOICE_RESPONSE") {
      return "제재하기 (답변 삭제)";
    }
    return "제재하기";
  };

  // 타입 가드 함수들 생략 (기존 코드 유지)
  const isVoiceResponse = (content: any): content is ReportedVoiceResponse => {
    return (
      report?.type === "VOICE_RESPONSE" && content && "topicBox" in content
    );
  };
  const isProfileAnswerArray = (
    content: any
  ): content is ReportedProfileAnswer[] => {
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
          {/* 신고 정보, 신고자 정보, 피신고자 정보 등 기존 카드들은 유지 */}
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
                <strong>상세 내용:</strong> {report.details || "(없음)"}
              </p>
              <p>
                <strong>신고일:</strong>
                {new Date(report.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <div className={cn("card")}>
            <h2 className={cn("cardTitle")}>신고자 정보</h2>
            <div className={cn("detailList")}>
              <p>
                <strong>유저 ID:</strong> {report.reporter.id}
              </p>
              <p>
                <strong>닉네임:</strong> {report.reporter.nickname}
              </p>
            </div>
          </div>

          <div className={cn("card")}>
            <h2 className={cn("cardTitle")}>피신고자 정보</h2>
            <div className={cn("detailList")}>
              <p>
                <strong>유저 ID:</strong> {report.reported.id}
              </p>
              <p>
                <strong>닉네임:</strong> {report.reported.nickname}
              </p>
            </div>
          </div>

          {/* 콘텐츠 표시 섹션 (기존 코드 유지) */}
          {report.reportedContent && (
            <div className={cn("card", "fullWidth")}>
              <h2 className={cn("cardTitle")}>신고된 사용자 프로필 내용</h2>
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

              {report.type === "USER_PROFILE" && (
                <div className={cn("reportedContent")}>
                  <p className={cn("topicTitle")}>
                    피신고자의 닉네임: {report.reported.nickname}
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
                            Q. {answer.question.content}
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

              {report.type !== "VOICE_RESPONSE" &&
                report.type !== "USER_PROFILE" && (
                  <p>(표시할 신고 콘텐츠가 없습니다.)</p>
                )}
            </div>
          )}
          {/* [새로 추가된 부분] 
            상태가 RESOLVED(해결됨)일 때만 표시되는 '처리 결과' 섹션 
          */}
          {report.status === "RESOLVED" && (
            <div className={cn("card", "fullWidth")}>
              <h2 className={cn("cardTitle")}>처리 결과</h2>
              <div className={cn("detailList")}>
                {report.sanction ? (
                  <>
                    <p>
                      <strong>조치 유형:</strong>{" "}
                      <span className={cn("status", "statusSANCTIONED")}>
                        {getSanctionTypeText(report.sanction.type)}
                      </span>
                    </p>
                    <p>
                      <strong>제재 사유:</strong> {report.sanction.reason}
                    </p>

                    {/* Case 1: 기간이 있는 경우 (일시 정지) */}
                    {report.sanction.expiresAt && (
                      <p>
                        <strong>정지 만료일:</strong>{" "}
                        {new Date(report.sanction.expiresAt).toLocaleString()}{" "}
                        <span style={{ fontSize: "0.85em", color: "#888" }}>
                          (기간:{" "}
                          {Math.ceil(
                            (new Date(report.sanction.expiresAt).getTime() -
                              new Date(report.sanction.createdAt).getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}
                          일)
                        </span>
                      </p>
                    )}

                    {/* Case 2: 영구 정지인 경우 */}
                    {report.sanction.type === "PERMANENT_BAN" && (
                      <p>
                        <strong>정지 기간:</strong> 무기한 (영구 정지)
                      </p>
                    )}

                    {/* [추가] Case 3: 경고/삭제 조치라 기간이 없는 경우 */}
                    {report.sanction.type === "WARNING" &&
                      !report.sanction.expiresAt && (
                        <p>
                          <strong>조치 내용:</strong> 즉시 적용 (콘텐츠
                          삭제/변경 완료)
                        </p>
                      )}

                    <p>
                      <strong>처리일:</strong>{" "}
                      {new Date(report.sanction.createdAt).toLocaleString()}
                    </p>
                  </>
                ) : (
                  /* 문제 없음 처리된 경우 */
                  <div
                    style={{
                      padding: "1rem",
                      background: "#2a2a2a",
                      borderRadius: "8px",
                    }}
                  >
                    <p>
                      <strong>결과:</strong>{" "}
                      <span style={{ color: "#4caf50" }}>
                        문제 없음 (No Violation)
                      </span>
                      으로 종결 처리됨
                    </p>
                    <p
                      style={{
                        marginTop: "0.5rem",
                        fontSize: "0.9rem",
                        color: "#bbb",
                      }}
                    >
                      관리자가 해당 신고를 검토한 결과, 위반 사항이 없다고
                      판단하였습니다.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* --- [수정된 신고 처리 섹션] --- */}
          {report.status === "PENDING" && (
            <div className={cn("card", "fullWidth", "actions")}>
              <h2 className={cn("cardTitle")}>신고 처리</h2>
              <div className={cn("buttonGroup")}>
                {/* 1. 기존: 콘텐츠 제재 (닉네임 변경 / 삭제) */}
                <button
                  onClick={() => handleSanction("CONTENT_REMOVAL")}
                  className={cn("actionButton", "sanction")}
                  disabled={isProcessing}
                >
                  {isProcessing ? "처리 중..." : getSanctionButtonText()}
                </button>
                {/* 2. 추가: 7일 정지 버튼 */}
                <button
                  onClick={() => handleSanction("TEMPORARY_BAN", 7)} // 7일 값 전달
                  className={cn("actionButton", "sanction")}
                  style={{ backgroundColor: "#ff9800", marginLeft: "10px" }} // 주황색
                  disabled={isProcessing}
                >
                  {isProcessing ? "처리 중..." : "7일 정지"}
                </button>

                {/* 3. 기존: 영구 정지 버튼 */}
                <button
                  onClick={() => handleSanction("PERMANENT_BAN")}
                  className={cn("actionButton", "sanction")}
                  style={{ backgroundColor: "#d32f2f", marginLeft: "10px" }} // 빨간색
                  disabled={isProcessing}
                >
                  {isProcessing ? "처리 중..." : "영구 정지"}
                </button>

                {/* 4. 문제 없음 처리 */}
                <button
                  onClick={handleResolve}
                  className={cn("actionButton", "resolve")}
                  disabled={isProcessing}
                >
                  {isProcessing ? "처리 중..." : "문제 없음"}
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
