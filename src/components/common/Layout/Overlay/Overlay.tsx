import * as S from './Overlay.style';

export type OverlayType = 'backdrop' | 'toast';

interface OverlayProps {
  type: OverlayType;
}

const Overlay = ({ children, type }: PropsWithStrictChildren<OverlayProps>) => {
  return <S.Container type={type}>{children}</S.Container>;
};

export default Overlay;
