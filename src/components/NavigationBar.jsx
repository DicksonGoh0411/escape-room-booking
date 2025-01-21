import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Button, Image } from "react-bootstrap";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

export default function NavigationBar() {

    const auth = getAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, [auth]);

    const handleLogout = () => {
        auth.signOut();
    };

    const handleAuthAction = () => {
        if (isLoggedIn) {
            handleLogout();
        } else {
            navigate("/login");
        }
    };

    return (
        <Navbar style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', backdropFilter: "blur(10px)" }} variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <Image src="/assets/logo.png" style={{ width: "100px" }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                        <NavDropdown title="Bookings" id="nav-dropdown">
                            <NavDropdown.Item as={Link} to="/bookings">View Bookings</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/create">Book Now</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Button variant="outline-light" onClick={handleAuthAction}>
                        {isLoggedIn ? "Logout" : "Login"}
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
