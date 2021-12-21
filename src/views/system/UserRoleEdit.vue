<template>
  <div>
    <a-transfer
      :rowKey="record => record.id"
      :data-source="mockData"
      :target-keys="targetKeys"
      :show-search="true"
      :filter-option="
        (inputValue, item) => item.title.indexOf(inputValue) !== -1
      "
      :show-select-all="false"
      @change="onChange"
    >
      <template
        slot="children"
        slot-scope="{
          props: { direction, filteredItems, selectedKeys },
          on: { itemSelectAll, itemSelect }
        }"
      >
        <a-table
          :row-selection="
            getRowSelection({ selectedKeys, itemSelectAll, itemSelect })
          "
          :columns="direction === 'left' ? leftColumns : rightColumns"
          :data-source="filteredItems"
          size="small"
          :custom-row="
            ({ id }) => ({
              on: {
                click: () => {
                  itemSelect(id, !selectedKeys.includes(id));
                }
              }
            })
          "
        />
      </template>
    </a-transfer>
  </div>
</template>
<script>
import difference from "lodash/difference";
import { ApiGetRoleList } from "@/api/system/role";

const originTargetKeys = [];

export default {
  data() {
    return {
      mockData: [],
      roleList: [],
      targetKeys: originTargetKeys,
      leftColumns: [
        {
          dataIndex: "name",
          title: this.$t("role.roleName"),
          key: "name"
        },
        {
          dataIndex: "description",
          title: this.$t("role.roleDesc"),
          key: "description"
        }
      ],
      rightColumns: [
        {
          dataIndex: "name",
          title: this.$t("role.roleName"),
          key: "name"
        }
      ]
    };
  },
  mounted() {
    this.getRoleList();
    this.$emit("getUserRoles", this.targetKeys);
  },
  watch: {
    targetKeys(val) {
      this.$emit("getUserRoles", val);
    }
  },
  methods: {
    /**
     * 获取系统角色列表信息
     */
    async getRoleList() {
      let res = await ApiGetRoleList();
      this.mockData = res.data.body;
    },

    onChange(nextTargetKeys) {
      this.targetKeys = nextTargetKeys;
    },
    getRowSelection({ selectedKeys, itemSelectAll, itemSelect }) {
      return {
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows.map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, selectedKeys)
            : difference(selectedKeys, treeSelectedKeys);
          itemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          itemSelect(key, selected);
        },
        selectedRowKeys: selectedKeys
      };
    }
  }
};
</script>
