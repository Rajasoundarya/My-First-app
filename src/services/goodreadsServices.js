const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodReadServices');

const parser = xml2js.Parser({explicitArray: false})
function goodReadsService(){
  function getBookById(id){
    return new Promise((resolve, reject)=>{
      axios.get('https://www.goodreads.com/author/show/656.xml/?key=gOI29SWye4FIn8cVLS2g')
      .then((response)=>{
        parser.parseString(response.data, (err, result)=>{
          if(err){
            debug(err);
          }else{
            debug(result.GoodreadsResponse);
            resolve(result.GoodreadsResponse.author.books.book)
          }
        })
      })
      //resolve({description:"Our desc"})

    });
  }
  return { getBookById }
}
module.exports = goodReadsService();