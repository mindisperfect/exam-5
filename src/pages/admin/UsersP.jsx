// import { Fragment, useEffect, useState } from "react";
// import { Button, Form, Input, Modal, Pagination, Spin, Table, message,} from "antd";
// import { LoadingOutlined,ExclamationCircleFilled } from "@ant-design/icons";
// import { useDispatch, useSelector } from "react-redux";

// import { deleteUserAction, fetchUsers } from "../../redux/actions/userAction";
// import { request } from "../../server/request";
// import { PER_PAGE } from "../../const";
// import { toast } from "react-toastify";

// const { useForm } = Form;

// const { confirm } = Modal;

// const UsersP = () => {
//   const columns = [
//     {
//       title: "First name",
//       dataIndex: "first_name",
//       key: "name",
//     },
//     {
//       title: "Last name",
//       dataIndex: "last_name",
//       key: "description",
//     },
//     {
//       title: "Username",
//       dataIndex: "username",
//       key: "description",
//     },
//     {
//       title: "Actions",
//       render: ({ id }) => (
//         <Fragment>
//           <Button type="primary" onClick={() => editCategory(id)}>
//             Edit
//           </Button>
//           <Button type="primary" danger onClick={() => deleteCategory(id)}>
//             Delete
//           </Button>
//         </Fragment>
//       ),
//     },
//   ];
//   const dispatch = useDispatch();
//   const [form] = useForm();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selected, setSelected] = useState(null);
//   const [page, setPage] = useState(1);
//   const { users, totalUsers, loading } = useSelector(
//     (state) => state.user
//   );
//   useEffect(() => {
//     dispatch(fetchUsers(page));
//   }, [dispatch, page]);
//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = async () => {
//     try {
//       let values = await form.validateFields();

