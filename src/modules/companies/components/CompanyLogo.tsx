import Image from "next/image";
import styles from "../Companies.module.css";

interface CompanyLogoProps {
  name: string;
  src: string;
  large?: boolean;
}

export function CompanyLogo({ name, src, large = false }: CompanyLogoProps) {
  return (
    <span className={large ? styles.logoLarge : styles.logo}>
      <Image src={src} alt={name} width={120} height={64} sizes="120px" className={styles.logoImage} />
    </span>
  );
}
