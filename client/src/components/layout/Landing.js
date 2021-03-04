import React, { useState, useEffect, useRef } from 'react'
import { connect } from "react-redux";
import { getDuckData } from "../../actions/searchAction";
import Pagination from '../Pagination';
import Sidebar from './Sidebar';


const Landing = (props) => {

  const [searchKey, setsearchKey] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(5)
  const [history, setHistory] = useState([])
  const [keyword, setKeyword] = useState('')
  const [countMatch, setCountMatch] = useState(0)

  const inputRef = useRef();

  useEffect(() => {
    setHistory(getHistory())
  }, []);

  const getHistory = () => {
    const his = localStorage.getItem("searchHistory");
    if (his) {
      return JSON.parse(his);
    } else {
      return [];
    }
  }

  const onChangehandler = (e) => {
    setsearchKey(e.target.value)
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (searchKey) {
      props.getDuckData(searchKey)
      saveToHistoryLIst(searchKey)
    }

  };

  const saveToHistoryLIst = (text) => {
    let hist = getHistory();
    const found = hist.find(element => element === text);
    if (!found) {
      hist.push(text)
      setHistory(hist);
    }


    localStorage.setItem("searchHistory", JSON.stringify(hist));
  }


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const onHistoryHandler = (text) => {
    inputRef.current.value = text.item
    setsearchKey(text.item)
    props.getDuckData(text.item)

  }
  const onKeyWordChangeHandler = (e) => {

    setKeyword(e.target.value)

    const res = props.data.filter(item => {
      if (e.target.value.length === 0) {
        return ''
      }
      return item.name.toLowerCase().includes(e.target.value.toLowerCase())
    }
    )

    setCountMatch(res.length)




  }
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = props.data && props.data.slice(indexOfFirstPost, indexOfLastPost)

  return (

    <div className="container">
      <div className="row">
        <div className="text-justify"><Sidebar historyList={history} onHistoryClick={onHistoryHandler} /></div>
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">DUCKDUCKGO</h1>
          <p className="lead text-center">
            What you are looking for today?
              </p>
          <form onSubmit={onSubmitHandler}>
            <div className="form-group">
              <input
                ref={inputRef}
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter your search"
                name="searchKey"
                value={searchKey}
                onChange={onChangehandler}
              />
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
          <div className="form-group mt-5 mx-auto" style={{ width: '200px' }}>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Find key word in results"
              name="keyword"
              onChange={onKeyWordChangeHandler}
              value={keyword}
            />
            <h5>Match appearance: <span className="badge badge-info">{countMatch}</span></h5>
          </div>

          <div className='results'>
            <label className="label label-default mx-auto" style={{ fontSize: '1.5rem' }}>Search results:</label>
            <ul className="list-group mb-4">
              {props.data && currentPosts.map((item) => (
                <li key={item.link} className="list-group-item">
                  <a href={item.link} dangerouslySetInnerHTML={{
                    __html: item.name.toLowerCase().replace(keyword.toLowerCase(), (dd) => {

                      return `<span style='background-color: yellow'>${dd}</span>`
                    })
                  }}></a></li>
              ))}
            </ul>
          </div>
          <Pagination paginate={paginate} postPerPage={postsPerPage} totalPosts={props.data && props.data.length} />
        </div>
      </div>
    </div>

  )
}

const mapStateToProps = state => {
  return {
    data: state.data,
    history: state.history
  };
};

export default connect(mapStateToProps,
  { getDuckData })(Landing);
