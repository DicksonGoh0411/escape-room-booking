import { Container, Row, Col, Card } from "react-bootstrap";

export default function Homepage() {


    return (
        <Container style={{ maxWidth: "70%" }}>
            <div className="mb-4" style={{ textAlign: "center" }}>
                <img src="./src/assets/logo.png" className="mb-2" style={{ maxWidth: "30%" }} />
                <h1 style={{ color: "#F9F9F9", fontSize: "44px" }}>Think Fast, Escape Faster</h1>
            </div>

            <Row className="mb-3 justify-content-center">
                <Col xs={12} md={6}>
                    <Card className="mb-3" style={{ boxShadow: "0 0 6px 3px rgba(255, 255, 255, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.2)", backdropFilter: "blur(7px)", color: "#F9F9F9", width: "100%" }}>
                        <Card.Img variant="top" src="./src/assets/LobsterGame.jpg" />
                        <Card.Body className="d-flex flex-column">
                            <Card.Title as="h4">Lobster Game</Card.Title>
                            <Card.Subtitle className="mb-2"><i>Theme: Survival</i></Card.Subtitle>
                            <Card.Text >
                                You find youself waking up in a room where childhood nostalgia takes on a twisted, nightmarish form. The once-familiar playground has been transformed into an obstacle course, oversized board games with a deadly edge, puzzles that force you to make tough decisions.
                                With a ticking clock and escalating stakes, you&apos;ll need to decipher cryptic clues, navigate physical challenges, and outsmart the mysterious Game Master to survive. The only way out is to beat the game before it beats you.
                            </Card.Text>
                            <p>Difficulty: 🧠🧠🧠🧠</p>
                            <p>Physical: 💪💪💪</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6}>
                    <Card className="mb-3" style={{ boxShadow: "0 0 6px 3px rgba(255, 255, 255, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.2)", backdropFilter: "blur(7px)", color: "#F9F9F9", width: "100%" }}>                        <Card.Img variant="top" src="./src/assets/TheForgottenAsylum.jpg" />
                        <Card.Body>
                            <Card.Title as="h4">The Forgotten Asylum</Card.Title>
                            <Card.Subtitle className="mb-2"><i>Theme: Haunted Mental Institution</i></Card.Subtitle>
                            <Card.Text>
                                Step inside the crumbling remains of an abandoned asylum, a place long forgotten by the outside world. Within its decaying walls lies a dark and horrifying past, filled with whispers of unethical experiments and unspeakable horrors. As you navigate the eerie hallways, uncover hidden clues and solve chilling puzzles to piece together the truth. But beware—the spirits of those who perished here may not let you escape so easily. Can you break free from the asylum&apos;s grip before it&apos;s too late?                            </Card.Text>
                            <p>Difficulty: 🧠🧠🧠🧠🧠</p>
                            <p>Physical: 💪💪💪💪💪</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6}>
                    <Card className="mb-3" style={{ boxShadow: "0 0 6px 3px rgba(255, 255, 255, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.2)", backdropFilter: "blur(7px)", color: "#F9F9F9", width: "100%" }}>                        <Card.Img variant="top" src="./src/assets/TheFollowersoftheEvilOne.jpg" />
                        <Card.Body>
                            <Card.Title as="h4">The Followers of the Evil One</Card.Title>
                            <Card.Subtitle className="mb-2"><i>Theme: Cult and Supernatural Horror</i></Card.Subtitle>
                            <Card.Text>
                                In an old, decrepit church, a dark and malevolent cult has risen, worshiping a sinister force known only as the Evil One. You find yourself trapped in the heart of their twisted rituals, surrounded by ominous symbols, eerie chanting, and a growing sense of dread. To survive, you must unravel the cult’s dark secrets, decipher their cryptic rituals, and escape their clutches before they complete their sinister plan. Time is running out, and the shadows grow ever darker.
                            </Card.Text>
                            <p>Difficulty: 🧠🧠🧠🧠🧠</p>
                            <p>Physical: 💪💪💪💪</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6}>
                    <Card className="mb-3" style={{ boxShadow: "0 0 6px 3px rgba(255, 255, 255, 0.8)", backgroundColor: "rgba(0, 0, 0, 0.2)", backdropFilter: "blur(7px)", color: "#F9F9F9", width: "100%" }}>                        <Card.Img variant="top" src="./src/assets/TheAbyssalCode.jpg" />
                        <Card.Body>
                            <Card.Title as="h4">The Abyssal Code</Card.Title>
                            <Card.Subtitle className="mb-2"><i>Theme: Underwater Adventure and Intrigue</i></Card.Subtitle>
                            <Card.Text>
                                Trapped aboard a sinking research vessel deep beneath the ocean&apos;s surface, you and your team face a race against time. The ship is failing, the oxygen is running low, and strange, cryptic messages hint at a mystery that goes beyond simple mechanical failure. As you repair vital systems and solve underwater puzzles, you’ll uncover a dark secret hidden in the depths. But the ocean holds more than just answers—something is watching, and the deeper you go, the closer it gets.
                            </Card.Text>
                            <p>Difficulty: 🧠🧠🧠</p>
                            <p>Physical: 💪💪💪💪💪</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}


