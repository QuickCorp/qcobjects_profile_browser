"use strict";
Package('cl.quickcorp.service',[
  Class('JsonService',{
    method:"GET",
    cached:false,
  	headers: {
  		"Content-Type":"application/json",
      "charset":"utf-8"
  	},
    JSONresponse: null,
    done:function(result){
      console.log("***** RECEIVED RESPONSE:");
      console.log(result.service.template);
      this.JSONresponse = JSON.parse(result.service.template);
    }
  })

])
