import * as S from './ModalLayout.style';

interface Props {
  children: React.ReactNode;
  layoutType?: 'toast';
}

const ModalLayout = ({ children, layoutType }: Props) => {
  return <S.Container type={layoutType}>{children}</S.Container>;
};

export default ModalLayout;
