"use client";

import React from "react";
import classNames from "classnames/bind";
import styles from "./NotificationPreview.module.scss";

const cn = classNames.bind(styles);

interface NotificationPreviewProps {
  appName: string;
  title: string;
  body: string;
  imageUrl?: string;
}

const NotificationPreview: React.FC<NotificationPreviewProps> = ({
  appName,
  title,
  body,
  imageUrl,
}) => {
  return (
    <div className={cn("preview")}>
      <div className={cn("statusBar")}>
        <span className={cn("time")}>9:41</span>
        <span className={cn("icons")}></span>
      </div>
      <div className={cn("notification")}>
        <div className={cn("row")}>
          <div className={cn("appIcon")} aria-hidden />
          <div className={cn("meta")}>
            <span className={cn("appName")}>{appName}</span>
            <span className={cn("now")}>지금</span>
          </div>
        </div>
        <div className={cn("content")}>
          <div className={cn("title")}>{title}</div>
          <div className={cn("body")}>{body}</div>
          {imageUrl && (
            <div className={cn("imageWrapper")}>
              <img src={imageUrl} alt="notification" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPreview;
