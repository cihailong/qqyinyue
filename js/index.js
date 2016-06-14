$(function(){
     
    var database =[];
    var makelist = function(){
    	$(database).each(function(i,v){
    		$('<li index="'+i+'" class="li"><strong class="music_name" title="'+v.title+'">'+v.title+'</strong>  <strong class="singer_name" title="'+v.artist+'">'+v.artist+'</strong> <strong class="play_time">'+v.duration+'</strong>  <div class="list_cp">  <strong class="btn_like" title="喜欢" name="" mid="004fQTu016b9W4">   <span>我喜欢</span>   </strong>   <strong class="btn_share" title="分享"> <span>分享</span> </strong>  <strong class="btn_fav" title="收藏到歌单"> <span>收藏</span> </strong>  <strong class="btn_del" title="从列表中删除"> <span>删除</span> </strong></div> </li>)')
    		.appendTo($('#cc'))
    	})
    }
    $.getJSON('/database.json').done(function(data){
    	// console.log(data)
        database = data ;
        makelist();
        $('.open_list span').text(database.length)
    })
/*	var database=[
  {"name":"泡沫","src":"./musics/泡沫.MP3","artisan":"邓紫棋","duration":"4:18"},
  {"name":"何必在一起","src":"./musics/何必在一起.MP3","artisan":"张杰","duration":"4:34"},
  {"name":"烟花易冷","src":"./musics/烟花易冷.MP3","artisan":"周杰伦","duration":"4:23"},
  {"name":"至少还有你","src":"./musics/至少还有你.MP3","artisan":"姚贝娜","duration":"2:00"},
  {"name":"走在冷风中","src":"./musics/走在冷风中.MP3","artisan":"刘思涵","duration":"3:34"},
  ]
     */
    
    
	var  a = $('audio').get(0)
	// console.log(a)
   
// 公用函数
function gongyong(){
    if( a.paused === true){
        a.play()
        $('#btnplay').removeClass('play_bt')
		$('#btnplay').addClass('pause_bt')
     }else{
     	a.pause()
     	$('#btnplay').removeClass('pause_bt')
		$('#btnplay').addClass('play_bt')
     } 
}
// 设置开始和暂停
	$('#btnplay').on('click',function(){
		var src = $('audio').attr('src')
		// console.log(src)
		if( !src ){   //解决和下面歌曲点击的冲突 判断audio属性值src是否为空
			a.src = database[0].filename;
			$('#cc li:nth-child(1)').addClass('play_current')
	 $('#music_name').text(database[0].title)
     $('.singerr_name').text(database[0].artist)
     $('.play_date').text(database[0].duration)
		}
		if( a.paused === true){
			a.play()
		}else{
			a.pause()
		}
	})

	$('#btnplay').on('click',function(){
		if ( $(this).hasClass('play_bt') ){
        $(this).removeClass('play_bt')
		$(this).addClass('pause_bt')
		}else{
			$(this).removeClass('pause_bt')
		    $(this).addClass('play_bt')
		}
	})
//设置进度条的进度
    a.ontimeupdate = function(){
    	var jjtd = ((a.currentTime/a.duration).toFixed(2))*100+'%';
    	$('#spanplaybar').css('width',jjtd)
    	$('#spanprogress_op').css('left',jjtd)
    }
//点击设置音量
    $('#spanvolume').on('click',function(e){
        var yl = (e.offsetX/this.offsetWidth).toFixed(2);
        var yll = (e.offsetX/this.offsetWidth).toFixed(2)*71+'px';
        a.volume = yl;
        // console.log(yll)
    	$('.volume_bar').css('width',yll)
    	$('.volume_op').css('left',yll)
    })
//设置静音和非静音
    var cc = a.volume
    // console.log(cc)
    $('#spanmute').on('click',function(){
    	if( a.volume === 0 ){
            a.volume = cc;
            $('.volume_op').css('left',71)
    	}else{
    	a.volume = 0;    
    	$('.volume_op').css('left',0)		
       }
    })
    $('#spanmute').on('click',function(){
        if ( $(this).hasClass('volume_icon') ){
        $(this).removeClass('volume_icon')
		$(this).addClass('volume_mute')
		}else{
			$(this).removeClass('volume_mute')
		    $(this).addClass('volume_icon')
		}
    })
//点击展开列表
    $('#spansongnum1').on('click',function(){
    	if( $('.play_list_fram').hasClass('style')){
    	    $('.play_list_fram').removeClass('style').animate({opacity: '0'}, "slow");
    	}else{
            $('.play_list_fram').addClass('style').animate({opacity: '1'}, "slow");
        }
    })
//界面展开关闭
   $('.folded_bt').on('click',function(){
   	   if( $('.m_player').hasClass('style')){
    	    $('.m_player').removeClass('style').animate({left: '-548px'}, "slow");
    	}else{
            $('.m_player').addClass('style').animate({left: '0'}, "slow")
    	}
   })
//点击那首唱那首
   var dangqian = 0;
   var bofang = function(){
   	a.play()
   	$('#cc li').removeClass('play_current').eq(dangqian).addClass('play_current')
     $('#music_name').text(database[dangqian].title)
     $('.singerr_name').text(database[dangqian].artist)
     $('.play_date').text(database[dangqian].duration)
	 $('#btnplay').addClass('pause_bt')
   }
   $('#cc').on('click','li',function(){
   	dangqian = $(this).index()
   	a.src = database[dangqian].filename
   	// console.log(dangqian)
   	bofang()
   })
//点击设置播放时间
   $('.player_bar').on('click',function(e){
   	  a.currentTime = a.duration*e.offsetX/this.offsetWidth
   })
   
//唱完一首接下一首
   // a.onended = function(){
   // 	  var cc = $(a).attr('src')
   // 	  var bb;
   //    $(database).each(function(i,v){
   //    	if( cc === v.src){
   //          bb = i
   //          console.log(bb)
   //    	}
   //    	// if( bb>i){
   //    	// 	bb = 0
   //    	// }
   //    	bb += 1;
   //    	console.log(bb)
   //    	return bb
   //    	console.log(bb)
   //    })
   //   a.src = database[bb].filename
   //   gongyong()
   // }
//上一首
  $('#prevbt').on('click',function(){
  	if(dangqian === 0){
  		dangqian = database.length;
  	}
    dangqian -=1
  	a.src = database[dangqian].filename
  	console.log(a.src)
  	bofang()
  })
//下一首
    $('#nextbt').on('click',function(){
    if(dangqian === database.length-1){
  		dangqian = -1;
  	}
  	dangqian +=1
  	a.src = database[dangqian].filename
  	// console.log(a.src)
  	bofang()
  })
//鼠标移上去出现删除
  $('#cc').on('mouseenter mouseleave','li',function(){
  	$(this).toggleClass('play_hover')
  })

})