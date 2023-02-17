$(function(){
getUserInfo()
var layer = layui.layer
$('#btn_logout').on('click',function(){
    //eg1
layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, function(index){
   localStorage.removeItem('token')
   location.href='login01.html'
    
    layer.close(index);
  });
})
})
//获取用户基本信息
function getUserInfo(){
$.ajax({
    method:'GET',
    url:'/my/userinfo',
    // Headers:{
    //     Authorization:localStorage.getItem('token')||''
    // },
    succsee : function(res){
       if(res.status !==0){
        return layui.layer.msg('获取用户信息失败!')
       }
       //下面是渲染用户头像的函数
       console.log(res.data.username)
       renderAvatar(res.data)
    
},
error: function(){
    console.log('xxxxxxx')
},
//不论成功还是失败都会调用下面的函数
// complete:function(res){
// if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
// localStorage.removeItem('token')
// location.href='login01.html'
// }
// }
})

}
function renderAvatar(user){
var name =user.nickname || user.username
$('#welcome').html('欢迎&nbsp;'+name)
if(user.user_pic !==null||undefined){
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text-avatar').hide()
}else{
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
}
}