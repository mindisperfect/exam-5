import { Form, Input, Modal, message, Button, Pagination, Spin } from "antd";
import { ExclamationCircleFilled, LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { request } from "../../server/request";
import { IMG_URL, LIMIT } from "../../const";
import { toast } from "react-toastify";

const MyPostsPage = () => {
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [uploadedImage, setuploadedImage] = useState(null);
  const [form] = Form.useForm();
  const [PhotoUrl, setPhotoUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tags, setTags] = useState("");
  const [posts, setMyPosts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [edit, setEdit] = useState(null);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    request.get("category").then((res) => {
      setCategories(res.data.data);
    });
  }, [setCategories]);

  const getPosts = async () => {
    try {
      setLoading(true);
      let { data } = await request.get(`post/user?page=${page}&limit=${LIMIT}&search=${search}` );
      setMyPosts(data?.data);
      setTotal(data.pagination.total);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPosts();
  }, [search, page, setTotal, setMyPosts]);

  const handleImageUpload = async (e) => {
    try {
      const form = new FormData();
      form.append("file", e.target.files[0]);
      let res = await request.post("upload", form);
      setuploadedImage(res?.data?._id);
      const imageUrl = `${IMG_URL + res?.data?._id}.${
        res?.data?.name.split(".")[1] }`;
      setPhotoUrl(imageUrl);
    } catch (err) {
      console.log(err);
    }
  };

  const onFinish = async (values) => {
    try {
      let { title, description, tags, category, photo } = values;
      const tagsArray = tags ? tags.split(",") : [];
      const postData = { title, description, tags: tagsArray, category, photo: uploadedImage, };
    if (selected) {
        let response = await request.put(`post/${selected}`, postData);
        if (response.status === 200) {
          getPosts();
          toast.success("Post edited");
          hideModal();
        } else {
          toast.error("Biroz kuting");
        }
      } else {
        const response = await request.post("post", postData);
        getPosts();
        if (response.status === 201) {
          toast.success("Post created");
          hideModal();
        } else {
          toast.error("Biroz kuting");
        }
      }
    } catch (error) {
      toast.error(
        "Biroz kuting"
      );
    }
  };

  const setEditingValues = (data) => {
    form.setFieldsValue({ title: data.title, category: data.category._id, tags: data.tags.join(","), description: data.description, uploadedImage: data.photo._id, });
    const imageUrl = `${IMG_URL + data.photo._id}.${ data.photo.name.split(".")[1] }`;
    setPhotoUrl(imageUrl);
  };

  const clearFormFields = () => {
    form.resetFields();
    setPhotoUrl(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
    clearFormFields();
    setSelected(null)
  };
  async function editPost(id) {
    try {
      let { data } = await request.get(`post/${id}`);
      setEdit(data);
      setSelected(id);
      setEditingValues(data);
      showModal();
    } catch (err) {
      console.log(err);
    }
  }
  async function deletePost(id) {
    try {
      Modal.confirm({
        title: "Confirm",
        icon: <ExclamationCircleFilled />,
        content: "Dou wou want to delete this post ?",
        okText: "Delete",
        cancelText: "Cancel",
        onOk: async () => {
          await request.delete(`post/${id}`);
          message.success("Post deleted");
          getPosts();
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  const onChange = (page) => {
    setPage(page);
  };
  const antIcon = (
    <LoadingOutlined
      style={{ fontSize: 48, }} spin />
  );
  return (
    <section className="slider">
      <div className="container">
        <div className="slider-paragraph" style={{ marginTop: "40px" }}>
          <h2>My posts</h2>
          <button onClick={openModal}>Add</button>
        </div>
        <input placeholder="Searching . . ." onChange={(e) => setSearch(e.target.value)} name="search" className="input" />
          <Modal
            title={selected ? "Edit post" : "Adding new post"}
            open={isModalOpen}
            onCancel={hideModal}
            footer={false} >
            <Form
              id="addPostForm"
              layout="vertical"
              autoComplete="off"
              onFinish={onFinish}
              form={form} >
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: "Please enter a title!",
                  }, ]} >
                <Input />
              </Form.Item>
              <div
                className="form-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between", }} >
                <Form.Item
                  name="category"
                  label="Category"
                  rules={[
                    {
                      required: true,
                      message: "Select category",
                    }, ]} >
                  <select placeholder="Select a category">
                    {categories?.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option> ))}
                  </select>
                </Form.Item>
                <Form.Item
                  name="tags"
                  label="tegs"
                  rules={[ { required: true, }, ]} >
                  <Input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="enter teg" />
                </Form.Item>
              </div>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Enter desc more than 10",
                  }, ]} >
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item
                name="photo"
                label="Image"
                rules={[
                  {
                    required: false,
                    message: "Select image",
                  }, ]} >
                <input type="file" onChange={handleImageUpload} />
                {PhotoUrl && (
                  <img
                    style={{
                      width: "200px",
                      marginTop: "15px", }}
                    src={PhotoUrl}
                    alt="image" /> )}
              </Form.Item>
              <Button
                danger
                type="primary"
                onClick={hideModal}
                style={{ marginRight: "10px" }} >
                Close
              </Button>
              <Button type="primary" htmlType="submit">
                {selected ? "Save post" : "Create post"}
              </Button>
            </Form>
          </Modal>
        <div
          className="owl-carousel"
          style={{ marginTop: "30px", marginBottom: "30px" }} >
          <div className="boxs">
            {loading ? (
              <Spin
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: "50px", }}
                indicator={antIcon} /> ) : null}
            {posts.length == 0 ? "Nothing"
             : posts.map((pr) => (
                  <div
                    key={pr._id}
                    className="card"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "50px",
                      marginBottom: "30px",
                      border: "1px solid silver",
                      borderRadius: "8px", }} >
                    {pr?.photo?._id ? (
                      <div>
                        <img
                          src={`${IMG_URL + pr?.photo?._id}.${
                            pr?.photo?.name.split(".")[1] }`}
                          alt="img"
                          height={300}
                          width={450}
                          style={{ borderRadius: "8px" }} />
                      </div> ) : null}
                      <div className="box-right">
                        <p className="p-4">{pr?.category?.name}</p>
                        <h1>{pr?.title}</h1>
                        <p className="p-5">{pr?.description}</p>
                        <div className="btns">
                          <button onClick={() => editPost(pr._id)} className="btn" >Edit</button>
                          <button onClick={() => deletePost(pr._id)} className="btn-danger">Delete</button>
                        </div>
                      </div>
                    </div>
                ))}
            {loading ? null : posts.length !== 0 ? (
              <div className="pagination_wrpper">
                <Pagination
                  style={{ marginTop: "30px" }}
                  current={page}
                  onChange={onChange}
                  total={total}
                />
              </div> ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPostsPage;
