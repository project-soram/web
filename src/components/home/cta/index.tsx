import classNames from "classnames/bind";
import styles from "./cta.module.scss";

const cn = classNames.bind(styles);

interface CtaProps {
  title: string;
  subtitle?: string;
  cta: { label: string; href: string };
}

const Cta = ({ title, subtitle, cta }: CtaProps) => {
  return (
    <section className={cn("cta", "u-section")}>
      <div className={cn("inner")}>
        <div className={cn("copy")}>
          <h2 className={cn("title")}>{title}</h2>
          {subtitle ? <p className={cn("subtitle")}>{subtitle}</p> : null}
        </div>
        <a className={cn("button", "u-btn", "u-btn--primary")} href={cta.href}>
          {cta.label}
        </a>
      </div>
    </section>
  );
};

export default Cta;
