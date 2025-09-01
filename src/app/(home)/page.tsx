import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      여기가 랜딩페이지 들어갈곳
      <button>관리자 페이지 입구</button>
      <button>개인정보 처리방침</button>
      <button>이용약관</button>
      <button>삭제</button>
    </div>
  );
}
