import shareCode from "/shareCode.svg";
import team from "/team.svg";
import realtimeCollab from "/realtimeCollab.svg";
import idea from "/idea.svg";
import videoStreaming from "/videoStreaming.svg";
function Cards() {
  return (
    <ul style={{ "--count": 5 }}>
      <li>
        <div className="card">
          <img src={shareCode} className="share" />
          <div className="card-content">
            <span className="card-content__header">One Click Away!</span>
            <p className="card-content__paragraph">
              Create a room or join one instantly—start coding with your team in
              seconds!
            </p>
          </div>
        </div>
      </li>
      <li>
        <div className="card">
          <img src={realtimeCollab} className="collab" />
          <div className="card-content">
            <span className="card-content__header">Code Together!</span>
            <p className="card-content__paragraph">
              See live edits with named cursors—always know who's typing and
              where!
            </p>
          </div>
        </div>
      </li>
      <li>
        <div className="card">
          <img src={videoStreaming} className="streaming" />
          <div className="card-content">
            <span className="card-content__header">Connect Beyond Code!</span>
            <p className="card-content__paragraph">
              Stream video and audio for a richer, more interactive coding
              experience.
            </p>
          </div>
        </div>
      </li>
      <li>
        <div className="card">
          <img src={team} className="team" />
          <div className="card-content">
            <span className="card-content__header">
              Your Code, Your Choice!
            </span>
            <p className="card-content__paragraph">
              Pick your preferred programming language and start coding right
              away.
            </p>
          </div>
        </div>
      </li>
      <li>
        <div className="card">
          <img src={idea} className="idea" />
          <div className="card-content">
            <span className="card-content__header">Code, Run & Showcase!</span>
            <p className="card-content__paragraph">
              Demonstrate snippets with output—perfect for sharing ideas
              instantly.
            </p>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default Cards;
