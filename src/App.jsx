import { useState, useEffect } from "react";
import "./App.css";
import Companies from "./components/companies-list/companies.component";
import  CardList  from "./components/card-list/card-list.component";
import  SearchBox  from "./components/search-box/search-box.component";


const App = () => {
  const [searchField, setSearchField] = useState('');
  const [title, setTitle] = useState('');
  const[monsters, setMonsters] = useState([]);
  const[companies,setCompanies] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);   
  const[filteredCompanies, setFilteredCompanies] = useState(companies);
  const [email, setEmail] = useState('');
  useEffect(() =>{
          fetch("https://jsonplaceholder.typicode.com/users")
                .then((response) => response.json())
                .then((users) => {
                  const companiesData = users.map(user => user.company)
                  setMonsters(users)
                  setCompanies(companiesData)
                  setFilteredCompanies(companiesData)
                  setFilteredMonsters(users)
                });
        },[]);

        // useEffect(() =>{
        //   const newFilteredMonsters = monsters.filter((monster) => {
        //     return monster.name.toLowerCase().includes(searchField));
        //   });
        //   setFilteredMonsters(newFilteredMonsters);
        // },[monsters, searchField]);

        useEffect(() => {
          const newFilteredMonsters = monsters.filter((monster) => {
            return monster.name.toLowerCase().includes(searchField) && 
                   monster.email.toLowerCase().includes(email);  // Filter by email
          });
          setFilteredMonsters(newFilteredMonsters);
        }, [monsters, searchField, email]);

  const onSearchChange = (event) => {
        const searchFieldString = event.target.value.toLowerCase();
        setSearchField(searchFieldString)
      }
  const onTitleChange = (event) => {
        const searchFieldString = event.target.value.toLowerCase();
        setTitle(searchFieldString)
      }
  const onEmailChange = (event) => {
        const searchFieldString = event.target.value.toLowerCase();
        setEmail(searchFieldString);
      }
  
  const onCompanyChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    const newFilteredCompanies = companies.filter((company) =>
      company.name.toLowerCase().includes(searchFieldString)
    );
    setFilteredCompanies(newFilteredCompanies);
  };
    return (
        <div className="App">
          
          {/* {filteredMonsters.map((monster) => {
            return <h1 key={monster.id}>{monster.name}</h1>;
          })} */}
          <h2 style={{ color: "black" }}>{title}</h2>
          <SearchBox 
          className = 'monsters-search-box'
          onChangeHandler={onSearchChange}
          placeholder = "search monsters"
          />
          <SearchBox 
          className = 'title-search-box'
          onChangeHandler={onTitleChange}
          placeholder = "set title"
          />
          {/* Search by email */}
          <SearchBox 
          className = 'email-search-box'
          onChangeHandler={onEmailChange}
          placeholder = "Search by email"
          />
          <Companies 
          companies={filteredCompanies}
          onChangeHandler={onCompanyChange}
          />
        <CardList monsters={filteredMonsters}/>
          
        </div>
    );
}
// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: '',
//     };
//   }

//   componentDidMount() {

//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(
//           () => {
//             return { monsters: users };
//           },
//           () => {
//             console.log(this.state);
//           }
//         )
//       );
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLowerCase();
//     this.setState(() => {
//       return { searchField };
//     });
//   }
//   render() {
   
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this; 
//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLowerCase().includes(searchField);
//     });

//     return (
//       <>
//         <div className="App">
          
//           {/* {filteredMonsters.map((monster) => {
//             return <h1 key={monster.id}>{monster.name}</h1>;
//           })} */}
//           <h2 style={{ color: "black" }}>Monster - Rygor</h2>
//           <SearchBox 
//           className = 'monsters-search-box'
//           onChangeHandler={onSearchChange}
//           placeholder = "search monsters"
//           />
//           <CardList monsters={filteredMonsters}/>
          
//         </div>
//       </>
//     );
//   }
// }

export default App;
