const socket = io.connect();

//---------------------------------purchase---------------------------------------------------

const addProductForm = document.getElementById('addProductForm')
addProductForm.addEventListener('submit', e => {
    e.preventDefault()

    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImgUrl = document.getElementById('productImgUrl').value;
    const purchase = { 
        productName : productName,
        productPrice : productPrice,
        productImgUrl : productImgUrl
    } 
    
    socket.emit('newPurchaseObj', purchase);
})

socket.on('newPurchaseList', purchaseList=>{
    const productListSection = document.getElementById('productListSection');
    buildHtmlProductTable(purchaseList)
    .then( table => {
        productListSection.innerHTML = table;
    } )
})

async function buildHtmlProductTable(purchaseList) {
    const respuesta = await fetch('plantillas/tabla-productos.hbs');
    const plantilla = await respuesta.text();
    const template = Handlebars.compile(plantilla);
    const html = template({ purchaseList });
    return html;
}


//------------------------------------chat-------------------------------------------------

const userEmail = document.getElementById('userEmail');
const userMssg = document.getElementById('userMssg');
const btnSendMssg = document.getElementById('btnSendMssg');
const formChat = document.getElementById('formChat')

formChat.addEventListener('submit', e => {
    e.preventDefault();
    const message = {
        userEmail : userEmail.value,
        userMssg : userMssg.value
    }
    socket.emit('newMessageObj', message);
    formChat.reset()
    userMssg.focus()
})

socket.on('newChatRecord', chatRecord => {
    const chatRecordSection = document.getElementById('chatRecordSection');

    buildHtmlChatOl(chatRecord)
    .then( orderedList => {
        chatRecordSection.innerHTML = orderedList;
    } )
})

async function buildHtmlChatOl(chatRecord) {

    const dateTime = new Date().toLocaleString();
    const respuesta = await fetch('plantillas/ol-chat.hbs');
    const plantilla = await respuesta.text();
    const template = Handlebars.compile(plantilla);
    const html = template({ chatRecord:chatRecord, dateTime:dateTime}  );
    return html;
}


//----------------------------------------
//input validators
userEmail.addEventListener('input', () => {
    const hayEmail = userEmail.value.length
    const hayTexto = userMssg.value.length
    userMssg.disabled = !hayEmail
    btnSendMssg.disabled = !hayEmail || !hayTexto
})

userMssg.addEventListener('input', () => {
    const hayTexto = userMssg.value.length
    btnSendMssg.disabled = !hayTexto
})
