import { useState, useEffect, useRef} from "react";
import authorImg from "../img/author.jpg";
import githubSvg from "../img/github.svg";
import mailSvg from "../img/mail.svg";

function Nav() {
    const [popOpen, setPopOpen] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setPopOpen(false);
            }
        }
        document.addEventListener("pointerdown", handleClickOutside);
        return () => document.removeEventListener("pointerdown", handleClickOutside);
    }, []);

    return (
        <div className="nav" ref={navRef}>
            <a
                href="https://github.com/ignamosconi/order-game"
                target="_blank"
                className="navLink"
                draggable="false"
            >
                <img src={githubSvg} className="navIcon" alt="GitHub" draggable="false" />
            </a>

            <div className="aboutWrapper">
                <button
                    className={`aboutBtn ${popOpen ? "aboutBtnActive" : ""}`}
                    onClick={() => setPopOpen(p => !p)}
                >
                    About
                </button>

                {popOpen && (
                    <div className="popup">
                        <div className="popupAuthor">
                            <img src={authorImg} alt="Igna" className="popupPhoto" />
                            <span>Igna :)</span>
                        </div>
                        <p className="popupDesc">
                            I don't remember any code I wrote, even though it made me.
                        </p>
                        <div className="popupSocial">
                            <a href="https://github.com/ignamosconi" target="_blank" draggable="false">
                                <img src={githubSvg} className="navIcon" alt="GitHub" draggable="false" />
                            </a>
                            <a href="mailto:ignamosconi@gmail.com" draggable="false">
                                <img src={mailSvg} className="navIcon" alt="Mail" draggable="false" />
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Nav;