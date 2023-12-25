import * as S from './Sider.style';
import NavCategory from './NavCategory/NavCategory';
import OutsideClickWrapper from '@components/common/OutsideClickWrapper/OutsideClickWrapper';

import SIDER_DATA from '@data/sider.json';

interface SiderProps {
  isSiderVisible: boolean;
  onCloseSider: () => void;
}

const Sider = ({ isSiderVisible, onCloseSider }: SiderProps) => {
  return (
    <OutsideClickWrapper onClickHandler={onCloseSider} triggerKey="Escape">
      <S.Container isSiderVisible={isSiderVisible}>
        <S.CloseButton onClick={onCloseSider}>&#10005;</S.CloseButton>
        {SIDER_DATA.map(item => (
          <NavCategory key={item.name} {...item} onCloseSider={onCloseSider} />
        ))}
      </S.Container>
    </OutsideClickWrapper>
  );
};

export default Sider;
