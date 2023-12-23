import {NavLink} from "react-router-dom";

function NavigationComponent()
{
    return(
        <nav class="navbar navbar-expand-lg" style={{backgroundColor:"#92BE98"}}>
  <div class="container-fluid" style={{backgroundColor:"#92BE98"}}>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <NavLink to="/" className="nav-link">Books</NavLink>
        </li>
        <li class="nav-item">
            <NavLink to="/addBook" className="nav-link">Add Book</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
    )
}

export default NavigationComponent;