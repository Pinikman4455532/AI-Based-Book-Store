import React from "react";
import axios from "axios";

const SwapActionPanel = ({ swap, refreshSwaps, userEmail }) => {
    const updateStatus = async (newStatus) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/swap/${swap.bookTitle}`, {
                status: newStatus,
                userEmail: userEmail // Auth: only responder can take action
            });

            console.log("Swap updated:", response.data);
            refreshSwaps(); // Refresh the swap list in parent component
        } catch (error) {
            console.error("Error updating swap status:", error);
            alert(error?.response?.data?.message || "You are not authorized to update this swap.");
        }
    };

    return (
        <div className="mt-3 border-t pt-2">
            <p className="text-sm text-gray-600 mb-1">Respond to this swap request:</p>
            <button
                onClick={() => updateStatus("accepted")}
                className="bg-green-600 text-white px-3 py-1 mr-2 rounded hover:bg-green-700"
            >
                Accept
            </button>
            <button
                onClick={() => updateStatus("declined")}
                className="bg-red-600 text-white px-3 py-1 mr-2 rounded hover:bg-red-700"
            >
                Decline
            </button>
            <button
                onClick={() => updateStatus("cancelled")}
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
                Cancel
            </button>
        </div>
    );
};

export default SwapActionPanel;
