import { useState } from "react";
import { request } from "../../server/request";
import { toast } from "react-toastify";
import "../../components/styles/AllPosts.scss";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "../../schema/category";
// import MyPostsCard from "../../components/card/MyPostsCard";

const MyPostsP = () => {
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // const [selected, setSelected] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(categorySchema) });

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // async function getPosts() {
  //   try {
  //     let { data } = await request.get("post");
  //     const post = data.data;
  //     setPosts(post);
  //     console.log(post);
  //   } catch (err) {
  //     toast.error(err.response);
  //   }
  // }

  // useEffect(() => {
  //   getPosts();
  // }, []);

  const onSubmit = async (data) => {
    try {
      const isValid = await categorySchema.isValid(data);
      if (isValid) {
        await request.post("post", data);
        console.log(data);
      }
      closeModal();
      setPosts(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section id="slider">
      <div className="container">
        <div className="slider-paragraph">
          <h2>My posts</h2>
          <button onClick={openModal}>Add post</button>
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
                  <div className="box-left"></div>
                  <div className="box-right">
                    <p className="p-4">{el.category.name}</p>
                    <h1>{el.title}</h1>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <h3>{el.user.first_name}</h3>
                      <h3>{el.user.last_name}</h3>
                    </div>
                    <p className="p-5">{el.description}</p>
                    <p className="p-5">
                      <b>Created at: </b>
                      {el.user.createdAt.split("T")[0]}
                    </p>
                    <div className="btns">
                      <button className="btn">Edit</button>
                      <button className="btn-danger">Delete</button>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
        <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={closeModal}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("first_name")}
              type="text"
              className="input-modal"
              placeholder="First name"
            />
            {errors.first_name && (
              <p role="alert" style={{ color: "red" }}>
                {errors.first_name.message} !
              </p>
            )}
            <input
              {...register("last_name")}
              type="text"
              className="input-modal"
              placeholder="Last name"
            />{" "}
            {errors.last_name && (
              <p style={{ color: "red" }} role="alert">
                {errors.last_name.message} !
              </p>
            )}
            <input
              {...register("createdAt")}
              type="date"
              className="input-modal"
              placeholder="Created at"
            />
            {errors.createdAt && (
              <p style={{ color: "red" }} role="alert">
                {errors.createdAt.message} !
              </p>
            )}
            <input
              {...register("description")}
              type="text"
              className="input-modal"
              placeholder="Description"
            />
            {errors.description && (
              <p role="alert" style={{ color: "red" }}>
                {errors.description.message} !
              </p>
            )}
            <input
              {...register("title")}
              type="text"
              className="input-modal"
              placeholder="Title"
            />
            {errors.title && (
              <p style={{ color: "red" }} role="alert">
                {errors.title.message}
              </p>
            )}
            <div className="btns">
              <button className="btn btn-danger me-3" onClick={closeModal}>
                Close
              </button>
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </section>
  );
};

export default MyPostsP;

// import { Fragment, useEffect, useState } from "react";
// import { Button, Checkbox, Form, Input, Modal, Table, Tag } from "antd";
// import {
//   DeleteOutlined,
//   EditOutlined,
//   ExclamationCircleFilled,
// } from "@ant-design/icons";
// import { request } from "../../server/request";

// const { confirm } = Modal;

// const MyPostsP = () => {
//   const columns = [
//     {
//       title: "First name",
//       dataIndex: "firstName",
//       key: "firstName",
//     },
//     {
//       title: "Last name",
//       dataIndex: "lastName",
//       key: "lastName",
//     },
//     {
//       title: "Image",
//       dataIndex: "avatar",
//       key: "avatar",
//       render: (item) => <img height={50} src={item} alt={item} />,
//     },
//     {
//       title: "Groups",
//       dataIndex: "groups",
//       key: "groups",
//       render: (groups) => (
//         <Fragment>
//           {groups.length !== 0
//             ? groups.map((gr) => <Tag key={gr}>{gr}</Tag>)
//             : "No"}
//         </Fragment>
//       ),
//     },
//     {
//       title: "Ismarried",
//       dataIndex: "isMarried",
//       key: "isMarried",
//     },
//     {
//       title: "Phone",
//       dataIndex: "phoneNumber",
//       key: "phoneNumber",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Field",
//       dataIndex: "field",
//       key: "field",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (item) => (
//         <Fragment>
//           <Button
//             onClick={() => editTeacher(item.id)}
//             type="primary"
//             icon={<EditOutlined />}
//           />
//           <Button
//             onClick={() => deleteTeacher(item.id)}
//             type="primary"
//             danger
//             icon={<DeleteOutlined />}
//           />
//         </Fragment>
//       ),
//     },
//   ];
//   const [teachers, setTeachers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selected, setSelected] = useState(null);
//   const [form] = Form.useForm();

//   const getTeachers = async () => {
//     setLoading(true);
//     try {
//       let { data } = await request.get("post");
//       // data = data.map((el) => ({ ...el, key: el.id }));
//       setTeachers(data);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getTeachers();
//   }, []);

//   const showModal = () => {
//     setIsModalOpen(true);
//   };
//   const hideModal = () => {
//     setIsModalOpen(false);
//   };

//   const submit = async () => {
//     try {
//       let values = await form.validateFields();
//       if (selected) {
//         await request.put(`post/${selected}`, values);
//       } else {
//         await request.post("post", values);
//       }
//       form.resetFields();
//       hideModal();
//       getTeachers();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   async function editTeacher(id) {
//     let { data } = await request.get(`post/${id}`);
//     console.log(data);
//     form.setFieldsValue(data);
//     setSelected(id);
//     showModal();
//   }

//   const addTeacher = () => {
//     showModal();
//     setSelected(null);
//   };

//   function deleteTeacher(id) {
//     confirm({
//       title: "Do you Want to delete this teacher?",
//       icon: <ExclamationCircleFilled />,
//       onOk: async () => {
//         await request.delete(`post/${id}`);
//         getTeachers();
//       },
//     });
//   }

//   return (
//     <Fragment>
//       <Table
//         title={() => (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               gap: "20px",
//             }}
//           >
//             <Input />
//             <Button onClick={addTeacher} type="primary">
//               Add
//             </Button>
//           </div>
//         )}
//         loading={loading}
//         columns={columns}
//         dataSource={teachers}
//       />
//       <Modal
//         title="Adding teacher"
//         open={isModalOpen}
//         onOk={submit}
//         okText={selected ? "Save" : "Add"}
//         onCancel={hideModal}
//       >
//         <Form
//           initialValues={{
//             isMarried: false,
//           }}
//           form={form}
//           layout="vertical"
//           autoComplete="off"
//         >
//           <Form.Item
//             name="firstName"
//             label="First name"
//             rules={[
//               {
//                 required: true,
//                 message: "Please fill this field !",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             rules={[
//               {
//                 required: true,
//                 message: "Please fill this field !",
//               },
//             ]}
//             name="lastName"
//             label="Last name"
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             rules={[
//               {
//                 required: true,
//                 message: "Please fill this field !",
//               },
//               { type: "url", warningOnly: true },
//               { type: "string", min: 6 },
//             ]}
//             name="avatar"
//             label="Image"
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item valuePropName="checked" name="isMarried">
//             <Checkbox>Is married ?</Checkbox>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </Fragment>
//   );
// };

// export default MyPostsP;
