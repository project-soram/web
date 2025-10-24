"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";
import styles from "./adminLoginPage.module.scss";
const cn = classNames.bind(styles);

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // In a real application, this URL should come from an environment variable
    const API_URL = "http://localhost:3001/api/v1/auth/admin/login";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "로그인에 실패했습니다.");
      }

      const data = await response.json();
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        router.push("/sr-adm"); // Redirect to admin dashboard on success
      }
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

  return (
    <div className={cn("page")}>
      <h1 className={cn("title")}>관리자</h1>

      <form className={cn("card")} onSubmit={handleSubmit}>
        <div className={cn("inputGroup")}>
          <label htmlFor="adminEmail" className={cn("label")}>
            아이디
          </label>
          <div className={cn("inputWrap")}>
            <input
              id="adminEmail"
              type="text"
              placeholder="soram"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn("input")}
              aria-label="관리자 아이디"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className={cn("inputGroup")}>
          <label htmlFor="adminPw" className={cn("label")}>
            패스워드
          </label>
          <div className={cn("inputWrap")}>
            <input
              id="adminPw"
              type={show ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn("input")}
              aria-label="관리자 패스워드"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className={cn("toggle")}
              aria-label={`비밀번호 ${show ? "숨기기" : "보기"}`}
              disabled={isLoading}
            >
              {show ? "숨김" : "보기"}
            </button>
          </div>
        </div>

        {error && <p className={cn("error")}>{error}</p>}

        <button
          type="submit"
          className={cn("enterBtn")}
          disabled={!email.trim() || !password.trim() || isLoading}
        >
          {isLoading ? "로그인 중..." : "입장하기"}
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
