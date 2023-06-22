export interface ModalProps {
  type: string;
  content: string | JSX.Element;
  confirmText?: string;
  duration?: number;
  props: any;
}
