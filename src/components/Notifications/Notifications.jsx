import { useState, useEffect } from "react";
import './Notifications.css'; // Stijlen voor de melding

function Notification({ type, message, onClose }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, 3000); // Sluit de melding na 3 seconden

        return () => clearTimeout(timeout);
    }, [onClose]);

    const notificationClassName = `notification ${type || ""}`;

    return isVisible ? (
        <div className={notificationClassName}>
            <p>{message}</p>
        </div>
    ) : null;
}

export default Notification;
