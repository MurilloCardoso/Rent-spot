import SerchFilter from "../../components/searchFilter/searchFilter"
import Carousel from "../../components/carrosel/Carrosel";
import "./homeStyle.css"
function Home() {
    return (
      <div >
      <h1>home</h1>

      <SerchFilter/>
        <div id="carrousel-group">
          <Carousel/>
        </div>
      </div>
    );
  }
  
  export default Home;
  