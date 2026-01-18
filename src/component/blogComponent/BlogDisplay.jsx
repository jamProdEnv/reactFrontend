import { useState, lazy, Suspense, memo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
// import { CreatePost } from "../../component/blogComponent/CreatePost";
// import { PostFilter } from "../../component/blogComponent/PostFilter";
// import { PostSorting } from "../../component/blogComponent/PostSorting";
// import { BlogHeader } from "../../component/blogComponent/BlogHeader";
// import { useQuery } from "@tanstack/react-query";
// import { getPosts } from "../../api/Posts";
// import { Post } from "../../component/blogComponent/Post";
import { PostList } from "../../component/blogComponent/PostList";
import classes from "../../CSS/BlogDisplay.module.css";
import { getPosts } from "../../api/Posts";

const CreatePost = lazy(() => import("./CreatePost"));
const PostFilter = lazy(() => import("./PostFilter"));
const PostSorting = lazy(() => import("./PostSorting"));
const BlogHeader = lazy(() => import("./BlogHeader"));
// const PostList = lazy(() => import("./PostList"));
export function BlogDisplay({
  // posts,
  // author,
  // onAuthorChange,
  searchBy,
  query,
  onSearchByChange,
  onQueryChange,
  onTagSelect,
  sortBy,
  sortOrder,
  onSortChange,
}) {
  // const postQuery = useQuery({
  //   queryKey: ["posts", { author, sortBy, sortOrder }],
  //   queryFn: () => getPosts({ author, sortBy, sortOrder }),
  // });
  const [showModal, setShowModal] = useState(false);
  // const [posts, setPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  const handleSelectTag = (tag) => {
    onSearchByChange("tag");
    onQueryChange(tag);
    setSelectedTag(tag);
  };

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const queryParams = {};

  //       if (selectedTag && selectedTag !== "blog") {
  //         queryParams.tag = selectedTag;
  //       } else if (searchBy && query) {
  //         queryParams[searchBy] = query;
  //       }

  //       const data = await getPosts(queryParams);
  //       setPosts(data);
  //     } catch (err) {
  //       console.error("Error fetching posts", err);
  //     }
  //   };

  //   fetchPosts();
  // }, [selectedTag, searchBy, query, sortBy, sortOrder]);
  const { data: posts = [] } = useQuery({
    queryKey: ["posts", selectedTag, searchBy, query, sortBy, sortOrder],
    queryFn: () =>
      getPosts(
        selectedTag && selectedTag !== "blog"
          ? { tag: selectedTag }
          : searchBy && query
            ? { [searchBy]: query }
            : undefined,
      ),
  });
  return (
    <>
      <div className={classes.container}>
        <div className={`${classes.tile} ${classes.header}`}>
          <Suspense fallback={null}>
            <BlogHeader onTagSelect={handleSelectTag} />
          </Suspense>
        </div>
        <div className={`${classes.tile} ${classes.createPosts}`}>
          <Suspense fallback={null}>
            <CreatePost />
          </Suspense>
        </div>
        <div className={classes.search}>
          <section>
            <button
              className={` ${classes.filterButton} ${showModal ? classes.hideFilterButton : classes.filterButton}`}
              onClick={() => setShowModal(true)}
            >
              Filters
            </button>
            {showModal && (
              <section className={classes.modalContainer}>
                <div className={classes.modal}>
                  <div className={classes.modalBackdrop}></div>
                  <div className={classes.modalBody}>
                    <button
                      onClick={() => setShowModal(false)}
                      className={classes.modalClose}
                    >
                      x
                    </button>
                    <div className={classes.filter}>
                      <PostFilter
                        // field="searchBy"
                        // value={author}
                        // onChange={onAuthorChange}
                        searchBy={searchBy}
                        query={query}
                        onSearchByChange={onSearchByChange}
                        onQueryChange={onQueryChange}
                      />
                    </div>

                    <div className={classes.sorting}>
                      <PostSorting
                        fields={["createdAt", "updatedAt"]}
                        value={sortBy}
                        orderValue={sortOrder}
                        onChange={(field) => onSortChange(field, sortOrder)}
                        onOrderChange={(orderValue) =>
                          onSortChange(sortBy, orderValue)
                        }
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}
          </section>
        </div>
        <div className={`${classes.tile} ${classes.posts}`}>
          <Suspense fallback={null}>
            <PostList posts={posts} />
          </Suspense>
        </div>

        {/* <div className={classes.blogDisplayContainer}>
          <BlogHeader />
       

          <CreatePost />

          <div>
          
            <button onClick={() => setShowModal(true)}>Filters</button>
            {showModal && (
              <section className={classes.blogDisplaySection}>
                <div className={classes.modal}>
                  <div className={classes.modalBackdrop}></div>
                  <div className={classes.modalBody}>
                    <button
                      onClick={() => setShowModal(false)}
                      className={classes.modalClose}
                    >
                      close
                    </button>
                    <PostFilter
                      field="searchBy"
                      value={author}
                      onChange={onAuthorChange}
                    />
                    <br />

                    <PostSorting
                      fields={["createdAt", "updatedAt"]}
                      value={sortBy}
                      orderValue={sortOrder}
                      onChange={(field) => onSortChange(field, sortOrder)}
                      onOrderChange={(orderValue) =>
                        onSortChange(sortBy, orderValue)
                      }
                    />
                  </div>
                </div>
              </section>
            )}

            <main className={classes.blogDisplayMain}>
              <PostList posts={posts} />
            </main>
          </div>
        </div> */}
      </div>
    </>
  );
}

// export default BlogDisplay;
export default memo(BlogDisplay);
