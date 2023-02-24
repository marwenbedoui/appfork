import { Button, Modal } from "antd";
import { useState } from "react";
import FormModalComponent from "./FormModalComponent";

const ModalComponent = ({
  pass,
  changed,
  oldContent,
  newContent,
  verifyNewContent,
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [content1, setContent1] = useState("");
  const [content2, setContent2] = useState("");
  const [verifyContent2, setVerifyContent2] = useState("");
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);

    // TODO: Add code to update ${changed}

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleEmailChange = (e) => {
    setContent1(e.target.value);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Update {changed}
      </Button>
      <Modal
        title={`Update ${changed}`}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={handleOk}
          >
            Update
          </Button>,
        ]}
      >
        <FormModalComponent changed={changed} pass={pass} />
      </Modal>
    </>
  );
};

export default ModalComponent;
