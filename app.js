const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({
      headless: false
    });

    const page = await browser.newPage();
    // await page.goto('https://www.instagram.com/rocketseat/');

    await page.goto('https://unsplash.com/pt-br');
    await page.setViewport({
      width: 1080,
      height: 1024,
      deviceScaleFactor: 1
    })
    await page.type('.ctM_F.gdt34', 'praia');
    await page.keyboard.press('Enter'); //pressionar tecla enter

    const imgList = await page.evaluate(()=>{
      // toda essa função será executada no navegador

      // buscar imagens que estão na parte
      //TODO: corrigir essa busca por classes no HTML
      const nodeList = document.querySelectorAll('div.search-photos-route img')
      
      // transformar o nodeList em array
      const imgArray = [...nodeList]
      
      // transformar os nodes em objetos JS
      const imgList = imgArray.map( ({src}) => ({
        src
      }))

      // colocar para fora da função
      return imgList;
    })

    // escrever os dados em um arquivo local (JSON)
    fs.writeFile('imagens.json', JSON.stringify(imgList, null, 2), err =>{
      if(err) throw new Error('Algo deu errado')
      console.log('Ok')
    });
})();