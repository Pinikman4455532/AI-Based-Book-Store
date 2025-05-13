import React, { useState } from "react";
import axios from "axios";

const SwapRequestForm = () => {
    const [bookTitle, setBookTitle] = useState("");
    const [requesterEmail, setRequesterEmail] = useState("");
    const [responderEmail, setResponderEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/swap", {
                bookTitle,
                requesterEmail,
                responderEmail
            });
            setMessage("Swap request created successfully.");
            setBookTitle("");
        } catch (err) {
            console.error(err);
            setMessage("Error creating swap request.");
        }
    };

    return (
        <div className="p-4 max-w-md">
            <h2 className="text-xl font-bold mb-2">Create a Swap Request</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="border p-2 w-full mb-2"
                    placeholder="Book Title"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    required
                />
                <input
                    className="border p-2 w-full mb-2"
                    placeholder="Your Email"
                    value={requesterEmail}
                    onChange={(e) => setRequesterEmail(e.target.value)}
                    required
                />
                <input
                    className="border p-2 w-full mb-2"
                    placeholder="Recipient Email"
                    value={responderEmail}
                    onChange={(e) => setResponderEmail(e.target.value)}
                    required
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Submit Swap Request
                </button>
            </form>
            {message && <p className="mt-2 text-sm">{message}</p>}
        </div>
    );
};

export default SwapRequestForm;
