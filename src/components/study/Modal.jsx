////モーダルのCSSを作成する場合
//1:「小規模/個人学習」➡︎普通のCSSでOK
//2:「大規模/本格的」➡︎styled-componentsなどのCSS-in-JSで作成することが多い

////このModal.jsxは「見た目と閉じるボタン」
import styled from 'styled-components';

//⬇︎背景部分
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

//⬇︎モーダルの中身部分
const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  text-align: center;
  color: black;
  padding: 2rem;
  border-radius: 8px;
`;

//⬇︎閉じるボタン
const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

/////⬇︎Modalコンポーネント( {onClose}は親コンポーネントから渡される関数 )
const Modal = ({ onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
    //⬆「自分がクリックした場所（e.target）」と「今この関数が登録されている要素（e.currentTarget...つまり<Overlay>のことだよ）」が同じか？を確認しています。
    //「モーダルの中身（Content）がクリックされたときは、閉じない」
    //「モーダルの背景（Overlay）がクリックされたときだけ、onClose();でモーダルを閉じる」
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Content>
        <p>モーダルテスト</p>
        <CloseButton onClick={onClose}>閉じる</CloseButton>
      </Content>
    </Overlay>
  );
};

export default Modal;
