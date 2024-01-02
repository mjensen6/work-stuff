import React, { useState } from 'react';
import axios from 'axios';

function FileUploadComponent() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    // Set the selected file when the input changes
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('excelFile', file);

      const url = 'http://localhost:3000/upload-excel'; // Change this to your server's URL

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload Excel File</button>
    </div>
  );
}

export default FileUploadComponent;