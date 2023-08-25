import * as S from './Sider.style';
import { Dispatch, SetStateAction, useRef } from 'react';
import NavCategory from './NavCategory/NavCategory';
import siderData from 'public/script/sider.json';
import useOnClickOutside from '@hooks/useOnClickOutside';
import useKeyPress from '@hooks/useKeyPress';

interface SiderProps {
  isSiderVisible: boolean;
  setIsSiderVisible: Dispatch<SetStateAction<boolean>>;
}

const Sider = ({ isSiderVisible, setIsSiderVisible }: SiderProps) => {
  const siderRef = useRef(null);

  const onCloseSider = () => setIsSiderVisible(false);

  useOnClickOutside(siderRef, onCloseSider);
  useKeyPress({ Escape: onCloseSider });

  return (
    <S.Container isSiderVisible={isSiderVisible} ref={siderRef}>
      <S.ButtonWrapper>
        <S.CloseButton onClick={onCloseSider}>&#10005;</S.CloseButton>
      </S.ButtonWrapper>
      {siderData.map((item, idx) => (
        <NavCategory key={idx} item={item} onCloseSider={onCloseSider} />
      ))}
    </S.Container>
  );
};

export default Sider;
