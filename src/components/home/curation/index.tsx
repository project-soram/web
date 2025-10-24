import classNames from "classnames/bind";
import styles from "./curation.module.scss";

const cn = classNames.bind(styles);

const Curation = () => {
  return (
    <section className={cn("container")}>
      <div className={cn("inner")}>
        <div className={cn("head")}>
          <p className={cn("eyebrow")}>소람의 차별점</p>
          <h2 className={cn("title")}>
            마음으로 닿는 인연을
            <br />더 소중하게 만들어요.
          </h2>
          <p className={cn("desc")}>
            당신을 깊이 이해하는 맞춤 큐레이션으로 의미 있는 인연을
            만들어드려요.
          </p>
        </div>
        {/* 카드 3개 */}
        <div className={cn("cards")}>
          <article className={cn("card")}>
            <div className={cn("icon")} aria-hidden />
            <h3 className={cn("card-title")}>
              여러 관점으로 읽어낸
              <br />
              나만을 위한 이해
            </h3>
            <p className={cn("card-desc")}>
              내 답변, 말투, 선택의 흐름을 세밀한 기준으로 함께 살펴봅니다. 단순
              취향을 넘어 가치관과 공감 포인트까지 입체적으로 파악해, 처음부터
              대화가 편한 사람만 선택해요.
            </p>
          </article>

          <article className={cn("card")}>
            <div className={cn("icon")} aria-hidden />
            <h3 className={cn("card-title")}>
              취향부터 일상 까지,
              <br />
              생활 맥락을 반영한 매칭
            </h3>
            <p className={cn("card-desc")}>
              음악과 취미 같은 표면적 취향은 물론, 깨어 있는 시간대와 주말 패턴,
              대화 톤까지 고려합니다. 스펙이 아니라 생활이 맞는 사람과
              자연스럽게 이어지도록 큐레이션해요
            </p>
          </article>

          <article className={cn("card")}>
            <div className={cn("icon")} aria-hidden />
            <h3 className={cn("card-title")}>
              한 장의 스토리로 전하는 나,
              <br />
              설명이 필요 없는 소개
            </h3>
            <p className={cn("card-desc")}>
              취향과 생각, 대화 습관이 자연스럽게 드러나도록 설계했습니다. 처음
              보는 사람에게도 부담 없이, 그러나 깊이 있게 나를 보여줄 수 있어요.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Curation;
