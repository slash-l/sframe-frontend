<template>
  <div>
    <div class="head-button">
      <a-row>
        <a-col :span="2">
          <a-button type="primary" @click="addRole">
            <a-icon type="plus" />
            {{ $t("common.add") }}
          </a-button>
          <role-edit
            ref="roleEdit"
            :visible="visible"
            @visibleChange="visibleChange"
          ></role-edit>
        </a-col>
        <a-col :span="2">
          <a-button
            @click="confirmDeleteRole(selectedRowKeys)"
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
      :dataSource="roleList"
    >
      <span slot="action" slot-scope="index">
        <a @click="updateRole(index.id)">{{ $t("common.update") }}</a>
        <a-divider type="vertical" />
        <a @click="confirmDeleteRole(index.id)">{{ $t("common.delete") }}</a>
      </span>
    </a-table>
  </div>
</template>

<script>
import RoleEdit from "./RoleEdit";
import {
  ApiGetRoleList,
  ApiDeleteRole,
  ApiDeleteRoles
} from "@/api/system/role";

export default {
  components: { RoleEdit },
  data() {
    return {
      roleList: [],
      columns: [
        {
          title: this.$t("role.roleName"),
          dataIndex: "name",
          key: "name"
        },
        {
          title: this.$t("role.roleCode"),
          dataIndex: "code",
          key: "code"
        },
        {
          title: this.$t("role.roleDesc"),
          dataIndex: "description",
          key: "description"
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
      roleId: ""
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
    this.getRoleList();
  },
  methods: {
    addRole() {
      this.visible = true;
    },
    updateRole(id) {
      this.$refs["roleEdit"].open(id);
      this.visible = true;
    },

    confirmDeleteRole(ids) {
      const self = this;
      this.$confirm({
        title: this.$t("common.deleteConfirm"),
        onOk() {
          ids.length > 1 ? self.deleteRoles(ids) : self.deleteRole(ids[0]);
        },
        onCancel() {
          console.log("Cancel");
        },
        class: "test"
      });
    },

    deleteRole(id) {
      console.log(id);
      ApiDeleteRole(id)
        .then(() => {
          this.$message.success(this.$t("common.deleteSuccess"));
        })
        .catch(() => {
          this.$message.error(this.$t("common.deleteError"));
        })
        .finally(() => {
          this.getRoleList();
        });
    },
    deleteRoles(ids) {
      console.log(ids);
      ApiDeleteRoles(ids)
        .then(() => {
          this.$message.success(this.$t("common.deleteSuccess"));
        })
        .catch(() => {
          this.$message.error(this.$t("common.deleteError"));
        })
        .finally(() => {
          this.getRoleList();
        });
    },

    async getRoleList() {
      let res = await ApiGetRoleList();
      this.roleList = res.data.body;
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
