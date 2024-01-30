import Portal from '@components/common/Portal/Portal';
import * as S from './Overlay.style';

export type OverlayType = 'backdrop' | 'toast';

interface OverlayProps {
  type: OverlayType;
}

const Overlay = ({ children, type }: PropsWithStrictChildren<OverlayProps>) => {
  return (
    <Portal>
      <S.Container type={type}>{children}</S.Container>
    </Portal>
  );
};

export default Overlay;
