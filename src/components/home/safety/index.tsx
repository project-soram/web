import React from "react";
import classNames from "classnames/bind";
import styles from "./safety.module.scss";

const cn = classNames.bind(styles);

interface SafetyItem {
  icon?: string; // 아이콘 경로 (추후 연결)
  title: string;
  desc: string;
  imageSrc?: string; // 지정 시 이미지로 표시, 없으면 3:4 네모 도형
}

interface SafetyProps {
  items: SafetyItem[];
}

const Safety = ({ items }: SafetyProps) => {
  return (
    <section className={cn("safety", "u-section")}>
      {/* 교차 레이아웃(글:이미지 → 이미지:글 → 글:이미지) */}
      <div className={cn("inner")}>
        <h2 className={cn("heading")}>소람에서 만나보세요</h2>

        <div className={cn("rows")}>
          {items.map((it, idx) => (
            <div
              key={idx}
              className={cn("row", { reverse: idx % 2 === 1 })}
              aria-labelledby={`safety-title-${idx}`}
            >
              <div className={cn("col", "col-text")}>
                <div className={cn("icon")} aria-hidden="true" />
                <div className={cn("text")}>
                  <p id={`safety-title-${idx}`} className={cn("title")}>
                    {it.title}
                  </p>
                  <p className={cn("desc")}>{it.desc}</p>
                </div>
              </div>

              <div className={cn("col", "col-visual")}>
                {it.imageSrc ? (
                  // 실제 이미지가 들어올 때
                  // alt는 시각적으로 표현된 컨텐츠를 설명하도록 적절히 변경하세요
                  <img
                    className={cn("media")}
                    src={it.imageSrc}
                    alt={it.title}
                  />
                ) : (
                  // 이미지 없을 때 3:4 비율의 플레이스 홀더
                  <div
                    className={cn("placeholder")}
                    role="img"
                    aria-label={`${it.title} 비주얼`}
                  ></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Safety;
