import * as S from './Overlay.style';

interface OverlayProps {
  children: React.ReactNode;
  layoutType?: 'toast';
}

const Overlay = ({ children, ...props }: OverlayProps) => {
  return (
    <S.Container type={props.layoutType}>
      {children}
    </S.Container>
  );
};

export default Overlay;
