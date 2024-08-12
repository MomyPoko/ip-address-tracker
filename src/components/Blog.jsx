export function BlogPost(props) {
  return (
    <div className="app-blog">
      <p className="app-bg-title"> {props.title} </p>
      <p className="app-bg-content"> {props.content} </p>
    </div>
  );
}
