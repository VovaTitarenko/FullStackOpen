// import { useEffect, useState } from "react";
// import noteService from "./services/notes";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// const Home = () => (
//   <div>
//     {" "}
//     <h2>TKTL notes app</h2>{" "}
//   </div>
// );

// const Notes = ({ noteList }) => (
//   <div>
//     {" "}
//     <h2>Notes</h2>{" "}
//     <ul>
//       {noteList.map((note) => {
//         return (
//           <li key={note.id}>
//             <span>
//               {note.content}
//               <b style={{ marginLeft: 20 }}>
//                 {note.important ? "important" : ""}
//               </b>
//             </span>
//           </li>
//         );
//       })}
//     </ul>
//   </div>
// );

// const Users = ({ handleClick }) => (
//   <div>
//     {" "}
//     <h2>Users</h2>
//   </div>
// );

// const App = () => {
//   const [page, setPage] = useState("home");
//   const [notes, setNotes] = useState([]);
//   useEffect(() => {
//     noteService.getAll().then((initialNotes) => {
//       setNotes(initialNotes);
//     });
//   }, []);

//   const toPage = (page) => (event) => {
//     event.preventDefault();
//     setPage(page);
//   };

//   const content = () => {
//     if (page === "home") {
//       return <Home />;
//     } else if (page === "notes") {
//       console.log(notes);
//       return <Notes noteList={notes} />;
//     } else if (page === "users") {
//       return <Users />;
//     }
//   };

//   const padding = {
//     padding: 5,
//   };

//   return (
//     <Router>
//       <div>
//         <Link to="/" style={padding}>
//           home
//         </Link>
//         <Link to="/notes" style={padding}>
//           notes
//         </Link>
//         <Link to="/users" style={padding}>
//           users
//         </Link>
//       </div>

//       <Routes>
//         <Route path="/notes" element={<Notes noteList={notes} />} />
//         <Route path="/users" element={<Users />} />
//         <Route path="/" element={<Home />} />
//       </Routes>

//       <div>
//         <i>Note app, Department of Computer Science 2024</i>
//       </div>
//     </Router>
//   );
// };

import { useState } from "react";

import { Routes, Route, Link, Navigate, useParams, useNavigate, useMatch } from "react-router-dom";

const Home = () => (
    <div>
        <h2>TKTL notes app</h2>
        <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
    </div>
);

const Note = ({ note }) => {
    return (
        <div>
            <h2>{note.content}</h2>
            <div>{note.user}</div>
            <div>
                <strong>{note.important ? "important" : ""}</strong>
            </div>
        </div>
    );
};

const Notes = ({ notes }) => (
    <div>
        <h2>Notes</h2>
        <ul>
            {notes.map((note) => (
                <li key={note.id}>
                    <Link to={`/notes/${note.id}`}>{note.content}</Link>
                </li>
            ))}
        </ul>
    </div>
);

const Users = () => (
    <div>
        <h2>TKTL notes app</h2>
        <ul>
            <li>Matti Luukkainen</li>
            <li>Juha Tauriainen</li>
            <li>Arto Hellas</li>
        </ul>
    </div>
);

const Login = (props) => {
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        props.onLogin("mluukkai");
        navigate("/");
    };

    return (
        <div>
            <h2>login</h2>
            <form onSubmit={onSubmit}>
                <div>
                    username: <input />
                </div>
                <div>
                    password: <input type="password" />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
};

const App = () => {
    const [notes, setNotes] = useState([
        {
            id: 1,
            content: "HTML is easy",
            important: true,
            user: "Matti Luukkainen",
        },
        {
            id: 2,
            content: "Browser can execute only JavaScript",
            important: false,
            user: "Matti Luukkainen",
        },
        {
            id: 3,
            content: "Most important methods of HTTP-protocol are GET and POST",
            important: true,
            user: "Arto Hellas",
        },
    ]);

    const [user, setUser] = useState(null);

    const match = useMatch("/notes/:id");
    // console.log("01:", match, notes);
    const note = match ? notes.find((note) => note.id === Number(match.params.id)) : null;

    const login = (user) => {
        setUser(user);
    };

    const padding = {
        padding: 5,
    };

    return (
        <div>
            <div>
                <Link style={padding} to="/">
                    home
                </Link>
                <Link style={padding} to="/notes">
                    notes
                </Link>
                <Link style={padding} to="/users">
                    users
                </Link>
                {user ? (
                    <em>{user} logged in</em>
                ) : (
                    <Link style={padding} to="/login">
                        login
                    </Link>
                )}
            </div>

            <Routes>
                <Route path="/notes/:id" element={<Note note={note} />} />
                <Route path="/notes" element={<Notes notes={notes} />} />
                <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
                <Route path="/login" element={<Login onLogin={login} />} />
                <Route path="/" element={<Home />} />
            </Routes>

            <footer>
                <br />
                <em>Note app, Department of Computer Science 2023</em>
            </footer>
        </div>
    );
};

export default App;
