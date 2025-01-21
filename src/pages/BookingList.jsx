import { useState, useEffect, useContext } from "react";
import BookingItem from "../components/BookingItem";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Container, Modal, Button, Spinner } from "react-bootstrap";
import axios from "axios";

export default function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [bookingToDelete, setBookingToDelete] = useState(null);

    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is authenticated and redirect to login if not
        if (!currentUser) {
            navigate("/login");
        } else {
            // If user is authenticated, fetch bookings
            const userId = auth.currentUser.uid;
            fetchBookings(userId);
        }
    }, [currentUser, navigate]);

    const url = import.meta.env.VITE_API_URL;

    const fetchBookings = (userId) => {
        axios.get(`${url}/bookings/user/${userId}`)
            .then((response) => {
                setBookings(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setLoading(false);
            });
    };

    const handleDelete = (bookingId) => {
        setBookingToDelete(bookingId);
        setShowDeleteModal(true);  // Show the delete confirmation modal
    };

    const confirmDelete = () => {
        if (bookingToDelete) {
            axios.delete(`${url}/bookings/${bookingToDelete}`)
                .then(() => {
                    setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingToDelete));
                    console.log("Booking deleted successfully.");
                    setShowDeleteModal(false);
                })
                .catch((error) => console.error("Error deleting booking:", error));
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="border" variant="light" style={{ width: "100px", height: "100px" }} />
            </div>
        )

    }

    return (
        <Container className="my-2 p-3">
            <h1 className="text-center mb-5" style={{ color: "#F9F9F9" }}>Your Bookings</h1>
            {bookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} onDelete={handleDelete} onEdit={handleEdit} />
            ))}

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header className="bg-dark text-white">
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white">
                    Are you sure you want to delete this booking? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer className="bg-dark text-white">
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                    <Button variant="light" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
