import { Button, Modal, Form, Container } from "react-bootstrap";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("SignUp");
    const handleShowLogin = () => setModalShow("Login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        if (currentUser) navigate("/home")
    }, [currentUser, navigate])

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(
                auth, username, password
            )
            console.log(res.user);
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(
                auth, username, password
            )
        } catch (error) {
            console.error(error)
        }
    }

    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error(error);
        }
    }

    const handleClose = () => setModalShow(null);

    return (
        <Container className="d-flex flex-column justify-content-center" style={{ height: "100vh", maxWidth: "100%" }}>
            <Container className="p-3" style={{ border: "solid white", borderRadius: "20px", backdropFilter: "blur(15px)" }}>
                <div className="m-2 text-center" style={{ color: "white" }}>
                    <h1 className="mt-5 fs-1 fs-md-2 mb-5" style={{ fontSize: "64px" }}>Welcome to E.S.C</h1>
                </div>

                <div className="d-flex flex-column align-items-center p-3" style={{ color: "white" }}>
                    <Button className="rounded-pill mb-3 w-50" variant="light" onClick={handleGoogleLogin}>
                        <i className="bi bi-google"></i> Sign in with Google
                    </Button>
                    <p style={{ textAlign: "center" }}>or</p>
                    <Button className="rounded-pill mb-3 w-50" variant="light" onClick={handleShowSignUp}>
                        <i className="bi bi-person-add"></i> Create an account
                    </Button>
                    <p className="mt-5" style={{ fontSize: "12px" }}>
                        By signing up, you agree to the Terms of Service and Privacy Policy including Cookie Use
                    </p>

                    <p className="mt-5" style={{ fontWeight: "bold" }}>Already have an account?</p>
                    <Button className="rounded-pill mb-3 w-50" variant="outline-light" onClick={handleShowLogin}>
                        <i className="bi bi-door-open"></i> Sign In
                    </Button>
                </div>

                <Modal show={modalShow !== null} onHide={handleClose} animation={false} centered>
                    <Modal.Body>
                        <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                            {modalShow === 'SignUp' ? "Create your account" : "Login to your account"}
                        </h2>
                        <Form className="d-grid gap-2 px-5" onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter your email" onChange={(e) => setUsername(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <p style={{ fontSize: "12px" }}>
                                By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
                            </p>
                            <Button className="rounded-pill" variant="dark" type="submit">
                                {modalShow === "SignUp" ? "Sign Up" : "Login"}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>

            </Container >
        </Container>
    )


}