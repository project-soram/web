import React from "react";
import classNames from "classnames/bind";
import styles from "./gallery.module.scss";

const cn = classNames.bind(styles);

// 주제별 일러스트 (도형 기반, 테마색 #ff6b6b)
const Illustration = ({ kind }: { kind: Item["id"] }) => {
  const accent = "#ff6b6b";
  switch (kind) {
    case "topic-card":
      return (
        <svg viewBox="0 0 240 180" aria-hidden>
          <rect x="12" y="18" width="216" height="144" rx="16" fill="#f7f8fb" />
          {/* 카드 더미 */}
          <rect x="40" y="42" width="160" height="100" rx="12" fill="#eaeef5" />
          <rect
            x="54"
            y="54"
            width="132"
            height="76"
            rx="10"
            fill={accent}
            opacity="0.95"
          />
          {/* 물음표 포인트 */}
          <circle cx="120" cy="92" r="12" fill="#fff" />
          <rect x="118" y="86" width="4" height="8" rx="2" fill={accent} />
          <rect x="118" y="98" width="4" height="4" rx="2" fill={accent} />
        </svg>
      );
    case "voice-record":
      return (
        <svg viewBox="0 0 240 180" aria-hidden>
          <rect x="20" y="24" width="200" height="132" rx="16" fill="#f7f8fb" />
          {/* 마이크 본체 */}
          <rect x="108" y="54" width="24" height="56" rx="12" fill={accent} />
          <rect x="92" y="110" width="56" height="8" rx="4" fill="#cfd6e6" />
          <rect x="110" y="118" width="20" height="18" rx="10" fill="#cfd6e6" />
          {/* 웨이브 바 */}
          <g fill={accent} opacity="0.8">
            <rect x="40" y="130" width="8" height="18" rx="4" />
            <rect x="54" y="126" width="8" height="22" rx="4" />
            <rect x="68" y="132" width="8" height="16" rx="4" />
            <rect x="82" y="124" width="8" height="24" rx="4" />
            <rect x="96" y="130" width="8" height="18" rx="4" />
          </g>
        </svg>
      );
    case "empathy":
      return (
        <svg viewBox="0 0 240 180" aria-hidden>
          <rect x="14" y="24" width="212" height="132" rx="16" fill="#f7f8fb" />
          {/* 말풍선 두 개 */}
          <rect x="40" y="56" width="98" height="54" rx="12" fill="#dde3f0" />
          <polygon points="82,110 74,124 96,112" fill="#dde3f0" />
          <rect x="116" y="72" width="84" height="44" rx="12" fill="#e6ebf5" />
          <polygon points="158,116 166,130 146,118" fill="#e6ebf5" />
          {/* 하트 */}
          <path
            d="M172 72c6-10 22-8 22 5 0 10-13 18-22 26-9-8-22-16-22-26 0-13 16-15 22-5z"
            fill={accent}
          />
        </svg>
      );
    case "anonymity":
      return (
        <svg viewBox="0 0 240 180" aria-hidden>
          <rect x="18" y="24" width="204" height="132" rx="16" fill="#f7f8fb" />
          {/* 실루엣 */}
          <circle cx="140" cy="88" r="22" fill="#dde3f0" />
          <rect x="118" y="112" width="44" height="24" rx="12" fill="#dde3f0" />
          {/* 음성 버블 */}
          <rect x="58" y="70" width="56" height="36" rx="10" fill="#e6ebf5" />
          <g fill={accent} opacity="0.85">
            <rect x="66" y="82" width="6" height="16" rx="3" />
            <rect x="76" y="78" width="6" height="20" rx="3" />
            <rect x="86" y="82" width="6" height="16" rx="3" />
          </g>
        </svg>
      );
  }
};

type Item = {
  id: string;
  label: string; // 작은 카테고리 라벨
  title: string;
  desc: string;
  imageSrc?: string; // 추후 이미지가 들어오면 사용
};

const ITEMS: Item[] = [
  {
    id: "topic-card",
    label: "주제 카드 🎴",
    title: "대화의 시작은 한 장의 카드에서",
    desc: "매일 새롭게 주어지는 ‘주제 카드’를 통해 대화를 시작하세요. “요즘 가장 위로가 되었던 일은?” 같은 질문이 자연스럽게 마음을 열게 합니다.",
  },
  {
    id: "voice-record",
    label: "음성으로 담는 진심 🎙",
    title: "타이핑 대신, 목소리로 전하세요",
    desc: "목소리엔 글보다 더 많은 감정이 담깁니다. 짧은 음성으로 내 생각을 녹음하고, 다른 사람의 목소리를 들으며 진심을 느껴보세요.",
  },
  {
    id: "empathy",
    label: "공감 기반 연결 💬",
    title: "공감이 닿으면, 대화가 시작돼요",
    desc: "단순한 좋아요가 아니라, 진짜 공감으로 연결됩니다. 서로의 이야기에 마음이 닿을 때 1:1로 이어져 더 깊은 대화가 시작됩니다.",
  },
  {
    id: "anonymity",
    label: "익명 속 진정성 🫶",
    title: "이름보다 마음으로 기억되는 사람들",
    desc: "소람은 외모나 스펙보다 내면의 대화를 중요시합니다. 최소한의 프로필로, 진짜 나로서 연결해보세요.",
  },
];

const Gallery = () => {
  return (
    <section className={cn("gallery", "u-section")} aria-label="Main features">
      <div className={cn("inner")}>
        <h2 className={cn("heading")}>
          Main Service
          <span className={cn("sub")}>소람에서 만나보세요</span>
        </h2>

        <div className={cn("rows")}>
          {ITEMS.map((it, idx) => {
            const isReverse = idx % 2 === 1; // 0: text:image, 1: image:text, ...
            return (
              <article
                key={it.id}
                className={cn("row", { reverse: isReverse })}
                aria-labelledby={`title-${it.id}`}
              >
                {/* 텍스트 영역 */}
                <div className={cn("col", "col-text")}>
                  <div className={cn("label")}>{it.label}</div>
                  <h3 id={`title-${it.id}`} className={cn("title")}>
                    {it.title}
                  </h3>
                  <p className={cn("desc")}>{it.desc}</p>
                </div>

                {/* 이미지/일러스트 영역 */}
                <div className={cn("col", "col-visual")}>
                  {it.imageSrc ? (
                    <img
                      className={cn("media")}
                      src={it.imageSrc}
                      alt={it.title}
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className={cn("placeholder")}
                      role="img"
                      aria-label={`${it.title} 비주얼`}
                    >
                      <div className={cn("placeholder-svg")}>
                        <Illustration kind={it.id} />
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