//       // selected
//         // ? await request.put(`user/${selected}`, values)
//        await request.post('user', values)
//       dispatch(fetchUsers());
//       setIsModalOpen(false);
//     } catch (err) {
//       console.log(err.message)
//     }
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const addCategory = () => {
//     setSelected(null);
//     form.resetFields();
//     showModal();
//   };

//   async function editCategory(id) {
//     showModal();
//     setSelected(id);
//     try {
//       let { data } = await request.get(`user/${id}`);
//       form.setFieldsValue(data);
//     } catch (err) {
//       toast.error(err.message)
//     }
//   }

//   function deleteCategory(id) {
//     confirm({
//       title: "Do you want to delete this user?",
//       icon: <ExclamationCircleFilled />,
//       onOk: async () => {
//         dispatch(deleteUserAction(id));
//         message.success("Deleted successfully !");
//       },
//     });
//   }
//   const antIcon = (
//    <LoadingOutlined
//      style={{
//        fontSize: 48,
//      }}
//      spin
//    />
//  );
// return (
//   <div className="container">
//     {loading ?  (
//       <Spin style={{display: "flex", justifyContent: "center", paddingBottom: "50px" }} indicator={antIcon} />
//     ) : (
//       <>
//         <Table
//           pagination={false}
//           title={() => (
//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <h1>Total: {totalUsers}</h1>
//               <Button type="primary" onClick={addCategory}>
//                 Add category
//               </Button>
//             </div>
//           )}
//           dataSource={users}
//           columns={columns}
//         />
//         <Pagination
//           pageSize={PER_PAGE}
//           current={page}
//           onChange={(page) => setPage(page)}
//           total={totalUsers}
//         />
//         <Modal
//           title="User"
//           open={isModalOpen}
//           okText={selected ? "Save user" : "Add user"}
//           onOk={handleOk}
//           onCancel={handleCancel}
//         >
//           <Form form={form} layout="vertical" autoComplete="off">
//             <Form.Item
//               name="first_name"
//               label="First name"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please fill this field !",
//                 },
//               ]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="last_name"
//               label="Last name"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please fill this field !",
//                 },
//               ]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="username"
//               label="User name"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please fill this field !",
//                 },
//               ]}
//             >
//               <Input />
//             </Form.Item>
//           </Form>
//         </Modal>
//       </>
//     )}
//   </div>
// )
// }

// export default UsersP

import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Pagination,
  Spin,
  Table,
  message,
} from "antd";
import { LoadingOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { request } from "../../server/request";
import { PER_PAGE } from "../../const";
import { deleteUserAction, fetchUsers } from "../../redux/actions/userAction";
import { toast } from "react-toastify";

const { useForm } = Form;

const { confirm } = Modal;

const UsersP = () => {
  const columns = [
    {
      title: "First name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Actions",
      render: ({ _id }) => (
        <Fragment>
          <Button type="primary" onClick={() => editCategory(_id)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => deleteCategory(_id)}>
            Delete
          </Button>
        </Fragment>
      ),
    },
  ];
  const dispatch = useDispatch();
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
    const { users, totalUsers, loading } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      if (selected !== false) {     
        await request.put(`user/${selected}`, values)
      } else {
        await request.post("user", values);
      }
      dispatch(fetchUsers());
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // const handleOk = () => {
  //   form.validateFields().then((values) => {
  //     if (selected) {
  //       if (!values.password) {
  //         delete values.password;
  //       }
  //       request
  //         .put(`user/${selected}`, values)
  //         .then(() => {
  //           setIsModalOpen(false);
  //           dispatch(fetchUsers())
  //           message.success("Successfully changed");
  //         })
  //         .catch((err) => {
  //           message.error(err.response ? err.response.data.msg : "Timeout");
  //         });
  //     } else {
  //       request
  //         .post("user", values).then(() => {
  //           setIsModalOpen(false);
  //           dispatch(fetchUsers())
  //         })
  //         .catch((err) => {
  //           message.error(err.response ? err.response.data.msg : "Timeout");
  //         });
  //     }
  //   });
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addCategory = () => {
    setSelected(null);
    form.resetFields();
    showModal();
  };

  // async function editCategory(id) {
  //   setSelected(id);
  //   try {
  //     let { data } = await request.get(`user/${id}`);
  //     form.setFieldsValue(data);
  //     showModal();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async function editCategory(id) {
    setSelected(id);
    try {
      const { data } = await request.get(`user/${id}`);
      form.setFieldsValue(data);
      showModal();
    } catch (err) {
      message.error(err.response ? err.response.data.msg : "Timeout");
    }
  }

  function deleteCategory(id) {
    confirm({
      title: "Do you want to delete this user?",
      icon: <ExclamationCircleFilled />,
      onOk: async () => {
        dispatch(deleteUserAction(id));
        message.success("Deleted successfully !");
      },
    });
  }
  const antIcon = (
    <LoadingOutlined
      style={{
          fontSize: 48,
        }}
        spin
      />
    );
  return (
    <div className="container">
      {loading ? (
        <Spin
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "50px",
          }}
          indicator={antIcon}
        />
      ) : (
        <>
          <Table
            pagination={false}
            title={() => (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Total: {totalUsers}</h1>
                <Button type="primary" onClick={addCategory}>
                  Add category
                </Button>
              </div>
            )}
            dataSource={users}
            columns={columns}
          />
          <Pagination
            pageSize={PER_PAGE}
            current={page}
            onChange={(page) => setPage(page)}
            total={totalUsers}
          />
          <Modal
            title="Category"
            open={isModalOpen}
            okText={selected ? "Save category" : "Add category"}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form form={form} layout="vertical" autoComplete="off">
              <Form.Item
                name="first_name"
                label="First name"
                rules={[
                  {
                    required: true,
                    message: "Please fill this field !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="last_name"
                label="Last name"
                rules={[
                  {
                    required: true,
                    message: "Please fill this field !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="username"
                label="User name"
                rules={[
                  {
                    required: true,
                    message: "Please fill this field !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </div>
    );
  };
  
  export default UsersP;
  
