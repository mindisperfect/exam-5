import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import "../../components/styles/AllPosts.scss";
import { request } from "../../server/request";
import { NavLink } from "react-router-dom";
// import { IMG_URL } from "../../const";
import { toast } from "react-toastify";

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
                  <div className="box-left">
                    {/* <img
                      height={230} 
                      src={ IMG_URL + el.photo._id + "." + el.photo.name.split(".")[1] }
                      alt="" /> */}
                  </div>
                  <div className="box-right">
                    <p className="p-4">{el.category.name}</p>
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
