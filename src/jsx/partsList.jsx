import React from 'react';
import Firebase from 'firebase';

import {Table, Input} from 'react-bootstrap';

module.exports = React.createClass({
    parts: [],
    getInitialState: function(){
        return {
            parts: [],
        }
    },
    render: function(){
        return(
            <div>
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>ID</th>
                            <th>COTS?</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Parent</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.parts.map(function(part){
                            return (
                                <tr key={part.key}>
                                    <td>{part.name}</td>
                                    <td>{part.desc}</td>
                                    <td>{part.id}</td>
                                    <td>{part.cots?'Yes':'No'}</td>
                                    <td>{part.type}</td>
                                    <td>{part.qty}</td>
                                    <td>{part.parent||'None'}</td>
                                    <td>{part.status}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    },
    componentWillMount: function(){
        this.firebase = new Firebase('https://mvrt-engdoc.firebaseio.com/parts');
        this.loadParts();
    },
    loadParts: function(){
        console.log('do not filter parent');
        this.filter = this.firebase;
        this.filter.on('child_added', this.addPart);
    },
    addPart: function(snapshot){
        var data = snapshot.val();
        data.key = snapshot.key();
        this.parts.push(data);
        //SORTING HAPPENS HERE | sample sort:
        //this.parts.sort(function(a,b) {return (a.qty - b.qty); } );
        this.updateState();
    },
    updateState: function(){
        this.setState({parts:this.parts});
    }
});
