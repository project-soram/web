import React from "react";
import classNames from "classnames/bind";
import styles from "./layout.module.scss";
import Sidebar from "@/components/admin/Sidebar";

const cn = classNames.bind(styles);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn("layout")}>
      <Sidebar />
      <main className={cn("mainContent")}>{children}</main>
    </div>
  );
}
