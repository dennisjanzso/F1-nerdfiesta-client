

function Navbar(props) {
  
    return (
      <nav>
        <div class="nav-wrapper" style={{'background-color': '#de0f17'}}>
          <a href="/" className="brand-logo" style={{'left': '1em'}}>F1 Hub</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a href="/races">Races</a></li>
            <li><a href="/drivers">Drivers</a></li>
          </ul>
        </div>
      </nav>
    );
}

export default Navbar;