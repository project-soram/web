import classNames from "classnames/bind";
import styles from "./gallery.module.scss";

const cn = classNames.bind(styles);

interface GalleryProps {
  // 한글 주석: 동일 이미지를 여러 장으로 배치할 때 개수 지정
  count?: number;
  src: string;
  alt?: string;
  title?: string;
  subtitle?: string;
}

const Gallery = ({ count = 3, src, alt, title, subtitle }: GalleryProps) => {
  const items = Array.from({ length: Math.max(1, count) });
  return (
    <section className={cn("gallery", "u-section")}>
      <div className={cn("head")}>
        {title ? <h2 className={cn("title")}>{title}</h2> : null}
        {subtitle ? <p className={cn("subtitle")}>{subtitle}</p> : null}
      </div>
      <div className={cn("grid")}>
        {items.map((_, i) => (
          <div key={i} className={cn("item")}>
            <img src={src} alt={alt || `Soram screenshot ${i + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
