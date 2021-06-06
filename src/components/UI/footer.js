
function Footer(props) {
  
    return (
        <footer className="page-footer" style={{
            'position': 'fixed',
            'max-height': '100vh',
            'bottom': '0px',
            'width': '100%',
            'background-color': '#de0f17',
            }}>
            <small style={{'position': 'relative', 'left': '45%', 'bottom': '1em'}}>Info here</small>
        </footer>
    );
}

export default Footer;