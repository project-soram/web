import React from "react";
import classNames from "classnames/bind";
import styles from "./layout.module.scss";
import Sidebar from "@/components/admin/Sidebar";
import QueryProvider from "@/providers/QueryProvider"; // [추가] QueryProvider 임포트

const cn = classNames.bind(styles);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // [수정] QueryProvider로 전체 레이아웃을 감쌉니다.
    <QueryProvider>
      <div className={cn("layout")}>
        <Sidebar />
        <main className={cn("mainContent")}>{children}</main>
      </div>
    </QueryProvider>
  );
}
