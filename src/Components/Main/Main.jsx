import "./Main.css"
import { Container, Row, Col } from "react-bootstrap";

const Main = () => {
    return (
        <>
            <main>
                <div className="questions-wrapper">
                    <h1 className="questions">
                        An interface design application that runs in the browser with team-based collaborative design projects
                    </h1>
                </div>
                <div className="options-wrapper">
                    <div className="options">
                        <small>A.</small>
                        Opt no 1
                    </div>
                    <div className="options">
                        <small>B.</small>
                        Opt no 1
                    </div>
                    <div className="options">
                        <small>C.</small>
                        Opt no 1
                    </div>
                    <div className="options">
                        <small>D.</small>
                        Opt no 1
                    </div>
                </div>
            </main >
        </>
    )
}

export default Main;