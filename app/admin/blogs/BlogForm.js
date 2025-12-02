// 'use client';

// import React, { useState } from 'react';
// import { Form, Input, Button, Select, Switch, message } from 'antd';
// import dynamic from 'next/dynamic';
// import FileUpload from '@/components/ui/FileUpload';

// // Import the editor component dynamically to avoid SSR issues
// // const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// // import 'react-quill/dist/quill.snow.css';

// const { Option } = Select;
// const { TextArea } = Input;

// // Categories for blog posts
// const categories = ['Technology', 'Fashion', 'Food', 'Travel', 'Health', 'Business'];

// const BlogForm = ({ initialValues, onSubmit, onCancel }) => {
//   const [form] = Form.useForm();
//   const [content, setContent] = useState(initialValues?.content || '');
//   const [imagePath, setImagePath] = useState(initialValues?.image || '');
//   const [loading, setLoading] = useState(false);

//   // Set initial form values if editing
//   React.useEffect(() => {
//     if (initialValues) {
//       form.setFieldsValue(initialValues);
//       setContent(initialValues.content);
//       setImagePath(initialValues.image);
//     }
//   }, [initialValues, form]);

//   const handleSubmit = async (values) => {
//     try {
//       setLoading(true);
      
//       // Validate image
//       if (!imagePath) {
//         message.error('Please upload an image');
//         setLoading(false);
//         return;
//       }
      
//       // Combine form values with content and image
//       const blogData = {
//         ...values,
//         content,
//         image: imagePath
//       };
      
//       await onSubmit(blogData);
//       form.resetFields();
//       setContent('');
//       setImagePath('');
//     } catch (error) {
//       message.error('Error submitting form: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageUpload = (filePath) => {
//     setImagePath(filePath);
//   };

//   return (
//     <Form
//       form={form}
//       layout="vertical"
//       onFinish={handleSubmit}
//       initialValues={initialValues || {
//         published: false
//       }}
//     >
//       <Form.Item
//         name="title"
//         label="Title"
//         rules={[{ required: true, message: 'Please enter a title' }]}
//       >
//         <Input placeholder="Enter blog title" />
//       </Form.Item>

//       <Form.Item
//         name="excerpt"
//         label="Excerpt"
//         rules={[{ required: true, message: 'Please enter an excerpt' }]}
//       >
//         <TextArea 
//           placeholder="Enter a short description (max 200 characters)" 
//           rows={3}
//           maxLength={200}
//           showCount
//         />
//       </Form.Item>

//       <Form.Item
//         name="category"
//         label="Category"
//         rules={[{ required: true, message: 'Please select a category' }]}
//       >
//         <Select placeholder="Select a category">
//           {categories.map(category => (
//             <Option key={category} value={category}>{category}</Option>
//           ))}
//         </Select>
//       </Form.Item>

//       <Form.Item
//         name="author"
//         label="Author"
//         rules={[{ required: true, message: 'Please enter an author name' }]}
//       >
//         <Input placeholder="Enter author name" />
//       </Form.Item>

//       <Form.Item label="Content" required>
//         <div className="mb-6">
//           <ReactQuill 
//             theme="snow" 
//             value={content} 
//             onChange={setContent}
//             modules={{
//               toolbar: [
//                 [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//                 ['bold', 'italic', 'underline', 'strike'],
//                 [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//                 [{ 'color': [] }, { 'background': [] }],
//                 ['link', 'image'],
//                 ['clean']
//               ],
//             }}
//           />
//           {!content && (
//             <div className="text-red-500 text-sm mt-1">Please enter content</div>
//           )}
//         </div>
//       </Form.Item>

//       <Form.Item
//         label="Featured Image"
//         required
//       >
//         <div className="mb-2">
//           <FileUpload 
//             onUploadComplete={handleImageUpload} 
//             maxCount={1}
//             accept="image/*"
//           />
//         </div>
//         {imagePath ? (
//           <div className="mt-2">
//             <img 
//               src={imagePath} 
//               alt="Preview" 
//               className="max-h-40 rounded-md" 
//             />
//           </div>
//         ) : (
//           <div className="text-red-500 text-sm">Please upload an image</div>
//         )}
//       </Form.Item>

//       <Form.Item
//         name="published"
//         label="Published"
//         valuePropName="checked"
//       >
//         <Switch />
//       </Form.Item>

//       <Form.Item>
//         <div className="flex justify-end gap-2">
//           <Button onClick={onCancel}>
//             Cancel
//           </Button>
//           <Button type="primary" htmlType="submit" loading={loading}>
//             {initialValues ? 'Update' : 'Create'} Blog Post
//           </Button>
//         </div>
//       </Form.Item>
//     </Form>
//   );
// };

// export default BlogForm;