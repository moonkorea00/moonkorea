import * as S from './Sider.style';
import SiderCategory from './SiderCategory/SiderCategory';

import SIDER_DATA from '@data/sider.json';

interface SiderProps {
  isSiderVisible: boolean;
  onCloseSider: () => void;
}

const Sider = ({ isSiderVisible, onCloseSider }: SiderProps) => {
  return (
    <S.Container isSiderVisible={isSiderVisible}>
      <S.CloseButton onClick={onCloseSider}>&#10005;</S.CloseButton>
      {SIDER_DATA.map(({ name, posts }) => (
        <SiderCategory
          key={name}
          name={name}
          posts={posts}
          onCloseSider={onCloseSider}
        />
      ))}
    </S.Container>
  );
};

export default Sider;
