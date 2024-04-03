import React from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ScriptModal = (props) => {
  const {
    openScriptModal,
    handleScriptModalClose,
    script,
    setScript,
    handleCreateqc,
    intrtext,
  } = props;

  return (
    <>
      <Modal
        id="signupModals"
        tabIndex="-1"
        isOpen={openScriptModal}
        size="lg"
        toggle={() => {
          handleScriptModalClose();
          setScript("");
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            handleScriptModalClose();
            setScript("");
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Script</h5>
        </ModalHeader>
        <ModalBody>
          <label htmlFor="ControlInputAdd" className="label_edit_sow">
            {intrtext}
          </label>
          <CKEditor
            editor={ClassicEditor}
            data={""}
            //   onReady={(editor) => {
            //     editor.editing.view.change((writer) => {
            //       writer.setStyle(
            //         "height",
            //         "80px",
            //         editor.editing.view.document.getRoot()
            //       );
            //     });
            //   }}
            onChange={(event, editor) => {
              // console.log( editor.getData(), "testing");
              setScript(editor.getData());
            }}
          />
          <Row>
            <Col xs="12" className="mt-3 d-flex justify-content-end gap-2">
              {/* <button
                className="btn btn-primary  "
                onClick={() => {
                  "";
                }}
              >
                Cancel
              </button> */}
              <button
                className="btn btn-primary  "
                onClick={() => {
                  handleCreateqc();
                }}
              >
                Submit
              </button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};

const EditModal = (props) => {
  const {
    editModal,
    handleCloseEditModal,
    setScript,
    setEditScript,
    editscript,
    edited,
    setEdited,
    handleUpdate,
    sowscript,
  } = props;
  console.log(editModal, "123e4");
  return (
    <>
      <Modal
        id="signupModals"
        isOpen={editModal}
        size="lg"
        toggle={() => {
          handleCloseEditModal();
          setScript("");
        }}
        centered={true}
      >
        <ModalHeader
          toggle={() => {
            handleCloseEditModal();
            setScript("");
          }}
        >
          <h5 style={{ color: "#3f5289 " }}>Edit</h5>
        </ModalHeader>
        <ModalBody>
          <CKEditor
            editor={ClassicEditor}
            data={sowscript}
            className="editor"
            onReady={(editor) => {
              editor.editing.view.change((writer) => {
                writer.setStyle(
                  "height",
                  "120px",
                  editor.editing.view.document.getRoot()
                );
              });
            }}
            onChange={(event, editor) => {
              const edit = editor.getData();
              console.log(edit, "123456");
              setEditScript(edit);
              setEdited(true);
            }}
          />
          <Row>
            <Col xs="12" className="mt-3 d-flex justify-content-end gap-2">
              <button className="btn btn-primary " onClick={handleUpdate}>
                Submit
              </button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};
export { ScriptModal, EditModal };
