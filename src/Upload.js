import React, { Component } from "react";
import axios from "axios";
import "./Upload.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import ReactPlayer from "react-player";

class Upload extends Component {
  state = {
    selectedFile: null,
    fileUploaded: false,
    loader: false,
    fileDownloaded: false,
    disableUpload: false,
    selectedFilename: null,
    // status: null
  };

  handleDownload = () => {
    if (this.state.fileUploaded) {
      setTimeout(() => {
        axios.get("http://localhost:5000/download").then((res) => {
          console.log(res.data);
          this.setState({ fileDownloaded: true, loader: false });
        });
      }, 5000);
    } else {
      toast.info("No file uploaded");
    }
  };

  handleUpload = () => {
    if (this.state.selectedFile) {
      const data = new FormData();
      data.append("file", this.state.selectedFile);
      axios.post("http://localhost:5000/upload", data, {}).then((res) => {
        console.log(res.data.message); //Success
        if (res.data.message === "Success") {
          this.setState({ fileUploaded: true, disableUpload: true });
          setTimeout(() => {
            toast.success("File Uploaded");
            this.setState({ disableUpload: false, loader: true });
            this.handleDownload();
          }, 8000);
        } else {
          toast.info("File upload failed");
        }
      });
    } else {
      toast.info("No File selected");
    }
  };

  handleChange = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
      selectedFilename: e.target.files[0].name,
    });
    console.log("ass", e.target.files[0].name);
  };

  render() {
    return (
      <div className="Upload">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
        />

        {this.state.loader ? (
          <Loader />
        ) : (
          <>
            <div className="file-container">
              {this.state.fileDownloaded && !this.state.loader ? (
                <div className="player-container">
                  <ReactPlayer
                    url="../../WebVideoUpload/public/downloads/video.avi"
                    controls={true}
                  />
                </div>
              ) : (
                <>
                  <div className="select-file-container">
                    <div className="input-file">
                      {/* <input
                        className="select-file"
                        type="file"
                        onChange={this.handleChange}
                      /> */}
                      <label className="custom-file-upload">
                        <input type="file" onChange={this.handleChange} />
                        Select File
                      </label>
                      <div>
                        {this.state.selectedFilename
                          ? this.state.selectedFilename
                          : "No file chosen"}
                      </div>
                    </div>
                  </div>
                  <div className="btn-container">
                    <div className="btn-upload-container">
                      {!this.state.disableUpload ? (
                        <button
                          className="btn-upload"
                          onClick={this.handleUpload}
                        >
                          Upload
                        </button>
                      ) : null}
                    </div>
                    <div className="btn-convert-container">
                      <button
                        className="btn-convert"
                        onClick={this.handleDownload}
                      >
                        Convert
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Upload;
