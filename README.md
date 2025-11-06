# CabOnCampus
🚖 Cab On Campus

Cab On Campus is a MERN-stack web application that enables students to easily book e-rickshaw rides within the college campus and allows captains (drivers) to accept and manage ride requests.
The system is inspired by on-campus transportation needs and simplifies short-distance travel inside the campus.


🎯 Project Objectives

✔ Provide a digital alternative to manually finding e-rickshaws inside campus
✔ Make student transportation more organized and accessible
✔ Create real-time ride request and acceptance flow
✔ Ensure a fixed, affordable price of ₹10 per ride (cash payment to driver)

🛠️ Tech Stack
Technology	Purpose
React + Vite	Frontend UI
Node.js + Express	Backend API
MongoDB + Mongoose	Database
JWT (JSON Web Token)	Authentication
Axios	HTTP Requests
Pure CSS	Styling (no Tailwind/Bootstrap)
🔄 System Workflow
👨‍🎓 Student:

Login / Signup using mobile number

Enter Pickup Location & Drop Location

Submit ride request (₹10 fixed fare)

Wait for captain to accept

View captain’s contact details after acceptance

Pay directly to driver (offline)

🚖 Captain (Driver):

Login / Signup using mobile number

View all ride requests from students

Accept any one ride request

Student gets notified about assigned captain

Pickup student and complete the ride

📁 Project Folder Structure
Cab-On-Campus/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
└── README.md

⚙️ How to Run the Project Locally
✅ 1. Clone the Repository
git clone https://github.com/your-username/cab-on-campus.git
cd cab-on-campus

✅ 2. Setup Backend
cd backend
npm install


Create a .env file:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/cab_on_campus
JWT_SECRET=your_secret_key


Run backend:

node server.js

✅ 3. Setup Frontend
cd ../frontend
npm install
npm run dev
