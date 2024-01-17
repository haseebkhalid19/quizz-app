import "./Header.css";

const Header = () => {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li >
                            <a href="javascript:void(0)">Logo</a>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <a href="javascript:void(0)">How it works?</a>
                            <a href="javascript:void(0)">About us</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">Features</a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">About us</a>
                        </li>
                        <li>
                            <select>
                                <option>Tarun</option>
                            </select>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header;