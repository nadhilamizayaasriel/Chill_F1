  // import React from "react";
  // import "../css/potraitCard.css";

  // function PotraitMovieCard({ id, title, image, badge, rank, debug }) {
  //   const badges = Array.isArray(badge) ? badge : badge ? [badge] : [];

  //   return (
  //     <div className="potrait-card">
  //       <img src={image} alt={title} />

  //       {badges.length > 0 && (
  //         <div className="potrait-badges">
  //           {badges.map((b, idx) => (
  //             <span
  //               key={idx}
  //               className={`potrait-badge ${b === "TOP" ? "badge-top" : "badge-episode"}`}
  //             >
  //               {b === "TOP" ? (
  //                 <>
  //                   <span>Top</span>
  //                   {rank && <span>{rank}</span>}
  //                 </>
  //               ) : (
  //                 <span>{b}</span>
  //               )}
  //             </span>
  //           ))}
  //         </div>
  //       )}
  //       {debug && (
  //         <div className="debug-info" style={{fontSize:10,opacity:0.9,marginTop:6}}>
  //           <div>ID: {id}</div>
  //           <div>badges: {badges.length ? badges.join(", ") : "-"}</div>
  //         </div>
  //       )}
  //     </div>
  //   );
  // }

  // export default PotraitMovieCard;

  import React from "react";
import "../css/potraitCard.css";

function PotraitMovieCard({
  id,
  title,
  image,
  badge,
  rank,
  debug,
  onClick,
}) {
  const badges = Array.isArray(badge)
    ? badge
    : badge
      ? [badge]
      : [];

  return (
    <div
      className="potrait-card"
      onClick={onClick}
    >
      <img src={image} alt={title} />

      {badges.length > 0 && (
        <div className="potrait-badges">
          {badges.map((b, idx) => (
            <span
              key={idx}
              className={`potrait-badge ${
                b === "TOP"
                  ? "badge-top"
                  : "badge-episode"
              }`}
            >
              {b === "TOP" ? (
                <>
                  <span>Top</span>
                  {rank && <span>{rank}</span>}
                </>
              ) : (
                <span>{b}</span>
              )}
            </span>
          ))}
        </div>
      )}

      {debug && (
        <div
          className="debug-info"
          style={{
            fontSize: 10,
            opacity: 0.9,
            marginTop: 6,
          }}
        >
          <div>ID: {id}</div>
          <div>
            badges:{" "}
            {badges.length
              ? badges.join(", ")
              : "-"}
          </div>
        </div>
      )}
    </div>
  );
}

export default PotraitMovieCard;