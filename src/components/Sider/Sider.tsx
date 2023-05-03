import * as S from './Sider.style';
import { Dispatch, SetStateAction, useRef } from 'react';
import NavCategory from './NavCategory/NavCategory';
import siderData from 'public/script/sider.json';
import useOnClickOutside from '@hooks/useOnClickOutside';

interface SiderProps {
  isSiderVisible: boolean;
  setIsSiderVisible: Dispatch<SetStateAction<boolean>>;
}

const Sider = ({ isSiderVisible, setIsSiderVisible }: SiderProps) => {
  const siderRef = useRef(null);
  useOnClickOutside(siderRef, () => setIsSiderVisible(false));

  return (
    <S.Container isSiderVisible={isSiderVisible} ref={siderRef}>
      <S.ButtonWrapper>
        <S.CloseButton onClick={() => setIsSiderVisible(false)}>
          &#10005;
        </S.CloseButton>
      </S.ButtonWrapper>
      {siderData.map((item, idx) => (
        <NavCategory
          key={idx}
          item={item}
          setIsSiderVisible={setIsSiderVisible}
        />
      ))}
    </S.Container>
  );
};

export default Sider;
