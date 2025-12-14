<h1>ServiceDeskAi</h1>

<p>ServiceDeskAi is a web application designed to streamline issue reporting through tickets.</p>
<p>Standard users can create tickets by simply uploading a photo and selecting an office. An AI automatically generates a title and description based on the uploaded image.</p> 
<p>Desk users are assigned tickets according to their office and manage their status from "Assigned" to "In Progress" or "Closed".</p>
<p>Admin users can create new users (Standard or Desk) and add new offices with names and geolocations.</p>

<p>Offices are sorted based on proximity if geolocation permissions are granted, otherwise alphabetically. Users with a preferred office will have it pre-selected but can change it anytime.</p>

<p>The application uses JWT-based sessions with HTTP-only cookies and supports both light and dark modes.</p>

<h2>Features</h2>
<ul>
  <li><strong>User Profiles:</strong>
    <ul>
      <li><strong>Standard User:</strong> Create tickets with images, select office, and view ticket status.</li>
      <li><strong>Desk User:</strong> Receive assigned tickets, update ticket status (Assigned → In Progress → Closed).</li>
      <li><strong>Admin User:</strong> Create users, manage offices, and view all ticket reports.</li>
    </ul>
  </li>
  <li><strong>Report Submission:</strong>
    <ul>
      <li>Upload images/videos</li>
      <li>Automatic AI-generated title and description (Pollinations API)</li>
      <li>Office selection with geolocation support</li>
      <li>Track ticket history with status updates</li>
    </ul>
  </li>
  <li><strong>Authentication & Security:</strong>
    <ul>
      <li>JWT token-based authentication with HTTP-only cookies</li>
      <li>Role-based access control</li>
    </ul>
  </li>
  <li><strong>UI/UX:</strong>
    <ul>
      <li>Mobile-first responsive design</li>
      <li>Light and dark mode toggle</li>
      <li>WCAG AA accessibility compliance</li>
    </ul>
  </li>
</ul>

<h2>Technology Stack</h2>
<ul>
  <li><strong>Front End:</strong> React, TypeScript, Redux, TailwindCSS</li>
  <li><strong>Back End:</strong> Node.js, Express</li>
  <li><strong>Database:</strong> MongoDB</li>
  <li><strong>AI Integration:</strong> Pollinations Image Analyzer API</li>
  <li><strong>Containerization:</strong> Docker & Docker Compose</li>
</ul>

<h2>Installation</h2>
<ol>
  <li>Clone the repository:
    <pre><code>git clone https://github.com/your-username/ServiceDeskAi.git
cd ServiceDeskAi</code></pre>
  </li>
  <li>Create a <code>.env</code> file in the project root. Example:
    <pre><code>MONGO_INITDB_ROOT_USERNAME=your_mongo_username
MONGO_INITDB_ROOT_PASSWORD=your_mongo_password
MONGO_INITDB_DATABASE=your_database_name

ADMIN_USERNAME=your_admin_username
HASHED_ADMIN_PASSWORD=your_hashed_password

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

GMAIL_USER=your_email@example.com
GMAIL_PASS=your_email_password</code></pre>

  </li>
  <li>Start the application using Docker Compose:
    <pre><code>docker-compose up --build</code></pre>
  </li>
  <li>The frontend and backend will run in separate containers.</li>
</ol>

<h2>Usage</h2>
<p>
Access the application via your browser, http://localhost:5173/ by default.<br>
Admin users can log in and create additional users and offices.<br>
Standard users can submit tickets, and Desk users manage them.
</p>

<h2>License</h2>
<p>This project is licensed under the MIT License.</p>

<h2>Acknowledgements</h2>
<ul>
  <li><a href="https://pollinations.ai/" target="_blank">Pollinations Image Analyzer API</a> for AI-powered image analysis.</li>
  <li>Node.js, React, MongoDB, and TailwindCSS communities.</li>
</ul>
