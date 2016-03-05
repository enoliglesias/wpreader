# WP Reader

Cordova project to read wordpress blog and generate a cross platform mobile app. 

As you can see, the names and references, is always about recipes. It's because we use this repo to build the mobile app for the blog [Begin Vegan Begun™](http://beginveganbegun.es)

## Installation

* Install Cordova, dependencies, etc. (Don't worry! It's "fun")
* Cordova plugins needed:
    - cordova-plugin-dialogs 1.2.0 "Notification"
    - cordova-plugin-whitelist 1.2.0 "Whitelist"
    - org.apache.cordova.device 0.3.0 "Device"
* Install the Wordpress API plugin in your blog. [WP Rest API](http://v2.wp-api.org/). 
* Add CORS headers to API. Go to file `rest-api/core/wp-includes/rest-api/rest-functions.php` and set:
    ```
     header( 'Access-Control-Allow-Headers: accept, access-control-allow-headers, access-control-allow-origin' );
     
     header( 'Access-Control-Allow-Origin: *' );
    ```
* Allow query post by date in the API. We need this info in the app. Go to file `rest-api/core/wp-includes/functions.php` and add:
```
     function my_rest_query_vars( $valid_vars ) {
        $valid_vars = array_merge( $valid_vars, array( 'date_query' ) );
        return $valid_vars;
     }
     add_filter( 'rest_query_vars', 'my_rest_query_vars' );
```
* Add tags and categories to post controller in order to get it in the JSON response. Go to file `rest-api/core/wp-includes/rest-api/class-wp-rest-posts-controller.php`, then go to function `prepare_item_for_response` and add to the array the following entries:
```
		'tags'			 	 => wp_get_post_tags($post->ID),
		'categories'	 => wp_get_object_terms($post->ID, 'category'),
```

* Configure settings.js
* Be carefully and remember to change any reference to [Begin Vegan Begun™](http://beginveganbegun.es) to your blog's name. [Begin Vegan Begun™](http://beginveganbegun.es) is a trade mark.
* Run `cordova build [platform]`
* Have fun!

## Screenshots

You can take a look at the application that I made with this proyect. Is published it in the Play Store and iTunes (soon).
<p>
<img src="https://lh3.googleusercontent.com/DFZ4-xq_XXk5sZEyGd9AoCCX4ctE_WAM7a__EitV8Iof-1ukhbDMvVRvcySihaxFy3E=h900-rw" height="400px"/>

<img src="https://lh3.googleusercontent.com/VCO3o4UyTtctIvuXSaLYvNn43JvGoEFkZ_OBhCYh4Vj9wiDh4KkSHs1czUp_uXjXQfOW=h900-rw" height="400px"/>

<img src="https://lh3.googleusercontent.com/9Z1CgoZzn4n-zRXZwbZgiGHcRl7KIiNtm53KA3sOVJ_TWMqwwMj4q8IuthXUwG6Pkvea=h900-rw" height="400px"/>

<img src="https://lh3.googleusercontent.com/vF5rR75X3gCXyvZ9nQBkwMzfsCF06mgip4X2Exb2_LvkPhOMacqj1_Q0nVUkrxGz8FEx=h900-rw" height="400px"/>

<img src="https://lh3.googleusercontent.com/hnDprroP4BeoL6X3fo9nPQedf3YtEZDrkFhDv5pGEBMitZjGvNZHD5AHbzvais2lTSUr=h900-rw" height="400px"/>

<img src="https://lh3.googleusercontent.com/iLleZ8LFXtvcpRR0Yxw42Pn-QidctkpbMtiJ2GAgzIw7lsY4AEJElWKikSfMWYI4IGk=h900-rw" height="400px"/>

</p>
<br/>
<a target="_blank" href="https://play.google.com/store/apps/details?id=com.enoliglesias.bvb&utm_source=global_co&utm_medium=prtnr&utm_content=Mar2515&utm_campaign=PartBadge&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"><img width="250px" alt="Get it on Google Play" src="https://play.google.com/intl/en_us/badges/images/generic/en-play-badge.png" /></a>

## TODO

* Push notifications

    I'm working in a parallel project ([Pushificator](https://github.com/enoliglesias/pushificator)) to send push notifications to a mobiles from a web app. Once I get this project finished I'm going to add in this project functionality to register the devices in that web app, vía API. And then send the notifications :)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Credits

Enol Iglesias Lorenzo ([undefinedmethod.com](http://undefinedmethod.com))

## License

WP Reader is released under the [MIT License](http://opensource.org/licenses/MIT).

[Begin Vegan Begun™](http://beginveganbegun.es) is a trade mark.

