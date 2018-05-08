var express=require("express");
var app=express();
var bodyParser=require("body-parser");


var text="Something words ";
const request = require('request');
var Set = require("Set");
var PriorityQueue = require('priorityqueuejs');
var PriorityQueuee=require("js-priority-queue");


var pq=new PriorityQueue(function(a, b) {
  return a.count - b.count;
});
app.use(express.static(__dirname + "/public"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())


function tokenise()
{
    
    text=text+" ";
    var word="";
    var arr=[];
    var charOccured=0;
    for(var i=0;i<text.length;i++)
    {
        if(text[i]==' ')
        {
            
            word=word.toLowerCase();
            if(charOccured)
            arr.push(word);
            word="";
            charOccured=0;
        }
        else
        {
            if((text[i]>='A' && text[i]<='Z') || (text[i]>='a' && text[i]<='z'))
            charOccured=1;
            word=word+text[i];
        }
    }
   // console.log("Tokens");
    //console.log(arr);
    return arr;
}

function getans(n)
{
    var mp=[];
    var tokens=tokenise();
    var ss=new Set();
    for(var i=0;i<tokens.length;i++)
    {
        mp[tokens[i]]=mp[tokens[i]] || 0;
        if(mp[tokens[i]]==[])
        mp[tokens[i]]=0;
        else
        mp[tokens[i]]=parseInt(mp[tokens[i]]);
        
        mp[tokens[i]]++;
        
        ss.add(tokens[i]);
        
    }
    
   // console.log(mp["can"]);
    var arr = ss.toArray();
//console.log(arr);
var pq=new PriorityQueue(function(a, b) {
  return parseInt(a.count) - parseInt(b.count);
});
var pqq = new PriorityQueuee({ comparator: function(a, b) { return a.count - b.count; }});


var cc=0;
var ns=new Set();
//console.log(arr.length);
if(arr.length<n)
n=arr.length;
for (var i=0;i<arr.length;i++) {
    
    //ns.add([-parseInt(mp[arr[i]]),arr[i]]);
   
    pq.enq({count:parseInt(mp[arr[i]]),word:arr[i]});
      pqq.queue({count:-parseInt(mp[arr[i]]),word:arr[i]});
    
}
var tt=0;


var anslist=[];
var c=0;
while(c<n)
{
    var xx=pqq.dequeue();
    anslist.push({count:-xx.count,word:xx.word});
    c++; 
}
//console.log(mp["tales"]);
return anslist;
    
}




app.get("/",function(req,res)
{
    res.render("index.ejs");
});

app.post("/",function(req,ress)
{
    var x;
    //Code for getting the content of text
     request('http://terriblytinytales.com/test.txt', function(err, res, body) {  
    if(err)
    {
        return res.send("Some error occured");
    }
    text= body;
    var tt=req.body.num;
    tt=parseInt(tt);
    //console.log(tt);
    //console.log(req.body);
    //console.log(req);
     x=getans(tt);
    //console.log(x);
    
    ress.send(x);
   // ress.render("words.ejs",{words:x});
    
    
    
    
    
});


    
   
    
    
    
    
    
    
    
});




app.listen(process.env.PORT,process.env.IP,function(){
    
    console.log("Server running");
});