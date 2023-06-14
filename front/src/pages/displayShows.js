import React from 'react';
import { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import {TbHomeHand} from 'react-icons/tb';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {RiDeleteBackLine} from 'react-icons/ri';
import {RiVideoAddLine} from 'react-icons/ri';
import AddItems from '../components/addItems';




function DisplayShow() {

    const [aList, setAList] = useState([]);
    const [addToggle, setAddToggle] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const list_id = location.state.id;
    const listName = location.state.name;

    const getAList = () => {
        fetch(`http://localhost:3000/${list_id}`, {method:'GET'})
        .then(response => response.json())
        .then(data => JSON.stringify(data))
        .then(stringifiedData => JSON.parse(stringifiedData))
        .then(parsedData => {
            setAList(parsedData);
        })
        .catch(error =>console.log(error))
    };

    useEffect(() => {
        getAList();
    },[aList]);

    

    const handleClick = () => {
        navigate('/');
    };


    const deleteShow = _id => {
        const response = fetch(`/show/?list_id=${list_id}&show_id=${_id}`, {method: 'DELETE',
        headers: {'Content-Type': 'application/json'}});
        if (response.status === 204) {
            const newList = aList.filter( m => m._id !== _id);
            setAList(newList);
        } else {
            console.error(`Failed to delete list with id =${_id}, status code = ${response.status}`);
        }
    };


    const handleAdd = event => {
        setAddToggle(current => !current);
      }; 



 
    return (    
        <div>
        <Container>
        <Row>
            <RiVideoAddLine title="Add a show" size={25} onClick={handleAdd} style={{cursor:'pointer'}}/>
            {addToggle && <AddItems listId={list_id} listName={listName}/>}
        </Row>
        
        <Row>
        <Table striped hover>
        <thead>
            <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Streaming Service</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
                {aList.map(item => (
                <tr>
                     <td>{item.title}</td>
                     <td>{item.genre}</td>
                     <td>{item.streamingService}</td>
                    <td><RiDeleteBackLine title="Remove from the list" onClick={() => {deleteShow(item._id)}} style={{cursor:'pointer'}}/></td>
                 </tr>
                ))}
        </tbody>
        </Table>
        </Row>       
        <Row>
            <Col><TbHomeHand size={25}  onClick={handleClick} style={{cursor:'pointer'}}/></Col>
        </Row>
        </Container>
    </div>
    );}



export default DisplayShow;