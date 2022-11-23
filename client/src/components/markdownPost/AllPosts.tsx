import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import MdEditor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

import { getAllPosts } from "../../store/actions/posts";
import Pagination from "../elements/pagination";


export default function AllPosts() {
  const dispatch = useDispatch();
  const auth: any = useSelector<any, boolean>(state => state.auth);
  const posts: any = useSelector<any, boolean>(state => state.posts);

  React.useEffect(() => {
    getPosts();
  }, []);

  React.useEffect(() => {
    console.log("posts => ", posts.all_posts)
  }, [posts]);
  
  const [currentItems, setCurrentItems] = React.useState<any>([]);

  const getPosts = () => {
    dispatch(getAllPosts())
  }


  return (
    <div className="row">
      <div
        className="col-12 d-flex flex-column justify-content-center"
      >
        <div className="my-3">
          <h1 className="display-md-3 font-weight-bold text-center">
            All Posts
          </h1>
          {
            posts.all_posts.length !== 0 && currentItems.map((post: any, i: number) => (
              <div className="bg-grey bg-grey px-4 py-3 shadow-lg mb-4 bg-white rounded-lg" key={i}>
                <h6 className="m-2">By <b>{post.userId}</b> : {(new Date(post.createdAt)).toDateString()}</h6>
                <MdEditor
                  modelValue={post.content}
                  footers={[]}
                  language={'en-US'}
                  previewOnly={true}
                  className="bg-grey"
                />
                <h6 className="mt-2 mb-0">Updated : {(new Date(post.updatedAt)).toDateString()}</h6>
              </div>
            ))
          }

          <Pagination data={posts.all_posts} setData={setCurrentItems} key={posts.all_posts} />

        </div>

      </div>
    </div>
  );
}
