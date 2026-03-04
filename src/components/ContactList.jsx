import { useDispatch, useSelector } from "react-redux";
import { removeContact } from "../features/contacts/contactsSlice";

export default function ContactList({ onEdit }) {
    const contacts = useSelector((state) => state.contacts.items);
    const dispatch = useDispatch();

    return (
        <div style={{
            marginTop: "30px",
            width: "600px",
            maxWidth: "90%",
        }}>
            {contacts.map((contact) => (
                <div
                    key={contact.id}
                    style={{
                        background: "#1e293b",
                        padding: "16px",
                        borderRadius: "8px",
                        marginBottom: "16px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        color: "#fff",
                        width: "100%",
                    }}
                >
                    <div>
                        <strong>{contact.name}</strong>
                        <div>{contact.email}</div>
                        <div>{contact.phone}</div>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <button
                            onClick={() => onEdit(contact)}
                            style={{
                                background: "#f59e0b",
                                border: "none",
                                padding: "8px 12px",
                                borderRadius: "4px",
                                color: "#fff",
                                cursor: "pointer"
                            }}
                        >
                            Editar
                        </button>

                        <button
                            onClick={() => dispatch(removeContact(contact.id))}
                            style={{
                                background: "#ef4444",
                                border: "none",
                                padding: "8px 12px",
                                borderRadius: "4px",
                                color: "#fff",
                                cursor: "pointer"
                            }}
                        >
                            Remover
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}