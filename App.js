import React from 'react';

import ListaKontakata from './ListaKontakata';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            contacts: [ ],
            filter: '',
            match: false
        }
    }

    filterContacts = e => {
        this.setState({filter: e.target.value});
    }

    addContactHandler = (e)=> {
        e.preventDefault();
        const number = (document.querySelector('#number').value).trim();
        const name = (document.querySelector('#name').value).trim();

        if(number == '' || name == ''){
            document.querySelector('#msg').innerHTML = 'Ne moze prazan unos!';
            return;
        }

        if(number[0] != '+'){
            document.querySelector('#msg').innerHTML = 'Broj mora da pocne znakom +';
            return;
        }
        document.querySelector('#msg').innerHTML = '';
        
        let match = false;
        this.state.contacts.forEach(contact => {
            if(contact.name == name){
                match = true;
                this.setState({match:true});
            }
        });



   if(!match){
            let contacts = this.state.contacts;
            contacts.push({name:name, phone:number});
            this.setState({
                contacts:contacts,
                match:false
            });
        }
    }

    edit = e => {
        e.preventDefault();
        switch(e.target.innerHTML){
            case 'Yes':
                console.log('yes');
                const number = (document.querySelector('#number').value).trim();
                const name = (document.querySelector('#name').value).trim();

                let contacts = this.state.contacts;
                for(let i = 0; i < contacts.length; i++){
                    if(contacts[i].name == name){
                        contacts[i] = {
                            name: name,
                            phone: number
                        }
                        break;
                    }
                }
                this.setState({
                    contacts: contacts,
                    match:false
                });



// -------------------------------------------------------------------------------------------------
                document.querySelector('#number').value = '';
                document.querySelector('#name').value = '';
                break;
            case 'No':
                console.log('no');
                this.setState({match:false});
                document.querySelector('#number').value = '';
                document.querySelector('#name').value = '';
                break;
        }
    }

    render(){
        let contacts = [];
        this.state.contacts.forEach(contact => {
            if(contact.name.toLocaleLowerCase().includes(this.state.filter.toLocaleLowerCase())){
                contacts.push(contact);}
        });

        return(
            <div className="app">
          
                <form>
                    <input type="text" id="name" placeholder="Ime i Prezime" />
                    <input type="text" id="number" placeholder="Broj telefona" />
                    <button onClick={this.addContactHandler}>Dodaj</button>
                    <p id="msg"></p>
                   
                </form>
               
                <input type="text" placeholder="Trazi" value={this.state.filter} onChange={this.filterContacts} />
                <ListaKontakata contacts={contacts} />
            </div>
        )
    }
}

export default App;