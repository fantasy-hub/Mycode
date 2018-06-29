<template>
  <div id="app">
    <section id="signInAndSignUp" v-if="!currentUser">
      <div class="user-action">
        <label><input type="radio" name="type" v-model="actionType"  value="signUp"> 注册</label>
        <label><input type="radio" name="type" v-model="actionType"  value="login"> 登录</label>
      </div>
      <div class="signUp" v-if="actionType=='signUp'">
        <form @submit.prevent="signUp">
          <div class="formRow">
            <input type="text" placeholder="用户名" v-model="formData.username">
            <input type="password" placeholder="密码" v-model="formData.password">
          </div>
          <div class="formActions">
            <input type="submit" value="注册">
          </div>
        </form>
      </div>
      <div class="login" v-if="actionType=='login'">
        <form @submit.prevent="login">
          <div class="formRow">
            <input type="text" placeholder="用户名" v-model="formData.username">
            <input type="password" placeholder="密码" v-model="formData.password">
          </div>
          <div class="formActions">
            <input type="submit" value="登录">
          </div>
        </form>
      </div>
    </section>
    <section id="todo" v-if="currentUser">
      <div class="user-action">
        <span class="msg">你好，{{currentUser.username}}</span>
        <button @click="logout">退出</button>
      </div>
      <div class="newTask">
        <input type="text" placeholder="新项目..." v-model="newTodo" @keypress.enter="addTodo" class="new-todo">
      </div>
      <div class="todo-list">
        <ol class="todos" v-if="todoList.length">
          <li v-for="(todo, i) in todoList">
            <button class="close" @click="removeTodo(todo)">X</button>
            <input type="checkbox" v-model="todo.done" :id="'check-'+i" @change="saveOrUpdateTodos()">
            <label :for="'check-'+i"><span>{{ todo.title }}</span></label>
            <span class="createTime">{{todo.createdAt | normalTime}}</span>
            <span v-if="todo.done" class="tag success">已完成</span>
            <span v-else class="tag warning">未完成</span>
          </li>
        </ol>
      </div>
    </section>
  </div>
</template>
<script>
  import AV from 'leancloud-storage'
  export default {
    data() {
      return {
        newTodo: '',
        todoList: [],
        actionType: 'signUp',
        currentUser: null,
        formData: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      updateTodos() {
        let dataString = JSON.stringify(this.todoList);
        let avTodos = AV.Object.createWithoutData('AllTodos', this.todoList.id);
        avTodos.set('content', dataString);
        avTodos.save().then(() => {
          console.log('更新成功');
        });
      },
      addTodo() {
        this.todoList.push({
          title: this.newTodo,
          createdAt: new Date(),
          done: false
        });
        this.newTodo = '';
        this.saveOrUpdateTodos();
      },
      removeTodo(todo) {
        let index = this.todoList.indexOf(todo);
        this.todoList.splice(index, 1);
        this.saveOrUpdateTodos();
      },
      saveTodos() {
        let dataString = JSON.stringify(this.todoList);
        var AVTodos = AV.Object.extend('AllTodos');
        var avTodos = new AVTodos();
        var acl = new AV.ACL();
        acl.setReadAccess(AV.User.current(), true);
        acl.setWriteAccess(AV.User.current(), true);
        avTodos.set('content', dataString);
        avTodos.setACL(acl);
        avTodos.save().then((todo) => {
          this.todoList.id = todo.id;
          console.log('保存成功');
        }, function (error) {
          console.log('保存失败');
        });
      },
      saveOrUpdateTodos() {
        if (this.todoList.id) {
          this.updateTodos();
        } else {
          this.saveTodos();
        }
      },
      fetchTodos() {
        if (this.currentUser) {
          var query = new AV.Query('AllTodos');
          query.find()
            .then((todos) => {
              let avAllTodos = todos[0];
              let id = avAllTodos.id;
              this.todoList = JSON.parse(avAllTodos.attributes.content);
              this.todoList.id = id;
            }, function (error) {
              console.log(error);
            });
        }
      },
      signUp() {
        let user = new AV.User();
        user.setUsername(this.formData.username);
        user.setPassword(this.formData.password);
        user.signUp().then((loginedUser) => {
          this.currentUser = this.getCurrentUser();
        }, (error) => {
          alert('注册失败');
        });
      },
      login() {
        AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
          this.currentUser = this.getCurrentUser();
          this.fetchTodos();
        }, function (error) {
          console.log('登录失败');
        });
      },
      logout() {
        AV.User.logOut();
        this.currentUser = null;
        window.location.reload();
      },
      getCurrentUser() {
        let current = AV.User.current();
        if (current) {
          let {
            id,
            createdAt,
            attributes: {
              username
            }
          } = current;
          return {
            id,
            username,
            createdAt
          };
        } else {
          return null;
        }
      }
    },
    created() {
      // beforeunload 事件里面的所有请求都发不出去，会被取消
      this.currentUser = this.getCurrentUser();
      this.fetchTodos();
    }
  }
