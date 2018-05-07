var express=require("express");
var app=express();
var bodyParser=require("body-parser");


var text="Something words ";
const request = require('request');
var Set = require("Set");
var PriorityQueue = require('priorityqueuejs');


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
    for(var i=0;i<text.length;i++)
    {
        if(text[i]==' ')
        {
            arr.push(word);
            word="";
        }
        else
        {
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
    
    var arr = ss.toArray();
//console.log(arr);
var pq=new PriorityQueue(function(a, b) {
  return a.count - b.count;
});
for (var i=0;i<arr.length;i++) {
    pq.enq({count:mp[arr[i]],word:arr[i]});
}
var anslist=[];
var c=0;
while(c<n)
{
    var xx=pq.deq();
    anslist.push(xx);
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