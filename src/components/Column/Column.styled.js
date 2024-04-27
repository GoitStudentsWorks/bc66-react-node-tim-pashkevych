import styled from 'styled-components';
export const SColumnWrapper = styled.div`
  width: 350px;
  display: flex;
  gap: 14px;
  flex-direction: column;
  padding-bottom: 10px;
`;
export const SCardSuperWrapper = styled.div``;

export const SCardWrapperScroll = styled.div`
  display: flex;

  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;

  gap: 8px;
  max-height: 100%;

  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.scrollBackground};
    border-radius: 10px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.scrollBall};
    border-radius: 10px;
  }
`;
export const SColumnName = styled.div`
  width: 335px;
  min-height: 56px;

  flex-basis: auto;

  padding: 0 20px;

  border-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${(props) => props.theme.secondBackground};
  color: ${(props) => props.theme.columnName};
`;
export const SIconsWrapper = styled.div`
  display: flex;
  gap: 8px;

  :hover {
    fill: blue;
  }
`;

export const SButtonWrapper = styled.div`
  width: 335px;

  flex-basis: auto;
`;

export const SIcon = styled.svg`
  stroke: ${(props) => props.theme.icon_Column};
  transition: var(--transition);
  &:hover {
    stroke: ${(props) => props.theme.icon_Column_Hover};
  }
`;
