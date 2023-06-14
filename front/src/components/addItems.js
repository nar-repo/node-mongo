import React from 'react';
import { useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import {TbHomeHand} from 'react-icons/tb';
import Row from 'react-bootstrap/Row';





function AddItems({listId, listName}) {

    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [streamingService, setStreamingService] = useState('');

    const navigate = useNavigate();

    //const location = useLocation();
    //const listId = location.state.id;


    const addShow = () => {
        const newShow = {title: title, genre:genre, streamingService: streamingService}
        fetch (`/${listId}`,
        {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(newShow)
        });
        navigate('/');
    };



 
    return (    
        <div>
        <Container>
            <Row>
                <h4>Add a show to the watchlist {listName}</h4>
            </Row>
            <Row>
            <form>
                <input type ='text' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)}/>
                <input type='text' placeholder='Genre' value={genre} onChange={e => setGenre(e.target.value)} />
                <input type='text' placeholder='Streaming Service' value={streamingService} onChange={e => setStreamingService(e.target.value)}/>
                <button onClick={addShow}>Add</button>
            </form>
            </Row> 
        </Container>
    </div>
    );}


export default AddItems;