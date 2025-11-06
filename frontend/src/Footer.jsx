export default function Footer() {
  return (
    <footer className="footer">
      <p>
        Made by <strong>Aman Yadav (102316125)</strong>,{" "}
        <strong>Manvendra (102316121)</strong>,{" "}
        <strong>Harnimarpreet (102316032)</strong>
      </p>
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
    </footer>
  );
}
