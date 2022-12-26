import styled from 'styled-components';
import Image from 'next/image';
import favicon from 'public/assets/favicon/moonkorea.png';

const Test = () => {
  const TITLE = 'moonkorea';
  return (
    <>
      <Container>
        <LogoContainer>
          <Image src={favicon} alt={TITLE} width={25} height={25}></Image>
          <BlogTitle>{TITLE}</BlogTitle>
          <Image src={favicon} alt={TITLE} width={25} height={25}></Image>
          <BlogTitle>{TITLE}</BlogTitle>
          <Image src={favicon} alt={TITLE} width={25} height={25}></Image>
          <BlogTitle>{TITLE}</BlogTitle>
          <Image src={favicon} alt={TITLE} width={25} height={25}></Image>
          <BlogTitle>{TITLE}</BlogTitle>
        </LogoContainer>
      </Container>
      <Container>
        <Box>opacity at <b>0%</b>: 0<br/>opacity at 100%: 1</Box>
        <Box>opacity at <b>0%</b>: 0<br/>opacity at 100%: 1</Box>
        <Box>opacity at <b>0%</b>: 0<br/>opacity at 100%: 1</Box>
        <Box>opacity at <b>0%</b>: 0<br/>opacity at 100%: 1</Box>
      </Container>
    </>
  );
};

export default Test;
const Box = styled.div`
font-size: 0.85em;
width: 200px;
/* border: 1px solid red; */
`;
const Container = styled.header`
  display: flex;
  width: 100%;
  height: 54px;
  /* gap: 10px; */
  padding: 0 50px;
`;

const LogoContainer = styled.nav`
  ${({ theme }) => theme.flexCenter};
  
  
`;

const Favicon = styled.img`
  width: 25px;
  min-width: 25px;
  height: 25px;
  cursor: pointer;
`;

const BlogTitle = styled.span`
  margin-left: 8px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 60px;
`;

const LinkContainer = styled.nav`
  ${({ theme }) => theme.flexCenter};
  gap: 14px;
  margin-top: 2px;
`;
