/**
 * 
 * USAGE:
 * UriParser.parseRootDomain("http://user:password@www.truste.com.ca:80/pathname?querystring&key=value#fragment"); //= truste.com.ca
 * UriParser.parseRootDomain("http://google.com.ph/pathname?querystring&key=value#fragment"); //= google.com.ph
 * UriParser.parseRootDomain("http://www.google.com/pathname?querystring&key=value#fragment"); //= google.com
 * 
 */
var UriParser =  {

 //parse the root domain, exclude the sub domain
 parseRootDomain : function(url) {
  var matches = url.match(/^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/);
 
  //my additional code
  var theDomain = matches[6];
  
  if(UriParser.isIp(theDomain)){//if it is an ip address return it as domain
   return theDomain;
  }
  var dots = theDomain.split('.');
  var n = dots.length;
  
  if(n < 3){//google.com, 2 root words concatenate, 1 word as well i.e. localhost
   return dots.join(".");
  }
  else{//should be greater than or equal to 3 dot split ie. adsense.google.com
   var last = dots[n-1];
   var second2l = dots[n-2];
   var third2l = dots[n-3];
  
   var ext;
   var root;
   if(second2l.length <= 3){//if google.com.ph, or bbc.co.uk
    ext = second2l +"."+ last;
    root = third2l;
   }else{// adsense.google.com
    ext = last;
    root = second2l;
   }
   var domain = ""+ root + "." + ext;
   return domain;
  }
 },
 
 //private
 isNumber : function (o) {
    return !isNaN (o-0);
 },
 //private
 /**
  * determines if the url is an ip address
  */
 isIp: function(domain){
  var exploded = domain.split('.');
  for(var i = 0; i < exploded.length; i++){
   if(!UriParser.isNumber(exploded[i])){
    return false;
   }
  }
  return true;
 },
 
 isSameDomain: function(url1, url2){
  if(UriParser.parseRootDomain(url1) == UriParser.parseRootDomain(url2)){
   return true;
  }
  return false;
 }

}