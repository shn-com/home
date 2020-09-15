let skburl = "https://skb.rongzimishu.com/";

// 分类列表遍历
(function() {
	let classificationarr = [{
			imgurl: skburl+"/static/index/img/newindex/nav/icon_3.png",
			name: "免费升级",
			hrefurl: skburl+"/index/test/upTable"
		},
		{
			imgurl: skburl+"/static/index/img/newindex/nav/icon_1.png",
			name: "空卡还款",
			hrefurl: skburl+"/index/Newplan/allPlankk"
		},
		{
			imgurl: skburl+"/static/index/img/newindex/nav/icon_2.png",
			name: "还款计划",
			hrefurl: skburl+"/index/test/card_repay_plan"
		},
		{
			imgurl: skburl+"/static/index/img/newindex/nav/icon_4.png",
			name: "使用帮助",
			hrefurl: skburl+"/index/Graphic/index"
		},

		{
			imgurl: skburl+"/static/index/img/newindex/nav/na-fee.png",
			name: "付费升级",
			hrefurl: skburl+"/index/vipsys/upvip/uid/19"
		},
		{
			imgurl: skburl+"/static/index/img/newindex/nav/icon_5.png",
			name: "储蓄卡管理",
			hrefurl: skburl+"/index/index/debitcard.html"
		},
		{
			imgurl: skburl+"/static/index/img/newindex/nav/icon_6.png",
			name: "信用卡管理",
			hrefurl: skburl+"/index/index/creditcard.html"
		},
		{
			imgurl: skburl+"/static/index/img/newindex/hb.png",
			name: "花呗支付",
			hrefurl: skburl+"/index/Newreceivables/hbpay"
		},

		// {imgurl:"img/na-1.png",name:"风险评测",hrefurl:""},
		// {imgurl:"img/na-2.png",name:"卡评测",hrefurl:""},
		// {imgurl:"img/na-3.png",name:"信用卡申请",hrefurl:""},
		// {imgurl:"img/na-4.png",name:"云闪付下载",hrefurl:""},
	];
	classificationarr.forEach((ent)=>{
		let a = `
		<a href="${ent.hrefurl}">
			<img src="${ent.imgurl}" >
			<h4>${ent.name}</h4>
		</a>
		`
		$(".classification").append(a)
	});
})();
(function(){
	let navigationarr = [
		{imgurl: skburl+"/static/index/img/shouye.png",name: "首页",hrefurl: skburl+"/index/index/index"},
		{imgurl: skburl+"/static/index/img/kefu.png",name: "客服",hrefurl: skburl+"/index/test/service_lx"},
		{imgurl: skburl+"/static/index/img/newindex/footer/shareimg.png",name: "推广",hrefurl: skburl+"/index/index/toqcode.html"},
		{imgurl: skburl+"/static/index/img/newindex/footer/bonus.png",name: "收益",hrefurl: skburl+"/index/test/myincome.html?id=23321"},
		{imgurl: skburl+"/static/index/img/newindex/footer/person.png",name: "我的",hrefurl: skburl+"/index/index/usercenter.html"},
	];
	navigationarr.forEach((ent)=>{
		let a = `
		<a href="${ent.hrefurl}">
			<img src="${ent.imgurl}" >
			<p>${ent.name}</p>
		</a>
		`
		$(".navigation>ul").append(a)
	})
})();



// 首页弹窗公告
function tanchuang(data){
	let indb;
	// 关闭公告
	$(".indbounced>div>div:eq(0)>img").on("click", () => {
		$(".indbounced").css("display", "none");
		sessionStorage.indb = true;
	})
	if (sessionStorage.indb) {
		$(".indbounced").css("display", "none")
	}else if(data.list.content == null || data.list.content == undefined || data.list.content == ""){
		sessionStorage.indb = true;
		$(".indbounced").css("display", "none");
	}
};


// 轮播图
let content; //内容宽度
let imgarr = [];
window.onload = function() {
	content = $(".imgs").css("width").slice(0, $(".imgs").css("width").length - 2) * 1
};
window.addEventListener('resize', () => {
	content = $(".imgs").css("width").slice(0, $(".imgs").css("width").length - 2) * 1
	// switchfun(iden)
});

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

(function() {
	// let pageurl = "https://skb.rongzimishu.com/index/index/index/cid/10/ifma/101";
	// let pageurl = console.log(document.URL);//获取首页地址
	pageurl = GetQueryString("ifma") //截取ifma
	console.log(pageurl)
	let ifma;
	if(pageurl == null || pageurl == undefined || pageurl == ""){
		ifma = 0;
	}else{
		ifma = pageurl;
	}
	$.ajax({
		url: skburl + "/index/Skbapi/getBanner?ifma=" + ifma,
		type: 'get',
		success: function(data) {
			console.log(data)
			imgarr = data.list
			imgfun()
		},
		error: function(msg) {
			console.log(msg)
		}
	});
	
	$.ajax({
		url: skburl + "/index/Skbapi/rollNotice",
		type: 'get',
		success: function(data) {
			console.log(data)
			announcement(data.list)
		},
		error: function(msg) {
			console.log(msg)
		}
	});
	
	$.ajax({
		url: skburl + "/index/Skbapi/popupNotice",
		type: 'get',
		success: function(data) {
			console.log(data)
			tanchuang(data)
			$(".indbounced>div>div>h3").html(data.list.title)
			$(".indbounced>div>p").html(data.list.content)
		},
		error: function(msg) {
			console.log(msg)
		}
	});
	
})();

