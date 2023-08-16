import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { request } from "../server/request";
// import { request } from "../server/request";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [popularPost, setPopularPost] = useState(null);
  const [postId, setPostId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  
  // postsPage state management
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);


  useEffect(() => {
    request.get("category").then((response) => {
      setCategories(response.data.data);
    });
  }, [setCategories]);


  const contextValue = {
    popularPost,
    setPopularPost,
    postId,
    setPostId,
    posts,
    setPosts,
    search,
    setSearch,
    total,
    setTotal,
    page,
    setPage,
    categoryId, 
    setCategoryId,
    setCategories,
    categories,
    uploadedImage,
    setUploadedImage,
  };

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node
}

//<section id="slider">
//       <div className="container">
//         <div className="slider-paragraph">
//           <h2>My posts</h2>
//           <button onClick={openModal}>Add post</button>
//         </div>
//         <input
//           type="text"
//           placeholder="Searching . . ."
//           name="search"
//           className="input"
//         />
        // <div className="owl-carousel">
        //   <div className="boxs">
        //     {posts.map((el, index) => (
        //       <NavLink key={index}>
        //         <div className="box">
        //           <div className="box-left"></div>
        //           <div className="box-right">
        //             <p className="p-4">{el.category.name}</p>
        //             <h1>{el.title}</h1>
        //             <div
        //               style={{
        //                 display: "flex",
        //                 alignItems: "center",
        //                 gap: "12px",
        //               }}
        //             >
        //               <h3>{el.user.first_name}</h3>
        //               <h3>{el.user.last_name}</h3>
        //            </div>
        //             <p className="p-5">{el.description}</p>
        //             <p className="p-5">
        //               <b>Created at: </b>
        //               {el.user.createdAt.split("T")[0]}
        //             </p>
        //             <div className="btns">
        //               <button className="btn">Edit</button>
        //               <button className="btn-danger">Delete</button>
        //             </div>
        //        </div>
        //       </div>
        //       </NavLink>
        //     ))}
        //   </div>
        // </div>
//         <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={closeModal}>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <input
//               {...register("first_name")}
//               type="text"
//               className="input-modal"
//               placeholder="First name"
//             />
//             {errors.first_name && (
//               <p role="alert" style={{ color: "red" }}>
//                 {errors.first_name.message} !
//               </p>
//             )}
//             <input
//               {...register("last_name")}
//               type="text"
//               className="input-modal"
//               placeholder="Last name"
//             />{" "}
//             {errors.last_name && (
//               <p style={{ color: "red" }} role="alert">
//                 {errors.last_name.message} !
//               </p>
//             )}
//             <input
//               {...register("createdAt")}
//               type="date"
//               className="input-modal"
//               placeholder="Created at"
//             />
//             {errors.createdAt && (
//               <p style={{ color: "red" }} role="alert">
//                 {errors.createdAt.message} !
//               </p>
//             )}
//             <input
//               {...register("description")}
//               type="text"
//               className="input-modal"
//               placeholder="Description"
//             />
//             {errors.description && (
//               <p role="alert" style={{ color: "red" }}>
//                 {errors.description.message} !
//               </p>
//             )}
//             <input
//               {...register("title")}
//               type="text"
//               className="input-modal"
//               placeholder="Title"
//             />
//             {errors.title && (
//               <p style={{ color: "red" }} role="alert">
//                 {errors.title.message}
//               </p>
//             )}
//             <div className="btns">
//               <button className="btn btn-danger me-3" onClick={closeModal}>
//                 Close
//               </button>
//               <button type="submit" className="btn btn-success">
//                 Save
//               </button>
//             </div>
//           </form>
//         </Modal>
//       </div>
//     </section>