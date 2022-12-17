import * as S from './Sider.style';
import NavCategory from './NavCategory/NavCategory';
import siderData from 'public/script/sider.json';

const Sider = () => {
  return (
    <S.Container>
      {siderData.map((item, idx) => (
        <NavCategory item={item} key={idx} />
      ))}
    </S.Container>
  );
};

export default Sider;
