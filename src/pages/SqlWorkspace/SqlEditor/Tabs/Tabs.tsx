import clsx from "clsx";

import { TabData } from "@/utils/schemas/SqlWorkspace.types";

import styles from "./Tabs.module.scss";
import { CrossIcon } from "./Icons";

interface TabsProps {
  switchToTab: (id: string) => void;
  activeTabs: TabData[];
  deleteTab: (id: string) => void;
}
export default function Tabs({
  switchToTab,
  activeTabs,
  deleteTab,
}: TabsProps) {
  return (
    <div className={styles.tabs}>
      {activeTabs.map((item) => (
        <div
          onClick={() => switchToTab(item.id)}
          key={item.id}
          className={clsx(styles.tab, item.isActive && styles.tabActive)}
        >
          {item.title}{" "}
          <span
            className={styles.closeIcon}
            onClick={(e) => {
              e.stopPropagation();
              deleteTab(item.id);
            }}
          >
            <CrossIcon />
          </span>
        </div>
      ))}
    </div>
  );
}
