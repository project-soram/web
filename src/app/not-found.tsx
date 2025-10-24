"use client";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f8f8f8",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "8rem",
          margin: 0,
          color: "#ff5f5f",
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: "1.5rem",
          color: "#555",
          marginBottom: "2rem",
        }}
      >
        찾으시는 페이지가 존재하지 않아요!
      </p>
      <button
        onClick={() => router.replace(`${process.env.NEXT_PUBLIC_SITE_URL}`)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#333",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default NotFoundPage;
