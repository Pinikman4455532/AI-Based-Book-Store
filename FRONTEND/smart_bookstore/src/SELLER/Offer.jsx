import React, { useEffect, useState } from "react";
import axios from "axios";

const OffersManager = () => {
    const [offers, setOffers] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        discountPercentage: "",
        validFrom: "",
        validTo: "",
        books: []
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const fetchOffers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/offers");
            setOffers(res.data);
        } catch (err) {
            console.error("Failed to fetch offers", err);
        }
    };

    const fetchBooks = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/books");
            setAllBooks(res.data); // ✅ now includes _id
        } catch (err) {
            console.error("Failed to fetch books", err);
        }
    };

    useEffect(() => {
        fetchOffers();
        fetchBooks();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleBookSelect = (e) => {
        const selectedBooks = Array.from(e.target.selectedOptions, opt => opt.value);
        setForm(prev => ({
            ...prev,
            books: selectedBooks
        }));
    };

    const handleAddOffer = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await axios.post("http://localhost:5000/api/offer", {
                title: form.title,
                description: form.description,
                discountPercentage: parseFloat(form.discountPercentage),
                validFrom: form.validFrom,
                validTo: form.validTo,
                isActive: true,
                books: form.books // ✅ now using _id array
            });

            setMessage(res.data.message);
            setForm({
                title: "",
                description: "",
                discountPercentage: "",
                validFrom: "",
                validTo: "",
                books: []
            });
            fetchOffers();
        } catch (err) {
            console.error("Failed to add offer", err);
            setMessage("Failed to add offer.");
        }

        setLoading(false);
    };

    const deleteOffer = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/offer/${id}`);
            fetchOffers();
        } catch (err) {
            console.error("Failed to delete offer", err);
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>📢 Manage Offers</h2>
            <form onSubmit={handleAddOffer} style={{ marginBottom: "2rem" }}>
                <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
                <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
                <input type="number" name="discountPercentage" placeholder="Discount (%)" value={form.discountPercentage} onChange={handleChange} required />
                <input type="date" name="validFrom" value={form.validFrom} onChange={handleChange} required />
                <input type="date" name="validTo" value={form.validTo} onChange={handleChange} required />

                <select multiple value={form.books} onChange={handleBookSelect}>
                    {allBooks.map(book => (
                        <option key={book._id} value={book._id}>
                            {book.title}
                        </option>
                    ))}
                </select>

                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Offer"}
                </button>
            </form>

            {message && <p>{message}</p>}

            <h3>Current Offers</h3>
            <ul>
                {offers.map((offer) => (
                    <li key={offer._id} style={{ marginBottom: "1rem" }}>
                        <strong>{offer.title}</strong> - {offer.discountPercentage}% off
                        <br />
                        Valid: {new Date(offer.validFrom).toLocaleDateString()} to {new Date(offer.validTo).toLocaleDateString()}
                        <br />
                        Books: {offer.books?.length ? offer.books.map(book => book["Book-Title"] || book.title).join(", ") : "No books attached"}
                        <br />
                        <button onClick={() => deleteOffer(offer._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OffersManager;
