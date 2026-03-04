import { useState } from "react";
import { GlobalStyle } from "./styles/GlobalStyle";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

export default function App() {
  const [editingContact, setEditingContact] = useState(null);

  return (
    <>
      <GlobalStyle />

      <div style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "600px",
        margin: "0 auto"
      }}>
        <h1>Agenda de Contatos</h1>


        <ContactForm
          editingContact={editingContact}
          onCancelEdit={() => setEditingContact(null)}
        />

        <ContactList onEdit={(contact) => setEditingContact(contact)} />
      </div>
    </>
  );
}