export default function AboutPage({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h2>About This Project</h2>

        <p>
          This project was created for COMP 4513 Assignment 2.
        </p>

        <p>
          It is a single-page React application for browsing songs, artists,
          and genres.
        </p>

        <p>
          <strong>Technologies Used:</strong> React, Vite, React Router,
          Node.js, Express, Chart.js.
        </p>

        <p>
          <strong>Group Members:</strong> Chris Botuli
        </p>

        <p>
          <strong>GitHub Repo:</strong>{' '}
          <a
            href="https://github.com/RoiCB7/A2-Sound-Snob"
            target="_blank"
            rel="noopener noreferrer"
          >
            A2-Sound-Snob
          </a>
        </p>

        <p>
          <p>
            <strong>Credits:</strong> useEffect Hook code referenced from {' '}
            <a
              href="https://blog.logrocket.com/useeffect-react-hook-complete-guide/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>LogRocket Guide</strong> under 'How to use useEffect for asynchronous tasks?''
            </a>
          </p>
        </p>

        <button type="button" className="primary-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}