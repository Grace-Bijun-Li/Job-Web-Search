(function(){
  $('head').append(`
  <style>
  .searchSelect_box {
    position: relative;
  }
  .searchSelect_box>.searchSelect {
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdee2;
    transition: all .2s ease-in-out;
    position: relative;
    width: 100%;
    padding:5px;
  }
  .searchSelect_box>.searchSelect:focus {
    border-color: #57a3f3 !important;
    outline: 0;
    box-shadow: 0 0 0 2px rgb(45 140 240 / 20%) !important;
  }
  .searchSelect_box>.drawer {
    width: 100%;
      max-height: 200px;
      overflow-x: hidden;
      overflow-y: auto;
      margin: 5px 0;
      padding: 5px 0;
      background-color: #fff;
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0 1px 6px rgb(0 0 0 / 20%);
      position: absolute;
      z-index: 900;
      left: 0;
      top: 30px;
      display:none;
  }
  .searchSelect_box>.drawer>li {
    margin: 0;
      line-height: normal;
      padding: 7px 16px;
      clear: both;
      color: #515a6e;
      font-size: 14px!important;
      white-space: nowrap;
      list-style: none;
      cursor: pointer;
      transition: background .2s ease-in-out;
      overflow:hidden; 
      text-overflow:ellipsis; 
      white-space:nowrap; 
  }
  .searchSelect_box>.drawer>.none {
    padding: 0 16px;
    text-align: center;
    color: #ccc;
  }
  .searchSelect_box>.drawer>li:hover {
    background-color: rgba(0, 0, 0, .1);
  }
  .searchSelect_box>.drawer>.active {
    color: #57a3f3;
  }

 .searchSelect_box>.drawer::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: #fff;
}

.searchSelect_box>.drawer::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    background-color: #fff;
}

.searchSelect_box>.drawer::-webkit-scrollbar-thumb {
    border-radius: 2px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
    background-color: #ccc;
}
  </style>
  `)
})()

class searchSelect {
  constructor(dom,list,fn) {
    this.list = []
    this.dom = dom
    this.params = {}
    this.loading = false
	this.fn = fn
    if(list instanceof Array) {
      this.list = list
    }
    $(this.dom).addClass('searchSelect_box')
    let name = $(this.dom).attr('name');
    let placeholder= $(this.dom).attr('placeholder')
    $(this.dom).append('<input placeholder="'+(placeholder||'')+'" type="text" name="'+(name||'')+'" class="searchSelect">')
    $(this.dom).append('<ul class="drawer"></ul>')
    this.getList()
    let that = this
    $(this.dom).children('.searchSelect').on('input',function(){
      let val = $(that.dom).children('.searchSelect').val().trim()
      $(that.dom).children('.searchSelect').val(val)
      if(!(val === $(that.dom).children('.drawer').find('.active').text())) {
        $(that.dom).children('.searchSelect').attr('data-id','')
        $(that.dom).children('.drawer').find('.active').removeClass('active')
        that.params = {}
        fn && fn($(this).val())
      }
      $(that.dom).children('.drawer').stop(true,true).fadeIn()
      if(!that.loading) {
        that.getList(val)
      }
      // that.list.filter((item)=>item.value.inc)
      
    })
    $(this.dom).children('.searchSelect').on('focus',function(){
      $(that.dom).children('.drawer').stop(true,true).fadeIn()
    })
    $(this.dom).children('.searchSelect').on('blur',function(){
      setTimeout(()=>{
        if(!($(that.dom).children('.searchSelect').attr('data-id'))) {
          $(that.dom).children('.searchSelect').val('')
        }
        $(that.dom).children('.drawer').stop(true,true).fadeOut()
      },100)
    })
  }
  // Fuzzy search method
  getList(str) {
    // let list = arr || JSON.parse(JSON.stringify(this.list))
    if(this.list.length<1) {
      $(this.dom).children('.drawer').html('<li class="none"> </li>')
      return this
    }
    let domlist = str?this.list.filter(item => item.value.includes(str)):JSON.parse(JSON.stringify(this.list))
      if(domlist.length<1){
        $(this.dom).children('.drawer').html('<li class="none"> </li>')
        return this
      }
    let listDom = ''
    $(this.dom).children('.drawer').html('')
    domlist.forEach(item => {
      let isActive = $(this.dom).children('.searchSelect').attr('data-id')==item.id
      listDom+='<li class="item '+(isActive?'active':'')+' " data-id="'+item.id+'">'+item.value+'</li>'
      if(isActive) {
        $(this.dom).children('.searchSelect').val(item.value)
      }
    })
    $(this.dom).children('.drawer').append(listDom)
    let dom = this.dom
    let that = this
    $(this.dom).children('.drawer').children('.item').on('click',function(){
      if($(this).hasClass('active')) return
      $(dom).children('.searchSelect').attr('data-id',$(this).attr('data-id'))
      $(dom).children('.searchSelect').val($(this).text())
      that.params.id = $(this).attr('data-id')
      that.params.value = $(this).text()
      $(this).addClass('active').siblings().removeClass('active')
      setTimeout(()=>{
        $(dom).children('.drawer').stop(true,true).fadeOut()
        that.getList($(this).text())
      },300)
    })
    return this
  }
  // Update data Pass in an array to update the content of the drop-down box
  update(list) {
    if(!(list instanceof Array)) {
      console.error('Please insert！')
      return this
    }
    this.list = list
    this.getList($(this.dom).children('.searchSelect').val())
    this.loading=false
    return this
  }
  // Search method, when true is passed in, the loading in the search will be displayed. 
  search(bol) {
    bol && $(this.dom).children('.drawer').html('<li class="none"> </li>')
    bol && (this.loading=true)
    !bol && this.getList()
    !bol && (this.loading=false)
    return this
  }
  // Empty all contents
  empty() {
    $(this.dom).children('.drawer').html('<li class="none"> </li>')
    $(this.dom).children('.searchSelect').val('')
    return this
  }
  isFunction(fn) {
    return Object.prototype.toString.call(fn)=== '[object Function]';
 }
//  Disabled options
 disabled(bol) {
   bol && $(this.dom).children('.searchSelect').prop('disabled',true)
   !bol && $(this.dom).children('.searchSelect').prop('disabled',false)
   return this
 }
 // When need to force assignment
 assignment(obj) {
   if(obj instanceof Object && obj.id) {
     for(let i=0;i<this.list.length;i++) {
       if(this.list[i].id == obj.id) {
        $(this.dom).children('.drawer').html('<li class="item active" data-id="'+obj.id+'">'+obj.value+'</li>')
         $(this.dom).children('.searchSelect').val(obj.value)
         $(this.dom).children('.searchSelect').attr('data-id',obj).id
		 this.fn()
         return this
       }
     }
     this.list.push(obj)
     $(this.dom).children('.drawer').html('<li class="item active" data-id="'+obj.id+'">'+obj.value+'</li>')
     $(this.dom).children('.searchSelect').val(obj.value)
     $(this.dom).children('.searchSelect').attr('data-id',obj.id)
     this.params.id = obj.id
     this.params.value = obj.value
   } else if(typeof obj==='string'||typeof obj==='number'){
    this.list.forEach(item => {
      if(item.id == obj) {
        $(this.dom+' .item[data-id="'+obj+'"]').addClass('active')
        $(this.dom).children('.searchSelect').val($(this.dom+' .item[data-id="'+obj+'"]').text())
        $(this.dom).children('.searchSelect').attr('data-id',obj)
        this.params.id = item.id
        this.params.value = $(this.dom+' .item[data-id="'+obj+'"]').text()
      }
    })
   }
   this.fn()
   return this
 }
}