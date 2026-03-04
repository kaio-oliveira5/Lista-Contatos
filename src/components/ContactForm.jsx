/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addContact, updateContact } from "../features/contacts/contactsSlice";

const Card = styled.div`
    background: #121725;
    border: 1px solid #1c2440;
    border-radius: 14px;
    padding: 16px;
    max-width: 650px;
    margin-bottom: 30px;
    
`;

const Title = styled.h2`
    margin: 0 0 12px;
    font-size: 18px;
    color: #e9eef7;
`;

const Form = styled.form`
    display: grid;
    gap: 20px;
`;

const Input = styled.input`
    padding: 12px 16px;
    border-radius: 10px;
    border: 1px solid #2a355e;
    background: #0f1424;
    color: #e9eef7;
    outline: none;

    &:focus {
    border-color: #4b6bff;
}
`;

const Actions = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

const Button = styled.button`
    padding: 12px 16px;
    margin-left: 10px;
    border: 0;
    border-radius: 10px;
    cursor: pointer;
    color: #0b0d12;
    background: #4b6bff;

    &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
`;

const CancelButton = styled.button`
    padding: 10px 12px;
    border-radius: 10px;
    cursor: pointer;
    border: 1px solid #2a355e;
    background: transparent;
    color: #e9eef7;
`;

const ErrorText = styled.p`
    margin: 0;
    color: #ff8aa0;
    font-size: 14px;
`;

export default function ContactForm({ editingContact, onCancelEdit }) {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [error, setError] = useState("");

    // Quando clicar em "Editar" na lista, preenche os campos
    useEffect(() => {
        if (editingContact) {
            setName(editingContact.name || "");
            setEmail(editingContact.email || "");
            setPhone(editingContact.phone || "");
            setError("");
        }
    }, [editingContact]);

    // validações no React
    const nameValido = name.trim().length >= 3;
    const emailValido = /^\S+@\S+\.\S+$/.test(email.trim());
    const phoneValido = phone.trim().length >= 8;

    const formValido = nameValido && emailValido && phoneValido;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!nameValido) return setError("Nome deve ter pelo menos 3 caracteres.");
        if (!emailValido) return setError("Digite um e-mail válido (ex: nome@dominio.com).");
        if (!phoneValido) return setError("Telefone deve ter pelo menos 8 números.");

        if (editingContact) {
            dispatch(
                updateContact({
                    id: editingContact.id,
                    name: name.trim(),
                    email: email.trim(),
                    phone: phone.trim(),
                })
            );
            onCancelEdit();
        } else {
            dispatch(
                addContact({
                    name: name.trim(),
                    email: email.trim(),
                    phone: phone.trim(),
                })
            );
        }

        setName("");
        setEmail("");
        setPhone("");
    };

    const handleCancel = () => {
        setName("");
        setEmail("");
        setPhone("");
        setError("");
        onCancelEdit();
    };

    return (
        <Card>
            <Title>{editingContact ? "Editar contato" : "Adicionar contato"}</Title>

            <Form onSubmit={handleSubmit} noValidate>
                <Input
                    placeholder="Nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <Input
                    placeholder="Email (ex: nome@dominio.com)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    type="tel"
                    placeholder="Telefone (somente números)"
                    value={phone}
                    inputMode="numeric"
                    onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))
                    }
                />

                <Actions>
                    <Button type="submit" disabled={!formValido}>
                        {editingContact ? "Salvar" : "Adicionar contato"}
                    </Button>

                    {editingContact && (
                        <CancelButton type="button" onClick={handleCancel}>
                            Cancelar
                        </CancelButton>
                    )}
                </Actions>

                {error && <ErrorText>{error}</ErrorText>}
            </Form>
        </Card>
    );
}