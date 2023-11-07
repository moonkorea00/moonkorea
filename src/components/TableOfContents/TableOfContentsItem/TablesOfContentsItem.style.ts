import styled from 'styled-components';

export const Heading = styled.span`
  margin: 0;
  color: #555;
  cursor: pointer;

  :hover,
  :focus {
    color: black;
    font-weight: 500;
    text-decoration: underline;
    text-decoration-thickness: 1px;
  }

  :active {
    font-weight: 700;
  }
`;
