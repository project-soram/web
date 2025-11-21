import classNames from "classnames/bind";
import styles from "./hero.module.scss";
import Image from "next/image";

const cn = classNames.bind(styles);

const Hero = () => {
  // 한국어 주석: 이미지 배열 정의(렌더링 순서 유지)
  const images = [
    { src: "/images/mock7.png", alt: "mock7", priority: true },
    { src: "/images/mock1.png", alt: "mock2" },
    { src: "/images/mock8.png", alt: "mock6" },
  ];

  return (
    <section className={cn("container")}>
      {/* 왼쪽 컨텐츠 */}
      <div className={cn("left-content")}>
        {/* 텍스트 컨텐츠 */}
        <div className={cn("text-content")}>
          <p>
            이야기와 목소리로
            <br />
            연결 된 우리
          </p>
          <h1>소람</h1>
        </div>
        {/* 다운로드 버튼 */}
        <div className={cn("download-btn")}>
          <Image
            src="/icons/apple.png"
            alt="App Store"
            width={30}
            height={35}
          />
          App Store
        </div>
      </div>

      {/* 오른쪽 컨텐츠 */}
      <div className={cn("right-content")}>
        <div className={cn("image-list")}>
          {/* 한국어 주석: 모바일 기본은 첫 번째만 노출, 데스크탑(≥1024px)에서 3개 모두 노출 */}
          {images.map((img) => (
            <div className={cn("mock-item")} key={img.src}>
              <Image
                src={img.src}
                alt={img.alt}
                width={220}
                height={420}
                sizes="(min-width: 1024px) 300px, (min-width: 768px) 260px, 220px"
                priority={img.priority === true}
                className={cn("image")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
