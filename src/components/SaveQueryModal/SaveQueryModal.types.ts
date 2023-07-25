export interface SaveQueryModalProps {
  isOpen: boolean;
  hideModal: () => void;
  query:string;
  saveQuery: (title: string) => void;
}
