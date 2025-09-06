"use client";

import React from "react";
import classNames from "classnames/bind";
import styles from "./NotificationForm.module.scss";

const cn = classNames.bind(styles);

interface NotificationFormProps {
  title: string;
  body: string;
  linkUrl: string;
  imageUrl: string;
  titleMax: number;
  bodyMax: number;
  isValid: boolean;
  isSubmitting: boolean;
  onChange: (
    field: "title" | "body" | "linkUrl" | "imageUrl",
    value: string
  ) => void;
  onSubmit: () => void;
}

const NotificationForm: React.FC<NotificationFormProps> = ({
  title,
  body,
  linkUrl,
  imageUrl,
  titleMax,
  bodyMax,
  isValid,
  isSubmitting,
  onChange,
  onSubmit,
}) => {
  return (
    <form
      className={cn("form")}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className={cn("fieldGroup")}>
        <label htmlFor="title" className={cn("label")}>
          제목
        </label>
        <input
          id="title"
          type="text"
          value={title}
          maxLength={titleMax}
          onChange={(e) => onChange("title", e.target.value)}
          className={cn("input")}
          placeholder="예: 공지사항 - 업데이트 안내"
          required
        />
        <div className={cn("hintRow")}>
          <span className={cn("hint")}>푸시 제목은 최대 {titleMax}자 권장</span>
          <span className={cn("counter")}>
            {title.length}/{titleMax}
          </span>
        </div>
      </div>

      <div className={cn("fieldGroup")}>
        <label htmlFor="body" className={cn("label")}>
          내용
        </label>
        <textarea
          id="body"
          value={body}
          maxLength={bodyMax}
          onChange={(e) => onChange("body", e.target.value)}
          className={cn("textarea")}
          placeholder="예: 오늘 오후 6시에 서비스 점검이 예정되어 있습니다."
          rows={5}
          required
        />
        <div className={cn("hintRow")}>
          <span className={cn("hint")}>본문은 최대 {bodyMax}자 권장</span>
          <span className={cn("counter")}>
            {body.length}/{bodyMax}
          </span>
        </div>
      </div>

      <div className={cn("fieldGrid")}>
        <div className={cn("fieldGroup")}>
          <label htmlFor="linkUrl" className={cn("label")}>
            딥링크/이동 URL (선택)
          </label>
          <input
            id="linkUrl"
            type="url"
            value={linkUrl}
            onChange={(e) => onChange("linkUrl", e.target.value)}
            className={cn("input")}
            placeholder="예: soram://notice/123 또는 https://..."
          />
        </div>
        <div className={cn("fieldGroup")}>
          <label htmlFor="imageUrl" className={cn("label")}>
            이미지 URL (선택)
          </label>
          <input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => onChange("imageUrl", e.target.value)}
            className={cn("input")}
            placeholder="예: https://.../banner.png"
          />
        </div>
      </div>

      <div className={cn("actions")}>
        <button
          type="submit"
          className={cn("submitButton")}
          disabled={!isValid || isSubmitting}
          aria-disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "전송 중..." : "전체 사용자에게 전송"}
        </button>
      </div>
    </form>
  );
};

export default NotificationForm;
