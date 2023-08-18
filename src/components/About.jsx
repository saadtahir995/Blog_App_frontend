import React from 'react';
import {BiArrowBack} from 'react-icons/bi';
import {useNavigate} from 'react-router-dom';
import '../stylesheets/About.css'; // Import your About Page CSS file

const About = () => {
    const navigate=useNavigate();
  return (
    <div className="about-container">
        <div className="back-btn">
            <BiArrowBack style={{width:'1.7rem',height:'1.7rem'}} onClick={()=>navigate('/')}/>
        </div>
      <h1>About Me</h1>
      <div className="about-section">
        <h2>Hi, I'm Saad</h2>
        <p>
          Welcome to my blog app! I'm a passionate developer and creator with a love for coding and technology.
          This app was born out of my desire to share my thoughts, ideas, and experiences with the world.
        </p>
        <p>
          When I'm not coding, you can find me exploring new technologies, working on exciting projects,
          and constantly learning to improve my skills. I believe in the power of code to create meaningful
          and impactful solutions.
        </p>
      </div>

      <div className="projects-section">
        <h2>My Projects</h2>
        <div className="project-card">
          <h3>Project 1: Weather App</h3>
          <p>
          Stay informed about the weather with our user-friendly weather app. Get real-time updates on temperature, humidity, and conditions for your location. Plan your day better with accurate weather forecasts and a sleek, intuitive interface.
          </p>
        </div>
        <div className="project-card">
          <h3>Project 2: To do-Task App</h3>
          <p>
          Organize your tasks efficiently with our powerful to-do app. Easily create, manage, and prioritize tasks to boost your productivity. Stay on top of your commitments with reminders, due dates, and a user-friendly interface that makes task management a breeze.          </p>
        </div>
        {/* Add more project cards as needed */}
      </div>

      <div className="app-info-section">
        <h2>About This App</h2>
        <p>
          This blog app is a platform for sharing ideas, stories, and insights. It's built with the latest
          technologies to ensure a smooth and responsive experience for users. Whether you're a seasoned developer
          or just getting started, this app provides a space for sharing and connecting with like-minded individuals.
        </p>
      </div>
    </div>
  );
};

export default About;
