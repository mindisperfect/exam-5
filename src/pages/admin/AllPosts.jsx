import { useEffect, useState } from "react";
import "../../components/styles/AllPosts.scss";
import { request } from "../../server/request";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { IMG_URL } from "../../const";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    try {
      let { data } = await request("post");
      console.log(data);
      let res = data.data;
      setPosts(res);
    } catch (err) {
      toast.error(err.response);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section id="slider">
      <div className="container">
        <div className="slider-paragraph">
          <h2>All posts</h2>
        </div>
        <input
          type="text"
          placeholder="Searching . . ."
          name="search"
          className="input"
        />
        <div className="owl-carousel">
          <div className="boxs">
            {posts.map((el, index) => (
              <NavLink key={index}>
                <div className="box">
                <img
                    height={200}
                    src={
                      IMG_URL + el?.photo?._id + "." + el?.photo?.name.split(".")[1]
                    }
                    alt=""
                  />
                  <div className="box-left">
                  </div>
                  <div className="box-right">
                    <p className="p-4">{el.name}</p>
                    <h1>{el.title}</h1>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }} >
                      <h3>{el.user.first_name}</h3>
                      <h3>{el.user.last_name}</h3>
                    </div>
                    <p className="p-5">{el.description}</p>
                    <p className="p-5">
                      <b>Created at: </b>
                      {el.user.createdAt.split("T")[0]}
                    </p>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllPosts;
// import "../../components/styles/AllPosts.scss";
// import { useEffect, useState } from "react";
// import {
//   Button,
//   Form,
//   Input,
//   Modal,
//   Pagination,
//   Spin,
//   Upload,
//   message,
// } from "antd";
// import {
//   LoadingOutlined,
//   PlusOutlined,
//   ExclamationCircleFilled,
// } from "@ant-design/icons";
// import { useDispatch, useSelector } from "react-redux";

// import { getImage } from "../../utils/getImage";
// import { request } from "../../server/request";
// import { PER_PAGE } from "../../const";
// import { toast } from "react-toastify";
// import {
//   fetchPosts,
//   deleteCategoryAction,
// } from "../../redux/actions/postsAction";
// import { NavLink } from "react-router-dom";

// const { useForm } = Form;
// const { TextArea } = Input;

// const { confirm } = Modal;

// const AllPosts = () => {
//   // const columns = [
//   //   {
//   //     title: "Name",
//   //     dataIndex: "createdAt",
//   //     key: "name",
//   //   },
//   //   {
//   //     title: "Description",
//   //     dataIndex: "description",
//   //     key: "description",
//   //   },
//   //   {
//   //     title: "Photo",
//   //     dataIndex: "photo",
//   //     render: (photo) => <Image height={50} src={getImage(photo)} />,
//   //   },
//   //   {
//   //     title: "Actions",
//   //     render: ({ _id }) => (
//   //       <Fragment>
//   //         <Button type="primary" onClick={() => editCategory(_id)}>
//   //           Edit
//   //         </Button>
//   //         <Button type="primary" danger onClick={() => deleteCategory(_id)}>
//   //           Delete
//   //         </Button>
//   //       </Fragment>
//   //     ),
//   //   },
//   // ];
//   const dispatch = useDispatch();
//   const [form] = useForm();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [photo, setPhoto] = useState(null);
//   const [selected, setSelected] = useState(null);
//   const [page, setPage] = useState(1);
//   const { posts, totalPosts, loading } = useSelector((state) => state.post);
//   useEffect(() => {
//     dispatch(fetchPosts(page));
//   }, [dispatch, page]);
//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = async () => {
//     try {
//       let values = await form.validateFields();
//       values.photo = photo._id;

//       selected
//         ? await request.put(`post/${selected}`, values)
//         : await request.post("post", values);
//       dispatch(fetchPosts());
//       setIsModalOpen(false);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const addCategory = () => {
//     setSelected(null);
//     form.resetFields();
//     setPhoto(null);
//     showModal();
//   };

//   async function editCategory(id) {
//     showModal();
//     setSelected(id);
//     try {
//       let { data } = await request.get(`post/${id}`);
//       form.setFieldsValue(data);
//       setPhoto(data.photo);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   function deleteCategory(id) {
//     confirm({
//       title: "Do you want to delete this category?",
//       icon: <ExclamationCircleFilled />,
//       onOk: async () => {
//         dispatch(deleteCategoryAction(id));
//         message.success("Deleted successfully !");
//       },
//     });
//   }

//   const handleChange = async (e) => {
//     try {
//       let formData = new FormData();
//       formData.append("file", e.file.originFileObj);
//       let { data } = await request.post("upload", formData);
//       setPhoto(data);
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };
//   const antIcon = (
//     <LoadingOutlined
//       style={{
//         fontSize: 48,
//       }}
//       spin
//     />
//   );
//   return (
//     <div className="container">
//       {loading ? (
//         <Spin
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             paddingBottom: "50px",
//           }}
//           indicator={antIcon}
//         />
//       ) : (
//         <>
//           {/* <Table
//           pagination={false}
//           title={() => (
//           )}
//           dataSource={posts}
//           // columns={columns}
//         /> */}
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <h1>Total: {totalPosts}</h1>
//             <Button type="primary" onClick={addCategory}>
//               Add category
//             </Button>
//           </div>
//           <div className="cards">
//             {posts.map((el, index) => (
//               <NavLink key={index}>
//                 <div className="box">
//                   <div className="box-left"></div>
//                   <div className="box-right">
//                     <p className="p-4">{el.category.name}</p>
//                     <h1>{el.title}</h1>
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "12px",
//                       }}
//                     >
//                       <h3>{el.user.first_name}</h3>
//                       <h3>{el.user.last_name}</h3>
//                     </div>
//                     <p className="p-5">{el.description}</p>
//                     <p className="p-5">
//                       <b>Created at: </b>
//                       {el.user.createdAt.split("T")[0]}
//                     </p>
//                   </div>
//                 </div>
//               </NavLink>
//             ))}
//           </div>
//           <Pagination
//             pageSize={PER_PAGE}
//             current={page}
//             onChange={(page) => setPage(page)}
//             total={totalPosts}
//           />
//           <Modal
//             title="Category"
//             open={isModalOpen}
//             okText={selected ? "Save category" : "Add category"}
//             onOk={handleOk}
//             onCancel={handleCancel}
//           >
//             <Form form={form} layout="vertical" autoComplete="off">
//               <Form.Item>
//                 <Upload
//                   className="category-image"
//                   style={{ width: "100%" }}
//                   name="avatar"
//                   listType="picture-card"
//                   showUploadList={false}
//                   onChange={handleChange} >
//                   {photo ? (
//                     <img
//                       src={getImage(photo)}
//                       alt="avatar"
//                       style={{
//                         height: "100%",
//                       }}
//                     />
//                   ) : (
//                     <div>
//                       {loading ? <LoadingOutlined /> : <PlusOutlined />}
//                       <div
//                         style={{
//                           marginTop: 8,
//                         }}
//                       >
//                         Upload
//                       </div>
//                     </div>
//                   )}
//                 </Upload>
//               </Form.Item>
//               <Form.Item
//                 name="createdAt"
//                 label="Category name"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please fill this field !",
//                   },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//               <Form.Item
//                 name="description"
//                 label="Description"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please fill this field !",
//                   },
//                 ]}
//               >
//                 <TextArea />
//               </Form.Item>
//             </Form>
//           </Modal>
//         </>
//       )}
//     </div>
//   );
// };

// export default AllPosts;
