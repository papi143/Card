import { ModalProps } from './modal.interface';
import './modal.css';

const Modal = ({ active, children }:ModalProps) => {
  console.log('active=',active)
  return (
       <div className={active? `Modal active__Modal`:`Modal`} >
        <div className={active? `Modal__content active__Modal`:`Modal__content`} 
          onClick={(e)=>e.stopPropagation()}>
          {children}
        </div>
      </div>
  );
};
export default Modal;
