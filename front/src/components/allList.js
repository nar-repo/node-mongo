import React from 'react';
import { useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Rows from './eachRow.js';
import Table from 'react-bootstrap/Table';





function AllList() {

    const [allList, setAllList] = useState([]);

    const navigate = useNavigate();


    const getAllLists = () => {
        fetch('http://localhost:3000/', {method:'GET'})
        .then(response => response.json())
        .then(data => JSON.stringify(data))
        .then(stringifiedData => JSON.parse(stringifiedData))
        .then(parsedData => {
            setAllList(parsedData);
        })
        .catch(error =>console.log(error))
        };


    useEffect(() => {
        getAllLists();
    }, []);
        
    

    /*const removeList = _id => {
        const response = fetch(`/${_id}`, {method: 'DELETE',
        headers: {'Content-Type': 'application/json'}});
        if (response.status === 204) {
            const newList = allList.filter( m => m._id !== _id);
            setAllList(newList);
           
        } else {
            console.error(`Failed to delete list with id =${_id}, status code = ${response.status}`);
        }
    };*/

    const handleDisplay = (_id, list_name) => {
        navigate('/displayShows',
        {state:{id:_id, name: list_name }});
    };



    return (    
        <Table striped hover>
        <thead>
        <tr>
        <th>user's first name</th>
        <th>User's last name</th>
        <th>WatchList </th>
        </tr>
        </thead>
        <tbody> 
                {allList.map((item) => <Rows item={item} display={handleDisplay}/>)}
        </tbody>
    </Table>
    );
    
}


export default AllList;