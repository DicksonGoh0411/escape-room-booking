import { Row, Col, Button, Card } from 'react-bootstrap';

export default function BookingItem({ booking, onEdit, onDelete }) {
    return (

        <Card className="mb-4 p-1" style={{ boxShadow: "0 0 6px 3px rgba(255, 255, 255, 0.6)", backgroundColor: "rgba(0, 0, 0, 0.2)", color: "#F9F9F9", borderRadius: "10px", backdropFilter: "blur(13px)" }}>
            <Card.Body>
                <Card.Title>{booking.room}</Card.Title>
                <Card.Text>
                    <Row>
                        <Col>
                            <strong>Date:</strong> {booking.date}
                            <br />
                            <strong>Time:</strong> {booking.time}
                            <br />
                            <strong>Number of Players:</strong> {booking.pax}
                            <br />
                            <strong>Name:</strong> {booking.name}
                            <br />
                            <strong>Email:</strong> {booking.email}
                            <br />
                            <strong>Phone:</strong> {booking.phone}
                        </Col>
                        <Col sm={2}>
                            <Button
                                variant="light"
                                onClick={() => onEdit(booking.id)}
                                className='w-100 mb-2'

                            >
                                Edit
                            </Button>
                            <Button
                                variant="outline-light"
                                onClick={() => onDelete(booking.id)}
                                className='w-100 mb-2'
                            >
                                Delete
                            </Button>
                        </Col>
                    </Row>

                </Card.Text>

            </Card.Body>
        </Card>

    );
}