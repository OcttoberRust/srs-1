import React, { Component, useReducer } from "react";
import "./Search.css";
import logo from './alagarinc.jpg';


class Search extends Component {
  state = {
    searchValue: "",
    resumes: []
  };

  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
    console.log("handleonchange success");

  };

  handleSearch = () => {
    this.makeApiCall(this.state.searchValue);
    console.log("handlesearch success");
  };

  makeApiCall = searchInput => {

    if (searchInput.indexOf(' ') >= 0) {
      console.log("yes, searchInput has spaces")
      searchInput.replace(/ /g, "+")
    }

    var searchUrl = `http://localhost:8983/solr/resumes/select?q=${searchInput}`;
    fetch(searchUrl,
      { mode: 'cors' })
      .then(response => {
        console.log(".thenresponse success");

        return response.json();
      })
      .then(jsonData => {
        console.log(".thenjson success");
        console.log(jsonData.id)
        this.setState({ resumes: jsonData.response.docs }); //might be able to use response later on to condense resumese.response to
        console.log(this.state.resumes);
      });
  };

  render() {
    return (

      <div id="main">
        <div id="logo">
          <img id="alagarimg" src={logo} alt="logo" />

          <h1>Resume search</h1>
          <div>
            <input
              name="text"
              type="text"
              placeholder="Search"
              onChange={event => this.handleOnChange(event)}
              value={this.state.searchValue}
            />
          </div>
        </div>
        <div className="searchButton">
        <button onClick={this.handleSearch}>Search</button>
        </div>
      
        {

          console.log("success render before state resume call"),
          console.log(this.state.resumes[1]),
          console.log("success render after state resume call"),

          this.state.resumes ? (
            <div className="resumes-container">

              {this.state.resumes.map(resume =>
              
                <div className='center' key={resume.id} >
                 
                    <div className="general">
                    <h1><a href={"https://www.linkedin.com/search/results/all/?keywords="+resume.name+"&origin=GLOBAL_SEARCH_HEADER"} target="_blank" >{resume.name}</a></h1>

                  <p className="location">{resume.location}</p>
                      <p className="education">{resume.education}</p>
                      <p className="experience">{resume.experience}</p>
                      <p className="summary">{resume.summary}</p>
                    </div>
                  </div>

              )}

            </div>

          ) : (
              <p>Try another search</p>

            )

        }
      </div >
    );
  }
}

export default Search;