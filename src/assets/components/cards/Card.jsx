export default function Card(props) {
  return (
    <div className="col-4">
      <div className="card">
        <div className="card-body">
          <img
            src={props.politician.image}
            className="card-img-top"
            alt="..."
          />
          <div className="card-text text-center">{props.politician.name}</div>
          <div className="card-text text-center">
            {props.politician.position}
          </div>
          <div className="card-text text-center">
            {props.politician.biography}
          </div>
        </div>
      </div>
    </div>
  );
}
