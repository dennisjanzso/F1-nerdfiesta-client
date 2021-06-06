function Preloader({progressInfo}) {

    return (
      <div>
        <div style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}}>
          <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-red-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{display: 'block'}}>
          <small>{progressInfo === undefined ? "Loading" : progressInfo}</small>
        </div>
      </div>
    );
  }
  
  export default Preloader;