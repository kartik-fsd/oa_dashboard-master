import React, { useState } from "react";
import { Card, CardBody, Col, Row, Container, CardHeader } from "reactstrap";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const FileUpload = () => {
  document.title = "File Upload | Velzon - React Admin & Dashboard Template";

  const [selectedFiles, setselectedFiles] = useState([]);

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  return (
    <>
      <Row>
        <Col lg={12}>
          <h4 className="card-title" style={{ margin: 12 }}>
            Upload Documents
          </h4>
          <Dropzone
            onDrop={(acceptedFiles) => {
              handleAcceptedFiles(acceptedFiles);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div className="dropzone dz-clickable">
                <div className="dz-message needsclick" {...getRootProps()}>
                  <div className="mb-3">
                    <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                  </div>
                  <h4>Drop files here or click to upload.</h4>
                </div>
              </div>
            )}
          </Dropzone>
          <div className="list-unstyled mb-0" id="file-previews">
            {selectedFiles.map((f, i) => {
              return (
                <Card
                  className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                  key={i + "-file"}
                >
                  <div className="p-2">
                    <Row className="align-items-center">
                      <Col className="col-auto">
                        <img
                          data-dz-thumbnail=""
                          height="80"
                          className="avatar-sm rounded bg-light"
                          alt={f.name}
                          src={f.preview}
                        />
                      </Col>
                      <Col>
                        <Link to="#" className="text-muted font-weight-bold">
                          {f.name}
                        </Link>
                        <p className="mb-0">
                          <strong>{f.formattedSize}</strong>
                        </p>
                      </Col>
                    </Row>
                  </div>
                </Card>
              );
            })}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default FileUpload;
