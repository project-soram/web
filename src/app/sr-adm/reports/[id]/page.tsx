"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import classNames from "classnames/bind";
import styles from "../../adminPage.module.scss"; // Reusing dashboard styles

const cn = classNames.bind(styles);

// Updated interface to match the full API response for report details
interface ReportDetail {
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

const ReportDetailPage = () => {
  const [report, setReport] = useState<ReportDetail | null>(null);
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

      const API_URL = `http://localhost:3001/api/v1/admin/reports/${id}`;

      try {
        const response = await fetch(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("accessToken");
          router.push("/sr-adm/login");
          return;
        }

        if (!response.ok) {
          throw new Error("신고 상세 정보를 불러오는 데 실패했습니다.");
        }

        const data: ReportDetail = await response.json();
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

  const handleApiCall = async (
    url: string,
    options: RequestInit,
    successStatus: ReportDetail["status"]
  ) => {
    setIsProcessing(true);
    setError("");
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "작업에 실패했습니다.");
      }

      // Update status on success
      setReport((prev) => (prev ? { ...prev, status: successStatus } : null));
      alert("처리가 완료되었습니다.");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        alert(`오류: ${err.message}`);
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
        alert("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSanction = () => {
    if (!report) return;
    const reason = window.prompt(
      "제재 사유를 입력하세요:",
      "커뮤니티 가이드라인 위반"
    );
    if (reason) {
      const body = {
        reportId: report.id,
        type: "CONTENT_REMOVAL", // Defaulting to this type for now
        reason: reason,
      };
      handleApiCall(
        "http://localhost:3001/api/v1/admin/sanctions",
        { method: "POST", body: JSON.stringify(body) },
        "RESOLVED"
      );
    }
  };

  const handleResolve = () => {
    if (!report) return;
    if (window.confirm("정말로 이 신고를 '문제 없음'으로 처리하시겠습니까?")) {
      handleApiCall(
        `http://localhost:3001/api/v1/admin/reports/${report.id}/resolve`,
        { method: "POST" },
        "RESOLVED"
      );
    }
  };

  return (
    <div className={cn("pageContent")}>
      <div className={cn("pageHeader")}>
        <h1 className={cn("title")}>신고 상세 정보 (ID: {id})</h1>
        <Link href="/sr-adm/reports" className={cn("backButton")}>
          &larr; 목록으로 돌아가기
        </Link>
      </div>

      {isLoading && <p>로딩 중...</p>}
      {error && <p className={cn("error")}>오류: {error}</p>}
      {report && (
        <div className={cn("grid")}>
          <div className={cn("card")}>
            <h2 className={cn("cardTitle")}>신고 정보</h2>
            <div className={cn("detailList")}>
              <p>
                <strong>상태:</strong>{" "}
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
                <strong>상세 내용:</strong> {report.details}
              </p>
              <p>
                <strong>신고일:</strong>{" "}
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
          {report.reportedContent && (
            <div className={cn("card", "fullWidth")}>
              <h2 className={cn("cardTitle")}>신고된 콘텐츠</h2>
              <div className={cn("reportedContent")}>
                <p className={cn("topicTitle")}>
                  주제: {report.reportedContent.topicBox.title}
                </p>
                <blockquote className={cn("topicContent")}>
                  {report.reportedContent.topicBox.content}
                </blockquote>
                <div className={cn("answerContent")}>
                  {report.reportedContent.textContent && (
                    <p>
                      <strong>답변 내용:</strong>{" "}
                      {report.reportedContent.textContent}
                    </p>
                  )}
                  {report.reportedContent.audioUrl && (
                    <audio
                      controls
                      src={report.reportedContent.audioUrl}
                      style={{ width: "100%", marginTop: "1rem" }}
                    >
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
              </div>
            </div>
          )}
          {report.status === "PENDING" && (
            <div className={cn("card", "fullWidth", "actions")}>
              <h2 className={cn("cardTitle")}>신고 처리</h2>
              <div className={cn("buttonGroup")}>
                <button
                  onClick={handleSanction}
                  className={cn("actionButton", "sanction")}
                  disabled={isProcessing}
                >
                  {isProcessing ? "처리 중..." : "제재하기 (답변 삭제)"}
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
