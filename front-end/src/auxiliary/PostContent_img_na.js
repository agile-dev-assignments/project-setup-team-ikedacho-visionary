import './PostContent_img_na.css'

const PostContent_img_na = (props) => {
   console.log(props.contentimg);
   console.log("running");
  return (
<div className="multipleimg">
        <img className="contentimg" src={props.contentimg} />

  </div>
  )
}



export default PostContent_img_na
