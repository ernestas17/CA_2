import { styled } from 'styled-components';

export const StyledSelectBox = styled.div<{ $isActive: boolean }>`
  position: relative;

  .select-header {
    min-height: 1em;
    background-color: #ddd;
    cursor: pointer;
  }

  background-color: #eee;
  padding: 8px;
`;

export const StyledSelectDropdown = styled.div<{ $isActive: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  display: ${(props) => (props.$isActive ? 'block' : 'none')};

  background-color: #ccc;
`;

export const StyledSelectItem = styled.li<{ $isActive: boolean }>`
  color: ${(props) => (props.$isActive ? 'red' : 'initial')};
  cursor: pointer;
`;
