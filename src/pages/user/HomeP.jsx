import { Fragment, useEffect, useState } from "react";
import "../../components/styles/Header.scss";
import { request } from "../../server/request";
import { toast } from "react-toastify";
import Slider from "react-slick";
import GetNewsLastOne from "../../components/card/GetNewsLastOne";
import { IMG_URL } from "../../const";
import { Link } from "react-router-dom";

const HomeP = () => {
  const [post, setPost] = useState([]);
  const [lastInfo, setLastInfo] = useState([]);
  const [category, setCategory] = useState([]);

  // last ten
  useEffect(() => {
    const getData = async () => {
      try {
        let { data } = await request.get("post/lastones");
        setPost(data);
      } catch (err) {
        toast.error(err.message);
      }
    };
    getData();
  }, []);

  // last one

  useEffect(() => {
    const getPosts = async () => {
      try {
        let { data } = await request.get("post/lastone");
        setLastInfo(data);
      } catch (err) {
        toast.error(err.message);
      }
    };
    getPosts();
  }, []);

  // category

  useEffect(() => {
    async function getPosts() {
      try {
        let { data } = await request.get("category");
        const category1 = data.data;
        console.log(category1);
        setCategory(category1);
      } catch (err) {
        toast.error(err.message);
      }
    }
    getPosts();
  }, []);

  let settings1 = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
    let settings = {
      dots: true,
      infinite: false,
      autoplay: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  return (
    <Fragment>
      <header>
        <div className="container">
          <Slider {...settings1}>
            {post.map((pr, i) => (
              <GetNewsLastOne key={i} {...pr} />
            ))}
          </Slider>
        </div>
      </header>
      <section className="popular-blogs">
        <div className="container">
          <h1 style={{ paddingBottom: "64px" }}>Popular blogs</h1>
          <Slider {...settings}>
            {post.map((pr, i) => (
              <div key={i}>
                <div className="card-1" style={{border: "1px solid silver", marginRight: "30px"}}>
                  <img
                    height={300}
                    src={
                      IMG_URL + pr?.photo?._id + "." + pr?.photo?.name.split(".")[1]
                    }
                    alt="img"
                    style={{width: "100%"}}
                  />
                  <div className="content" style={{ maxWidth: "400px", paddingLeft: "30px", paddingTop: "10px" }}>
                    <h1 className="line-clamps">{pr.title}</h1>
                    <p className="line-clamp">{pr.description}</p>
                    <p>
                      <b>Created at: </b>
                      {pr.createdAt.split("T")[0]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
      <div className="container">
        <hr style={{ backgroundColor: "#6D6E76", width: "100%" }} />
      </div>
      <section className="home-category">
        <div className="container">
          <h1>Choose A Category</h1>
          <div className="home-categories">
            {category.slice(0, 4).map((pr, i) => (
              <div className="home-category-card" key={i}>
                <img
                    height={200}
                    src={
                      IMG_URL + pr.photo._id + "." + pr.photo.name.split(".")[1]
                    }
                    alt=""
                  />
                <h1>{pr.name}</h1>
                <p>{pr.description}</p>
                <button className="btnssss">
                  <Link to={`${pr._id}`} onClick={() => pr._id}>
                    Get a category
                  </Link>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default HomeP;
