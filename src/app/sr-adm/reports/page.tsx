"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";
import styles from "../adminPage.module.scss"; // Reusing dashboard styles

const cn = classNames.bind(styles);

// Updated interface to include the 'type' field
interface Report {
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

const reportTypeMap: { [key: string]: string } = {
  VOICE_RESPONSE: "음성 답변",
  USER_PROFILE: "사용자 프로필",
};

const AdminReportsPage = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/sr-adm/login");
        return;
      }

      const API_URL = "http://localhost:3001/api/v1/admin/reports";

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
          throw new Error("신고 목록을 불러오는 데 실패했습니다.");
        }

        const result = await response.json();
        setReports(result.data || []);
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

    fetchReports();
  }, [router]);

  return (
    <div className={cn("pageContent")}>
      <h1 className={cn("title")}>신고 관리</h1>
      <div className={cn("content")}>
        {isLoading && <p>로딩 중...</p>}
        {error && <p className={cn("error")}>오류: {error}</p>}
        {!isLoading && !error && (
          <div className={cn("card")}>
            <table className={cn("table")}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>상태</th>
                  <th>유형</th>
                  <th>신고 사유</th>
                  <th>신고자</th>
                  <th>피신고자</th>
                  <th>신고일</th>
                </tr>
              </thead>
              <tbody className={cn("clickable")}>
                {reports.length > 0 ? (
                  reports.map((report) => (
                    <tr
                      key={report.id}
                      onClick={() =>
                        router.push(`/sr-adm/reports/${report.id}`)
                      }
                    >
                      <td>{report.id}</td>
                      <td>
                        <span
                          className={cn("status", `status${report.status}`)}
                        >
                          {report.status}
                        </span>
                      </td>
                      <td>{reportTypeMap[report.type] || report.type}</td>
                      <td>{report.reason}</td>
                      <td>
                        {report.reporter.nickname} ({report.reporter.id})
                      </td>
                      <td>
                        {report.reported.nickname} ({report.reported.id})
                      </td>
                      <td>{new Date(report.createdAt).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>접수된 신고가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReportsPage;
