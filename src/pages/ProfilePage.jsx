import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import { getAuth } from "firebase/auth";
import { Container, Col, Row, Button, Card } from "react-bootstrap";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material"

export default function ProfilePage() {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);  // State for upload progress
    const [imageUrl, setImageUrl] = useState("");
    const auth = getAuth();
    const storage = getStorage();
    const db = getFirestore();

    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    const userId = auth.currentUser?.uid;

    // Fetch the user's profile picture from Firestore on component mount
    useEffect(() => {
        const fetchProfilePicture = async () => {
            if (userId) {
                const userDocRef = doc(db, "users", userId);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    setImageUrl(userDoc.data().profilePicture);
                }
            }
        };

        fetchProfilePicture();
    }, [userId, db]);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            handleUpload(e.target.files[0]); // Trigger upload immediately after file selection
        }
    };

    const handleUpload = async (file) => {
        if (!file) return alert("Please select an image first.");
        setUploading(true);

        try {
            const storageRef = ref(storage, `profilePictures/${userId}`);
            // Upload file to Firebase Storage
            await uploadBytes(storageRef, file);

            // Get the download URL
            const url = await getDownloadURL(storageRef);
            setImageUrl(url);

            // Save the URL to Firestore
            const userDocRef = doc(db, "users", userId);
            await setDoc(userDocRef, { profilePicture: url }, { merge: true });

        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <Container className="text-center">
            <h1 className="m-4" style={{ color: "#f9f9f9" }}>User Profile</h1>
            <Row className="mb-3 justify-content-center">
                <Col xs={12} md={4}>
                    <Card className="align-items-center" style={{ boxShadow: "0 0 6px 3px rgba(255, 255, 255, 0.8)", color: "#F9F9F9", backgroundColor: "rgba(0, 0, 0, 0.2)", backdropFilter: "blur(7px)" }}>
                        <Card.Body>
                            <Avatar
                                alt="User Avatar"
                                src={imageUrl || ""}
                                style={{ width: 150, height: 150, marginBottom: "10px", bgcolor: "gray" }}
                            >

                                {!imageUrl && "User"}
                            </Avatar>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                id="fileInput"
                                style={{ display: "none" }}
                            />
                            <p>
                                Upload Image:
                            </p>
                            <Button
                                variant="light"
                                onClick={() => document.getElementById("fileInput").click()}
                                disabled={uploading}
                                style={{ marginTop: "5px" }}
                            >
                                {uploading ? "Uploading..." : "Choose File"}
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
