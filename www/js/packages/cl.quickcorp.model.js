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

Import('data'); // Import data.js
Import('firebase');
Import('firebaseData');

Package('cl.quickcorp.model', [
  Class('VO', Object, {
    __new__: function() {
      //TODO: Implement
      console.log('VO Element Initialized');
    }
  }),
  Class('DataVO', VO, {
    list: function() {
      // Initialize Firebase
      var config = {
        apiKey: CONFIG.get('firebaseClient').apiKey,
        authDomain: CONFIG.get('firebaseClient').authDomain,
        databaseURL: CONFIG.get('firebaseClient').databaseURL,
        projectId: CONFIG.get('firebaseClient').projectId,
        storageBucket: CONFIG.get('firebaseClient').storageBucket,
        messagingSenderId: CONFIG.get('firebaseClient').messagingSenderId
      };
      firebase.initializeApp(config);
      dataList = [];
      firebase.database().ref('actors').on('child_added',
        function(data) {
          console.log(data.val());
          dataList.push(data.val());

          //Generating Mobile Items
          var mobile_item = New(MobileAccordionItem);
          mobile_item.itemList = data.val();
          mobile_sidebar_list.addItem(mobile_item);

          //Generating Desktop Items
          var desktop_item = New(DesktopSideMenuItem);
          desktop_item.itemList = data.val();
          desktop_sidebar_list.addItem(desktop_item);
          if (dataList.length == 1) {
            document.dispatchEvent(new CustomEvent('firstDataListElementLoaded', {
              detail: {
                data: data.val()
              }
            }));
          }

        });

      firebase.database().ref('actors').on('child_changed',
        function(data) {
					var dataObj = data.val();
          console.log(data.val());
					dataList.splice(dataObj.id-1,1);
					Tag('#mobile_sidebar_list li')[dataObj.id-1].remove();
          dataList.push(data.val());

          //Generating Mobile Items
          var mobile_item = New(MobileAccordionItem);
          mobile_item.itemList = data.val();
          mobile_sidebar_list.addItem(mobile_item);

          //Generating Desktop Items
          var desktop_item = New(DesktopSideMenuItem);
          desktop_item.itemList = data.val();
          desktop_sidebar_list.addItem(desktop_item);
          if (dataList.length == 1) {
            document.dispatchEvent(new CustomEvent('firstDataListElementLoaded', {
              detail: {
                data: data.val()
              }
            }));
          }

        });

				firebase.database().ref('actors').on('child_removed',
	        function(data) {
						var dataObj = data.val();
	          console.log(data.val());
						dataList.splice(dataObj.id-1,1);
						Tag('#mobile_sidebar_list li')[dataObj.id-1].remove();
	        });

      return dataList;
    }
  })
]);
