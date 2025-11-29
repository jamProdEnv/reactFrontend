import { useState } from "react";
import { CreatePost } from "../../component/blogComponent/CreatePost";
import { PostFilter } from "../../component/blogComponent/PostFilter";
import { PostSorting } from "../../component/blogComponent/PostSorting";
import { BlogHeader } from "../../component/blogComponent/BlogHeader";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/Posts";
import { Post } from "../../component/blogComponent/Post";
import { PostList } from "../../component/blogComponent/PostList";
import classes from "../../CSS/BlogDisplay.module.css";
export function BlogDisplay({
  posts,
  author,
  onAuthorChange,
  sortBy,
  sortOrder,
  onSortChange,
}) {
  // const postQuery = useQuery({
  //   queryKey: ["posts", { author, sortBy, sortOrder }],
  //   queryFn: () => getPosts({ author, sortBy, sortOrder }),
  // });
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={classes.container}>
        <div className={`${classes.tile} ${classes.header}`}>
          <BlogHeader />
        </div>
        <div className={`${classes.tile} ${classes.createPosts}`}>
          <CreatePost />
        </div>
        <div className={classes.filter}>
          <section>
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
          </section>
        </div>
        <div className={`${classes.tile} ${classes.posts}`}>
          <PostList posts={posts} />
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
