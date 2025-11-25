import classNames from "classnames/bind";
import styles from "./footer.module.scss";
import Image from "next/image";
import Link from "next/link";

const cn = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cn("container")}>
      <div className={cn("inner")}>
        <div className={cn("brand")}>
          <Image src="/icons/logo.png" alt="Soram" width={24} height={24} />
          <span className={cn("brand-text")}>Soram</span>
        </div>

        <address className={cn("company")}>
          <p>dapjiofficial@gmail.com</p>
          <p>대표자: 박지용</p>
        </address>

        <nav className={cn("links")} aria-label="푸터 링크">
          <Link href="/privacy" className={cn("link")}>
            개인정보 처리방침
          </Link>
          <span className={cn("sep")} aria-hidden>
            ·
          </span>
          <Link href="/terms" className={cn("link")}>
            이용약관
          </Link>
          <span className={cn("sep")} aria-hidden>
            ·
          </span>
          <Link href="/communityGuidelines" className={cn("link")}>
            커뮤니티 가이드라인
          </Link>
          {/* <Link href="/deletionpolicy" className={cn("link")}>
            삭제약관
          </Link> */}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
