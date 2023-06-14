import {useState} from 'react';
import Loadlist from '../components/allList.js';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import {FaRegHandPointDown} from 'react-icons/fa';





function Signup() {

    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [list_name, setListname] = useState('');
    
    

    const addList = async () => {
        const newList = {firstName, lastName, list_name};

        await fetch ('/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newList)
        });
    };


    const redirectWithFormSubmit = event => {
        event.preventDefault();
        window.location.reload(false);
      };



     
    return (
        <div>
        <Container>
            <Row>
                <h3>Create a watchlist <FaRegHandPointDown/></h3>
            </Row>
            <Row>
            <form onSubmit={redirectWithFormSubmit}>
                <input type ='text' placeholder='first name' value={firstName} onChange={e => setFirstname(e.target.value)}/>
                <input type='text' placeholder='last name' value={lastName} onChange={e => setLastname(e.target.value)} />
                <input type='text' placeholder='name of your list' value={list_name} onChange={e => setListname(e.target.value)}/>
                <button onClick={addList}>Submit</button>
            </form>
            </Row>
            <Row>
              <Loadlist/>
            </Row>
        </Container>
        </div>
        
    );
}


export default Signup





