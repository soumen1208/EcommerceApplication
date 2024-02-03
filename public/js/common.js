
let allLikeButton = document.querySelectorAll('.fa-heart')
let card = document.getElementsByClassName('card')

async function likeButton (productsId, card) {   // diff btw route and api -> route return page and api return data
    console.log('like the product');
    
    try{
        let response =  await axios({
            method: 'post',   // which req I send to server
            url: `/products/${productsId}/like`, // // which server I hit
            headers: {'X-Requested-With' : 'XMLHttpRequest'},
            
        });
        // console.log(response);
        if(card.children[0].classList.contains('fa-solid')){
            card.children[0].classList.remove('fa-solid')
            card.children[0].classList.add('fa-regular')
        }else{
            card.children[0].classList.remove('fa-regular')
            card.children[0].classList.add('fa-solid')
        }
    }
    catch(e){
        window.location.replace('/login');
        console.log(e.message , 'error hai ye window vaali line ka')
    }
        
   

}

for(let btn of allLikeButton){
    btn.addEventListener('click', ()=>{
        let productsId = btn.getAttribute('product-id')     // when click the like btn  we find an id  then a function run   
        // console.log(btn.getAttribute('product-id'));
        likeButton(productsId, card);
    })
}