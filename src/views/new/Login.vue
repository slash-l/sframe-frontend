<template>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
  >
    <a-form-item>
      <a-input
        v-decorator="[
          'userName',
          {
            rules: [
              { required: true, message: '请输入用户名', trigger: 'blur' }
            ]
          }
        ]"
        placeholder="请输入用户名"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [{ required: true, message: '请输入密码', trigger: 'blur' }]
          }
        ]"
        type="password"
        placeholder="请输入密码"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox
        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true
          }
        ]"
      >
        记住我
      </a-checkbox>
      <a class="login-form-forgot" href="">
        忘记密码
      </a>
      <a-button
        type="primary"
        :loading="loading"
        html-type="submit"
        class="login-form-button"
        @click="handleSubmit"
      >
        登 录
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: "normal_login" }),
      loading: false
    };
  },
  methods: {
    handleSubmit(e) {
      this.loading = true;
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log("Received values of form: ", values);
          // 调用登录接口
          this.$store
            .dispatch("login/login", {
              username: values.userName,
              password: values.password
            })
            .then(() => {
              this.$router.push(this.next || { name: "dashboard" });
              this.loading = false;
              this.$message.success("登录成功");
            })
            .catch(err => {
              this.$message.error("用户名或密码输入错误！");
              console.log(err);
            })
            .finally(() => (this.loading = false));
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 200px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
