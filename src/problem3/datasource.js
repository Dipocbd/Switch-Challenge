// your code here:

class ds{
    constructor(){
    
    }
  
    // we are using a static method here because from the usage of the method,
    // we dont need to instantiate the class
   static getPrices(){
      return new Promise(async (resolve, reject)=>{
        try {
          const response= await fetch(`https://static.ngnrs.io/test/prices`);
          const data = await response.json();
          const calculatedData = data?.data?.prices.map((price)=>{
            return{
              ...price,
              mid: ()=>{
                return (((price.buy + price.sell)/2)/100);
              },
              quote: () => {
                return price.pair.slice(3);
              }
            }
          })
          resolve(calculatedData);
        } catch (error) {
          reject(error);
        }
      })
    }
  }
  
  ds.getPrices().then(prices => {
      prices.forEach(price => {
          console.log(`Mid price for ${ price.pair } is ${ price.mid() } ${ price.quote() }.`);
      });
  }).catch(error => {
      console.log(error);
  });