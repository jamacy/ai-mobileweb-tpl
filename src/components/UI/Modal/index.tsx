import * as React from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#modal');
import { modalStyles,defaultStyles } from './style'


interface Classes {
  base: string;
  afterOpen: string;
  beforeClose: string;
}


const noop = () => { }
interface ModalProps {
  isOpen: boolean;
  bottom: boolean;
  onAfterOpen?: () => void;
  onRequestClose?: () => void;
  children: React.ReactChild;
}

const defaultProps: ModalProps = {
  isOpen: false,
  onAfterOpen: noop,
  onRequestClose: noop,
  children: '',
  bottom: false
}


function getStyle(bottom:boolean){

  return bottom ? defaultStyles : modalStyles
}
const ReactModal: React.FC & { defaultProps: Partial<ModalProps> } = (props: ModalProps) => {

  const {
    isOpen, onAfterOpen, onRequestClose,bottom
    
  } = props;


  return (
    <Modal
      closeTimeoutMS={150}
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      style={getStyle(bottom) as any}
      overlayClassName={'overlay'}
      preventScroll = {true}
      onRequestClose={onRequestClose}>
      {props.children}
    </Modal>
  );
}

ReactModal.defaultProps = defaultProps

export default ReactModal;