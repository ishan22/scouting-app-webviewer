import React from 'react';
import PartForm from 'partForm';
import {Button} from 'react-bootstrap';

module.exports = React.createClass({
    getInitialState: function() {
        return {
            data: {
                name: 'Name',
                desc: 'Desc',
                id: 'ID',
                qty: 'QTY',
                cots: true,
                type: 'assembly',
                status: 'Status',
                parent: ''
            },
            hasData: false,
            edit: false
        };
    },
    componentWillMount: function() {
        this.firebase = new Firebase('https://mvrt-engdoc.firebaseio.com/parts').child(this.props.part);
        this.firebase.on('value', function (snapshot) {
            var data = snapshot.val();
            this.setState({ data:data, hasData:true });

        }.bind(this));
    },
    render: function(){
        var edit;
        if(this.state.edit && this.state.hasData){
            edit = <PartForm
                uid={this.props.part}
                data={this.state.data}/>
        }
        return(
            <div id='part-view'>

                <h3>
                    {this.state.data.name}
                    <small>{this.state.data.id} | {this.state.data.desc}</small>
                </h3>

                <p>{this.state.data.cots?'COTS':'Custom'} {this.state.data.type}</p>
                <p>{this.props.part}</p>
                <p>QTY: {this.state.data.qty}</p>
                <p>Parent: {this.state.data.parent}</p>

                {edit}
            </div>
        );
    }
});
