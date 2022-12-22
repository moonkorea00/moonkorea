import * as S from './Sider.style';
import { useRecoilValue } from 'recoil';
import { siderState } from '@store/siderState';
import NavCategory from './NavCategory/NavCategory';
import siderData from 'public/script/sider.json';

const Sider = () => {
  const isSiderVisible = useRecoilValue(siderState);

  return (
    <>
      <S.Container isSiderVisible={isSiderVisible}>
        {siderData.map((item, idx) => (
          <NavCategory item={item} key={idx} />
        ))}
      </S.Container>
    </>
  );
};

export default Sider;
