Number.prototype.formatMoney = function(c, d, t){
var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
    //return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t);
};


String.prototype.ucwords = function(){
    str = this.toLowerCase();
    return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
        function(s){
          return s.toUpperCase();
        });
};


/**
 * Increment operation to selected node.
 * This node will incrementing self value by text selector
 * @param {element} n Element to increment operation
 */
$.fn.incrementHtml = function() {
    $(this).text(
        parseInt($(this).text(), 10) + 1
    );
}


/**
 * Decrement operation to selected node.
 * This node will decrementing self value by text selector
 * @param {element} n Element to decrement operation
 */
$.fn.decrementHtml = function() {
    $(this).text(
        parseInt($(this).text(), 10) - 1
    );
}


function getCurrentTime(id){

    if($('#'+id).length > 0){
        date = new Date;
        year = date.getFullYear();
        month = date.getMonth();
        months = new Array('Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember');
        d = date.getDate();
        day = date.getDay();
        days = new Array('Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu');
        h = date.getHours();
        if(h<10)
        {
            h = "0"+h;
        }
        m = date.getMinutes();
        if(m<10)
        {
            m = "0"+m;
        }
        s = date.getSeconds();
        if(s<10)
        {
            s = "0"+s;
        }
        result = ''+days[day]+', '+d+' '+months[month]+' '+year+' | '+h+':'+m+':'+s;
        document.getElementById(id).innerHTML = result;
        setTimeout('getCurrentTime("'+id+'");','1000');
    }
    return true;
}

function terbilang(oVal,oResult){
    var bilangan=$(oVal).val();
    
    var kalimat="";
    var angka   = new Array('0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0');
    var kata    = new Array('','Satu','Dua','Tiga','Empat','Lima','Enam','Tujuh','Delapan','Sembilan');
    var tingkat = new Array('','Ribu','Juta','Milyar','Triliun');
    var panjang_bilangan = bilangan.length;
     
    /* pengujian panjang bilangan */
    if(panjang_bilangan > 15){
        kalimat = "Diluar Batas";
    }else{
        /* mengambil angka-angka yang ada dalam bilangan, dimasukkan ke dalam array */
        for(i = 1; i <= panjang_bilangan; i++) {
            angka[i] = bilangan.substr(-(i),1);
        }
         
        var i = 1;
        var j = 0;
         
        /* mulai proses iterasi terhadap array angka */
        while(i <= panjang_bilangan){
            var subkalimat = "";
            var kata1 = "";
            var kata2 = "";
            var kata3 = "";
             
            /* untuk Ratusan */
            if(angka[i+2] != "0"){
                if(angka[i+2] == "1"){
                    kata1 = "Seratus";
                }else{
                    kata1 = kata[angka[i+2]] + " Ratus";
                }
            }
             
            /* untuk Puluhan atau Belasan */
            if(angka[i+1] != "0"){
                if(angka[i+1] == "1"){
                    if(angka[i] == "0"){
                        kata2 = "Sepuluh";
                    }else if(angka[i] == "1"){
                        kata2 = "Sebelas";
                    }else{
                        kata2 = kata[angka[i]] + " Belas";
                    }
                }else{
                    kata2 = kata[angka[i+1]] + " Puluh";
                }
            }
             
            /* untuk Satuan */
            if (angka[i] != "0"){
                if (angka[i+1] != "1"){
                    kata3 = kata[angka[i]];
                }
            }
             
            /* pengujian angka apakah tidak nol semua, lalu ditambahkan tingkat */
            if ((angka[i] != "0") || (angka[i+1] != "0") || (angka[i+2] != "0")){
                subkalimat = kata1+" "+kata2+" "+kata3+" "+tingkat[j]+" ";
            }
             
            /* gabungkan variabe sub kalimat (untuk Satu blok 3 angka) ke variabel kalimat */
            kalimat = subkalimat + kalimat;
            i = i + 3;
            j = j + 1;
        }
         
        /* mengganti Satu Ribu jadi Seribu jika diperlukan */
        if ((angka[5] == "0") && (angka[6] == "0")){
            kalimat = kalimat.replace("Satu Ribu","Seribu");
        }
    }
    
    $(oResult).empty().html(kalimat);
    
}

