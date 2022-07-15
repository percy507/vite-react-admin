export function copyText(str) {
  if (!document.queryCommandSupported('copy')) {
    throw new Error('document.execCommand method not support copy command');
  }
  let input = document.createElement('input');
  input.style.cssText = `display: block;
                         position: fixed;
                         left: -10000px;
                         z-index: -1;
                         width: 10px;
                         height: 10px;
                         opacity: 0;`;
  document.body.appendChild(input);
  input.value = str;
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}
