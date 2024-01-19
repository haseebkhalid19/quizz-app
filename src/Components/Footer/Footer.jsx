import "./Footer.css";
import polygonLeftImg from "../../images/polygon-left.svg"
import polygonRightImg from "../../images/polygon-right.svg"
import skipImg from "../../images/skip.svg"
import { Container } from 'react-bootstrap/';

const Footer = () => {
    return (
        <>
            <footer>
                <Container>
                    <ul className="d-flex align-items-center justify-content-between py-5">
                        <li>
                            <button className="btn-previous">
                                <img src={polygonLeftImg} alt="image" /> Previous
                            </button>
                        </li>
                        <li>
                            <div className="timer">69</div>
                        </li>
                        <li className="d-flex">
                            <button className="btn-next">
                                Next
                                <img src={polygonRightImg} alt="image" />
                            </button>
                            <button className="btn-skip">
                                Skip
                                <img src={skipImg} alt="image" />
                            </button>
                        </li>
                    </ul>
                </Container>
            </footer>
        </>
    )
}

export default Footer;