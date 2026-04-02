import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import "../styles/Evo.css";

const projects = [
  {
    id: "project-1",
    title: "Project One",
    thumb: "/images/project-1-thumb.jpg",
    image: "/images/project-1.jpg",
    description: "Short description of Project One."
  },
  {
    id: "project-2",
    title: "Project Two",
    thumb: "/images/project-2-thumb.jpg",
    image: "/images/project-2.jpg",
    description: "Short description of Project Two."
  },
  // add more
];

function Gallery() {
  return (
    <div className="gallery-wrapper">
      <div className="gallery-scroll">
        {projects.map((p) => (
          <Link key={p.id} to={`/work/${p.id}`} className="gallery-item">
            <img src={p.thumb} alt={p.title} />
            <div className="gallery-caption">{p.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) return <div className="detail-wrapper">Not found.</div>;

  return (
    <div className="detail-wrapper">
      <Link to="/" className="back-link">← Back</Link>
      <div className="detail-content">
        <img src={project.image} alt={project.title} className="detail-image" />
        <div className="detail-text">
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function EvoPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/work/:id" element={<ProjectDetail />} />
      </Routes>
    </Router>
  );
}