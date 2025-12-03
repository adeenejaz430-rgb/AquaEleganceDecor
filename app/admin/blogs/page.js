// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Table, Button, Space, Modal, message, Popconfirm } from 'antd';
// import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
// // import BlogForm from './BlogForm';

// export default function BlogsAdmin() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [currentBlog, setCurrentBlog] = useState(null);
//   const [modalTitle, setModalTitle] = useState('Add New Blog Post');

//   // Fetch blogs on component mount
//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const fetchBlogs = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/blogs');
//       const result = await response.json();
      
//       if (result.success) {
//         setBlogs(result.data);
//       } else {
//         message.error('Failed to fetch blogs');
//       }
//     } catch (error) {
//       message.error('Error fetching blogs: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAdd = () => {
//     setCurrentBlog(null);
//     setModalTitle('Add New Blog Post');
//     setModalVisible(true);
//   };

//   const handleEdit = (blog) => {
//     setCurrentBlog(blog);
//     setModalTitle('Edit Blog Post');
//     setModalVisible(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`/api/blogs/${id}`, {
//         method: 'DELETE',
//       });
      
//       const result = await response.json();
      
//       if (result.success) {
//         message.success('Blog deleted successfully');
//         fetchBlogs();
//       } else {
//         message.error('Failed to delete blog: ' + result.message);
//       }
//     } catch (error) {
//       message.error('Error deleting blog: ' + error.message);
//     }
//   };

//   const handleFormSubmit = async (values) => {
//     try {
//       const url = currentBlog 
//         ? `/api/blogs/${currentBlog._id}` 
//         : '/api/blogs';
      
//       const method = currentBlog ? 'PUT' : 'POST';
      
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values),
//       });
      
//       const result = await response.json();
      
//       if (result.success) {
//         message.success(`Blog ${currentBlog ? 'updated' : 'created'} successfully`);
//         setModalVisible(false);
//         fetchBlogs();
//       } else {
//         message.error(`Failed to ${currentBlog ? 'update' : 'create'} blog: ${result.message}`);
//       }
//     } catch (error) {
//       message.error(`Error ${currentBlog ? 'updating' : 'creating'} blog: ${error.message}`);
//     }
//   };

//   const columns = [
//     {
//       title: 'Title',
//       dataIndex: 'title',
//       key: 'title',
//       render: (text, record) => (
//         <a href={`/blog/${record.slug}`} target="_blank" rel="noopener noreferrer">
//           {text}
//         </a>
//       ),
//     },
//     {
//       title: 'Category',
//       dataIndex: 'category',
//       key: 'category',
//     },
//     {
//       title: 'Author',
//       dataIndex: 'author',
//       key: 'author',
//     },
//     {
//       title: 'Published',
//       dataIndex: 'published',
//       key: 'published',
//       render: (published) => (published ? 'Yes' : 'No'),
//     },
//     {
//       title: 'Created At',
//       dataIndex: 'createdAt',
//       key: 'createdAt',
//       render: (date) => new Date(date).toLocaleDateString(),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space size="middle">
//           <Button 
//             type="primary" 
//             icon={<EditOutlined />} 
//             onClick={() => handleEdit(record)}
//           >
//             Edit
//           </Button>
//           <Popconfirm
//             title="Are you sure you want to delete this blog?"
//             onConfirm={() => handleDelete(record._id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button 
//               danger 
//               icon={<DeleteOutlined />}
//             >
//               Delete
//             </Button>
//           </Popconfirm>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold">Blog Management</h1>
//         <Button 
//           type="primary" 
//           icon={<PlusOutlined />} 
//           onClick={handleAdd}
//         >
//           Add New Blog
//         </Button>
//       </div>

//       <Table 
//         columns={columns} 
//         dataSource={blogs} 
//         rowKey="_id" 
//         loading={loading}
//         pagination={{ pageSize: 10 }}
//       />

//       <Modal
//         title={modalTitle}
//         open={modalVisible}
//         onCancel={() => setModalVisible(false)}
//         footer={null}
//         width={800}
//       >
//         <BlogForm 
//           initialValues={currentBlog} 
//           onSubmit={handleFormSubmit} 
//           onCancel={() => setModalVisible(false)} 
//         />
//       </Modal>
//     </div>
//   );
// }