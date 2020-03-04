var Rating = {
    init    :   function(){
        $('.readOnly').raty({ readOnly: true, score: 3.5 });
        $('.actionStar').raty({ half: true }); // Default Course Review
    }
}