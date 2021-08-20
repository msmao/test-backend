import React from 'react';
import { Modal } from 'antd';

const FormModal = (props) => {
  const { title, modalVisible, onCancel } = props;
  return (
    <Modal
      destroyOnClose
      title={title}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default FormModal;
