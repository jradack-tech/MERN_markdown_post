import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import MdEditor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

import { getMyPosts, toggleVisibility } from "../../store/actions/posts";
import Pagination from "../elements/pagination";

export default function UserPosts() {
  const dispatch = useDispatch();
  const auth: any = useSelector<any, boolean>(state => state.auth);
  const posts: any = useSelector<any, boolean>(state => state.posts);

  React.useEffect(() => {
    getPosts();
  }, []);

  React.useEffect(() => {
    console.log("posts => ", posts.my_posts)
    setMyPosts([...JSON.parse(JSON.stringify(posts.my_posts))]);
  }, [posts]);

  const [refresh, setRefresh] = React.useState(true);
  const [myPosts, setMyPosts] = React.useState<any>([]);
  const [currentItems, setCurrentItems] = React.useState<any>([]);

  const getPosts = () => {
    const body = {
      userId: auth.github_user,
    }
    dispatch(getMyPosts(body))
  }

  const onChange = (id: string) => {
    let post: any = myPosts.find((p: PostType) => p._id === id);
    console.log("post=>", post);
    post.visibility = !post.visibility;
    setRefresh(!refresh);
  }

  const saveChange = () => {
    let changedPosts = [];
    for (let i = 0; i < myPosts.length; i++) {
      if (myPosts[i].visibility !== posts.my_posts[i].visibility) {
        changedPosts.push(myPosts[i])
      }
    }
    const change = {
      changedPosts
    }
    dispatch(toggleVisibility(change));
  }

  return (
    <div className="row">
      <div
        className="col-12 d-flex flex-column justify-content-center"
      >
        <div className="my-5">
          <h1 className="display-md-3 font-weight-bold text-center">
            My Posts
          </h1>
          <div className="d-flex flex-row-reverse mb-3">
            <button className="btn btn-secondary" onClick={saveChange}>Save change</button>
          </div>
          {
            myPosts.length !== 0 && currentItems.map((post: any, i: number) => (
              <div className="bg-grey p-3 shadow-lg mb-4 pb-0 bg-white rounded-lg" key={i}>
                <h6 className="m-2">{(new Date(post.createdAt)).toDateString()}</h6>
                <MdEditor
                  modelValue={post.content}
                  footers={[]}
                  language={'en-US'}
                  previewOnly={true}
                  className="bg-grey"
                />
                <div className="d-flex flex-row-reverse p-1 mt-2 align-items-center">
                  <form>
                    <div className="custom-control custom-switch">
                      <input
                        onChange={() => onChange(post._id)}
                        checked={post.visibility}
                        type="checkbox" className="custom-control-input" id={"switch" + i} />
                      <label className="custom-control-label" htmlFor={"switch" + i}>Public</label>
                    </div>
                  </form>
                  <button className="btn btn-secondary mr-2"><i className='fas fa-pen'></i></button>

                  <button className="btn btn-danger mr-2"><i className='fas fa-trash'></i></button>
                </div>
              </div>
            ))
          }

          <Pagination data={myPosts} setData={setCurrentItems} key={myPosts} />
        </div>

      </div>
    </div>
  );
}

interface PostType {
  _id: string,
}
