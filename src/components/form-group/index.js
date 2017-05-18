import React from 'react';

export default class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false
        };

        this.handleChange = this.handleChange.bind(this)
    }
    
    componentDidMount() {
        this.setState({
            checked: this.props.checked
        })
    }

    handleChange(e, id) {
        this.setState({ 
            checked: e.target.checked
        })

        this.props.handleChange(id) 

    }

    render () {
        let { id, name} = this.props;
        return (
            <div className='form-group'>
                <label htmlFor={id}>{name}</label>
                <input type="checkbox" id={id} onChange={(e, _id) => this.handleChange(e, id)} checked={this.state.checked}/>
                {this.props.children} 
            </div>
        )
    }
}
