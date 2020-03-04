var Map = {
    near    :   [],
    markers    :   [],
    property :   {
        lat         :   0,
        long        :   0,
        image       :   null,
        city        :   null,
        state       :   null,
        country     :   null,
        place_id    :   null,
        location    :   null,
        address     :   null,   
        venue_name  :   null,
    },
    bindSearch  :   function(o,o1){
        
        return google.maps.event.addDomListener(window, 'load', Global.setTextLocation(o,o1));
        
    },
    viewDefault :   function(o,f){
                
        var $this = this;
                                                      
        var lat = parseFloat($('#js-txt-lat').val());
        var lang = parseFloat($('#js-txt-long').val());
                               
        if(!isNaN(lat) && !isNaN(lang)){
                       
            var map = new google.maps.Map(document.getElementById(o), {
                center: {lat: lat, lng: lang},
                zoom: 16
            });  


            map.setZoom(16);

            var marker = new google.maps.Marker({
                map         : map,
                position    : {lat: lat, lng: lang},
                anchorPoint : new google.maps.Point(0, -29)
            });

            //set marker
            marker.setIcon(/** @type {google.maps.Icon} */({
                url         : "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
                size        : new google.maps.Size(71, 71),
                origin      : new google.maps.Point(0, 0),
                anchor      : new google.maps.Point(17, 34),
                scaledSize  : new google.maps.Size(35, 35)
            }));

            //display marker
            marker.setMap(map);            

            $('#'+o).css({
               width    :   '100%',
               height   :   '300'                  
            });
            
            $this.refresh(lat,lang,map);
            
        }else{

            $('.vanue-maps').show();
        }
        
    },
    refresh :function(lat,lang,map){
        
        $("a[href='#alamat']").on('shown.bs.tab', function(){
            google.maps.event.trigger(map, 'resize');
        });
        
        map.setZoom(16);

        var marker = new google.maps.Marker({
            map         : map,
            position    : {lat: lat, lng: lang},
            anchorPoint : new google.maps.Point(0, -29)
        });

        //set marker
        marker.setIcon(/** @type {google.maps.Icon} */({
            url         : "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
            size        : new google.maps.Size(71, 71),
            origin      : new google.maps.Point(0, 0),
            anchor      : new google.maps.Point(17, 34),
            scaledSize  : new google.maps.Size(35, 35)
        }));

        //display marker
        marker.setMap(map);            

    },
    setNear :   function(){
        
        var locations = [
                ['Bondi Beach', -6.307106,106.835459, 4],
                ['Coogee Beach', -6.307106,106.835459, 4],
                ['Cronulla Beach', -6.303155,106.886533, 3]                
            ];

          var map = new google.maps.Map(document.getElementById('js-map-around'), {
            zoom: 10,
            center: new google.maps.LatLng(-33.92, 151.25),
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });

          var infowindow = new google.maps.InfoWindow();

          var marker, i;

          for (i = 0; i < locations.length; i++) { 
            Map.markers = new google.maps.Marker({
              position: new google.maps.LatLng(locations[i][1], locations[i][2]),
              map: map
            });

            google.maps.event.addListener(Map.markers, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, Map.markers);
              }
            })(Map.marker, i));
      }
    },
    getLocation :   function(o,f){
                        
        var $this = this;
        
        var lat = parseFloat(Map.property.lat);
        var long = parseFloat(Map.property.long);
                                
        if(!isNaN(lat) && !isNaN(long)){

            $('#'+o).css({
               width    :   '100%',
               height   :   '300'                  
            }).show();
            
            f();
            
        }

    },
    findNearest :   function(what,a,b){                        
        var $this=this;
        
        var url=null;
        
        switch(what){
            
            case    "venues":
                
                url=Request.Venues.findByRangeCoordinate(Map.property.lat,Map.property.long,'json');
                
            break;
            default :   
                Component.create.jbox.notif("Opps..","Venue apa yang Anda cari?",false);
            break;
        }
        
        
        Request.do('GET',url,function(){
            
            Map.near.push(Request.response);
                                       
            $this.displayNear(Request.response); //gaperlu
                            
            console.log(Map.near);
            Map.setNear();           

        });
    },
    calcDistance: function(p1, p2) {
      return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
    },
    showInfo :function(latlng) {
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'latLng': latlng
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    // here assign the data to asp lables
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].types[0] === "locality") {
                            Map.property.city       =   results[i].address_components[0].long_name;
                            Map.property.state      =   typeof results[i].address_components[2].long_name != 'undefined'?results[i].address_components[2].long_name:'-';
                            Map.property.country    =   results[i].address_components[3].long_name;
                            Map.property.place_id   =   results[i].place_id;
                            Map.property.image   =   "https://maps.googleapis.com/maps/api/staticmap?center="+results[i].formatted_address+"&zoom=14&size=400x400";
                        }
                    }
                } else {
                    alert('No results found');
                }
            } else {
                alert('Geocoder failed due to: ' + status);
            }
        });
    },
    multiMarker : function(venue){
        var $this = this;
        var lat = parseFloat(Map.property.lat);
        var long = parseFloat(Map.property.long);   
        var infoWindow = new google.maps.InfoWindow();
        var map = new google.maps.Map(document.getElementById('js-map'), {
            center: {lat: lat, lng: long},
            zoom: 13
        }); 
        var markers = [];
        marker = markers.push(new google.maps.Marker({
            map: map,
            position: {lat: lat, lng: long},
            icon        : Global.BASE_ASSETS()+"images/current.png",
        }));
        var totalVanues = 0;
        var i,tot,totlatlng;
        
        $.each(venue.data,function(i,e){
            var p1 = new google.maps.LatLng(lat, long);
            var p2 = new google.maps.LatLng(e.lat,e.lang); 
            var latDb = parseFloat(e.lat);
            var longDb = parseFloat(e.lang); 
            var data = e;
            totlatlng = $this.calcDistance(p1, p2);
            if(totlatlng <= 3){
                tot = totlatlng;
                totalVanues++;  
                var marker = new google.maps.Marker({
                    position: {lat: latDb, lng: longDb},
                    map: map,
                    title: e.venue_name,
                });
                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        $this.showInfo(marker.position);
                        Map.property.lat        =   e.lat;
                        Map.property.long       =   e.lang;
                        Map.property.location   =   '('+Map.property.lat+','+Map.property.long+')',
                        Map.property.address    =   e.venue_address,
                        Map.property.venue_name    =   e.venue_name,
                        
                        
                        //set result to textbox
                        $('#js-txt-lat').val(e.lat);
                        $('#js-txt-long').val(e.lang);
                        $('#js-txt-position').val(Map.property.location);
                        $('#js-txt-url-location').val(Map.property.image);                        
                        $('#js-txt-event-venue').val(e.venue_name);
                        $('#js-txt-event-address').val(e.venue_address);
                        
                        console.log(Map.property);
                        // console.log(marker.address_components[1].long_name+'address'+i);
                        infoWindow.setContent(e.venue_name+'<br>'+$this.calcDistance(p1, p2)+' Km dari lokasi Anda');
                        infoWindow.open(map, marker);
                    }
                })(marker, i));
            }
            
        });
        return totalVanues;
    },
    displayNear :function(venue){
        var $this = this;
        var el="";
        var n=1;   
        var lat = parseFloat(Map.property.lat);
        var long = parseFloat(Map.property.long);     
        var totalVanues = $this.multiMarker(venue);
        $this.multiMarker(venue);
                        
        if(venue.status ==1 && Events.onEdit.venueSearchModel==1){                        
            
            el+="<div class='panel panel-default'>";
                el+="<div class='panel-heading'>";
                    el+="Venue Sekitar : "+totalVanues;
                el+="</div>";
                el+="<div class='panel-body' style='width:100%; height:150px; overflow-x:hidden; overflow-y:scroll;'>";

                    el+="<div id='js-map-around' style='margin-bottom:2%;'></div>";

                        el+="<table class='table table-responsive'>";
                            el+="<thead>";
                                el+="<tr>";
                                    el+="<th>";
                                        el+="No";
                                    el+="</th>";
                                    el+="<th>";
                                        el+="Venue";
                                    el+="</th>";
                                    el+="<th>";
                                        el+="Alamat";
                                    el+="</th>";

                                el+="</tr>";
                            el+="</thead>";
                            el+="<tbody>";

                                $.each(venue.data,function(i,e){
                                    
                                    var p1 = new google.maps.LatLng(lat, long);
                                    var p2 = new google.maps.LatLng(parseFloat(e.lat),parseFloat(e.lang)); 
                                    var totlatlng = $this.calcDistance(p1, p2);
                                    if (totlatlng <= 3) {
                                    el+="<tr>";
                                        el+="<td>";
                                            el+=n;
                                        el+="</td>";

                                        el+="<td>";
                                            el+=e.venue_name;
                                        el+="</td>";
                                        el+="<td>";
                                            el+=e.venue_address;
                                        el+="</td>";

                                    el+="</tr>";
                                    n++;
                                    }
                                });

                            el+="</tbody>";                                                
                        el+="</table>";

                el+="</div>";
            el+="</div>";
        
        
            $('#js-map-near').empty().html(el);
        
        }else{
            
            $('#js-map-near').empty();
        }
                
    }
    
}