"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames/bind";
import { useMutation } from "@tanstack/react-query"; // [추가] react-query
import { toast } from "react-toastify"; // [추가] 피드백을 위한 toast

import styles from "./notificationsPage.module.scss";
import NotificationForm from "@/components/admin/notifications/NotificationForm";
import NotificationPreview from "@/components/admin/notifications/NotificationPreview";

// [추가] API 함수 및 타입
import { NotificationType } from "@/utils/type";
import { sendBroadcastNotification } from "@/utils/api/adminApi";

const cn = classNames.bind(styles);

// 기존 파일의 상수 유지
const TITLE_MAX = 50;
const BODY_MAX = 120;

export default function NotificationsPage() {
  const router = useRouter();

  // [수정] 여러 개의 state를 하나의 객체로 관리
  const [formState, setFormState] = useState<NotificationType>({
    title: "",
    body: "",
    linkUrl: "",
    imageUrl: "",
  });

  // [제거] banner, isSubmitting state (useMutation과 toast로 대체)

  // [유지] 기존 인증 확인 로직
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/sr-adm/login");
    }
  }, [router]);

  // [추가] react-query useMutation을 사용한 API 호출 관리
  const { mutate: sendNotification, isPending: isSubmitting } = useMutation({
    mutationFn: sendBroadcastNotification,
    onSuccess: (data) => {
      // 성공 시 toast 알림
      toast.success(data.message || "전체 알림이 성공적으로 발송되었습니다.");
      // 폼 초기화
      setFormState({
        title: "",
        body: "",
        linkUrl: "",
        imageUrl: "",
      });
    },
    onError: (error: any) => {
      // 실패 시 toast 알림
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "알림 발송에 실패했습니다. 다시 시도해주세요.";
      toast.error(errorMessage);
    },
  });

  // [수정] formState를 사용하도록 의존성 및 로직 변경
  const isValid = useMemo(() => {
    const hasTitle =
      formState.title.trim().length > 0 &&
      formState.title.trim().length <= TITLE_MAX;
    const hasBody =
      formState.body.trim().length > 0 &&
      formState.body.trim().length <= BODY_MAX;
    return hasTitle && hasBody;
  }, [formState.title, formState.body]);

  // [수정] 단일 state 객체를 업데이트하도록 핸들러 변경
  const handleChange = (field: keyof NotificationType, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // [수정] API를 호출하도록 handleSubmit 변경
  const handleSubmit = async () => {
    if (!isValid || isSubmitting) return; // 중복 제출 방지

    // API DTO에 맞게 payload 정제
    const payload: NotificationType = {
      title: formState.title.trim(),
      body: formState.body.trim(),
      linkUrl: formState.linkUrl?.trim() || undefined,
      imageUrl: formState.imageUrl?.trim() || undefined,
    };

    sendNotification(payload); // useMutation 실행
  };

  return (
    // [유지] 기존 JSX 레이아웃
    <div className={cn("pageContent")}>
      <div className={cn("pageHeader")}>
        <h1 className={cn("title")}>알림 보내기</h1>
        <p className={cn("subtitle")}>
          공지/이벤트 등 전체 사용자 대상 푸시 알림을 작성하고 미리보기로
          확인하세요.
        </p>
      </div>

      {/* [제거] banner UI (toast로 대체됨) */}

      <div className={cn("grid")}>
        <section className={cn("card")}>
          <h2 className={cn("cardTitle")}>알림 내용</h2>
          <NotificationForm
            // [수정] formState에서 props 전달
            title={formState.title}
            body={formState.body}
            linkUrl={formState.linkUrl || ""}
            imageUrl={formState.imageUrl || ""}
            titleMax={TITLE_MAX}
            bodyMax={BODY_MAX}
            isValid={isValid}
            isSubmitting={isSubmitting} // useMutation의 isPending 상태 전달
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </section>

        <aside className={cn("card")}>
          <h2 className={cn("cardTitle")}>미리보기</h2>
          <NotificationPreview
            appName="SORAM"
            // [수정] formState에서 props 전달
            title={formState.title || "제목"}
            body={
              formState.body || "내용을 입력하면 푸시 미리보기에 반영됩니다."
            }
            imageUrl={formState.imageUrl}
          />
        </aside>

        <section className={cn("card", "fullWidth")}>
          <h3 className={cn("cardTitle")}>발송 대상</h3>
          <p className={cn("muted")}>
            현재 페이지는 전체 사용자 대상 공지/방송성 알림 전용입니다.
            세그먼트/타겟팅은 추후 추가 예정입니다.
          </p>
        </section>
      </div>
    </div>
  );
}
