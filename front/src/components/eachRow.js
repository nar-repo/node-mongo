import React from 'react';





function Rows({item, display}) {


    return (    
        <tr onClick={() => {display(item._id, item.list_name)}} style={{cursor:'pointer'}}>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.list_name}</td>
        </tr>

    ) ;  
    
}  

export default Rows;