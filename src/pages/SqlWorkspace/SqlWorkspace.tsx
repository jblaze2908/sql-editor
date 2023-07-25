import { ResizableContainer, ResizablePanel } from "@/components/ResizableGrid";

import Navbar from "./Navbar/Navbar";
import QueryHistory from "./QueryHistory/QueryHistory";
import QueryResults from "./QueryResults/QueryResults";
import SqlEditor from "./SqlEditor/SqlEditor";
import SavedQueries from "./SavedQueries/SavedQueries";
import styles from "./SqlWorkspace.module.scss";

export default function SqlWorkspace() {
  return (
    <main className={styles.container}>
      <Navbar />
      <section className={styles.ideContainer}>
        <ResizableContainer
          direction="X"
          initialSizes={[20, 80]}
          sizesForCollapse={[2, 2]}
        >
          <ResizablePanel>
            <ResizableContainer
              direction="Y"
              initialSizes={[40, 60]}
              sizesForCollapse={[2, 2]}
            >
              <ResizablePanel>
                <SavedQueries />
              </ResizablePanel>
              <ResizablePanel>
                <QueryHistory />
              </ResizablePanel>
            </ResizableContainer>
          </ResizablePanel>
          <ResizablePanel>
            <ResizableContainer
              direction="Y"
              initialSizes={[60, 40]}
              sizesForCollapse={[2, 2]}
            >
              <ResizablePanel>
                <SqlEditor />
              </ResizablePanel>
              <ResizablePanel rerenderOnHeightChange>
                <QueryResults />
              </ResizablePanel>
            </ResizableContainer>
          </ResizablePanel>
        </ResizableContainer>
      </section>
    </main>
  );
}
