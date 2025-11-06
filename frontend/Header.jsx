import "./Header.css";


export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="project-title">Cab On Campus</h1>
      </div>

      <div className="header-right">
        <button
          className="about-btn"
          onClick={() =>
            alert(
              "Cab on Campus is an E-Rickshaw booking system for college students. \n\nStudents can book a ride on campus by selecting pickup and drop locations. Captains (drivers) can accept ride requests. Payment is directly done to the e-rickshaw driver (₹10 fixed per ride)."
            )
          }
        >
          About
        </button>
      </div>
    </header>
  );
}
