import { RowObject } from "@/utils/schemas/SqlWorkspace.types";

export interface ExportDataModalProps {
  isOpen: boolean;
  hideModal: () => void;
 rows: RowObject[]
}
