import classNames from "classnames/bind";
import styles from "./home-header.module.scss";
import Image from "next/image";
import Link from "next/link";

const cn = classNames.bind(styles);

const HomeHeader = () => {
  return (
    <header className={cn("container")}>
      <div className={cn("inner")}>
        <div className={cn("logo")}>
          <Image src="/icons/logo.png" alt="Soram" width={35} height={35} />
          <span className={cn("logo-text")}>Soram</span>
        </div>
        <div className={cn("right")}>
          <nav className={cn("nav")} aria-label="주요 메뉴">
            <Link href="#brand" className={cn("nav-link")}>
              브랜드
            </Link>
            <Link href="#service" className={cn("nav-link")}>
              서비스
            </Link>
            <Link href="#review" className={cn("nav-link")}>
              리뷰
            </Link>
            <Link href="#news" className={cn("nav-link")}>
              뉴스
            </Link>
            <Link href="#download" className={cn("nav-link")}>
              다운로드
            </Link>
          </nav>

          <div className={cn("cta")}>
            <Link href="#download" className={cn("download-btn")}>
              앱 다운로드
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
