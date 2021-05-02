import './PostContent_noAction.css'
import PostContent_img_na from '../auxiliary/PostContent_img_na'
const PostContent_noAction = (props) => {
    let contentimgs = []
    contentimgs = props.contentimg

    return (
        <div class='PostContent_noAction'>
            <strong class='PlatformSource_noAction'>{props.source}</strong>
            <div class='block_noAction'>
                <img class='userimg' src={props.userimg} />
                <div class='Text'>
                    <strong class='username'>{props.UserName}</strong>
                    <p>{new Date(props.Senttime).toLocaleString()}</p>
                </div>
            </div>

            <p class='postcontent_noAction'>{props.content}</p>

            <img className='contentimg' src={props.contentimg} />
            {/* <div class="imageimport" >
        {contentimgs.map((img)=>(
                <PostContent_img_na 
  
                key ={img.id} 
                contentimg={img} />
                ))}
                </div> */}
        </div>
    )
}

export default PostContent_noAction
