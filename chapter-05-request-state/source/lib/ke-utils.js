/*
const styles = [
  'background: linear-gradient(#D33106, #571402)',
  'border: 1px solid #3E0E02',
  'color: white',
  'display: block',
  'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
  'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset',
  'line-height: 40px',
  'text-align: center',
  'font-weight: bold',
].join(';');
*/

const styleLog = [
  'border: 1px solid #3E0E02',
  'color: white',
  'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
  'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 2px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 2px -10px rgba(255, 255, 255, 0.4) inset',
  'line-height: 10px',
  'text-align: center',
  'font-weight: bold',
].join(';');

const styleFun = [
  'border: 1px solid #3E0E02',
  'color: #00ced1',
  'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
  'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 2px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 2px -10px rgba(255, 255, 255, 0.4) inset',
  'line-height: 10px',
  'text-align: center',
  'font-weight: bold',
].join(';');

module.exports = {

  p(text) {
    document.write("<p>" + text + "</p>");
  },

  t(text) {
    document.write(text);
  },

  wval(desc, value) {
    document.write("<p><b>" + desc + " =</b> " + value + "</p>");
  },

  h1(text) {
    this.whead(text, 1);
  },

  h2(text) {
    this.whead(text, 2);
  },

  h3(text) {
    this.whead(text, 3);
  },

  h4(text) {
    this.whead(text, 4);
  },

  whead(text, level) {
    const val = level ? level : 1;
    const h = document.createElement("h" + val);
    const t = document.createTextNode(text);
    h.appendChild(t);
    document.body.appendChild(h);
  },

  code(text) {
    const str = "<code>" + text + "</code>";
    document.write(str);
  },

  pre(text) {
    const str = "<pre>" + text + "</pre>";
    document.write(str);
  },

  log(name, value = '', color = 'normal') {
    const message = `%c[log] ${name}`;
    //eslint-disable-next-line no-console
    console.log(message, styleLog, value);
  },

  logFunction(name) {
    //eslint-disable-next-line no-console
    console.log("%c[fun] " + name + "()", styleFun);
  },
};
