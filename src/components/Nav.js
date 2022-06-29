import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';
import { IconContext } from 'react-icons';
import blogImg from '../assets/icons/moonkorea.png';
import { useNavigate } from 'react-router';

const Nav = () => {
  const navigate = useNavigate();
  const directToHome = () => {
    navigate('/moonkorea');
  };
  return (
    <IconContext.Provider
      value={{ color: 'black', cursor: 'pointer', size: '18' }}
    >
      <NavMain>
        <HeadingWrapper>
          <Favicon src={blogImg} onClick={directToHome}></Favicon>
          <Heading onClick={directToHome}>{BLOGDATA.blog_name}</Heading>
        </HeadingWrapper>
        <Links>
          <a
            href="https://github.com/moonkorea00"
            target="_blank"
            rel="noreferrer"
          >
            <FaIcons.FaGithub />
          </a>
          <span style={{ fontSize: '14px', fontWeight: '600' }}>
            &copy; {BLOGDATA.blog_name} {new Date().getFullYear()}
          </span>
        </Links>
      </NavMain>
    </IconContext.Provider>
  );
};

const BLOGDATA = { blog_name: 'moonkorea', github: <FaIcons.FaGithub /> };

const NavMain = styled.header`
  ${({ theme }) => theme.flexSpaceBetween}
  height: 7vh;
  margin: 0;
  padding: 0 3vw;
  border-bottom: 1px solid lightgrey;
`;

const HeadingWrapper = styled.div`
  ${({ theme }) => theme.flexCenter}
  height:6vh;
`;

const Favicon = styled.img`
  width: 1.8vw;
  height: 2.8vh;
  cursor: pointer;
`;

const Heading = styled.span`
  margin-left: 0.5vw;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;

const Links = styled.div`
  ${({ theme }) => theme.flexCenter}
  gap: 1vw;
  height: 7vh;
  margin-top: 2px;
`;
export default Nav;
