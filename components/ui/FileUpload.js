'use client';

import { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const FileUpload = ({ onUploadComplete, maxCount = 1, accept = "image/*" }) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleUpload = async (options) => {
    const { file, onSuccess, onError } = options;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        message.success(`${file.name} uploaded successfully`);
        onSuccess(result, file);
        
        // Call the callback with the file path
        if (onUploadComplete) {
          onUploadComplete(result.filePath);
        }
      } else {
        message.error(`${file.name} upload failed: ${result.message}`);
        onError(new Error(result.message));
      }
    } catch (error) {
      message.error(`${file.name} upload failed: ${error.message}`);
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    name: 'file',
    multiple: false,
    maxCount,
    accept,
    fileList,
    customRequest: handleUpload,
    onChange(info) {
      // Update file list
      let newFileList = [...info.fileList];
      
      // Just keep the latest file if maxCount is 1
      newFileList = newFileList.slice(-maxCount);
      
      // Update status
      newFileList = newFileList.map(file => {
        if (file.response) {
          file.url = file.response.filePath;
        }
        return file;
      });
      
      setFileList(newFileList);
    },
    onRemove() {
      // Reset the file path when removing
      if (onUploadComplete) {
        onUploadComplete('');
      }
    }
  };

  return (
    <Upload {...uploadProps} listType="picture">
      <Button icon={<UploadOutlined />} loading={loading}>
        {loading ? 'Uploading' : 'Upload'}
      </Button>
    </Upload>
  );
};

export default FileUpload;