function imgfun() {
	let imgurls = "https://skb.rongzimishu.com/static/index/upload/lbt/10/"
	imgarr.forEach((item, i) => {
		let a = `<li><img src="${imgurls+item.imgname}" ></li>`
		$(".imgs>ul").append($(a))
		if (i == 0) {
			$(".points").append($("<p id=dhid" + i + " class='defaults'></p>"))
		} else {
			$(".points").append($("<p id=dhid" + i + "></p>"))
		}
	})
}
function announcement(dataarr){
	$(".informations").html("")
	dataarr.forEach((item)=>{
		let a = `<p>${item.content}</p>`
		$(".informations").append($(a))
	})
	
	
	// 滚动公告
	let informationsid = 0;
	setInterval((end) => {
		$(".informations").show()
		informationsid--;
		let a = informationsid
		let c = $(".informations>p").css("line-height")
		c = c.slice(0,c.length-2) * a
		$(".informations").css({
			"transition": "all .3s",
			"transform": "translateY(" + c + "px)"
		})
		let i = $(".informations").css("height").slice(0, $(".informations").css("height").length - 2) * 1
		let j = $(".informations").css("transform").slice(23, $(".informations").css("transform").length - 1) * 1
		
		if (j >= i) {
			informationsid = 0
			$(".informations").css({
				"transition": "auto",
				"transform": "translateY(" + a + "px)"
			})
		}
	}, 2000);
}


$(".points").on("click", (end) => {
	let clibtnid = end.target.id.slice(4, end.target.id.length) * 1 + 1
	clifun(clibtnid, iden)
})

function clifun(clibtnid, idenc) {
	let liarr = $(".imgs>ul>li")
	for (let i = 0; i < liarr.length; i++) {
		liarr[i].style.zIndex = 10
	}
	if (clibtnid > idenc) {
		$(".imgs>ul>li:nth-child(" + clibtnid + ")").css({
			"transition": "auto",
			"left": "100%",
			"z-index": "10"
		})
		$(".imgs>ul>li:nth-child(" + idenc + ")").css({
			"left": "-100%",
			"z-index": "20"
		})
	} else if (clibtnid < idenc) {
		$(".imgs>ul>li:nth-child(" + clibtnid + ")").css({
			"transition": "auto",
			"left": "-100%",
			"z-index": "10"
		})
		$(".imgs>ul>li:nth-child(" + idenc + ")").css({
			"left": "100%",
			"z-index": "20"
		})
	}
	$(".points>.defaults")[0].className = ""
	$(".points>p:nth-child(" + clibtnid + ")")[0].className = "defaults"
	iden = clibtnid
	switchfun(iden)
}


let startx; //移动端按下X位置
let endx; //移动端抬起X位置
let iden = 1; //索引
$(".imgdiv").on("touchstart", (end) => {
	startx = end.touches[0].clientX
	clearInterval(setitem);
})
$(".imgdiv").on("touchmove", (end) => {
	endx = end.touches[0].clientX
	let mobilex = endx - startx
	mobilefun(iden, mobilex)
})
$(".imgdiv").on("touchend", (end) => {
	if (Math.abs(endx - startx) > 50) {
		if (endx - startx > 0) {
			iden--;
		} else if (endx - startx < 0) {
			iden++;
		}
		if (iden > imgarr.length) {
			iden = 1;
		} else if (iden < 1) {
			iden = imgarr.length
		}
	}
	switchfun(iden)
	setitem = setInterval(zxsj, 2000);
})

function mobilefun(ide, mobilex) {
	let aide = ide - 1;
	let bide = ide + 1;
	if (aide < 1) {
		aide = imgarr.length
	}
	if (bide > imgarr.length) {
		bide = 1
	}
	$(".imgs>ul>li:nth-child(" + aide + ")").css({
		"z-index": "20",
		"transition": "auto",
		"transform": "translateX(" + mobilex + "px)"
	})
	$(".imgs>ul>li:nth-child(" + ide + ")").css({
		"z-index": "20",
		"transition": "auto",
		"transform": "translateX(" + mobilex + "px)",
	})
	$(".imgs>ul>li:nth-child(" + bide + ")").css({
		"z-index": "20",
		"transition": "auto",
		"transform": "translateX(" + mobilex + "px)"
	})
}

function switchfun(ide) {
	let mobilex = endx - startx
	let aide = ide - 1;
	let bide = ide + 1;
	if (aide < 1) {
		aide = imgarr.length
	}
	if (bide > imgarr.length) {
		bide = 1
	}
	let liarr = $(".imgs>ul>li")
	for (let i = 0; i < liarr.length; i++) {
		liarr[i].style.zIndex = 10
	}
	let imgsar = $(".imgs>ul>li>img")
	for (let j = 0; j < imgsar.length; j++) {
		imgsar[j].style.height = "80%"
		imgsar[j].style.width = "90%"
	}
	$(".imgs>ul>li:nth-child(" + aide + ")").css({
		"transform": "translateX(0)",
		"transition": "all .3s",
		"left": "-100%",
		"z-index": "10"
	})
	$(".imgs>ul>li:nth-child(" + ide + ")").css({
		"transform": "translateX(0)",
		"transition": "all .3s",
		"left": "0",
		"z-index": "20"
	})
	$(".imgs>ul>li:nth-child(" + ide + ")>img").css({
		"width": "100%",
		"height": "100%",
	})
	$(".imgs>ul>li:nth-child(" + bide + ")").css({
		"transform": "translateX(0)",
		"transition": "all .3s",
		"left": "100%",
		"z-index": "10"
	})
	$(".points>.defaults")[0].className = ""
	$(".points>p:nth-child(" + ide + ")")[0].className = "defaults"
}
let setitem = setInterval(zxsj, 2000)

function zxsj() {
	iden++
	if (iden > imgarr.length) {
		iden = 1;
	} else if (iden < 1) {
		iden = imgarr.length
	}
	switchfun(iden)
}
