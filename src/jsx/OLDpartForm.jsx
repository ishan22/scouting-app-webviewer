import React from 'react';
import { Button, Table, Input, ButtonInput } from 'react-bootstrap';
import { History } from 'react-router';

module.exports = React.createClass({
    mixins: [History],
    getInitialState() {
        return {
            defaults: {
                cots: true  ,
                desc: '',
                id: '',
                name: '',
                qty: 0,
                type: 'assembly',
                parent: '',
                status: ''
            },
            edit: false,
            valid: false
        };
    },
    componentWillMount: function(){
        console.log('willMount');
        this.firebase = new Firebase('https://mvrt-engdoc.firebaseio.com');
        this.checkEdit();
    },
    render: function(){
        console.log('render');
        console.log(this.state);
        return(
            <div id='part-create'>
                <h1>
                    {this.state.edit?'Edit':'New'} Part
                </h1>

                <form ref='form' onSubmit={this.handleSubmit} >

                    <Input
                        type='text'
                        label='Name'
                        defaultValue={this.state.defaults.name}
                        placeholder='Part or Assembly Name'
                        onChange={this.onUpdate}
                        ref='name'/>

                    <Input
                        type='text'
                        label='Description'
                        defaultValue={this.state.defaults.desc}
                        placeholder='Describe your Part or Assembly'
                        onChange={this.onUpdate}
                        ref='desc'/>

                    <Input
                        type='text'
                        label='ID'
                        defaultValue={this.state.defaults.id}
                        placeholder='ID (ie ABC-123)'
                        onChange={this.onUpdate}
                        ref='id'/>

                    <Input
                        type='number'
                        label='Quantity'
                        defaultValue={this.state.defaults.qty}
                        placeholder='Quantity (ie. 12)'
                        onChange={this.onUpdate}
                        ref='qty'/>

                    <Input
                        type='select'
                        label='Item Type'
                        defaultValue={this.state.defaults.type}
                        placeholder='assembly'
                        onChange={this.onUpdate}
                        ref='itemType'>

                        <option value='assembly'>Assembly</option>

                        <option value='part'>Part</option>

                    </Input>

                    <Input
                        type='checkbox'
                        label='COTS'
                        defaultChecked={this.state.defaults.cots}
                        onChange={this.onUpdate}
                        ref='cots'/>

                    <Input
                        type='text'
                        label='Parent'
                        defaultValue={this.state.defaults.parent}
                        onChange={this.onUpdate}
                        ref='parent'/>

                    <Input
                        type='text'
                        label='Status'
                        defaultValue={this.state.defaults.status}
                        onChange={this.onUpdate}
                        ref='status'/>

                    <ButtonInput type='reset' value='Reset' />

                    <ButtonInput
                        type='submit'
                        value='Submit'
                        disabled={ !this.state.valid }
                        bsSize='large' />

                </form>

            </div>
        );
    },
    onUpdate: function(){
        this.setState({valid: this.validate(this.getData())});
    },
    getData: function(){
        var data = {};
        data.name = this.refs.name.getValue();
        data.desc = this.refs.desc.getValue();
        data.id = this.refs.id.getValue();
        data.qty = parseInt(this.refs.qty.getValue());
        data.type = this.refs.itemType.getValue();
        data.cots = this.refs.cots.getChecked();
        data.parent = this.refs.parent.getValue();
        data.status = this.refs.status.getValue();
        console.log('data: ' + JSON.stringify(data));
        return data;
    },
    validate: function(data){
        var valid = (!!data && !!data.name && !!data.desc && !!data.id
            && !!data.type && !!data.status && (data.type === 'assembly' || data.type === 'part')
            && typeof data.cots === 'boolean' && typeof data.qty === 'number' && (data.qty >= 0));
            return valid;
        },
        handleSubmit: function(e){
            e.preventDefault();
            var data = this.getData();
            if(this.props.uid){
                this.firebase.child('parts').child(this.props.uid).set(data);
                this.history.pushState(null, '/');
            }
            else{
                this.firebase.child('parts').push(data);
                this.history.pushState(null, '/');
            }
        },

        checkEdit: function(){
            if(this.props.data && this.props.uid){
                var data = this.props.data;
                this.setState({ defaults:data, edit:true, valid: this.validate(data) });
            }
        }
    });
