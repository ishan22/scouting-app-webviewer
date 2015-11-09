var React = require('react');
var ReactUpdate = require('react-addons-update');
import {Table} from 'react-bootstrap';

var PartListItem = React.createClass({
    getInitialState: function() {
        return {
            data: {
                name: 'Name',
                desc: 'Desc',
                id: 'ID',
                qty: 'QTY',
                cots: true,
                type: 'assembly',
                status: 'Status'
            }
        };
    },
    componentWillMount: function() {
        //console.log(this.props);
        this.firebase = new Firebase('https://mvrt-engdoc.firebaseio.com/parts').child(this.props.uid);
        this.firebase.on('value', function (snapshot) {
            var data = snapshot.val();
            this.setState({ data:data });
        }.bind(this));
    },
    render: function() {
        return (
            <tr>

                <td>
                    {this.state.data.name}
                </td>

                <td>
                    {this.state.data.desc}
                </td>

                <td>
                    {this.state.data.id}
                </td>

                <td>
                    {this.state.data.qty}
                </td>

                <td>
                    {this.state.data.cots?'yes':'no'}
                </td>

                <td>
                    {this.state.data.type}
                </td>

                <td>
                    {this.state.data.parent || 'None' }
                </td>

                <td>
                    {this.state.data.status}
                </td>

            </tr>
        );
    }
});

var PartListHeader = React.createClass({
    render: function() {
        return(
            <thead>

                <tr>

                    <th>Name</th>

                    <th>Description</th>

                    <th>ID</th>

                    <th>Quantity</th>

                    <th>COTS?</th>

                    <th>Type</th>

                    <th>Parent</th>

                    <th>Status</th>

                </tr>

            </thead>
        );
    }
});

var PartList = React.createClass({
    getInitialState: function() {
        return {parts: []};
},
    componentDidMount: function() {
        this.parts = [];
        this.firebase = new Firebase('https://mvrt-engdoc.firebaseio.com');
        this.firebase.child('parts').on('child_added', function (snapshot) {
            //var parts = this.state.parts.slice();
            var uid = snapshot.key();
            this.parts.push(uid);
            this.updateState();
        }.bind(this));
    },
    updateState: function(){
        this.setState({parts: this.parts});
    },
    render: function() {
        return (
            <div className='parts-list'>

                <Table responsive>

                    <PartListHeader/>

                    <tbody>

                        { this.state.parts.map(function(part){
                            return <PartListItem uid={part} key={part} />
                        })}
                    </tbody>

                </Table>

            </div>
        );
    }
});

module.exports = {
    PartListHeader: PartListHeader,
    PartListItem: PartListItem,
    PartList: PartList
};
