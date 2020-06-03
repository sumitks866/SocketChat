
const textmsg = document.getElementById('textbox');
const sendbtn = document.getElementById('send');
const msglist = document.getElementById('messages');
const socket = io('http://localhost:8000');

socket.on('confirm',(data)=>{
    console.log(data);
})
socket.emit('reply','client is connected')

function send_message(){
    let tosend=textmsg.value;
    tosend=tosend.trim();
    if(tosend.length!=0){
    socket.emit('chatmsg',tosend);
    msglist.innerHTML+=`<li><div id="mine">${tosend}</div></li>`
    document.getElementById('textbox').value='';
    }
}
socket.on('forward',(msg_reply)=>{
    msglist.innerHTML+=`<li><div id="not_mine">${msg_reply}</div></li>`    
})

sendbtn.addEventListener('click',send_message)
