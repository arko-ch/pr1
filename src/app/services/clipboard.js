import $notify from './notify';

const clipboard = {
  copy: function(txt, notice) {
    var clip = document.querySelector('#clipboardInput');
    clip.value = txt;
    setTimeout(() => {
      clip.select();
      document.execCommand('copy');
      $notify.notify(notice, {
        autoClose: 1000,
        closeButton: false
      });
    });
  }
};

// init
var clip = document.querySelector('#clipboardInput');
if (!clip) {
  var elm = document.createElement('input');
  elm.setAttribute('id', 'clipboardInput');
  elm.style.height = '0px';
  elm.style.width = '400px';
  elm.style.zIndex = '-100';
  elm.style.position = 'absolute';
  elm.style.top = '-100px';
  elm.style.left = '0px';
  document.body.appendChild(elm);
}

export default clipboard;
/*  useEffect(() => {
    setState(props);
}, [props]) */
  //console.log('FilterBar',props.value) //,props.meta,state.value)