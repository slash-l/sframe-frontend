<template>
  <div>
    <a-drawer
      :title="$t('user.userEdit')"
      :width="720"
      @close="onClose"
      :visible="subVisible"
      :bodyStyle="{ paddingBottom: '80px' }"
    >
      <a-form
        :form="form"
        layout="vertical"
        hideRequiredMark
        ref="collectionForm"
      >
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item :label="$t('user.loginName')">
              <a-input
                v-decorator="[
                  'loginName',
                  {
                    rules: [
                      {
                        required: true,
                        message: $t('user.errorLoginName'),
                        trigger: 'blur'
                      }
                    ]
                  }
                ]"
                :placeholder="$t('user.placeholderLoginName')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label="$t('user.userName')">
              <a-input
                v-decorator="[
                  'userName',
                  {
                    rules: [
                      {
                        required: true,
                        message: $t('user.errorUserName'),
                        trigger: 'blur'
                      }
                    ]
                  }
                ]"
                :placeholder="$t('user.placeholderUserName')"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item :label="$t('user.email')">
              <a-input
                v-decorator="['email', {}]"
                :placeholder="$t('user.placeholderEmail')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label="$t('user.phoneNum')">
              <a-input
                v-decorator="['phoneNum', {}]"
                :placeholder="$t('user.placeholderPhoneNum')"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div>
        <user-role-edit @getUserRoles="getUserSelectRoles"></user-role-edit>
      </div>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1
        }"
      >
        <a-button :style="{ marginRight: '8px' }" @click="onClose">
          {{ $t("common.cancel") }}
        </a-button>
        <a-button @click="onSubmit" type="primary" :loading="loading">{{
          $t("common.save")
        }}</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import { ApiAddUser, ApiGetUser, ApiUpdateUser } from "@/api/system/user";
import UserRoleEdit from "./UserRoleEdit";

export default {
  name: "userEdit",
  components: { UserRoleEdit },
  props: {
    visible: Boolean
  },
  data() {
    return {
      form: this.$form.createForm(this),
      loading: false,
      userId: "",
      userRoles: ""
    };
  },
  computed: {
    subVisible: function() {
      return this.visible;
    }
  },
  methods: {
    async open(userId) {
      this.userId = userId;
      const user = await ApiGetUser(userId);
      this.form.setFieldsValue({
        loginName: user.data.body.loginName,
        userName: user.data.body.userName,
        email: user.data.body.email,
        phoneNum: user.data.body.phoneNum
      });
    },

    onSubmit() {
      this.loading = true;
      const form = this.$refs.collectionForm.form;
      form.validateFields((err, values) => {
        if (err) {
          this.loading = false;
          return;
        } else {
          console.log("userRoles:" + this.userRoles);
          const result = !this.userId
            ? ApiAddUser(values)
            : ApiUpdateUser(this.userId, values);
          result
            .then(res => {
              console.log("post/put user id: " + res.data.body);
              this.$message.success(this.$t("common.saveSuccess"));
              this.loading = false;
            })
            .catch(() => {
              this.$message.error(this.$t("common.saveError"));
              this.loading = false;
            })
            .finally(() => {
              (this.loading = false), form.resetFields();
              this.userId = "";
              this.$emit("visibleChange", false);
            });
        }
      });
    },
    onClose() {
      const form = this.$refs.collectionForm.form;
      form.resetFields();
      this.userId = "";
      this.$emit("visibleChange", false);
    },
    getUserSelectRoles(selectRoles) {
      this.userRoles = selectRoles;
    }
  }
};
</script>
