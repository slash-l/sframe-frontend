<template>
  <div>
    <div class="head-button">
      <a-row>
        <a-col :span="2">
          <a-button type="primary" @click="addUser">
            <a-icon type="plus" />
            {{ $t("common.add") }}
          </a-button>
          <user-edit
            ref="userEdit"
            :visible="visible"
            @visibleChange="visibleChange"
          ></user-edit>
        </a-col>
        <a-col :span="2">
          <a-button
            @click="confirmDeleteUser(selectedRowKeys)"
            :disabled="disabled"
            >{{ $t("common.delete") }}</a-button
          >
        </a-col>
      </a-row>
    </div>
    <a-table
      rowKey="id"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
      :columns="columns"
      :dataSource="userList"
    >
      <span slot="action" slot-scope="index">
        <a @click="updateUser(index.id)">{{ $t("common.update") }}</a>
        <a-divider type="vertical" />
        <a @click="confirmDeleteUser(index.id)">{{ $t("common.delete") }}</a>
      </span>
    </a-table>
  </div>
</template>

<script>
import UserEdit from "./UserEdit";
import {
  ApiGetUserList,
  ApiDeleteUser,
  ApiDeleteUsers
} from "@/api/system/user";

export default {
  components: { UserEdit },
  data() {
    return {
      userList: [],
      columns: [
        {
          title: this.$t("user.loginName"),
          dataIndex: "loginName",
          key: "loginName"
        },
        {
          title: this.$t("user.userName"),
          dataIndex: "userName",
          key: "userName"
        },
        {
          title: this.$t("user.email"),
          dataIndex: "email",
          key: "email"
        },
        {
          title: this.$t("user.phoneNum"),
          dataIndex: "phoneNum",
          key: "phoneNum"
        },
        {
          title: this.$t("common.createTime"),
          key: "createTime",
          dataIndex: "createTime"
        },
        {
          title: this.$t("common.operator"),
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      selectedRowKeys: [],
      visible: false,
      disabled: true,
      userId: ""
    };
  },
  watch: {
    selectedRowKeys: function() {
      this.selectedRowKeys.length > 0
        ? (this.disabled = false)
        : (this.disabled = true);
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    }
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    addUser() {
      this.visible = true;
    },
    updateUser(id) {
      this.$refs["userEdit"].open(id);
      this.visible = true;
    },

    confirmDeleteUser(ids) {
      const self = this;
      this.$confirm({
        title: this.$t("common.deleteConfirm"),
        onOk() {
          ids.length > 1 ? self.deleteUsers(ids) : self.deleteUser(ids[0]);
        },
        onCancel() {
          console.log("Cancel");
        },
        class: "test"
      });
    },

    deleteUser(id) {
      console.log(id);
      ApiDeleteUser(id)
        .then(() => {
          this.$message.success(this.$t("common.deleteSuccess"));
        })
        .catch(() => {
          this.$message.error(this.$t("common.deleteError"));
        })
        .finally(() => {
          this.getUserList();
        });
    },
    deleteUsers(ids) {
      console.log(ids);
      ApiDeleteUsers(ids)
        .then(() => {
          this.$message.success(this.$t("common.deleteSuccess"));
        })
        .catch(() => {
          this.$message.error(this.$t("common.deleteError"));
        })
        .finally(() => {
          this.getUserList();
        });
    },

    async getUserList() {
      let res = await ApiGetUserList();
      this.userList = res.data.body;
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    visibleChange(value) {
      this.visible = value;
    }
  }
};
</script>

<style>
.head-button {
  height: 50px;
}
</style>
