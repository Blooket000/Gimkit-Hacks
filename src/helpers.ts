const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
const randomId = () => "g_"+Date.now().toString(32)+"_"+Math.floor(Math.random()*1e4).toString(32);
const randomIds = (n: number) => Array.from({length: n}, randomId);
const styleString = (styles: {[key: string]: string | number}) => Object.entries(styles).map(([k, v]) => k+":"+v).join(";")

export { sleep, randomId, randomIds, styleString };