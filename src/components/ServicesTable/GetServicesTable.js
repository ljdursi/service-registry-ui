import React, { Component } from 'react';
import './GetServicesTable.css';

class GetServicesTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : false,
            filterValue: '',
            services : []        
        };
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_SERVER)
        .then( response => response.json())
        .then(
            // handle the result
            (result) => {
                this.setState({
                    isLoaded : true,
                    services : result
                });
            },

            // Handle error 
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            },
        )
    }

    render() {
        const {error, isLoaded, filterValue, services } = this.state;

        if(error){
            return <div>Error in loading</div>
        }else if (!isLoaded) {
            return <div>Loading ...</div>
        }else{

            const filteredServices = services.filter(service => service.organization.name.includes(filterValue));

            return(
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>Fiter Organization By
                            <input type="text" value={this.state.filterValue} onChange={e => this.setState({filterValue: e.target.value})} />
                        </label>
                    </form>

                    <table className="serviceTable">
                        <thead>
                        <tr>
                            <th>Organization</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Url</th>
                        </tr>
                        </thead>
                        <tbody>
                    {
                        filteredServices.map(service => (
                            <tr key={service.id} align="start">
                                <td className="body"><a href={service.organization.url}>{service.organization.name}</a></td>
                                <td className="user">{service.name}</td>
                                <td className="user">{service.type.group}.{service.type.artifact} {service.type.version}</td>
                                <td className="title"><a href={service.url}>link</a></td>
                            </tr>
                            ))
                    }
                    </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default GetServicesTable;