var Global={
    SERVER          :   "local",
    site            :   'evclass',
    AppId           :   'S01.APP.1701.0000002',
    logo            :   function(){
        
        return Global.BASE_ASSETS()+"images/ev-character.png"
    },
    onDebug         :   true,
    _token          :   $('meta[name=csrf-token]').attr('content'),
    timezone        :   "",
    browser         :   {},
    param           :   {},    
    currentModule   :   "",
    lockButton      :   true,
    bitly   :   {
        login       :   "o_4hm5quvv0b",
        apiKey      :   "R_aa6a4346684946258354fc404417819c",
        resultUrl   :   "",
    },
    makeTinyUrl	:	function(param,f){
        var $this=this;
        $.getJSON("http://api.bitly.com/v3/shorten?callback=?",{ 
            "format"    : "json",
            "apiKey"    : $this.bitly.apiKey,
            "login"     : $this.bitly.login,
            "longUrl"   : param.url
        },function(response){    
            
            $this.bitly.resultUrl=response.data.url;
            f();
            
        });
    },
    property    :   {
        profile :   {
            show    :   false
        }
    },
    ratyVal :   0,
    myPublicId    :   function(){
        
        var a = Global.getCookie('myPublicId');
                        
        if(a==null){                        
            
            Request.do('GET',Global.BASE_URL()+"uniqid",function(){
                
                Global.setCookie('myPublicId',Request.response);
                
            });
                        
        }
        
        return Global.getCookie('myPublicId');
    },
    
    _setBrowserActivity : function(activity, f_code){
        Global.browser.f_code = f_code;
        Global.browser.activity_name = activity;
        Global.param.browser = Global.browser;
    },

    menus           :   [
        { text: "homework", expanded: true, children: [
            { text: "book report", leaf: true },
            { text: "algebra", leaf: true}
        ] },
        { text: "buy lottery tickets", leaf: true }
    ],
    data            :   [],
    errors          :   [],
    listChk         :   [],
    listStatusEmp :   [],
    lat :   null, //latitude
    long :   null, // longitude,
    location    :   null,
    currentSecond   :   0,
    minuteBooking   :   10,
    client  :   {
        'country'   :   null,
        'city'      :   null,
        'address'   :   null,
        'postcode'   :   null,
    },
    setMenus    :   function(d,f){
        var $this = this;

        $this.menus=[
            { text: "homework", expanded: true, children: [
                { text: "book report", leaf: true },
                { text: "algebra", leaf: true}
            ] },
            { text: "buy lottery tickets", leaf: true }
        ];

        f();
    },
    path    :   {
        event   :   {
            thumb   :   BASE_URL+"/cdn/images/events/cover/thumb/",
            cover   :   BASE_URL+"/cdn/images/events/cover/",
            logo    :   BASE_URL+"/cdn/images/events/logo/"
        },
        group   :   {
            thumb   :   BASE_URL+"/cdn/images/company/cover/thumb/",
            cover   :   BASE_URL+"/cdn/images/company/cover/",
            logo    :   BASE_URL+"/cdn/images/company/logo/"
        },
    },
    config  :   {
        act :   null,
        ServerId    :   "S01",
        AppId       :   "S01.APP.1701.0000002",
        AppName     :   "EV CLASS",
        Modules :   {
            Booking :   {

            },
            Invoices :   {

            },
            Events :   {

            },
            Medias  :   {

            },
            Master  :   {
                dokumen :   [
                    {id  :   'KTP',value  :   'KTP'},
                    {id  :   'SIM',value  :   'SIM'},
                    {id  :   'NPWP',value  :   'NPWP'},
                    {id  :   'other',value  :   'Lainnya'},
                ],
                renderOpt   :   function(d,o,id){
                    
                    var $this=this;
                    var el="";
                    var selected="";                   
                    
                    
                    if(d.length > 0 && id != null){                              

                        $.each(d,function(i,e){                            
                            
                            if(e.id==id){

                                selected="selected";

                            }else{

                                selected="";
                            }

                            el+="<option value='"+e.id+"' "+selected+">"+e.value+"</option>";
                        });
                        
                        $(o).empty().html(el);
                    }
                    
                                                            
                }
            }
        },
        image   :   {
            background  :   {
                name    :   null,
                width   :   0,
                height  :   0
            },
            logo  :   {
                name    :   null,
                width   :   0,
                height  :   0
            },
            avatar  :   {
                name    :   null,
                width   :   0,
                height  :   0
            },
            validateSize    :   false
        }
    },    
    now :   function(){
        
        return new Date().toLocaleString(); 
    },
    format  :   {
        text    :   {
            step    :   [
                '','pertama','kedua','ketiga','keempat','kelima','keenam','ketujuh','kedelapan','kesempbilan','kesepuluh'
            ]
        }
    },
    getYear :   function(){
        
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return year;

        
    },
    getNow  :function(){
        
        var date,month,year,months,d,day,days,h,m,s;
        
        date = new Date;
        year = date.getFullYear();
        month = date.getMonth();
        months = new Array('Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember');
        d = date.getDate();
        day = date.getDay();
        days = new Array('Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu');
        h = date.getHours();
        if(h<10)
        {
            h = "0"+h;
        }
        m = date.getMinutes();
        if(m<10)
        {
            m = "0"+m;
        }
        s = date.getSeconds();
        if(s<10)
        {
            s = "0"+s;
        }
        
        return ''+days[day]+', '+d+' '+months[month]+' '+year+' | '+h+':'+m+':'+s;
        
    },
    formatDateEngToIndo :   function(s){
        var a = s.split('-');
        var m = "January";
        
        
        switch(a[1]){
            case    "1":
                m="Januari";
            break;
            case    "2":
                m="Februari";
            break;
            case    "3":
                m="Maret";
            break;
            case    "4":
                m="April";
            break;
            case    "5":
                m="Mei";
            break;
            case    "6":
                m="Juni";
            break;
            case    "7":
                m="Juli";
            break;
            case    "8":
                m="Agustus";
            break;
            case    "9":
                m="September";
            break;
            case    "10":
                m="Oktober";
            break;
            case    "11":
                m="November";
            break;
            case    "12":
                m="Desember";
            break;
        }
        
        return a[2]+" "+m+" "+a[0];
        
    },
    dateToIndo   :function(){
        
        var days = [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
        ];
        
        var months = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];
        
        var date = new Date();
        var day = date.getDay();
        var dt = date.getDate();
        var month = months[date.getMonth()];
        var year = date.getFullYear();
        
        
        return days[day]+", "+dt+" "+month+" "+year;
                
        
    },
    formatDate  :   function (date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    
    },
    formatTime  :   function(){
      
        function checkTime(i) {
            return (i < 10) ? "0" + i : i;
        }

        var today = new Date(),
            h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            s = checkTime(today.getSeconds());
    
            return h + ":" + m + ":" + s;
    },
    default :   function(){
        var $this = this;

        this.image   =   {
            background  :   $this.BASE_ASSETS()+"images/bg-gold.jpg",
            logo        :   $this.BASE_ASSETS()+"images/add-logo.jpg",
            avatar      :   $this.BASE_ASSETS()+"images/icon-avatar.png",            
        }
        return this.image;
    },
    file    :   {
        blob    :   null,
        ext     :   null,
        width   :   0,
        height  :   0,
        size    :   0
    },
    maxFileSize :   5,//MB
    allowedSize :   false,
    clk         :   false,
    clk0       :   function(){
                        
        var w = window.location;
        var p = w.protocol;
        var a = w.pathname;    
        var d = w.hostname
        
        var x=d=='everyvents.com'?true:false;
        
        return x
    

    },
    BASE_URL        :   function (){
        
        return BASE_URL+"/";
    },
    BASE_ASSETS :   function(){
        var $this = this;
        return $this.BASE_URL()+"assets/";

    },
    BASE_CDN :   function(){
        var $this = this;
        return $this.BASE_URL()+"cdn/front/";

    },
    BASE_CDN_BACK :   function(){
        var $this = this;
        return $this.BASE_URL()+"cdn/back/";

    },
    BASE_UI :   function(){
        var $this = this;
        return $this.BASE_ASSETS()+"lib/EV";

    },
    BASE_APP :   function(){
        var $this = this;
        return $this.BASE_ASSETS()+"lib/EV/app";

    },
    CDN         :   function (){
        var $this=this;

        return $this.BASE_URL()+"cdn/";
    },
    cekConsole  :   function(){
        var $this=this;

        if(!$this.onDebug){
            $this.clearConsole();
        }
    },
    cleanUrl    :   function(s){
        var $this=this;
        var char = "-";
        s   =   s.split(" ").join(char);

        return s.toLowerCase();
    },
    onForm      :   false,
    modules :   [
        {module:'',name:'Country',api:true},
        {module:'',name:'Region',api:false},
        {module:'',name:'Timezone',api:false},
        {module:'',name:'Bank',api:false},
        {module:'',name:'Component',api:true},
        {module:'',name:'Member',api:true},
        {module:'',name:'Events',api:true},
        {module:'',name:'Tickets',api:true},
        {module:'',name:'Comments',api:true},
        {module:'',name:'Following',api:true},
        {module:'',name:'Likes',api:true},
        {module:'',name:'Payment',api:true},
        {module:'',name:'Reviews',api:true},
        {module:'',name:'Booking',api:true},
        {module:'',name:'Invoices',api:true},
        {module:'',name:'Search',api:true},

    ],
    checkMime   :   function(s,holder){
                
        var x=[];
        holder = typeof holder=='undefined'?'other':holder;                
        
        switch(holder){
            case     "fileholder-payment":
                x=["png","PNG","gif","jpg","JPG","jpeg","JPEG"];
            break
            case     "fileholder-profile":
                x=["png","PNG","gif","jpg","JPG","jpeg","JPEG"];
            break
            case     "fileholder-achievement":
                x=["png","PNG","gif","jpg","JPG","jpeg","JPEG"];
            break
            default :
                x=["png","PNG","gif","jpg","JPG","jpeg","JPEG","pdf","doc","docx","xlsx","xls","txt","css"];
            break;
        }
        
        var r= false;

        for(var i=0;i < x.length;i++){
            if(s==x[i]){
                r=true;
                break;
            }
        }

        return r;
    },
    isImage :function(s){
        
        var x=["png","PNG","gif","jpg","JPG","jpeg","JPEG"];
        var r= false;

        for(var i=0;i < x.length;i++){
            if(s==x[i]){
                r=true;
                break;
            }
        }

        return r;
        
    },
    initMap : function(lat,long,f){
        var $this=this;
        var latLong = new google.maps.LatLng(lat,long);

        var mapOptions = {
            center      : latLong,
            mapTypeId   : google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"),mapOptions);

        var marker = new google.maps.Marker({
            position    :   latLong,
            map         :   map
        });

        marker.setMap(map);
        map.setZoom(8);
        map.setCenter(marker.getPosition());

        $this.setMyLocation(f);


    },
    findMyLocation  :   function(f){

        var $this = this;

        var geoSuccess = function(position) {

            $this.lat   = position.coords.latitude;
            $this.long  = position.coords.longitude;

            $this.initMap($this.lat,$this.long,f);

            Global.setCookie('lat',Global.lat);
            Global.setCookie('long',Global.long);

            //for test
            //alert("Client lat : "+Global.lat);
            //alert("Client long : "+Global.long);

        };

        var geoError = function(error) {
          switch(error.code) {
            case error.TIMEOUT:
              // The user didn't accept the callout

            break;

          }
        };

        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

    },
    getOptYear :   function(c){
        var $this=this;
        var el="";
        var checked;                
        
        el+="<option value='' >-- Pilih Tahun --</option>";
        
        for(var i=2017;i > 1950;i--){
            
            checked= i==c?"selected":"";
                        
            el+="<option value="+i+" "+checked+">"+i+"</option>";
            
        }
        
        return el;
        
    },
    getOptYear1 :   function(c){
        var $this=this;
        var el="";
        var checked=""; 
                
                        
        el+="<option value='' >-- Pilih Tahun --</option>";
        
        for(var i=2000;i > 1940;i--){
                                
            if(i==c){
                
                checked="selected";
                
            }else{
                
                checked="";
                
            }
            
            el+="<option value="+i+" "+checked+">"+i+"</option>";
            
        }
        
        return el;
        
    },
    getOptMonth :   function(c){
        var $this=this;
        var el="";
        var selected="";
        var bulan=['','Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
        var loop=1;
        el+="<option value='' >-- Pilih Bulan --</option>";
        
        for(var i=1;i <= 13;i++){
                        
            if(i < 10){
                i = "0"+i;
            }
            
            if(i==c){
                
                selected="selected";
                
            }else{
                
                selected="";
            }
            
            el+="<option value="+i+" "+selected+">"+bulan[loop]+"</option>";
            
            loop++;
            
        }
        
        return el;
        
    },
    
    getOptDate :   function(c){
        var $this=this;
        var el="";
        var selected="";
        
        el+="<option value='' >-- Pilih Tanggal --</option>";
        
        for(var i=1;i < 32;i++){
            
            if(i < 10){
                
                i = "0"+i;
            }
            
            if(i==c){
                
                selected="selected";
                
            }else{
                
                selected="";
            }
            
            
            el+="<option value="+i+" "+selected+">"+i+"</option>";
            
        }
        
        return el;
        
    },
    extractDate :   function(d){
        
        var s= {
                tahun : '2017',
                bulan : '01',
                tanggal : '01'
            }  
            
        var tahun,bulan,tanggal;
                
        
        if(typeof d != 'object'){
            
            s = d.split("-");
        
            s= {
                tahun : s[0],
                bulan : s[1],
                tanggal : s[2]
            }        
                
            
        }
        
        return s;
        
        
    },
    setYear :   function(o,c){
        
        var year = Global.getOptYear(c);
        
        $(o).empty().html(year);      
    },
    setYear1 :   function(o,c){
        
        var year = Global.getOptYear1(c);
        
        $(o).empty().html(year);      
    },
    setMonth :   function(o,c){
        
        var month = Global.getOptMonth(c);
        
        $(o).empty().html(month);      
    },
    setDate :   function(o,c){
        
        var date = Global.getOptDate(c);
        
        $(o).empty().html(date);      
    },
    getMyBrowser :   function(){
                
        var $this = this;
        $this.browser={};

        var ua = navigator.userAgent;
        var info = {
                browser : /Edge\/\d+/.test(ua) ? 'ed' : /MSIE 9/.test(ua) ? 'ie9' : /MSIE 10/.test(ua) ? 'ie10' : /MSIE 11/.test(ua) ? 'ie11' : /MSIE\s\d/.test(ua) ? 'ie?' : /rv\:11/.test(ua) ? 'ie11' : /Firefox\W\d/.test(ua) ? 'ff' : /Chrom(e|ium)\W\d|CriOS\W\d/.test(ua) ? 'gc' : /\bSafari\W\d/.test(ua) ? 'sa' : /\bOpera\W\d/.test(ua) ? 'op' : /\bOPR\W\d/i.test(ua) ? 'op' : typeof MSPointerEvent !== 'undefined' ? 'ie?' : '',
                os      : /Windows NT 10/.test(ua) ? "win10" : /Windows NT 6\.0/.test(ua) ? "winvista" : /Windows NT 6\.1/.test(ua) ? "win7" : /Windows NT 6\.\d/.test(ua) ? "win8" : /Windows NT 5\.1/.test(ua) ? "winxp" : /Windows NT [1-5]\./.test(ua) ? "winnt" : /Mac/.test(ua) ? "mac" : /Linux/.test(ua) ? "linux" : /X11/.test(ua) ? "nix" : "",
                touch   : 'ontouchstart' in document.documentElement,
                device  : /IEMobile|Windows Phone|Lumia/i.test(ua) ? 'mobile' : /iPhone|iP[oa]d/.test(ua) ? 'mobile' : /Android/.test(ua) ? 'mobile' : /BlackBerry|PlayBook|BB10/.test(ua) ? 'mobile' : /Mobile Safari/.test(ua) ? 'mobile' : /webOS|Mobile|Tablet|Opera Mini|\bCrMo\/|Opera Mobi/i.test(ua) ? 'mobile' : 'pc',
                mobile  : /IEMobile|Windows Phone|Lumia/i.test(ua) ? 'Windows Mobile' : /iPhone|iP[oa]d/.test(ua) ? 'Iphone' : /Android/.test(ua) ? 'Android' : /BlackBerry|PlayBook|BB10/.test(ua) ? 'Blackberry' : /Mobile Safari/.test(ua) ? 'Mobile Safari' : /webOS|Mobile|Tablet|Opera Mini|\bCrMo\/|Opera Mobi/i.test(ua) ? 'Mobile Tablet Opera' : 'pc',
                tablet  : /Tablet|iPad/i.test(ua),
        };

        $this.browser.device_type   =   info.device;
        $this.browser.browser_name  =   info.browser;
        $this.browser.os_name       =   info.os;
        $this.browser.os_touch      =   info.touch;
        $this.browser.os_mobile     =   info.mobile;
        $this.browser.os_tablet     =   info.tablet;


    },
    getMyLocation   :   function(){
        var $this = this;

        $.getJSON('//ipapi.co/json/', function(data) {

            $this.browser.os_asn = data.asn;//provider
            $this.browser.os_provider = data.org;//provider
            
            $this.browser.ip = data.ip;
            $this.browser.city = data.city;
            
            $this.browser.region_code = data.region_code;
            $this.browser.region_name = data.region;            
            
            $this.browser.country_code = data.country;
            $this.browser.country_name = data.country_name;
            
            $this.browser.lat = data.latitude;
            $this.browser.long = data.longitude;
            
            $this.browser.created_by = Global.getCookie('myId')!= null ? Global.getCookie('myId'):"public";
            $this.browser.updated_by = Global.getCookie('myId')!= null ? Global.getCookie('myId'):"public";
            $this.timezone = data.timezone;
            
            if(page=='index'){
                
                Request.do('GET',Global.BASE_URL()+"evn/position/"+data.latitude+"/"+data.longitude,function(){
            
                    var search = Request.response.country; //get like with jakarta
                    //$('.js-spn-city').text(search);
                    
                    Request.do('GET',Global.BASE_URL()+"evn/search/"+search,function(){
                        
                        Render.events.location(Request.response,'.js-div-event-location');
                        
                    });
                    
                });
                                
            }

        });
                

    },
    setMyLocation   :function(f){

        var $this=this;

        $.getJSON("http://nominatim.openstreetmap.org/reverse?format=json&lat="+$this.lat+"&lon="+$this.long+"&zoom=18",function(r){

            var city;

            if(r.address.city != 'undefined'){
                city=r.address.state;
            }else{
                city = r.address.city+" , "+r.address.state;
            }


            $this.client.address = r.display_name;
            $this.client.country = r.address.country;
            $this.client.city = city;
            $this.client.postcode = r.address.postcode;
                        
            f();

        });


    },
    prepareUpload :   function(o,holder,cnf,t){

        var $this = this;        
                      
        $this.showFile(o,holder,t);
                
        
        $this.config.act                    =   cnf != null?cnf.config_act:null;
        $this.config.image.background.name  =   cnf != null?cnf.background.config_name:null;
        $this.config.image.logo.name        =   cnf != null?cnf.logo.config_name:null;        
        $this.config.image.avatar.name      =   cnf != null?cnf.avatar.config_name:null;        
        $this.config.image.validateSize     =   cnf != null?cnf.validateSize:null;        
                
        
    },
    showFile   :   function(o,holder,t){        
        var $this=this;
        var t;        
                                       
        $("#"+o).on('change', function () { 
                        

            //Get count of selected files
            var countFiles = $(this)[0].files.length;

            var filePath = $(this)[0].value;
            
            var ext = filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase();
                        
            var allowedMime=$this.checkMime(ext,holder);
            
            var fileHolder = $('#'+holder);
                                      
            
            if(allowedMime){

                if (typeof (FileReader) != "undefined") {

                    for (var i = 0; i < countFiles; i++) {

                        var reader = new FileReader();
                        reader.onload = function (e) {
                                                        
                            
                            if(
                                ext=='jpg' ||
                                ext=='JPG' ||
                                ext=='png' ||
                                ext=='PNG' ||
                                ext=='jpeg'||
                                ext=='JPEG'||
                                ext=='gif' ||
                                ext=='GIF' ||
                                ext=='ico'
                            ){
                                var img= "<img id='img-result' class='js-img-result' src='"+e.target.result+"' style='height:auto;  width:100%;' />";

                                $("<img />", {
                                    "id"    :   "img-preview",
                                    "src"   :   e.target.result,
                                    "class" :   "thumb-image",
                                    "css"   :   {
                                        width   :'100%',                                        
                                    }

                                })                                
                                .load(function(){
                                    
                                    var file=this;

                                    $this.getFileSize(o,function(){                                                                                
                                        
                                        $this.cekConfig(t,function(){                                                                                        

                                            $this.file.blob     = e.target.result;
                                            $this.file.ext      = ext,
                                            $this.file.width    = file.naturalWidth;
                                            $this.file.height   = file.naturalHeight;
                                                                                        
                                            if($this.file.size < $this.maxFileSize){

                                                var secWidth,secHeight ;
                                                        
                                                switch(t){
                                                    case    "background":
                                                        
                                                        secWidth = $this.config.image.background.width;
                                                        secHeight = $this.config.image.background.height;
                                                        
                                                    break;
                                                    case    "logo":
                                                        
                                                        secWidth = $this.config.image.logo.width;
                                                        secHeight = $this.config.image.logo.height;
                                                        
                                                    break;
                                                    case    "avatar":
                                                        
                                                        secWidth = $this.config.image.avatar.width;
                                                        secHeight = $this.config.image.avatar.height;
                                                        
                                                    break;                                                   
                                                }
                                                                                                        
                                                if(Global.config.image.validateSize){
                                                    
                                                    var allowed = false;
                                                    
                                                    if($this.file.width == secWidth){

                                                        allowed = true;

                                                        if($this.file.height == secHeight){

                                                            allowed = true;

                                                        }else{

                                                            allowed = false;

                                                        }

                                                    }else{

                                                        if(Request.data != null){

                                                            allowed = false;

                                                        }else{

                                                            allowed = true;//no config

                                                        }

                                                    }
                                                
                                                    
                                                }else{
                                                    
                                                    allowed=true;
                                                    
                                                }
                                                
                                               
                                                if(allowed){
                                                    
                                                    $('#'+holder).empty().html(img);                                                    

                                                                                                        
                                                    Global.param.id         =   $('#txtId').val();
                                                    Global.param.images_blob  =   $this.b64EncodeUnicode($this.file.blob);

                                                    Global.param.images_width=$this.b64EncodeUnicode($this.file.width);
                                                    Global.param.images_height=$this.b64EncodeUnicode($this.file.height);
                                                    Global.param.images_size=$this.b64EncodeUnicode($this.file.size);
                                                    Global.param.images_ext=$this.b64EncodeUnicode($this.file.ext);

                                                    
                                                    return false;

                                               }else{
                                                                                                      
                                                    if(Request.data != null){
                                                        
                                                        var x = Global.default();
                                                        
                                                        switch(t){
                                                            case    "background":
                                                                $(fileHolder).find('img').attr('src',x.background);
                                                            break;
                                                            case    "logo":
                                                                $(fileHolder).find('img').attr('src',x.logo);
                                                            break;
                                                            case    "avatar":
                                                                $(fileHolder).find('img').attr('src',x.avatar);
                                                            break;                                                   
                                                        }

                                                        Component.create.notify('Notifikasi',
                                                            "Image must : "+secWidth+" x "+secHeight,
                                                            true);
                                                    }

                                                    return false;

                                               }

                                            }else{

                                                if(Request.data != null){
                                                    
                                                    var x = Global.default();
                                                    
                                                    switch(t){
                                                        case    "background":
                                                            $(fileHolder).find('img').attr('src',x.background);
                                                        break;
                                                        case    "logo":
                                                            $(fileHolder).find('img').attr('src',x.logo);
                                                        break;
                                                        case    "avatar":
                                                            $(fileHolder).find('img').attr('src',x.avatar);
                                                        break;                                                   
                                                    }
                                                    

                                                    Component.create.notify('Notifikasi',msg,true);
                                                    
                                                }else{

                                                    Component.create.notify('Notifikasi',"File is must less than "+$this.maxFileSize+" MB",true);
                                                }

                                            }

                                        });
                                    });

                                    
                                });

                            }else{
                                console.log('upload dokumen');
                                Component.create.jbox.notif('Opps..','Jenis file '+ext,false);
                                
                            }
                        }

                        reader.readAsDataURL($(this)[0].files[i]);
                    }

                } else {

                    Component.create.jbox.notif('Opps..','File yang Anda unggah tidak diperbolehkan!',false);

                    return false;
                }
            }else{
                
                Component.create.jbox.notif('Opps..','File yang Anda unggah tidak diperbolehkan!',false);

                return false;
            }
        });
    },
    checkIE : function (){

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){
            // If Internet Explorer, return version number
            //alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
            console.log(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
            return true;

        } else {
            // If another browser, return 0
            console.log('it is not IE ');
            return false;
        }

    },
    getFileSize : function (o,f) {
        var $this = this;

        try {

            var fileSize = 0;
            
            if($this.checkIE()) {
                var objFSO = new ActiveXObject("Scripting.FileSystemObject"); var filePath = $("#" + o)[0].value;
                var objFile = objFSO.getFile(filePath);
                var fileSize = objFile.size; //size in kb
                fileSize = fileSize / 1048576; //size in mb

            }else {

                fileSize = $("#" + o)[0].files[0].size //size in kb
                fileSize = fileSize / 1048576; //size in mb
            }

            $this.file.size = fileSize;            

            f();

        }catch (e) {

            console.log("Error is :" + e);

            return false;
        }

    },
    b64EncodeUnicode :  function(str) {
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1){
            return String.fromCharCode('0x' + p1);
        }));
    },
    b64DecodeUnicode : function(str) {
            return atob(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    },    
    renderEmptyRecord   :   function(t,s){
        return "<div class='alert alert-"+t+"'>"+s+"</div>";
    },
    replaceNull :   function(s){
        var str = s==null || s=='null'?"-":s;
        return str;
    },
    iCheck    :   function () {
        
        if (!$().iCheck)  return;
        $(':checkbox:not(.js-switch, .switch-input, .switch-iphone, .onoffswitch-checkbox, .ios-checkbox), :radio').each(function() {

            var checkboxClass = $(this).attr('data-checkbox') ? $(this).attr('data-checkbox') : 'icheckbox_minimal-grey';
            var radioClass = $(this).attr('data-radio') ? $(this).attr('data-radio') : 'iradio_minimal-grey';

            if (checkboxClass.indexOf('_line') > -1 || radioClass.indexOf('_line') > -1) {
                $(this).iCheck({
                    checkboxClass: checkboxClass,
                    radioClass: radioClass,
                    insert: '<div class="icheck_line-icon"></div>' + $(this).attr("data-label")
                });
            } else {
                $(this).iCheck({
                    checkboxClass: checkboxClass,
                    radioClass: radioClass
                });
            }
        });
    },
    convertMonthToEng   :   function(x){
        var $this=this;

        var a   = x.split(' ');
        var b   = a[0].split('-');

        return b[2]+"-"+$this.convertMonthToNumeric(b[1])+"-"+b[0];

    },
    convertMonthToNumeric   :   function(s){

        var z;

        switch(s){

            case    "Jan":
                z=1;
            break;
            case    "Feb":
                z=2;
            break;
            case    "Mar":
                z=3;
            break;
            case    "Apr":
                z=4;
            break;
            case    "May":
                z=5;
            break;
            case    "Jun":
                z=6;
            break;
            case    "Jul":
                z=7;
            break;
            case    "Aug":
                z=8;
            break;
            case    "Sep":
                z=9;
            break;
            case    "Oct":
                z=10;
            break;
            case    "Nov":
                z=11;
            break;
            case    "Dec":
                z=12;
            break;

        }

        return z;
    },
    convertMonthToString   :   function(s){

        var z;

        switch(s){

            case    "01":
                z="Jan";
            break;
            case    "02":
                z="Feb";
            break;
            case    "03":
                z="Mar";
            break;
            case    "04":
                z="Apr";
            break;
            case    "05":
                z="Mei";
            break;
            case    "06":
                z="Jun";
            break;
            case    "07":
                z="Jul";
            break;
            case    "08":
                z="Ags";
            break;
            case    "09":
                z="Sep";
            break;
            case    "10":
                z="Okt";
            break;
            case    "11":
                z="Nov";
            break;
            case    "12":
                z="Des";
            break;

            case    "1":
                z="Jan";
            break;
            case    "2":
                z="Feb";
            break;
            case    "3":
                z="Mar";
            break;
            case    "4":
                z="Apr";
            break;
            case    "5":
                z="Mei";
            break;
            case    "6":
                z="Jun";
            break;
            case    "7":
                z="Jul";
            break;
            case    "8":
                z="Ags";
            break;
            case    "9":
                z="Sep";
            break;
            case    "10":
                z="Okt";
            break;
            case    "11":
                z="Nov";
            break;
            case    "12":
                z="Des";
            break;

        }

        return z;
    },
    convertDate :   function(d){

        var $this=this;
        console.log(typeof d+": "+d);
        var x = d.split("-");

        var m = $this.convertMonthToNumeric(x[1]);

        return x[2]+"-"+m+"-"+x[0];

    },
    convertDateInd :   function(d){

        var $this=this;
        var x = d.split("-");

        var m = $this.convertMonthToString(x[1]);
        var tgl = x[2].split(" ");
        return tgl[0]+"-"+m+"-"+x[0];

    },
    disabled    :   function(){


    },
    clearConsole    :   function () {
        if(window.console || window.console.firebug) {
            console.clear();
        }
    },
    loadModules  :function(){

        var $this=this;
        var modules={};
        var script;

        try{
            for(var key in $this.modules){
                var name=$this.modules[key]['name'];
                modules.module=$this.modules[key]['module'];
                modules.name=$this.modules[key]['name'];

                script=$this.getScriptName(modules);

                try{
                    if(!$this.isScriptAlreadyIncluded(script)){
                        try{
                            $($this.createScript(modules)).appendTo($('body'));
                        }catch(e){
                            return false;
                        }
                    }
                }catch(e){

                }

                $this.cekConsole();
            }
        }catch(e){

        }

    },
    getScriptName   :   function(m){
        //return 'assets/js/module/'+m.module+'/'+m.name+'.js'; //if have sub folder
        return 'assets/js/modules/'+m.name+'.js';
    },
    isScriptAlreadyIncluded :   function (src){
        var scripts = document.getElementsByTagName("script");
        for(var i = 0; i < scripts.length; i++)
           if(scripts[i].getAttribute('src') == src) return true;
        return false;
    },
    createScript    :   function(m){
        var $this=this;
        var js=document.createElement('script');
            js.type='text/javascript';
            js.async=true;
            //js.src='/js/modules/'+m.module+'/'+m.name+'.js';
            js.src=$this.BASE_ASSETS()+'js/modules/'+m.name+'.js';
        return js;
    },
    sortArrayObjectItems    :   function(property){
        
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }

    },
    groupArrayItem :   function( array , f ){
        var groups = {};
        array.forEach( function( o )
        {
          var group = JSON.stringify( f(o) );
          groups[group] = groups[group] || [];
          groups[group].push( o );
        });
        return Object.keys(groups).map( function( group )
        {
          return groups[group];
        })
    },
    removeArrayItem : function(arr,i) {

        var l=arr.length;
        for(var b=l;b > 0;b--){
            var item=arr.indexOf(i); // return index

            for(var f=0;f <= arr.length;f++){

                if(arr[f]==i){
                    arr.splice(f,1);
                }
            }
        }

        return arr;
    },
    removeArrayIndex : function(arr,i) {

        console.log("remove index : "+i);
        arr.splice(i,1);

        return arr;
    },
    findIndexByObject   :   function(array,attr,value){

        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }

    },
    findObjectElement   :   function(array,value){

        var index = array.map(function(item){
            return item;

        }).indexOf(value);

        return array[index];
    },
    setCookie : function(key, value) {
        var expires = new Date();
        var time=expires.getTime();
        time+=3600 * 1000; //set to 1 hour
        expires.setTime(expires.getTime() + 31536000000); //1 year
        window.localStorage.setItem(key, value);
    },
    getCookie   :   function(key) {
        var value = window.localStorage.getItem(key);
        return value;
    },
    clearCookie :   function(k){
        var $this=this;

        $this.setCookie(k,null);

    },
    checkSession : function(show) {
        var session = this.getCookie('myId') ? this.getCookie('myId') : false;

        if (!session && show && show === true) {
            Component.create.jbox.notif('Opps..', "Anda belum melakukan login!", false);
        }

        return session;
    },
    setSession  :   function(a){

        var $this = this;

        $this.setCookie('myApp',a.data[0]['i_app']);
        $this.setCookie('myId',a.data[0]['id']);
        $this.setCookie('myGroup',a.data[0]['i_group']);
        $this.setCookie('myEmail',a.data[0]['email']);
        $this.setCookie('myToken',a.data[0]['i_token']);
        $this.setCookie('myName',a.data[0]['firstname']);

    },
    clearSession :   function(){
        var $this=this;

        $this.setCookie('myApp',null);
        $this.setCookie('myId',null);
        $this.setCookie('myAvatar',null);
        $this.setCookie('myGroup',null);
        $this.setCookie('myEmail',null);
        $this.setCookie('myToken',null);
        $this.setCookie('myName',null);

    },
    setDataTmp  :   function(arr){

        var $this=this;

        $.each(arr,function(i,e){
            $this.setCookie(i+Global.getCookie('myId'),e);
        });


        return true;
    },
    getDataTemp :   function(){

        var $this=this;

        if($this.getCookie('group_name'+Global.getCookie('myId')) != 'null'){
            if(Global.getCookie('group_name'+Global.getCookie('myId'))!= 'undefined'){

                $('#txtGroupEventName').val($this.getCookie('group_name'+Global.getCookie('myId')));

            }
        }

        if($this.getCookie('group_description'+Global.getCookie('myId')) != 'null'){
            if(Global.getCookie('group_description'+Global.getCookie('myId'))!= 'undefined'){

                $('#txtGroupEventDescription').val($this.getCookie('group_description'+Global.getCookie('myId')));

            }
        }

        if($this.getCookie('group_location'+Global.getCookie('myId')) != 'null'){
            if(Global.getCookie('group_location'+Global.getCookie('myId'))!= 'undefined'){

                $('#txtGroupEventLocation').val($this.getCookie('group_location'+Global.getCookie('myId')));

            }
        }

        if($this.getCookie('group_url'+Global.getCookie('myId')) != 'null'){
            if(Global.getCookie('group_url'+Global.getCookie('myId'))!= 'undefined'){

                $('#txtGroupEventUrl').val($this.getCookie('group_url'+Global.getCookie('myId')));

            }
        }

        if($this.getCookie('group_fb'+Global.getCookie('myId')) != 'null'){
            if(Global.getCookie('group_fb'+Global.getCookie('myId'))!= 'undefined'){

                $('#txtGroupEventFb').val($this.getCookie('group_fb'+Global.getCookie('myId')));

            }
        }

        if($this.getCookie('group_twitter'+Global.getCookie('myId')) != 'null'){
            if(Global.getCookie('group_twitter'+Global.getCookie('myId'))!= 'undefined'){

                $('#txtGroupEventTwit').val($this.getCookie('group_twitter'+Global.getCookie('myId')));

            }
        }

        if($this.getCookie('group_instagram'+Global.getCookie('myId')) != 'null'){
            if(Global.getCookie('group_instagram'+Global.getCookie('myId'))!= 'undefined'){

                $('#txtGroupEventInst').val($this.getCookie('group_instagram'+Global.getCookie('myId')));

            }
        }

    },
    clearDataTmp  :   function(){

        var $this=this;

        $this.setCookie('group_name'+Global.getCookie('myId'),null) ;
        $this.setCookie('group_description'+Global.getCookie('myId'),null) ;
        $this.setCookie('group_location'+Global.getCookie('myId'),null) ;
        $this.setCookie('group_fb'+Global.getCookie('myId'),null) ;
        $this.setCookie('group_twitter'+Global.getCookie('myId'),null) ;
        $this.setCookie('group_instagram'+Global.getCookie('myId'),null) ;
        $this.setCookie('group_url'+Global.getCookie('myId'),null) ;

    },
    closeWin    :   function(){

        window.close();

    },
    validateForm    :   function(o){

        var validate = $('#'+o).parsley().validate("first");

        return validate;

    },
    validateNumber    :   function(o){

        var validate = false;

        $(o).keyup(function(){
           if(isNaN($(o).val()) && $(o).val() != ''){

               Component.create.notify('Opps..','Harus mengisi dengan angka!',true);
               $(o).val('');

           }else{
               validate=true;
           }

        });

        return validate;

    },
    validateImage    :   function(w,h){

        var cek = false;

        if(Request.data[0].width==w){

            if(Request.data[0].height==h){

                return true;

            }

        }

        return cek;
    },
    cekConfig  :   function(type,f){
        
        var $this=this;        
        Global.param={};
        
        Global.param.config_act=$this.config.act;
                    
        switch(type){
            
            case    "background":                
                Global.param.config_name=$this.config.image.background.name;                
            break;
            case    "logo":                
                Global.param.config_name=$this.config.image.logo.name;
                
            break;
            case    "avatar":                
                Global.param.config_name=$this.config.image.avatar.name;                
            break;
            
        }       
              
        
        Request.do('POST',Request.config('json'),function(){


        if(Request.response.status ==1){

            switch(type){
                case "background":
                    $this.config.image.background.width = Request.response.data[0]['width'];
                    $this.config.image.background.height = Request.response.data[0]['height'];
                break;
                case "logo":
                    $this.config.image.logo.width = Request.response.data[0]['width'];
                    $this.config.image.logo.height = Request.response.data[0]['height'];
                break;
                case "avatar":                        
                    $this.config.image.avatar.width = Request.response.data[0]['width'];
                    $this.config.image.avatar.height = Request.response.data[0]['height'];
                break;
            }

            f();

        }else{

            Component.create.notify('Opps..','Pengaturan tidak diperbolehkan!');

        }
                                     
        });        
            
    },
    cekParsley : function (id_div,error){

        var messages = '';
        if (error){
            messages = "<span id='msg' style='color:red;'><center>Anda harus memilih salah satu!</center></span>";
            $(id_div).append(messages);
            $(id_div).css('background-color', '#f2dede');

        } else {

            $('#msg').remove();
            $(id_div).css('background-color', '#dff0d8');
        }
    },
    getEditorValue  :   function(){

        return CKEDITOR.instances.editor.getData();

    },
    setEditorValue  :   function(val){
                                
        return CKEDITOR.instances.editor.setData(val);

    },
    setEditor   :   function(){
        
        if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )CKEDITOR.tools.enableHtml5Elements( document );
            
            CKEDITOR.config.height = 150;
            CKEDITOR.config.width = 'auto';
            
        var obj = $('#editor').length;
                                         
        var load = ( function() {
            var wysiwygareaAvailable = isWysiwygareaAvailable(),
                    isBBCodeBuiltIn = !!CKEDITOR.plugins.get( 'bbcode' );

            return function() {

                    var editorElement = CKEDITOR.document.getById('editor');

                    // :(((
                    if ( isBBCodeBuiltIn ) {
                        editorElement.setHtml(
                            'Hello world!\n\n' +
                            'I\'m an instance 1 of [url=http://ckeditor.com]CKEditor[/url].'
                        );
                    }

                    
                    if ( wysiwygareaAvailable ) {

                        CKEDITOR.replace(editorElement,{
                            toolbar: [
                                //{ name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },                                    
                                //{ name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
                                //{ name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'SpecialChar' ] },
                                //{ name: 'tools', items: [ 'Maximize' ] },
                                //{ name: 'document', groups: [ 'mode', 'document', 'doctools' ], items: [ 'Source' ] },
                                //{ name: 'others', items: [ '-' ] },                                    
                                { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Strike', '-', 'RemoveFormat' ] },
                                { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
                                { name: 'styles', items: [ 'Styles', 'Format' ] }                                    
                            ],                                
                        });

                    } else {

                        editorElement.setAttribute( 'contenteditable', 'true' );
                        CKEDITOR.inline( 'editor' );

                        // TODO we can consider displaying some info box that
                        // without wysiwygarea the classic editor may not work.
                    }
            };

            function isWysiwygareaAvailable() {
                // If in development mode, then the wysiwygarea must be available.
                // Split REV into two strings so builder does not replace it :D.
                if ( CKEDITOR.revision == ( '%RE' + 'V%' ) ) {
                    return true;
                }

                return !!CKEDITOR.plugins.get( 'wysiwygarea' );
            }
        } )();

        load();
        
    },
    getEditorEventValue  :   function(){

        return CKEDITOR.instances.editor_event.getData();

    },
    setEditorEventValue  :   function(val){
                
        return CKEDITOR.instances.editor_event.setData(val);

    },
    setEditorEvent   :   function(){
        
        if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )CKEDITOR.tools.enableHtml5Elements( document );
            
            CKEDITOR.config.height = 150;
            CKEDITOR.config.width = 'auto';
            
        var obj = $('#editor').length;
            
            
        console.log(obj);
        
        
                                                
        var load = ( function() {
            var wysiwygareaAvailable = isWysiwygareaAvailable(),
                    isBBCodeBuiltIn = !!CKEDITOR.plugins.get( 'bbcode' );

            return function() {

                    var editorElement = CKEDITOR.document.getById( 'editor_event' );

                    // :(((
                    if ( isBBCodeBuiltIn ) {
                        editorElement.setHtml(
                            'Hello world!\n\n' +
                            'I\'m an instance 1 of [url=http://ckeditor.com]CKEditor[/url].'
                        );
                    }

                    // Depending on the wysiwygare plugin availability initialize classic or inline editor.
                    if ( wysiwygareaAvailable ) {

                        CKEDITOR.replace(editorElement,{
                            toolbar: [
                                //{ name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },                                    
                                //{ name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
                                //{ name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'SpecialChar' ] },
                                //{ name: 'tools', items: [ 'Maximize' ] },
                                //{ name: 'document', groups: [ 'mode', 'document', 'doctools' ], items: [ 'Source' ] },
                                //{ name: 'others', items: [ '-' ] },                                    
                                { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Strike', '-', 'RemoveFormat' ] },
                                { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
                                { name: 'styles', items: [ 'Styles', 'Format' ] }                                     
                            ],                                
                        });

                    } else {

                        editorElement.setAttribute( 'contenteditable', 'true' );
                        CKEDITOR.inline(editorElement);

                        // TODO we can consider displaying some info box that
                        // without wysiwygarea the classic editor may not work.
                    }
            };

            function isWysiwygareaAvailable() {
                // If in development mode, then the wysiwygarea must be available.
                // Split REV into two strings so builder does not replace it :D.
                if ( CKEDITOR.revision == ( '%RE' + 'V%' ) ) {
                    return true;
                }

                return !!CKEDITOR.plugins.get( 'wysiwygarea' );
            }
        } )();

        load();
        
    },
    clearForm   :   function(o){
        $("input:not("+o+")[type=text] ").val("");
        $('input[type=password]').val("");
    },
    prepareBtnPost :   function(o){
        $(o).prop('disabled','disabled').text('Memproses...');
        $(o).addClass('disabledanchor');
    },
    afterBtnPost :   function(o,t){
        
        $(o).removeProp('disabled').text(t);
        $(o).removeClass('disabledanchor');
        Global.param.browser={};
        Global.param.images_blob = "";
        
    },
    checkBrowser    :   function(){

        var $this=this;
        var browser=null;

        if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ){
            browser='Opera';
        }else if(navigator.userAgent.indexOf("Chrome") != -1 ){
            browser='Chrome';
        }else if(navigator.userAgent.indexOf("Safari") != -1){
            browser='Safari';
        }else if(navigator.userAgent.indexOf("Firefox") != -1 ) {
            browser='Firefox';
            
        }else {
            browser='unknown';
        }

        return browser;
    },
    lockPage   :   function(s){

        var div="<div class='alert alert-warning' style='margin-top:15%;'><center>"+s+"</center></div>";

        $('body').empty().append(div);
    },
    setCountDown    :   function(m,s,f){
        $('.simple-timer').simpletimer({
            day             : 1,
            dayDom          : '.timer-day',
            hour            : 0,
            hourDom         : '.timer-hour',
            minute          : m,
            minuteDom       : '.timer-minute',
            second          : s,
            secondDom       : '.timer-second',
            millisecond     : 0,
            millisecondDom  : '.timer-millisecond',
            blank           : 100,
            pause           : '#pause_btn',
            pauseFun        : function () {

                console.log('Paused');

            },
            endFun: function (){

                console.log('Finished');
                alert('finished');
            }
	});

        f();
    },
    setTextLocation : function(o,o1) {
        var  $this=this;

        var placeSearch, autocomplete;
        var componentForm = {
          txtEventAddress               : 'short_name'
        };

        function initAutocomplete() {
          
          autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById(o)),{types: ['geocode']});
         
            autocomplete.addListener('place_changed', fillInAddress);

        }

        function fillInAddress() {            
            
            var place = autocomplete.getPlace();

            if (!place.geometry) {

                Component.create.jbox.notif("Opps..","Data venue'" + place.name + " tidak tersedia!'",false);
                return;

            }else{

                
                //get country name
                var country="";

                for(var i = 0; i < place.address_components.length; i += 1) {
                    var addressObj = place.address_components[i];
                    for(var j = 0; j < addressObj.types.length; j += 1) {
                      if (addressObj.types[j] === 'country') {
                        console.log(addressObj.types[j]); // confirm that this is 'country'
                        country=addressObj.long_name; // confirm that this is the country name
                      }
                    }
                  }

                //EVENT
                
                console.log(place);

                
                //set ke property Map.js
                 
                //set ke property Map.js
                 
                Map.property.venue_name        =   typeof $('#js-txt-event-venue').val()!='null'?$('#js-txt-event-venue').val():'';
                Map.property.lat        =   place.geometry.location.lat();
                Map.property.long       =   place.geometry.location.lng();
                Map.property.city       =   place.address_components[1].long_name;
                Map.property.state      =   typeof place.address_components[2] != 'undefined'?place.address_components[2].long_name:'-';
                Map.property.country    =   country;
                Map.property.place_id   =   place.place_id;
                Map.property.image      =   "https://maps.googleapis.com/maps/api/staticmap?center="+place.formatted_address+"&zoom=14&size=400x400";
                Map.property.location   =   place.geometry.location,
                Map.property.address    =   place.formatted_address;
                
                //set result to textbox
                $('#js-txt-lat').val(Map.property.lat);
                $('#js-txt-long').val(Map.property.long);
                $('#js-txt-position').val(Map.property.location);
                $('#js-txt-url-location').val(Map.property.image);                        
                $('#js-txt-event-venue').val(Map.property.venue_name);
                $('#js-txt-event-address').val(Map.property.address);
                
                console.log(place);
                
                if($('#js-map').length > 0){ //for event only
                    Map.getLocation('js-map',function(){

                    });
                    
                    Map.findNearest('venues',Map.property.lat,Map.property.long);
                    
                }else{//selain event
                    
                    if(typeof o1 != undefined){
                        
                        Map.viewDefault(o1,function(){
                            
                        });                                                      
                    }
                    
                }
                                

            }
        }

        // Bias the autocomplete object to the user's geographical location,
        // as supplied by the browser's 'navigator.geolocation' object.
        function geolocate() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
              });
              autocomplete.setBounds(circle.getBounds());
            });
          }
        }

        initAutocomplete();

    },    
    showFbLoader    :   function(){
        $('#js-fb-loader').show();
    },
    showFbLoader1    :   function(o){
        
        var el="";
        el+="<div class='overlay'>";
            el+="<center class='js-fb-loader'>";
                el+="<img src='"+Global.BASE_ASSETS()+"images/fb-loader.gif' style='width:75px;height:50px;'/>";
            el+="</center>";
        el+="</div>";
        
        $(o).append(el);
        
        $('.overlay').show();
        
        setTimeout(function(){
            $('.js-fb-loader').hide();
        },'1000');
    },
    onLoad  :   function(){
        $('body').css({
            cursor  :   'wait'
        });
    },
    onUnLoad  :   function(){
        $('body').css({
            cursor  :   'default'
        });
    },
    showLoader  :   function(){
        var $this=this;
        //$this.onLoad();
        $('body').oLoader({
            backgroundColor : '#ccc',
            text            :   'Processing ..',
            effect          :   'doornslide',            
            image           : Global.BASE_ASSETS()+'images/ownageLoader/loader3.gif'            
        });       
    },
    hideLoader  :   function(){
        var $this=this;
        //$this.onUnLoad();
        $('body').oLoader('hide');      
    },
    hideFbLoader    :   function(){
        $('#js-fb-loader').hide();
    },
    showLoaderEventObject   :   function(o){
        var $this = this;

        $(o).text('Saving ...').prop('disabled','disabled');

    },
    hideLoaderEventObject   :   function(t,o){
        var $this = this;

        $(o).text(t).removeAttr('disabled');

    },
    showLoaderOnObject   :   function(o){
        var $this = this;

        var obj = "<img src='"+BASE_URL+"/assets/img/fbloader.gif' style='position:absolute;z-index:1;width:100px;height:100px;align:center;'/>";
        $(o).append(obj);

    },
    getTimerCloseBook    :   function(n){
        var $this=this;

        //for testing reset cookie

        /*
        $this.setCookie('currentSecond',0);
        $this.setCookie('maxSecond',n*60);
        return false;
        */
        

        if(Global.getCookie('onBooking')==null){Global.setCookie('onBooking',1)}

        if(Global.getCookie('onBooking')==1){

            if($this.getCookie('maxSecond')==null || $this.getCookie('maxSecond')==0){

                $this.setCookie('maxSecond',n*60);

            }

            var intervalBooking = setInterval(function(){

                $.getJSON($this.BASE_URL()+"cek-second",function(){

                    if($this.getCookie('currentSecond')==null){$this.setCookie('currentSecond',0)}

                    $this.setCookie('currentSecond',parseInt($this.getCookie('currentSecond'))+1);

                    if(parseInt($this.getCookie('currentSecond')) > parseInt($this.getCookie('maxSecond'))){

                        Component.create.notify('Opps..','Anda belum melengkapi pendaftaran dalam waktu '+Global.minuteBooking,true);

                        //reset
                        $this.setCookie('maxSecond',n*60);
                        $this.setCookie('currentSecond',0);
                        $this.setCookie('onBooking',0);


                        //kill
                        clearInterval(intervalBooking);

                        setInterval(function(){

                            //window.location.href=Global.BASE_URL()+"err/booking";
                            $("#over-book-modal").modal('show');
                            

                        },'2000');


                    }

                });
            },'1000');

        }

    },
    showProgressBar :   function(){
        var $this=this;
        var start = new Date();
        var maxTime = 9000;
        var timeoutVal = Math.floor(maxTime/100);

        $('#js-div_cont_progress').show();

        function updateProgress(p) {
            $('#prg_bar').css({
                width   :   p+"%"
            }).text(p+"%");
        }

        function animateUpdate() {
            var now = new Date();
            var timeDiff = now.getTime() - start.getTime();
            var perc = Math.round((timeDiff/maxTime)*100);

            if (perc <= 100) {

                updateProgress(perc);
                setInterval(animateUpdate, timeoutVal);
                perc++;

            }else{
                
                $('#prg_bar').text('100%').css({
                    width   :   '100%'
                });                

            }

        }

        animateUpdate();

    },
    displaySuccessValidation    :   function(t){
        var $this=this;

        $('#div_cont_progress').hide();
        $('#div_cont_error_validation').hide();

        Component.create.notify('Selamat..','Acara Anda sudah dipublikasikan!',true);

    },
    displayErrors    :   function(o){
        var $this=this;
        var el="";

        el+="<div class='alert alert-danger'>"
            el+="<h4 id='lblCountError'></h4>";
            el+="<ul style='color:#FF9900;'>";                

            if($this.errors.length ==1){

                el+="<li><span class='glyphicon glyphicon-remove'></span> "+$this.errors[0]+"</li>";

            }else{

                el+="<li><span class='glyphicon glyphicon-remove'></span> "+$this.errors[$this.errors.length-1]+"</li>";

            }

            el+="</ul>";
        el+="</div>";
        $(o).append(el).show();


    }
}