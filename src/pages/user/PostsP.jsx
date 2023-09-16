import { useEffect, useState } from "react";
import "../../components/styles/AllPosts.scss";
import { request } from "../../server/request";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { IMG_URL, LIMIT } from "../../const";
import { Pagination } from "antd";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState();
  const [searching, setSearching] = useState("");
  const [page, setPage] = useState();
  const [loading, setLoading] = useState(false);

  const onChange = (page) => {
    setPage(page);
  };
  const handleSearching = (e) => {
    setSearching(e.target.value);
  };

  useEffect(() => {
    async function getPosts() {
      try {
        setLoading(true);
        let { data } = await request(
          `post?page=${page}&limit=${LIMIT}&search=${searching}`
        );
        console.log(data);
        let res = data.data;
        setPosts(res);
        setTotal(data.pagination.total);
        setPage(data.pagination.page);
      } catch (err) {
        toast.error(err.response);
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  }, [page, searching]);
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 48,
      }}
      spin
    />
  );
  return (
    <section id="slider">
      <div className="container">
        <div className="slider-paragraph">
          <h2>All posts</h2>
        </div>
        <input
          type="text"
          placeholder="Searching . . ."
          onChange={handleSearching}
          name="search"
          className="input"
        />
        <div className="owl-carousel">
          <div className="boxs">
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
              posts.slice(0, 5).map((el, index) => (
                <NavLink key={index}>
                  <div className="box">
                    <div className="box-left">
                    <img
                    height={300}
                    src={
                      IMG_URL + el?.photo?._id + "." + el?.photo?.name.split(".")[1]
                    }
                    alt=""
                  />                      
                    </div>
                    <div className="box-right">
                      {/* <p className="p-4">{el.category.name}</p> */}
                      <h1>{el.title}</h1>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }} >
                        <h3>{el?.user?.first_name}</h3>
                        <h3>{el?.user?.last_name}</h3>
                      </div>
                      <p className="p-5">{el?.description}</p>
                      <p className="p-5">
                        <b>Created at: </b>
                        {el?.user?.createdAt.split("T")[0]}
                      </p>
                    </div>
                  </div>
                </NavLink>
              ))
            )}
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

export default AllPosts;
