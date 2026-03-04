import { createSlice, nanoid } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
    name: "contacts",
    initialState: {
        items: []
    },
    reducers: {
        addContact: {
            reducer(state, action) {
                state.items.push(action.payload);
            },
            prepare(contact) {
                return {
                    payload: {
                        id: nanoid(),
                        ...contact
                    }
                };
            }
        },

        removeContact(state, action) {
            state.items = state.items.filter(
                contact => contact.id !== action.payload
            );
        },

        updateContact(state, action) {
            const index = state.items.findIndex(
                contact => contact.id === action.payload.id
            );

            if (index !== -1) {
                state.items[index] = action.payload;
            }
        }
    }
});

export const { addContact, removeContact, updateContact } = contactsSlice.actions;

export default contactsSlice.reducer;