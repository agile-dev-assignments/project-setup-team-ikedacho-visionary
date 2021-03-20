import './PostContent_noAction.css'

const PostContent_noAction = (props) => {
   
  return (
    <div class="PostContent_noAction">
        <strong class="PlatformSource">{props.source}</strong>
        <div class = "block_noAction">
    <img class="userimg" src={props.userimg} />
        <div class="Text">
        <strong class = "username">{props.UserName}</strong>
        <p>{props.Senttime}</p>
    </div>
</div>

        <p class = "postcontent_noAction">{props.content}</p>
        <img class="contentimg" src={props.contentimg} />

    </div>
  )
}



export default PostContent_noAction
