////トーストで表示する中身
import styled, { keyframes } from 'styled-components';

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #333;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-size: 0.9rem;
  animation: ${fadeInOut} 5s ease forwards; //5秒かけてフェードイン・フェードアウトする
`;

const Toast = ({ message }) => {
  return <ToastContainer>{message}</ToastContainer>;
};

export default Toast;
