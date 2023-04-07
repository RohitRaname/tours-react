import { useEffect, useState } from "react";

const Tours = () => {
  const [error, setError] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let tours = await fetch("https://course-api.com/react-tours-project");
        tours = await tours.json();

        // set limitTextInfo
        tours = tours.map((tour) => {
          tour.limitedInfo = `${tour.info.slice(0, 100)}...`;
          tour.showFullInfo = false;
          return tour;
        });

        setTours(tours);
      } catch (err) {
        console.log(err);
        setError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  const showTourFullInfo = (id) => {
    // it work when i change the prop in all arr elms;
    const updateTours = tours.map((tour) => {
      tour.showFullInfo = tour.id === id;
      return tour;
    });
    setTours(updateTours);
  };
  
  const showTourLessInfo = (id) => {
    const updateTours = tours.map((tour) => {
      tour.showFullInfo = false;
      return tour;
    });
    setTours(updateTours);
  };

  if (loading) return <div className="loading"></div>;
  else if (error)
    return <h1 className="alert alert-danger">Failed to reload</h1>;
  else {
    console.log("torus-s", tours);

    return (
      <main>
        <h1 className="section-title">Our Tours</h1>

        <div className="section-container">
          <ul className="tours">
            {tours.map((tour) => {
              const {
                id,
                image,
                info,
                showFullInfo,
                limitedInfo,
                name,
                price,
              } = tour;

              return (
                <li className="single-tour" key={id}>
                  <div className="tour-img-container">
                    <img src={image} className="img" alt="" />
                    <p className="tour-price">${price}</p>
                  </div>

                  <div className="tour-info">
                    <h5 className="tour-name">{name}</h5>
                    <p className="tour-text-box">
                      <span className="tour-text">
                        {showFullInfo ? info : limitedInfo}
                      </span>
                      <span
                        className="info-btn"
                        onClick={() =>
                          showFullInfo
                            ? showTourLessInfo(id)
                            : showTourFullInfo(id)
                        }
                      >
                        {showFullInfo ? "Read less" : "Read more"}
                      </span>
                    </p>
                    <button
                      className="btn delete-btn"
                      onClick={() => removeTour(id)}
                    >
                      Not Interested
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    );
  }
};

export default Tours;
