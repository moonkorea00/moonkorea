import * as S from './ModalLayout.style';

interface Props {
  children: React.ReactNode;
}

const ModalLayout = ({ children }: Props) => {
  return <S.Container>{children}</S.Container>;
};

export default ModalLayout;
