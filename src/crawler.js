const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        // headless: false
    });
    
    const toGet = ['oll', 'pll', 'f2l']
    const data = await Promise.all(
        toGet.map( async (type) => {
            const page = await browser.newPage();
            await page.goto('http://algdb.net/puzzle/333/' + type, {waitUntil: 'networkidle0'});
            await page.waitForSelector('table')
        
            // Get all pll names and links
            const PLL_titles = await page.evaluate(
                async () => {   
                    let names = Array.from(document.querySelectorAll('table > tbody > tr > td:nth-child(1) > a'));
                    // let images = Array.from(document.querySelectorAll('table > tbody > tr > td:nth-child(1) > a'));
                    // let algs = Array.from(document.querySelectorAll('table > tbody > tr > td:nth-child(3) > div > span > span'));
                    return names.map( (item, i) => {
                        return {
                            url:  item.getAttribute('href'),
                            name: item.innerText,
                            // alg: algs.slice(i*4, i*4+4).map(a => a.innerText)
                        };
                    });
                }
            )
            page.close()
        
            // // get all pll algo
            return await Promise.all(
                PLL_titles.map( async (pll) => {
                    // open new page for each pll 
                    const pllPage = await browser.newPage() 
                    await pllPage.setDefaultNavigationTimeout(0);
                    await pllPage.goto('http://algdb.net' + pll.url, {waitUntil: 'networkidle0'});
                    await pllPage.waitForSelector('table')
        
                    // get votes and algos
                    const [votes, allAlgos] = await Promise.all([
                        pllPage.evaluate(
                            () => {   
                                let items = Array.from(document.querySelectorAll('table > tbody > tr > td:nth-child(3)'));
                                return items.map( (item) => parseInt(item.innerText) )
                            }
                        ),
                        pllPage.evaluate(
                            () => {   
                                let items = Array.from(document.querySelectorAll('table > tbody > tr > td:nth-child(1)'))
                                return items.map( (item, i) => item.innerText)
                            }
                        )
                    ])
        
                    pllPage.close()

                    // filter algos we want
                    const miniVotesToKeep = 50
                    const nbAlgosOverMiniVotes = votes.filter(v => v >= miniVotesToKeep).length
                    const nbAlgosToKeep = nbAlgosOverMiniVotes > 1 ? nbAlgosOverMiniVotes : 2
                    
                    // get those filtered data
                    const algos = allAlgos
                        .slice(0, nbAlgosToKeep)
                        .map( (a, i) => ({
                            alg: a,
                            votes: votes[i] 
                        }))  
                
                    return {
                        name: pll.name,
                        algos 
                    }
                })
            )
        }))
    // console.log(data);

    // Write data on json files
    data.forEach( (collection, i) => {
        const collectionName = toGet[i]
        const json = JSON.stringify(collection, null, 2)
        var fs = require('fs');
        fs.writeFileSync(__dirname + `/database/algos/${collectionName}.json`, json, 'utf8');
    })

    await browser.close();
})();