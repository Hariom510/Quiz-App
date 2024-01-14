import React from 'react';
import styled from 'styled-components';

const ParentContainer = styled.div`
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const Parent = ({ isVisible, children }) => {
  return <ParentContainer isVisible={isVisible}>{children}</ParentContainer>;
};

export default Parent;