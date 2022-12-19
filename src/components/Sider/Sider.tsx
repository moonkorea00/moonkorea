import * as S from './Sider.style';
import NavCategory from './NavCategory/NavCategory';
import siderData from 'public/script/sider.json';
import useResizeSider from '@hooks/useResizeSider';

const Sider = () => {
  const { isSiderVisible } = useResizeSider() as { isSiderVisible: boolean };

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
