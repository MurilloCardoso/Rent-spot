import "./searchFilter.css"
import { FaArchway,FaCalendarAlt,FaHands} from 'react-icons/fa';
function SearchFilter() {
    return (
      <div>
        <div className="section-filter">
          <div class="dropdown">
          <div class="dropbtn" className="icons-text"> <FaArchway/> <button class="dropbtn">Data</button></div>
            <div class="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
            </div>
          </div>
          <div class="dropdown">
           <div class="dropbtn" className="icons-text"><FaCalendarAlt/><button class="dropbtn">Data</button></div>
            <div class="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
            </div>
          </div>
          <div class="dropdown">
          <div class="dropbtn" className="icons-text"><FaHands/><button class="dropbtn" >Data</button></div>
            <div class="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
            </div>
          </div>
          </div>
      </div>
    );
  }

  
  export default SearchFilter;
  