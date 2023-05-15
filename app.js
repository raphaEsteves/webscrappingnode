const puppeteer = require('puppeteer');

(async () =>{
    const navegador = await puppeteer.launch({headless: false});
    const pagina = await navegador.newPage();
    pagina.goto('http://google.com.br');
})(); //auto-executa

