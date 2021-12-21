<template>
  <div class="login-back" v-title data-title="JFrog">
    <a-row>
      <a-col :span="8"></a-col>
      <a-col :span="8" class="logo-back">
        <div class="logo-title">
          <img src="../assets/new/JFrog.png" class="logoIcon" />
          <h1></h1>
        </div>
      </a-col>
      <a-col :span="8"></a-col>
    </a-row>
    <a-row>
      <a-col :span="8"></a-col>
      <a-col :span="8" class="form-back"><RouterView></RouterView></a-col>
      <a-col :span="8"></a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "newLayout"
};
</script>

<style scoped>
.login-back {
  background: url(../assets/new/login-back.jpg) no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.logo-back {
  padding: 10px;
  background: white;
  border-radius: 0;
  margin-top: 10%;
}
.logoIcon {
  height: 100px;
  padding-top: 10px;
}
.logo-title {
  margin-top: 10px;
  margin-bottom: 0px;
  text-align: center;
}
.form-back {
  padding: 30px;
  background: white;
  border-radius: 0;
}
</style>
