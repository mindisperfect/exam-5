import { useEffect, useState } from "react";
import "../../components/styles/AllPosts.scss";
import { toast } from "react-toastify";
import { request } from "../../server/request";
import { NavLink, useParams } from "react-router-dom";
import { IMG_URL, LIMIT } from "../../const"; 
import { Pagination } from "antd";

const CategoriesP = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState();
  const [searching, setSearching] = useState("");
  const [page, setPage] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function getPosts() {
      try {
        let { data } = await request.get(
          `post?page=${page}&limit=${LIMIT}&search=${searching}&category=${id}`
        );
        let res = await request.get(`category/${id}`);
        setTitle(res.data.name);
        setDescription(res.data.description);
        setPosts(data.data);
        setTotal(data.pagination.total);
        setPage(data.pagination.page);
        console.log(data.data);
      } catch (err) {
        toast.error(err.response);
      }
    }
    getPosts();
  }, [searching, id, page]);

  const onChange = (page) => {
    setPage(page);
  };
  const handleSearching = (e) => {
    setSearching(e.target.value);
  };

  return (
    <section id="slider">
      <div className="container">
        <div className="title">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <input
          type="text"
          onChange={handleSearching}
          placeholder="Searching . . ."
          name="search"
          className="input"
        />
        <div className="owl-carousel">
          <div className="boxs">
            {posts.map((pr, i) => (
              <NavLink key={i}>
                <div className="box">
                  <div className="box-left">
                  <img
                    height={200}
                    src={
                      IMG_URL + pr?.photo?._id + "." + pr?.photo?.name.split(".")[1]
                    }
                    alt="title"
                  />
                  </div>
                  <div className="box-right">
                    <p className="p-4">{pr.category.name}</p>
                    <h1>{title}</h1>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <h3>{pr.user.first_name}</h3>
                      <h3>{pr.user.last_name}</h3>
                    </div>
                    <p style={{maxWidth: "400px"}} className="p-2">{pr.description}</p>
                    <p className="p-5">
                      <b>Created at: </b>
                      {pr.user.createdAt.split("T")[0]}
                    </p>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
          <Pagination
            className="pagination"
            current={page}
            onChange={onChange}
            total={total}
          />
        </div>
      </div>
    </section>
  );
};

export default CategoriesP;
