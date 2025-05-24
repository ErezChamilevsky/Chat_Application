import NavBar from "../utilities/NavBar";

function Results(scores){
    <div className="container">
        <NavBar />
        <div className="test-wraper text-center">
            <h2>Test Finished</h2>
            <p>Reading: {scores.reading}</p>
            <p>Writing: {scores.writing}</p>
            <p>Speaking: {scores.speaking}</p>
            <p>Average Score: {Math.round((scores.reading + scores.writing + scores.speaking) / 3)}</p>
        </div>
    </div>
}

export default Results;