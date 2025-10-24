import classNames from "classnames/bind";
import styles from "./home-header.module.scss";
import Link from "next/link";

const cn = classNames.bind(styles);

const HomeHeader = () => {
  return (
    <header className={cn("container")}>
      <div className={cn("inner")}>
        <div className={cn("logo")}>
          <a
            href="/sr-adm"
            className={cn("admin-btn")}
            target="_blank"
            rel="noopener noreferrer"
          >
            .
          </a>
          <span className={cn("logo-text")}>SORAM</span>
        </div>
        <div className={cn("right")}>
          <div className={cn("cta")}>
            <Link
              href="http://localhost:3000/"
              className={cn("download-btn")}
              target="_blank"
              rel="noopener noreferrer"
            >
              앱 다운로드
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
