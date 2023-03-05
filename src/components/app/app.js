import { Component } from "react";
import {v4 as uuidv4} from "uuid";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployessAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state= {
            data: [
                {name: 'John C.', salary: 800, increase: false, rise: true, id: 1},
                {name: 'Alex M.', salary: 3000, increase: true, rise: false, id: 2},
                {name: 'Carl Y.', salary: 5000, increase: false, rise: false, id: 3}
            ],
            term: "",
            filter: "all"
        }

    }

    deleteItem = (id) => {
        this.setState(({data}) =>{

            // const index = data.findIndex(elem => elem.id == id);
            // const before = data.slice(0, index);
            // const after = data.slice(index + 1);
            // const newArr = [...before, ...after];

            return {
                data: data.filter(item => item.id != id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: uuidv4()
        }

        this.setState(({data}) => {
            const newArr = [...data, newItem]
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState (({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    onChangeSalary = (id, newSalary) => {
        this.setState (({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, salary: newSalary.replace(/\D/g, "")}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if(term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term})    // эквивалентно term: term - сокращенная запись объектов
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case "rise":
                return items.filter(item => item.rise);
            case "moreThan1000":
                return items.filter(item => item.salary > 1000);
            default:
                return items
       }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);  //комбинируем поиск и фильтр

        return (
            <div className='app'>
                <AppInfo employees={employees} increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onChangeSalary={this.onChangeSalary}/>
                <EmployessAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App;