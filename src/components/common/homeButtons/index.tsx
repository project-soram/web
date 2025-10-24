import classNames from "classnames/bind";
import styles from "./homeButtons.module.scss";
import Link from "next/link";
const cn = classNames.bind(styles);

type Item = {
  id: number;
  name: "admin" | "privacy" | "terms" | "deletionpolicy";
  route: string;
  target?: "_blank" | "_self";
};

const buttons: Item[] = [
  { id: 1, name: "admin", route: "/sr-adm/login" },
  { id: 2, name: "privacy", route: "/privacy", target: "_blank" },
  { id: 3, name: "deletionpolicy", route: "/deletionpolicy", target: "_blank" },
  { id: 4, name: "terms", route: "/terms", target: "_blank" },
];

export default function HomeButtons() {
  return (
    <div className={cn("container")}>
      {buttons.map(({ id, name, route, target }) => (
        <Link
          key={id}
          href={route}
          prefetch
          className={cn("btn", { accent: name === "admin" })}
          aria-label={name}
          target={target ?? "_self"}
        >
          {name}
        </Link>
      ))}
    </div>
  );
}
