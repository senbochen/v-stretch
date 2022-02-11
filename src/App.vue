<template>
  <div id="app">
    <el-button type="text" @click="outerVisible = true"
      >点击打开外层 Dialog</el-button
    >

    <el-dialog
      title="外层 Dialog"
      :visible.sync="outerVisible"
      v-stretch="{ className: 'el-dialog', minWidth: 300, minHeight: 400 }"
    >
      <el-dialog
        width="30%"
        title="内层 Dialog"
        :visible.sync="innerVisible"
        append-to-body
      >
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true"
          >打开内层 Dialog</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      outerVisible: false,
      innerVisible: false
    }
  },
  methods: {
    throttle (fn, wait) {
      let timer;
      let context, args;

      return function () {
        context = this;
        args = arguments;
        console.log(fn, args, this)
        // 如果不存在 timer 表示当前不在周期内
        if (!timer) {
          // 开始一个新周期
          timer = setTimeout(() => {
            fn.apply(context, args);
            // 周期结束
            clearTimeout(timer);
            timer = null;
          }, wait);
        }
      }
    },
    add () {
      console.log(2131)
    }
  },
  created () {
    this.throttle(this.add, 100)(2131321)
  },
}
</script>

<style>
.kfang-scale-warp {
  position: relative;
  overflow: hidden;
}

.resizeTR {
  position: absolute;
  top: 0;
  right: 0;
  cursor: ne-resize;
  background: #000;
  overflow: hidden;
  opacity: 0;
  filter: alpha(opacity=0);
  width: 8px;
  height: 8px;
}

.resizeBR {
  position: absolute;
  width: 8px;
  height: 8px;
  right: 0;
  bottom: 0;
  overflow: hidden;
  cursor: se-resize;
}

.resizeTL {
  position: absolute;
  top: 0;
  left: 0;
  cursor: nw-resize;
  background: #000;
  overflow: hidden;
  opacity: 0;
  filter: alpha(opacity=0);
  width: 8px;
  height: 8px;
}

.resizeBL {
  position: absolute;
  width: 8px;
  height: 8px;
  left: 0;
  bottom: 0;
  overflow: hidden;
  cursor: sw-resize;
}
</style>
