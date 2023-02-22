import { Button, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const NavBar = () => {
    const { auth, signOut } = useAuth();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const { error } = await signOut();
            console.log(error);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>CC Tech</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    {!auth && (
                        <Nav.Link as={Link} to="/login">
                            Login
                        </Nav.Link>
                    )}
                    {!auth && (
                        <Nav.Link as={Link} to="/register">
                            Register
                        </Nav.Link>
                    )}
                    {auth && (
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                    )}
                    {auth && (
                        <Nav.Link as={Link} to="/">
                            Account
                        </Nav.Link>
                    )}
                </Nav>
                <Nav>
                    {auth && (
                        <Nav.Link as={Button} onClick={handleLogout}>
                            Logout
                        </Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;