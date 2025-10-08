import classNames from "classnames/bind";
import styles from "./curation.module.scss";

const cn = classNames.bind(styles);

interface CurationProps {}

const Curation = (props: CurationProps) => {
  const {} = props;

  return (
    <section className={cn("container")}>
      <div className={cn("inner")}>
        <div className={cn("head")}>
          <p className={cn("eyebrow")}>월유의 차별점</p>
          <h2 className={cn("title")}>
            내게 꼭 맞는
            <br />
            인연만 찾아 드려요.
          </h2>
          <p className={cn("desc")}>
            모든 인연을 소중하게 만드는 월유만의 특별한 큐레이션을 확인하세요.
          </p>
          <button className={cn("cta")} type="button">
            지금 체험하기
          </button>
        </div>

        <div className={cn("cards")}>
          <article className={cn("card")}>
            <div className={cn("icon")} aria-hidden />
            <h3 className={cn("card-title")}>
              어떻게 나보다
              <br />
              나를 잘 알지?
            </h3>
            <p className={cn("card-desc")}>
              전문가와 AI 알고리즘이 함께 정교하게 분석해, 당신에게 꼭 맞는
              인연을 소개합니다.
            </p>
          </article>

          <article className={cn("card")}>
            <div className={cn("icon")} aria-hidden />
            <h3 className={cn("card-title")}>
              라이프스타일, 취향까지
              <br />
              꼼꼼히 분석.
            </h3>
            <p className={cn("card-desc")}>
              단순 매칭이 아닌, 가치관과 생활 패턴까지 고려하여 더 높은 만족도를
              제공합니다.
            </p>
          </article>

          <article className={cn("card")}>
            <div className={cn("icon")} aria-hidden />
            <h3 className={cn("card-title")}>
              나를 그대로 담은
              <br />
              스토리카드.
            </h3>
            <p className={cn("card-desc")}>
              질문에 답하면 나만의 스토리카드가 완성되어, 나를 가장 잘 보여줄 수
              있어요.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Curation;
