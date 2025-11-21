import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소람",
  description: "이야기와 목소리로 연결된 우리, 소람",
};

import Hero from "@/components/home/hero";
import Gallery from "@/components/home/gallery";
import Curation from "@/components/home/curation";
import styles from "./page.module.scss";
import HomeHeader from "@/components/home/home-header";
import Footer from "@/components/home/footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <HomeHeader />
      <Hero />
      <Gallery />
      <Curation />
      <Footer />
    </div>
  );
}
