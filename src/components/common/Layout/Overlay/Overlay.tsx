import * as S from './Overlay.style';

interface OverlayProps {
  layoutType?: 'toast';
}

const Overlay = ({
  children,
  ...props
}: PropsWithStrictChildren<OverlayProps>) => {
  return <S.Container type={props.layoutType}>{children}</S.Container>;
};

export default Overlay;
