import { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { supabase } from "../supabase/client";

const Register = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [errMsg, setErrMsg] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const register = (email, password) =>
        supabase.auth.signUp({ email, password });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordRef.current?.value || !emailRef.current?.value || !confirmPasswordRef.current?.value) {
            setErrMsg("Please fill out all fields!");
            return;
        }
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            setErrMsg("Passwords don't match!");
            return;
        }
        try {
            setErrMsg("");
            setLoading(true);
            const { data, error } = await register(
                emailRef.current.value,
                passwordRef.current.value
            );
            if (!error && data) {
                setMsg("Registration successful! Check your email to verify your account.");
            }
        } catch (error) {
            setErrMsg("Error creating account!");
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Register</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="confirm-password">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" ref={confirmPasswordRef} required />
                        </Form.Group>
                        {errMsg && (
                            <Alert
                                variant="danger"
                                onClose={() => setErrMsg("")}
                                dismissible
                            >
                                {errMsg}
                            </Alert>
                        )}
                        {msg && (
                            <Alert variant="success" onClose={() => setMsg("")} dismissible>
                                {msg}
                            </Alert>
                        )}
                        <div className="text-center mt-2">
                            <Button disabled={loading} type="submit" className="w-50">
                                Register
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
                <div className="w-100 text-center mt-2">
                    Already a user? <Link to={"/login"}>Login</Link>
                </div>
            </Card>
        </>
    );
};

export default Register;
