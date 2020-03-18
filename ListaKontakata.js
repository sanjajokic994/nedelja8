import React from 'react';

import Kontakt from './Kontakt'

const ListaKontakata = props => {
    let contacts = props.contacts.map(contact => {
        return (
            <Kontakt key={contact.name} name={contact.name} phone={contact.phone} />
        )
    });
    return (
        <div className="contact-list">
            {contacts}
        </div>
    )
}

export default ListaKontakata;