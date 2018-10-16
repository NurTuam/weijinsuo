(function(){
    function slider(){
        let json = [
            {
                bac:"url(./images/slide_01_2000x410.jpg)",
                img:"./images/slide_01_640x340.jpg"
            },
            {
                bac:"url(./images/slide_02_2000x410.jpg)",
                img:"./images/slide_02_640x340.jpg"
            },
            {
                bac:"url(./images/slide_03_2000x410.jpg)",
                img:"./images/slide_03_640x340.jpg"
            },
            {
                bac:"url(./images/slide_04_2000x410.jpg)",
                img:"./images/slide_04_640x340.jpg"
            }
        ];
        let width = $(window).width();
        let isMobile = true;
        if(width<768){
            isMobile = true;
        }else{
            isMobile = false;
        }
        let html = template("sliderWrapper",{data:json,isMobile});
        $('#inner').html(html);

        let isMove = false;
        let startX = 0;
        let moveX = 0;
        let distanceX = 0;
        $('#inner').on('touchstart',function(e){
            startX = e.originalEvent.touches[0].clientX;
        });
        $('#inner').on('touchmove',function(e){
            moveX = e.originalEvent.touches[0].clientX;
            isMove = true;
        });
        $('#inner').on('touchend',function(e){
            distanceX = moveX - startX;
            if(isMove){
                if(distanceX>0){
                    //前一张
                    $("#wjs_swiper").carousel("prev");
                }else if(distanceX<0){
                    //后一张
                    $("#wjs_swiper").carousel("next");
                }
            }
            isMove = false;
            startX = 0;
            moveX = 0;
            distanceX = 0;
        })
    }
    function hudong(){
        //要实现子元素（ul）在父元素（wjs_product_tabs_parent）中滑动，子元素中内容长度大于父元素的宽度
        let parent = $('.wjs_product_tabs_parent');
        let ul = parent.find('ul');
        let lis = ul.find('li');
        let sum = 0;
        lis.each(function(index,item){
            sum+=$(item).innerWidth();
        });

        ul.width(sum);
        window.wjs.iScroll({
            swipeDom:parent[0],
            swipeType:"x",
            swipeDistance:50
        })

    }
    $(window).on('resize',function(){
        slider();
        hudong()
    }).trigger('resize')

    //es6 解构赋值
    // let name = "zhangsan",age=18;
    // let people = {name,age};
    // let people = {name:"zhangsan",age:18};
    // let name = people.name;
    // let age = people.age;
    // let {name,age} = people;
    // function fn({name,age}){
    //     console.log(name);
    //     console.log(age)
    // }
    // let {name,age} = {name:"lisi",age:15}
    // fn({name:"lisi",age:15})

})();