</script>
<style>
  body,
  button,
  form,
  hr,
  input,
  li,
  ol,
  p,
  ul {
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Microsoft YaHei', sans-serif;
    background: #BBDEFA;
  }
  
  #signInAndSignUp,
  #todo {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 auto;
    margin-left: -150px;
    margin-top: -165px;
    width: 300px;
    border-radius: 5px;
    color: #666;
  }
  
  #todo {
    width: 750px;
    margin-left: -375px;
  }
  
  .user-action {
    padding: 10px;
    height: 30px;
    color: rgba(255, 255, 255, .85);
    background: #64B5F6;
    border-radius: 5px 5px 0 0;
  }
  
  .user-action .msg {
    line-height: 2;
  }
  
  .user-action button {
    display: inline-block;
    font: 100%/1.2 sans-serif;
    width: 5em;
    height: 2em;
    float: right;
    cursor: pointer;
    background: #1C88E4;
    border: none;
    border-radius: 4px;
    color: rgba(255, 255, 255, .85);
    transition: all .3s;
  }
  
  .user-action button:hover {
    transform: scale(1.1, 1.1);
    opacity: .8;
  }
  
  .signUp,
  .login {
    background: #fff;
    border-radius: 0 0 5px 5px;
    color: #AAA9A9;
  }
  
  form {
    padding: 30px;
  }
  
  .formRow {
    border: 8px solid #EEEEEF;
    border-radius: 8px;
    padding: 10px;
  }
  
  .formRow input,
  .new-todo {
    line-height: 1.2;
    border: none;
    outline: none;
    padding: 10px;
    width: 91%;
    font: 100% 'Microsoft YaHei', sans-serif;
  }
  
  .formRow input:first-of-type {
    border-bottom: 2px solid #AAA9A9;
  }
  
  .formActions {
    margin: 30px 0;
  }
  
  .formActions input {
    display: block;
    border: none;
    border-radius: 3px;
    background: #7984DD;
    color: #fff;
    width: 100%;
    height: 40px;
    font: 100%/1 'Microsoft YaHei', sans-serif;
    line-height: 1.5;
    cursor: pointer;
  }
  
  .newTask {
    padding: 10px;
    background: #fff;
  }
  
  .new-todo {
    color: #666;
  }
  
  .todo-list {
    padding: 28px 28px 27px 0;
    background-color: #fff;
    background-image: linear-gradient(90deg, transparent 29px, #F9C6D7 29px, #F9C6D7 32px, transparent 32px), linear-gradient(#BCDFFA .1em, transparent .1em);
    background-size: 100% 1.7em;
    border-radius: 0 0 5px 5px;
  }
  
  .todos {
    list-style: none;
  }
  
  .todos li {
    height: 27px;
    line-height: 27px;
  }
  
  input[type="checkbox"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }
  
  input[type="checkbox"]+label::before {
    content: '\A0';
    display: inline-block;
    vertical-align: .2em;
    width: 1.2em;
    height: 1.2em;
    margin-right: .2em;
    border-radius: 1em;
    background: #DCEDFD;
    text-indent: .15em;
    line-height: .65;
  }
  
  input[type="checkbox"]:checked+label::before {
    content: '\2713';
    font-weight: bold;
    color: #46A5F5;
  }
  
  .close {
    display: inline-block;
    border-radius: 50%;
    width: 18.4px;
    height: 18.4px;
    margin: 0 8px 0px 4px;
    border: none;
    line-height: 1;
    background: #FF8F00;
    font-weight: bold;
    cursor: pointer;
  }
  
  .tag {
    float: right;
    border-radius: 4px;
    padding: 0 3px;
    margin-right: 10px;
    height: 26px;
    line-height: 26px;
    transition: all .3s;
  }
  
  .createTime {
    float: right;
  }
  
  .warning {
    background: #f79ea8;
  }
  
  .success {
    background: #82eac5;
  }
</style>