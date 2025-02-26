import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../components/AuthProvider";
import emailjs from '@emailjs/browser';


export default function AddBooking() {
    const [room, setRoom] = useState("");
    const [pax, setPax] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const url = import.meta.env.VITE_API_URL

    const auth = getAuth();
    const user = auth.currentUser;
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        if (!currentUser) {
            navigate("/home");
        }
    }, [currentUser, navigate]);

    const sendEmail = () => {
        // Sending email using EmailJS
        const emailParams = {
            to_email: email, // Data entered in the form
            user_name: name,
            room_name: room,
            pax: pax,
            date: date,
            time: time,
        };

        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            emailParams,
            import.meta.env.VITE_EMAILJS_USER_ID
        )
            .then((result) => {
                console.log("Email sent successfully:", result.text);
            })
            .catch((error) => {
                console.error("Error sending email:", error);
            });
    }



    const handleSubmit = () => {
        event.preventDefault();

        // Getting uid from Firebase
        const userId = user.uid;

        // Preparing data object to be sent
        const data = {
            room: room,
            pax: pax,
            date: date,
            time: time,
            name: name,
            phone: phone,
            email: email,
            uid: userId
        };

        console.log("Data to be sent:", data);

        // Making API call
        axios.post(`${url}/bookings`, data)
            .then((response) => {
                console.log("Success:", response.data)
                sendEmail();
                handleBack();
            })
            .catch((error) => {
                console.error("Error", error)
            })

    }

    const handleBack = () => {
        navigate("/bookings")
    }

    return (
        <Container>
            <Button variant="light" style={{ minWidth: "10%" }} onClick={handleBack}>Back</Button>
            <Container className="p-2" style={{ maxHeight: "100%" }}>
                <h1 className="text-center" style={{ color: "#F9F9F9" }}>Create Booking</h1>
                <Container className="my-5" style={{
                    maxWidth: "70%",
                    height: "100%",
                    padding: "40px",
                    borderRadius: "20px",
                    boxShadow: "0 0 6px 3px rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(7px)",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                }}>
                    <Form style={{ color: "#F9F9F9" }} onSubmit={handleSubmit}>
                        <Form.Group controlId="roomName" className="mb-3">
                            <Form.Label>Select a room</Form.Label>
                            <Form.Control
                                as="select"
                                value={room}
                                onChange={(e) => setRoom(e.target.value)}
                            >
                                <option value="" disabled hidden>Select a Room</option>
                                <option value="Lobster Game">Lobster Game</option>
                                <option value="The Forgotten Asylum">The Forgotten Asylum</option>
                                <option value="The Followers of the Evil One">The Followers of the Evil One</option>
                                <option value="The Abyssal Code">The Abyssal Code</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="pax" className="mb-3">
                            <Form.Label>Number of Players</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Maximum of 8"
                                value={pax}
                                onChange={(e) => setPax(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="date" className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="time" className="mb-3">
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="name" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="phone" className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="012-3456789"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="user@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="outline-light" className="mt-4" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </Container>
        </Container>
    )
} 