## EJEMPLO PARA SUBIR ARCHIVOS A AMAZON S3

npm install aws-sdk

import React, { useState } from 'react';
import { S3 } from 'aws-sdk'; // Import AWS S3 SDK

const UploadForm = () => {
const [selectedFile, setSelectedFile] = useState(null);
const [fileURL, setFileURL] = useState('');
const [uploading, setUploading] = useState(false);
const [uploadError, setUploadError] = useState('');

const handleFileChange = (event) => {
setSelectedFile(event.target.files[0]);
};

const handleSubmit = async (event) => {
event.preventDefault();

    if (!selectedFile) {
      return;
    }

    setUploading(true);
    setUploadError('');

    try {
      // Configure AWS S3 credentials
      const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      });

      // Get the file name and extension
      const fileName = selectedFile.name;
      const fileExtension = fileName.split('.').pop();

      // Create a unique file name for S3 storage
      const uniqueFileName = `${Date.now()}-${fileName}`;

      // Upload the file to S3
      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME, // Replace with your bucket name
        Key: `${uniqueFileName}.${fileExtension}`,
        Body: selectedFile,
      };

      await s3.putObject(uploadParams).promise();

      // Generate the file URL
      const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}.${fileExtension}`;

      // Store the file URL in the database
      // Replace this with your database connection and logic
      await saveFileURLToDatabase(fileUrl);

      setFileURL(fileUrl);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploadError(error.message);
      setUploading(false);
    }

};

return (

<form onSubmit={handleSubmit}>
<input type="file" onChange={handleFileChange} />
<button type="submit" disabled={uploading}>
{uploading ? 'Uploading...' : 'Upload'}
</button>

      {fileURL && <p>File uploaded: {fileURL}</p>}
      {uploadError && <p className="error">{uploadError}</p>}
    </form>

);
};

export default UploadForm;

## ---- FIN DE EJEMPLO
