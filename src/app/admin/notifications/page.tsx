"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";
import styles from "./notificationsPage.module.scss";
import NotificationForm from "@/components/admin/notifications/NotificationForm";
import NotificationPreview from "@/components/admin/notifications/NotificationPreview";

const cn = classNames.bind(styles);

const TITLE_MAX = 50;
const BODY_MAX = 120;

export default function NotificationsPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [banner, setBanner] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/admin/login");
    }
  }, [router]);

  const isValid = useMemo(() => {
    const hasTitle =
      title.trim().length > 0 && title.trim().length <= TITLE_MAX;
    const hasBody = body.trim().length > 0 && body.trim().length <= BODY_MAX;
    return hasTitle && hasBody;
  }, [title, body]);

  const handleChange = (
    field: "title" | "body" | "linkUrl" | "imageUrl",
    value: string
  ) => {
    if (field === "title") setTitle(value);
    if (field === "body") setBody(value);
    if (field === "linkUrl") setLinkUrl(value);
    if (field === "imageUrl") setImageUrl(value);
  };

  const handleSubmit = async () => {
    if (!isValid) return;
    setIsSubmitting(true);
    try {
      // API 연동은 추후에 연결됩니다. (UI Only)
      await new Promise((resolve) => setTimeout(resolve, 600));
      setBanner("아직 API 연결 전입니다. UI 확인용으로만 동작합니다.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setBanner(null), 3000);
    }
  };

  return (
    <div className={cn("pageContent")}>
      <div className={cn("pageHeader")}>
        <h1 className={cn("title")}>알림 보내기</h1>
        <p className={cn("subtitle")}>
          공지/이벤트 등 전체 사용자 대상 푸시 알림을 작성하고 미리보기로
          확인하세요.
        </p>
      </div>

      {banner && (
        <div role="status" aria-live="polite" className={cn("banner")}>
          {banner}
        </div>
      )}

      <div className={cn("grid")}>
        <section className={cn("card")}>
          <h2 className={cn("cardTitle")}>알림 내용</h2>
          <NotificationForm
            title={title}
            body={body}
            linkUrl={linkUrl}
            imageUrl={imageUrl}
            titleMax={TITLE_MAX}
            bodyMax={BODY_MAX}
            isValid={isValid}
            isSubmitting={isSubmitting}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </section>

        <aside className={cn("card")}>
          <h2 className={cn("cardTitle")}>미리보기</h2>
          <NotificationPreview
            appName="SORAM"
            title={title || "제목"}
            body={body || "내용을 입력하면 푸시 미리보기에 반영됩니다."}
            imageUrl={imageUrl}
          />
        </aside>

        <section className={cn("card", "fullWidth")}>
          <h3 className={cn("cardTitle")}>발송 대상</h3>
          <p className={cn("muted")}>
            현재 페이지는 전체 사용자 대상 공지/방송성 알림 전송 전용입니다.
            세그먼트/타겟팅은 추후 추가 예정입니다.
          </p>
        </section>
      </div>
    </div>
  );
}
