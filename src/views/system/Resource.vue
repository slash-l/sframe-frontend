<template>
  <div>
    <a-row>
      <a-col :span="18" :push="6">
        <a-form v-bind="formItemLayout" :form="form" @submit="handleSubmit">
          <a-form-item :label="$t('resource.resourceName')">
            <a-input
              class="input-css"
              :placeholder="$t('resource.placeholderResourceName')"
              v-decorator="[
                'resourceName',
                {
                  rules: [
                    {
                      required: true,
                      message: $t('resource.errorResourceName'),
                      trigger: 'blur'
                    }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item :label="$t('resource.resourceCode')">
            <a-input
              class="input-css"
              :placeholder="$t('resource.placeholderResourceCode')"
              v-decorator="[
                'resourceCode',
                {
                  rules: [
                    {
                      required: true,
                      message: $t('resource.errorResourceCode'),
                      trigger: 'blur'
                    }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item :label="$t('resource.resourceType')">
            <a-select
              style="width: 120px"
              @change="handleChange"
              v-decorator="[
                'resourceType',
                {
                  rules: [
                    {
                      required: true,
                      message: $t('resource.errorResourceType'),
                      trigger: 'blur'
                    }
                  ]
                }
              ]"
              :placeholder="$t('common.placeholderSelect')"
            >
              <a-select-option value="menu">
                {{ $t("resource.menu") }}
              </a-select-option>
              <a-select-option value="button">
                {{ $t("resource.button") }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('resource.resourcePath')">
            <a-input
              class="input-css"
              :placeholder="$t('resource.placeholderResourcePath')"
              v-decorator="['resourcePath', {}]"
            />
          </a-form-item>
          <a-form-item :label="$t('resource.requestType')">
            <a-select
              style="width: 120px"
              @change="handleChange"
              v-decorator="['requestType', {}]"
              :placeholder="$t('common.placeholderSelect')"
            >
              <a-select-option value="post">
                POST
              </a-select-option>
              <a-select-option value="get">
                GET
              </a-select-option>
              <a-select-option value="put">
                PUT
              </a-select-option>
              <a-select-option value="delete">
                DELETE
              </a-select-option>
              <a-select-option value="patch">
                PATCH
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="$t('resource.sort')">
            <a-input
              class="input-css"
              :placeholder="$t('resource.placeholderSort')"
              v-decorator="[
                'sort',
                {
                  rules: [
                    {
                      required: true,
                      message: $t('resource.errorSort'),
                      trigger: 'blur'
                    }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item label="icon">
            <a-input
              class="input-css"
              :placeholder="$t('resource.placeholderIcon')"
              v-decorator="[
                'icon',
                {
                  rules: [
                    {
                      required: true,
                      message: $t('resource.errorIcon'),
                      trigger: 'blur'
                    }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item :label="$t('resource.resourceDesc')">
            <a-textarea
              class="input-css"
              :placeholder="$t('resource.placeholderResourceDesc')"
              :rows="4"
              v-decorator="['resourceDesc', {}]"
            />
          </a-form-item>

          <a-form-item
            :wrapper-col="{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 }
            }"
          >
            <a-button
              type="primary"
              :loading="loading"
              html-type="submit"
              @click="handleSubmit"
            >
              {{ $t("common.save") }}
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="6" :pull="18">
        <a-tree
          :expanded-keys="expandedKeys"
          :auto-expand-parent="autoExpandParent"
          :selected-keys="selectedKeys"
          :tree-data="treeData"
          @expand="onExpand"
          @select="onSelect"
        />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { ApiGetResources, ApiUpdateResource } from "@/api/system/resource";

export default {
  data() {
    return {
      loading: false,
      expandedKeys: ["0-0-0", "0-0-1"],
      autoExpandParent: true,
      selectedKeys: [],
      treeData: [],

      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      resourceList: [],
      resourceId: ""
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "resource_edit" });
  },
  methods: {
    onExpand(expandedKeys) {
      console.log("onExpand", expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onSelect(selectedKeys, info) {
      console.log(info);
      this.selectedKeys = selectedKeys;
      for (let resource of this.resourceList) {
        if (resource.id === selectedKeys[0]) {
          this.resourceId = resource.id;
          this.form.setFieldsValue({
            resourceName: resource.name,
            resourceCode: resource.code,
            resourceType: resource.type,
            resourcePath: resource.path,
            requestType: resource.requestType,
            sort: resource.sort,
            icon: resource.icon,
            resourceDesc: resource.description
          });
          break;
        }
      }
    },

    handleChange(value) {
      console.log(`selected ${value}`);
    },

    handleSubmit(e) {
      this.loading = true;
      e.preventDefault();
      this.form.validateFields((err, fieldsValue) => {
        if (err) {
          this.loading = false;
          return;
        } else {
          ApiUpdateResource(this.resourceId, fieldsValue)
            .then(() => {
              this.$message.success(this.$t("common.saveSuccess"));
              this.loading = false;
            })
            .catch(() => {
              this.$message.error(this.$t("common.saveError"));
              this.loading = false;
            });
        }
      });
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

<style>
.input-css {
  width: 400px;
}
</style>
