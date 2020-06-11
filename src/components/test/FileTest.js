import React, { Component } from 'react';
import Resizer from 'react-image-file-resizer';

class FileTest extends Component {
  constructor(props) {
    super(props);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
  }

  fileChangedHandler(event) {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      Resizer.imageFileResizer(
        event.target.files[0],
        300,
        300,
        'JPEG',
        100,
        0,
        (uri) => {
          console.log(uri);
        },
        'base64',
      );
    }
  }

  render() {
    return (
      <div className="App">
        <input type="file" onChange={this.fileChangedHandler} />
      </div>
    );
  }
}

export default FileTest;
