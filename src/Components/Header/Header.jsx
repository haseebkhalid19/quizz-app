import "./Header.css";
import Logo from "../../images/QuizGrad.svg"
import { Container } from "react-bootstrap";

const Header = () => {
    return (
        <>
            <header>
                <Container className="py-4">
                    <figure className="d-flex align-items-center justify-content-center">
                        <img src={Logo} alt="logo" width={200} />
                    </figure>
                    <hr />
                </Container>
            </header>
        </>
    )
}

export default Header;