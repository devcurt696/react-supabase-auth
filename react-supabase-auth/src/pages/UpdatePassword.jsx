import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
    const { updatePassword } = useAuth()
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordRef.current?.value || !confirmPasswordRef.current?.value) {
            setErrMsg("Please fill out all fields!");
            return;
        }
        if (passwordRef.current.value !== confirmPasswordRef.current.value) {
            setErrMsg("Passwords don't match. Try again!");
            return;
        }
        try {
            setErrMsg("");
            setLoading(true);
            const { data, error } = await updatePassword(passwordRef.current.value);
            if (!error) {
                navigate("/");
            }
        } catch (error) {
            setErrMsg(`Error: ${error}`);
        }
        setLoading(false);
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Password</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="confirm-password">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" ref={confirmPasswordRef} required />
                        </Form.Group>
                        {errMsg && (
                            <Alert variant="danger" onClose={() => setErrMsg("")} dismissible>{errMsg}</Alert>
                        )}
                        <div className="text-center mt-2">
                            <Button disabled={loading} type="submit" className="w-50">
                                Update
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

export default UpdatePassword;