<template>
  <div>
    <a-drawer
      :title="$t('role.roleEdit')"
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
            <a-form-item :label="$t('role.roleName')">
              <a-input
                v-decorator="[
                  'name',
                  {
                    rules: [
                      {
                        required: true,
                        message: $t('role.errorRoleName'),
                        trigger: 'blur'
                      }
                    ]
                  }
                ]"
                :placeholder="$t('role.placeholderRoleName')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label="$t('role.roleCode')">
              <a-input
                v-decorator="[
                  'code',
                  {
                    rules: [
                      {
                        required: true,
                        message: $t('role.errorRoleCode'),
                        trigger: 'blur'
                      }
                    ]
                  }
                ]"
                :placeholder="$t('role.placeholderRoleCode')"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item :label="$t('role.roleDesc')">
              <a-textarea
                v-decorator="['description', {}]"
                :rows="3"
                :placeholder="$t('role.placeholderRoleDesc')"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div>
        {{ $t("resource.resourceData") }}
        <a-tree
          v-model="checkedKeys"
          checkable
          :expanded-keys="expandedKeys"
          :auto-expand-parent="autoExpandParent"
          :selected-keys="selectedKeys"
          :tree-data="treeData"
          @expand="onExpand"
          @select="onSelect"
        />
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
import { ApiGetResources } from "@/api/system/resource";
import { ApiAddRole, ApiGetRole, ApiUpdateRole } from "@/api/system/role";

export default {
  name: "roleEdit",
  props: {
    visible: Boolean
  },
  data() {
    return {
      form: this.$form.createForm(this),
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      resourceList: [],
      treeData: [],
      loading: false,
      roleId: ""
    };
  },
  computed: {
    subVisible: function() {
      return this.visible;
    }
  },
  watch: {
    checkedKeys(val) {
      console.log("onCheck", val);
    }
  },
  methods: {
    async open(roleId) {
      this.roleId = roleId;
      const role = await ApiGetRole(roleId);
      this.form.setFieldsValue({
        name: role.data.body.name,
        code: role.data.body.code,
        description: role.data.body.description
      });
      this.checkedKeys = role.data.body.resourceList;
    },

    onSubmit() {
      this.loading = true;
      const form = this.$refs.collectionForm.form;
      form.validateFields((err, values) => {
        if (err) {
          this.loading = false;
          return;
        } else {
          if (this.checkedKeys.length > 0)
            values["resourceIds"] = this.checkedKeys;
          const result = !this.roleId
            ? ApiAddRole(values)
            : ApiUpdateRole(this.roleId, values);
          result
            .then(res => {
              console.log("post/put role id: " + res.data.body);
              this.$message.success(this.$t("common.saveSuccess"));
              this.loading = false;
            })
            .catch(() => {
              this.$message.error(this.$t("common.saveError"));
              this.loading = false;
            })
            .finally(() => {
              (this.loading = false), form.resetFields();
              this.checkedKeys = [];
              this.roleId = "";
              this.$emit("visibleChange", false);
            });
        }
      });
    },
    onClose() {
      const form = this.$refs.collectionForm.form;
      form.resetFields();
      this.checkedKeys = [];
      this.roleId = "";
      this.$emit("visibleChange", false);
    },

    onExpand(expandedKeys) {
      console.log("onExpand", expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck(checkedKeys) {
      console.log("onCheck", checkedKeys);
      this.checkedKeys = checkedKeys;
    },
    onSelect(selectedKeys, info) {
      console.log("onSelect", info);
      this.selectedKeys = selectedKeys;
    },
    async getResourceList() {
      let res = await ApiGetResources();
      this.resourceList = res.data.body;
      // 将后端权限数据转换为前端 tree 结构数据
      this.treeData = this.formatTreeJson(res.data.body);
    },

    formatTreeJson(resourceList) {
      let treeResult = [];
      for (let resource of resourceList) {
        if (resource.parentId == 0) {
          //判断是否为顶层节点
          let parent = {
            //转换成el-Cascader可以识别的数据结构
            key: resource.id,
            title: resource.name
          };
          parent.children = this.getchilds(resource.id, resourceList); //获取子节点
          treeResult.push(parent);
        }
      }
      return treeResult;
    },
    getchilds(id, array) {
      let childs = new Array();
      for (let arr of array) {
        //循环获取子节点
        if (arr.parentId == id) {
          childs.push({
            title: arr.name,
            key: arr.id
          });
        }
      }
      for (let child of childs) {
        //获取子节点的子节点
        let childscopy = this.getchilds(child.value, array); //递归获取子节点
        if (childscopy.length > 0) {
          child.children = childscopy;
        }
      }
      return childs;
    }
  },
  mounted() {
    this.getResourceList();
  }
};
</script>
