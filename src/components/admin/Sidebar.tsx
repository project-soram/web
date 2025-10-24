"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";

const cn = classNames.bind(styles);

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, you might want to call a logout API endpoint
    localStorage.removeItem("accessToken");
    router.push("/sr-adm/login");
  };

  const menuItems = [
    { href: "/sr-adm", label: "대시보드" },
    { href: "/sr-adm/reports", label: "신고 관리" },
    { href: "/sr-adm/notifications", label: "알림 보내기" },
    // Add more admin pages here in the future
  ];

  return (
    <aside className={cn("sidebar")}>
      <div className={cn("header")}>
        <h1 className={cn("logo")}>SORAM</h1>
        <span className={cn("subLogo")}>Admin Panel</span>
      </div>
      <nav className={cn("nav")}>
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn("navItem", { active: pathname === item.href })}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className={cn("footer")}>
        <button onClick={handleLogout} className={cn("logoutButton")}>
          로그아웃
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
