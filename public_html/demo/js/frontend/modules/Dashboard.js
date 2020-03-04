var Dashboard={
    data : [
        {
            scope   :   'booking_by_yearly',
            data    :[
            
                {"elapsed": "2015", "Total": 1000000},
                {"elapsed": "2016", "Total": 2000000},
                {"elapsed": "2017", "Total": 40000},                
            
            ]
        },
        {
            scope   :   'booking_by_monthly',
            data    :[
            
                {"elapsed": "Januari", "Total": 1000000},
                {"elapsed": "Februari", "Total": 2000000},
                {"elapsed": "Maret", "Total": 40000},
                {"elapsed": "April", "Total": 50000},
                {"elapsed": "Mei", "Total": 700000},
                {"elapsed": "Juni", "Total": 800000},
                {"elapsed": "Juli", "Total": 5000000}
            
            ]
        },
        {
            scope   :   'event_by_attendance',
            data    :[
            
                {"elapsed": "Pria", "Total": 1000000},
                {"elapsed": "Wanita", "Total": 2000000},                
            ]
        },
        {
            scope   :   'event_by_city',
            data    :[
            
                {"elapsed": "Jakarta", "Total": 1000000},
                {"elapsed": "Surabaya", "Total": 2000000},
                {"elapsed": "Semarang", "Total": 40000},
                {"elapsed": "Bali", "Total": 50000},
                {"elapsed": "Bandung", "Total": 700000},
                {"elapsed": "Yogyakarta", "Total": 800000},                
            
            ]
        },
        {
            scope   :   'booking_by_browser',
            data    :[
            
                {"elapsed": "Mozilla Firefox", "Total": 1000000},
                {"elapsed": "Gecko / Chrome", "Total": 2000000},
                {"elapsed": "Safari", "Total": 40000},                            
            ]
        },
        {
            scope   :   'event_by_invoice',
            data    :[
            
                {"elapsed": "OASIS 10 - Where Crowds Collide and Music Comes Alive", "Total": 1000000},
                {"elapsed": "We The Fest 2017", "Total": 2000000},
                {"elapsed": "MUSE with special guests Thirty Seconds to Mars", "Total": 40000},
                {"elapsed": "Indonesia Cooking & Food Festival 2017", "Total": 50000},
                {"elapsed": "Jakarta Cooking & Food Festival 2017 ", "Total": 700000},
                {"elapsed": "Food and Hotel Indonesia 2017 is leading international food and hospitality event", "Total": 800000},                
            
            ]
        },
        {
            scope   :   'withdrawl_by_weekly',
            data    :[
            
                {"elapsed": "Minggu 1", "Total": 1000000},
                {"elapsed": "Minggu 2", "Total": 2000000},
                {"elapsed": "Minggu 3", "Total": 40000},                            
                {"elapsed": "Minggu 4", "Total": 15000},                            
            ]
        },
        {
           scope   :   'withdrawl_by_monthly',
            data    :[
            
                {"elapsed": "Januari", "Total": 56765765},
                {"elapsed": "Februari", "Total": 2000000},
                {"elapsed": "Maret", "Total": 40545534000},
                {"elapsed": "April", "Total": 5034534000},
                {"elapsed": "Mei", "Total": 345345345345},
                {"elapsed": "Juni", "Total": 657},
                {"elapsed": "Juli", "Total": 500356470000}
            
            ]
        },
        {
           scope   :   'withdrawl_by_yearly',
            data    :[
            
                {"elapsed": "2014", "Total": 56765765},
                {"elapsed": "2015", "Total": 2000000},
                {"elapsed": "2016", "Total": 40545534000},
                {"elapsed": "2017", "Total": 5034534000},                
            ]
        },
        {
           scope   :   'booking_by_os',
            data    :[
            
                {"elapsed": "Android", "Total": 5643765765},
                {"elapsed": "Apple", "Total": 2000000},
                {"elapsed": "Windows Mobile", "Total": 40545534000},
                {"elapsed": "Window 7", "Total": 5034534000},                
                {"elapsed": "Window 10", "Total": 5034534000},                
            ]
        },
        {
            scope   :   'invoice_by_weekly',
            data    :[
            
                {"elapsed": "Minggu 1", "Total": 1000000},
                {"elapsed": "Minggu 2", "Total": 2000000},
                {"elapsed": "Minggu 3", "Total": 40000},                            
                {"elapsed": "Minggu 4", "Total": 15000},                            
            ]
        },
        {
            scope   :   'invoice_by_event',
            data    :[
            
                {"elapsed": "OASIS 10 - Where Crowds Collide and Music Comes Alive", "Total": 1000000},
                {"elapsed": "We The Fest 2017", "Total": 2000000},
                {"elapsed": "MUSE with special guests Thirty Seconds to Mars", "Total": 40000},
                {"elapsed": "Indonesia Cooking & Food Festival 2017", "Total": 50000},
                {"elapsed": "Jakarta Cooking & Food Festival 2017 ", "Total": 700000},
                {"elapsed": "Food and Hotel Indonesia 2017 is leading international food and hospitality event", "Total": 800000},                
            
            ]
        },
        {
           scope   :   'invoice_by_yearly',
            data    :[
            
                {"elapsed": "2014", "Total": 56765765},
                {"elapsed": "2015", "Total": 2000000},
                {"elapsed": "2016", "Total": 40545534000},
                {"elapsed": "2017", "Total": 5034534000},                
            ]
        },
        {
           scope   :   'invoice_by_monthly',
            data    :[
            
                {"elapsed": "Januari", "Total": 56765765},
                {"elapsed": "Februari", "Total": 2000000},
                {"elapsed": "Maret", "Total": 40545534000},
                {"elapsed": "April", "Total": 5034534000},
                {"elapsed": "Mei", "Total": 345345345345},
                {"elapsed": "Juni", "Total": 657},
                {"elapsed": "Juli", "Total": 500356470000}
            
            ]
        },
        
    ],            
    group  :{
        'institution'  :[
            {section :   'total_trainers',display : 'panel'},            
            {section :   'total_following',display : 'panel'},
            {section :   'total_followers',display : 'panel'},
            {section :   'total_gallery',display : 'panel'},            
            {section :   'total_events',display : 'table'},
        ],
        'trainer'  :[
            {section :   'total_incomes',display : 'panel'},
            {section :   'total_participants',display : 'panel'},        
            {section :   'total_following',display : 'panel'},
            {section :   'total_followers',display : 'panel'},
            {section :   'total_courses',display : 'table'},            
            {section :   'total_gallery',display : 'panel'},
        ],
        'member'  :[
            {section :   'total_invoices',display : 'panel'},            
            {section :   'total_following',display : 'panel'},
            {section :   'total_followers',display : 'panel'},
            {section :   'total_gallery',display : 'panel'},            
            {section :   'total_tickets',display : 'table'},
        ],        
    },
    init    :   function(){
        
        var $this = Dashboard;
        var me = this;
        
        $this.handler();        
                
    },
    handler :   function(){
        
        var $this=this;                
                
        $this.render.default(function(){
            
        });
        
        User.interests.cek(function(){
            
            $('.js-btn-set-interest').off().on('click',function(){
            
                if(User.interests.countInterest()){

                    if(Global.param.interest != undefined){

                        Global.param.i_user = Global.getCookie('myId');
                        User.interests.setInterest(function(){});

                    }else{

                        Component.create.notify("Notification","Please choose at  least 1 category!",true);

                    }
                }

            });

            
        });                
           
        //UPGRADE PROFILE TO TRAINER
        if(Global.getCookie('myGroup')=='S01.USG.1701.0000013'){
            Component.create.jbox.withAction("Untuk menjadi partner silahkan isi biodata anda <a href='#' id='js-upgrade-group'>disini!.</a>");
        }
        
        $('#js-upgrade-group').off().on('click',function(){
            
            Agreement.scope ='dashboard';
            Agreement.beAPartner();

        });
        
        //END
        
        $('.js-opt-dashboard').change(function(){
                
            var a = $(this).find(":selected").val();
            var t = $(this).find(":selected").text();


            $('#js-grafik-title').text(t);

            $this.drawGrapich(a);

        });
                
        
    },
    render  :   {                        
        default :   function(f){
                
            var $this = Dashboard;

            $this.drawGrapich('booking_by_monthly');

            f();

        }
    },
    drawGrapich :   function(d){
        var $this = this;        
        
        $('#graph-1').empty();
        
        $.each($this.data,function(i,e){
                                    
            if($this.data[i].scope == d){
                
                Morris.Line({
                    element   : 'graph-1',
                    data      : this.data,
                    xkey      : 'elapsed',
                    ykeys     : ['Total'],
                    labels    : ['Total'],
                    parseTime : false,
                    preUnits  : 'IDR '
                });
                                
                
            }
        });                
        
    }
}