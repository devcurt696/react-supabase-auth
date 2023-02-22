import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setErrMsg("");
            setLoading(true);
            if (!passwordRef.current?.value || !emailRef.current?.value) {
                setErrMsg("Please fill out all fields!");
                return;
            }
            const {
                data: { user, session },
                error
            } = await login(emailRef.current.value, passwordRef.current.value);
            if (error) setErrMsg(error.message);
            if (user && session) navigate("/");
        } catch (error) {
            setErrMsg("Email or passwor incorrect");
        }
        setLoading(false)
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        {errMsg && (
                            <Alert
                                variant="danger"
                                onClose={() => setErrMsg("")}
                                dismissable
                            >
                                {errMsg}
                            </Alert>
                        )}
                        <div className="text-center mt-2">
                            <Button disabled={loading} type="submit" className="w-50">
                                Login
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
                <div className="w-100 text-center mt-2">
                    New user? <Link to={"/register"}>Register</Link>
                </div>
                <div className="w-100 text-center mt-2">
                    Forgot password <Link to={"/passwordreset"}>Click Here</Link>
                </div>
            </Card>
        </>
    );
};

export default Login;