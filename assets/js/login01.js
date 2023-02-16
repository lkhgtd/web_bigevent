$(function(){
    $('#link_reg').on('click',function(){
$('.login-box').hide()
$('.reg-box').show()
    })
    $('#link_login').on('click',function(){
        $('.login-box').show()
$('.reg-box').hide()

    })

// 从lay-ui中获取form对象
var form=layui.form
var layer=layui.layer
// 通过form.verify自定义规则
form.verify({
    mydefined:[/^[\S]{6,12}$/,'密码不能为空格且必须是6到12位'],
   //校验两次密码是否一致
    remydefined:function(value){
var v1= $('.reg-box [name=password]').val()
if(v1!==value){
    return '两次密码输入不一致'
}
    }
});
//监听注册表单的提交事件
$('#form_reg').on('submit',function(e){
e.preventDefault()
var data = {
    username: $('#form_reg [name=username]').val(),
    password: $('#form_reg [name=password]').val()
  }
$.post('/api/reguser',{username: $('#form_reg [name=username]').val()
,password:$('#form_reg [name=password]').val()},
function(res){
if(res.status!==0){
    
    return layer.msg(res.message)
}
layer.msg('注册成功请登录')
$('#link_login').click()

})

})
//监听登录表单的提交事件
$('#form_login').on('submit',function(e){
    e.preventDefault()
    var data = {
        username: $('#form_login [name=username]').val(),
        password: $('#form_login [name=password]').val()
      }
      $.post('/api/login',{username: $('#form_login [name=username]').val()
,password:$('#form_login [name=password]').val()},
function(res){
if(res.status!==0){
    
    return layer.msg(res.message)
}
layer.msg('登录成功')
localStorage.setItem('token',res.token)
//跳转到后台主页
location.href='/index01.html'
})

})

})