import './PostCard.css'
export const PostCard = ({title,body,cover}) => {

  return (
    <div className="post">
      <img src={cover} alt={title} />
      <div className="content">
        <h2> {title} </h2>
        <p> {body}</p>
      </div>
    </div>
  );
};