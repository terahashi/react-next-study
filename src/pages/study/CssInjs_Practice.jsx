////今回はstyled-componentsをインストールする。➡︎コマンドyarn add styled-components
import { useState } from 'react';
import styled from 'styled-components';
// console.dir(styled);

////⬇︎styled-components

const StyledButton = styled.button`
  margin-inline: auto;
  border-radius: 9999px;
  border: none;
  display: block;
  width: 100%;
  height: 100%;
  margin: 50px auto;
  font-weight: bold;
  font-size: 1em;
  color: black;
  cursor: pointer;
  text-align: center;
  line-height: 60px;
  background-color: white;
  background-color: ${({ $isSelected }) => ($isSelected ? 'pink' : '')};
  transition: all 0.3s ease-out;
  &:hover,
  :active {
    opacity: 0.7;
    transform: scale(1.2);
  }
  @media (max-width: 600px) {
    border-radius: 0;
  }
`;

const OrangeButton = styled(StyledButton)`
  background-color: ${({ $isSelected }) => ($isSelected ? 'royalblue' : '')};
  span {
    color: black;
  }
`;

const ClickButton = styled.div`
  color: ${({ $isSelected }) => ($isSelected ? 'white' : 'transparent')};
  transition: color 0.3s ease;
`;

////⬇︎コンポーネント
const CssInjs = () => {
  const [isSelected, setIsSelected] = useState(false);

  const onClickHandler = () => setIsSelected((prev) => !prev);

  return (
    <>
      <StyledButton $isSelected={isSelected} onClick={onClickHandler}>
        ボタン
      </StyledButton>

      <OrangeButton $isSelected={isSelected} onClick={onClickHandler}>
        <span>ボタン</span>
      </OrangeButton>

      <ClickButton $isSelected={isSelected}>クリックされました。</ClickButton>

      {/* <div>{isSelected && 'クリックされました。'}</div> ⬅︎普通の論理演算子の書き方 */}
    </>
  );
};

export default CssInjs;
