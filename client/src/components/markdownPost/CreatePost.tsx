import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import MdEditor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

import { createPostAction } from "../../store/actions/posts";


export default function MarkdownPost() {
	const dispatch = useDispatch();
	const auth: any = useSelector<any, boolean>(state => state.auth);

	const [text, setText] = React.useState('# Hello Editor');

	const createPost = () => {
		console.log("auth=>", auth)
		const post = {
			userId: auth.github_user,
			content: text
		}
		dispatch(createPostAction(post))
	}


	return (
		<div className="row">
			<div
				className="col-12 d-flex flex-column justify-content-center align-items-center"
				style={{ height: "91.7vh" }}
			>
				<div className="row justify-content-center my-5">
					<h1 className="display-md-3 font-weight-bold text-center">
						New Post
					</h1>
					<MdEditor
						modelValue={text}
						onChange={setText}
						footers={[]}
						language={'en-US'}
						// previewOnly={true}
					/>
				</div>
				<div className="row justify-content-center my-2">
					<button className="btn btn-lg btn-secondary" onClick={createPost}>Save</button>
				</div>
			</div>
		</div>
	);
}
