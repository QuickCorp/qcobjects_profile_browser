/**
 * Profile Browser  1.0
 * ________________
 *
 * Author: Jean Machuca <correojean@gmail.com>
 *
 * Copyright (c) 2016.
 *
 * This package is for MVC layer purposes.
 *
 */

Import('data');  // Import data.js

Package('nz.co.cucumber.model',[
	Class('VO',Object,{
		__new__:function (){
			//TODO: Implement
			console.log('VO Element Initialized');
		}
	}),
	Class('DataVO',VO,{
		list:function (){
			return data;
		}
	})
]);
