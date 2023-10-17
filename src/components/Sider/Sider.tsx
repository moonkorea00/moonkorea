import * as S from './Sider.style';
import { useRef } from 'react';
import NavCategory from './NavCategory/NavCategory';
import SIDER_DATA from 'public/script/sider.json';
import useOnClickOutside from '@hooks/useOnClickOutside';
import useKeyPress from '@hooks/useKeyPress';

interface SiderProps {
  isSiderVisible: boolean;
  onCloseSider: () => void;
}

const Sider = ({ isSiderVisible, onCloseSider }: SiderProps) => {
  const siderRef = useRef(null);

  useOnClickOutside(siderRef, onCloseSider);
  useKeyPress({ Escape: onCloseSider });

  return (
    <S.Container isSiderVisible={isSiderVisible} ref={siderRef}>
      <S.ButtonWrapper>
        <S.CloseButton onClick={onCloseSider}>&#10005;</S.CloseButton>
      </S.ButtonWrapper>
      {SIDER_DATA.map(item => (
        <NavCategory key={item.name} {...item} onCloseSider={onCloseSider} />
      ))}
    </S.Container>
  );
};

export default Sider;
